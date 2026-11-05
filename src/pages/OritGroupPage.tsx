import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Star, Target, MapPin, Calendar, Clock, Coins, Lock, User, MonitorPlay, Waves, Briefcase } from 'lucide-react'

/**
 * הריטריט מלא עד סוף 2026, ולכן בעמוד הזה אין הרשמה, אין השארת פרטים ואין תשלום.
 * השארת פרטים ותשלום נעשים באתר הראשי (עמוד יצירת הקשר) או בדף קורס העלאת תדר.
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
  action: 'link' | 'soon'
  href?: string
}

const services: Service[] = [
  {
    icon: User,
    title: 'ליווי אישי',
    body: 'מפגשים אחד על אחד, בקצב שלך ועל מה שחשוב לך עכשיו. השאירי פרטים באתר ואחזור אלייך לשיחת היכרות.',
    cta: 'להשאיר פרטים באתר',
    action: 'link',
    href: '/contact',
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
    cta: 'להשאיר פרטים באתר',
    action: 'link',
    href: '/contact',
  },
]

const details = [
  { icon: MapPin, label: "רח' נחום חפצדי 17, גבעת שאול, ירושלים (מגדל רם — קומה 11)" },
  { icon: Calendar, label: 'כל יום שני' },
  { icon: Clock, label: 'בשעה 20:30 — אחרי שהילדים ישנים' },
  { icon: Coins, label: '199 ש"ח, תשלום חד פעמי' },
]

export default function OritGroupPage() {
  useEffect(() => {
    document.title = 'לחזור לעצמך · מלא עד סוף 2026 | אורית עשור'
  }, [])

  return (
    <div dir="rtl" lang="he">
      {/* חותמת אלכסונית על פני העמוד. aria-hidden ו-pointer-events-none,
          כדי שלא תחסום קליק ולא תיקרא פעמיים בקורא מסך. */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
        <div
          className="absolute left-1/2 top-1/2 w-[260vmax]"
          style={{ transform: 'translate(-50%, -50%) rotate(-28deg)' }}
        >
          <div className="h-[2px] w-full bg-primary/45" />
          <div className="border-y-2 border-primary/45 py-1.5 text-center md:py-2">
            <span className="font-display font-extrabold tracking-[0.08em] text-primary/70 [font-size:clamp(1.15rem,4vw,3.25rem)]">
              מלא עד סוף 2026
            </span>
          </div>
          <div className="h-[2px] w-full bg-primary/45" />
        </div>
      </div>
      {/* HERO */}
      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-peach-100 via-cream-50 to-white" />
        <div aria-hidden className="pointer-events-none absolute -top-32 -end-24 h-80 w-80 rounded-full bg-peach-200/55 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-24 -start-24 h-72 w-72 rounded-full bg-pink-200/45 blur-3xl" />

        <div className="relative mx-auto max-w-3xl px-6 text-center md:px-10">
          <div className="mx-auto mb-7 h-36 w-36 overflow-hidden rounded-full border-4 border-white shadow-[0_20px_50px_-15px_rgba(189,95,124,0.45)] md:h-40 md:w-40">
            <img src="/orit/orit.jpeg" alt="אורית עשור — מנחת קבוצות העצמה לנשים" className="h-full w-full object-cover" />
          </div>

          <span className="inline-flex items-center gap-2 rounded-full bg-blush-100 px-4 py-1.5 text-xs font-semibold text-primary">
            <Lock size={14} /> ההרשמה סגורה · מלא עד סוף 2026
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
            <ClosedNotice />
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
      <section className="relative bg-background py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6 md:px-10">
          <h2 className="text-center font-display text-3xl font-extrabold text-ink-900 md:text-4xl">
            פרטי הריטריט
          </h2>
          <p className="mt-4 text-center text-base font-semibold text-primary">
            מלא עד סוף 2026. הפרטים כאן לידיעה בלבד.
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
            <ClosedNotice />
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
                  ) : (
                    <div className={card} aria-disabled="true">{inner}</div>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </section>
    </div>
  )
}


/** ההרשמה סגורה: מפנה לאתר הראשי, המקום היחיד להשארת פרטים. */
function ClosedNotice() {
  return (
    <div className="mx-auto max-w-xl rounded-3xl border-2 border-primary/30 bg-white/95 p-7 text-center shadow-[0_18px_40px_-24px_rgba(189,95,124,0.45)] md:p-9">
      <span className="inline-flex items-center gap-2 rounded-full bg-blush-100 px-4 py-1.5 text-xs font-semibold text-primary">
        <Lock size={14} /> ההרשמה סגורה
      </span>
      <p className="mt-4 font-display text-xl font-extrabold text-ink-900 md:text-2xl">
        מלא עד סוף 2026
      </p>
      <p className="mt-3 leading-relaxed text-ink-700">
        לא ניתן להירשם, להשאיר פרטים או לשלם דרך העמוד הזה. להשארת פרטים ולפנייה:
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-bold text-white shadow-[0_12px_30px_-10px_rgba(189,95,124,0.65)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90"
        >
          יצירת קשר באתר
        </Link>
        <Link
          to="/frequency-course"
          className="inline-flex items-center gap-2 rounded-full border-2 border-primary/40 px-7 py-3.5 text-base font-bold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:border-primary"
        >
          לקורס העלאת תדר
        </Link>
      </div>
    </div>
  )
}
