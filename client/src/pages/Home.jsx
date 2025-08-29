import { lazy } from 'react'

const Hero = lazy(() => import('../components/Hero'))
const RadialOrbitalTimelineDemo = lazy(() => import('../components/Features'))
const NavbarDemo = lazy(() => import('../components/NavbarSection'))

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