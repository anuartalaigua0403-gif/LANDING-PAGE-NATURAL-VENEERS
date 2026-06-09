import Hero from '@/components/sections/Hero'
import Marquee from '@/components/sections/Marquee'
import Products from '@/components/sections/Products'
import Process from '@/components/sections/Process'
import Results from '@/components/sections/Results'
import Stats from '@/components/sections/Stats'
import About from '@/components/sections/About'
import FAQ from '@/components/sections/FAQ'
import CTA from '@/components/sections/CTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Products />
      <Process />
      <Results />
      <Stats />
      <About />
      <FAQ />
      <CTA />
    </>
  )
}
