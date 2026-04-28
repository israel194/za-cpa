import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  FileSearch,
  BookOpen,
  Receipt,
  Briefcase,
  Building2,
  HeartHandshake,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react'

type AreaKey =
  | 'audit'
  | 'bookkeeping'
  | 'tax'
  | 'consulting'
  | 'realestate'
  | 'nonprofits'

const areaConfig: Array<{
  key: AreaKey
  to: string
  icon: React.ElementType
  highlight?: boolean
}> = [
  { key: 'audit', to: '/services/audit', icon: FileSearch },
  { key: 'bookkeeping', to: '/services/bookkeeping', icon: BookOpen },
  { key: 'tax', to: '/services/tax', icon: Receipt },
  { key: 'consulting', to: '/services/consulting', icon: Briefcase },
  {
    key: 'realestate',
    to: '/services/realestate',
    icon: Building2,
    highlight: true,
  },
  { key: 'nonprofits', to: '/sectors/nonprofits', icon: HeartHandshake },
]

export default function ActivityAreas() {
  const { t, i18n } = useTranslation()
  const isRtl = i18n.dir() === 'rtl'
  const Arrow = isRtl ? ArrowLeft : ArrowRight

  return (
    <section className="relative bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-block text-sm font-semibold uppercase tracking-[0.2em] text-rose-gold-500">
            {t('activityAreas.eyebrow')}
          </div>
          <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-ink-900 md:text-5xl">
            {t('activityAreas.title')}
          </h2>
          <p className="mt-5 text-lg text-ink-700">
            {t('activityAreas.subtitle')}
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {areaConfig.map(({ key, to, icon: Icon, highlight }) => (
            <Link
              key={to}
              to={to}
              className={`group relative overflow-hidden rounded-3xl border p-8 transition-all duration-300
                hover:-translate-y-1 hover:shadow-[0_28px_56px_-28px_rgba(183,110,121,0.45)] ${
                  highlight
                    ? 'border-rose-gold-300/60 bg-gradient-to-br from-blush-50 via-cream-50 to-blush-100'
                    : 'border-blush-100 bg-cream-50/60 hover:border-rose-gold-300 hover:bg-white'
                }`}
            >
              {highlight && (
                <span
                  className={`absolute top-5 inline-flex items-center gap-1 rounded-full bg-rose-gold-500/15 px-3 py-1 text-xs font-bold text-rose-gold-600 ${
                    isRtl ? 'end-5' : 'start-5'
                  }`}
                >
                  {t('activityAreas.premium')}
                </span>
              )}

              <div
                aria-hidden
                className={`absolute -top-12 h-36 w-36 rounded-full bg-blush-100/0 transition-colors duration-300 group-hover:bg-blush-200/50 ${
                  isRtl ? '-end-12' : '-start-12'
                }`}
              />

              <div
                className={`relative mb-6 flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 ${
                  highlight
                    ? 'bg-gradient-to-br from-rose-gold-500 to-blush-400 text-white shadow-[0_12px_24px_-10px_rgba(183,110,121,0.6)]'
                    : 'bg-blush-100 text-rose-gold-500 group-hover:bg-rose-gold-500 group-hover:text-white'
                }`}
              >
                <Icon size={26} />
              </div>

              <h3 className="relative font-display text-xl font-bold leading-snug text-ink-900">
                {t(`activityAreas.items.${key}.title`)}
              </h3>
              <p className="relative mt-3 text-base leading-relaxed text-ink-700">
                {t(`activityAreas.items.${key}.description`)}
              </p>

              <div className="relative mt-6 inline-flex items-center gap-1 text-sm font-bold text-rose-gold-500">
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
          ))}
        </div>
      </div>
    </section>
  )
}
