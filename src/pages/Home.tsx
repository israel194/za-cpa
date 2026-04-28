import Hero from '../components/Hero'
import Sectors from '../components/Sectors'
import Services from '../components/Services'
import WhyUs from '../components/WhyUs'
import Testimonials from '../components/Testimonials'
import CallToAction from '../components/CallToAction'

export default function Home() {
  return (
    <>
      <Hero />
      <WhyUs />
      <Services />
      <Sectors />
      <Testimonials />
      <CallToAction />
    </>
  )
}
