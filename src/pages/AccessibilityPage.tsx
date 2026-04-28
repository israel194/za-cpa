import { useTranslation } from 'react-i18next'
import { Accessibility, Phone, Mail, User, Check, Clock, Calendar } from 'lucide-react'
import PageHero from '../components/PageHero'

export default function AccessibilityPage() {
  const { t } = useTranslation()
  const features = t('a11y.statement.features', {
    returnObjects: true,
  }) as string[]

  // Last-updated date — shown formatted by current locale
  const updatedAt = new Date('2026-04-28').toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <>
      <PageHero
        eyebrow={t('a11y.statement.eyebrow')}
        title={t('a11y.statement.title')}
        subtitle={t('a11y.statement.subtitle')}
        crumbs={[
          { to: '/accessibility', label: t('a11y.statement.eyebrow') },
        ]}
      />

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-6 md:px-10">
          <div className="mb-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1d4ed8] text-white shadow-[0_12px_24px_-12px_rgba(29,78,216,0.5)]">
            <Accessibility size={28} />
          </div>

          {/* Intro */}
          <article className="mb-10">
            <h2 className="font-display text-2xl font-extrabold text-ink-900 md:text-3xl">
              {t('a11y.statement.introTitle')}
            </h2>
            <p className="mt-4 text-lg leading-loose text-ink-700">
              {t('a11y.statement.intro')}
            </p>
          </article>

          {/* Standard */}
          <article className="mb-10 rounded-2xl border border-blush-100 bg-cream-50/60 p-7">
            <h2 className="font-display text-xl font-extrabold text-ink-900 md:text-2xl">
              {t('a11y.statement.standardTitle')}
            </h2>
            <p className="mt-3 leading-relaxed text-ink-700">
              {t('a11y.statement.standardText')}
            </p>
          </article>

          {/* Features */}
          <article className="mb-10">
            <h2 className="font-display text-2xl font-extrabold text-ink-900 md:text-3xl">
              {t('a11y.statement.featuresTitle')}
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 rounded-xl border border-blush-100 bg-white p-4"
                >
                  <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-rose-gold-500 text-white">
                    <Check size={14} />
                  </span>
                  <span className="text-sm leading-relaxed text-ink-800">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </article>

          {/* Limitations */}
          <article className="mb-10 rounded-2xl border border-blush-100 bg-blush-50 p-7">
            <h2 className="font-display text-xl font-extrabold text-ink-900 md:text-2xl">
              {t('a11y.statement.limitationsTitle')}
            </h2>
            <p className="mt-3 leading-relaxed text-ink-700">
              {t('a11y.statement.limitations')}
            </p>
          </article>

          {/* Coordinator contact */}
          <article className="mb-10 rounded-3xl border border-rose-gold-300/40 bg-gradient-to-bl from-rose-gold-500 to-blush-400 p-8 text-white shadow-[0_24px_56px_-28px_rgba(183,110,121,0.6)] md:p-10">
            <h2 className="font-display text-2xl font-extrabold md:text-3xl">
              {t('a11y.statement.coordinatorTitle')}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-white/90 md:text-lg">
              {t('a11y.statement.coordinatorIntro')}
            </p>

            <ul className="mt-6 space-y-3">
              <li className="flex items-center gap-3 rounded-xl bg-white/15 p-4 backdrop-blur-sm">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-white/25">
                  <User size={18} />
                </span>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-white/80">
                    {t('a11y.statement.coordinatorName')}
                  </div>
                  <div className="text-base font-bold">
                    {t('a11y.statement.coordinatorNameValue')}
                  </div>
                </div>
              </li>
              <li>
                <a
                  href={`tel:${t('a11y.statement.coordinatorPhoneValue').replace(/-/g, '')}`}
                  className="flex items-center gap-3 rounded-xl bg-white/15 p-4 backdrop-blur-sm transition-colors hover:bg-white/25"
                >
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-white/25">
                    <Phone size={18} />
                  </span>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-white/80">
                      {t('a11y.statement.coordinatorPhone')}
                    </div>
                    <div className="text-base font-bold" dir="ltr">
                      {t('a11y.statement.coordinatorPhoneValue')}
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${t('a11y.statement.coordinatorEmailValue')}`}
                  className="flex items-center gap-3 rounded-xl bg-white/15 p-4 backdrop-blur-sm transition-colors hover:bg-white/25"
                >
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-white/25">
                    <Mail size={18} />
                  </span>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-white/80">
                      {t('a11y.statement.coordinatorEmail')}
                    </div>
                    <div className="text-base font-bold" dir="ltr">
                      {t('a11y.statement.coordinatorEmailValue')}
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </article>

          {/* Response time + last update */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-blush-100 bg-cream-50/60 p-6">
              <div className="flex items-center gap-2 text-rose-gold-500">
                <Clock size={18} />
                <h3 className="font-display text-base font-bold text-ink-900">
                  {t('a11y.statement.responseTitle')}
                </h3>
              </div>
              <p className="mt-2 leading-relaxed text-ink-700">
                {t('a11y.statement.responseText')}
              </p>
            </div>
            <div className="rounded-2xl border border-blush-100 bg-cream-50/60 p-6">
              <div className="flex items-center gap-2 text-rose-gold-500">
                <Calendar size={18} />
                <h3 className="font-display text-base font-bold text-ink-900">
                  {t('a11y.statement.updatedTitle')}
                </h3>
              </div>
              <p className="mt-2 leading-relaxed text-ink-700">
                {t('a11y.statement.updatedText', { date: updatedAt })}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
