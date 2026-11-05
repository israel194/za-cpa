import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, ArrowRight, Phone } from 'lucide-react'
import Reveal from './ui/Reveal'

type Props = {
  title?: string
  subtitle?: string
}

export default function CallToAction({ title, subtitle }: Props) {
  const { t, i18n } = useTranslation()
  const isRtl = i18n.dir() === 'rtl'
  const Arrow = isRtl ? ArrowLeft : ArrowRight

  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <Reveal>
          <div
            className={`relative overflow-hidden rounded-[2rem] bg-gradient-to-bl from-rose-gold-500 via-burgundy-500 to-burgundy-700 p-10 text-center shadow-[0_40px_80px_-40px_rgba(82,18,34,0.8)] md:p-16 ${
              isRtl ? 'md:rounded-se-[6rem]' : 'md:rounded-ss-[6rem]'
            }`}
          >
            <div aria-hidden className="bg-plus-light pointer-events-none absolute inset-0" />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-32 start-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-gold-300/20 blur-3xl"
            />

            <div className="relative">
              <div className="mx-auto mb-6 h-px w-16 bg-gradient-to-l from-gold-300/0 via-gold-300 to-gold-300/0" />
              <h2 className="font-display text-3xl font-extrabold leading-tight text-white md:text-5xl">
                {title ?? t('cta.title')}
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg font-light text-white/85 md:text-xl">
                {subtitle ?? t('cta.subtitle')}
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  to="/contact"
                  className="sheen group inline-flex items-center gap-2 rounded-full bg-gradient-to-l from-gold-300 to-gold-200 px-8 py-4 text-base font-bold text-navy-800 shadow-[0_14px_34px_-12px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-0.5"
                >
                  {t('common.bookConsultation')}
                  <Arrow
                    size={18}
                    className={`transition-transform duration-300 ${
                      isRtl ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'
                    }`}
                  />
                </Link>
                <a
                  href="tel:0523975659"
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
                >
                  <Phone size={18} />
                  {t('common.callNow')}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
