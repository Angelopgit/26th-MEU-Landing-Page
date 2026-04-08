import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

export default function CTA() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cta-content > *', { opacity: 0, y: 30, duration: 0.6, stagger: 0.15, scrollTrigger: { trigger: '.cta-content', start: 'top 80%' } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} style={{ position: 'relative', padding: '120px 24px', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/cta-bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.2)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #06091a 0%, transparent 20%, transparent 80%, #06091a 100%)' }} />

      <div className="cta-content" style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', letterSpacing: '0.3em', color: '#dc2626', marginBottom: 16 }}>READY FOR DEPLOYMENT</div>
        <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#e8edf5', marginBottom: 40, letterSpacing: '-0.02em' }}>Ready to Deploy?</h2>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/apply" style={{ padding: '14px 36px', background: 'linear-gradient(135deg, #dc2626, #b91c1c)', color: '#fff', fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '0.875rem', letterSpacing: '0.1em', borderRadius: 4, textDecoration: 'none', boxShadow: '0 0 30px rgba(220,38,38,0.3)', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 40px rgba(220,38,38,0.5)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(220,38,38,0.3)' }}>
            APPLY NOW
          </Link>
          <a href="https://discord.gg/26thmeu" target="_blank" rel="noopener noreferrer" style={{ padding: '14px 36px', background: 'transparent', color: '#e8edf5', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.875rem', letterSpacing: '0.1em', borderRadius: 4, textDecoration: 'none', border: '1px solid rgba(148,163,184,0.3)', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(148,163,184,0.6)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(148,163,184,0.3)'; e.currentTarget.style.transform = 'translateY(0)' }}>
            JOIN DISCORD
          </a>
        </div>
      </div>
    </section>
  )
}
