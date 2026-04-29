import { useEffect, useMemo, useState } from 'react'
import { Heart, Star, Target, MapPin, Calendar, Clock, Coins, Sparkles, X } from 'lucide-react'
import { sendLead } from '../lib/notify'

const PAYMENT_URL = 'https://pay.sumit.co.il/3c09bh/tsf55r/tsf4na/payment/'
const WA_NUMBER = '972523975659'
const WA_MESSAGE = 'שלום אורית, אשמח לשמוע על הקבוצה'

const HEBREW_MONTHS = [
  'ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני',
  'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר',
]

function getNextMondays(count = 4): { value: string; label: string }[] {
  const today = new Date()
  const day = today.getDay()
  const daysUntilMonday = (1 - day + 7) % 7 || 7
  const dates: { value: string; label: string }[] = []
  const d = new Date(today)
  d.setDate(d.getDate() + daysUntilMonday)
  for (let i = 0; i < count; i++) {
    const value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    const label = `יום שני, ${d.getDate()} ב${HEBREW_MONTHS[d.getMonth()]} ${d.getFullYear()}`
    dates.push({ value, label })
    d.setDate(d.getDate() + 7)
  }
  return dates
}

const benefits = [
  {
    icon: Heart,
    title: 'כלים פרקטיים לאיזון אמיתי בין בית ומשפחה לעבודה',
    body: 'במפגשים תקבלי כלים פרקטיים איך לעצור את המירוץ, להבין מה באמת חשוב לך, וליצור איזון אמיתי בין בית, עבודה וזמן לעצמך — בלי רגשות אשמה ובלי תחושת פספוס.',
  },
  {
    icon: Star,
    title: 'יציבות רגשית, תחושת רוגע וביטחון',
    body: 'תלמדי לזהות מה מפעיל אותך, איך לנהל רגשות במקום שהם ינהלו אותך, ואיך לקבל החלטות מתוך שקט פנימי וביטחון.',
  },
  {
    icon: Target,
    title: 'אישה בוחרת',
    body: 'תגדירי גבולות בריאים ותפעלי מתוך בחירה — לא מתוך לחץ, הרגלים או ציפיות של אחרים, כדי לחיות חיים שמדויקים לך.',
  },
]

const details = [
  { icon: MapPin, label: "רח' נחום חפצדי 17, גבעת שאול, ירושלים (מגדל רם — קומה 11)" },
  { icon: Calendar, label: 'כל יום שני' },
  { icon: Clock, label: 'בשעה 20:30 — אחרי שהילדים ישנים' },
  { icon: Coins, label: '40 ש"ח בלבד למפגש' },
]

