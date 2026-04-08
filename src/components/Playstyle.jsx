import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Playstyle() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.playstyle-content', { opacity: 0, y: 40, duration: 0.8, scrollTrigger: { trigger: '.playstyle-content', start: 'top 80%' } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} style={{ position: 'relative', padding: '120px 24px', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/op-squad-flag.png)', backgroundSize: 'cover', backgroundPosition: 'center 30%', filter: 'brightness(0.15)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #06091a 0%, transparent 30%, transparent 70%, #06091a 100%)' }} />

      <div className="playstyle-content" style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', letterSpacing: '0.3em', color: '#dc2626', textTransform: 'uppercase', marginBottom: 16 }}>OUR APPROACH</div>
        <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#e8edf5', letterSpacing: '-0.03em', marginBottom: 20 }}>
          Serious Tone,<br /><span style={{ color: '#dc2626' }}>Relaxed</span> Milsim
        </h2>
        <div style={{ width: 60, height: 1, background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.4), transparent)', margin: '0 auto 24px' }} />
        <p style={{ fontFamily: 'Inter, sans-serif', fontStyle: 'italic', fontSize: '1.125rem', color: '#64748b', letterSpacing: '0.02em' }}>
          "Structured when it matters. Relaxed when it doesn't."
        </p>
      </div>
    </section>
  )
}
