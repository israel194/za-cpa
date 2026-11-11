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
    <section className="relative border-y border-[color:var(--color-rule)] bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <Reveal>
          <p className="eyebrow mb-5">{t('engagement.eyebrow')}</p>
          <h2 className="display display-lg">{t('engagement.title')}</h2>
          <p className="measure mt-5 text-lg leading-relaxed text-ink-700">
            {t('engagement.subtitle')}
          </p>
        </Reveal>

        {/* שלושה מסלולים כהשוואה על רשת משותפת. קודם לכן זה היה שלושה
            כרטיסי תמחור שבהם האמצעי כהה ומוגבה, התבנית המוכרת ביותר
            באינטרנט, והיא גם רמזה על מדרג מחירים שאינו קיים כאן. */}
        <div className="mt-12 grid gap-x-10 border-t border-[color:var(--color-rule-strong)] lg:grid-cols-3">
          {plans.map(({ key, icon: Icon, ...rest }, idx) => {
            const marked = 'dark' in rest && rest.dark
            const items = t(`engagement.plans.${key}.items`, { returnObjects: true }) as string[]
            return (
              <Reveal
                key={key}
                delay={idx * 80}
                className={`flex flex-col border-b border-[color:var(--color-rule)] lg:border-b-0 ${
                  marked ? 'lg:border-x lg:border-x-[color:var(--color-rule)] lg:px-10' : ''
                }`}
              >
                <article className="flex h-full flex-col pt-6 pb-8">
                  <div className="flex items-baseline gap-3">
                    <Icon size={19} strokeWidth={1.6} className="translate-y-0.5 text-gold-600" aria-hidden />
                    <span className="text-[0.7rem] font-bold tracking-[0.18em] text-gold-600">
                      {t(`engagement.plans.${key}.tag`)}
                    </span>
                  </div>

                  <h3 className="display display-md mt-4">{t(`engagement.plans.${key}.title`)}</h3>
                  <p className="mt-3 leading-relaxed text-ink-700">{t(`engagement.plans.${key}.text`)}</p>

                  <ul className="mt-6 flex-1 space-y-3 border-t border-[color:var(--color-rule)] pt-6">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <Check size={15} strokeWidth={2.5} className="mt-1 shrink-0 text-gold-600" aria-hidden />
                        <span className="text-[0.95rem] leading-relaxed text-ink-800">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/contact"
                    className="group mt-7 inline-flex items-center gap-2 self-start text-sm font-bold text-primary transition-colors hover:text-accent"
                  >
                    <span className="link-rule border-gold-400">{t('engagement.cta')}</span>
                    <Arrow
                      size={15}
                      className={`transition-transform duration-200 ${isRtl ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`}
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
