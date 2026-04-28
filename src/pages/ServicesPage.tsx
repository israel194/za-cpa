import { useTranslation } from 'react-i18next'
import PageHero from '../components/PageHero'
import Services from '../components/Services'
import CallToAction from '../components/CallToAction'

export default function ServicesPage() {
  const { t } = useTranslation()
  return (
    <>
      <PageHero
        eyebrow={t('services.eyebrow')}
        title={t('services.title')}
        subtitle={t('services.subtitle')}
        crumbs={[{ to: '/services', label: t('nav.services') }]}
      />
      <Services />
      <CallToAction />
    </>
  )
}
