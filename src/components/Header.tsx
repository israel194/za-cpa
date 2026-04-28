import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'
import { services, sectors } from '../data/content'

type NavItem = {
  to?: string
  label: string
  children?: { to: string; label: string }[]
}

const navItems: NavItem[] = [
  {
    label: 'אודות',
    children: [
      { to: '/about', label: 'על המשרד' },
      { to: '/team', label: 'הצוות שלנו' },
    ],
  },
  {
    to: '/sectors',
    label: 'סקטורים',
    children: sectors.map((s) => ({
      to: `/sectors/${s.slug}`,
      label: s.title,
    })),
  },
  {
    to: '/services',
    label: 'שירותים',
    children: services.map((s) => ({
      to: `/services/${s.slug}`,
      label: s.title,
    })),
  },
  { to: '/articles', label: 'מאמרים' },
  { to: '/contact', label: 'צור קשר' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false)
    setMobileExpanded(null)
  }, [location.pathname])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-cream-50/90 backdrop-blur-md border-b border-blush-100 shadow-[0_1px_24px_rgba(183,110,121,0.06)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <Link
          to="/"
          className="flex items-baseline gap-2 font-display tracking-tight"
        >
          <span className="text-2xl font-extrabold text-rose-gold-500">עשור</span>
          <span className="hidden text-base font-medium text-ink-700 sm:inline">
            <span className="mx-1 text-rose-gold-300">|</span> רואי חשבון
          </span>
        </Link>

        <ul className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <li key={item.label} className="group relative">
              {item.children ? (
                <button
                  type="button"
                  className="flex items-center gap-1 text-[15px] font-medium text-ink-700 transition-colors hover:text-rose-gold-500"
                >
                  {item.label}
                  <ChevronDown
                    size={14}
                    className="transition-transform duration-200 group-hover:rotate-180"
                  />
                </button>
              ) : (
                <NavLink
                  to={item.to!}
                  className={({ isActive }) =>
                    `text-[15px] font-medium transition-colors hover:text-rose-gold-500 ${
                      isActive ? 'text-rose-gold-500' : 'text-ink-700'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              )}

              {item.children && (
                <div className="invisible absolute end-0 top-full z-50 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  <div className="min-w-[16rem] overflow-hidden rounded-2xl border border-blush-100 bg-white py-2 shadow-[0_24px_48px_-16px_rgba(183,110,121,0.25)]">
                    {item.to && (
                      <Link
                        to={item.to}
                        className="block border-b border-blush-100 px-5 py-3 text-sm font-semibold text-rose-gold-500 hover:bg-blush-50"
                      >
                        כל ה{item.label}
                      </Link>
                    )}
                    {item.children.map((child) => (
                      <Link
                        key={child.to}
                        to={child.to}
                        className="block px-5 py-2.5 text-sm font-medium text-ink-700 transition-colors hover:bg-blush-50 hover:text-rose-gold-500"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        <Link
          to="/contact"
          className="hidden rounded-full bg-rose-gold-500 px-5 py-2.5 text-sm font-semibold text-white
            shadow-[0_8px_24px_-8px_rgba(183,110,121,0.6)] transition-all duration-300
            hover:bg-rose-gold-600 hover:shadow-[0_12px_28px_-8px_rgba(183,110,121,0.7)] lg:inline-block"
        >
          קבעו פגישה
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-full p-2 text-ink-800 hover:bg-blush-100 lg:hidden"
          aria-label="פתיחת תפריט"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-blush-100 bg-cream-50/98 backdrop-blur-md lg:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {navItems.map((item) => (
              <li key={item.label}>
                {item.children ? (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setMobileExpanded((v) =>
                          v === item.label ? null : item.label
                        )
                      }
                      className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-base font-medium text-ink-700 hover:bg-blush-100"
                    >
                      {item.label}
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${
                          mobileExpanded === item.label ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {mobileExpanded === item.label && (
                      <ul className="mb-1 ms-4 border-s-2 border-blush-200 ps-3">
                        {item.to && (
                          <li>
                            <Link
                              to={item.to}
                              className="block rounded-lg px-3 py-2 text-sm font-semibold text-rose-gold-500 hover:bg-blush-50"
                            >
                              כל ה{item.label}
                            </Link>
                          </li>
                        )}
                        {item.children.map((child) => (
                          <li key={child.to}>
                            <Link
                              to={child.to}
                              className="block rounded-lg px-3 py-2 text-sm text-ink-700 hover:bg-blush-50 hover:text-rose-gold-500"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.to!}
                    className="block rounded-lg px-3 py-3 text-base font-medium text-ink-700 hover:bg-blush-100"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
            <li className="pt-3">
              <Link
                to="/contact"
                className="block rounded-full bg-rose-gold-500 px-5 py-3 text-center text-sm font-semibold text-white"
              >
                קבעו פגישה
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
