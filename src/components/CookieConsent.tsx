import { useEffect, useState, useCallback, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Cookie,
  X,
  Settings as SettingsIcon,
  Check,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react'

type Consent = {
  decided: boolean
  essential: true
  analytics: boolean
  marketing: boolean
  date: string
}

const STORAGE_KEY = 'za-cpa-consent'
const defaults: Consent = {
  decided: false,
  essential: true,
  analytics: false,
  marketing: false,
  date: '',
}

function loadConsent(): Consent {
  if (typeof window === 'undefined') return defaults
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaults
    return { ...defaults, ...JSON.parse(raw) }
  } catch {
    return defaults
  }
}

function saveConsent(c: Omit<Consent, 'date'>) {
  const full: Consent = { ...c, date: new Date().toISOString() }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(full))
  } catch {
    /* ignore */
  }
  return full
}

// Custom event name so other parts of the app can open the modal
export const OPEN_CONSENT_EVENT = 'za-cpa:open-consent'

export function openConsentSettings() {
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))
}

export default function CookieConsent() {
  const { t, i18n } = useTranslation()
  const isRtl = i18n.dir() === 'rtl'
  const Arrow = isRtl ? ArrowLeft : ArrowRight
  const [consent, setConsent] = useState<Consent>(defaults)
  const [bannerOpen, setBannerOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [draft, setDraft] = useState<{
    analytics: boolean
    marketing: boolean
  }>({ analytics: false, marketing: false })

  // Load on mount; show banner only if user hasn't decided yet
  useEffect(() => {
    const loaded = loadConsent()
    setConsent(loaded)
    setDraft({ analytics: loaded.analytics, marketing: loaded.marketing })
    if (!loaded.decided) setBannerOpen(true)
  }, [])

  // Listen for external requests to open settings
  useEffect(() => {
    const onOpen = () => {
      setDraft({ analytics: consent.analytics, marketing: consent.marketing })
      setModalOpen(true)
    }
    window.addEventListener(OPEN_CONSENT_EVENT, onOpen)
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, onOpen)
  }, [consent.analytics, consent.marketing])

  // Close modal on Escape
  useEffect(() => {
    if (!modalOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [modalOpen])

  const acceptAll = useCallback(() => {
    const next = saveConsent({
      decided: true,
      essential: true,
      analytics: true,
      marketing: true,
    })
    setConsent(next)
    setBannerOpen(false)
    setModalOpen(false)
  }, [])

  const essentialOnly = useCallback(() => {
    const next = saveConsent({
      decided: true,
      essential: true,
      analytics: false,
      marketing: false,
    })
    setConsent(next)
    setBannerOpen(false)
    setModalOpen(false)
  }, [])

  const saveDraft = useCallback(() => {
    const next = saveConsent({
      decided: true,
      essential: true,
      analytics: draft.analytics,
      marketing: draft.marketing,
    })
    setConsent(next)
    setBannerOpen(false)
    setModalOpen(false)
  }, [draft])

  const openSettings = () => {
    setDraft({ analytics: consent.analytics, marketing: consent.marketing })
    setModalOpen(true)
  }

  return (
    <>
      {/* Compact consent bar: keeps the first screen visible on mobile */}
      {bannerOpen && !modalOpen && (
        <div
          role="dialog"
          aria-labelledby="cookie-banner-title"
          aria-describedby="cookie-banner-text"
          className="fixed inset-x-3 bottom-3 z-40 mx-auto max-w-4xl animate-[fadeUp_400ms_ease-out_both] overflow-hidden rounded-[12px] border border-[color:var(--color-rule-strong)] bg-surface shadow-[var(--shadow-lift)]"
        >
          <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gold-400" />
          <div className="relative flex flex-col gap-3 p-4 md:flex-row md:items-center md:gap-6 md:px-6 md:py-4">
            <div className="flex min-w-0 flex-1 items-start gap-3">
              <span className="mt-0.5 hidden h-10 w-10 flex-none items-center justify-center rounded-[8px] border border-[color:var(--color-rule)] bg-cream-50 text-gold-600 sm:flex">
                <Cookie size={22} aria-hidden />
              </span>
              <div className="min-w-0">
                <h2 id="cookie-banner-title" className="flex items-center gap-1.5 text-sm font-bold text-ink-900">
                  <Cookie size={16} aria-hidden className="text-gold-600 sm:hidden" />
                  {t('cookies.banner.title')}
                </h2>
                <p id="cookie-banner-text" className="mt-1 text-[13px] leading-relaxed text-ink-800 md:text-sm">
                  {t('cookies.banner.text')}{' '}
                  <Link
                    to="/privacy"
                    className="inline-flex items-center gap-1 font-semibold text-ink-900 underline decoration-rose-gold-300 underline-offset-4 transition-colors hover:text-primary hover:decoration-rose-gold-500"
                  >
                    {t('cookies.banner.policyLink')}
                    <Arrow size={12} aria-hidden />
                  </Link>
                </p>
              </div>
            </div>

            <div className="flex flex-none items-center gap-2">
              <button
                type="button"
                onClick={acceptAll}
                className="inline-flex min-h-11 flex-1 items-center justify-center rounded-[6px] bg-primary px-5 text-sm font-bold text-white transition-colors duration-200 hover:bg-burgundy-500 md:flex-none"
              >
                {t('cookies.banner.acceptAll')}
              </button>
              <button
                type="button"
                onClick={essentialOnly}
                className="inline-flex min-h-11 flex-1 items-center justify-center rounded-[6px] border border-[color:var(--color-rule-strong)] px-4 text-sm font-semibold text-ink-800 transition-colors duration-200 hover:border-primary md:flex-none"
              >
                {t('cookies.banner.essentialOnly')}
              </button>
              <button
                type="button"
                onClick={openSettings}
                aria-label={t('cookies.banner.settings')}
                title={t('cookies.banner.settings')}
                className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-[6px] text-ink-700 transition-colors hover:bg-cream-50 hover:text-primary"
              >
                <SettingsIcon size={18} aria-hidden />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settings modal */}
      {modalOpen && (
        <>
          <div
            className="fixed inset-0 z-50 bg-ink-900/45 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
            aria-hidden
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-modal-title"
            className="fixed inset-x-3 top-1/2 z-50 mx-auto max-h-[90vh] max-w-xl -translate-y-1/2 overflow-hidden rounded-[12px] border border-[color:var(--color-rule-strong)] bg-surface shadow-[var(--shadow-lift)]"
          >
            <header className="flex items-center justify-between border-b border-[color:var(--color-rule)] bg-cream-50 px-6 py-5">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                  <Cookie size={18} />
                </span>
                <h2
                  id="cookie-modal-title"
                  className="display display-sm display-ink"
                >
                  {t('cookies.modal.title')}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                aria-label={t('a11y.close')}
                className="rounded-full p-2 text-ink-700 hover:bg-white"
              >
                <X size={20} />
              </button>
            </header>

            <div className="max-h-[60vh] overflow-y-auto px-6 py-5">
              <p className="text-sm leading-relaxed text-ink-700">
                {t('cookies.modal.subtitle')}
              </p>

              <div className="mt-5 space-y-3">
                <CategoryRow
                  title={t('cookies.modal.categories.essential.title')}
                  text={t('cookies.modal.categories.essential.text')}
                  active={true}
                  alwaysOn
                  alwaysOnLabel={t('cookies.modal.alwaysOn')}
                />
                <CategoryRow
                  title={t('cookies.modal.categories.analytics.title')}
                  text={t('cookies.modal.categories.analytics.text')}
                  active={draft.analytics}
                  onToggle={() =>
                    setDraft((d) => ({ ...d, analytics: !d.analytics }))
                  }
                />
                <CategoryRow
                  title={t('cookies.modal.categories.marketing.title')}
                  text={t('cookies.modal.categories.marketing.text')}
                  active={draft.marketing}
                  onToggle={() =>
                    setDraft((d) => ({ ...d, marketing: !d.marketing }))
                  }
                />
              </div>
            </div>

            <footer className="flex flex-wrap justify-end gap-2 border-t border-blush-100 bg-background/60 px-6 py-4">
              <button
                type="button"
                onClick={essentialOnly}
                className="rounded-[6px] border border-[color:var(--color-rule-strong)] bg-white px-4 py-2.5 text-sm font-semibold text-ink-800 transition-colors hover:border-primary"
              >
                {t('cookies.banner.essentialOnly')}
              </button>
              <button
                type="button"
                onClick={saveDraft}
                className="inline-flex items-center gap-1.5 rounded-[6px] bg-primary px-5 py-2.5 text-sm font-bold text-white transition-colors duration-200 hover:bg-burgundy-500"
              >
                <Check size={14} />
                {t('cookies.modal.save')}
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="rounded-[6px] bg-ink-900 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-ink-800"
              >
                {t('cookies.banner.acceptAll')}
              </button>
            </footer>
          </div>
        </>
      )}
    </>
  )
}

function CategoryRow({
  title,
  text,
  active,
  alwaysOn,
  alwaysOnLabel,
  onToggle,
}: {
  title: string
  text: string
  active: boolean
  alwaysOn?: boolean
  alwaysOnLabel?: ReactNode
  onToggle?: () => void
}) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        active
          ? 'border-rose-gold-300/60 bg-blush-50'
          : 'border-blush-100 bg-white'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <h3 className="display display-sm display-ink text-[1.05rem]">
            {title}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-700">{text}</p>
        </div>
        <div className="flex flex-none items-center">
          {alwaysOn ? (
            <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-bold text-primary">
              {alwaysOnLabel}
            </span>
          ) : (
            <button
              type="button"
              role="switch"
              aria-checked={active}
              onClick={onToggle}
              className={`relative h-6 w-11 rounded-full transition-colors ${
                active ? 'bg-primary' : 'bg-blush-200'
              }`}
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-all ${
                  active ? 'end-1' : 'start-1'
                }`}
              />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
