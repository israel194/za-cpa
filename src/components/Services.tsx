import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  FileSearch,
  BookOpen,
  Receipt,
  Briefcase,
  Building2,
  Sparkles,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react'
import { useServices, type ServiceIcon } from '../data/content'

const iconMap: Record<ServiceIcon, React.ElementType> = {
  audit: FileSearch,
  bookkeeping: BookOpen,
  tax: Receipt,
  consulting: Briefcase,
  realestate: Building2,
}

type Props = {
  variant?: 'preview' | 'full'
  /** כבוי כשהעמוד כבר נושא את אותה כותרת בראשו */
  heading?: boolean
}

export default function Services({ variant = 'full', heading = true }: Props) {
  const { t, i18n } = useTranslation()
  const services = useServices()
  const isRtl = i18n.dir() === 'rtl'
  const Arrow = isRtl ? ArrowLeft : ArrowRight
  const standardServices = services.filter((s) => !s.premium)
  const premiumServices = services.filter((s) => s.premium)

  return (
    <section className={`relative ${variant === 'preview' ? 'bg-surface' : 'bg-background'} py-20 md:py-28`}>
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        {heading && (
          <>
            <p className="eyebrow mb-5">{t('services.eyebrow')}</p>
            <h2 className="display display-lg">{t('services.title')}</h2>
            <p className="measure mt-5 text-lg text-ink-700">{t('services.subtitle')}</p>
          </>
        )}

        <div className={`${heading ? 'mt-12' : ''} grid gap-x-10 border-t border-[color:var(--color-rule-strong)] sm:grid-cols-2 lg:grid-cols-4`}>
          {standardServices.map((service) => {
            const Icon = iconMap[service.iconName]
            return (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                className="group flex flex-col border-b border-[color:var(--color-rule)] pt-6 pb-7 lg:border-b-0"
              >
                <Icon size={20} strokeWidth={1.6} className="text-gold-600" aria-hidden />
                <h3 className="display display-sm mt-4 transition-colors duration-200 group-hover:text-accent">
                  {service.title}
                </h3>
                <p className="mt-2.5 flex-1 text-[0.95rem] leading-relaxed text-ink-700">
                  {service.summary}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                  <span className="link-rule border-accent/40 group-hover:border-accent">{t('common.readMore')}</span>
                  <Arrow
                    size={14}
                    className={`transition-transform duration-200 ${isRtl ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`}
                  />
                </span>
              </Link>
            )
          })}
        </div>

        {/* השירות המוביל: פס כהה לרוחב, לא כרטיס בהדרגתיות ורודה עם
            ארבעה תת כרטיסים לבנים מרחפים עליה. */}
        {premiumServices.map((premium) => (
          <div key={premium.slug} className="relative mt-16 overflow-hidden rounded-[14px] bg-burgundy-700 text-white">
            <div aria-hidden className="bg-plus-light pointer-events-none absolute inset-0" />
            <div className="relative grid gap-10 p-8 md:grid-cols-[1.05fr_0.95fr] md:gap-14 md:p-12">
              <div>
                <p className="flex items-center gap-2.5 text-[0.7rem] font-bold tracking-[0.18em] text-gold-200">
                  <Sparkles size={14} aria-hidden />
                  {t('services.premiumBadge')}
                </p>
                <h3 className="mt-5 font-display text-3xl font-bold leading-[1.12] text-white md:text-[2.4rem]">
                  {premium.title}
                </h3>
                <p className="measure mt-4 leading-relaxed text-white/80">{premium.summary}</p>
                <Link
                  to={`/services/${premium.slug}`}
                  className="group mt-7 inline-flex items-center gap-2 rounded-[6px] bg-gold-300 px-6 py-3 text-sm font-bold text-navy-800 transition-colors duration-200 hover:bg-gold-200"
                >
                  {t('services.moreInfo')}
                  <Arrow size={15} className={`transition-transform duration-200 ${isRtl ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
                </Link>
              </div>

              <ul className="self-center">
                {premium.bullets.slice(0, 4).map((item) => (
                  <li key={item} className="flex items-start gap-3.5 border-t border-white/15 py-4 first:border-t-0 first:pt-0">
                    <Building2 size={17} strokeWidth={1.6} className="mt-1 shrink-0 text-gold-300" aria-hidden />
                    <span className="leading-relaxed text-white/90">{item}</span>
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
