import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Star, Target, MapPin, Calendar, Clock, Coins, Lock, User, MonitorPlay, Waves, Briefcase } from 'lucide-react'
import { X } from 'lucide-react'
import { FullStamp } from '../components/ui/RetreatClosed'
import { sendLead } from '../lib/notify'
import PrivacyNotice from '../components/ui/PrivacyNotice'
import { useSeo } from '../lib/seo'

/**
 * המחזור של 2026 מלא. החותמת האלכסונית יושבת רק על בלוק ההצטרפות, לא על כל העמוד,
 * והכפתור מוביל לעמוד ההרשמה שבו אפשר לשמור מקום למחזור 2027 ולהשאיר פרטים.
 */

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

type Service = {
  icon: typeof Heart
  title: string
  body: string
  cta: string
  badge?: string
  action: 'lead' | 'link' | 'soon'
  href?: string
}

const services: Service[] = [
  {
    icon: User,
    title: 'ליווי אישי',
    body: 'מפגשים אחד על אחד, בקצב שלך ועל מה שחשוב לך עכשיו. השאירי פרטים ואחזור אלייך לשיחת היכרות.',
    cta: 'להשאיר פרטים',
    action: 'lead',
  },
  {
    icon: MonitorPlay,
    title: 'קורסים דיגיטליים',
    body: 'הכלים והתהליכים, לצפייה ולתרגול מהבית, בזמן שנוח לך.',
    cta: 'בקרוב',
    badge: 'בבנייה',
    action: 'soon',
  },
  {
    icon: Waves,
    title: 'קורס העלאת תדר',
    body: 'תשעה מפגשים לנשים: מתודעה הישרדותית ולחץ אל חיים של בחירה, שקט פנימי וחיבור.',
    cta: 'לפרטים על הקורס',
    badge: 'חדש',
    action: 'link',
    href: '/frequency-course',
  },
  {
    icon: Briefcase,
    title: 'תוכנית ליווי לנשות עסקים',
    body: 'לנשות עסקים שמתמודדות עם בעיות משפחתיות מורכבות, ורוצות להחזיק את העסק ואת הבית מתוך יציבות פנימית.',
    cta: 'להשאיר פרטים',
    action: 'lead',
  },
]

const details = [
  { icon: MapPin, label: "רח' נחום חפצדי 17, גבעת שאול, ירושלים (מגדל רם — קומה 11)" },
  { icon: Calendar, label: 'כל יום שני' },
  { icon: Clock, label: 'בשעה 20:30 — אחרי שהילדים ישנים' },
  { icon: Coins, label: '199 ש"ח, תשלום חד פעמי' },
]

