import { WORD_PATH, WORD_WIDTH, TAG_PATH, TAG_WIDTH } from './logoPaths'

type Tone = 'default' | 'inverse'
type Variant = 'mark' | 'lockup' | 'lockup-stacked'

type Props = {
  variant?: Variant
  tone?: Tone
  size?: number // mark height in px
  className?: string
}

const PALETTE = {
  default: { arch: '#6e1a2d', letter: '#fbf7f4', frame: '#a8894f', word: '#6e1a2d', rule: '#a8894f', tag: '#8a6a2f' },
  inverse: { arch: '#fbf7f4', letter: '#6e1a2d', frame: '#d9c08f', word: '#fbf7f4', rule: '#d9c08f', tag: '#d9c08f' },
}

/**
 * עשור רואות חשבון: a Jerusalem-stone arch framing a drawn ע, with an
 * outlined Frank Ruhl Libre wordmark. Source of truth: brand/build_logo.py.
 */
export default function Logo({ variant = 'lockup', tone = 'default', size = 56, className = '' }: Props) {
  if (variant === 'mark') {
    return <Mark tone={tone} size={size} className={className} />
  }
  if (variant === 'lockup-stacked') {
    return (
      <div className={`flex flex-col items-center gap-3 ${className}`}>
        <Mark tone={tone} size={size} />
        <Wordmark tone={tone} height={size * 0.85} />
      </div>
    )
  }
  // Horizontal lockup. In RTL the mark sits on the right, as in the master artwork.
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Mark tone={tone} size={size} />
      <Wordmark tone={tone} height={size * 0.88} />
    </div>
  )
}

function Mark({ tone, size, className = '' }: { tone: Tone; size: number; className?: string }) {
  const p = PALETTE[tone]
  return (
    <svg viewBox="70 50 372 430" height={size} width={(size * 372) / 430} className={className} aria-hidden>
      <g transform="translate(0 -14)">
        <path d="M 90 470 V 214 A 166 166 0 0 1 422 214 V 470" fill="none" stroke={p.frame} strokeWidth="16" />
        <rect x="74" y="484" width="364" height="16" fill={p.frame} />
        <path d="M 120 470 V 214 A 136 136 0 0 1 392 214 V 470 Z" fill={p.arch} />
        <g fill={p.letter}>
          <path d="M 290 176 H 354 V 214 L 290 206 Z" />
          <path d="M 160 176 H 222 V 214 L 160 206 Z" />
        </g>
        <g fill="none" stroke={p.letter} strokeLinejoin="round">
          <path d="M 336 200 V 318 C 336 364 312 384 266 384 H 156" strokeWidth="38" />
          <path d="M 196 200 L 328 365" strokeWidth="28" />
        </g>
      </g>
    </svg>
  )
}

function Wordmark({ tone, height }: { tone: Tone; height: number }) {
  const p = PALETTE[tone]
  const w = Math.max(WORD_WIDTH, TAG_WIDTH)
  // Block geometry matches build_logo.py: word baseline 120, rule 150, tagline baseline 212.
  return (
    <svg viewBox={`0 0 ${w} 228`} height={height} width={(height * w) / 228} role="img" aria-label="עשור רואות חשבון">
      <path transform={`translate(${w - WORD_WIDTH} 120)`} fill={p.word} d={WORD_PATH} />
      <rect x="0" y="150" width={w} height="3" fill={p.rule} />
      <path transform={`translate(${w - TAG_WIDTH} 212)`} fill={p.tag} d={TAG_PATH} />
    </svg>
  )
}
