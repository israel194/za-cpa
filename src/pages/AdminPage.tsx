import { useCallback, useEffect, useMemo, useState } from 'react'
import { ChevronDown, ArrowUp, ArrowDown, Trash2, Plus, ExternalLink, History, LogOut, Save, RotateCcw, Lock, X } from 'lucide-react'
import { adminPassword, checkPassword, listHistory, loadContent, loadVersion, saveContent, type HistoryEntry } from '../lib/cms'
import { DEFAULT_FREQUENCY, FREQUENCY_SCHEMA, withDefaults, type Field, type FrequencyContent } from '../content/frequencyCourse'

// Pages the admin can edit. Add an entry here (and its slug in the worker's
// CONTENT_SLUGS) to make another landing page editable.
const PAGES = [
  {
    slug: 'frequency-course',
    title: 'קורס העלאת תדר',
    url: '/frequency-course',
    schema: FREQUENCY_SCHEMA,
    defaults: DEFAULT_FREQUENCY,
    normalize: withDefaults,
  },
]

type Data = FrequencyContent
type Toast = { kind: 'ok' | 'err'; text: string } | null

// ── path helpers ("hero.title", "registration.dates") ─────────────────────
function getAt(obj: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((o, k) => (o as Record<string, unknown> | undefined)?.[k], obj)
}
function setAt<T>(obj: T, path: string, value: unknown): T {
  const keys = path.split('.')
  const clone = structuredClone(obj) as Record<string, unknown>
  let cur = clone
  for (const k of keys.slice(0, -1)) cur = cur[k] as Record<string, unknown>
  cur[keys[keys.length - 1]] = value
  return clone as T
}

const heDate = (iso: string) =>
  new Intl.DateTimeFormat('he-IL', { timeZone: 'Asia/Jerusalem', dateStyle: 'medium', timeStyle: 'short' }).format(new Date(iso))

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const page = PAGES[0]

  useEffect(() => {
    document.title = 'ניהול תוכן · עשור רואי חשבון'
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex, nofollow'
    document.head.appendChild(meta)
    // Resume a session from this tab without re-typing the password.
    if (adminPassword.get()) void checkPassword(adminPassword.get()).then(setAuthed)
    return () => meta.remove()
  }, [])

  return (
    <div dir="rtl" lang="he" className="min-h-screen bg-[#fbf4f3] font-sans text-ink-900">
      {authed ? <Editor page={page} onLogout={() => (adminPassword.clear(), setAuthed(false))} /> : <Login onOk={() => setAuthed(true)} />}
    </div>
  )
}

