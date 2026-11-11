import { useTranslation } from 'react-i18next'
import PageHero from '../components/PageHero'
import Team from '../components/Team'
import CallToAction from '../components/CallToAction'
import { useSeo } from '../lib/seo'

export default function TeamPage() {
  useSeo('team')
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
      <Team heading={false} />
      <CallToAction
        title={t('cta.teamTitle')}
        subtitle={t('cta.teamSubtitle')}
      />
    </>
  )
}
