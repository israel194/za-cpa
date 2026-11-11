import HeroCinematic from '../components/HeroCinematic'
import ActivityAreas from '../components/ActivityAreas'
import WhyUs from '../components/WhyUs'
import Engagement from '../components/Engagement'
import Process from '../components/Process'
import Sectors from '../components/Sectors'
import Testimonials from '../components/Testimonials'
import CallToAction from '../components/CallToAction'
import { useSeo } from '../lib/seo'

export default function Home() {
  useSeo('home')
  return (
    <>
      <HeroCinematic />
      {/* שורת התגים שהייתה כאן חזרה על שני הנתונים שכבר מופיעים בראש העמוד
          (12 שנים, 250 לקוחות), ושני הנותרים הם הצהרות תאימות שמקומן בתחתית. */}
      <ActivityAreas />
      <WhyUs />
      <Engagement />
      <Process />
      <Sectors variant="full" />
      <Testimonials />
      <CallToAction />
    </>
  )
}
