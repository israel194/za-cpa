import { useState } from 'react'
import { Lock, CheckCircle2 } from 'lucide-react'
import { sendLead } from '../../lib/notify'
import PrivacyNotice from './PrivacyNotice'

/** החותמת האלכסונית. יושבת על הבלוק שמעליו היא נמתחת, ולא על כל העמוד. */
export function FullStamp({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div
        className="absolute left-1/2 top-1/2 w-[170%]"
        style={{ transform: 'translate(-50%, -50%) rotate(-16deg)' }}
      >
        <div className="h-[2px] w-full bg-primary/45" />
        <div className="border-y-2 border-primary/45 bg-white/35 py-1 text-center">
          <span className="font-display font-extrabold tracking-[0.08em] text-primary/75 [font-size:clamp(1rem,3.2vw,2.25rem)]">
            מלא עד סוף 2026
          </span>
        </div>
        <div className="h-[2px] w-full bg-primary/45" />
      </div>
    </div>
  )
}

/**
 * עמוד ההרשמה לריטריט כשהוא מלא: חותמת אלכסונית על ההרשמה ל-2026,
 * ובמקומה שמירת מקום לשנת 2027 והשארת פרטים. הפנייה נשלחת לאורית.
 */
export default function RetreatClosed() {
  const [open, setOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (busy) return
    setBusy(true)
    const fd = new FormData(e.currentTarget)
    await sendLead({
      target: 'orit',
      source: 'שמירת מקום 2027 · לחזור לעצמך',
      name: String(fd.get('fullName') ?? ''),
      phone: String(fd.get('phone') ?? ''),
      email: String(fd.get('email') ?? ''),
      message: ['שמירת מקום למחזור 2027', String(fd.get('message') ?? '')].filter(Boolean).join('\n'),
    })
    setBusy(false)
    setSent(true)
  }

  const input =
    'w-full rounded-xl border border-[#f3c9d3] bg-[#fffafa] px-4 py-3 text-base text-ink-900 outline-none transition-colors focus:border-[#b84a6c] focus:bg-white'

  if (sent) {
    return (
      <div className="py-10 text-center" role="status">
        <CheckCircle2 size={52} className="mx-auto text-[#1f8f4e]" />
        <h2 className="mt-4 font-display text-2xl font-extrabold text-burgundy-700">הפרטים נקלטו, תודה!</h2>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-ink-700">
          שמרנו את מקומך ברשימה למחזור 2027. אורית תיצור איתך קשר עם פתיחת ההרשמה.
        </p>
      </div>
    )
  }

  return (
    <div>
      {/* ההרשמה ל-2026, חתומה כמלאה */}
      <div className="relative overflow-hidden rounded-2xl border-2 border-primary/25 bg-background px-6 py-10 text-center md:py-14">
        <FullStamp />
        <span className="relative inline-flex items-center gap-2 rounded-full bg-blush-100 px-4 py-1.5 text-xs font-semibold text-primary">
          <Lock size={14} /> ההרשמה למחזור 2026 סגורה
        </span>
      </div>
      <p className="mt-4 text-center text-sm leading-relaxed text-ink-700">
        המחזור הנוכחי מלא, ולא ניתן להירשם אליו או לשלם עליו.
      </p>

      {/* 2027 */}
      <div className="mt-6 text-center">
        {!open ? (
          <>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-l from-[#d16d8a] via-burgundy-500 to-burgundy-700 px-8 py-4 text-base font-bold text-white shadow-[0_16px_36px_-12px_rgba(110,26,45,0.6)] transition-all hover:-translate-y-0.5"
            >
              שומרת מקום לשנת 2027
            </button>
            <p className="mt-3 text-sm text-ink-700">ללא תשלום וללא התחייבות. נעדכן אותך עם פתיחת ההרשמה.</p>
          </>
        ) : (
          <form onSubmit={submit} className="mt-2 space-y-4 text-start">
            <h2 className="text-center font-display text-xl font-extrabold text-burgundy-700">
              שמירת מקום למחזור 2027
            </h2>
            <div>
              <label htmlFor="wl-name" className="mb-1 block text-sm font-semibold text-ink-800">שם מלא</label>
              <input id="wl-name" name="fullName" required autoComplete="name" className={input} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="wl-phone" className="mb-1 block text-sm font-semibold text-ink-800">טלפון</label>
                <input id="wl-phone" name="phone" type="tel" required autoComplete="tel" dir="ltr" placeholder="050-0000000" className={input} />
              </div>
              <div>
                <label htmlFor="wl-email" className="mb-1 block text-sm font-semibold text-ink-800">דוא״ל</label>
                <input id="wl-email" name="email" type="email" required autoComplete="email" dir="ltr" placeholder="name@example.com" className={input} />
              </div>
            </div>
            <div>
              <label htmlFor="wl-message" className="mb-1 block text-sm font-semibold text-ink-800">
                כמה מילים על מה שמעסיק אותך (לא חובה)
              </label>
              <textarea id="wl-message" name="message" rows={3} className={input} />
            </div>
            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-full bg-gradient-to-l from-[#d16d8a] via-burgundy-500 to-burgundy-700 px-8 py-4 text-base font-bold text-white shadow-[0_16px_36px_-12px_rgba(110,26,45,0.6)] transition-all hover:-translate-y-0.5 disabled:opacity-60"
            >
              {busy ? 'רגע...' : 'שמירת מקום ל-2027'}
            </button>
            <PrivacyNotice controller="orit" />
          </form>
        )}
      </div>
    </div>
  )
}
