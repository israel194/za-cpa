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

export default function PageHero({ eyebrow, title, subtitle, crumbs }: Props) {
  const { t, i18n } = useTranslation()
  const isRtl = i18n.dir() === 'rtl'
  const Chevron = isRtl ? ChevronLeft : ChevronRight

  return (
    <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-peach-100 via-background to-white"
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute -top-32 h-80 w-80 rounded-full bg-peach-200/55 blur-3xl ${
          isRtl ? '-end-24' : '-start-24'
        }`}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute -bottom-24 h-72 w-72 rounded-full bg-pink-200/40 blur-3xl ${
          isRtl ? '-start-24' : '-end-24'
        }`}
      />

      <div className="relative mx-auto max-w-5xl px-6 text-center md:px-10">
        {crumbs && crumbs.length > 0 && (
          <nav className="mb-6 flex justify-center text-sm text-muted-foreground">
            <ol className="flex items-center gap-2">
              <li>
                <Link to="/" className="hover:text-accent">
                  {t('breadcrumb.home')}
                </Link>
              </li>
              {crumbs.map((c, i) => (
                <li key={c.to} className="flex items-center gap-2">
                  <Chevron size={14} className="text-accent/60" />
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

        {eyebrow && (
          <div className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            {eyebrow}
          </div>
        )}
        <h1 className="font-display text-3xl font-semibold leading-tight tracking-tight text-primary md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-foreground/80 md:text-xl">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
