import { Link } from 'react-router-dom'
import { ArrowLeft, Sparkles } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -start-32 h-96 w-96 rounded-full bg-peach-200/55 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -end-32 h-[28rem] w-[28rem] rounded-full bg-pink-200/45 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 start-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-rose-gold-300/30 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cream-50 via-blush-50 to-cream-50"
      />

      <div className="relative mx-auto max-w-5xl px-6 text-center md:px-10">
        <div
          className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-rose-gold-300/50 bg-white/60
          px-4 py-1.5 text-sm font-medium text-rose-gold-600 backdrop-blur-sm"
        >
          <Sparkles size={15} className="text-rose-gold-500" />
          משרד מוביל בליווי פיננסי אישי
        </div>

        <h1 className="font-display text-4xl font-extrabold leading-[1.15] tracking-tight text-ink-900 md:text-6xl lg:text-7xl">
          משרד רואי חשבון
          <br />
          <span className="bg-gradient-to-l from-burgundy-500 via-rose-gold-500 to-peach-400 bg-clip-text text-transparent">
            מוביל בישראל
          </span>
        </h1>

        <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-ink-700 md:text-xl">
          מקצועיות, שקיפות וליווי אישי להצלחה הפיננסית שלך.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-rose-gold-500 px-8 py-4 text-base font-semibold
              text-white shadow-[0_18px_40px_-12px_rgba(197,74,120,0.55)] transition-all duration-300
              hover:-translate-y-0.5 hover:bg-rose-gold-600 hover:shadow-[0_22px_48px_-12px_rgba(197,74,120,0.7)]"
          >
            קבעו פגישת ייעוץ
            <ArrowLeft
              size={18}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
          </Link>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-full border border-blush-200 bg-white/80 px-8 py-4
              text-base font-semibold text-ink-800 backdrop-blur-sm transition-all duration-300
              hover:border-rose-gold-400 hover:text-rose-gold-600"
          >
            לשירותים שלנו
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-4 border-t border-blush-200/70 pt-10 md:gap-8">
          {[
            { stat: '+25', label: 'שנות ניסיון' },
            { stat: '+500', label: 'לקוחות מרוצים' },
            { stat: '100%', label: 'מחויבות אישית' },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div className="font-display text-3xl font-extrabold text-rose-gold-500 md:text-4xl">
                {item.stat}
              </div>
              <div className="mt-1 text-sm font-medium text-ink-700 md:text-base">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
