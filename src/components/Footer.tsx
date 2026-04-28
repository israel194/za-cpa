import { Link } from 'react-router-dom'
import { MapPin, Mail, Phone, Globe } from 'lucide-react'
import { services, sectors } from '../data/content'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-blush-100 bg-ink-900 text-cream-100">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-2 md:px-10 lg:grid-cols-4">
        <div>
          <div className="font-display tracking-tight">
            <div className="text-3xl font-extrabold text-rose-gold-300">עשור</div>
            <div className="mt-1 text-base font-medium text-white/80">
              רואי חשבון
            </div>
          </div>
          <p className="mt-4 max-w-xs leading-relaxed text-cream-200/80">
            משרד רואי חשבון מוביל בישראל. מקצועיות, שקיפות וליווי אישי.
          </p>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-rose-gold-300">
            שירותים
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-cream-200/80">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  to={`/services/${s.slug}`}
                  className="transition-colors hover:text-white"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-rose-gold-300">
            סקטורים
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-cream-200/80">
            {sectors.map((s) => (
              <li key={s.slug}>
                <Link
                  to={`/sectors/${s.slug}`}
                  className="transition-colors hover:text-white"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-rose-gold-300">
            צור קשר
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-cream-200/80">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 flex-none text-rose-gold-300" />
              <span>
                רח' נחום חפצדי 17, ירושלים
                <br />
                מגדל רם, קומה 11
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="flex-none text-rose-gold-300" />
              <a
                href="tel:026567050"
                className="transition-colors hover:text-white"
                dir="ltr"
              >
                02-6567050
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="flex-none text-rose-gold-300" />
              <a
                href="mailto:office@za-cpa.com"
                className="transition-colors hover:text-white"
              >
                office@za-cpa.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Globe size={16} className="flex-none text-rose-gold-300" />
              <a
                href="https://www.za-cpa.com"
                className="transition-colors hover:text-white"
              >
                www.za-cpa.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-6 text-sm text-cream-200/60 md:flex-row md:px-10">
          <p>© {year} עשור - רואי חשבון. כל הזכויות שמורות.</p>
          <div className="flex gap-6">
            <Link to="/about" className="transition-colors hover:text-white">
              אודות
            </Link>
            <Link to="/contact" className="transition-colors hover:text-white">
              צור קשר
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
