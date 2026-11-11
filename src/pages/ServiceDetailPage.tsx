import { Link, Navigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  FileSearch,
  BookOpen,
  Receipt,
  Briefcase,
  Building2,
  Check,
  ArrowLeft,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import PageHero from '../components/PageHero'
import CallToAction from '../components/CallToAction'
import { useServices, type ServiceIcon } from '../data/content'
import { useSeo } from '../lib/seo'

const iconMap: Record<ServiceIcon, React.ElementType> = {
  audit: FileSearch,
  bookkeeping: BookOpen,
  tax: Receipt,
  consulting: Briefcase,
  realestate: Building2,
}

export default function ServiceDetailPage() {
  const { slug } = useParams()
  const { t, i18n } = useTranslation()
  const services = useServices()
  const isRtl = i18n.dir() === 'rtl'
  const Arrow = isRtl ? ArrowLeft : ArrowRight

  const service = services.find((s) => s.slug === slug)
  // לפני ההחזרה המוקדמת, כדי שההוק ירוץ בכל רינדור
  useSeo('services', service ? { title: service.title, description: service.summary } : undefined)
  if (!service) return <Navigate to="/services" replace />

  const Icon = iconMap[service.iconName]
  const otherServices = services.filter((s) => s.slug !== service.slug)

  return (
    <>
      <PageHero
        eyebrow={
          service.premium ? t('services.premiumBadge') : t('nav.services')
        }
        title={service.title}
        subtitle={service.summary}
        crumbs={[
          { to: '/services', label: t('nav.services') },
          { to: `/services/${service.slug}`, label: service.shortTitle },
        ]}
      />

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:px-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-8 flex items-center gap-4">
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl ${
                  service.premium
                    ? 'border border-gold-300 bg-cream-50 text-gold-600'
                    : 'bg-blush-100 text-accent'
                }`}
              >
                <Icon size={28} />
              </div>
              {service.premium && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-silver-200 bg-gradient-to-l from-silver-100 to-blush-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-burgundy-500">
                  <Sparkles size={12} />
                  {t('services.premiumBadge')}
                </span>
              )}
            </div>

            <h2 className="display display-md display-ink">
              {t('services.whatIncluded')}
            </h2>
            <ul className="mt-6 space-y-3">
              {service.bullets.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-blush-100 bg-background/60 p-4 transition-colors hover:border-accent/60/50 hover:bg-white"
                >
                  <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-primary text-white">
                    <Check size={14} />
                  </span>
                  <span className="text-base leading-relaxed text-ink-800 md:text-lg">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-[10px] border border-gold-300 bg-cream-50 p-6 md:p-8">
              <h3 className="display display-sm display-ink">
                {t('services.howStart')}
              </h3>
              <p className="mt-2 leading-relaxed text-ink-800">
                {t('services.howStartText')}
              </p>
              <Link
                to="/contact"
                className="mt-5 inline-flex items-center gap-2 rounded-[6px] bg-primary px-6 py-3 text-sm font-bold text-white transition-colors duration-200 hover:bg-burgundy-500"
              >
                {t('services.scheduleMeeting')}
                <Arrow size={16} />
              </Link>
            </div>
          </div>

          <aside>
            <div className="sticky top-28 rounded-[10px] border border-[color:var(--color-rule)] bg-surface p-6">
              <h3 className="display display-sm display-ink text-[1.05rem]">
                {t('services.otherServices')}
              </h3>
              <ul className="mt-4 space-y-1">
                {otherServices.map((s) => (
                  <li key={s.slug}>
                    <Link
                      to={`/services/${s.slug}`}
                      className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-ink-700 transition-colors hover:bg-white hover:text-accent"
                    >
                      <span>{s.title}</span>
                      <Arrow size={14} className="text-blush-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <CallToAction />
    </>
  )
}
