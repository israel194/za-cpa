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
  /** כבוי כשהעמוד כבר נושא את אותה כותרת בראשו */
  heading?: boolean
}

export default function Sectors({ variant = 'preview', heading = true }: Props) {
  const { t, i18n } = useTranslation()
  const sectors = useSectors()
  const isRtl = i18n.dir() === 'rtl'
  const Arrow = isRtl ? ArrowLeft : ArrowRight

  return (
    <section className={`relative ${variant === 'preview' ? 'bg-background' : 'bg-cream-50'} py-20 md:py-28`}>
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        {heading && (
          <>
          <p className="eyebrow mb-5">{t('sectors.eyebrow')}</p>
          <h2 className="display display-lg">{t('sectors.title')}</h2>
          <p className="measure mt-5 text-lg text-ink-700">{t('sectors.subtitle')}</p>
          </>
        )}

        {/* ארבעה מגזרים כעמודות על רשת אחת. הסמל קטן ובצבע אחד, ולא עיגול
            מלא בהדרגתיות: ארבעה עיגולים צבעוניים בשורה הם קישוט, לא מידע. */}
        <div className={`${heading ? 'mt-12' : ''} grid gap-x-10 border-t border-[color:var(--color-rule-strong)] sm:grid-cols-2 lg:grid-cols-4`}>
          {sectors.map((sector) => {
            const Icon = iconMap[sector.iconName]
            return (
              <Link
                key={sector.slug}
                to={`/sectors/${sector.slug}`}
                className="group flex flex-col border-b border-[color:var(--color-rule)] pt-6 pb-7 lg:border-b-0"
              >
                <Icon size={20} strokeWidth={1.6} className="text-gold-600" aria-hidden />
                <h3 className="display display-sm mt-4 transition-colors duration-200 group-hover:text-accent">
                  {sector.title}
                </h3>
                <p className="mt-2.5 flex-1 text-[0.95rem] leading-relaxed text-ink-700">
                  {sector.summary}
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
      </div>
    </section>
  )
}
