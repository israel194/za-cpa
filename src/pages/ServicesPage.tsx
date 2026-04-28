import PageHero from '../components/PageHero'
import Services from '../components/Services'
import CallToAction from '../components/CallToAction'

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="תחומי התמחות"
        title="השירותים שלנו"
        subtitle="מגוון רחב של פתרונות פיננסיים — ביקורת, חשבות, מיסוי, ייעוץ עסקי, והתמחות ייחודית במקרקעין והתחדשות עירונית."
        crumbs={[{ to: '/services', label: 'שירותים' }]}
      />
      <Services />
      <CallToAction />
    </>
  )
}
