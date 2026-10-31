/**
 * za-cpa-leads: receives website form submissions and emails them via Resend.
 *
 * POST /lead  (JSON) → branded RTL email to the office (or Orit), plus a short
 * Hebrew auto-reply to the lead. Same pattern as asor-law.com's worker.
 * The site falls back to Web3Forms if this endpoint fails, so a lead is never lost.
 *
 * Secrets: RESEND_API_KEY (sending-only key).  Vars: see wrangler.toml.
 */

const RESEND_ENDPOINT = 'https://api.resend.com/emails'

const BRAND = {
  wine: '#6e1a2d',
  gold: '#8a6a2f',
  champagne: '#d9c08f',
  ivory: '#fbf7f4',
  line: '#eadcdb',
  text: '#2b1a20',
  muted: '#7a6a6e',
}

const ROUTES = {
  office: { title: 'פנייה חדשה מהאתר', subject: 'פנייה חדשה מ' },
  orit: { title: 'הרשמה חדשה לקבוצת "לחזור לעצמך"', subject: 'הרשמה חדשה מ' },
}

// ── HTTP ────────────────────────────────────────────────────────────────────

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || ''
    const allowed = (env.CORS_ORIGINS || '').split(',').map((s) => s.trim())
    const cors = allowed.includes(origin)
      ? { 'Access-Control-Allow-Origin': origin, Vary: 'Origin' }
      : {}

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: { ...cors, 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '86400' },
      })
    }

    const url = new URL(request.url)
    if (url.pathname !== '/lead') return json({ ok: false, error: 'not_found' }, 404, cors)
    if (request.method !== 'POST') return json({ ok: false, error: 'method_not_allowed' }, 405, cors)
    if (!allowed.includes(origin)) return json({ ok: false, error: 'forbidden_origin' }, 403, cors)

    const ip = request.headers.get('CF-Connecting-IP') || 'unknown'
    if (env.LEAD_LIMITER) {
      const { success } = await env.LEAD_LIMITER.limit({ key: ip })
      if (!success) return json({ ok: false, error: 'rate_limited' }, 429, cors)
    }

    let data
    try {
      data = await request.json()
    } catch {
      return json({ ok: false, error: 'bad_json' }, 400, cors)
    }

    // Bots get a normal-looking success and nothing is sent.
    if (looksLikeSpam(data)) return json({ ok: true }, 200, cors)

    const lead = normalize(data)
    if (!lead.name || (!lead.phone && !lead.email)) {
      return json({ ok: false, error: 'missing_fields' }, 400, cors)
    }

    try {
      await sendOfficeEmail(env, lead)
    } catch (err) {
      console.error('office email failed', err)
      return json({ ok: false, error: 'send_failed' }, 502, cors)
    }
    // Stored for the daily report; a storage hiccup must not fail the lead.
    try {
      await storeLead(env, lead)
    } catch (err) {
      console.error('store lead failed', err)
    }
    // The auto-reply is a courtesy; never fail the request because of it.
    if (lead.email) {
      try {
        await sendAutoReply(env, lead)
      } catch (err) {
        console.error('auto-reply failed', err)
      }
    }
    return json({ ok: true }, 200, cors)
  },

  async scheduled(event, env, ctx) {
    ctx.waitUntil(runDailyReport(env))
  },
}

// ── Daily report (18:00 Israel time, only on days with leads) ───────────────

const LEAD_TTL_SECONDS = 60 * 24 * 60 * 60 // keep 60 days, then auto-delete

function israelParts(date = new Date()) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Jerusalem', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
    }).formatToParts(date).map((p) => [p.type, p.value])
  )
  return { day: `${parts.year}-${parts.month}-${parts.day}`, hour: Number(parts.hour), time: `${parts.hour}:${parts.minute}` }
}

async function storeLead(env, lead) {
  if (!env.LEADS_KV) return
  const { day, time } = israelParts()
  const key = `lead:${day}:${Date.now()}:${crypto.randomUUID().slice(0, 8)}`
  await env.LEADS_KV.put(key, JSON.stringify({ ...lead, time }), { expirationTtl: LEAD_TTL_SECONDS })
}

