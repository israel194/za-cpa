import { BookOpen } from 'lucide-react'
import PageHero from '../components/PageHero'
import CallToAction from '../components/CallToAction'

export default function ArticlesPage() {
  return (
    <>
      <PageHero
        eyebrow="תוכן וידע"
        title="מאמרים ומדריכים"
        subtitle="חומרי קריאה מקצועיים בתחומי המס, החשבונאות והייעוץ העסקי — מתעדכנים באופן שוטף."
        crumbs={[{ to: '/articles', label: 'מאמרים' }]}
      />

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blush-100 text-rose-gold-500">
            <BookOpen size={28} />
          </div>
          <h2 className="font-display text-2xl font-extrabold text-ink-900 md:text-3xl">
            התוכן בדרך
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-700">
            אנחנו עובדים על ספריית מאמרים ומדריכים מקצועיים בנושאי מיסוי,
            ביקורת, ייעוץ עסקי ומקרקעין. בקרוב כאן.
          </p>
          <p className="mt-3 text-base text-ink-700">
            יש שאלה ספציפית בינתיים?{' '}
            <a
              href="/contact"
              className="font-semibold text-rose-gold-500 hover:text-rose-gold-600"
            >
              צרו איתנו קשר
            </a>{' '}
            — נשמח לעזור.
          </p>
        </div>
      </section>

      <CallToAction />
    </>
  )
}
