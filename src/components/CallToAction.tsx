import { Link } from 'react-router-dom'
import { ArrowLeft, Phone } from 'lucide-react'

type Props = {
  title?: string
  subtitle?: string
}

export default function CallToAction({
  title = 'מוכנים להתחיל לעבוד יחד?',
  subtitle = 'פגישת היכרות ראשונה — ללא התחייבות. נכיר את הצרכים שלכם ונבנה תוכנית פעולה.',
}: Props) {
  return (
    <section className="relative overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-bl from-rose-gold-500 via-rose-gold-400 to-blush-300 p-10 text-center shadow-[0_30px_60px_-30px_rgba(183,110,121,0.6)] md:p-16">
          <div
            aria-hidden
            className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.4),transparent_45%),radial-gradient(circle_at_85%_75%,rgba(255,255,255,0.35),transparent_50%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -end-24 h-72 w-72 rounded-full bg-white/15 blur-3xl"
          />

          <div className="relative">
            <h2 className="font-display text-3xl font-extrabold leading-tight text-white md:text-5xl">
              {title}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-white/90 md:text-xl">
              {subtitle}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-rose-gold-600
                  shadow-[0_12px_30px_-10px_rgba(0,0,0,0.25)] transition-all duration-300
                  hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-10px_rgba(0,0,0,0.3)]"
              >
                קבעו פגישת ייעוץ
                <ArrowLeft
                  size={18}
                  className="transition-transform duration-300 group-hover:-translate-x-1"
                />
              </Link>
              <a
                href="tel:026567050"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/60 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
              >
                <Phone size={18} />
                התקשרו עכשיו
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