/** Sends the report for `day` (default: today in Israel). `force` skips the 18:00 and already-sent checks. */
async function runDailyReport(env, { force = false, day } = {}) {
  const now = israelParts()
  if (!force && now.hour !== 18) return 'not 18:00 in Israel'
  const reportDay = day || now.day
  const sentKey = `report-sent:${reportDay}`
  if (!force && (await env.LEADS_KV.get(sentKey))) return 'already sent'

  // Window: 18:00 yesterday → 18:00 today, so leads after 18:00 make the next report.
  const prevDay = new Date(Date.parse(`${reportDay}T12:00:00Z`) - 86400000).toISOString().slice(0, 10)
  const leads = [
    ...(await leadsFor(env, prevDay)).filter((l) => l.time >= '18:00').map((l) => ({ ...l, yesterday: true })),
    ...(await leadsFor(env, reportDay)).filter((l) => l.time < '18:00'),
  ]

  if (leads.length === 0) return 'no leads'
  leads.sort((a, b) => Number(!a.yesterday) - Number(!b.yesterday) || a.time.localeCompare(b.time))
  await sendReportEmail(env, reportDay, leads)
  await env.LEADS_KV.put(sentKey, '1', { expirationTtl: 7 * 24 * 60 * 60 })
  return `sent ${leads.length}`
}

async function leadsFor(env, day) {
  const out = []
  let cursor
  do {
    const page = await env.LEADS_KV.list({ prefix: `lead:${day}:`, cursor })
    for (const k of page.keys) {
      const v = await env.LEADS_KV.get(k.name, 'json')
      if (v) out.push(v)
    }
    cursor = page.list_complete ? undefined : page.cursor
  } while (cursor)
  return out
}

async function sendReportEmail(env, day, leads) {
  const [y, m, d] = day.split('-')
  const dateHe = `${d}/${m}/${y}`
  const count = leads.length === 1 ? 'פנייה אחת' : `${leads.length} פניות`

  const bySource = {}
  for (const l of leads) bySource[l.source] = (bySource[l.source] || 0) + 1
  const summary = Object.entries(bySource)
    .map(([s, n]) => `<span style="display:inline-block;margin:3px 0 3px 6px;padding:5px 12px;border-radius:999px;background:#f6efe0;color:${BRAND.gold};font-size:13px;font-weight:bold">${esc(s)}: ${n}</span>`)
    .join('')

  const cards = leads.map((l, i) => {
    const lines = []
    if (l.phone) {
      lines.push(`<a href="tel:+${intlPhone(l.phone)}" style="color:${BRAND.wine};text-decoration:none;font-weight:bold">${ltr(displayPhone(l.phone))}</a>
 · <a href="https://wa.me/${intlPhone(l.phone)}" style="color:#1f8f4e;text-decoration:none;font-weight:bold">וואטסאפ</a>`)
    }
    if (l.email) lines.push(`<a href="mailto:${esc(l.email)}" style="color:${BRAND.wine};text-decoration:none">${ltr(esc(l.email))}</a>`)
    const extra = [l.entity && `סוג תיק: ${esc(l.entity)}`, l.service && `שירות: ${esc(l.service)}`, l.sessionDate && `מועד: ${esc(l.sessionDate)}`]
      .concat((l.discounts || []).map((x) => `הנחה: ${esc(x)}`))
      .filter(Boolean)
    return `<tr><td style="padding:14px 0;border-bottom:1px solid ${BRAND.line}">
<div style="font-size:12px;color:${BRAND.muted}">${i + 1}. ${l.yesterday ? 'אתמול ' : ''}${ltr(esc(l.time))} · ${esc(l.source)}</div>
<div style="font-size:18px;font-weight:bold;color:${BRAND.text};margin-top:3px">${esc(l.name)}</div>
${lines.map((x) => `<div style="font-size:15px;margin-top:4px">${x}</div>`).join('')}
${extra.length ? `<div style="font-size:13px;color:${BRAND.gold};margin-top:6px">${extra.join(' · ')}</div>` : ''}
${l.message ? `<div style="font-size:14px;color:${BRAND.text};background:${BRAND.ivory};border-right:3px solid ${BRAND.champagne};border-radius:6px;padding:8px 12px;margin-top:8px;line-height:1.6">${esc(l.message).replace(/\n/g, '<br>')}</div>` : ''}
</td></tr>`
  }).join('')

  const html = shell(`דוח פניות יומי · ${dateHe}`, `
<tr><td style="padding:22px 28px 4px">
<div style="font-size:28px;font-weight:bold;color:${BRAND.wine}">${count}</div>
<div style="font-size:14px;color:${BRAND.muted};margin-top:2px">התקבלו מהאתר ומדפי הנחיתה, מ־18:00 אתמול עד 18:00 היום</div>
<div style="margin-top:10px">${summary}</div>
</td></tr>
<tr><td style="padding:6px 28px 8px"><table role="presentation" dir="rtl" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">${cards}</table></td></tr>
<tr><td style="padding:16px 28px 22px;color:${BRAND.muted};font-size:12px">הדוח נשלח אוטומטית בכל יום בשעה 18:00, ורק אם התקבלו פניות.</td></tr>`)

  const text = [`דוח פניות יומי ${dateHe}: ${count}`, '']
    .concat(leads.map((l, i) => `${i + 1}. ${l.time} | ${l.name} | ${l.phone ? displayPhone(l.phone) : ''} ${l.email || ''} | ${l.source}`))
    .map((x) => '‏' + x)
    .join('\n')

  await resend(env, {
    from: env.EMAIL_FROM,
    to: [env.REPORT_EMAIL],
    subject: `דוח פניות יומי · ${dateHe} · ${count}`,
    html,
    text,
  })
}

