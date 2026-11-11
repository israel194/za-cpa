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
          <p className="eyebrow mb-5">{t('whyUs.eyebrow')}</p>
          <h2 className="display display-lg">{t('whyUs.title')}</h2>
          <p className="measure mt-6 text-lg leading-relaxed text-ink-700">{t('whyUs.subtitle')}</p>

          <div className="relative mt-10 overflow-hidden rounded-[14px] bg-burgundy-600 p-7 text-white">
            <div aria-hidden className="bg-plus-light pointer-events-none absolute inset-0" />
            <div className="relative flex items-center gap-5">
              <img
                src="/orit/orit.jpeg"
                alt=""
                loading="lazy"
                width="64"
                height="64"
                className="h-16 w-16 shrink-0 rounded-full border-2 border-gold-300 object-cover object-[center_18%]"
              />
              <div>
                <div className="font-display text-lg font-bold">{t('hero.portraitName')}</div>
                <div className="text-sm text-gold-200">{t('hero.portraitRole')}</div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* רשימה מסורגלת ולא רשת כרטיסים: המספר תלוי בשוליים, קו שיער מפריד
            בין הפריטים, ואין מסגרת סביב כל פסקה. */}
        <ol className="lg:pt-2">
          {items.map((item, idx) => {
            const Icon = icons[idx % icons.length]
            return (
              <Reveal as="li" key={item.title} delay={idx * 70}>
                <div className="group grid grid-cols-[auto_1fr] items-start gap-x-5 gap-y-2 border-t border-[color:var(--color-rule)] py-7 first:border-t-0 first:pt-0 sm:gap-x-7">
                  <span className="marginal pt-1.5 tabular-nums">{String(idx + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="display display-sm flex items-center gap-3">
                      <Icon size={19} strokeWidth={1.6} className="text-gold-600" aria-hidden />
                      {item.title}
                    </h3>
                    <p className="measure mt-2.5 leading-relaxed text-ink-700">{item.text}</p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
