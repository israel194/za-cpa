import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Lock, ShieldCheck, Receipt, Calendar, MapPin, Clock, ArrowRight, CheckCircle2 } from 'lucide-react'
import { freshContent, loadContent } from '../lib/cms'
import { DEFAULT_FREQUENCY, FREQUENCY_CONTENT_SINCE, withDefaults, type FrequencyContent } from '../content/frequencyCourse'
import { Honeypot } from '../components/ui/PayChoice'
import PrivacyNotice from '../components/ui/PrivacyNotice'
import RetreatClosed from '../components/ui/RetreatClosed'
import { OUTCOME_TEXT, submitSignup, type SignupOutcome } from '../lib/signup'
import { nextMondays } from '../lib/dates'
import type { ProductId } from '../lib/register'
import { useSeo } from '../lib/seo'

type Offer = {
  product: ProductId
  kicker: string
  title: string
  subtitle: string
  price: string
  regular?: string
  priceNote?: string
  facts: { icon: typeof Calendar; text: string }[]
  includes: string[]
  backTo: string
  backLabel: string
  fallbackPayUrl: string
  pickDate: boolean
  /** מחזור מלא: במקום טופס הרשמה ותשלום מוצגת חותמת ושמירת מקום למחזור הבא */
  closed?: boolean
}

const PLACE = "רח' נחום חפצדי 17, ירושלים (מגדל רם, קומה 11), וגם בגוגל מיט"

function courseOffer(c: FrequencyContent): Offer {
  const r = c.registration
  return {
    product: 'frequency-course',
    kicker: 'קורס לנשים · 9 מפגשים',
    title: 'קורס העלאת תדר',
    subtitle: 'מתודעה הישרדותית ולחץ אל חיים של בחירה, שקט פנימי וחיבור.',
    price: r.priceLabel || '880 ש״ח',
    regular: r.priceRegular,
    priceNote: r.priceNote,
    facts: [
      { icon: Calendar, text: 'פתיחה: יום רביעי, 11.11.2026' },
      { icon: Clock, text: 'ימי רביעי, 20:00 עד 21:45, תשעה מפגשים' },
      { icon: MapPin, text: PLACE },
    ],
    includes: [
      'תשעה מפגשים בקבוצה קטנה',
      'לפני כל מפגש: המצגת ושאלון או תרגיל ב-PDF למייל',
      'כלים מעשיים ותרגול לכל שבוע',
    ],
    backTo: '/frequency-course',
    backLabel: 'חזרה לדף הקורס',
    fallbackPayUrl: r.paymentUrl,
    pickDate: false,
  }
}


/**
 * הריטריט "לחזור לעצמך". המחזור של 2026 מלא, ולכן `closed: true`: העמוד מציג
 * חותמת אלכסונית במקום טופס ההרשמה והתשלום, ומציע שמירת מקום ל-2027.
 * לפתיחת המכירה מחדש: למחוק את closed ולעדכן את המחיר והמועדים.
 */
const RETREAT: Offer = {
  product: 'retreat',
  kicker: 'ריטריט לנשים',
  title: 'לחזור לעצמך',
  subtitle: 'ערב שכולו שלך: מרחב שקט, קבוצה קטנה ותומכת, וכלים לחזור לעצמך.',
  price: 'מלא',
  priceNote: 'עד סוף 2026',
  facts: [
    { icon: Clock, text: 'יום שני, 20:30' },
    { icon: MapPin, text: PLACE },
  ],
  includes: ['ערב בקבוצה קטנה ואינטימית', 'כלים מעשיים לאיזון, רוגע ובחירה', 'מרחב שקט שכולו בשבילך'],
  backTo: '/orit-group',
  backLabel: 'חזרה לדף הריטריט',
  fallbackPayUrl: '',
  pickDate: true,
  closed: true,
}

