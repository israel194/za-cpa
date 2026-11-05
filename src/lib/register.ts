// Registration + payment client for Orit's programs. The za-cpa-leads worker stores the
// registration and, for card payments, opens a SUMIT payment page in the customer's name
// (SUMIT issues and emails the tax invoice/receipt on success).

import { adminPassword } from './cms'

const BASE = 'https://za-cpa-leads.za-cpa-leads.workers.dev'

export type ProductId = 'frequency-course' | 'retreat'
export type PayMethod = 'card' | 'manual'

export type RegisterResult = { ok: boolean; id: string | null; redirect: string | null; fallback?: 'manual' }

export async function register(input: {
  product: ProductId
  name: string
  email: string
  phone: string
  sessionDate?: string
  method: PayMethod
  website?: string
}): Promise<RegisterResult> {
  const res = await fetch(`${BASE}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  if (!res.ok) throw new Error(`register_${res.status}`)
  return (await res.json()) as RegisterResult
}

export async function confirmPayment(id: string, paymentId: string): Promise<{ ok: boolean; status?: string; product?: string; error?: string }> {
  const res = await fetch(`${BASE}/register/confirm`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, paymentId }),
  })
  return res.json()
}

export type Registration = {
  id: string
  product: ProductId
  productName: string
  amount: number
  name: string
  email: string
  phone: string
  sessionDate: string
  method: PayMethod
  status: 'awaiting_card' | 'awaiting_manual' | 'paid' | 'cancelled'
  createdAt: string
  paidAt: string | null
  paymentMethod: string | null
  documentNumber: number | null
  note: string
}

async function admin(path: string, init: RequestInit = {}) {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminPassword.get()}`, ...init.headers },
  })
  if (res.status === 401) throw new Error('unauthorized')
  const body = await res.json()
  if (!res.ok) throw new Error(body?.detail || body?.error || `http_${res.status}`)
  return body
}

export async function listRegistrations(): Promise<{ registrations: Registration[]; sumitConfigured: boolean }> {
  return admin('/admin/registrations')
}

export async function markPaid(id: string, method: string, date: string, invoice: boolean): Promise<Registration> {
  return (await admin(`/admin/registrations/${id}`, { method: 'POST', body: JSON.stringify({ action: 'mark-paid', method, date, invoice }) })).registration
}

export async function setCancelled(id: string, cancelled: boolean): Promise<Registration> {
  return (await admin(`/admin/registrations/${id}`, { method: 'POST', body: JSON.stringify({ action: cancelled ? 'cancel' : 'reopen' }) })).registration
}

export const STATUS_LABEL: Record<Registration['status'], string> = {
  awaiting_card: 'ממתינה לתשלום באשראי',
  awaiting_manual: 'ממתינה לתשלום ידני',
  paid: 'שילמה',
  cancelled: 'בוטלה',
}
