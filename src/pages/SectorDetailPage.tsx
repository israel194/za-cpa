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
import { useSeo } from '../lib/seo'

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
  // לפני ההחזרה המוקדמת, כדי שההוק ירוץ בכל רינדור
  useSeo('sectors', sector ? { title: sector.title, description: sector.summary } : undefined)
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
            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-[8px] border border-[color:var(--color-rule)] bg-cream-50 text-gold-600">
              <Icon size={28} />
            </div>

            <h2 className="display display-md display-ink">
              {t('sectors.howWeHelp', { name: sector.title })}
            </h2>
            <ul className="mt-6 space-y-3">
              {sector.bullets.map((item) => (
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
                {t('sectors.notSure')}
              </h3>
              <p className="mt-2 leading-relaxed text-ink-800">
                {t('sectors.notSureText')}
              </p>
              <Link
                to="/contact"
                className="mt-5 inline-flex items-center gap-2 rounded-[6px] bg-primary px-6 py-3 text-sm font-bold text-white transition-colors duration-200 hover:bg-burgundy-500"
              >
                {t('sectors.letsTalk')}
                <Arrow size={16} />
              </Link>
            </div>
          </div>

          <aside>
            <div className="sticky top-28 rounded-[10px] border border-[color:var(--color-rule)] bg-surface p-6">
              <h3 className="display display-sm display-ink text-[1.05rem]">
                {t('sectors.otherSectors')}
              </h3>
              <ul className="mt-4 space-y-1">
                {otherSectors.map((s) => (
                  <li key={s.slug}>
                    <Link
                      to={`/sectors/${s.slug}`}
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
