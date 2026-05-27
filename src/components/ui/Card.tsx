import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type CardProps = {
  children: ReactNode
  className?: string
  as?: 'div' | 'article' | 'section'
}

export function Card({ children, className = '', as: Tag = 'div' }: CardProps) {
  return (
    <Tag
      className={`rounded-3xl border border-border bg-surface p-7 shadow-[0_18px_40px_-28px_rgba(131,24,67,0.25)] transition hover:shadow-[0_24px_50px_-22px_rgba(131,24,67,0.35)] ${className}`}
    >
      {children}
    </Tag>
  )
}

type ServiceCardProps = {
  title: string
  summary?: string
  href: string
  icon?: ReactNode
}

export function ServiceCard({ title, summary, href, icon }: ServiceCardProps) {
  return (
    <Link
      to={href}
      className="group block rounded-3xl border border-border bg-surface p-7 shadow-[0_18px_40px_-28px_rgba(131,24,67,0.25)] transition hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_24px_50px_-22px_rgba(131,24,67,0.35)]"
    >
      {icon && (
        <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          {icon}
        </div>
      )}
      <h3 className="font-display text-xl font-semibold text-primary group-hover:text-accent">
        {title}
      </h3>
      {summary && (
        <p className="mt-3 text-sm leading-relaxed text-foreground/75">{summary}</p>
      )}
      <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent">
        <span className="border-b border-accent/40 pb-0.5 group-hover:border-accent">
          קראו עוד
        </span>
      </span>
    </Link>
  )
}

type SectorCardProps = ServiceCardProps

export function SectorCard(props: SectorCardProps) {
  return <ServiceCard {...props} />
}

type TestimonialCardProps = {
  quote: string
  attribution: string
}

export function TestimonialCard({ quote, attribution }: TestimonialCardProps) {
  return (
    <figure className="relative rounded-3xl border border-border bg-surface p-8 shadow-[0_18px_40px_-28px_rgba(131,24,67,0.25)]">
      <span
        aria-hidden
        className="absolute -top-4 start-6 font-display text-6xl leading-none text-accent/40"
      >
        “
      </span>
      <blockquote className="font-display text-lg leading-relaxed text-foreground sm:text-xl">
        {quote}
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-4 text-sm text-muted-foreground">
        <span className="inline-block h-1 w-8 bg-accent" />
        <span className="font-medium tracking-wide text-primary/80">{attribution}</span>
      </figcaption>
    </figure>
  )
}

type CredentialBadgeProps = {
  icon?: ReactNode
  label: string
  value?: string
}

export function CredentialBadge({ icon, label, value }: CredentialBadgeProps) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface/70 px-4 py-3 backdrop-blur-sm">
      {icon && (
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 text-accent">
          {icon}
        </span>
      )}
      <div className="text-start">
        {value && (
          <p className="font-display text-lg font-semibold leading-tight text-primary">
            {value}
          </p>
        )}
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </p>
      </div>
    </div>
  )
}
