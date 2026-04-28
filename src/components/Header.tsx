import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '#about', label: 'אודות' },
  { href: '#services', label: 'שירותים' },
  { href: '#team', label: 'הצוות שלנו' },
  { href: '#contact', label: 'צור קשר' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-cream-50/85 backdrop-blur-md border-b border-blush-100 shadow-[0_1px_24px_rgba(183,110,121,0.06)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <a
          href="#top"
          className="flex items-baseline gap-2 font-display tracking-tight"
        >
          <span className="text-2xl font-extrabold text-rose-gold-500">עשור</span>
          <span className="hidden text-base font-medium text-ink-700 sm:inline">
            <span className="mx-1 text-rose-gold-300">|</span> רואי חשבון
          </span>
        </a>

        <ul className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative text-[15px] font-medium text-ink-700 transition-colors hover:text-rose-gold-500
                  after:absolute after:-bottom-1.5 after:start-0 after:h-px after:w-0 after:bg-rose-gold-500
                  after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden rounded-full bg-rose-gold-500 px-5 py-2.5 text-sm font-semibold text-white
            shadow-[0_8px_24px_-8px_rgba(183,110,121,0.6)] transition-all duration-300
            hover:bg-rose-gold-600 hover:shadow-[0_12px_28px_-8px_rgba(183,110,121,0.7)] md:inline-block"
        >
          קבעו פגישה
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-full p-2 text-ink-800 hover:bg-blush-100 md:hidden"
          aria-label="פתיחת תפריט"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-blush-100 bg-cream-50/95 backdrop-blur-md md:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2 text-base font-medium text-ink-700 hover:bg-blush-100"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="block rounded-full bg-rose-gold-500 px-5 py-3 text-center text-sm font-semibold text-white"
              >
                קבעו פגישה
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