function json(body, status, headers) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'X-Content-Type-Options': 'nosniff', ...headers },
  })
}

// ── Lead data ───────────────────────────────────────────────────────────────

const str = (v, max = 2000) => String(v ?? '').trim().slice(0, max)

function normalize(d) {
  const target = d.target === 'orit' ? 'orit' : 'office'
  const discounts = Array.isArray(d.discounts) ? d.discounts.map((x) => str(x, 200)).filter(Boolean).slice(0, 5) : []
  return {
    target,
    name: str(d.name, 120),
    phone: normalizePhone(d.phone),
    rawPhone: str(d.phone, 40),
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str(d.email)) ? str(d.email, 200) : '',
    entity: str(d.entity, 120),
    service: str(d.service, 120),
    sessionDate: str(d.sessionDate, 120),
    message: str(d.message || d.note, 4000),
    discounts,
    source: str(d.source, 120) || (target === 'orit' ? 'דף לחזור לעצמך' : 'האתר הראשי'),
  }
}

function looksLikeSpam(d) {
  if (d.company_website) return true // honeypot
  const name = String(d.name || '').trim()
  const inner = name.slice(1)
  if (name.length >= 8 && /^[A-Za-z]+$/.test(name) && /[a-z]/.test(name) && (inner.match(/[A-Z]/g) || []).length >= 2) {
    return true // e.g. "ZzSJUTEzqilpXpwPN"
  }
  if (d.phone && !normalizePhone(d.phone)) return true // not an Israeli number
  return false
}

/** Local Israeli form (0523975659) or '' if not an Israeli number. */
function normalizePhone(raw) {
  let p = String(raw || '').replace(/[\s\-().]/g, '')
  if (p.startsWith('+972')) p = '0' + p.slice(4)
  else if (p.startsWith('972') && p.length >= 11) p = '0' + p.slice(3)
  return /^0(?:[23489]\d{7}|[57]\d{8})$/.test(p) ? p : ''
}

const displayPhone = (p) => (/^0[57]/.test(p) ? `${p.slice(0, 3)}-${p.slice(3)}` : `${p.slice(0, 2)}-${p.slice(2)}`)
const intlPhone = (p) => '972' + p.slice(1)

// ── HTML helpers (tables + inline styles: safe in Gmail/Outlook) ────────────

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}
const ltr = (s) => `<span dir="ltr" style="unicode-bidi:isolate;direction:ltr">${s}</span>`

