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
  default: { stone: '#6e1a2d', gold: '#a8894f', word: '#6e1a2d', rule: '#a8894f', tag: '#8a6a2f' },
  inverse: { stone: '#fbf7f4', gold: '#d9c08f', word: '#fbf7f4', rule: '#d9c08f', tag: '#d9c08f' },
}

/**
 * עשור רואי חשבון: ten stones (a decade, the tetractys) beside an outlined
 * Frank Ruhl Libre wordmark. Source of truth: brand/build_logo.py.
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

// Ten stones in a 4·3·2·1 staircase (1+2+3+4 = 10, as in עשור). The last
// stone of the tallest column is gold: the sum that closes the count.
const HEIGHTS = [4, 3, 2, 1]
const STONES = HEIGHTS.flatMap((h, col) =>
  Array.from({ length: h }, (_, row) => ({
    x: 9.25 + col * 26.5,
    y: 9.25 + (3 - row) * 26.5,
    gold: col === 0 && row === h - 1,
  }))
)

function Mark({ tone, size, className = '' }: { tone: Tone; size: number; className?: string }) {
  const p = PALETTE[tone]
  return (
    <svg viewBox="6 6 108 108" height={size} width={size} className={className} aria-hidden>
      {STONES.map(({ x, y, gold }) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="22" height="22" rx="2.2" fill={gold ? p.gold : p.stone} />
      ))}
    </svg>
  )
}

function Wordmark({ tone, height }: { tone: Tone; height: number }) {
  const p = PALETTE[tone]
  const w = Math.max(WORD_WIDTH, TAG_WIDTH)
  // Block geometry matches build_logo.py: word baseline 120, rule 150, tagline baseline 212.
  return (
    <svg viewBox={`0 0 ${w} 228`} height={height} width={(height * w) / 228} role="img" aria-label="עשור רואי חשבון">
      <path transform={`translate(${w - WORD_WIDTH} 120)`} fill={p.word} d={WORD_PATH} />
      <rect x="0" y="150" width={w} height="3" fill={p.rule} />
      <path transform={`translate(${w - TAG_WIDTH} 212)`} fill={p.tag} d={TAG_PATH} />
    </svg>
  )
}
