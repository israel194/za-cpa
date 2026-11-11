import { useTranslation } from 'react-i18next'
import { useTestimonials } from '../data/content'

export default function Testimonials() {
  const { t } = useTranslation()
  const testimonials = useTestimonials()

  return (
    <section className="relative bg-surface py-20 md:py-28">
      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        <p className="eyebrow mb-5">{t('testimonials.eyebrow')}</p>
        <h2 className="display display-lg measure-tight">{t('testimonials.title')}</h2>

        {/* ציטוטים בטיפוגרפיה, בלי כרטיס וצל מסביב לכל אחד: מה שמבדיל
            ציטוט מטקסט רגיל הוא הגופן והמידה, לא מסגרת. */}
        <div className="mt-12 grid gap-x-16 gap-y-2 md:grid-cols-2">
          {testimonials.map((testimonial, idx) => (
            <figure key={idx} className="border-t border-[color:var(--color-rule)] py-8">
              <blockquote className="font-display text-[1.3rem] leading-[1.55] text-ink-800">
                {testimonial.quote}
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 text-sm">
                <span aria-hidden className="h-px w-7 bg-gold-400" />
                <span className="font-semibold text-primary">{testimonial.name}</span>
                <span className="text-muted-foreground">{testimonial.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
