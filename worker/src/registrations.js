/**
 * Registrations + payments for Orit's programs (frequency course, retreat).
 *
 *   POST /register                 public: store a registration; for card payment, open a SUMIT
 *                                  payment page in the customer's name (InvoiceAndReceipt is issued
 *                                  and emailed by SUMIT on success) and return its URL.
 *   POST /register/confirm         public: { id, paymentId } after SUMIT redirects back. Verified
 *                                  server-side with SUMIT before anything is marked paid.
 *   POST /register/ipn?id=...      SUMIT server callback (same verification as confirm).
 *   GET  /admin/registrations      admin: all registrations (JSON).
 *   POST /admin/registrations/:id  admin: { action: 'mark-paid', method, date, invoice } issues an
 *                                  InvoiceAndReceipt for a manual payment and emails it; or
 *                                  { action: 'cancel' | 'reopen', note }.
 *
 * Secrets: SUMIT_COMPANY_ID, SUMIT_API_KEY (never sent to the browser).
 */

const SUMIT = 'https://api.sumit.co.il'
const SITE = 'https://za-cpa.com'

export const PRODUCTS = {
  'frequency-course': { name: 'קורס העלאת תדר', amount: 880 },
  retreat: { name: 'ריטריט לחזור לעצמך', amount: 199 },
}

// SUMIT DocumentPaymentType
const MANUAL_METHODS = {
  cash: { type: 2, label: 'מזומן' },
  transfer: { type: 3, label: 'העברה בנקאית' },
  cheque: { type: 4, label: "צ'ק" },
  bit: { type: 6, label: 'ביט / אפליקציה' },
  other: { type: 8, label: 'אחר' },
  // Paid by card through SUMIT but the confirmation never reached us: SUMIT already issued the invoice.
  card: { type: 5, label: 'אשראי (SUMIT)', noInvoice: true },
}

const DOC_INVOICE_RECEIPT = 1

// ── helpers ─────────────────────────────────────────────────────────────────

function nowIso() {
  return new Date().toISOString()
}

function clean(v, max = 200) {
  return String(v ?? '').replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, max)
}

async function getReg(env, id) {
  return env.LEADS_KV.get(`reg:${id}`, 'json')
}

async function putReg(env, reg) {
  reg.updatedAt = nowIso()
  await env.LEADS_KV.put(`reg:${reg.id}`, JSON.stringify(reg))
  return reg
}

function credentials(env) {
  return { CompanyID: Number(String(env.SUMIT_COMPANY_ID || '').trim()), APIKey: String(env.SUMIT_API_KEY || '').replace(/^﻿/, '').trim() }
}

