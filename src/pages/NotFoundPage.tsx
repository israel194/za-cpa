import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export default function NotFoundPage() {
  const { t, i18n } = useTranslation()
  const isRtl = i18n.dir() === 'rtl'
  const Arrow = isRtl ? ArrowLeft : ArrowRight

  return (
    <section className="flex min-h-[80vh] items-center justify-center bg-cream-50 px-6 pt-32 pb-20">
      <div className="text-center">
        <div className="font-display text-7xl font-extrabold text-rose-gold-500 md:text-9xl">
          404
        </div>
        <h1 className="mt-4 font-display text-2xl font-extrabold text-ink-900 md:text-3xl">
          {t('notFound.title')}
        </h1>
        <p className="mt-3 text-lg text-ink-700">{t('notFound.subtitle')}</p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-rose-gold-500 px-7 py-3.5 text-sm font-bold text-white shadow-[0_12px_28px_-10px_rgba(189,95,124,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-rose-gold-600"
        >
          {t('notFound.backHome')}
          <Arrow size={16} />
        </Link>
      </div>
    </section>
  )
}
