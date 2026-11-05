// Lead delivery, in order: our Cloudflare Worker (Resend) → Web3Forms (as on
// asor-law.com) → the legacy Google Apps Script endpoint.
//
// Keys are public by design (a Web3Forms access key can only send to the
// address it was issued for). Keep in sync with public/js/lead.js.
export type NotifyTarget = 'office' | 'orit'

export const WEB3FORMS_KEYS: Record<NotifyTarget, string> = {
  office: '13560a72-b20f-4464-9a9e-e7caed1755a0', // office@za-cpa.com
  orit: '', // orit@za-cpa.com
}

const APPS_SCRIPT_ENDPOINT =
  'https://script.google.com/a/macros/za-cpa.com/s/AKfycbwS025C9-OhEynAqpPWQc3RX4cDimKzLiH_zhW5Rr8yY0Jp4v4SgJDpaTAt3dnH09ud/exec'

export type NotifyPayload = {
  target: NotifyTarget
  name: string
  email?: string
  phone?: string
  message?: string
  sessionDate?: string
  /** Where the lead came from, shown in the notification email */
  source?: string
}

const RLM = '‏' // forces each line right-to-left in the email
const LRI = '⁦' // isolates phone/email so digits keep their order
const PDI = '⁩'

function israeliPhone(raw = ''): string {
  let d = raw.replace(/[\s\-().]/g, '')
  if (d.startsWith('+972')) d = '0' + d.slice(4)
  else if (d.startsWith('972') && d.length >= 11) d = '0' + d.slice(3)
  return /^0(?:[23489]\d{7}|[57]\d{8})$/.test(d) ? d : ''
}

function web3Payload(p: NotifyPayload, key: string) {
  const phone = israeliPhone(p.phone)
  const shownPhone = phone
    ? /^0[57]/.test(phone)
      ? `${phone.slice(0, 3)}-${phone.slice(3)}`
      : `${phone.slice(0, 2)}-${phone.slice(2)}`
    : (p.phone ?? '')
  const isOrit = p.target === 'orit'
  const fields: Record<string, string> = {
    'שם': p.name,
    'טלפון': shownPhone && LRI + shownPhone + PDI,
    'וואטסאפ': phone ? `https://wa.me/972${phone.slice(1)}` : '',
    'אימייל': p.email ? LRI + p.email + PDI : '',
    'מועד מבוקש': p.sessionDate ?? '',
    'הודעה': p.message ?? '',
    'מקור': p.source ?? '',
  }
  const payload: Record<string, unknown> = {
    access_key: key,
    subject: `${isOrit ? 'הרשמה חדשה' : 'פנייה חדשה'} מ: ${p.source || (isOrit ? 'דף לחזור לעצמך' : 'האתר הראשי')}`,
    from_name: isOrit ? 'לחזור לעצמך · אורית עשור' : 'אתר עשור רואי חשבון',
    botcheck: false,
  }
  if (p.email) payload.replyto = p.email
  for (const [label, value] of Object.entries(fields)) {
    if (value) payload[RLM + label] = RLM + value
  }
  return payload
}

// Primary delivery: our own Cloudflare Worker (worker/ in this repo), which
// sends a branded email via Resend plus a Hebrew auto-reply to the lead.
const LEADS_ENDPOINT = 'https://za-cpa-leads.za-cpa-leads.workers.dev/lead'

async function viaWorker(p: NotifyPayload): Promise<boolean> {
  try {
    const res = await fetch(LEADS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(p),
      keepalive: true,
    })
    const body = (await res.json().catch(() => ({}))) as { ok?: boolean }
    return res.ok && !!body.ok
  } catch {
    return false
  }
}

/** Worker first, then Web3Forms, then the legacy Apps Script — a lead is never lost. */
export async function sendLead(payload: NotifyPayload): Promise<boolean> {
  if (await viaWorker(payload)) return true
  const key = WEB3FORMS_KEYS[payload.target]
  try {
    if (key) {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(web3Payload(payload, key)),
        keepalive: true,
      })
      return res.ok
    }
    // Legacy path. text/plain avoids the CORS preflight that Apps Script can't
    // answer; keepalive lets it finish even if we navigate away (SUMIT redirect).
    await fetch(APPS_SCRIPT_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      keepalive: true,
    })
    return true
  } catch (err) {
    console.error('[notify] send failed', err)
    return false
  }
}
