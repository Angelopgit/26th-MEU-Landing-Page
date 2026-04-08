import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Pillars from './components/Pillars'
import Requirements from './components/Requirements'
import Playstyle from './components/Playstyle'
import CTA from './components/CTA'
import Footer from './components/Footer'
import Operations from './pages/Operations'
import { useScrollAnimation } from './hooks/useScrollAnimation'

function HomePage() {
  useScrollAnimation()

  return (
    <div className="min-h-screen bg-navy-950 relative">
      <div className="grid-pattern" />
      <div className="noise-overlay" />
      <Navbar />
      <Hero />
      <About />
      <div className="flex justify-center px-6">
        <div className="section-divider" />
      </div>
      <Pillars />
      <div className="flex justify-center px-6">
        <div className="section-divider" />
      </div>
      <Requirements />
      <div className="flex justify-center px-6">
        <div className="section-divider" />
      </div>
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