async function sumit(env, path, body) {
  if (!env.SUMIT_API_KEY || !env.SUMIT_COMPANY_ID) throw new Error('sumit_not_configured')
  const res = await fetch(`${SUMIT}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...body, Credentials: credentials(env) }),
  })
  const data = await res.json().catch(() => null)
  if (!res.ok || !data || data.Status !== 0) {
    throw new Error(`sumit ${path}: ${data?.UserErrorMessage || data?.TechnicalErrorDetails || res.status}`)
  }
  return data.Data
}

function customerOf(reg) {
  return { Name: reg.name, EmailAddress: reg.email || null, Phone: reg.phone || null, SearchMode: 0 }
}

function itemsOf(reg) {
  return [{ Item: { Name: reg.productName }, Quantity: 1, UnitPrice: reg.amount }]
}

// ── public: register / confirm ──────────────────────────────────────────────

export async function handleRegister(request, env, url, cors, json, notify) {
  const parts = url.pathname.split('/').filter(Boolean) // ['register'] | ['register','confirm'|'ipn']

  if (parts.length === 1 && request.method === 'POST') {
    let data
    try {
      data = await request.json()
    } catch {
      return json({ ok: false, error: 'bad_json' }, 400, cors)
    }
    if (data.website) return json({ ok: true, id: null, redirect: null }, 200, cors) // honeypot
    const product = PRODUCTS[data.product]
    if (!product) return json({ ok: false, error: 'unknown_product' }, 400, cors)
    const name = clean(data.name, 120)
    const email = clean(data.email, 160).toLowerCase()
    const phone = clean(data.phone, 40)
    if (!name || !email || !/^\S+@\S+\.\S+$/.test(email)) return json({ ok: false, error: 'missing_fields' }, 400, cors)
    const method = data.method === 'manual' ? 'manual' : 'card'

    const reg = {
      id: crypto.randomUUID(),
      product: data.product,
      productName: product.name,
      amount: product.amount,
      name,
      email,
      phone,
      sessionDate: clean(data.sessionDate, 40),
      method,
      status: method === 'manual' ? 'awaiting_manual' : 'awaiting_card',
      createdAt: nowIso(),
      paidAt: null,
      paymentId: null,
      paymentMethod: null,
      documentNumber: null,
      note: '',
    }
    await putReg(env, reg)

    // Orit gets the usual signup email; never fail the registration because of it.
    try {
      await notify({
        target: 'orit',
        source: `${product.name} (${method === 'manual' ? 'תשלום ידני' : 'תשלום באשראי'})`,
        name, email, phone,
        sessionDate: reg.sessionDate,
        message: `${product.name}, ${product.amount} ש"ח. ${method === 'manual' ? 'ביקשה לשלם ידנית.' : 'עברה לדף תשלום באשראי.'}`,
      })
    } catch (err) {
      console.error('register notify failed', err)
    }

    if (method === 'manual') return json({ ok: true, id: reg.id, redirect: null }, 200, cors)

    try {
      const d = await sumit(env, '/billing/payments/beginredirect/', {
        Customer: customerOf(reg),
        Items: itemsOf(reg),
        VATIncluded: true,
        DocumentType: DOC_INVOICE_RECEIPT,
        DocumentDescription: product.name,
        ExternalIdentifier: reg.id,
        RedirectURL: `${SITE}/payment/thanks`,
        CancelRedirectURL: `${SITE}/payment/cancel`,
        IPNURL: `${new URL(request.url).origin}/register/ipn?id=${reg.id}`,
        SendUpdateByEmailAddress: email,
        UpdateCustomerOnSuccess: true,
        UpdateOrganizationOnSuccess: true,
        MaximumPayments: 1,
        ExpirationHours: 72,
        Language: 0,
        Header: product.name,
      })
      return json({ ok: true, id: reg.id, redirect: d.RedirectURL }, 200, cors)
    } catch (err) {
      console.error('beginredirect failed', err)
      reg.status = 'awaiting_manual'
      reg.note = 'לא נפתח דף תשלום באשראי: ' + String(err.message).slice(0, 160)
      await putReg(env, reg)
      return json({ ok: true, id: reg.id, redirect: null, fallback: 'manual' }, 200, cors)
    }
  }

  if (parts[1] === 'confirm' && request.method === 'POST') {
    let data
    try {
      data = await request.json()
    } catch {
      return json({ ok: false, error: 'bad_json' }, 400, cors)
    }
    const r = await verifyAndMark(env, clean(data.id, 64), clean(data.paymentId, 40))
    return json(r, r.ok ? 200 : 400, cors)
  }

  if (parts[1] === 'ipn') {
    let fields = Object.fromEntries(url.searchParams)
    try {
      const ct = request.headers.get('Content-Type') || ''
      if (ct.includes('json')) fields = { ...fields, ...(await request.json()) }
      else if (request.method === 'POST') fields = { ...fields, ...Object.fromEntries(await request.formData()) }
    } catch {
      /* query string only */
    }
    const id = clean(fields.id || fields['OG-ExternalIdentifier'] || fields.ExternalIdentifier, 64)
    const paymentId = clean(fields['OG-PaymentID'] || fields.PaymentID || fields.paymentid, 40)
    const r = await verifyAndMark(env, id, paymentId)
    return json(r, 200, {})
  }

  return json({ ok: false, error: 'not_found' }, 404, cors)
}

