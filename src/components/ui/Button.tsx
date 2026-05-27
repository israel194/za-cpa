import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Variant = 'primary' | 'secondary' | 'ghost' | 'gold'
type Size = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50'

const variants: Record<Variant, string> = {
  primary:
    'bg-primary text-white shadow-[0_8px_24px_-12px_rgba(131,24,67,0.45)] hover:bg-primary/90 hover:shadow-[0_10px_28px_-10px_rgba(161,98,7,0.45)]',
  secondary:
    'border border-primary/30 bg-surface text-primary hover:border-primary hover:bg-primary/5',
  ghost: 'text-primary hover:bg-primary/5',
  gold:
    'bg-accent text-white shadow-[0_8px_24px_-12px_rgba(161,98,7,0.45)] hover:bg-accent/90',
}

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

type CommonProps = {
  variant?: Variant
  size?: Size
  children: ReactNode
  className?: string
}

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> & {
    as?: 'button'
  }

type ButtonAsAnchor = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children' | 'href'> & {
    as: 'a'
    href: string
  }

type ButtonAsLink = CommonProps & {
  as: 'link'
  to: string
}

export type ButtonProps = ButtonAsButton | ButtonAsAnchor | ButtonAsLink

export default function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', className = '', children } = props
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`

  if (props.as === 'link') {
    const { to } = props
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }
  if (props.as === 'a') {
    const { as: _as, variant: _v, size: _s, className: _c, children: _ch, ...rest } = props
    void _as; void _v; void _s; void _c; void _ch
    return (
      <a className={classes} {...rest}>
        {children}
      </a>
    )
  }
  const { as: _as, variant: _v, size: _s, className: _c, children: _ch, ...rest } = props
  void _as; void _v; void _s; void _c; void _ch
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  )
}
