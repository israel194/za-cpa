import { useTranslation } from 'react-i18next'
import PageHero from '../components/PageHero'
import Team from '../components/Team'
import CallToAction from '../components/CallToAction'

export default function TeamPage() {
  const { t } = useTranslation()
  return (
    <>
      <PageHero
        eyebrow={t('team.eyebrow')}
        title={t('team.title')}
        subtitle={t('team.subtitle')}
        crumbs={[
          { to: '/about', label: t('nav.about') },
          { to: '/team', label: t('nav.team') },
        ]}
      />
      <Team />
      <CallToAction
        title={t('cta.teamTitle')}
        subtitle={t('cta.teamSubtitle')}
      />
    </>
  )
}
