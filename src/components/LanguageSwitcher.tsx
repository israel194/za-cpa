import type { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import { supportedLanguages, type Language } from '../i18n'

const labels: Record<Language, { native: string }> = {
  he: { native: 'עברית' },
  en: { native: 'English' },
  ar: { native: 'العربية' },
}

function FlagIL() {
  return (
    <svg viewBox="0 0 60 40" className="h-full w-full" aria-hidden>
      <rect width="60" height="40" fill="#fff" />
      <rect y="5" width="60" height="4.5" fill="#0038b8" />
      <rect y="30.5" width="60" height="4.5" fill="#0038b8" />
      <g
        fill="none"
        stroke="#0038b8"
        strokeWidth="1.4"
        transform="translate(30 20)"
      >
        <polygon points="0,-6.5 5.6,3.2 -5.6,3.2" />
        <polygon points="0,6.5 -5.6,-3.2 5.6,-3.2" />
      </g>
    </svg>
  )
}

function FlagUS() {
  // 13 stripes, blue canton with simplified star pattern
  return (
    <svg viewBox="0 0 60 40" className="h-full w-full" aria-hidden>
      <rect width="60" height="40" fill="#B22234" />
      {/* 6 white stripes (stripes 2,4,6,8,10,12 of 13) */}
      <g fill="#fff">
        <rect y="3.08" width="60" height="3.08" />
        <rect y="9.23" width="60" height="3.08" />
        <rect y="15.38" width="60" height="3.08" />
        <rect y="21.54" width="60" height="3.08" />
        <rect y="27.69" width="60" height="3.08" />
        <rect y="33.85" width="60" height="3.08" />
      </g>
      {/* Blue canton (covers ~7 stripes worth) */}
      <rect width="24" height="21.54" fill="#3C3B6E" />
      {/* Simplified star field — 5 rows */}
      <g fill="#fff">
        {[
          [3, 3],
          [7.5, 3],
          [12, 3],
          [16.5, 3],
          [21, 3],
          [5.25, 6],
          [9.75, 6],
          [14.25, 6],
          [18.75, 6],
          [3, 9],
          [7.5, 9],
          [12, 9],
          [16.5, 9],
          [21, 9],
          [5.25, 12],
          [9.75, 12],
          [14.25, 12],
          [18.75, 12],
          [3, 15],
          [7.5, 15],
          [12, 15],
          [16.5, 15],
          [21, 15],
          [5.25, 18],
          [9.75, 18],
          [14.25, 18],
          [18.75, 18],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="0.85" />
        ))}
      </g>
    </svg>
  )
}

function FlagSA() {
  // Saudi Arabia: green field with stylized Shahada and a horizontal sword
  return (
    <svg viewBox="0 0 60 40" className="h-full w-full" aria-hidden>
      <rect width="60" height="40" fill="#006C35" />
      {/* Stylized Shahada — two horizontal lines suggesting Arabic text */}
      <g fill="#fff" opacity="0.95">
        <rect x="9" y="11" width="42" height="1.6" rx="0.5" />
        <rect x="13" y="14.2" width="34" height="1.2" rx="0.4" />
      </g>
      {/* Sword — blade pointing left, hilt on right */}
      <g fill="#fff">
        <path d="M9 25.5 L46 25.5 L48 24.5 L46 23.5 L9 23.5 Z" />
        <rect x="46" y="22" width="2" height="5" />
        <rect x="48" y="20" width="3" height="9" rx="0.6" />
        <circle cx="52.5" cy="24.5" r="1.6" />
      </g>
    </svg>
  )
}

const flagMap: Record<Language, () => ReactElement> = {
  he: FlagIL,
  en: FlagUS,
  ar: FlagSA,
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
      className={`flex items-end gap-1.5 ${
        variant === 'header'
          ? 'rounded-2xl border border-blush-200/70 bg-white/70 px-1.5 py-1 backdrop-blur-sm'
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
            aria-current={active ? 'true' : undefined}
            aria-label={labels[lang].native}
            title={labels[lang].native}
            className={`group flex flex-col items-center gap-1 rounded-lg px-1.5 py-1 transition-all duration-200 ${
              active
                ? 'bg-white shadow-[0_4px_14px_-4px_rgba(183,110,121,0.45)]'
                : 'opacity-70 hover:opacity-100 hover:bg-white/60'
            }`}
          >
            <span
              className={`block h-5 w-7 overflow-hidden rounded-[3px] ring-1 transition-all ${
                active ? 'ring-rose-gold-400' : 'ring-blush-200'
              }`}
            >
              <Flag />
            </span>
            <span
              className={`text-[10px] font-semibold leading-none ${
                active ? 'text-rose-gold-600' : 'text-ink-700'
              }`}
            >
              {labels[lang].native}
            </span>
          </button>
        )
      })}
    </div>
  )
}
