import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { BookOpen } from 'lucide-react'
import PageHero from '../components/PageHero'
import CallToAction from '../components/CallToAction'

export default function ArticlesPage() {
  const { t } = useTranslation()
  return (
    <>
      <PageHero
        eyebrow={t('articles.eyebrow')}
        title={t('articles.title')}
        subtitle={t('articles.subtitle')}
        crumbs={[{ to: '/articles', label: t('nav.articles') }]}
      />

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blush-100 text-rose-gold-500">
            <BookOpen size={28} />
          </div>
          <h2 className="font-display text-2xl font-extrabold text-ink-900 md:text-3xl">
            {t('articles.comingTitle')}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-700">
            {t('articles.comingText')}
          </p>
          <p className="mt-3 text-base text-ink-700">
            {t('articles.questionPrefix')}{' '}
            <Link
              to="/contact"
              className="font-semibold text-rose-gold-500 hover:text-rose-gold-600"
            >
              {t('articles.questionLink')}
            </Link>{' '}
            {t('articles.questionSuffix')}
          </p>
        </div>
      </section>

      <CallToAction />
    </>
  )
}
