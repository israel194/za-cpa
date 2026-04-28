import { useEffect, useState, useCallback, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Cookie,
  X,
  Settings as SettingsIcon,
  Check,
  Sparkles,
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
      {/* Marketing-style banner — premium gradient card */}
      {bannerOpen && !modalOpen && (
        <div
          role="dialog"
          aria-labelledby="cookie-banner-title"
          className="fixed inset-x-3 bottom-3 z-40 mx-auto max-w-3xl animate-[fadeUp_400ms_ease-out_both] overflow-hidden rounded-3xl border border-blush-200/80 bg-gradient-to-bl from-cream-50 via-white to-blush-50 shadow-[0_32px_70px_-22px_rgba(183,110,121,0.4)] backdrop-blur-md"
        >
          {/* Decorative glows */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-12 -end-12 h-44 w-44 rounded-full bg-rose-gold-300/40 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-16 -start-16 h-48 w-48 rounded-full bg-blush-200/50 blur-3xl"
          />
          {/* Top thin gold rule */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-rose-gold-400 to-transparent"
          />

          <div className="relative grid gap-5 p-6 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-6 md:p-7">
            {/* Icon side */}
            <div className="flex items-start gap-4 md:items-center">
              <div className="relative flex-none">
                <div
                  aria-hidden
                  className="absolute inset-0 -z-10 rounded-2xl bg-rose-gold-400/35 blur-md"
                />
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-gold-500 to-blush-400 text-white shadow-[0_12px_24px_-10px_rgba(183,110,121,0.6)]">
                  <Cookie size={26} />
                </span>
              </div>
              {/* Mobile-only inline title (hidden on md) */}
              <div className="md:hidden">
                <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-rose-gold-500">
                  <Sparkles size={12} />
                  {t('cookies.banner.eyebrow')}
                </div>
                <h3
                  id="cookie-banner-title"
                  className="mt-1 font-display text-lg font-extrabold leading-tight text-ink-900"
                >
                  {t('cookies.banner.title')}
                </h3>
              </div>
            </div>

            {/* Body */}
            <div>
              {/* Desktop title */}
              <div className="hidden md:block">
                <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-rose-gold-500">
                  <Sparkles size={12} />
                  {t('cookies.banner.eyebrow')}
                </div>
                <h3
                  id="cookie-banner-title"
                  className="mt-1.5 font-display text-xl font-extrabold leading-tight text-ink-900 md:text-2xl"
                >
                  {t('cookies.banner.title')}
                </h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink-800 md:text-[15px]">
                {t('cookies.banner.text')}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-700">
                <span className="font-medium text-rose-gold-500">
                  {t('cookies.banner.tagline')}
                </span>
                <Link
                  to="/privacy"
                  className="inline-flex items-center gap-1 font-semibold text-ink-800 underline decoration-rose-gold-300 underline-offset-4 transition-colors hover:text-rose-gold-600 hover:decoration-rose-gold-500"
                >
                  {t('cookies.banner.policyLink')}
                  <Arrow size={11} />
                </Link>
              </div>
            </div>

            {/* Buttons — vertical column on desktop, wrap on mobile */}
            <div className="flex flex-wrap gap-2 md:flex-col md:gap-2.5">
              <button
                type="button"
                onClick={acceptAll}
                className="group order-1 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-bl from-rose-gold-500 to-rose-gold-600 px-6 py-3 text-sm font-bold text-white shadow-[0_14px_30px_-10px_rgba(183,110,121,0.65)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-10px_rgba(183,110,121,0.8)] md:order-1 md:w-full"
              >
                <Sparkles size={14} className="transition-transform group-hover:scale-110" />
                {t('cookies.banner.acceptAll')}
              </button>
              <button
                type="button"
                onClick={essentialOnly}
                className="order-2 rounded-full border border-blush-200 bg-white/70 px-5 py-2.5 text-sm font-semibold text-ink-800 backdrop-blur-sm transition-all duration-200 hover:border-rose-gold-400 hover:bg-white md:order-2 md:w-full"
              >
                {t('cookies.banner.essentialOnly')}
              </button>
              <button
                type="button"
                onClick={openSettings}
                className="order-3 inline-flex items-center justify-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold text-ink-700 transition-colors hover:text-rose-gold-600 md:order-3 md:w-full"
              >
                <SettingsIcon size={12} />
                {t('cookies.banner.settings')}
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
            className="fixed inset-x-3 top-1/2 z-50 mx-auto max-h-[90vh] max-w-xl -translate-y-1/2 overflow-hidden rounded-3xl border border-blush-100 bg-white shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)]"
          >
            <header className="flex items-center justify-between border-b border-blush-100 bg-gradient-to-bl from-blush-50 to-cream-50 px-6 py-5">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-gold-500 text-white">
                  <Cookie size={18} />
                </span>
                <h2
                  id="cookie-modal-title"
                  className="font-display text-lg font-bold text-ink-900"
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

            <footer className="flex flex-wrap justify-end gap-2 border-t border-blush-100 bg-cream-50/60 px-6 py-4">
              <button
                type="button"
                onClick={essentialOnly}
                className="rounded-full border border-blush-200 bg-white px-4 py-2.5 text-sm font-semibold text-ink-800 transition-colors hover:border-rose-gold-400"
              >
                {t('cookies.banner.essentialOnly')}
              </button>
              <button
                type="button"
                onClick={saveDraft}
                className="inline-flex items-center gap-1.5 rounded-full bg-rose-gold-500 px-5 py-2.5 text-sm font-bold text-white shadow-[0_8px_24px_-8px_rgba(183,110,121,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-rose-gold-600"
              >
                <Check size={14} />
                {t('cookies.modal.save')}
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="rounded-full bg-ink-900 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-ink-800"
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
          <h3 className="font-display text-base font-bold text-ink-900">
            {title}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-700">{text}</p>
        </div>
        <div className="flex flex-none items-center">
          {alwaysOn ? (
            <span className="rounded-full bg-rose-gold-500/15 px-3 py-1 text-xs font-bold text-rose-gold-600">
              {alwaysOnLabel}
            </span>
          ) : (
            <button
              type="button"
              role="switch"
              aria-checked={active}
              onClick={onToggle}
              className={`relative h-6 w-11 rounded-full transition-colors ${
                active ? 'bg-rose-gold-500' : 'bg-blush-200'
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
