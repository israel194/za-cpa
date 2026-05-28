import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Accessibility,
  Phone,
  Mail,
  User,
  Briefcase,
  MapPin,
  Check,
  Clock,
  Calendar,
  Scale,
  FileText,
  ShieldCheck,
  Keyboard,
  Eye,
  AlertTriangle,
  RefreshCw,
  Info,
  HandHeart,
} from 'lucide-react'
import PageHero from '../components/PageHero'

export default function AccessibilityPage() {
  const { t } = useTranslation()
  const features = t('a11y.statement.features', {
    returnObjects: true,
  }) as string[]
  const limitations = t('a11y.statement.limitations', {
    returnObjects: true,
  }) as string[]

  const updatedAt = new Date('2026-04-28').toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <>
      <PageHero
        eyebrow={t('a11y.statement.eyebrow')}
        title={t('a11y.statement.title')}
        subtitle={t('a11y.statement.subtitle')}
        crumbs={[{ to: '/accessibility', label: t('a11y.statement.eyebrow') }]}
      />

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-6 md:px-10">
          <div className="mb-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1d4ed8] text-white shadow-[0_12px_24px_-12px_rgba(29,78,216,0.5)]">
            <Accessibility size={28} />
          </div>

          {/* Disclaimer at top */}
          <div className="mb-10 rounded-2xl border border-blush-200 bg-blush-50 p-5">
            <div className="flex items-start gap-3">
              <Info size={20} className="mt-0.5 flex-none text-rose-gold-500" />
              <div className="text-sm leading-relaxed text-ink-800">
                <strong className="font-bold">
                  {t('a11y.statement.disclaimerTitle')}.
                </strong>{' '}
                {t('a11y.statement.disclaimerText')}
              </div>
            </div>
          </div>

          {/* 1. Intro */}
          <Block icon={<FileText size={22} />} title={t('a11y.statement.introTitle')}>
            <p className="leading-loose">{t('a11y.statement.intro')}</p>
          </Block>

          {/* 2. Legal framework */}
          <Block icon={<Scale size={22} />} title={t('a11y.statement.lawTitle')}>
            <p className="leading-relaxed">{t('a11y.statement.lawText')}</p>
          </Block>

          {/* 3. Standard */}
          <Block icon={<ShieldCheck size={22} />} title={t('a11y.statement.standardTitle')}>
            <p className="leading-relaxed">{t('a11y.statement.standardText')}</p>
          </Block>

          {/* 4. Methodology */}
          <Block icon={<FileText size={22} />} title={t('a11y.statement.methodologyTitle')}>
            <p className="leading-relaxed">{t('a11y.statement.methodologyText')}</p>
          </Block>

          {/* 5. Screen readers */}
          <Block icon={<Eye size={22} />} title={t('a11y.statement.screenReadersTitle')}>
            <p className="leading-relaxed">{t('a11y.statement.screenReadersText')}</p>
          </Block>

          {/* 6. Keyboard */}
          <Block icon={<Keyboard size={22} />} title={t('a11y.statement.keyboardTitle')}>
            <p className="leading-relaxed">{t('a11y.statement.keyboardText')}</p>
          </Block>

          {/* 7. Features list */}
          <Block icon={<Accessibility size={22} />} title={t('a11y.statement.featuresTitle')}>
            <ul className="grid gap-3 sm:grid-cols-2">
              {features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 rounded-xl border border-blush-100 bg-cream-50/60 p-4"
                >
                  <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-rose-gold-500 text-white">
                    <Check size={14} />
                  </span>
                  <span className="text-sm leading-relaxed text-ink-800">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </Block>

          {/* 8. Limitations */}
          <Block icon={<AlertTriangle size={22} />} title={t('a11y.statement.limitationsTitle')}>
            <p className="mb-4">{t('a11y.statement.limitationsIntro')}</p>
            <ul className="space-y-2">
              {limitations.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-blush-100 bg-cream-50/60 p-4"
                >
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-rose-gold-500" />
                  <span className="text-base leading-relaxed text-ink-800">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-ink-700">
              {t('a11y.statement.limitationsCommit')}
            </p>
          </Block>

          {/* 9. Coordinator (highlighted) */}
          <article className="mb-10 rounded-3xl border border-rose-gold-300/40 bg-gradient-to-bl from-rose-gold-500 to-blush-400 p-8 text-white shadow-[0_24px_56px_-28px_rgba(183,110,121,0.6)] md:p-10">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/25 backdrop-blur-sm">
                <HandHeart size={20} />
              </span>
              <h2 className="font-display text-2xl font-extrabold md:text-3xl">
                {t('a11y.statement.coordinatorTitle')}
              </h2>
            </div>
            <p className="text-base leading-relaxed text-white/90 md:text-lg">
              {t('a11y.statement.coordinatorIntro')}
            </p>

            <ul className="mt-6 space-y-2">
              <CoordRow
                icon={<User size={18} />}
                label={t('a11y.statement.coordinatorName')}
                value={t('a11y.statement.coordinatorNameValue')}
              />
              <CoordRow
                icon={<Briefcase size={18} />}
                label={t('a11y.statement.coordinatorRole')}
                value={t('a11y.statement.coordinatorRoleValue')}
              />
              <CoordRow
                icon={<Phone size={18} />}
                label={t('a11y.statement.coordinatorPhone')}
                value={t('a11y.statement.coordinatorPhoneValue')}
                href="tel:0523975659"
                ltr
              />
              <CoordRow
                icon={<Mail size={18} />}
                label={t('a11y.statement.coordinatorEmail')}
                value={t('a11y.statement.coordinatorEmailValue')}
                href={`mailto:${t('a11y.statement.coordinatorEmailValue')}`}
                ltr
              />
              <CoordRow
                icon={<MapPin size={18} />}
                label={t('a11y.statement.coordinatorAddress')}
                value={t('a11y.statement.coordinatorAddressValue')}
              />
            </ul>
          </article>

          {/* 10. Response time */}
          <Block icon={<Clock size={22} />} title={t('a11y.statement.responseTitle')}>
            <p className="leading-relaxed">{t('a11y.statement.responseText')}</p>
          </Block>

          {/* 11. Individual accommodation */}
          <Block icon={<HandHeart size={22} />} title={t('a11y.statement.individualTitle')}>
            <p className="leading-relaxed">{t('a11y.statement.individualText')}</p>
          </Block>

          {/* 12. Complaint to commission */}
          <Block icon={<AlertTriangle size={22} />} title={t('a11y.statement.complaintTitle')}>
            <p className="leading-relaxed">{t('a11y.statement.complaintText')}</p>
          </Block>

          {/* 13. Ongoing improvement */}
          <Block icon={<RefreshCw size={22} />} title={t('a11y.statement.ongoingTitle')}>
            <p className="leading-relaxed">{t('a11y.statement.ongoingText')}</p>
          </Block>

          {/* Last updated */}
          <div className="mt-10 rounded-2xl border border-blush-100 bg-cream-50/60 p-6">
            <div className="flex items-center gap-2 text-rose-gold-500">
              <Calendar size={18} />
              <h3 className="font-display text-base font-bold text-ink-900">
                {t('a11y.statement.updatedTitle')}
              </h3>
            </div>
            <p className="mt-2 leading-relaxed text-ink-700">
              {t('a11y.statement.updatedText', { date: updatedAt })}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

function Block({
  icon,
  title,
  children,
}: {
  icon: ReactNode
  title: string
  children: ReactNode
}) {
  return (
    <article className="mb-10">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blush-100 text-rose-gold-500">
          {icon}
        </span>
        <h2 className="font-display text-xl font-extrabold text-ink-900 md:text-2xl">
          {title}
        </h2>
      </div>
      <div className="text-base leading-relaxed text-ink-700 md:text-lg">
        {children}
      </div>
    </article>
  )
}

function CoordRow({
  icon,
  label,
  value,
  href,
  ltr,
}: {
  icon: ReactNode
  label: string
  value: string
  href?: string
  ltr?: boolean
}) {
  const content = (
    <div className="flex items-center gap-3 rounded-xl bg-white/15 p-4 backdrop-blur-sm transition-colors hover:bg-white/25">
      <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-white/25">
        {icon}
      </span>
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-white/80">
          {label}
        </div>
        <div className="text-base font-bold" {...(ltr ? { dir: 'ltr' } : {})}>
          {value}
        </div>
      </div>
    </div>
  )
  return (
    <li>
      {href ? (
        <a href={href} className="block">
          {content}
        </a>
      ) : (
        content
      )}
    </li>
  )
}
