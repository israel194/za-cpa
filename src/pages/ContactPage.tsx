import { useTranslation } from 'react-i18next'
import PageHero from '../components/PageHero'
import Contact from '../components/Contact'

export default function ContactPage() {
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
