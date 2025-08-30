
import { lazy } from 'react'

const Hero = lazy(() => import('../../components/Hero'))
const NavbarDemo = lazy(() => import('../../components/NavbarSection'))
const RuixenSection = lazy(() => import('../../components/Features'))
const LandingAccordionItem = lazy(() => import('../../components/About'))
const Testimonials = lazy(() => import('../../components/Testimonial'))
const PricingTable = lazy(() => import('../../components/Pricing'))
const Footerdemo = lazy(() => import('../../components/Footer'))

const Home = () => {
  return (
    <div >
      <NavbarDemo />
      <Hero />
      <LandingAccordionItem/>
      <RuixenSection/>
      <Testimonials/>
      <PricingTable/>
      <Footerdemo/>
    </div>
  )
}

export default Home