/*
 * Lead delivery for the static landing pages (mirrors src/lib/notify.ts).
 * Order: our Cloudflare Worker (Resend) → Web3Forms → legacy Apps Script.
 * Keys are public by design; keep them in sync with src/lib/notify.ts.
 */
(function () {
  var WEB3FORMS_KEYS = {
    office: '13560a72-b20f-4464-9a9e-e7caed1755a0', // office@za-cpa.com
    orit: '', // orit@za-cpa.com
  }
  var APPS_SCRIPT_ENDPOINT =
    'https://script.google.com/a/macros/za-cpa.com/s/AKfycbwS025C9-OhEynAqpPWQc3RX4cDimKzLiH_zhW5Rr8yY0Jp4v4SgJDpaTAt3dnH09ud/exec'

  var RLM = '‏'
  var LRI = '⁦'
  var PDI = '⁩'

  function israeliPhone(raw) {
    var d = String(raw || '').replace(/[\s\-().]/g, '')
    if (d.indexOf('+972') === 0) d = '0' + d.slice(4)
    else if (d.indexOf('972') === 0 && d.length >= 11) d = '0' + d.slice(3)
    return /^0(?:[23489]\d{7}|[57]\d{8})$/.test(d) ? d : ''
  }

  function web3Payload(p, key) {
    var phone = israeliPhone(p.phone)
    var shown = phone
      ? (/^0[57]/.test(phone) ? phone.slice(0, 3) + '-' + phone.slice(3) : phone.slice(0, 2) + '-' + phone.slice(2))
      : (p.phone || '')
    var fields = [
      ['שם', p.name],
      ['טלפון', shown ? LRI + shown + PDI : ''],
      ['וואטסאפ', phone ? 'https://wa.me/972' + phone.slice(1) : ''],
      ['אימייל', p.email ? LRI + p.email + PDI : ''],
      ['סוג תיק', p.entity],
      ['שירות מבוקש', p.service],
      ['הנחה', (p.discounts || []).join(' | ')],
      ['הודעה', p.note],
      ['מקור', p.source],
    ]
    var payload = {
      access_key: key,
      subject: 'פנייה חדשה מ: ' + (p.source || 'האתר'),
      from_name: 'אתר עשור רואי חשבון',
      botcheck: false,
    }
    if (p.email) payload.replyto = p.email
    fields.forEach(function (f) {
      if (f[1]) payload[RLM + f[0]] = RLM + f[1]
    })
    return payload
  }

  // Primary: our own Cloudflare Worker (branded email + Hebrew auto-reply via Resend).
  var LEADS_ENDPOINT = 'https://za-cpa-leads.za-cpa-leads.workers.dev/lead'

  function viaWorker(p) {
    return fetch(LEADS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        target: p.target || 'office',
        name: p.name,
        phone: p.phone,
        email: p.email,
        entity: p.entity,
        service: p.service,
        discounts: p.discounts,
        message: p.note,
        sessionDate: p.sessionDate,
        source: p.source,
      }),
      keepalive: true,
    }).then(function (res) {
      return res.json().then(function (b) { return res.ok && !!b.ok }, function () { return false })
    }, function () { return false })
  }

  /** Sends a lead. Resolves true when delivery was accepted. Never loses a lead:
   *  Worker first, then Web3Forms, then the legacy Apps Script endpoint. */
  window.zaSendLead = function (p) {
    return viaWorker(p).then(function (ok) {
      return ok ? true : fallback(p)
    })
  }

  function fallback(p) {
    var key = WEB3FORMS_KEYS[p.target || 'office']
    if (key) {
      return fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(web3Payload(p, key)),
        keepalive: true,
      }).then(function (res) {
        return res.json().then(function (body) { return !!body.success }, function () { return res.ok })
      })
    }
    // Legacy Apps Script: text/plain skips the CORS preflight; the response is opaque.
    return fetch(APPS_SCRIPT_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify(p.legacy || p),
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      mode: 'no-cors',
      keepalive: true,
    }).then(function () { return true })
  }
})()
