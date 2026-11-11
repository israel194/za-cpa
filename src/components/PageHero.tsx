import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type Crumb = { to: string; label: string }

type Props = {
  eyebrow?: string
  title: string
  subtitle?: string
  crumbs?: Crumb[]
}

/**
 * כותרת עמוד בסגנון עיתונאי: הכותרת נפתחת בצד ההתחלה של העמוד, לא במרכזו,
 * והטקסט יושב בעמודה צרה לצד שוליים ריקים. הגרסה הקודמת מירכזה הכול מעל
 * שלושה כתמי צבע מטושטשים, וזה הסימן המובהק של תבנית מוכנה.
 */
export default function PageHero({ eyebrow, title, subtitle, crumbs }: Props) {
  const { t, i18n } = useTranslation()
  const isRtl = i18n.dir() === 'rtl'
  const Chevron = isRtl ? ChevronLeft : ChevronRight

  return (
    <header className="relative overflow-hidden border-b border-[color:var(--color-rule)] bg-cream-50 pt-28 pb-12 md:pt-36 md:pb-16">
      <div aria-hidden className="grain pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        {crumbs && crumbs.length > 0 && (
          <nav className="mb-10 text-[0.8rem] text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link to="/" className="hover:text-accent">
                  {t('breadcrumb.home')}
                </Link>
              </li>
              {crumbs.map((c, i) => (
                <li key={c.to} className="flex items-center gap-2">
                  <Chevron size={13} className="text-gold-400" />
                  {i === crumbs.length - 1 ? (
                    <span className="text-primary">{c.label}</span>
                  ) : (
                    <Link to={c.to} className="hover:text-accent">
                      {c.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="grid gap-x-12 gap-y-6 md:grid-cols-12">
          <div className="md:col-span-7">
            {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
            <h1 className="display display-xl">{title}</h1>
          </div>
          {subtitle && (
            <p className="measure self-end text-lg leading-relaxed text-foreground/75 md:col-span-5 md:text-[1.0625rem]">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </header>
  )
}
