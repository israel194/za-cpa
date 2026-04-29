import { useTranslation } from 'react-i18next'
import { ShieldCheck, UserCheck, Eye, Award } from 'lucide-react'
import { useWhyUs } from '../data/content'

const icons = [UserCheck, ShieldCheck, Eye, Award]

export default function WhyUs() {
  const { t } = useTranslation()
  const items = useWhyUs()

  return (
    <section className="relative bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-block text-sm font-semibold uppercase tracking-[0.2em] text-rose-gold-500">
            {t('whyUs.eyebrow')}
          </div>
          <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-ink-900 md:text-5xl">
            {t('whyUs.title')}
          </h2>
          <p className="mt-5 text-lg text-ink-700">{t('whyUs.subtitle')}</p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, idx) => {
            const Icon = icons[idx % icons.length]
            return (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-2xl border border-blush-100 bg-cream-50/60 p-7 transition-all
                  duration-300 hover:-translate-y-1 hover:border-rose-gold-300 hover:bg-white
                  hover:shadow-[0_24px_48px_-24px_rgba(189,95,124,0.4)]"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blush-100 text-rose-gold-500 transition-colors group-hover:bg-rose-gold-500 group-hover:text-white">
                  <Icon size={22} />
                </div>
                <h3 className="font-display text-lg font-bold leading-snug text-ink-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-ink-700">
                  {item.text}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
