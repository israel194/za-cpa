import { useTranslation } from 'react-i18next'
import PageHero from '../components/PageHero'
import Contact from '../components/Contact'
import { useSeo } from '../lib/seo'

export default function ContactPage() {
  useSeo('contact')
  const { t } = useTranslation()
  return (
    <>
      <PageHero
        eyebrow={t('contact.eyebrow')}
        title={t('contact.title')}
        subtitle={t('contact.subtitle')}
        crumbs={[{ to: '/contact', label: t('nav.contact') }]}
      />
      <Contact />
    </>
  )
}