export default function PayPage() {
  const { product } = useParams()
  const [course, setCourse] = useState<FrequencyContent>(DEFAULT_FREQUENCY)
  const [busy, setBusy] = useState(false)
  const [outcome, setOutcome] = useState<SignupOutcome | null>(null)
  const dates = useMemo(() => nextMondays(4), [])

  useEffect(() => {
    if (product !== 'frequency-course') return
    let alive = true
    void loadContent<FrequencyContent>('frequency-course').then((saved) => {
      const c = freshContent(saved, FREQUENCY_CONTENT_SINCE)
      if (alive && c) setCourse(withDefaults(c))
    })
    return () => {
      alive = false
    }
  }, [product])

  const offer = product === 'frequency-course' ? courseOffer(course) : product === 'retreat' ? RETREAT : null

  useSeo('oritGroup', { title: offer ? `הרשמה ותשלום · ${offer.title}` : 'הרשמה ותשלום', noIndex: true })

  if (!offer) return <Navigate to="/orit-group" replace />

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (busy || !offer) return
    setBusy(true)
    const r = await submitSignup(offer.product, `דף תשלום: ${offer.title}`, new FormData(e.currentTarget), offer.fallbackPayUrl)
    setOutcome(r)
    setBusy(false)
  }

  const input =
    'w-full rounded-xl border border-[#e6d9d6] bg-[#fcf9f5] px-4 py-3 text-base text-ink-900 outline-none transition-colors focus:border-[#8e3b4a] focus:bg-white'

  return (
    <div dir="rtl" lang="he" className="min-h-screen bg-gradient-to-b from-[#fcf9f5] via-[#f6efe6] to-white px-4 pt-28 pb-16 md:pt-32">
      <div className="mx-auto max-w-5xl">
        <Link to={offer.backTo} className="inline-flex items-center gap-1 text-sm font-semibold text-[#8e3b4a] hover:underline">
          <ArrowRight size={16} /> {offer.backLabel}
        </Link>

        <div className="mt-4 grid gap-6 md:grid-cols-5">
          {/* ORDER SUMMARY */}
          <aside className="md:col-span-2">
            <div className="overflow-hidden rounded-3xl bg-white shadow-[0_24px_60px_-34px_rgba(110,26,45,0.55)]">
              <div className="bg-gradient-to-l from-[#82283b] via-burgundy-600 to-burgundy-700 px-6 py-6 text-white">
                <div className="text-xs font-bold tracking-wide text-white/80">{offer.kicker}</div>
                <h1 className="mt-1 font-display text-3xl font-bold">{offer.title}</h1>
                <p className="mt-2 text-sm leading-relaxed text-white/90">{offer.subtitle}</p>
              </div>
              <div className="px-6 py-5">
                <ul className="space-y-2.5 text-sm text-ink-800">
                  {offer.facts.map(({ icon: Icon, text }) => (
                    <li key={text} className="flex items-start gap-2.5">
                      <Icon size={17} className="mt-0.5 shrink-0 text-[#8e3b4a]" />
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
                <div className="my-5 h-px bg-[#e6d9d6]" />
                <ul className="space-y-2 text-sm text-ink-800">
                  {offer.includes.map((t) => (
                    <li key={t} className="flex items-start gap-2.5">
                      <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-[#1f8f4e]" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 rounded-2xl bg-[#f6efe6] px-5 py-4">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-sm font-semibold text-ink-800">סה״כ לתשלום</span>
                    <span className="text-end">
                      {/* 60% שקיפות הורידה את הניגודיות ל-3.67; צבע מלא נותן 5.43 */}
                      {offer.regular && <s className="me-2 text-sm text-[#3d2a30]">{offer.regular}</s>}
                      <strong className="font-display text-3xl text-burgundy-700">{offer.price}</strong>
                    </span>
                  </div>
                  {/* a83f5f ולא b84a6c, מאותה סיבה: ניגודיות AA על רקע ורוד בהיר */}
                  {offer.priceNote && <div className="mt-1 text-end text-xs font-bold text-[#6e1a2d]">{offer.priceNote}</div>}
                  <div className="mt-1 text-end text-xs text-ink-700">המחיר כולל מע״מ</div>
                </div>
              </div>
            </div>
          </aside>

          {/* FORM */}
          <section className="md:col-span-3">
            <div className="rounded-3xl bg-white p-6 shadow-[0_24px_60px_-34px_rgba(110,26,45,0.55)] md:p-8">
              {offer.closed ? (
                <RetreatClosed />
              ) : outcome ? (
                <div className="py-10 text-center" role="status">
                  <CheckCircle2 size={52} className="mx-auto text-[#1f8f4e]" />
                  <h2 className="mt-4 display display-md">
                    {outcome === 'redirecting' ? 'מעבירה אותך לתשלום...' : 'ההרשמה נקלטה, תודה!'}
                  </h2>
                  <p className="mx-auto mt-3 max-w-md leading-relaxed text-ink-700">{OUTCOME_TEXT[outcome]}</p>
                </div>
              ) : (
                <>
                  <h2 className="display display-md">הפרטים שלך</h2>
                  <p className="mt-1 text-sm text-ink-700">החשבונית תופק על השם הזה ותישלח למייל שתכתבי.</p>
                  <form onSubmit={onSubmit} className="relative mt-6 space-y-4">
                    <div>
                      <label htmlFor="pay-name" className="mb-1 block text-sm font-semibold text-ink-800">שם מלא</label>
                      <input id="pay-name" name="fullName" required autoComplete="name" className={input} />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="pay-phone" className="mb-1 block text-sm font-semibold text-ink-800">טלפון</label>
                        <input id="pay-phone" name="phone" type="tel" required autoComplete="tel" dir="ltr" placeholder="050-0000000" className={input} />
                      </div>
                      <div>
                        <label htmlFor="pay-email" className="mb-1 block text-sm font-semibold text-ink-800">דוא״ל</label>
                        <input id="pay-email" name="email" type="email" required autoComplete="email" dir="ltr" placeholder="name@example.com" className={input} />
                      </div>
                    </div>
                    {offer.pickDate && (
                      <div>
                        <label htmlFor="pay-date" className="mb-1 block text-sm font-semibold text-ink-800">מועד</label>
                        <select id="pay-date" name="sessionDate" required className={input} defaultValue="">
                          <option value="" disabled>בחרי מועד</option>
                          {dates.map((d) => (
                            <option key={d.value} value={d.label}>{d.label}, 20:30</option>
                          ))}
                        </select>
                      </div>
                    )}
                    <Honeypot />
                    <button
                      type="submit"
                      disabled={busy}
                      className="sheen flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-l from-[#9e3a4d] via-burgundy-500 to-burgundy-700 px-8 py-4 text-base font-bold text-white shadow-[0_16px_36px_-12px_rgba(110,26,45,0.6)] transition-all hover:-translate-y-0.5 disabled:opacity-60"
                    >
                      <Lock size={18} /> {busy ? 'רגע...' : 'להרשמה ולתשלום מאובטח'}
                    </button>
                    <ul className="flex flex-wrap justify-center gap-x-5 gap-y-1 pt-1 text-xs text-ink-700">
                      <li className="inline-flex items-center gap-1"><ShieldCheck size={14} className="text-[#1f8f4e]" /> תשלום מאובטח ב-SUMIT</li>
                      <li className="inline-flex items-center gap-1"><Receipt size={14} className="text-[#8e3b4a]" /> חשבונית מס קבלה למייל</li>
                    </ul>
                    <PrivacyNotice controller="orit" />
                  </form>
                </>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
