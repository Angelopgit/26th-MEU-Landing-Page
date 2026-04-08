import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Pillars from './components/Pillars'
import Gallery from './components/Gallery'
import Requirements from './components/Requirements'
import Playstyle from './components/Playstyle'
import CTA from './components/CTA'
import Footer from './components/Footer'
import Operations from './pages/Operations'

gsap.registerPlugin(ScrollTrigger)

function HomePage() {
  useEffect(() => {
    const lenis = new Lenis()
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#06091a', position: 'relative', overflowX: 'hidden' }}>
      <Navbar />
      <Hero />
      <About />
      <Pillars />
      <Gallery />
      <Requirements />
      <Playstyle />
      <CTA />
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/operations" element={<Operations />} />
    </Routes>
  )
}
