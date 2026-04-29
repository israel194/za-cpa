import { useTranslation } from 'react-i18next'
import { Quote } from 'lucide-react'
import { useTestimonials } from '../data/content'

export default function Testimonials() {
  const { t, i18n } = useTranslation()
  const testimonials = useTestimonials()
  const isRtl = i18n.dir() === 'rtl'

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blush-50 to-cream-50 py-20 md:py-28">
      <div
        aria-hidden
        className={`pointer-events-none absolute -top-32 h-80 w-80 rounded-full bg-blush-200/40 blur-3xl ${
          isRtl ? '-end-24' : '-start-24'
        }`}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute -bottom-24 h-72 w-72 rounded-full bg-rose-gold-300/30 blur-3xl ${
          isRtl ? '-start-24' : '-end-24'
        }`}
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-block text-sm font-semibold uppercase tracking-[0.2em] text-rose-gold-500">
            {t('testimonials.eyebrow')}
          </div>
          <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-ink-900 md:text-5xl">
            {t('testimonials.title')}
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {testimonials.map((testimonial, idx) => (
            <figure
              key={idx}
              className="relative rounded-3xl border border-blush-100 bg-white p-8 shadow-[0_18px_48px_-28px_rgba(197,74,120,0.4)] md:p-10"
            >
              <Quote
                size={32}
                className={`absolute top-8 text-blush-200 ${
                  isRtl ? 'end-8' : 'start-8'
                }`}
                aria-hidden
              />
              <blockquote
                className={`relative text-lg leading-relaxed text-ink-800 ${
                  isRtl ? 'pe-12' : 'ps-12'
                }`}
              >
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-blush-100 pt-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-rose-gold-500 to-blush-400 font-display text-base font-bold text-white">
                  {testimonial.name
                    .split(' ')
                    .map((s) => s[0])
                    .join('')}
                </div>
                <div>
                  <div className="font-display font-bold text-ink-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-ink-700">{testimonial.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