// Round icon buttons (white PNG glyph on a brand-colour circle). Icons are
// hosted on the site because email clients don't render SVG; `label` is the
// alt/title text shown if a client blocks images.
const ICON_BASE = 'https://za-cpa.com/brand/email'

function button(href, label, bg, icon) {
  return `<td style="padding:0 0 0 12px"><a href="${esc(href)}" title="${esc(label)}" style="display:inline-block;width:52px;height:52px;border-radius:50%;background:${bg};text-align:center;text-decoration:none;color:#ffffff;font-size:11px;font-weight:bold"><img src="${ICON_BASE}/${icon}.png" width="26" height="26" alt="${esc(label)}" style="display:block;border:0;margin:13px auto 0;width:26px;height:26px"></a></td>`
}

function row(label, valueHtml) {
  const cell = `padding:11px 0;border-bottom:1px solid ${BRAND.line}`
  return `<tr><td style="${cell};color:${BRAND.muted};font-size:14px;width:110px;vertical-align:top">${label}</td><td style="${cell};color:${BRAND.text};font-size:16px;font-weight:bold">${valueHtml}</td></tr>`
}

function israelTime() {
  return new Intl.DateTimeFormat('he-IL', {
    timeZone: 'Asia/Jerusalem', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
  }).format(new Date())
}

function shell(title, inner) {
  return `<div dir="rtl" lang="he" style="direction:rtl;text-align:right;background:#f4ece9;padding:24px 10px;font-family:Arial,Helvetica,sans-serif">
<table role="presentation" dir="rtl" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border-collapse:separate">
<tr><td style="background:${BRAND.wine};padding:22px 28px">
<div style="color:${BRAND.champagne};font-size:13px;letter-spacing:1px">עשור · רואי חשבון</div>
<div style="color:#ffffff;font-size:21px;font-weight:bold;margin-top:4px">${esc(title)}</div>
</td></tr>${inner}</table></div>`
}

// ── Emails ──────────────────────────────────────────────────────────────────

async function resend(env, payload) {
  const res = await fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers: { Authorization: `Bearer ${String(env.RESEND_API_KEY).replace(/^﻿/, '').trim()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`)
}

