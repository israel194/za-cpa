import type { ReactNode } from 'react'

type Props = {
  left: ReactNode
  right: ReactNode
  /** Visually flip which column appears first. Useful when `right` is the "media" column. */
  reverse?: boolean
  /** Vertical alignment of the two columns. */
  align?: 'start' | 'center'
  className?: string
}

/**
 * Editorial two-column layout: text + media. Stacks vertically below `lg`.
 * `reverse` swaps visual order without touching DOM (a11y-safe).
 */
export default function EditorialSplit({
  left,
  right,
  reverse = false,
  align = 'center',
  className = '',
}: Props) {
  const alignClass = align === 'center' ? 'items-center' : 'items-start'
  return (
    <div
      className={`grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] lg:gap-16 ${alignClass} ${className}`}
    >
      <div className={reverse ? 'lg:order-2' : ''}>{left}</div>
      <div className={reverse ? 'lg:order-1' : ''}>{right}</div>
    </div>
  )
}
