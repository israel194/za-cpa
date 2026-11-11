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
    <section className="relative border-y border-[color:var(--color-rule)] bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <Reveal className="grid items-end gap-6 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="eyebrow mb-5">{t('activityAreas.eyebrow')}</p>
            <h2 className="display display-lg">{t('activityAreas.title')}</h2>
            <p className="measure mt-5 text-lg leading-relaxed text-ink-700">
              {t('activityAreas.subtitle')}
            </p>
          </div>
          <Link
            to="/services"
            className="group link-rule inline-flex items-center gap-2 self-end border-gold-400 pb-1 text-sm font-bold text-primary transition-colors hover:text-accent"
          >
            {t('common.viewAll')}
            <Arrow size={15} className={`transition-transform duration-200 ${isRtl ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
          </Link>
        </Reveal>

        {/* מפתח תחומים, לא רשת כרטיסים. כל תחום הוא שורה עם מספר תלוי
            בשוליים וקו שיער מעליה, כמו תוכן עניינים של דוח מודפס. */}
        <ol className="mt-12 grid gap-x-16 md:grid-cols-2">
          {areaConfig.map(({ key, to, icon: Icon, highlight }, idx) => (
            <Reveal as="li" key={to} delay={(idx % 2) * 70}>
              <Link
                to={to}
                className="group grid h-full grid-cols-[auto_1fr_auto] items-start gap-x-5 border-t border-[color:var(--color-rule)] py-7 transition-colors duration-200 hover:border-gold-400"
              >
                <span className="marginal pt-[0.3rem] tabular-nums">{String(idx + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="display display-sm flex flex-wrap items-center gap-x-3 gap-y-1 transition-colors duration-200 group-hover:text-accent">
                    <Icon size={18} strokeWidth={1.6} className="text-gold-600" aria-hidden />
                    {t(`activityAreas.items.${key}.title`)}
                    {highlight && (
                      <span className="text-[0.68rem] font-bold tracking-[0.16em] text-gold-600">
                        {t('activityAreas.premium')}
                      </span>
                    )}
                  </h3>
                  <p className="measure mt-2.5 leading-relaxed text-ink-700">
                    {t(`activityAreas.items.${key}.description`)}
                  </p>
                </div>
                <Arrow
                  size={16}
                  aria-hidden
                  className={`mt-[0.45rem] text-gold-400 opacity-0 transition-all duration-200 group-hover:opacity-100 ${
                    isRtl ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'
                  }`}
                />
              </Link>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
