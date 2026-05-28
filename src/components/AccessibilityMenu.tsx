import { useState, useEffect, useCallback, type ReactNode } from 'react'
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
  Droplet,
  Droplets,
  RefreshCw,
  ScanLine,
  ExternalLink,
} from 'lucide-react'

type Settings = {
  fontSize: number // -1, 0, 1, 2
  letterSpacing: 0 | 1 | 2
  lineHeight: 0 | 1 | 2
  highContrast: boolean
  saturationLow: boolean
  saturationHigh: boolean
  invertColors: boolean
  highlightLinks: boolean
  readableFont: boolean
  largeCursor: boolean
  readingGuide: boolean
  stopAnimations: boolean
}

const defaults: Settings = {
  fontSize: 0,
  letterSpacing: 0,
  lineHeight: 0,
  highContrast: false,
  saturationLow: false,
  saturationHigh: false,
  invertColors: false,
  highlightLinks: false,
  readableFont: false,
  largeCursor: false,
  readingGuide: false,
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

  // Font size
  fontClasses.forEach((cls) => cls && root.classList.remove(cls))
  const fontIdx = s.fontSize + 1
  const fontCls = fontClasses[fontIdx]
  if (fontCls) root.classList.add(fontCls)

  // Letter spacing
  root.classList.remove('a11y-letter-1', 'a11y-letter-2')
  if (s.letterSpacing === 1) root.classList.add('a11y-letter-1')
  if (s.letterSpacing === 2) root.classList.add('a11y-letter-2')

  // Line height
  root.classList.remove('a11y-line-1', 'a11y-line-2')
  if (s.lineHeight === 1) root.classList.add('a11y-line-1')
  if (s.lineHeight === 2) root.classList.add('a11y-line-2')

  // Toggles
  root.classList.toggle('a11y-high-contrast', s.highContrast)
  root.classList.toggle('a11y-saturation-low', s.saturationLow)
  root.classList.toggle('a11y-saturation-high', s.saturationHigh)
  root.classList.toggle('a11y-invert', s.invertColors)
  root.classList.toggle('a11y-highlight-links', s.highlightLinks)
  root.classList.toggle('a11y-readable-font', s.readableFont)
  root.classList.toggle('a11y-large-cursor', s.largeCursor)
  root.classList.toggle('a11y-reading-guide', s.readingGuide)
  root.classList.toggle('a11y-no-motion', s.stopAnimations)
}

export default function AccessibilityMenu() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [settings, setSettings] = useState<Settings>(defaults)

  useEffect(() => {
    const loaded = loadSettings()
    setSettings(loaded)
    applySettings(loaded)
  }, [])

  useEffect(() => {
    applySettings(settings)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    } catch {
      /* ignore */
    }
  }, [settings])

  // Reading-guide cursor tracking
  useEffect(() => {
    if (!settings.readingGuide) return
    const onMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty(
        '--a11y-cursor-y',
        `${e.clientY}px`
      )
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [settings.readingGuide])

  // ESC closes panel
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const update = useCallback(
    <K extends keyof Settings>(key: K, value: Settings[K]) => {
      setSettings((prev) => ({ ...prev, [key]: value }))
    },
    []
  )

  const reset = () => setSettings(defaults)

  type ToggleKey =
    | 'highContrast'
    | 'saturationLow'
    | 'saturationHigh'
    | 'invertColors'
    | 'highlightLinks'
    | 'readableFont'
    | 'largeCursor'
    | 'readingGuide'
    | 'stopAnimations'

  const toggle = (key: ToggleKey) => update(key, !settings[key])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t('a11y.open')}
        title={t('a11y.title')}
        className="group fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#1d4ed8] text-white shadow-[0_18px_40px_-8px_rgba(29,78,216,0.6)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#1e40af] hover:shadow-[0_22px_48px_-8px_rgba(29,78,216,0.75)] focus:outline-none focus:ring-4 focus:ring-blue-300/50"
      >
        <Accessibility size={26} className="transition-transform group-hover:scale-110" />
        <span className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[#1d4ed8] opacity-50 blur-md transition-opacity group-hover:opacity-80" />
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
            <header className="flex items-center justify-between border-b border-blush-100 bg-gradient-to-bl from-blue-50 to-blush-50 px-6 py-5">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1d4ed8] text-white">
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
              {/* Group: Text & readability */}
              <SectionHeader title={t('a11y.groupText')} />

              <Field label={t('a11y.fontSize')}>
                <TriButtons
                  decreaseAria={t('a11y.fontDecrease')}
                  resetAria={t('a11y.fontReset')}
                  increaseAria={t('a11y.fontIncrease')}
                  decreaseDisabled={settings.fontSize <= -1}
                  increaseDisabled={settings.fontSize >= 2}
                  resetActive={settings.fontSize === 0}
                  onDecrease={() =>
                    update('fontSize', Math.max(-1, settings.fontSize - 1))
                  }
                  onReset={() => update('fontSize', 0)}
                  onIncrease={() =>
                    update('fontSize', Math.min(2, settings.fontSize + 1))
                  }
                />
              </Field>

              <Field label={t('a11y.letterSpacing')}>
                <LevelButtons
                  level={settings.letterSpacing}
                  labels={[
                    t('a11y.spacingLevel0'),
                    t('a11y.spacingLevel1'),
                    t('a11y.spacingLevel2'),
                  ]}
                  onChange={(v) => update('letterSpacing', v)}
                />
              </Field>

              <Field label={t('a11y.lineHeight')}>
                <LevelButtons
                  level={settings.lineHeight}
                  labels={[
                    t('a11y.spacingLevel0'),
                    t('a11y.spacingLevel1'),
                    t('a11y.spacingLevel2'),
                  ]}
                  onChange={(v) => update('lineHeight', v)}
                />
              </Field>

              <ToggleRow
                icon={<Type size={18} />}
                label={t('a11y.readableFont')}
                active={settings.readableFont}
                onClick={() => toggle('readableFont')}
              />

              {/* Group: Vision & color */}
              <SectionHeader title={t('a11y.groupVision')} />

              <ToggleRow
                icon={<Contrast size={18} />}
                label={t('a11y.highContrast')}
                active={settings.highContrast}
                onClick={() => toggle('highContrast')}
              />
              <ToggleRow
                icon={<Droplet size={18} />}
                label={t('a11y.saturationLow')}
                active={settings.saturationLow}
                onClick={() => toggle('saturationLow')}
              />
              <ToggleRow
                icon={<Droplets size={18} />}
                label={t('a11y.saturationHigh')}
                active={settings.saturationHigh}
                onClick={() => toggle('saturationHigh')}
              />
              <ToggleRow
                icon={<RefreshCw size={18} />}
                label={t('a11y.invertColors')}
                active={settings.invertColors}
                onClick={() => toggle('invertColors')}
              />

              {/* Group: Navigation & focus */}
              <SectionHeader title={t('a11y.groupNavigation')} />

              <ToggleRow
                icon={<Link2 size={18} />}
                label={t('a11y.highlightLinks')}
                active={settings.highlightLinks}
                onClick={() => toggle('highlightLinks')}
              />
              <ToggleRow
                icon={<MousePointer2 size={18} />}
                label={t('a11y.largeCursor')}
                active={settings.largeCursor}
                onClick={() => toggle('largeCursor')}
              />
              <ToggleRow
                icon={<ScanLine size={18} />}
                label={t('a11y.readingGuide')}
                active={settings.readingGuide}
                onClick={() => toggle('readingGuide')}
              />

              {/* Group: Motion */}
              <SectionHeader title={t('a11y.groupMotion')} />

              <ToggleRow
                icon={<PauseCircle size={18} />}
                label={t('a11y.stopAnimations')}
                active={settings.stopAnimations}
                onClick={() => toggle('stopAnimations')}
              />

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
                <ExternalLink size={14} />
                {t('a11y.statementLink')}
              </Link>
            </footer>
          </aside>
        </>
      )}
    </>
  )
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-2 mt-5 first:mt-0">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-rose-gold-500">
        <span className="h-px flex-1 bg-blush-200" />
        <span>{title}</span>
        <span className="h-px flex-1 bg-blush-200" />
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="mb-3">
      <div className="mb-2 text-xs font-semibold text-ink-700">{label}</div>
      {children}
    </div>
  )
}

