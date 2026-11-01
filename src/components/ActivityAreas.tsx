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
import Reveal from './ui/Reveal'

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
    <section className="bg-plus relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal className="grid items-end gap-6 lg:grid-cols-[1fr_auto]">
          <div className="max-w-3xl">
            <div className="mb-4 text-sm font-bold tracking-[0.2em] text-accent">
              {t('activityAreas.eyebrow')}
            </div>
            <h2 className="heading-bar font-display text-3xl font-extrabold leading-tight tracking-tight text-primary md:text-5xl">
              {t('activityAreas.title')}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-700">
              {t('activityAreas.subtitle')}
            </p>
          </div>
          <Link
            to="/services"
            className="group inline-flex items-center gap-2 self-end text-sm font-bold text-primary transition-colors hover:text-accent"
          >
            {t('common.viewAll')}
            <Arrow size={16} className={`transition-transform duration-300 ${isRtl ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
          </Link>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {areaConfig.map(({ key, to, icon: Icon, highlight }, idx) => {
            const gold = idx % 2 === 1
            return (
              <Reveal key={to} delay={(idx % 3) * 90}>
                <Link
                  to={to}
                  className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white p-8 pt-9 shadow-[0_2px_0_rgba(110,26,45,0.02)] transition-all duration-500
                    hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgba(110,26,45,0.45)] ${
                      highlight ? 'border-gold-300/70' : 'border-border'
                    }`}
                >
                  <span
                    aria-hidden
                    className={`absolute inset-x-0 top-0 h-1 transition-all duration-500 group-hover:h-1.5 ${
                      gold
                        ? 'bg-gradient-to-l from-gold-300 to-gold-500'
                        : 'bg-gradient-to-l from-burgundy-400 to-burgundy-600'
                    }`}
                  />

                  <div className="flex items-start justify-between gap-4">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-full transition-all duration-500 ${
                        gold
                          ? 'bg-gold-100 text-gold-600 group-hover:bg-gold-500 group-hover:text-white'
                          : 'bg-blush-100 text-primary group-hover:bg-primary group-hover:text-white'
                      }`}
                    >
                      <Icon size={24} strokeWidth={1.75} />
                    </div>
                    {highlight ? (
                      <span className="rounded-full bg-gradient-to-l from-gold-200 to-gold-100 px-3 py-1 text-xs font-bold text-gold-700">
                        {t('activityAreas.premium')}
                      </span>
                    ) : (
                      <span aria-hidden="true" className="font-display text-3xl font-extrabold text-blush-500 transition-colors duration-500 group-hover:text-rose-gold-600">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-7 font-display text-xl font-bold leading-snug text-primary">
                    {t(`activityAreas.items.${key}.title`)}
                  </h3>
                  <p className="mt-3 flex-1 text-base leading-relaxed text-ink-700">
                    {t(`activityAreas.items.${key}.description`)}
                  </p>

                  <div className="mt-7 inline-flex items-center gap-1.5 border-t border-border pt-5 text-sm font-bold text-accent">
                    {t('common.readMore')}
                    <Arrow
                      size={14}
                      className={`transition-transform duration-300 ${
                        isRtl ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'
                      }`}
                    />
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
