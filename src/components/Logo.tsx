import { useId } from 'react'

type Tone = 'default' | 'inverse' | 'gold'
type Variant = 'mark' | 'lockup' | 'lockup-stacked'

type Props = {
  variant?: Variant
  tone?: Tone
  size?: number // mark size in px (height for lockup)
  className?: string
  showName?: boolean // for mark, optional brand name beneath
}

/**
 * עשור — Asor CPA
 * Original wordmark + medallion. The medallion holds the Hebrew letter ע
 * inside a thin double-circle frame; three subtle florets above and a
 * decorative horizontal line below.
 */
export default function Logo({
  variant = 'lockup',
  tone = 'default',
  size = 56,
  className = '',
  showName = false,
}: Props) {
  if (variant === 'mark') {
    return <Medallion tone={tone} size={size} className={className} showName={showName} />
  }
  if (variant === 'lockup-stacked') {
    return (
      <div className={`flex flex-col items-center gap-3 ${className}`}>
        <Medallion tone={tone} size={size} />
        <Wordmark tone={tone} align="center" />
      </div>
    )
  }
  // horizontal lockup (default) — RTL: medallion on the right side
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Medallion tone={tone} size={size} />
      <Wordmark tone={tone} />
    </div>
  )
}

function Medallion({
  tone,
  size,
  className = '',
  showName = false,
}: {
  tone: Tone
  size: number
  className?: string
  showName?: boolean
}) {
  const gid = useId()
  const gradId = `lg-${gid}-grad`
  const innerGradId = `lg-${gid}-inner`

  const stops =
    tone === 'inverse'
      ? ['#f0d4c5', '#e6b8a8', '#d4a190']
      : tone === 'gold'
        ? ['#e6c8a8', '#c9a37e', '#a07d5a']
        : ['#d4a190', '#b76e79', '#9c5560']

  return (
    <div className={className}>
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        role="img"
        aria-label="עשור — רואי חשבון"
      >
        <defs>
          <linearGradient id={gradId} x1="20%" y1="10%" x2="80%" y2="90%">
            <stop offset="0%" stopColor={stops[0]} />
            <stop offset="55%" stopColor={stops[1]} />
            <stop offset="100%" stopColor={stops[2]} />
          </linearGradient>
          <linearGradient id={innerGradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={stops[1]} stopOpacity="0.55" />
            <stop offset="100%" stopColor={stops[2]} stopOpacity="0.85" />
          </linearGradient>
        </defs>

        {/* Outer thin ring */}
        <circle
          cx="50"
          cy="50"
          r="46.5"
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth="1.4"
        />
        {/* Inner ghosted ring (luxury double border) */}
        <circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke={`url(#${innerGradId})`}
          strokeWidth="0.6"
          strokeDasharray="0 0"
          opacity="0.7"
        />

        {/* Top floret — three soft petals + center dot */}
        <g transform="translate(50 9)" fill={`url(#${gradId})`}>
          <ellipse cx="0" cy="0" rx="1.6" ry="3" />
          <ellipse cx="-3.4" cy="1.4" rx="1.3" ry="2.4" transform="rotate(-32 -3.4 1.4)" opacity="0.85" />
          <ellipse cx="3.4" cy="1.4" rx="1.3" ry="2.4" transform="rotate(32 3.4 1.4)" opacity="0.85" />
          <circle cx="0" cy="3.6" r="0.9" />
        </g>

        {/* Bottom decorative line + diamond */}
        <g transform="translate(50 88)" fill={`url(#${gradId})`}>
          <rect x="-12" y="-0.4" width="9" height="0.8" rx="0.4" />
          <rect x="3" y="-0.4" width="9" height="0.8" rx="0.4" />
          <path d="M 0 -2.6 L 2.2 0 L 0 2.6 L -2.2 0 Z" />
        </g>

        {/* Hebrew letter ע centered */}
        <text
          x="50"
          y="68"
          textAnchor="middle"
          fontFamily='"Heebo","Assistant",sans-serif'
          fontWeight="800"
          fontSize="56"
          fill={`url(#${gradId})`}
          style={{ letterSpacing: '0' }}
        >
          ע
        </text>
      </svg>
      {showName && (
        <div className="mt-2 text-center">
          <div className="font-display text-sm font-extrabold tracking-tight text-rose-gold-500">
            עשור
          </div>
          <div className="text-[10px] font-medium uppercase tracking-[0.25em] text-ink-700">
            רואי חשבון
          </div>
        </div>
      )}
    </div>
  )
}

function Wordmark({
  tone,
  align = 'start',
}: {
  tone: Tone
  align?: 'start' | 'center'
}) {
  const goldClass =
    tone === 'inverse' ? 'text-rose-gold-300' : 'text-rose-gold-500'
  const subtitleClass =
    tone === 'inverse' ? 'text-cream-100/85' : 'text-ink-800/80'
  const ruleClass =
    tone === 'inverse' ? 'bg-rose-gold-300/60' : 'bg-rose-gold-400/60'
  const alignClass = align === 'center' ? 'items-center' : 'items-start'
  const textAlign = align === 'center' ? 'text-center' : ''

  return (
    <div className={`flex flex-col ${alignClass} font-display tracking-tight`}>
      <div
        className={`${textAlign} text-2xl font-extrabold leading-none ${goldClass} md:text-[1.65rem]`}
        style={{ letterSpacing: '-0.01em' }}
      >
        עשור
      </div>
      <div className="mt-1.5 flex items-center gap-2">
        <span className={`block h-px w-6 ${ruleClass}`} aria-hidden />
        <span
          className={`text-[11px] font-semibold uppercase tracking-[0.28em] ${subtitleClass}`}
          style={{ letterSpacing: '0.28em' }}
        >
          רואי חשבון
        </span>
        <span className={`block h-px w-6 ${ruleClass}`} aria-hidden />
      </div>
    </div>
  )
}
