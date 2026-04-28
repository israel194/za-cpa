import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, ArrowRight, Phone } from 'lucide-react'
import Logo from './Logo'

export default function HeroCinematic() {
  const { t, i18n } = useTranslation()
  const isRtl = i18n.dir() === 'rtl'
  const Arrow = isRtl ? ArrowLeft : ArrowRight

  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <div aria-hidden className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900 via-ink-800 to-ink-900" />
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
        <div className="hero-stars" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-rose-gold-500/20 via-blush-300/10 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(20,16,27,0.55)_100%)]" />
      </div>

      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/hero-poster.jpg"
        className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-1000 [&:not([data-loaded='false'])]:opacity-70"
        onLoadedData={(e) => {
          e.currentTarget.setAttribute('data-loaded', 'true')
        }}
        onError={(e) => {
          e.currentTarget.setAttribute('data-loaded', 'false')
        }}
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-ink-900/30 via-ink-900/20 to-ink-900/60"
      />

      <div className="relative z-10 flex min-h-[100svh] items-center">
        <div className="mx-auto w-full max-w-7xl px-6 pt-32 pb-20 md:px-10 md:pt-40 md:pb-28">
          <div className="max-w-3xl text-center md:text-start">
            <div className="mb-6 flex md:justify-start justify-center">
              <Logo variant="mark" tone="inverse" size={84} />
            </div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-rose-gold-300/40 bg-white/10 px-4 py-1.5 text-sm font-medium text-cream-100 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-gold-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-gold-400" />
              </span>
              {t('hero.badge')}
            </div>

            <h1 className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl">
              <span className="block">{t('hero.line1')}</span>
              <span className="block bg-gradient-to-l from-rose-gold-300 via-blush-300 to-rose-gold-200 bg-clip-text text-transparent">
                {t('hero.line2')}
              </span>
              <span className="block text-cream-100">{t('hero.line3')}</span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-relaxed text-cream-100/90 md:text-xl">
              {t('hero.subtitle')}
            </p>

            <div className="mt-10 flex flex-col items-center justify-start gap-4 sm:flex-row md:items-start">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-rose-gold-500 px-8 py-4 text-base font-bold text-white shadow-[0_18px_40px_-12px_rgba(183,110,121,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-rose-gold-600"
              >
                {t('hero.primaryCta')}
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
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20"
              >
                <Phone size={18} />
                {t('hero.secondaryCta')}
              </a>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-8 flex justify-center">
            <div className="h-10 w-6 rounded-full border-2 border-white/30 p-1">
              <div className="h-2 w-full animate-[scroll-dot_2s_ease-in-out_infinite] rounded-full bg-white/70" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
