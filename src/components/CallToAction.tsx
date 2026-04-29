import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, ArrowRight, Phone } from 'lucide-react'

type Props = {
  title?: string
  subtitle?: string
}

export default function CallToAction({ title, subtitle }: Props) {
  const { t, i18n } = useTranslation()
  const isRtl = i18n.dir() === 'rtl'
  const Arrow = isRtl ? ArrowLeft : ArrowRight

  return (
    <section className="relative overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-bl from-rose-gold-500 via-blush-400 to-peach-300 p-10 text-center shadow-[0_30px_60px_-30px_rgba(189,95,124,0.5)] md:p-16">
          <div
            aria-hidden
            className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.45),transparent_45%),radial-gradient(circle_at_85%_75%,rgba(255,225,238,0.4),transparent_50%)]"
          />
          <div
            aria-hidden
            className={`pointer-events-none absolute -top-24 h-72 w-72 rounded-full bg-white/15 blur-3xl ${
              isRtl ? '-end-24' : '-start-24'
            }`}
          />

          <div className="relative">
            <h2 className="font-display text-3xl font-extrabold leading-tight text-white md:text-5xl">
              {title ?? t('cta.title')}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-white/90 md:text-xl">
              {subtitle ?? t('cta.subtitle')}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-rose-gold-600 shadow-[0_12px_30px_-10px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-10px_rgba(0,0,0,0.3)]"
              >
                {t('common.bookConsultation')}
                <Arrow
                  size={18}
                  className={`transition-transform duration-300 ${
                    isRtl
                      ? 'group-hover:-translate-x-1'
                      : 'group-hover:translate-x-1'
                  }`}
                />
              </Link>
              <a
                href="tel:0523975659"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/60 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
              >
                <Phone size={18} />
                {t('common.callNow')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