async function sendOfficeEmail(env, l) {
  const route = ROUTES[l.target]
  let buttons = ''
  if (l.phone) {
    buttons += button(`tel:+${intlPhone(l.phone)}`, 'התקשרות', BRAND.wine, 'phone')
    buttons += button(`https://wa.me/${intlPhone(l.phone)}`, 'וואטסאפ', '#1f8f4e', 'whatsapp')
  }
  if (l.email) buttons += button(`mailto:${l.email}`, 'מענה במייל', BRAND.gold, 'mail')

  let rows = ''
  if (l.phone) rows += row('טלפון', `<a href="tel:+${intlPhone(l.phone)}" style="color:${BRAND.wine};text-decoration:none">${ltr(displayPhone(l.phone))}</a>`)
  else if (l.rawPhone) rows += row('טלפון', ltr(esc(l.rawPhone)))
  if (l.email) rows += row('אימייל', `<a href="mailto:${esc(l.email)}" style="color:${BRAND.wine};text-decoration:none">${ltr(esc(l.email))}</a>`)
  if (l.entity) rows += row('סוג תיק', esc(l.entity))
  if (l.service) rows += row('שירות מבוקש', esc(l.service))
  if (l.sessionDate) rows += row('מועד מבוקש', esc(l.sessionDate))
  rows += row('מקור', esc(l.source))

  const discounts = l.discounts.length
    ? `<tr><td style="padding:0 28px 8px"><div style="background:#f6efe0;border:1px solid ${BRAND.champagne};border-radius:12px;padding:14px 16px">
<div style="font-weight:bold;color:${BRAND.gold};margin-bottom:6px;font-size:14px">זכאות להנחה</div>
${l.discounts.map((d) => `<div style="color:${BRAND.text};font-size:15px;line-height:1.6">✓ ${esc(d)}</div>`).join('')}</div></td></tr>`
    : ''

  const message = l.message
    ? `<tr><td style="padding:8px 28px 4px"><div style="font-weight:bold;color:${BRAND.muted};font-size:14px;margin-bottom:6px">הודעה</div>
<div style="background:${BRAND.ivory};border-right:4px solid ${BRAND.champagne};border-radius:8px;padding:14px 16px;color:${BRAND.text};font-size:15px;line-height:1.7">${esc(l.message).replace(/\n/g, '<br>')}</div></td></tr>`
    : ''

  const html = shell(route.title, `
<tr><td style="padding:24px 28px 6px"><div style="color:${BRAND.muted};font-size:13px">שם הפונה</div>
<div style="color:${BRAND.wine};font-size:26px;font-weight:bold;margin-top:2px">${esc(l.name)}</div></td></tr>
${buttons ? `<tr><td style="padding:10px 24px 6px"><table role="presentation" cellpadding="0" cellspacing="0"><tr>${buttons}</tr></table></td></tr>` : ''}
<tr><td style="padding:10px 28px 14px"><table role="presentation" dir="rtl" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">${rows}</table></td></tr>
${discounts}${message}
<tr><td style="padding:18px 28px 22px;color:${BRAND.muted};font-size:12px">התקבל ב־${ltr(israelTime())} · נשלח אוטומטית מאתר za-cpa.com</td></tr>`)

  const RLM = '‏'
  const text = [
    route.title, '', `שם: ${l.name}`,
    l.phone ? `טלפון: ‎${displayPhone(l.phone)}‏` : '',
    l.email ? `אימייל: ‎${l.email}‏` : '',
    l.entity ? `סוג תיק: ${l.entity}` : '',
    l.service ? `שירות מבוקש: ${l.service}` : '',
    l.sessionDate ? `מועד מבוקש: ${l.sessionDate}` : '',
    ...l.discounts.map((d) => `הנחה: ${d}`),
    `מקור: ${l.source}`,
    l.message ? `\nהודעה:\n${l.message}` : '',
  ].filter(Boolean).map((x) => RLM + x).join('\n')

  await resend(env, {
    from: env.EMAIL_FROM,
    to: [l.target === 'orit' ? env.ORIT_EMAIL : env.OFFICE_EMAIL],
    reply_to: l.email || undefined,
    subject: `${route.subject}: ${l.source}`,
    html,
    text,
  })
}

async function sendAutoReply(env, l) {
  const isOrit = l.target === 'orit'
  const title = isOrit ? 'קיבלנו את ההרשמה שלך' : 'קיבלנו את פנייתך'
  const body = isOrit
    ? 'תודה שנרשמת לקבוצת "לחזור לעצמך". אחזור אלייך בהקדם עם כל הפרטים.'
    : 'תודה שפנית למשרד עשור רואי חשבון. פנייתך התקבלה, ואחד מאנשי הצוות יחזור אליך בהקדם.'
  const signature = isOrit ? 'אורית עשור' : 'צוות עשור רואי חשבון'

  const html = shell(title, `
<tr><td style="padding:26px 28px 8px;color:${BRAND.text};font-size:16px;line-height:1.8">
<div style="font-size:18px;font-weight:bold;color:${BRAND.wine}">שלום ${esc(l.name)},</div>
<div style="margin-top:10px">${esc(body)}</div>
<div style="margin-top:18px">בברכה,<br><b>${esc(signature)}</b></div>
</td></tr>
<tr><td style="padding:16px 28px 24px;color:${BRAND.muted};font-size:13px;line-height:1.7;border-top:1px solid ${BRAND.line}">
עשור רואי חשבון · רח׳ נחום חפצדי 17, ירושלים (מגדל רם, קומה 11)<br>
טלפון ${ltr(esc(env.OFFICE_PHONE))} · ${ltr('za-cpa.com')}<br>
מייל זה נשלח אוטומטית בעקבות פנייה באתר.</td></tr>`)

  await resend(env, {
    from: env.EMAIL_FROM,
    to: [l.email],
    reply_to: isOrit ? env.ORIT_EMAIL : env.OFFICE_EMAIL,
    subject: `${title} · עשור רואי חשבון`,
    html,
    text: `‏שלום ${l.name},\n‏${body}\n\n‏בברכה,\n‏${signature}`,
  })
}
