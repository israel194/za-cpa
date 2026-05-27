import type { ReactNode } from 'react'

type Props = {
  eyebrow?: string
  title: ReactNode
  lede?: ReactNode
  align?: 'start' | 'center'
  as?: 'h1' | 'h2' | 'h3'
  className?: string
}

export default function SectionHeading({
  eyebrow,
  title,
  lede,
  align = 'start',
  as: Tag = 'h2',
  className = '',
}: Props) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-start'
  return (
    <div className={`max-w-3xl ${alignClass} ${className}`}>
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
          {eyebrow}
        </p>
      )}
      <Tag className="font-display text-3xl font-semibold leading-tight text-primary sm:text-4xl md:text-5xl">
        {title}
      </Tag>
      {lede && (
        <p className="mt-5 text-base leading-relaxed text-foreground/80 sm:text-lg">
          {lede}
        </p>
      )}
    </div>
  )
}
