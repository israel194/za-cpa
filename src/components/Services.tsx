import { Link } from 'react-router-dom'
import {
  FileSearch,
  BookOpen,
  Receipt,
  Briefcase,
  Building2,
  Sparkles,
  ArrowLeft,
} from 'lucide-react'
import { services, type ServiceIcon } from '../data/content'

const iconMap: Record<ServiceIcon, React.ElementType> = {
  audit: FileSearch,
  bookkeeping: BookOpen,
  tax: Receipt,
  consulting: Briefcase,
  realestate: Building2,
}

type Props = {
  variant?: 'preview' | 'full'
}

export default function Services({ variant = 'full' }: Props) {
  const standardServices = services.filter((s) => !s.premium)
  const premiumServices = services.filter((s) => s.premium)

  return (
    <section className={`relative ${variant === 'preview' ? 'bg-white' : 'bg-cream-50'} py-20 md:py-28`}>
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

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {standardServices.map((service) => {
            const Icon = iconMap[service.iconName]
            return (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
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
                  {service.title}
                </h3>
                <p className="relative mt-3 text-sm leading-relaxed text-ink-700">
                  {service.summary}
                </p>
                <div className="relative mt-4 inline-flex items-center gap-1 text-sm font-semibold text-rose-gold-500">
                  קראו עוד
                  <ArrowLeft
                    size={14}
                    className="transition-transform duration-300 group-hover:-translate-x-1"
                  />
                </div>
              </Link>
            )
          })}
        </div>

        {/* Premium / highlighted services banner */}
        {premiumServices.map((premium) => (
          <div
            key={premium.slug}
            className="relative mt-20 overflow-hidden rounded-3xl border border-rose-gold-300/50"
          >
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
                  שירות פרימיום
                </div>
                <h3 className="mt-5 font-display text-3xl font-extrabold leading-tight text-white md:text-4xl">
                  {premium.title}
                </h3>
                <p className="mt-4 max-w-md text-base leading-relaxed text-white/90 md:text-lg">
                  {premium.summary}
                </p>
                <Link
                  to={`/services/${premium.slug}`}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-rose-gold-600 shadow-[0_12px_28px_-10px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-0.5"
                >
                  למידע מלא
                  <ArrowLeft size={16} />
                </Link>
              </div>

              <ul className="grid gap-3 md:gap-4">
                {premium.bullets.slice(0, 4).map((item) => (
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
        ))}
      </div>
    </section>
  )
}
