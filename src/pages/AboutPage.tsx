import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ShieldCheck, Eye, Award, ArrowLeft, ArrowRight } from 'lucide-react'
import PageHero from '../components/PageHero'
import WhyUs from '../components/WhyUs'
import CallToAction from '../components/CallToAction'

const valueIcons = {
  reliability: ShieldCheck,
  transparency: Eye,
  excellence: Award,
}

export default function AboutPage() {
  const { t, i18n } = useTranslation()
  const isRtl = i18n.dir() === 'rtl'
  const Arrow = isRtl ? ArrowLeft : ArrowRight

  return (
    <>
      <PageHero
        eyebrow={t('about.eyebrow')}
        title={t('about.title')}
        subtitle={t('about.subtitle')}
        crumbs={[{ to: '/about', label: t('nav.about') }]}
      />

      <section className="relative bg-white py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-6 md:px-10">
          <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-ink-900 md:text-4xl">
            {t('about.storyTitle')}
          </h2>
          <div className="mt-7 space-y-5 text-lg leading-loose text-ink-700">
            <p>{t('about.p1')}</p>
            <p>{t('about.p2')}</p>
            <p>{t('about.p3')}</p>
          </div>

          <div className="mt-10 flex h-1 w-24 rounded-full bg-gradient-to-l from-rose-gold-500 to-blush-300" />

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/team"
              className="inline-flex items-center gap-2 rounded-full bg-rose-gold-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(197,74,120,0.6)] transition-all hover:-translate-y-0.5 hover:bg-rose-gold-600"
            >
              {t('about.meetTeam')}
              <Arrow size={16} />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-full border border-blush-200 bg-white px-6 py-3 text-sm font-semibold text-ink-800 transition-all hover:border-rose-gold-400 hover:text-rose-gold-600"
            >
              {t('about.ourServices')}
            </Link>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {(Object.keys(valueIcons) as Array<keyof typeof valueIcons>).map(
              (key) => {
                const Icon = valueIcons[key]
                return (
                  <div
                    key={key}
                    className="rounded-2xl border border-blush-100 bg-cream-50/60 p-7 transition-all duration-300 hover:border-rose-gold-300/60 hover:bg-white hover:shadow-[0_18px_40px_-20px_rgba(197,74,120,0.35)]"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blush-100 text-rose-gold-500">
                      <Icon size={22} />
                    </div>
                    <h3 className="font-display text-lg font-bold text-ink-900">
                      {t(`values.${key}.title`)}
                    </h3>
                    <p className="mt-2 leading-relaxed text-ink-700">
                      {t(`values.${key}.text`)}
                    </p>
                  </div>
                )
              }
            )}
          </div>
        </div>
      </section>

      <WhyUs />
      <CallToAction />
    </>
  )
}
