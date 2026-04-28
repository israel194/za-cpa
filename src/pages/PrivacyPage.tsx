import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Cookie,
  ShieldCheck,
  FileText,
  UserCheck,
  Lock,
  Users,
  RefreshCw,
  Mail,
  Phone,
  Calendar,
  Settings as SettingsIcon,
  Building2,
  Scale,
  Megaphone,
  Baby,
  Globe,
  AlertTriangle,
  Info,
  Clock,
} from 'lucide-react'
import PageHero from '../components/PageHero'
import { openConsentSettings } from '../components/CookieConsent'

export default function PrivacyPage() {
  const { t } = useTranslation()
  const collectItems = t('privacy.collectItems', {
    returnObjects: true,
  }) as string[]
  const useItems = t('privacy.useItems', { returnObjects: true }) as string[]
  const legalBasisItems = t('privacy.legalBasisItems', {
    returnObjects: true,
  }) as string[]
  const rightsItems = t('privacy.rightsItems', {
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
        eyebrow={t('privacy.eyebrow')}
        title={t('privacy.title')}
        subtitle={t('privacy.subtitle')}
        crumbs={[{ to: '/privacy', label: t('privacy.eyebrow') }]}
      />

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-6 md:px-10">
          {/* Disclaimer notice at top */}
          <div className="mb-10 rounded-2xl border border-blush-200 bg-blush-50 p-5">
            <div className="flex items-start gap-3">
              <Info size={20} className="mt-0.5 flex-none text-rose-gold-500" />
              <div className="text-sm leading-relaxed text-ink-800">
                <strong className="font-bold">
                  {t('privacy.disclaimerTitle')}.
                </strong>{' '}
                {t('privacy.disclaimerText')}
              </div>
            </div>
          </div>

          {/* 1. Intro */}
          <Block icon={<FileText size={22} />} title={t('privacy.introTitle')}>
            <p className="leading-loose">{t('privacy.intro')}</p>
          </Block>

          {/* 2. Controller */}
          <Block
            icon={<Building2 size={22} />}
            title={t('privacy.controllerTitle')}
          >
            <p className="leading-relaxed">{t('privacy.controllerInfo')}</p>
          </Block>

          {/* 3. Legal framework */}
          <Block icon={<Scale size={22} />} title={t('privacy.lawTitle')}>
            <p className="leading-relaxed">{t('privacy.lawText')}</p>
          </Block>

          {/* 4. What we collect */}
          <Block
            icon={<UserCheck size={22} />}
            title={t('privacy.collectTitle')}
          >
            <p className="mb-4">{t('privacy.collectIntro')}</p>
            <BulletList items={collectItems} />
            <p className="mt-4 text-sm leading-relaxed text-ink-700">
              {t('privacy.collectNote')}
            </p>
          </Block>

          {/* 5. Purposes */}
          <Block icon={<FileText size={22} />} title={t('privacy.useTitle')}>
            <BulletList items={useItems} />
          </Block>

          {/* 6. Legal basis */}
          <Block
            icon={<Scale size={22} />}
            title={t('privacy.legalBasisTitle')}
          >
            <p className="mb-4">{t('privacy.legalBasisIntro')}</p>
            <BulletList items={legalBasisItems} />
          </Block>

          {/* 7. Cookies */}
          <Block icon={<Cookie size={22} />} title={t('privacy.cookiesTitle')}>
            <p className="mb-4">{t('privacy.cookiesIntro')}</p>
            <ul className="space-y-3">
              <li className="rounded-xl border border-blush-100 bg-cream-50/60 p-4">
                <span className="text-base leading-relaxed text-ink-800">
                  {t('privacy.cookiesEssential')}
                </span>
              </li>
              <li className="rounded-xl border border-blush-100 bg-cream-50/60 p-4">
                <span className="text-base leading-relaxed text-ink-800">
                  {t('privacy.cookiesAnalytics')}
                </span>
              </li>
              <li className="rounded-xl border border-blush-100 bg-cream-50/60 p-4">
                <span className="text-base leading-relaxed text-ink-800">
                  {t('privacy.cookiesMarketing')}
                </span>
              </li>
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-ink-700">
              {t('privacy.cookiesRetention')}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink-700">
              {t('privacy.cookiesManage')}
            </p>
            <button
              type="button"
              onClick={openConsentSettings}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-rose-gold-500 px-6 py-3 text-sm font-bold text-white shadow-[0_12px_28px_-10px_rgba(183,110,121,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-rose-gold-600"
            >
              <SettingsIcon size={14} />
              {t('privacy.manageConsent')}
            </button>
          </Block>

          {/* 8. Retention */}
          <Block icon={<Clock size={22} />} title={t('privacy.retentionTitle')}>
            <p className="leading-relaxed">{t('privacy.retentionText')}</p>
          </Block>

          {/* 9. Third parties */}
          <Block
            icon={<Users size={22} />}
            title={t('privacy.thirdPartyTitle')}
          >
            <p className="leading-relaxed">{t('privacy.thirdPartyText')}</p>
          </Block>

          {/* 10. International */}
          <Block
            icon={<Globe size={22} />}
            title={t('privacy.internationalTitle')}
          >
            <p className="leading-relaxed">{t('privacy.internationalText')}</p>
          </Block>

          {/* 11. Direct marketing */}
          <Block
            icon={<Megaphone size={22} />}
            title={t('privacy.directMarketingTitle')}
          >
            <p className="leading-relaxed">
              {t('privacy.directMarketingText')}
            </p>
          </Block>

          {/* 12. Minors */}
          <Block icon={<Baby size={22} />} title={t('privacy.minorsTitle')}>
            <p className="leading-relaxed">{t('privacy.minorsText')}</p>
          </Block>

          {/* 13. Rights */}
          <Block
            icon={<UserCheck size={22} />}
            title={t('privacy.rightsTitle')}
          >
            <p className="mb-4">{t('privacy.rightsIntro')}</p>
            <BulletList items={rightsItems} />
            <p className="mt-4 text-sm leading-relaxed text-ink-700">
              {t('privacy.rightsContact')}
            </p>
          </Block>

          {/* 14. Security */}
          <Block icon={<Lock size={22} />} title={t('privacy.securityTitle')}>
            <p className="leading-relaxed">{t('privacy.securityText')}</p>
          </Block>

          {/* 15. Complaint to PPA */}
          <Block
            icon={<AlertTriangle size={22} />}
            title={t('privacy.complaintTitle')}
          >
            <p className="leading-relaxed">{t('privacy.complaintText')}</p>
          </Block>

          {/* 16. Changes */}
          <Block
            icon={<RefreshCw size={22} />}
            title={t('privacy.changesTitle')}
          >
            <p className="leading-relaxed">{t('privacy.changesText')}</p>
          </Block>

          {/* 17. Contact (highlighted) */}
          <article className="mt-10 rounded-3xl border border-rose-gold-300/40 bg-gradient-to-bl from-rose-gold-500 to-blush-400 p-8 text-white shadow-[0_24px_56px_-28px_rgba(183,110,121,0.6)] md:p-10">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/25 backdrop-blur-sm">
                <ShieldCheck size={20} />
              </span>
              <h2 className="font-display text-2xl font-extrabold md:text-3xl">
                {t('privacy.contactTitle')}
              </h2>
            </div>
            <p className="text-base leading-relaxed text-white/90 md:text-lg">
              {t('privacy.contactIntro')}
            </p>
            <div className="mt-5 rounded-xl bg-white/15 p-4 backdrop-blur-sm">
              <div className="text-base font-bold">
                {t('privacy.contactName')}
              </div>
            </div>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  href="tel:0523975659"
                  className="flex items-center gap-3 rounded-xl bg-white/15 p-4 backdrop-blur-sm transition-colors hover:bg-white/25"
                >
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-white/25">
                    <Phone size={18} />
                  </span>
                  <span className="text-base font-bold" dir="ltr">
                    052-3975659
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:office@za-cpa.com"
                  className="flex items-center gap-3 rounded-xl bg-white/15 p-4 backdrop-blur-sm transition-colors hover:bg-white/25"
                >
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-white/25">
                    <Mail size={18} />
                  </span>
                  <span className="text-base font-bold" dir="ltr">
                    office@za-cpa.com
                  </span>
                </a>
              </li>
            </ul>
          </article>

          {/* 18. Last updated */}
          <div className="mt-10 rounded-2xl border border-blush-100 bg-cream-50/60 p-6">
            <div className="flex items-center gap-2 text-rose-gold-500">
              <Calendar size={18} />
              <h3 className="font-display text-base font-bold text-ink-900">
                {t('a11y.statement.updatedTitle')}
              </h3>
            </div>
            <p className="mt-2 leading-relaxed text-ink-700">
              {t('privacy.updatedText', { date: updatedAt })}
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

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
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
  )
}
