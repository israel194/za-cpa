// Google Apps Script web-app endpoint. Replace this URL after deploying
// apps-script/Code.gs (see that file's header for instructions).
const NOTIFY_ENDPOINT =
  'https://script.google.com/macros/s/REPLACE_WITH_YOUR_DEPLOYMENT_ID/exec'

export type NotifyTarget = 'office' | 'orit'

export type NotifyPayload = {
  target: NotifyTarget
  name: string
  email?: string
  phone?: string
  message?: string
  sessionDate?: string
}

export async function sendLead(payload: NotifyPayload): Promise<boolean> {
  if (NOTIFY_ENDPOINT.includes('REPLACE_WITH_YOUR_DEPLOYMENT_ID')) {
    console.warn('[notify] endpoint not configured — skipping send', payload)
    return false
  }
  try {
    // text/plain avoids the CORS preflight that Apps Script can't answer.
    // keepalive lets the request finish even if we navigate away (e.g. SUMIT redirect).
    await fetch(NOTIFY_ENDPOINT, {
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
