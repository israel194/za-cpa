import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Building2,
  HeartHandshake,
  Briefcase,
  UserRound,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react'
import { useSectors, type SectorIcon } from '../data/content'

const iconMap: Record<SectorIcon, React.ElementType> = {
  companies: Building2,
  nonprofits: HeartHandshake,
  'self-employed': Briefcase,
  employees: UserRound,
}

type Props = {
  variant?: 'preview' | 'full'
}

export default function Sectors({ variant = 'preview' }: Props) {
  const { t, i18n } = useTranslation()
  const sectors = useSectors()
  const isRtl = i18n.dir() === 'rtl'
  const Arrow = isRtl ? ArrowLeft : ArrowRight

  return (
    <section
      className={`relative ${variant === 'preview' ? 'bg-cream-50' : 'bg-white'} py-20 md:py-28`}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-block text-sm font-semibold uppercase tracking-[0.2em] text-rose-gold-500">
            {t('sectors.eyebrow')}
          </div>
          <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-ink-900 md:text-5xl">
            {t('sectors.title')}
          </h2>
          <p className="mt-5 text-lg text-ink-700">{t('sectors.subtitle')}</p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sectors.map((sector) => {
            const Icon = iconMap[sector.iconName]
            return (
              <Link
                key={sector.slug}
                to={`/sectors/${sector.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-blush-100 bg-white p-8 transition-all
                  duration-300 hover:-translate-y-1 hover:border-rose-gold-300
                  hover:shadow-[0_24px_48px_-24px_rgba(189,95,124,0.4)]"
              >
                <div
                  aria-hidden
                  className={`absolute -top-12 h-32 w-32 rounded-full bg-blush-100/0 transition-colors duration-300 group-hover:bg-blush-100/70 ${
                    isRtl ? '-end-12' : '-start-12'
                  }`}
                />
                <div className="relative mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-gold-500 to-blush-400 text-white shadow-[0_12px_24px_-12px_rgba(189,95,124,0.5)]">
                  <Icon size={26} />
                </div>
                <h3 className="relative font-display text-xl font-bold leading-snug text-ink-900">
                  {sector.title}
                </h3>
                <p className="relative mt-3 text-sm leading-relaxed text-ink-700">
                  {sector.summary}
                </p>
                <div className="relative mt-5 inline-flex items-center gap-1 text-sm font-semibold text-rose-gold-500">
                  {t('common.readMore')}
                  <Arrow
                    size={14}
                    className={`transition-transform duration-300 ${
                      isRtl
                        ? 'group-hover:-translate-x-1'
                        : 'group-hover:translate-x-1'
                    }`}
                  />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
