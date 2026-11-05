import HeroCinematic from '../components/HeroCinematic'
import ActivityAreas from '../components/ActivityAreas'
import WhyUs from '../components/WhyUs'
import Engagement from '../components/Engagement'
import Process from '../components/Process'
import Sectors from '../components/Sectors'
import Testimonials from '../components/Testimonials'
import CallToAction from '../components/CallToAction'
import TrustBadgeRow from '../components/ui/TrustBadgeRow'

export default function Home() {
  return (
    <>
      <HeroCinematic />
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <TrustBadgeRow />
        </div>
      </section>
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
