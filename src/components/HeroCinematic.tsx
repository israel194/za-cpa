import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, ArrowRight, Phone, MapPin, Mail, Award } from 'lucide-react'

export default function HeroCinematic() {
  const { t, i18n } = useTranslation()
  const isRtl = i18n.dir() === 'rtl'
  const Arrow = isRtl ? ArrowLeft : ArrowRight

  return (
    <section className="relative px-3 pt-24 md:px-6 md:pt-28">
      <div
        className={`relative mx-auto max-w-[88rem] overflow-hidden rounded-[2rem] bg-gradient-to-br from-navy-800 via-burgundy-700 to-burgundy-600 text-white shadow-[0_40px_90px_-40px_rgba(58,15,28,0.75)] md:rounded-[2.75rem] ${
          isRtl ? 'md:rounded-es-[7rem]' : 'md:rounded-ee-[7rem]'
        }`}
      >
        {/* Texture + ambient light */}
        <div aria-hidden className="bg-plus-light pointer-events-none absolute inset-0" />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -end-40 h-[34rem] w-[34rem] rounded-full bg-rose-gold-400/25 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-48 -start-24 h-[30rem] w-[30rem] rounded-full bg-gold-400/20 blur-3xl"
        />

        <div className="relative grid items-center gap-14 px-6 pb-10 pt-14 md:px-14 md:pt-20 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16 lg:px-20 lg:pb-14">
          {/* TEXT */}
          <div className="text-center lg:text-start">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-gold-300/40 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-[0.14em] text-gold-200 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-300" />
              {t('hero.badge')}
            </div>

            <h1 className="mt-8 font-display text-[2.6rem] font-extrabold leading-[1.08] tracking-tight sm:text-6xl lg:text-[4.4rem]">
              <span className="block text-white">{t('hero.line1')}</span>
              <span className="text-gold-gradient block pb-1">{t('hero.line2')}</span>
              <span className="block text-white/90">{t('hero.line3')}</span>
            </h1>

            <p className="mx-auto mt-7 max-w-xl text-lg font-light leading-relaxed text-white/75 md:text-xl lg:mx-0">
              {t('hero.subtitle')}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <Link
                to="/contact"
                className="sheen group inline-flex items-center gap-2 rounded-full bg-gradient-to-l from-gold-300 to-gold-200 px-8 py-4 text-base font-bold text-navy-800 shadow-[0_18px_40px_-14px_rgba(217,192,143,0.7)] transition-all duration-300 hover:-translate-y-0.5"
              >
                {t('hero.primaryCta')}
                <Arrow
                  size={18}
                  className={`transition-transform duration-300 ${
                    isRtl ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'
                  }`}
                />
              </Link>
              <a
                href="tel:0523975659"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-gold-300/70 hover:bg-white/10"
              >
                <Phone size={18} />
                {t('hero.secondaryCta')}
              </a>
            </div>

            <dl className="mx-auto mt-12 grid max-w-lg grid-cols-3 divide-x divide-white/10 border-t border-white/10 pt-8 rtl:divide-x-reverse lg:mx-0">
              <Stat value="+12" label={t('stats.experience')} />
              <Stat value="+250" label={t('stats.happyClients')} />
              <Stat value="100%" label={t('stats.commitment')} />
            </dl>
          </div>

          {/* ARCHED PORTRAIT */}
          <div className="relative mx-auto w-full max-w-[400px]">
            <div
              aria-hidden
              className="absolute -inset-3 rounded-t-[999px] rounded-b-[2.25rem] border border-gold-300/40"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[2rem] bg-navy-700 shadow-[0_30px_70px_-25px_rgba(0,0,0,0.6)]">
              <img
                src="/orit/orit.jpeg"
                alt={t('hero.portraitAlt')}
                width="400"
                height="500"
                decoding="async"
                fetchPriority="high"
                className="absolute inset-0 h-full w-full object-cover object-[center_18%]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-navy-800/90 via-navy-800/30 to-transparent"
              />
              <div className="absolute inset-x-5 bottom-5 text-center">
                <div className="font-display text-xl font-bold leading-tight">
                  {t('hero.portraitName')}
                </div>
                <div className="mt-1 text-xs font-medium tracking-[0.14em] text-gold-200">
                  {t('hero.portraitRole')}
                </div>
              </div>
            </div>

            <div className="absolute top-16 -end-6 hidden items-center gap-3 rounded-2xl border border-white/15 bg-white/95 px-4 py-3 text-ink-900 shadow-[0_18px_40px_-16px_rgba(0,0,0,0.45)] md:flex">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-burgundy-600 to-burgundy-400 text-gold-200">
                <Award size={19} />
              </span>
              <div>
                <div className="font-display text-base font-bold text-primary">+12</div>
                <div className="text-[11px] font-medium text-muted-foreground">
                  {t('stats.experience')}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Office strip, as on the letterhead */}
        <div className="relative border-t border-white/10 bg-black/10 px-6 py-5 md:px-14 lg:px-20">
          <ul className="flex flex-col items-center justify-center gap-x-10 gap-y-3 text-sm text-white/75 sm:flex-row sm:flex-wrap lg:justify-start">
            <li className="flex items-center gap-2">
              <MapPin size={15} className="text-gold-300" />
              {t('contact.details.addressLine1')} · {t('contact.details.addressLine2')}
            </li>
            <li>
              <a href="tel:025000275" className="flex items-center gap-2 transition-colors hover:text-white">
                <Phone size={15} className="text-gold-300" />
                <span dir="ltr">02-5000275</span>
              </a>
            </li>
            <li>
              <a href="mailto:office@za-cpa.com" className="flex items-center gap-2 transition-colors hover:text-white">
                <Mail size={15} className="text-gold-300" />
                office@za-cpa.com
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="px-3 text-center first:ps-0 lg:text-start">
      <dt className="sr-only">{label}</dt>
      <dd className="text-gold-gradient font-display text-3xl font-extrabold md:text-4xl">
        {value}
      </dd>
      <dd aria-hidden className="mt-1 text-xs font-medium tracking-wide text-white/60">{label}</dd>
    </div>
  )
}
