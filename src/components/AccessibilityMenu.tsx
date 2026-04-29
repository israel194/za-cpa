import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Accessibility,
  X,
  Plus,
  Minus,
  RotateCcw,
  Contrast,
  Link2,
  Type,
  MousePointer2,
  PauseCircle,
  RefreshCw,
} from 'lucide-react'

type Settings = {
  fontSize: number // -1, 0, 1, 2 (default 0)
  highContrast: boolean
  highlightLinks: boolean
  readableFont: boolean
  largeCursor: boolean
  stopAnimations: boolean
}

const defaults: Settings = {
  fontSize: 0,
  highContrast: false,
  highlightLinks: false,
  readableFont: false,
  largeCursor: false,
  stopAnimations: false,
}

const STORAGE_KEY = 'za-cpa-a11y'
const fontClasses = ['a11y-text-small', '', 'a11y-text-large', 'a11y-text-xlarge']

function loadSettings(): Settings {
  if (typeof window === 'undefined') return defaults
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaults
    const parsed = JSON.parse(raw)
    return { ...defaults, ...parsed }
  } catch {
    return defaults
  }
}

function applySettings(s: Settings) {
  const root = document.documentElement
  fontClasses.forEach((cls) => cls && root.classList.remove(cls))
  const fontIdx = s.fontSize + 1 // -1 -> 0, 0 -> 1, 1 -> 2, 2 -> 3
  const fontCls = fontClasses[fontIdx]
  if (fontCls) root.classList.add(fontCls)

  root.classList.toggle('a11y-high-contrast', s.highContrast)
  root.classList.toggle('a11y-highlight-links', s.highlightLinks)
  root.classList.toggle('a11y-readable-font', s.readableFont)
  root.classList.toggle('a11y-large-cursor', s.largeCursor)
  root.classList.toggle('a11y-no-motion', s.stopAnimations)
}

