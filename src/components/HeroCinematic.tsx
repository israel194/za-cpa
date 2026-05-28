import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  ArrowLeft,
  ArrowRight,
  Phone,
  Sparkles,
  HeartHandshake,
} from 'lucide-react'

export default function HeroCinematic() {
  const { t, i18n } = useTranslation()
  const isRtl = i18n.dir() === 'rtl'
  const Arrow = isRtl ? ArrowLeft : ArrowRight

  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      {/* Ambient palette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-blush-50 to-background"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -end-24 h-[26rem] w-[26rem] rounded-full bg-peach-200/55 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -start-32 h-[28rem] w-[28rem] rounded-full bg-pink-200/45 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 start-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-rose-gold-300/30 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 md:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] lg:gap-20">
        {/* TEXT */}
        <div className="text-center lg:text-start">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-accent backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/60 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {t('hero.badge')}
          </div>

          <h1 className="mt-7 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-primary md:text-6xl lg:text-[4.25rem]">
            <span className="block">{t('hero.line1')}</span>
            <span className="block bg-gradient-to-l from-primary via-burgundy-600 to-accent bg-clip-text text-transparent">
              {t('hero.line2')}
            </span>
            <span className="block text-foreground">{t('hero.line3')}</span>
          </h1>

          <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-foreground/80 md:text-xl lg:mx-0">
            {t('hero.subtitle')}
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-white shadow-[0_18px_40px_-12px_rgba(131,24,67,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-[0_22px_48px_-12px_rgba(161,98,7,0.55)]"
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
              className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-white/80 px-8 py-4 text-base font-semibold text-primary backdrop-blur-sm transition-all duration-300 hover:border-accent hover:text-accent"
            >
              <Phone size={18} />
              {t('hero.secondaryCta')}
            </a>
          </div>

          <div className="mx-auto mt-12 grid max-w-md grid-cols-3 gap-4 border-t border-border pt-8 lg:mx-0 lg:max-w-lg">
            <Stat value="+12" label={t('stats.experience')} />
            <Stat value="+250" label={t('stats.happyClients')} />
            <Stat value="100%" label={t('stats.commitment')} />
          </div>
        </div>

        {/* FLOATING PORTRAIT CARD */}
        <div className="relative mx-auto w-full max-w-[480px] lg:mx-0">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-10 -end-10 h-44 w-44 rounded-full bg-peach-300/45 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-10 -start-10 h-44 w-44 rounded-full bg-pink-300/35 blur-3xl"
          />

          <div
            className={`group relative aspect-[4/5] overflow-hidden rounded-[2rem] border-[6px] border-white bg-ink-900 shadow-[0_30px_80px_-20px_rgba(131,24,67,0.55)] transition-transform duration-500 hover:rotate-0 ${
              isRtl ? 'rotate-[2deg]' : '-rotate-[2deg]'
            }`}
          >
            <img
              src="/orit/orit.jpeg"
              alt={t('hero.portraitAlt')}
              width="480"
              height="600"
              decoding="async"
              fetchPriority="high"
              className="absolute inset-0 h-full w-full object-cover object-[center_20%]"
            />

            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink-900/80 via-ink-900/25 to-transparent"
            />

            <div
              className={`absolute bottom-5 max-w-[calc(100%-2.5rem)] rounded-2xl border border-white/25 bg-white/15 px-4 py-3 text-white backdrop-blur-md ${
                isRtl ? 'end-5' : 'start-5'
              }`}
            >
              <div className="font-display text-base font-semibold leading-tight">
                {t('hero.portraitName')}
              </div>
              <div className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.16em] text-white/80">
                {t('hero.portraitRole')}
              </div>
            </div>
          </div>

          <FloatingCard
            position="top"
            isRtl={isRtl}
            icon={<Sparkles size={18} />}
            title="+12"
            subtitle={t('stats.experience')}
          />
          <FloatingCard
            position="bottom"
            isRtl={isRtl}
            icon={<HeartHandshake size={18} />}
            title="+250"
            subtitle={t('stats.happyClients')}
          />
        </div>
      </div>
    </section>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center lg:text-start">
      <div className="font-display text-3xl font-semibold text-primary md:text-4xl">
        {value}
      </div>
      <div className="mt-1 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
        {label}
      </div>
    </div>
  )
}

function FloatingCard({
  isRtl,
  position,
  icon,
  title,
  subtitle,
}: {
  isRtl: boolean
  position: 'top' | 'bottom'
  icon: ReactNode
  title: string
  subtitle: string
}) {
  const positionClass =
    position === 'top'
      ? `-top-6 ${isRtl ? '-start-4' : '-end-4'}`
      : `-bottom-5 ${isRtl ? '-end-4' : '-start-4'}`
  return (
    <div
      className={`absolute z-10 hidden items-center gap-3 rounded-2xl border border-border bg-white/95 px-4 py-3 shadow-[0_18px_40px_-16px_rgba(131,24,67,0.35)] backdrop-blur-sm md:flex ${positionClass}`}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-burgundy-600 to-accent text-white">
        {icon}
      </span>
      <div>
        <div className="font-display text-base font-semibold text-primary">
          {title}
        </div>
        <div className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
          {subtitle}
        </div>
      </div>
    </div>
  )
}

