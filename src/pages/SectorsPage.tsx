import { useTranslation } from 'react-i18next'
import PageHero from '../components/PageHero'
import Sectors from '../components/Sectors'
import CallToAction from '../components/CallToAction'

export default function SectorsPage() {
  const { t } = useTranslation()
  return (
    <>
      <PageHero
        eyebrow={t('sectors.eyebrow')}
        title={t('sectors.title')}
        subtitle={t('sectors.subtitleLong')}
        crumbs={[{ to: '/sectors', label: t('nav.sectors') }]}
      />
      <Sectors variant="full" />
      <CallToAction />
    </>
  )
}
