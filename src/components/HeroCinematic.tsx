import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  ArrowLeft,
  ArrowRight,
  Phone,
  Sparkles,
  Play,
  HeartHandshake,
} from 'lucide-react'
import Logo from './Logo'

export default function HeroCinematic() {
  const { t, i18n } = useTranslation()
  const isRtl = i18n.dir() === 'rtl'
  const Arrow = isRtl ? ArrowLeft : ArrowRight
  const [videoFailed, setVideoFailed] = useState(false)

  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      {/* Ambient palette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cream-50 via-blush-50 to-cream-50"
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
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-gold-300/50 bg-white/70 px-4 py-1.5 text-sm font-medium text-rose-gold-600 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-gold-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-gold-500" />
            </span>
            {t('hero.badge')}
          </div>

          <h1 className="mt-7 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink-900 md:text-6xl lg:text-[4.25rem]">
            <span className="block">{t('hero.line1')}</span>
            <span className="block bg-gradient-to-l from-rose-gold-600 via-rose-gold-400 to-peach-300 bg-clip-text text-transparent">
              {t('hero.line2')}
            </span>
            <span className="block text-ink-800">{t('hero.line3')}</span>
          </h1>

          <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-ink-700 md:text-xl lg:mx-0">
            {t('hero.subtitle')}
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-rose-gold-500 px-8 py-4 text-base font-bold text-white shadow-[0_18px_40px_-12px_rgba(189,95,124,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-rose-gold-600 hover:shadow-[0_22px_48px_-12px_rgba(189,95,124,0.7)]"
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
              className="inline-flex items-center gap-2 rounded-full border border-blush-200 bg-white/80 px-8 py-4 text-base font-semibold text-ink-800 backdrop-blur-sm transition-all duration-300 hover:border-rose-gold-400 hover:text-rose-gold-600"
            >
              <Phone size={18} />
              {t('hero.secondaryCta')}
            </a>
          </div>

          <div className="mx-auto mt-12 grid max-w-md grid-cols-3 gap-4 border-t border-blush-200/70 pt-8 lg:mx-0 lg:max-w-lg">
            <Stat value="+25" label={t('stats.experience')} />
            <Stat value="+500" label={t('stats.happyClients')} />
            <Stat value="100%" label={t('stats.commitment')} />
          </div>
        </div>

        {/* FLOATING VIDEO CARD */}
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
            className={`group relative aspect-[4/5] overflow-hidden rounded-[2rem] border-[6px] border-white bg-ink-900 shadow-[0_30px_80px_-20px_rgba(189,95,124,0.5)] transition-transform duration-500 hover:rotate-0 ${
              isRtl ? 'rotate-[2deg]' : '-rotate-[2deg]'
            }`}
          >
            {!videoFailed ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="absolute inset-0 h-full w-full object-cover"
                onError={() => setVideoFailed(true)}
                poster="/office-poster.jpg"
              >
                <source src="/office.mp4" type="video/mp4" />
              </video>
            ) : (
              <ElegantPlaceholder />
            )}

            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-900/65 via-ink-900/15 to-transparent"
            />

            <div
              className={`absolute bottom-5 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md ${
                isRtl ? 'end-5' : 'start-5'
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-gold-300 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-gold-400" />
              </span>
              <Play size={11} className="fill-white" />
              {t('hero.liveLabel')}
            </div>
          </div>

          <FloatingCard
            position="top"
            isRtl={isRtl}
            icon={<Sparkles size={18} />}
            title="+25"
            subtitle={t('stats.experience')}
          />
          <FloatingCard
            position="bottom"
            isRtl={isRtl}
            icon={<HeartHandshake size={18} />}
            title="+500"
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
      <div className="font-display text-3xl font-extrabold text-rose-gold-500 md:text-4xl">
        {value}
      </div>
      <div className="mt-1 text-sm font-medium text-ink-700">{label}</div>
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
      className={`absolute z-10 hidden items-center gap-3 rounded-2xl border border-blush-100 bg-white/95 px-4 py-3 shadow-[0_18px_40px_-16px_rgba(189,95,124,0.45)] backdrop-blur-sm md:flex ${positionClass}`}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-burgundy-400 via-rose-gold-500 to-peach-300 text-white">
        {icon}
      </span>
      <div>
        <div className="font-display text-base font-extrabold text-ink-900">
          {title}
        </div>
        <div className="text-[11px] font-medium text-ink-700">{subtitle}</div>
      </div>
    </div>
  )
}

function ElegantPlaceholder() {
  const { t } = useTranslation()
  return (
    <div className="absolute inset-0 bg-gradient-to-bl from-rose-gold-500 via-blush-400 to-peach-300">
      <div
        aria-hidden
        className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.5),transparent_45%),radial-gradient(circle_at_75%_75%,rgba(255,225,238,0.4),transparent_55%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.25)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.25)_1px,transparent_1px)] [background-size:48px_48px]"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-8 text-center text-white">
        <Logo variant="mark" tone="inverse" size={88} />
        <div className="font-display text-2xl font-extrabold leading-none">
          {t('brand.name')}
        </div>
        <div className="text-xs font-semibold uppercase tracking-[0.3em] text-white/85">
          {t('brand.subtitle')}
        </div>
      </div>

      <div className="absolute top-5 end-5 flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 text-white/85 backdrop-blur-sm">
        <Sparkles size={15} />
      </div>
    </div>
  )
}