export default function OritGroupPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [name, setName] = useState('')
  const mondays = useMemo(() => getNextMondays(4), [])

  useEffect(() => {
    document.title = 'לחזור לעצמך — קבוצת לימוד לנשים | אורית עשור'
  }, [])

  useEffect(() => {
    if (modalOpen) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [modalOpen])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setModalOpen(false)
    }
    if (modalOpen) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [modalOpen])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formEl = e.currentTarget
    const fd = new FormData(formEl)
    setSubmitting(true)
    void sendLead({
      target: 'orit',
      name: String(fd.get('fullName') ?? name),
      email: String(fd.get('email') ?? ''),
      phone: String(fd.get('phone') ?? ''),
      sessionDate: String(fd.get('sessionDate') ?? ''),
    })
    window.setTimeout(() => {
      window.location.href = PAYMENT_URL
    }, 800)
  }

  const waHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`

  return (
    <div dir="rtl" lang="he">
      {/* HERO */}
      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-peach-100 via-cream-50 to-white" />
        <div aria-hidden className="pointer-events-none absolute -top-32 -end-24 h-80 w-80 rounded-full bg-peach-200/55 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-24 -start-24 h-72 w-72 rounded-full bg-pink-200/45 blur-3xl" />

        <div className="relative mx-auto max-w-3xl px-6 text-center md:px-10">
          <div className="mx-auto mb-7 h-36 w-36 overflow-hidden rounded-full border-4 border-white shadow-[0_20px_50px_-15px_rgba(189,95,124,0.45)] md:h-40 md:w-40">
            <img src="/orit/orit.jpeg" alt="אורית עשור — מנחת קבוצות העצמה לנשים" className="h-full w-full object-cover" />
          </div>

          <span className="inline-flex items-center gap-2 rounded-full bg-blush-100 px-4 py-1.5 text-xs font-semibold text-rose-gold-600">
            <Sparkles size={14} /> נותרו מקומות אחרונים — הקבוצה קטנה ואינטימית
          </span>

          <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight text-ink-900 md:text-6xl">
            לחזור לעצמך<span className="text-rose-gold-500">...</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink-700 md:text-xl">
            כי את לא צריכה לבחור בין להיות אמא מדהימה, אשת קריירה מצליחה ואישה שמחה. את יכולה הכל.
          </p>

          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-rose-gold-500 px-8 py-4 text-base font-bold text-white shadow-[0_12px_30px_-10px_rgba(189,95,124,0.65)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-rose-gold-600 hover:shadow-[0_18px_36px_-10px_rgba(189,95,124,0.75)]"
          >
            רוצה להצטרף? שומרת מקום
          </button>
        </div>
      </section>

      {/* PAIN POINT */}
      <section className="relative bg-white py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
          <p className="text-xl leading-loose text-ink-700 md:text-2xl">
            אם נמאס לך להתרוצץ בין הבית, הילדים, העבודה ואינסוף משימות
            <br /> עד שלא נשאר לך טיפת מקום…
          </p>
          <p className="mt-7 font-display text-3xl font-extrabold text-rose-gold-500 md:text-4xl">
            הגיע הזמן שתחזרי לעצמך!
          </p>
          <div className="mx-auto mt-8 h-1 w-24 rounded-full bg-gradient-to-l from-rose-gold-500 to-blush-300" />
        </div>
      </section>

      {/* BENEFITS */}
      <section className="relative bg-cream-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <h2 className="text-center font-display text-3xl font-extrabold text-ink-900 md:text-4xl">
            מה תקבלי במפגשים?
          </h2>
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {benefits.map(({ icon: Icon, title, body }) => (
              <li
                key={title}
                className="rounded-2xl border border-blush-100 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-rose-gold-300/60 hover:shadow-[0_18px_40px_-20px_rgba(189,95,124,0.4)]"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blush-100 text-rose-gold-500">
                  <Icon size={26} />
                </div>
                <h3 className="font-display text-lg font-bold leading-tight text-ink-900">{title}</h3>
                <p className="mt-3 leading-relaxed text-ink-700">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PROCESS */}
      <section className="relative bg-white py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
          <h2 className="font-display text-3xl font-extrabold leading-tight text-ink-900 md:text-4xl">
            ממצב של הישרדות ותפקוד אוטומטי, לחיים מתוך בחירה, יציבות פנימית ובהירות
          </h2>
          <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-l from-rose-gold-500 to-blush-300" />
          <div className="mt-8 space-y-5 text-lg leading-loose text-ink-700">
            <p>
              אני מאמינה בתהליכים.
              <br /> את לא צריכה עוד טיפ או רשימת מטלות —
              <br /> את צריכה שינוי אמיתי.
            </p>
            <p>זה מסע עמוק שבו נלמד להקשיב פנימה, להבין מה נכון לך באמת, ולפעול משם.</p>
            <p>תהליך שמשנה את הדרך שבה את חווה את היום יום — מול הילדים, מול בן הזוג, ובעיקר מול עצמך.</p>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="relative bg-gradient-to-bl from-peach-100 via-cream-50 to-pink-100 py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6 md:px-10">
          <blockquote className="rounded-3xl bg-white p-8 shadow-[0_24px_60px_-30px_rgba(189,95,124,0.45)] md:p-12">
            <div className="mb-5 text-6xl leading-none text-rose-gold-300">״</div>
            <p className="text-lg leading-loose text-ink-800 md:text-xl">
              הגעתי לקבוצה בתחושה שאני פשוט טובעת. כבר מהמפגש הראשון הרגשתי שמשהו מתחיל להשתנות. היום אני כבר לא אותה אישה — אני מביאה הרבה אור הביתה, רגועה יותר, נוכחת יותר ומשפיעה הרבה טוב על הסביבה שלי.
              <br />
              <br />
              הדבר הכי משמעותי שלמדתי בתהליך הוא לקחת אחריות על הטוב שלי.
            </p>
            <cite className="mt-6 block text-sm font-semibold not-italic text-rose-gold-500">
              — מ.ר., אמא ל-5, ירושלים
            </cite>
          </blockquote>
        </div>
      </section>

      {/* ABOUT */}
      <section className="relative bg-white py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
          <h2 className="font-display text-3xl font-extrabold text-ink-900 md:text-4xl">מי אני?</h2>
          <div className="mx-auto mt-8 h-44 w-44 overflow-hidden rounded-full border-4 border-blush-100 shadow-[0_20px_50px_-15px_rgba(189,95,124,0.4)]">
            <img src="/orit/orit.jpeg" alt="אורית עשור" className="h-full w-full object-cover" />
          </div>
          <div className="mt-8 space-y-5 text-lg leading-loose text-ink-700">
            <p>אורית עשור, אמא ל-9 קטנטנים, בעלת משרד רואי חשבון. את הדרך שאני מלמדת — אני גם חיה.</p>
            <p>לאורך השנים אני מנהלת קריירה תובענית, בית גדול ומלא חיים, ויודעת בדיוק איך זה מרגיש כשהכל קורה בבת אחת.</p>
            <p>אחרי שנים של ליווי נשים, פיתחתי שיטה ייחודית ומעשית שעוזרת לנשים להוריד הילוך בלי לוותר על עצמן. השיטה עובדת, והתוצאות מדברות בעד עצמן.</p>
          </div>
        </div>
      </section>

      {/* DETAILS + CTA */}
      <section className="relative bg-cream-50 py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6 md:px-10">
          <h2 className="text-center font-display text-3xl font-extrabold text-ink-900 md:text-4xl">
            הקבוצה הבאה מתחילה בקרוב
          </h2>

          <ul className="mx-auto mt-10 max-w-xl space-y-3">
            {details.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-start gap-4 rounded-2xl border border-blush-100 bg-white p-5 shadow-[0_4px_18px_-12px_rgba(189,95,124,0.35)]"
              >
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-blush-100 text-rose-gold-500">
                  <Icon size={20} />
                </span>
                <span className="pt-1 text-base font-medium leading-relaxed text-ink-800 md:text-lg">{label}</span>
              </li>
            ))}
          </ul>

          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-full bg-rose-gold-500 px-8 py-4 text-base font-bold text-white shadow-[0_12px_30px_-10px_rgba(189,95,124,0.65)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-rose-gold-600 hover:shadow-[0_18px_36px_-10px_rgba(189,95,124,0.75)]"
            >
              שומרת מקום בקבוצה
            </button>
            <p className="mt-4 text-sm text-ink-700">המקומות מוגבלים — ההרשמה לפי סדר הגעה</p>
            <p className="mt-2 text-sm text-ink-700">
              מעדיפה לדבר קודם?{' '}
              <a href={waHref} target="_blank" rel="noreferrer" className="font-semibold text-rose-gold-500 underline">
                שלחי הודעת וואטסאפ
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* REGISTRATION MODAL */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-900/50 p-4 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalOpen(false)
          }}
          aria-modal="true"
          role="dialog"
        >
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white p-7 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.4)] md:p-9">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="absolute end-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-ink-700 transition-colors hover:bg-blush-100 hover:text-rose-gold-500"
              aria-label="סגירה"
            >
              <X size={20} />
            </button>

            {!submitting ? (
              <>
                <h2 className="font-display text-2xl font-extrabold text-ink-900">שומרת מקום בקבוצה</h2>
                <p className="mt-1 text-sm text-ink-700">רגע אחד ואת בפנים — מלאי את הפרטים ובחרי מועד</p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="orit-name" className="mb-1 block text-sm font-semibold text-ink-800">שם מלא</label>
                    <input
                      id="orit-name"
                      name="fullName"
                      type="text"
                      required
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="השם שלך"
                      className="w-full rounded-xl border border-blush-200 bg-cream-50 px-4 py-3 text-base text-ink-900 outline-none transition-colors focus:border-rose-gold-400 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="orit-phone" className="mb-1 block text-sm font-semibold text-ink-800">טלפון</label>
                    <input
                      id="orit-phone"
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      placeholder="050-0000000"
                      dir="ltr"
                      className="w-full rounded-xl border border-blush-200 bg-cream-50 px-4 py-3 text-base text-ink-900 outline-none transition-colors focus:border-rose-gold-400 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="orit-email" className="mb-1 block text-sm font-semibold text-ink-800">דוא״ל</label>
                    <input
                      id="orit-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="name@example.com"
                      dir="ltr"
                      className="w-full rounded-xl border border-blush-200 bg-cream-50 px-4 py-3 text-base text-ink-900 outline-none transition-colors focus:border-rose-gold-400 focus:bg-white"
                    />
                  </div>
                  <fieldset>
                    <legend className="mb-2 block text-sm font-semibold text-ink-800">בחרי מועד (יום שני, 20:30)</legend>
                    <div className="space-y-2">
                      {mondays.map((m, i) => (
                        <label
                          key={m.value}
                          className="flex cursor-pointer items-center gap-3 rounded-xl border border-blush-100 bg-cream-50 px-4 py-3 transition-colors hover:bg-blush-50 has-[:checked]:border-rose-gold-400 has-[:checked]:bg-blush-50"
                        >
                          <input type="radio" name="sessionDate" value={m.value} required={i === 0} className="accent-rose-gold-500" />
                          <span className="text-sm text-ink-800">{m.label}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <div className="rounded-xl bg-blush-50 px-4 py-3 text-center text-base text-ink-800">
                    סה״כ לתשלום: <strong className="text-rose-gold-600">40 ₪</strong>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-full bg-rose-gold-500 px-6 py-4 text-base font-bold text-white shadow-[0_10px_24px_-8px_rgba(189,95,124,0.6)] transition-all hover:-translate-y-0.5 hover:bg-rose-gold-600"
                  >
                    המשך לתשלום
                  </button>
                </form>
              </>
            ) : (
              <div className="py-6 text-center">
                <h2 className="font-display text-2xl font-extrabold text-ink-900">תודה {name}!</h2>
                <p className="mt-3 text-ink-700">מעבירה אותך לעמוד תשלום מאובטח...</p>
                <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-l from-rose-gold-500 to-blush-300 animate-pulse" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
