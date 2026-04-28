import PageHero from '../components/PageHero'
import Sectors from '../components/Sectors'
import CallToAction from '../components/CallToAction'

export default function SectorsPage() {
  return (
    <>
      <PageHero
        eyebrow="סקטורים"
        title="פתרונות לכל סוג של לקוח"
        subtitle={'לכל לקוח עולם משלו — חברות, מלכ"רים, עצמאים ושכירים. אנחנו מתמחים בניואנסים של כל סקטור.'}
        crumbs={[{ to: '/sectors', label: 'סקטורים' }]}
      />
      <Sectors variant="full" />
      <CallToAction />
    </>
  )
}
