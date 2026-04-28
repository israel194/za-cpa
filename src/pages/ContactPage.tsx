import PageHero from '../components/PageHero'
import Contact from '../components/Contact'

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="צור קשר"
        title="נשמח לשמוע מכם"
        subtitle="השאירו פרטים, התקשרו, או שלחו הודעה ב-WhatsApp — נחזור אליכם בהקדם."
        crumbs={[{ to: '/contact', label: 'צור קשר' }]}
      />
      <Contact />
    </>
  )
}
