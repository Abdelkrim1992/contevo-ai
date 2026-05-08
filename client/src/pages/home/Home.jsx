
import Hero from '../../components/Hero'
import NavbarDemo from '../../components/NavbarSection'
import RuixenSection from '../../components/Features'
import LandingAccordionItem from '../../components/About'
import Testimonials from '../../components/Testimonial'
import PricingTable from '../../components/Pricing'
import Footerdemo from '../../components/Footer'

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