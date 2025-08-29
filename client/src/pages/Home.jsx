import { lazy } from 'react'
import { NavbarDemo } from '../components/NavbarSection'

const Hero = lazy(() => import('../components/Hero'))
const RadialOrbitalTimelineDemo = lazy(() => import('../components/Features'))

const Home = () => {
  return (
    <div>
      <NavbarDemo />
      <Hero />
      <RadialOrbitalTimelineDemo />
    </div>
  )
}

export default Home