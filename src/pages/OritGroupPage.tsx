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
      <section className="relative overflow-hidden border-b border-[color:var(--color-rule)] bg-cream-50 pt-28 pb-14 md:pt-36 md:pb-20">
        <div aria-hidden className="grain pointer-events-none absolute inset-0" />

        <div className="relative mx-auto max-w-6xl px-6 md:px-10">
          <div className="grid items-center gap-12 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:gap-16">
            <div>
              <span className="inline-flex items-center gap-2 text-[0.72rem] font-bold tracking-[0.16em] text-gold-600">
                <Lock size={13} /> מלא עד סוף 2026 · נפתחת רשימה ל-2027
              </span>

              <h1 className="display display-xl display-ink mt-5">
                לחזור לעצמך<span className="text-accent">...</span>
              </h1>
              <p className="measure mt-6 text-lg leading-relaxed text-ink-700 md:text-xl">
                כי את לא צריכה לבחור בין להיות אמא מדהימה, אשת קריירה מצליחה ואישה שמחה. את יכולה הכל.
              </p>
              <p className="measure mt-3 leading-relaxed text-ink-700">
                ערב שכולו שלך: מרחב שקט, קבוצה קטנה ותומכת, וכלים לחזור לעצמך. כמו ריטריט, בלי לצאת מהעיר.
              </p>
            </div>

            <figure className="relative mx-auto w-full max-w-[340px] md:mx-0 md:ms-auto">
              <div aria-hidden className="absolute -inset-2.5 rounded-t-[999px] rounded-b-[8px] border border-gold-300" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[6px] bg-muted">
                <img
                  src="/orit/orit.jpeg"
                  alt="אורית עשור — מנחת קבוצות העצמה לנשים"
                  width="340"
                  height="425"
                  className="absolute inset-0 h-full w-full object-cover object-[center_18%]"
                />
              </div>
            </figure>
          </div>

          <div className="mt-12">
            <JoinBlock />
          </div>
        </div>
      </section>

      {/* PAIN POINT */}
      <section className="relative bg-white py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-[0.9fr_1.1fr] md:gap-16 md:px-10">
          <p className="text-xl leading-loose text-ink-700">
            אם נמאס לך להתרוצץ בין הבית, הילדים, העבודה ואינסוף משימות עד שלא נשאר לך טיפת מקום…
          </p>
          <p className="display display-lg self-center">הגיע הזמן שתחזרי לעצמך!</p>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="relative bg-background py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <h2 className="display display-lg display-ink">מה תקבלי במפגשים?</h2>
          <ul className="mt-10 grid gap-x-10 border-t border-[color:var(--color-rule-strong)] md:grid-cols-3">
            {benefits.map(({ icon: Icon, title, body }) => (
              <li key={title} className="border-b border-[color:var(--color-rule)] pt-6 pb-7 md:border-b-0">
                <Icon size={20} strokeWidth={1.6} className="text-gold-600" aria-hidden />
                <h3 className="display display-sm display-ink mt-4">{title}</h3>
                <p className="mt-2.5 leading-relaxed text-ink-700">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PROCESS */}
      <section className="relative bg-white py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[1.05fr_0.95fr] md:gap-16 md:px-10">
          <h2 className="display display-lg display-ink">
            ממצב של הישרדות ותפקוד אוטומטי, לחיים מתוך בחירה, יציבות פנימית ובהירות
          </h2>
          <div className="space-y-5 text-lg leading-loose text-ink-700">
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
      <section className="relative overflow-hidden border-y border-[color:var(--color-rule)] bg-cream-50 py-16 md:py-24">
        <div aria-hidden className="grain pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-3xl px-6 md:px-10">
          <blockquote>
            <span aria-hidden className="mb-4 block h-px w-12 bg-gold-400" />
            <p className="font-display text-xl leading-[1.65] text-ink-800 md:text-[1.6rem]">
              הגעתי לקבוצה בתחושה שאני פשוט טובעת. כבר מהמפגש הראשון הרגשתי שמשהו מתחיל להשתנות. היום אני כבר לא אותה אישה — אני מביאה הרבה אור הביתה, רגועה יותר, נוכחת יותר ומשפיעה הרבה טוב על הסביבה שלי.
              <br />
              <br />
              הדבר הכי משמעותי שלמדתי בתהליך הוא לקחת אחריות על הטוב שלי.
            </p>
            <cite className="mt-6 block text-sm font-semibold not-italic text-muted-foreground">
              מ.ר., אמא ל-5, ירושלים
            </cite>
          </blockquote>
        </div>
      </section>

      {/* ABOUT */}
      <section className="relative bg-white py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl items-start gap-10 px-6 md:grid-cols-[0.8fr_1.2fr] md:gap-16 md:px-10">
          <div>
            <h2 className="display display-lg display-ink">מי אני?</h2>
            <div className="mt-7 aspect-[4/5] w-full max-w-[280px] overflow-hidden rounded-[8px] border border-[color:var(--color-rule)] bg-muted">
              <img src="/orit/orit.jpeg" alt="אורית עשור" width="280" height="350" loading="lazy" className="h-full w-full object-cover object-[center_18%]" />
            </div>
          </div>
          <div className="space-y-5 text-lg leading-loose text-ink-700 md:pt-3">
            <p>אורית עשור, אמא ל-9 קטנטנים, בעלת משרד רואי חשבון. את הדרך שאני מלמדת — אני גם חיה.</p>
            <p>לאורך השנים אני מנהלת קריירה תובענית, בית גדול ומלא חיים, ויודעת בדיוק איך זה מרגיש כשהכל קורה בבת אחת.</p>
            <p>אחרי שנים של ליווי נשים, פיתחתי שיטה ייחודית ומעשית שעוזרת לנשים להוריד הילוך בלי לוותר על עצמן. השיטה עובדת, והתוצאות מדברות בעד עצמן.</p>
          </div>
        </div>
      </section>

      {/* DETAILS + CTA */}
      <section className="relative bg-background py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6 md:px-10">
          <h2 className="display display-lg display-ink">פרטי הריטריט</h2>
          <p className="mt-3 text-base font-semibold text-primary">
            המחזור של 2026 מלא. הפרטים כאן לידיעה, ולשמירת מקום ל-2027.
          </p>

          <ul className="mt-9 border-t border-[color:var(--color-rule-strong)]">
            {details.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-start gap-4 border-b border-[color:var(--color-rule)] py-4">
                <Icon size={18} strokeWidth={1.6} className="mt-1 shrink-0 text-gold-600" aria-hidden />
                <span className="leading-relaxed text-ink-800">{label}</span>
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
          <h2 className="display display-lg display-ink">עוד דרכים ללכת איתי</h2>
          <ul className="mt-9 grid gap-x-10 border-t border-[color:var(--color-rule-strong)] sm:grid-cols-2 lg:grid-cols-4">
            {services.map((sv) => {
              const Icon = sv.icon
              const inner = (
                <>
                  <span className="flex items-center justify-between gap-3">
                    <Icon size={20} strokeWidth={1.6} className="text-gold-600" aria-hidden />
                    {sv.badge && (
                      <span className="text-[0.68rem] font-bold tracking-[0.16em] text-gold-600">{sv.badge}</span>
                    )}
                  </span>
                  <span className="mt-4 block display display-sm display-ink">{sv.title}</span>
                  <span className="mt-2 block flex-1 text-sm leading-relaxed text-ink-700">{sv.body}</span>
                  <span className={`mt-5 inline-flex justify-center rounded-full px-5 py-2.5 text-sm font-bold ${sv.action === 'soon' ? 'bg-cream-100 text-ink-700/70' : 'bg-primary text-white'}`}>
                    {sv.cta}
                  </span>
                </>
              )
              const card = 'group flex h-full w-full flex-col border-b border-[color:var(--color-rule)] pt-6 pb-7 text-start lg:border-b-0'
              const hover = ''
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
    <div className="mx-auto max-w-xl rounded-[12px] border border-[color:var(--color-rule-strong)] bg-surface p-4 text-center md:p-5">
      {/* החותמת יושבת על רצועת ההרשמה בלבד, כדי שהטקסט שמתחתיה יישאר קריא */}
      <div className="relative overflow-hidden rounded-[8px] bg-cream-50 px-6 py-10 md:py-12">
        <FullStamp />
        <span className="relative inline-flex items-center gap-2 rounded-[4px] bg-cream-100 px-3 py-1.5 text-xs font-semibold text-primary">
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
            <h2 className="display display-md display-ink">{topic}</h2>
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
            <h2 className="display display-md display-ink">תודה!</h2>
            <p className="mt-3 text-ink-700">קיבלתי את הפרטים, ואחזור אלייך בהקדם.</p>
          </div>
        )}
      </div>
    </div>
  )
}
