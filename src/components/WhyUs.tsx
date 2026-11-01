import { useTranslation } from 'react-i18next'
import { ShieldCheck, UserCheck, Eye, Award } from 'lucide-react'
import { useWhyUs } from '../data/content'
import Reveal from './ui/Reveal'

const icons = [UserCheck, ShieldCheck, Eye, Award]

export default function WhyUs() {
  const { t } = useTranslation()
  const items = useWhyUs()

  return (
    <section className="relative bg-white py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 md:px-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <div className="mb-4 text-sm font-bold tracking-[0.2em] text-accent">
            {t('whyUs.eyebrow')}
          </div>
          <h2 className="heading-bar font-display text-3xl font-extrabold leading-tight tracking-tight text-primary md:text-5xl">
            {t('whyUs.title')}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink-700">{t('whyUs.subtitle')}</p>

          <div className="relative mt-10 overflow-hidden rounded-3xl bg-gradient-to-br from-burgundy-600 to-burgundy-500 p-8 text-white">
            <div aria-hidden className="bg-plus-light pointer-events-none absolute inset-0" />
            <div className="relative flex items-center gap-5">
              <img
                src="/orit/orit.jpeg"
                alt=""
                loading="lazy"
                className="h-16 w-16 shrink-0 rounded-full border-2 border-gold-300 object-cover object-[center_18%]"
              />
              <div>
                <div className="font-display text-lg font-bold">{t('hero.portraitName')}</div>
                <div className="text-sm text-gold-200">{t('hero.portraitRole')}</div>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2">
          {items.map((item, idx) => {
            const Icon = icons[idx % icons.length]
            return (
              <Reveal key={item.title} delay={idx * 90} className={idx % 2 === 1 ? 'sm:translate-y-10' : ''}>
                <div className="group h-full rounded-3xl border border-border bg-background p-8 transition-all duration-500 hover:-translate-y-1 hover:border-gold-300 hover:bg-white hover:shadow-[0_30px_60px_-34px_rgba(110,26,45,0.45)]">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-primary shadow-[0_8px_20px_-10px_rgba(110,26,45,0.4)] transition-colors duration-500 group-hover:bg-primary group-hover:text-gold-200">
                      <Icon size={22} strokeWidth={1.75} />
                    </div>
                    <span aria-hidden="true" className="font-display text-sm font-bold tracking-widest text-gold-600">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-xl font-bold leading-snug text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-ink-700">{item.text}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
