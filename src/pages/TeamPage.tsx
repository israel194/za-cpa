import PageHero from '../components/PageHero'
import Team from '../components/Team'
import CallToAction from '../components/CallToAction'

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="הצוות שלנו"
        title="הצוות המקצועי"
        subtitle="צוות מנוסה, אכפתי ומחויב, שעומד לרשותכם בכל שלב של הדרך."
        crumbs={[
          { to: '/about', label: 'אודות' },
          { to: '/team', label: 'הצוות שלנו' },
        ]}
      />
      <Team />
      <CallToAction title="רוצים לעבוד איתנו?" subtitle="צרו איתנו קשר ונחזור אליכם להיכרות אישית." />
    </>
  )
}
