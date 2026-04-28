import type { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import { supportedLanguages, type Language } from '../i18n'

const labels: Record<Language, { code: string; native: string }> = {
  he: { code: 'HE', native: 'עברית' },
  en: { code: 'EN', native: 'English' },
  ar: { code: 'AR', native: 'العربية' },
}

function FlagIL() {
  return (
    <svg viewBox="0 0 30 20" className="h-full w-full" aria-hidden>
      <rect width="30" height="20" fill="#fff" />
      <rect y="2.5" width="30" height="2.5" fill="#0038b8" />
      <rect y="15" width="30" height="2.5" fill="#0038b8" />
      <g
        fill="none"
        stroke="#0038b8"
        strokeWidth="0.7"
        transform="translate(15 10)"
      >
        <polygon points="0,-3.4 2.95,1.7 -2.95,1.7" />
        <polygon points="0,3.4 -2.95,-1.7 2.95,-1.7" />
      </g>
    </svg>
  )
}

function FlagGB() {
  return (
    <svg viewBox="0 0 60 30" className="h-full w-full" aria-hidden>
      <clipPath id="gb-clip">
        <rect width="60" height="30" />
      </clipPath>
      <g clipPath="url(#gb-clip)">
        <rect width="60" height="30" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path
          d="M0,0 L60,30 M60,0 L0,30"
          stroke="#C8102E"
          strokeWidth="3"
          clipPath="inset(0)"
        />
        <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  )
}

function FlagAR() {
  // Generic pan-Arab tricolor (red/white/black) — no country-specific emblem
  return (
    <svg viewBox="0 0 30 20" className="h-full w-full" aria-hidden>
      <rect width="30" height="20" fill="#ce1126" />
      <rect y="6.66" width="30" height="6.67" fill="#fff" />
      <rect y="13.33" width="30" height="6.67" fill="#000" />
      <text
        x="15"
        y="13"
        textAnchor="middle"
        fontSize="6.5"
        fontWeight="700"
        fill="#007a3d"
        fontFamily="Cairo, Tajawal, sans-serif"
      >
        ع
      </text>
    </svg>
  )
}

const flagMap: Record<Language, () => ReactElement> = {
  he: FlagIL,
  en: FlagGB,
  ar: FlagAR,
}

type Props = {
  variant?: 'header' | 'inline'
}

export default function LanguageSwitcher({ variant = 'header' }: Props) {
  const { i18n } = useTranslation()
  const current = (i18n.language?.split('-')[0] as Language) ?? 'he'

  const change = (lang: Language) => {
    if (lang !== current) i18n.changeLanguage(lang)
  }

  return (
    <div
      className={`flex items-center gap-1.5 ${
        variant === 'header'
          ? 'rounded-full border border-blush-200/70 bg-white/70 p-1 backdrop-blur-sm'
          : ''
      }`}
      role="group"
      aria-label="Language"
    >
      {supportedLanguages.map((lang) => {
        const Flag = flagMap[lang]
        const active = lang === current
        return (
          <button
            key={lang}
            type="button"
            onClick={() => change(lang)}
            aria-label={labels[lang].native}
            aria-current={active ? 'true' : undefined}
            title={labels[lang].native}
            className={`group relative flex items-center justify-center overflow-hidden rounded-full transition-all duration-200 ${
              active
                ? 'h-9 w-9 ring-2 ring-rose-gold-500 ring-offset-2 ring-offset-white'
                : 'h-9 w-9 opacity-70 hover:opacity-100 hover:ring-2 hover:ring-blush-300 hover:ring-offset-2 hover:ring-offset-white'
            }`}
          >
            <span className="block h-full w-full">
              <Flag />
            </span>
            <span className="sr-only">{labels[lang].native}</span>
          </button>
        )
      })}
    </div>
  )
}
