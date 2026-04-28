import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { MapPin, Mail, Phone, Globe } from 'lucide-react'
import { useServices, useSectors } from '../data/content'
import { openConsentSettings } from './CookieConsent'
import Logo from './Logo'

export default function Footer() {
  const { t } = useTranslation()
  const services = useServices()
  const sectors = useSectors()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-blush-100 bg-ink-900 text-cream-100">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-2 md:px-10 lg:grid-cols-4">
        <div>
          <Logo variant="lockup" tone="inverse" size={56} />
          <p className="mt-5 max-w-xs leading-relaxed text-cream-200/80">
            {t('footer.description')}
          </p>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-rose-gold-300">
            {t('footer.servicesTitle')}
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-cream-200/80">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  to={`/services/${s.slug}`}
                  className="transition-colors hover:text-white"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-rose-gold-300">
            {t('footer.sectorsTitle')}
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-cream-200/80">
            {sectors.map((s) => (
              <li key={s.slug}>
                <Link
                  to={`/sectors/${s.slug}`}
                  className="transition-colors hover:text-white"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-rose-gold-300">
            {t('footer.contactTitle')}
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-cream-200/80">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 flex-none text-rose-gold-300" />
              <span>
                {t('contact.details.addressLine1')}
                <br />
                {t('contact.details.addressLine2')}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="flex-none text-rose-gold-300" />
              <a
                href="tel:0523975659"
                className="transition-colors hover:text-white"
                dir="ltr"
              >
                052-3975659
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="flex-none text-rose-gold-300" />
              <a
                href="mailto:office@za-cpa.com"
                className="transition-colors hover:text-white"
              >
                office@za-cpa.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Globe size={16} className="flex-none text-rose-gold-300" />
              <a
                href="https://www.za-cpa.com"
                className="transition-colors hover:text-white"
              >
                www.za-cpa.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-6 text-sm text-cream-200/60 md:flex-row md:px-10">
          <p>
            {t('footer.rights', { year })}
            <span className="mx-2 opacity-60">|</span>
            <span dir="ltr">ח.פ. 515367779</span>
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link to="/about" className="transition-colors hover:text-white">
              {t('nav.about')}
            </Link>
            <Link to="/contact" className="transition-colors hover:text-white">
              {t('nav.contact')}
            </Link>
            <Link
              to="/accessibility"
              className="transition-colors hover:text-white"
            >
              {t('a11y.statement.title')}
            </Link>
            <Link to="/privacy" className="transition-colors hover:text-white">
              {t('privacy.title')}
            </Link>
            <button
              type="button"
              onClick={openConsentSettings}
              className="text-cream-200/60 transition-colors hover:text-white"
            >
              {t('cookies.modal.manage')}
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
