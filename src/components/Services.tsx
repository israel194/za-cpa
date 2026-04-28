import {
  FileSearch,
  BookOpen,
  Receipt,
  Briefcase,
  Wallet,
  TrendingUp,
  HeartHandshake,
  Building2,
  Sparkles,
} from 'lucide-react'

const services = [
  { icon: FileSearch, title: 'ביקורת דוחות כספיים' },
  { icon: BookOpen, title: 'הנהלת חשבונות' },
  { icon: Receipt, title: 'החזרי מס' },
  { icon: Briefcase, title: 'ייעוץ עסקי' },
  { icon: Wallet, title: 'חשבות שכר' },
  { icon: TrendingUp, title: 'ליווי עסקים' },
  { icon: HeartHandshake, title: 'ליווי אלכ"רים (עמותות)' },
]

const premiumServices = [
  'ליווי בענייני מס עסקאות מקרקעין',
  'פינוי ובינוי',
  'תמ"א 38',
]

export default function Services() {
  return (
    <section id="services" className="relative bg-cream-50 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-block text-sm font-semibold uppercase tracking-[0.2em] text-rose-gold-500">
            תחומי התמחות
          </div>
          <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-ink-900 md:text-5xl">
            השירותים שלנו
          </h2>
          <p className="mt-5 text-lg text-ink-700">
            מגוון רחב של פתרונות פיננסיים, מותאמים אישית לכל לקוח ולכל עסק.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map(({ icon: Icon, title }) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-2xl border border-blush-100 bg-white p-7 transition-all
                duration-300 hover:-translate-y-1 hover:border-rose-gold-300 hover:shadow-[0_24px_48px_-24px_rgba(183,110,121,0.4)]"
            >
              <div
                aria-hidden
                className="absolute -end-10 -top-10 h-32 w-32 rounded-full bg-blush-100/0 transition-colors duration-300 group-hover:bg-blush-100/70"
              />
              <div
                className="relative mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blush-100 text-rose-gold-500
                  transition-all duration-300 group-hover:bg-rose-gold-500 group-hover:text-white"
              >
                <Icon size={22} />
              </div>
              <h3 className="relative font-display text-lg font-bold leading-snug text-ink-900">
                {title}
              </h3>
            </div>
          ))}
        </div>

        {/* Premium / highlighted services banner */}
        <div className="relative mt-20 overflow-hidden rounded-3xl border border-rose-gold-300/50">
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-bl from-rose-gold-500 via-rose-gold-400 to-blush-300"
          />
          <div
            aria-hidden
            className="absolute inset-0 opacity-30
              [background-image:radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.4),transparent_45%),radial-gradient(circle_at_85%_75%,rgba(255,255,255,0.35),transparent_50%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -end-24 h-72 w-72 rounded-full bg-white/15 blur-3xl"
          />

          <div className="relative grid gap-10 p-10 md:grid-cols-[auto_1fr] md:items-center md:gap-14 md:p-14">
            <div className="flex flex-col items-center text-center md:items-start md:text-start">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/25 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur-sm">
                <Sparkles size={15} />
                שירותי פרימיום
              </div>
              <h3 className="mt-5 font-display text-3xl font-extrabold leading-tight text-white md:text-4xl">
                התמחות ייחודית
                <br />
                במיסוי מקרקעין והתחדשות עירונית
              </h3>
              <p className="mt-4 max-w-md text-base leading-relaxed text-white/90 md:text-lg">
                ליווי מקצועי ומעמיק בעסקאות מקרקעין מורכבות, בהיבטי מיסוי
                ובליווי פרויקטי התחדשות עירונית מקצה לקצה.
              </p>
            </div>

            <ul className="grid gap-3 md:gap-4">
              {premiumServices.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-4 rounded-2xl bg-white/95 p-5 shadow-[0_12px_36px_-16px_rgba(0,0,0,0.25)] backdrop-blur-sm"
                >
                  <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-gradient-to-br from-rose-gold-500 to-blush-400 text-white">
                    <Building2 size={20} />
                  </span>
                  <span className="font-display text-base font-bold text-ink-900 md:text-lg">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
