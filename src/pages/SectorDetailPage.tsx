import { Link, Navigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Building2,
  HeartHandshake,
  Briefcase,
  UserRound,
  Check,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react'
import PageHero from '../components/PageHero'
import CallToAction from '../components/CallToAction'
import { useSectors, type SectorIcon } from '../data/content'

const iconMap: Record<SectorIcon, React.ElementType> = {
  companies: Building2,
  nonprofits: HeartHandshake,
  'self-employed': Briefcase,
  employees: UserRound,
}

export default function SectorDetailPage() {
  const { slug } = useParams()
  const { t, i18n } = useTranslation()
  const sectors = useSectors()
  const isRtl = i18n.dir() === 'rtl'
  const Arrow = isRtl ? ArrowLeft : ArrowRight

  const sector = sectors.find((s) => s.slug === slug)
  if (!sector) return <Navigate to="/sectors" replace />

  const Icon = iconMap[sector.iconName]
  const otherSectors = sectors.filter((s) => s.slug !== sector.slug)

  return (
    <>
      <PageHero
        eyebrow={t('sectors.kindOf')}
        title={sector.title}
        subtitle={sector.summary}
        crumbs={[
          { to: '/sectors', label: t('nav.sectors') },
          { to: `/sectors/${sector.slug}`, label: sector.shortTitle },
        ]}
      />

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:px-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-gold-500 to-blush-400 text-white shadow-[0_12px_24px_-12px_rgba(189,95,124,0.5)]">
              <Icon size={28} />
            </div>

            <h2 className="font-display text-2xl font-extrabold text-ink-900 md:text-3xl">
              {t('sectors.howWeHelp', { name: sector.title })}
            </h2>
            <ul className="mt-6 space-y-3">
              {sector.bullets.map((item) => (
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
                {t('sectors.notSure')}
              </h3>
              <p className="mt-2 leading-relaxed text-ink-800">
                {t('sectors.notSureText')}
              </p>
              <Link
                to="/contact"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-rose-gold-500 px-6 py-3 text-sm font-bold text-white shadow-[0_12px_28px_-10px_rgba(189,95,124,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-rose-gold-600"
              >
                {t('sectors.letsTalk')}
                <Arrow size={16} />
              </Link>
            </div>
          </div>

          <aside>
            <div className="sticky top-28 rounded-2xl border border-blush-100 bg-cream-50/60 p-6">
              <h3 className="font-display text-base font-bold text-ink-900">
                {t('sectors.otherSectors')}
              </h3>
              <ul className="mt-4 space-y-1">
                {otherSectors.map((s) => (
                  <li key={s.slug}>
                    <Link
                      to={`/sectors/${s.slug}`}
                      className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-ink-700 transition-colors hover:bg-white hover:text-rose-gold-500"
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