async function verifyAndMark(env, id, paymentId) {
  if (!id || !paymentId) return { ok: false, error: 'missing' }
  const reg = await getReg(env, id)
  if (!reg) return { ok: false, error: 'unknown_registration' }
  if (reg.status === 'paid') return { ok: true, status: 'paid', product: reg.productName }
  let p
  try {
    p = (await sumit(env, '/billing/payments/get/', { PaymentID: Number(paymentId) })).Payment
  } catch (err) {
    console.error('payments/get failed', err)
    return { ok: false, error: 'verify_failed' }
  }
  const matches = p && p.ValidPayment && (!p.ExternalIdentifier || p.ExternalIdentifier === reg.id) && Number(p.Amount) >= reg.amount - 0.01
  if (!matches) return { ok: false, error: 'payment_not_valid' }
  reg.status = 'paid'
  reg.paidAt = p.Date || nowIso()
  reg.paymentId = String(p.ID)
  reg.paymentMethod = 'אשראי'
  reg.documentId = p.DocumentID || null
  await putReg(env, reg)
  return { ok: true, status: 'paid', product: reg.productName }
}

// ── admin ───────────────────────────────────────────────────────────────────

export async function handleAdminRegistrations(request, env, url, cors, json) {
  const parts = url.pathname.split('/').filter(Boolean) // ['admin','registrations', id?]

  if (request.method === 'GET' && parts.length === 2) {
    const out = []
    let cursor
    do {
      const page = await env.LEADS_KV.list({ prefix: 'reg:', cursor })
      for (const k of page.keys) {
        const v = await env.LEADS_KV.get(k.name, 'json')
        if (v) out.push(v)
      }
      cursor = page.list_complete ? undefined : page.cursor
    } while (cursor)
    out.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    return json({ ok: true, registrations: out, sumitConfigured: Boolean(env.SUMIT_API_KEY && env.SUMIT_COMPANY_ID) }, 200, cors)
  }

  if (request.method === 'POST' && parts.length === 3) {
    const reg = await getReg(env, parts[2])
    if (!reg) return json({ ok: false, error: 'not_found' }, 404, cors)
    let body
    try {
      body = await request.json()
    } catch {
      return json({ ok: false, error: 'bad_json' }, 400, cors)
    }

    if (body.action === 'mark-paid') {
      if (reg.status === 'paid') return json({ ok: true, registration: reg }, 200, cors)
      const m = MANUAL_METHODS[body.method] || MANUAL_METHODS.other
      const date = /^\d{4}-\d{2}-\d{2}$/.test(body.date || '') ? body.date : nowIso().slice(0, 10)
      if (body.invoice !== false && !m.noInvoice) {
        try {
          const d = await sumit(env, '/accounting/documents/create/', {
            Details: {
              Type: DOC_INVOICE_RECEIPT,
              Date: date,
              Customer: customerOf(reg),
              Description: reg.productName,
              ExternalReference: reg.id,
              SendByEmail: reg.email ? { EmailAddress: reg.email, Original: true } : null,
            },
            Items: itemsOf(reg),
            Payments: [{ Amount: reg.amount, Type: m.type }],
            VATIncluded: true,
          })
          reg.documentId = d.DocumentID
          reg.documentNumber = d.DocumentNumber
        } catch (err) {
          console.error('documents/create failed', err)
          return json({ ok: false, error: 'invoice_failed', detail: String(err.message).slice(0, 200) }, 502, cors)
        }
      }
      reg.status = 'paid'
      reg.paidAt = date
      reg.paymentMethod = m.label
      if (body.note) reg.note = clean(body.note, 300)
      await putReg(env, reg)
      return json({ ok: true, registration: reg }, 200, cors)
    }

    if (body.action === 'cancel' || body.action === 'reopen') {
      if (reg.status === 'paid' && body.action === 'cancel') return json({ ok: false, error: 'already_paid' }, 409, cors)
      reg.status = body.action === 'cancel' ? 'cancelled' : reg.method === 'manual' ? 'awaiting_manual' : 'awaiting_card'
      if (body.note) reg.note = clean(body.note, 300)
      await putReg(env, reg)
      return json({ ok: true, registration: reg }, 200, cors)
    }
    return json({ ok: false, error: 'bad_action' }, 400, cors)
  }

  return json({ ok: false, error: 'not_found' }, 404, cors)
}