export default function AccessibilityMenu() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [settings, setSettings] = useState<Settings>(defaults)

  // Load + apply on mount
  useEffect(() => {
    const loaded = loadSettings()
    setSettings(loaded)
    applySettings(loaded)
  }, [])

  // Persist + apply on change
  useEffect(() => {
    applySettings(settings)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    } catch {
      /* ignore quota errors */
    }
  }, [settings])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const update = useCallback(<K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }, [])

  const reset = () => setSettings(defaults)

  const toggle = (key: keyof Omit<Settings, 'fontSize'>) =>
    update(key, !settings[key])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t('a11y.open')}
        title={t('a11y.title')}
        className="group fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-burgundy-400 text-white shadow-[0_18px_40px_-8px_rgba(176,72,102,0.55)] transition-all duration-300 hover:-translate-y-1 hover:bg-burgundy-500 hover:shadow-[0_22px_48px_-8px_rgba(176,72,102,0.7)] focus:outline-none focus:ring-4 focus:ring-rose-gold-300/50"
      >
        <Accessibility size={26} className="transition-transform group-hover:scale-110" />
        <span className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-burgundy-400 opacity-50 blur-md transition-opacity group-hover:opacity-80" />
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-50 bg-ink-900/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="a11y-title"
            className="fixed end-0 top-0 bottom-0 z-50 flex w-full max-w-sm flex-col bg-white shadow-[0_0_60px_rgba(0,0,0,0.25)]"
          >
            <header className="flex items-center justify-between border-b border-blush-100 bg-gradient-to-bl from-silver-100 via-blush-50 to-pink-100 px-6 py-5">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-burgundy-400 to-rose-gold-500 text-white shadow-[0_8px_18px_-6px_rgba(176,72,102,0.5)]">
                  <Accessibility size={20} />
                </span>
                <h2
                  id="a11y-title"
                  className="font-display text-lg font-bold text-ink-900"
                >
                  {t('a11y.title')}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t('a11y.close')}
                className="rounded-full p-2 text-ink-700 hover:bg-white"
              >
                <X size={20} />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              {/* Font size controls */}
              <div className="mb-6">
                <h3 className="mb-3 text-sm font-bold text-ink-800">
                  {t('a11y.fontSize')}
                </h3>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      update('fontSize', Math.max(-1, settings.fontSize - 1))
                    }
                    aria-label={t('a11y.fontDecrease')}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-blush-200 bg-cream-50 px-3 py-3 text-sm font-semibold text-ink-800 hover:border-rose-gold-400 hover:bg-white"
                  >
                    <Minus size={16} />
                    {t('a11y.fontDecrease')}
                  </button>
                  <button
                    type="button"
                    onClick={() => update('fontSize', 0)}
                    aria-label={t('a11y.fontReset')}
                    className={`flex flex-1 items-center justify-center rounded-xl border px-3 py-3 text-sm font-semibold ${
                      settings.fontSize === 0
                        ? 'border-rose-gold-500 bg-rose-gold-500 text-white'
                        : 'border-blush-200 bg-cream-50 text-ink-800 hover:border-rose-gold-400'
                    }`}
                  >
                    {t('a11y.fontReset')}
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      update('fontSize', Math.min(2, settings.fontSize + 1))
                    }
                    aria-label={t('a11y.fontIncrease')}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-blush-200 bg-cream-50 px-3 py-3 text-sm font-semibold text-ink-800 hover:border-rose-gold-400 hover:bg-white"
                  >
                    <Plus size={16} />
                    {t('a11y.fontIncrease')}
                  </button>
                </div>
              </div>

              {/* Toggle options */}
              <div className="space-y-2">
                <ToggleRow
                  icon={<Contrast size={18} />}
                  label={t('a11y.highContrast')}
                  active={settings.highContrast}
                  onClick={() => toggle('highContrast')}
                />
                <ToggleRow
                  icon={<Link2 size={18} />}
                  label={t('a11y.highlightLinks')}
                  active={settings.highlightLinks}
                  onClick={() => toggle('highlightLinks')}
                />
                <ToggleRow
                  icon={<Type size={18} />}
                  label={t('a11y.readableFont')}
                  active={settings.readableFont}
                  onClick={() => toggle('readableFont')}
                />
                <ToggleRow
                  icon={<MousePointer2 size={18} />}
                  label={t('a11y.largeCursor')}
                  active={settings.largeCursor}
                  onClick={() => toggle('largeCursor')}
                />
                <ToggleRow
                  icon={<PauseCircle size={18} />}
                  label={t('a11y.stopAnimations')}
                  active={settings.stopAnimations}
                  onClick={() => toggle('stopAnimations')}
                />
              </div>

              {/* Reset */}
              <button
                type="button"
                onClick={reset}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-blush-200 bg-white px-4 py-3 text-sm font-bold text-ink-800 transition-colors hover:border-rose-gold-400 hover:text-rose-gold-600"
              >
                <RotateCcw size={16} />
                {t('a11y.reset')}
              </button>
            </div>

            <footer className="border-t border-blush-100 bg-cream-50/60 px-6 py-4">
              <Link
                to="/accessibility"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl bg-ink-900 px-4 py-3 text-sm font-semibold text-white hover:bg-ink-800"
              >
                <RefreshCw size={14} />
                {t('a11y.statementLink')}
              </Link>
            </footer>
          </aside>
        </>
      )}
    </>
  )
}

function ToggleRow({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      role="switch"
      aria-checked={active}
      className={`flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-start transition-all ${
        active
          ? 'border-rose-gold-400 bg-blush-50'
          : 'border-blush-100 bg-white hover:border-rose-gold-300 hover:bg-cream-50'
      }`}
    >
      <span className="flex items-center gap-3">
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-lg ${
            active
              ? 'bg-rose-gold-500 text-white'
              : 'bg-blush-100 text-rose-gold-500'
          }`}
        >
          {icon}
        </span>
        <span className="text-sm font-semibold text-ink-900">{label}</span>
      </span>
      <span
        className={`relative h-6 w-11 rounded-full transition-colors ${
          active ? 'bg-rose-gold-500' : 'bg-blush-200'
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-all ${
            active ? 'end-1' : 'start-1'
          }`}
        />
      </span>
    </button>
  )
}
