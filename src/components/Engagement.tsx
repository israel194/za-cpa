import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Check, ArrowLeft, ArrowRight, CalendarClock, ShieldCheck, Layers } from 'lucide-react'
import Reveal from './ui/Reveal'

const plans = [
  { key: 'ongoing', icon: CalendarClock },
  { key: 'audit', icon: ShieldCheck, dark: true },
  { key: 'extras', icon: Layers },
] as const

export default function Engagement() {
  const { t, i18n } = useTranslation()
  const isRtl = i18n.dir() === 'rtl'
  const Arrow = isRtl ? ArrowLeft : ArrowRight

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blush-50 to-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="mb-4 text-sm font-bold tracking-[0.2em] text-accent">
            {t('engagement.eyebrow')}
          </div>
          <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-primary md:text-5xl">
            {t('engagement.title')}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-700">
            {t('engagement.subtitle')}
          </p>
        </Reveal>

        <div className="mt-16 grid items-stretch gap-6 lg:grid-cols-3">
          {plans.map(({ key, icon: Icon, ...rest }, idx) => {
            const dark = 'dark' in rest && rest.dark
            const items = t(`engagement.plans.${key}.items`, { returnObjects: true }) as string[]
            return (
              <Reveal key={key} delay={idx * 110} className={dark ? 'lg:-my-4' : ''}>
                <article
                  className={`relative flex h-full flex-col overflow-hidden rounded-3xl p-8 md:p-10 ${
                    dark
                      ? 'bg-gradient-to-br from-navy-800 via-burgundy-700 to-burgundy-600 text-white shadow-[0_40px_80px_-35px_rgba(58,15,28,0.8)]'
                      : 'border border-border bg-white shadow-[0_24px_60px_-40px_rgba(110,26,45,0.35)]'
                  }`}
                >
                  {dark && <div aria-hidden className="bg-plus-light pointer-events-none absolute inset-0" />}

                  <div className="relative flex items-center justify-between">
                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-full ${
                        dark ? 'bg-white/10 text-gold-200' : 'bg-blush-100 text-primary'
                      }`}
                    >
                      <Icon size={22} strokeWidth={1.75} />
                    </span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        dark ? 'bg-gold-300/15 text-gold-200' : 'bg-gold-100 text-gold-700'
                      }`}
                    >
                      {t(`engagement.plans.${key}.tag`)}
                    </span>
                  </div>

                  <h3 className={`relative mt-7 font-display text-2xl font-extrabold ${dark ? 'text-white' : 'text-primary'}`}>
                    {t(`engagement.plans.${key}.title`)}
                  </h3>
                  <p className={`relative mt-3 leading-relaxed ${dark ? 'text-white/75' : 'text-ink-700'}`}>
                    {t(`engagement.plans.${key}.text`)}
                  </p>

                  <div className={`relative my-7 h-px ${dark ? 'bg-white/15' : 'bg-border'}`} />

                  <ul className="relative flex-1 space-y-4">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span
                          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                            dark ? 'bg-gold-300 text-navy-800' : 'bg-primary text-white'
                          }`}
                        >
                          <Check size={12} strokeWidth={3} />
                        </span>
                        <span className={`text-[15px] leading-relaxed ${dark ? 'text-white/90' : 'text-ink-800'}`}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/contact"
                    className={`sheen group relative mt-9 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 ${
                      dark
                        ? 'bg-gradient-to-l from-gold-300 to-gold-200 text-navy-800'
                        : 'border border-primary/20 text-primary hover:border-primary hover:bg-primary hover:text-white'
                    }`}
                  >
                    {t('engagement.cta')}
                    <Arrow
                      size={16}
                      className={`transition-transform duration-300 ${isRtl ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`}
                    />
                  </Link>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
