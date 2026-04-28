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
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cream-100 via-cream-50 to-white"
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute -top-32 h-80 w-80 rounded-full bg-blush-200/50 blur-3xl ${
          isRtl ? '-end-24' : '-start-24'
        }`}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute -bottom-24 h-72 w-72 rounded-full bg-rose-gold-300/30 blur-3xl ${
          isRtl ? '-start-24' : '-end-24'
        }`}
      />

      <div className="relative mx-auto max-w-5xl px-6 text-center md:px-10">
        {crumbs && crumbs.length > 0 && (
          <nav className="mb-6 flex justify-center text-sm text-ink-700">
            <ol className="flex items-center gap-2">
              <li>
                <Link to="/" className="hover:text-rose-gold-500">
                  {t('breadcrumb.home')}
                </Link>
              </li>
              {crumbs.map((c, i) => (
                <li key={c.to} className="flex items-center gap-2">
                  <Chevron size={14} className="text-blush-300" />
                  {i === crumbs.length - 1 ? (
                    <span className="text-rose-gold-500">{c.label}</span>
                  ) : (
                    <Link to={c.to} className="hover:text-rose-gold-500">
                      {c.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {eyebrow && (
          <div className="mb-3 inline-block text-sm font-semibold uppercase tracking-[0.2em] text-rose-gold-500">
            {eyebrow}
          </div>
        )}
        <h1 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-ink-900 md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink-700 md:text-xl">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