export default function OritGroupPage() {
  const [lead, setLead] = useState<string | null>(null)

  useSeo('oritGroup', { title: 'לחזור לעצמך · מלא עד סוף 2026' })

  return (
    <div dir="rtl" lang="he">
      {/* HERO */}
      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-peach-100 via-cream-50 to-white" />
        <div aria-hidden className="pointer-events-none absolute -top-32 -end-24 h-80 w-80 rounded-full bg-peach-200/55 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-24 -start-24 h-72 w-72 rounded-full bg-pink-200/45 blur-3xl" />

        <div className="relative mx-auto max-w-3xl px-6 text-center md:px-10">
          <div className="mx-auto mb-7 h-36 w-36 overflow-hidden rounded-full border-4 border-white shadow-[0_20px_50px_-15px_rgba(189,95,124,0.45)] md:h-40 md:w-40">
            <img src="/orit/orit.jpeg" alt="אורית עשור — מנחת קבוצות העצמה לנשים" width="160" height="160" className="h-full w-full object-cover" />
          </div>

          <span className="inline-flex items-center gap-2 rounded-full bg-blush-100 px-4 py-1.5 text-xs font-semibold text-primary">
            <Lock size={14} /> מלא עד סוף 2026 · נפתחת רשימה ל-2027
          </span>

          <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight text-ink-900 md:text-6xl">
            לחזור לעצמך<span className="text-accent">...</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink-700 md:text-xl">
            כי את לא צריכה לבחור בין להיות אמא מדהימה, אשת קריירה מצליחה ואישה שמחה. את יכולה הכל.
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-ink-700 md:text-lg">
            ערב שכולו שלך: מרחב שקט, קבוצה קטנה ותומכת, וכלים לחזור לעצמך. כמו ריטריט, בלי לצאת מהעיר.
          </p>

          <div className="mt-9">
            <JoinBlock />
          </div>
        </div>
      </section>

      {/* PAIN POINT */}
      <section className="relative bg-white py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
          <p className="text-xl leading-loose text-ink-700 md:text-2xl">
            אם נמאס לך להתרוצץ בין הבית, הילדים, העבודה ואינסוף משימות
            <br /> עד שלא נשאר לך טיפת מקום…
          </p>
          <p className="mt-7 font-display text-3xl font-extrabold text-accent md:text-4xl">
            הגיע הזמן שתחזרי לעצמך!
          </p>
          <div className="mx-auto mt-8 h-1 w-24 rounded-full bg-gradient-to-l from-rose-gold-500 to-blush-300" />
        </div>
      </section>

      {/* BENEFITS */}
      <section className="relative bg-background py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <h2 className="text-center font-display text-3xl font-extrabold text-ink-900 md:text-4xl">
            מה תקבלי במפגשים?
          </h2>
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {benefits.map(({ icon: Icon, title, body }) => (
              <li
                key={title}
                className="rounded-2xl border border-blush-100 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/60/60 hover:shadow-[0_18px_40px_-20px_rgba(189,95,124,0.4)]"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blush-100 text-accent">
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
            <cite className="mt-6 block text-sm font-semibold not-italic text-accent">
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
            <img src="/orit/orit.jpeg" alt="אורית עשור" width="176" height="176" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div className="mt-8 space-y-5 text-lg leading-loose text-ink-700">
            <p>אורית עשור, אמא ל-9 קטנטנים, בעלת משרד רואי חשבון. את הדרך שאני מלמדת — אני גם חיה.</p>
            <p>לאורך השנים אני מנהלת קריירה תובענית, בית גדול ומלא חיים, ויודעת בדיוק איך זה מרגיש כשהכל קורה בבת אחת.</p>
            <p>אחרי שנים של ליווי נשים, פיתחתי שיטה ייחודית ומעשית שעוזרת לנשים להוריד הילוך בלי לוותר על עצמן. השיטה עובדת, והתוצאות מדברות בעד עצמן.</p>
          </div>
        </div>
      </section>

      {/* DETAILS + CTA */}
      <section className="relative bg-background py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6 md:px-10">
          <h2 className="text-center font-display text-3xl font-extrabold text-ink-900 md:text-4xl">
            פרטי הריטריט
          </h2>
          <p className="mt-4 text-center text-base font-semibold text-primary">
            המחזור של 2026 מלא. הפרטים כאן לידיעה, ולשמירת מקום ל-2027.
          </p>

          <ul className="mx-auto mt-10 max-w-xl space-y-3">
            {details.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-start gap-4 rounded-2xl border border-blush-100 bg-white p-5 shadow-[0_4px_18px_-12px_rgba(189,95,124,0.35)]"
              >
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-blush-100 text-accent">
                  <Icon size={20} />
                </span>
                <span className="pt-1 text-base font-medium leading-relaxed text-ink-800 md:text-lg">{label}</span>
              </li>
            ))}
          </ul>

          <div className="mt-12">
            <JoinBlock />
          </div>
        </div>
      </section>

      {/* MORE WAYS TO WORK WITH ORIT */}
      <section className="relative bg-white py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <h2 className="text-center font-display text-3xl font-extrabold text-ink-900 md:text-4xl">עוד דרכים ללכת איתי</h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((sv) => {
              const Icon = sv.icon
              const inner = (
                <>
                  <span className="flex items-start justify-between gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blush-100 text-accent">
                      <Icon size={24} />
                    </span>
                    {sv.badge && (
                      <span className={`rounded-full px-3 py-1 text-xs font-bold ${sv.badge === 'חדש' ? 'bg-burgundy-600 text-white' : 'bg-cream-100 text-ink-700'}`}>
                        {sv.badge}
                      </span>
                    )}
                  </span>
                  <span className="mt-4 block font-display text-lg font-bold leading-snug text-ink-900">{sv.title}</span>
                  <span className="mt-2 block flex-1 text-sm leading-relaxed text-ink-700">{sv.body}</span>
                  <span className={`mt-5 inline-flex justify-center rounded-full px-5 py-2.5 text-sm font-bold ${sv.action === 'soon' ? 'bg-cream-100 text-ink-700/70' : 'bg-primary text-white'}`}>
                    {sv.cta}
                  </span>
                </>
              )
              const card = 'flex h-full w-full flex-col rounded-2xl border border-blush-100 bg-background p-6 text-start transition-all duration-300'
              const hover = ' hover:-translate-y-1 hover:shadow-[0_18px_40px_-20px_rgba(189,95,124,0.4)]'
              return (
                <li key={sv.title}>
                  {sv.action === 'link' ? (
                    <a href={sv.href} className={card + hover}>{inner}</a>
                  ) : sv.action === 'lead' ? (
                    <button type="button" onClick={() => setLead(sv.title)} className={card + hover}>{inner}</button>
                  ) : (
                    <div className={card} aria-disabled="true">{inner}</div>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {lead && <LeadModal topic={lead} onClose={() => setLead(null)} />}
    </div>
  )
}


/** בלוק ההצטרפות: חתום כמלא, ומוביל לעמוד ההרשמה שבו נשמר מקום ל-2027. */
function JoinBlock() {
  return (
    <div className="mx-auto max-w-xl rounded-3xl border-2 border-primary/25 bg-white/95 p-5 text-center shadow-[0_18px_40px_-24px_rgba(189,95,124,0.45)] md:p-7">
      {/* החותמת יושבת על רצועת ההרשמה בלבד, כדי שהטקסט שמתחתיה יישאר קריא */}
      <div className="relative overflow-hidden rounded-2xl bg-background px-6 py-10 md:py-12">
        <FullStamp />
        <span className="relative inline-flex items-center gap-2 rounded-full bg-blush-100 px-4 py-1.5 text-xs font-semibold text-primary">
          <Lock size={14} /> ההרשמה למחזור 2026 סגורה
        </span>
      </div>
      <p className="mt-5 leading-relaxed text-ink-700">
        אפשר לשמור מקום למחזור 2027 ולהשאיר פרטים, ואורית תחזור אלייך עם פתיחת ההרשמה.
      </p>
      <Link
        to="/pay/retreat"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-bold text-white shadow-[0_12px_30px_-10px_rgba(189,95,124,0.65)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90"
      >
        לשמירת מקום ל-2027
      </Link>
    </div>
  )
}


/** חלון קצר להשארת פרטים (ליווי אישי, תוכנית לנשות עסקים). הפנייה נשלחת לאורית. */
function LeadModal({ topic, onClose }: { topic: string; onClose: () => void }) {
  const [sent, setSent] = useState(false)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    void sendLead({
      target: 'orit',
      source: 'דף אורית: ' + topic,
      name: String(fd.get('fullName') ?? ''),
      phone: String(fd.get('phone') ?? ''),
      email: String(fd.get('email') ?? ''),
      message: String(fd.get('message') ?? ''),
    })
    setSent(true)
  }

  const input =
    'w-full rounded-xl border border-blush-200 bg-background px-4 py-3 text-base text-ink-900 outline-none transition-colors focus:border-accent focus:bg-white'
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-900/50 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      aria-modal="true"
      role="dialog"
      aria-label={topic}
    >
      <div className="relative w-full max-w-md rounded-3xl bg-white p-7 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.4)] md:p-9">
        <button
          type="button"
          onClick={onClose}
          className="absolute end-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-ink-700 transition-colors hover:bg-blush-100 hover:text-accent"
          aria-label="סגירה"
        >
          <X size={20} />
        </button>
        {!sent ? (
          <>
            <h2 className="font-display text-2xl font-extrabold text-ink-900">{topic}</h2>
            <p className="mt-1 text-sm text-ink-700">השאירי פרטים ואחזור אלייך בהקדם</p>
            <form onSubmit={submit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="lead-name" className="mb-1 block text-sm font-semibold text-ink-800">שם מלא</label>
                <input id="lead-name" name="fullName" type="text" required autoComplete="name" className={input} />
              </div>
              <div>
                <label htmlFor="lead-phone" className="mb-1 block text-sm font-semibold text-ink-800">טלפון</label>
                <input id="lead-phone" name="phone" type="tel" required autoComplete="tel" dir="ltr" placeholder="050-0000000" className={input} />
              </div>
              <div>
                <label htmlFor="lead-email" className="mb-1 block text-sm font-semibold text-ink-800">דוא״ל</label>
                <input id="lead-email" name="email" type="email" autoComplete="email" dir="ltr" placeholder="name@example.com" className={input} />
              </div>
              <div>
                <label htmlFor="lead-message" className="mb-1 block text-sm font-semibold text-ink-800">כמה מילים על מה שמעסיק אותך (לא חובה)</label>
                <textarea id="lead-message" name="message" rows={3} className={input} />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-primary px-6 py-4 text-base font-bold text-white shadow-[0_10px_24px_-8px_rgba(189,95,124,0.6)] transition-all hover:-translate-y-0.5 hover:bg-primary/90"
              >
                שליחה
              </button>
              <PrivacyNotice controller="orit" />
            </form>
          </>
        ) : (
          <div className="py-6 text-center">
            <h2 className="font-display text-2xl font-extrabold text-ink-900">תודה!</h2>
            <p className="mt-3 text-ink-700">קיבלתי את הפרטים, ואחזור אלייך בהקדם.</p>
          </div>
        )}
      </div>
    </div>
  )
}
