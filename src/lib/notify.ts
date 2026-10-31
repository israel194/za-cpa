// Lead delivery. Primary: Web3Forms (same service as asor-law.com) — the form
// posts straight to api.web3forms.com and the lead lands in the inbox tied to
// the access key. Fallback: the legacy Google Apps Script endpoint, used only
// while a target has no Web3Forms key yet.
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
    subject: `${isOrit ? 'הרשמה חדשה לקבוצה' : 'פנייה חדשה'}: ${p.name}${p.source ? ' · ' + p.source : ''}`,
    from_name: isOrit ? 'לחזור לעצמך · אורית עשור' : 'אתר עשור רואי חשבון',
    botcheck: false,
  }
  if (p.email) payload.replyto = p.email
  for (const [label, value] of Object.entries(fields)) {
    if (value) payload[RLM + label] = RLM + value
  }
  return payload
}

export async function sendLead(payload: NotifyPayload): Promise<boolean> {
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