function TriButtons({
  decreaseAria,
  resetAria,
  increaseAria,
  decreaseDisabled,
  increaseDisabled,
  resetActive,
  onDecrease,
  onReset,
  onIncrease,
}: {
  decreaseAria: string
  resetAria: string
  increaseAria: string
  decreaseDisabled?: boolean
  increaseDisabled?: boolean
  resetActive?: boolean
  onDecrease: () => void
  onReset: () => void
  onIncrease: () => void
}) {
  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={onDecrease}
        disabled={decreaseDisabled}
        aria-label={decreaseAria}
        className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-blush-200 bg-cream-50 px-3 py-2.5 text-sm font-semibold text-ink-800 transition-colors hover:border-rose-gold-400 hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Minus size={14} />
        {decreaseAria}
      </button>
      <button
        type="button"
        onClick={onReset}
        aria-label={resetAria}
        className={`flex flex-1 items-center justify-center rounded-xl border px-3 py-2.5 text-sm font-semibold ${
          resetActive
            ? 'border-rose-gold-500 bg-rose-gold-500 text-white'
            : 'border-blush-200 bg-cream-50 text-ink-800 hover:border-rose-gold-400'
        }`}
      >
        {resetAria}
      </button>
      <button
        type="button"
        onClick={onIncrease}
        disabled={increaseDisabled}
        aria-label={increaseAria}
        className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-blush-200 bg-cream-50 px-3 py-2.5 text-sm font-semibold text-ink-800 transition-colors hover:border-rose-gold-400 hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Plus size={14} />
        {increaseAria}
      </button>
    </div>
  )
}

function LevelButtons({
  level,
  labels,
  onChange,
}: {
  level: 0 | 1 | 2
  labels: [string, string, string]
  onChange: (v: 0 | 1 | 2) => void
}) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {([0, 1, 2] as const).map((v) => (
        <button
          key={v}
          type="button"
          onClick={() => onChange(v)}
          aria-pressed={level === v}
          className={`rounded-xl border px-2 py-2.5 text-sm font-semibold transition-colors ${
            level === v
              ? 'border-rose-gold-500 bg-rose-gold-500 text-white'
              : 'border-blush-200 bg-cream-50 text-ink-800 hover:border-rose-gold-400'
          }`}
        >
          {labels[v]}
        </button>
      ))}
    </div>
  )
}

function ToggleRow({
  icon,
  label,
  active,
  onClick,
}: {
  icon: ReactNode
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
      className={`mb-2 flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-2.5 text-start transition-all ${
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
        className={`relative h-6 w-11 flex-none rounded-full transition-colors ${
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
