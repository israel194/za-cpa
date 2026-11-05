import { useCallback, useEffect, useMemo, useState } from 'react'
import { Download, RefreshCw } from 'lucide-react'
import { listRegistrations, markPaid, setCancelled, STATUS_LABEL, type Registration } from '../lib/register'

const MANUAL_METHODS = [
  { value: 'transfer', label: 'העברה בנקאית' },
  { value: 'bit', label: 'ביט / אפליקציה' },
  { value: 'cash', label: 'מזומן' },
  { value: 'cheque', label: "צ'ק" },
  { value: 'other', label: 'אחר' },
  { value: 'card', label: 'אשראי ב-SUMIT (החשבונית כבר הופקה שם)' },
]

const STATUS_STYLE: Record<Registration['status'], string> = {
  paid: 'bg-[#e6f4ea] text-[#1f6b3a]',
  awaiting_card: 'bg-[#fff4e0] text-[#8a5a00]',
  awaiting_manual: 'bg-[#fbeff0] text-[#b84a6c]',
  cancelled: 'bg-[#eee] text-ink-700',
}

const fmtDate = (iso: string | null) => (iso ? new Date(iso).toLocaleDateString('he-IL', { timeZone: 'Asia/Jerusalem' }) : '')

function toCsv(rows: Registration[]) {
  const head = ['תאריך הרשמה', 'שם', 'טלפון', 'דוא"ל', 'קורס / ריטריט', 'סכום', 'אופן תשלום מבוקש', 'סטטוס', 'תאריך תשלום', 'אמצעי תשלום', 'מס׳ חשבונית', 'מועד', 'הערה']
  const lines = rows.map((r) => [
    fmtDate(r.createdAt), r.name, r.phone, r.email, r.productName, r.amount, r.method === 'manual' ? 'ידני' : 'אשראי',
    STATUS_LABEL[r.status], fmtDate(r.paidAt), r.paymentMethod ?? '', r.documentNumber ?? '', r.sessionDate, r.note,
  ])
  const esc = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`
  return '﻿' + [head, ...lines].map((l) => l.map(esc).join(',')).join('\r\n')
}

/** Registrations + payments report, with "mark as paid" for manual payments (issues the invoice in SUMIT). */
export default function AdminRegistrations() {
  const [rows, setRows] = useState<Registration[]>([])
  const [sumitOk, setSumitOk] = useState(true)
  const [filter, setFilter] = useState<'all' | 'unpaid' | 'paid'>('all')
  const [product, setProduct] = useState<'all' | Registration['product']>('all')
  const [error, setError] = useState('')
  const [paying, setPaying] = useState<Registration | null>(null)

  const load = useCallback(
    () =>
      listRegistrations()
        .then((r) => {
          setError('')
          setRows(r.registrations)
          setSumitOk(r.sumitConfigured)
        })
        .catch((e: Error) => setError(e.message === 'unauthorized' ? 'נדרשת התחברות מחדש' : 'טעינת ההרשמות נכשלה')),
    []
  )
  useEffect(() => {
    void load()
  }, [load])

  const shown = useMemo(
    () =>
      rows.filter(
        (r) =>
          (product === 'all' || r.product === product) &&
          (filter === 'all' || (filter === 'paid' ? r.status === 'paid' : r.status === 'awaiting_card' || r.status === 'awaiting_manual'))
      ),
    [rows, filter, product]
  )
  const totals = useMemo(() => {
    const paid = rows.filter((r) => r.status === 'paid')
    return { count: rows.filter((r) => r.status !== 'cancelled').length, paid: paid.length, sum: paid.reduce((a, r) => a + r.amount, 0) }
  }, [rows])

  function download() {
    const blob = new Blob([toCsv(shown)], { type: 'text/csv;charset=utf-8' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `הרשמות ותשלומים ${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(a.href)
  }

  const replace = (r: Registration) => setRows((all) => all.map((x) => (x.id === r.id ? r : x)))

  const select = 'rounded-lg border border-[#f3c9d3] bg-white px-3 py-2 text-sm'
  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      {!sumitOk && (
        <p className="mb-4 rounded-xl bg-[#fff4e0] px-4 py-3 text-sm text-[#8a5a00]">
          החיבור ל-SUMIT עדיין לא הוגדר בשרת, ולכן אין כרגע תשלום באשראי ולא מופקות חשבוניות. ההרשמות נשמרות כרגיל.
        </p>
      )}
      <div className="flex flex-wrap items-center gap-3">
        <select className={select} value={product} onChange={(e) => setProduct(e.target.value as typeof product)} aria-label="סינון לפי תוכנית">
          <option value="all">כל התוכניות</option>
          <option value="frequency-course">קורס העלאת תדר</option>
          <option value="retreat">ריטריט לחזור לעצמך</option>
        </select>
        <select className={select} value={filter} onChange={(e) => setFilter(e.target.value as typeof filter)} aria-label="סינון לפי סטטוס">
          <option value="all">כל הסטטוסים</option>
          <option value="unpaid">טרם שילמו</option>
          <option value="paid">שילמו</option>
        </select>
        <span className="text-sm text-ink-700">
          {totals.count} נרשמות · {totals.paid} שילמו · {totals.sum.toLocaleString('he-IL')} ש״ח
        </span>
        <span className="flex-1" />
        <button type="button" onClick={() => void load()} className="inline-flex items-center gap-1 rounded-lg border border-[#f3c9d3] bg-white px-3 py-2 text-sm">
          <RefreshCw size={15} /> רענון
        </button>
        <button type="button" onClick={download} className="inline-flex items-center gap-1 rounded-lg bg-burgundy-600 px-3 py-2 text-sm font-bold text-white">
          <Download size={15} /> הורדה לאקסל
        </button>
      </div>
      {error && <p className="mt-4 text-sm text-[#b42318]">{error}</p>}

      <div className="mt-4 overflow-x-auto rounded-2xl border border-[#f3c9d3] bg-white">
        <table className="w-full min-w-[900px] text-sm">
          <thead className="bg-[#fbeff0] text-right text-burgundy-700">
            <tr>
              {['נרשמה', 'שם', 'טלפון / מייל', 'תוכנית', 'סכום', 'סטטוס', 'תשלום', ''].map((h) => (
                <th key={h} className="px-3 py-2 font-bold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shown.map((r) => (
              <tr key={r.id} className="border-t border-[#f6e3e7] align-top">
                <td className="px-3 py-2 whitespace-nowrap">{fmtDate(r.createdAt)}</td>
                <td className="px-3 py-2 font-semibold">{r.name}</td>
                <td className="px-3 py-2" dir="ltr">{r.phone}<br />{r.email}</td>
                <td className="px-3 py-2">{r.productName}{r.sessionDate ? <><br /><span className="text-xs text-ink-700">{r.sessionDate}</span></> : null}</td>
                <td className="px-3 py-2 whitespace-nowrap">{r.amount} ש״ח</td>
                <td className="px-3 py-2"><span className={`rounded-full px-2.5 py-1 text-xs font-bold ${STATUS_STYLE[r.status]}`}>{STATUS_LABEL[r.status]}</span></td>
                <td className="px-3 py-2 text-xs">
                  {r.status === 'paid' ? (
                    <>
                      {fmtDate(r.paidAt)} · {r.paymentMethod}
                      {r.documentNumber ? <><br />חשבונית {r.documentNumber}</> : null}
                    </>
                  ) : (
                    r.method === 'manual' ? 'ביקשה תשלום ידני' : 'אשראי'
                  )}
                  {r.note ? <><br /><span className="text-ink-700">{r.note}</span></> : null}
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  {r.status !== 'paid' && r.status !== 'cancelled' && (
                    <button type="button" onClick={() => setPaying(r)} className="rounded-lg bg-burgundy-600 px-3 py-1.5 text-xs font-bold text-white">
                      סימון כשולם
                    </button>
                  )}{' '}
                  {r.status !== 'paid' && (
                    <button
                      type="button"
                      onClick={() => void setCancelled(r.id, r.status !== 'cancelled').then(replace)}
                      className="rounded-lg border border-[#f3c9d3] px-3 py-1.5 text-xs"
                    >
                      {r.status === 'cancelled' ? 'שחזור' : 'ביטול'}
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {shown.length === 0 && (
              <tr>
                <td colSpan={8} className="px-3 py-8 text-center text-ink-700">אין הרשמות להצגה</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {paying && <MarkPaidDialog reg={paying} sumitOk={sumitOk} onClose={() => setPaying(null)} onDone={(r) => (replace(r), setPaying(null))} />}
    </div>
  )
}

function MarkPaidDialog({ reg, sumitOk, onClose, onDone }: { reg: Registration; sumitOk: boolean; onClose: () => void; onDone: (r: Registration) => void }) {
  const [method, setMethod] = useState(reg.method === 'card' ? 'card' : 'transfer')
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [invoice, setInvoice] = useState(sumitOk && reg.method === 'manual')
  const noInvoice = method === 'card'
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')

  async function save() {
    setBusy(true)
    setErr('')
    try {
      onDone(await markPaid(reg.id, method, date, invoice && !noInvoice))
    } catch (e) {
      setErr('השמירה נכשלה: ' + (e as Error).message)
      setBusy(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/40 p-4" role="dialog" aria-modal="true" aria-label="סימון תשלום">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="font-display text-xl font-extrabold text-burgundy-700">סימון תשלום ידני</h2>
        <p className="mt-1 text-sm text-ink-700">{reg.name} · {reg.productName} · {reg.amount} ש״ח</p>
        <label className="mt-4 block text-sm font-semibold">אמצעי תשלום
          <select value={method} onChange={(e) => setMethod(e.target.value)} className="mt-1 w-full rounded-lg border border-[#f3c9d3] px-3 py-2">
            {MANUAL_METHODS.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
          </select>
        </label>
        <label className="mt-3 block text-sm font-semibold">תאריך התשלום
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1 w-full rounded-lg border border-[#f3c9d3] px-3 py-2" />
        </label>
        <label className="mt-3 flex items-center gap-2 text-sm">
          <input type="checkbox" checked={invoice && !noInvoice} disabled={!sumitOk || noInvoice} onChange={(e) => setInvoice(e.target.checked)} />
          להפיק חשבונית מס קבלה ב-SUMIT ולשלוח ללקוחה במייל
        </label>
        {err && <p className="mt-3 text-sm text-[#b42318]">{err}</p>}
        <div className="mt-5 flex gap-2">
          <button type="button" disabled={busy} onClick={() => void save()} className="flex-1 rounded-lg bg-burgundy-600 px-4 py-2 font-bold text-white disabled:opacity-60">
            {busy ? 'שומרת...' : 'שמירה'}
          </button>
          <button type="button" onClick={onClose} className="rounded-lg border border-[#f3c9d3] px-4 py-2">ביטול</button>
        </div>
      </div>
    </div>
  )
}
