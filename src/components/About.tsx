import { ShieldCheck, Eye, Award } from 'lucide-react'

const values = [
  {
    icon: ShieldCheck,
    title: 'אמינות',
    text: 'מחויבות מלאה ללקוח ולסטנדרטים הגבוהים ביותר.',
  },
  {
    icon: Eye,
    title: 'שקיפות',
    text: 'תקשורת ברורה ופתוחה בכל שלב בליווי הפיננסי.',
  },
  {
    icon: Award,
    title: 'מצוינות',
    text: 'חתירה מתמדת לפתרונות מדויקים ומותאמים אישית.',
  },
]

export default function About() {
  return (
    <section id="about" className="relative bg-white py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 md:px-10 lg:grid-cols-2 lg:gap-20">
        <div>
          <div className="mb-4 inline-block text-sm font-semibold uppercase tracking-[0.2em] text-rose-gold-500">
            אודות
          </div>
          <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-ink-900 md:text-5xl">
            אודות המשרד
          </h2>
          <p className="mt-7 text-lg leading-loose text-ink-700 md:text-xl">
            משרדנו מעניק שירות אישי, מקצועי ומקיף, תוך התאמה מדויקת לצרכים
            הפיננסיים של כל לקוח. אנו דוגלים באמינות, שקיפות וחתירה למצוינות.
          </p>

          <div className="mt-10 flex h-1 w-24 rounded-full bg-gradient-to-l from-rose-gold-500 to-blush-300" />
        </div>

        <div className="grid gap-5 sm:grid-cols-1">
          {values.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="group flex items-start gap-5 rounded-2xl border border-blush-100 bg-cream-50/60 p-6 transition-all
                duration-300 hover:-translate-y-0.5 hover:border-rose-gold-300/60 hover:bg-white hover:shadow-[0_18px_40px_-20px_rgba(183,110,121,0.35)]"
            >
              <div
                className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-blush-100
                  text-rose-gold-500 transition-colors group-hover:bg-rose-gold-500 group-hover:text-white"
              >
                <Icon size={22} />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-ink-900">
                  {title}
                </h3>
                <p className="mt-1.5 leading-relaxed text-ink-700">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
