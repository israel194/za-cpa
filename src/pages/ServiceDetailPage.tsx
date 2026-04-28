import { Link, Navigate, useParams } from 'react-router-dom'
import {
  FileSearch,
  BookOpen,
  Receipt,
  Briefcase,
  Building2,
  Check,
  ArrowLeft,
  Sparkles,
} from 'lucide-react'
import PageHero from '../components/PageHero'
import CallToAction from '../components/CallToAction'
import { services, type ServiceIcon } from '../data/content'

const iconMap: Record<ServiceIcon, React.ElementType> = {
  audit: FileSearch,
  bookkeeping: BookOpen,
  tax: Receipt,
  consulting: Briefcase,
  realestate: Building2,
}

export default function ServiceDetailPage() {
  const { slug } = useParams()
  const service = services.find((s) => s.slug === slug)

  if (!service) return <Navigate to="/services" replace />

  const Icon = iconMap[service.iconName]
  const otherServices = services.filter((s) => s.slug !== service.slug)

  return (
    <>
      <PageHero
        eyebrow={service.premium ? 'שירות פרימיום' : 'שירות'}
        title={service.title}
        subtitle={service.summary}
        crumbs={[
          { to: '/services', label: 'שירותים' },
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
                    ? 'bg-gradient-to-br from-rose-gold-500 to-blush-400 text-white'
                    : 'bg-blush-100 text-rose-gold-500'
                }`}
              >
                <Icon size={28} />
              </div>
              {service.premium && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-gold-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-rose-gold-600">
                  <Sparkles size={12} />
                  שירות פרימיום
                </span>
              )}
            </div>

            <h2 className="font-display text-2xl font-extrabold text-ink-900 md:text-3xl">
              מה כולל השירות
            </h2>
            <ul className="mt-6 space-y-3">
              {service.bullets.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-blush-100 bg-cream-50/60 p-4 transition-colors hover:border-rose-gold-300/50 hover:bg-white"
                >
                  <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-rose-gold-500 text-white">
                    <Check size={14} />
                  </span>
                  <span className="text-base leading-relaxed text-ink-800 md:text-lg">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-2xl border border-rose-gold-300/40 bg-blush-50 p-6 md:p-8">
              <h3 className="font-display text-lg font-bold text-ink-900">
                איך מתחילים?
              </h3>
              <p className="mt-2 leading-relaxed text-ink-800">
                התחלת העבודה איתנו מתחילה בפגישת היכרות ללא התחייבות, בה נכיר
                את הצרכים שלכם, נציג את גישתנו, ונבנה יחד תוכנית עבודה מותאמת.
              </p>
              <Link
                to="/contact"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-rose-gold-500 px-6 py-3 text-sm font-bold text-white shadow-[0_12px_28px_-10px_rgba(183,110,121,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-rose-gold-600"
              >
                לקביעת פגישה
                <ArrowLeft size={16} />
              </Link>
            </div>
          </div>

          <aside>
            <div className="sticky top-28 rounded-2xl border border-blush-100 bg-cream-50/60 p-6">
              <h3 className="font-display text-base font-bold text-ink-900">
                שירותים נוספים
              </h3>
              <ul className="mt-4 space-y-1">
                {otherServices.map((s) => (
                  <li key={s.slug}>
                    <Link
                      to={`/services/${s.slug}`}
                      className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-ink-700 transition-colors hover:bg-white hover:text-rose-gold-500"
                    >
                      <span>{s.title}</span>
                      <ArrowLeft size={14} className="text-blush-300" />
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
