// Tiny CMS client: page content is stored by the za-cpa-leads worker (KV).
// Reads are public; writes require the admin password (sent as a Bearer token).

const CMS_BASE = 'https://za-cpa-leads.za-cpa-leads.workers.dev'
const PW_KEY = 'za-cpa-admin-pw'

export type Saved<T> = { content: T | null; updatedAt: string | null }
export type HistoryEntry = { ts: string }

export async function loadContent<T>(slug: string): Promise<Saved<T>> {
  try {
    const res = await fetch(`${CMS_BASE}/content/${slug}`, { cache: 'no-store' })
    if (!res.ok) return { content: null, updatedAt: null }
    const body = (await res.json()) as { content?: T; updatedAt?: string }
    return { content: body.content ?? null, updatedAt: body.updatedAt ?? null }
  } catch {
    return { content: null, updatedAt: null }
  }
}

export const adminPassword = {
  get: () => sessionStorage.getItem(PW_KEY) ?? '',
  set: (pw: string) => sessionStorage.setItem(PW_KEY, pw),
  clear: () => sessionStorage.removeItem(PW_KEY),
}

async function authed(path: string, init: RequestInit = {}) {
  const res = await fetch(`${CMS_BASE}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminPassword.get()}`, ...init.headers },
  })
  if (res.status === 401) throw new Error('unauthorized')
  if (res.status === 429) throw new Error('rate_limited')
  if (!res.ok) throw new Error(`http_${res.status}`)
  return res.json()
}

export async function checkPassword(pw: string): Promise<boolean> {
  adminPassword.set(pw)
  try {
    await authed('/admin/check', { method: 'POST' })
    return true
  } catch {
    adminPassword.clear()
    return false
  }
}

export async function saveContent<T>(slug: string, content: T): Promise<string> {
  const body = (await authed(`/content/${slug}`, { method: 'PUT', body: JSON.stringify({ content }) })) as { updatedAt: string }
  return body.updatedAt
}

export async function listHistory(slug: string): Promise<HistoryEntry[]> {
  const body = (await authed(`/content/${slug}/history`)) as { history: HistoryEntry[] }
  return body.history
}

export async function loadVersion<T>(slug: string, ts: string): Promise<T> {
  const body = (await authed(`/content/${slug}/history/${encodeURIComponent(ts)}`)) as { content: T }
  return body.content
}