function Login({ onOk }: { onOk: () => void }) {
  const [pw, setPw] = useState('')
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  return (
    <div className="flex min-h-screen items-center justify-center p-5">
      <form
        className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-[0_30px_70px_-35px_rgba(110,26,45,0.55)]"
        onSubmit={async (e) => {
          e.preventDefault()
          setBusy(true)
          setErr('')
          if (await checkPassword(pw)) onOk()
          else setErr('הסיסמה שגויה. נסי שוב.')
          setBusy(false)
        }}
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f7b9a0] via-[#d16d8a] to-burgundy-600 text-white">
          <Lock size={24} />
        </div>
        <h1 className="mt-5 text-center text-2xl font-extrabold text-burgundy-700">ניהול תוכן האתר</h1>
        <p className="mt-1 text-center text-sm text-ink-700">עשור רואי חשבון</p>
        <label htmlFor="pw" className="mt-7 block text-sm font-semibold">סיסמה</label>
        <input
          id="pw"
          type="password"
          autoComplete="current-password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          className="mt-1 w-full rounded-xl border border-[#f3c9d3] px-4 py-3 text-base outline-none focus:border-[#b84a6c]"
          dir="ltr"
          required
        />
        {err && <p className="mt-3 text-sm font-semibold text-red-700">{err}</p>}
        <button disabled={busy} className="mt-6 w-full rounded-full bg-burgundy-600 py-3.5 font-bold text-white disabled:opacity-60">
          {busy ? 'בודקת...' : 'כניסה'}
        </button>
      </form>
    </div>
  )
}

function Editor({ page, onLogout }: { page: (typeof PAGES)[number]; onLogout: () => void }) {
  const [data, setData] = useState<Data>(page.defaults)
  const [saved, setSaved] = useState<string>(JSON.stringify(page.defaults))
  const [updatedAt, setUpdatedAt] = useState<string | null>(null)
  const [openId, setOpenId] = useState<string | null>(page.schema[0].id)
  const [busy, setBusy] = useState(false)
  const [toast, setToast] = useState<Toast>(null)
  const [historyOpen, setHistoryOpen] = useState(false)

  const dirty = useMemo(() => JSON.stringify(data) !== saved, [data, saved])

  useEffect(() => {
    void loadContent<Data>(page.slug).then(({ content, updatedAt }) => {
      const d = page.normalize(content ?? page.defaults)
      setData(d)
      setSaved(JSON.stringify(d))
      setUpdatedAt(updatedAt)
    })
  }, [page])

  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => {
      if (dirty) e.preventDefault()
    }
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [dirty])

  useEffect(() => {
    if (!toast) return
    const t = window.setTimeout(() => setToast(null), 3500)
    return () => window.clearTimeout(t)
  }, [toast])

  const update = useCallback((path: string, value: unknown) => setData((d) => setAt(d, path, value)), [])

  async function save() {
    setBusy(true)
    try {
      const ts = await saveContent(page.slug, data)
      setSaved(JSON.stringify(data))
      setUpdatedAt(ts)
      setToast({ kind: 'ok', text: 'נשמר ופורסם באתר ✓' })
    } catch (e) {
      const msg = (e as Error).message
      setToast({ kind: 'err', text: msg === 'unauthorized' ? 'פג תוקף הכניסה. יש להתחבר מחדש.' : 'השמירה נכשלה. נסי שוב.' })
      if (msg === 'unauthorized') onLogout()
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-[#f3c9d3] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center gap-2 px-4 py-3">
          <div className="me-auto">
            <div className="text-xs text-ink-700">עריכת דף</div>
            <div className="font-extrabold text-burgundy-700">{page.title}</div>
          </div>
          <a href={page.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-full border border-[#f3c9d3] px-3 py-2 text-sm font-semibold text-burgundy-700">
            <ExternalLink size={15} /> צפייה
          </a>
          <button type="button" onClick={() => setHistoryOpen(true)} className="inline-flex items-center gap-1 rounded-full border border-[#f3c9d3] px-3 py-2 text-sm font-semibold text-burgundy-700">
            <History size={15} /> גרסאות
          </button>
          <button type="button" onClick={onLogout} className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm text-ink-700" aria-label="יציאה">
            <LogOut size={15} />
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 pb-36 pt-5">
        <p className="mb-4 text-sm text-ink-700">
          {updatedAt ? `עודכן לאחרונה: ${heDate(updatedAt)}` : 'הדף מציג כרגע את תוכן ברירת המחדל.'} · כל שינוי נשמר בדף רק אחרי לחיצה על "שמירה ופרסום".
        </p>

        <div className="space-y-3">
          {page.schema.map((section) => {
            const open = openId === section.id
            return (
              <section key={section.id} className="overflow-hidden rounded-2xl border border-[#f3c9d3] bg-white">
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : section.id)}
                  className="flex w-full items-center justify-between px-5 py-4 text-start"
                  aria-expanded={open}
                >
                  <span className="text-lg font-extrabold text-burgundy-700">{section.title}</span>
                  <ChevronDown size={20} className={`text-[#b84a6c] transition-transform ${open ? 'rotate-180' : ''}`} />
                </button>
                {open && (
                  <div className="space-y-5 border-t border-[#f8e3e7] px-5 py-5">
                    {section.fields.map((f) => (
                      <FieldEditor key={f.path} field={f} value={getAt(data, f.path)} onChange={(v) => update(f.path, v)} />
                    ))}
                  </div>
                )}
              </section>
            )
          })}
        </div>

        <button
          type="button"
          onClick={() => {
            if (window.confirm('להחזיר את כל הדף לתוכן ברירת המחדל? (השינוי יתפרסם רק אחרי שמירה)')) setData(page.defaults)
          }}
          className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-700 underline"
        >
          <RotateCcw size={14} /> החזרה לתוכן ברירת המחדל
        </button>
      </main>

      {/* Save bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[#f3c9d3] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3">
          <span className={`text-sm font-semibold ${dirty ? 'text-[#b84a6c]' : 'text-ink-700'}`}>{dirty ? 'יש שינויים שלא נשמרו' : 'הכול שמור'}</span>
          {dirty && (
            <button type="button" onClick={() => setData(JSON.parse(saved))} className="ms-auto text-sm font-semibold text-ink-700 underline">
              ביטול שינויים
            </button>
          )}
          <button
            type="button"
            disabled={!dirty || busy}
            onClick={save}
            className={`${dirty ? '' : 'ms-auto'} inline-flex items-center gap-2 rounded-full bg-gradient-to-l from-[#d16d8a] to-burgundy-700 px-6 py-3 font-bold text-white disabled:opacity-40`}
          >
            <Save size={17} /> {busy ? 'שומרת...' : 'שמירה ופרסום'}
          </button>
        </div>
      </div>

      {toast && (
        <div className={`fixed inset-x-4 top-20 z-40 mx-auto max-w-sm rounded-2xl px-5 py-3 text-center font-bold text-white shadow-lg ${toast.kind === 'ok' ? 'bg-[#1f8f4e]' : 'bg-red-700'}`}>
          {toast.text}
        </div>
      )}

      {historyOpen && (
        <HistoryDialog
          slug={page.slug}
          onClose={() => setHistoryOpen(false)}
          onRestore={(content) => {
            setData(page.normalize(content))
            setHistoryOpen(false)
            setToast({ kind: 'ok', text: 'הגרסה נטענה. לחצי "שמירה ופרסום" כדי לפרסם אותה.' })
          }}
        />
      )}
    </>
  )
}

// ── Field editors ─────────────────────────────────────────────────────────
const INPUT = 'w-full rounded-xl border border-[#f3c9d3] bg-[#fffafa] px-3.5 py-2.5 text-base outline-none focus:border-[#b84a6c] focus:bg-white'

function AutoTextarea({ value, onChange, label }: { value: string; onChange: (v: string) => void; label: string }) {
  return (
    <textarea
      aria-label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={Math.min(10, Math.max(2, Math.ceil(value.length / 55) + value.split('\n').length - 1))}
      className={`${INPUT} resize-y leading-relaxed`}
    />
  )
}

function FieldEditor({ field, value, onChange }: { field: Field; value: unknown; onChange: (v: unknown) => void }) {
  const head = (
    <div className="mb-1.5">
      <div className="text-sm font-bold text-ink-800">{field.label}</div>
      {field.hint && <div className="text-xs text-ink-700/80">{field.hint}</div>}
    </div>
  )

  if (field.kind === 'text') {
    return (
      <label className="block">
        {head}
        <input value={String(value ?? '')} onChange={(e) => onChange(e.target.value)} dir={field.dir} className={INPUT} />
      </label>
    )
  }
  if (field.kind === 'textarea') {
    return (
      <div>
        {head}
        <AutoTextarea label={field.label} value={String(value ?? '')} onChange={onChange} />
      </div>
    )
  }

  const list = (Array.isArray(value) ? value : []) as unknown[]
  const move = (i: number, d: number) => {
    const next = [...list]
    const [x] = next.splice(i, 1)
    next.splice(i + d, 0, x)
    onChange(next)
  }
  const remove = (i: number) => {
    if (window.confirm(`למחוק את ה${field.itemLabel}?`)) onChange(list.filter((_, j) => j !== i))
  }
  const controls = (i: number) => (
    <div className="flex items-center gap-1">
      <IconBtn label="למעלה" disabled={i === 0} onClick={() => move(i, -1)}><ArrowUp size={15} /></IconBtn>
      <IconBtn label="למטה" disabled={i === list.length - 1} onClick={() => move(i, 1)}><ArrowDown size={15} /></IconBtn>
      <IconBtn label="מחיקה" onClick={() => remove(i)} danger><Trash2 size={15} /></IconBtn>
    </div>
  )

  return (
    <div>
      {head}
      <div className="space-y-3">
        {list.map((item, i) => (
          <div key={i} className="rounded-xl border border-[#f8e3e7] bg-[#fffafa] p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-bold text-[#b84a6c]">{field.itemLabel} {i + 1}</span>
              {controls(i)}
            </div>
            {field.kind === 'strings' ? (
              <AutoTextarea label={`${field.itemLabel} ${i + 1}`} value={String(item ?? '')} onChange={(v) => onChange(list.map((x, j) => (j === i ? v : x)))} />
            ) : (
              <div className="space-y-2">
                <input
                  aria-label={field.titleLabel}
                  placeholder={field.titleLabel}
                  value={(item as { title: string }).title}
                  onChange={(e) => onChange(list.map((x, j) => (j === i ? { ...(x as object), title: e.target.value } : x)))}
                  className={`${INPUT} font-bold`}
                />
                <AutoTextarea
                  label={field.bodyLabel}
                  value={(item as { body: string }).body}
                  onChange={(v) => onChange(list.map((x, j) => (j === i ? { ...(x as object), body: v } : x)))}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onChange([...list, field.kind === 'strings' ? '' : { title: '', body: '' }])}
        className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-dashed border-[#d16d8a] px-4 py-2 text-sm font-bold text-[#b84a6c]"
      >
        <Plus size={15} /> הוספת {field.itemLabel}
      </button>
    </div>
  )
}

function IconBtn({ children, label, onClick, disabled, danger }: { children: React.ReactNode; label: string; onClick: () => void; disabled?: boolean; danger?: boolean }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className={`flex h-8 w-8 items-center justify-center rounded-lg border border-[#f3c9d3] bg-white disabled:opacity-30 ${danger ? 'text-red-700' : 'text-ink-700'}`}
    >
      {children}
    </button>
  )
}

function HistoryDialog({ slug, onClose, onRestore }: { slug: string; onClose: () => void; onRestore: (c: Data) => void }) {
  const [items, setItems] = useState<HistoryEntry[] | null>(null)
  const [err, setErr] = useState(false)
  useEffect(() => {
    listHistory(slug).then(setItems, () => setErr(true))
  }, [slug])
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink-900/40 p-3 sm:items-center" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="max-h-[80vh] w-full max-w-md overflow-y-auto rounded-3xl bg-white p-6" role="dialog" aria-modal="true" aria-label="גרסאות קודמות">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-burgundy-700">גרסאות קודמות</h2>
          <button type="button" onClick={onClose} aria-label="סגירה" className="rounded-full p-1.5 hover:bg-[#fbeff0]"><X size={18} /></button>
        </div>
        <p className="mt-1 text-sm text-ink-700">כל שמירה שומרת את הגרסה הקודמת (עד 30 אחרונות).</p>
        <div className="mt-4 space-y-2">
          {err && <p className="text-sm text-red-700">לא ניתן לטעון את הגרסאות.</p>}
          {!err && items === null && <p className="text-sm text-ink-700">טוענת...</p>}
          {items?.length === 0 && <p className="text-sm text-ink-700">עדיין אין גרסאות קודמות.</p>}
          {items?.map((h) => (
            <div key={h.ts} className="flex items-center justify-between rounded-xl border border-[#f8e3e7] px-4 py-3">
              <span className="text-sm">{heDate(h.ts)}</span>
              <button
                type="button"
                className="text-sm font-bold text-[#b84a6c] underline"
                onClick={async () => onRestore(await loadVersion<Data>(slug, h.ts))}
              >
                שחזור
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
