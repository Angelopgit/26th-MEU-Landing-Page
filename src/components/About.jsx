import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-panel', { opacity: 0, y: 40, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: '.about-panel', start: 'top 80%' } })
      gsap.from('.about-eyebrow', { opacity: 0, y: 20, duration: 0.6, scrollTrigger: { trigger: '.about-eyebrow', start: 'top 85%' } })
      gsap.from('.about-title', { opacity: 0, y: 30, duration: 0.7, delay: 0.1, scrollTrigger: { trigger: '.about-title', start: 'top 85%' } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} style={{ padding: '120px 24px', background: '#06091a', position: 'relative' }}>
      {/* Subtle bg texture */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at center, rgba(220,38,38,0.03) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
        <div className="about-eyebrow" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', letterSpacing: '0.3em', color: '#dc2626', textTransform: 'uppercase', marginBottom: 16 }}>
          WHO WE ARE
        </div>
        <h2 className="about-title" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', color: '#e8edf5', marginBottom: 48, letterSpacing: '-0.02em' }}>
          Who We Are
        </h2>

        {/* Divider */}
        <div style={{ width: 60, height: 1, background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.4), transparent)', margin: '0 auto 48px' }} />

        <div className="about-panel" style={{
          background: 'rgba(9,15,30,0.85)', backdropFilter: 'blur(12px)',
          border: '1px solid rgba(22,36,72,0.8)', borderRadius: 8, padding: '40px 48px',
          position: 'relative',
        }}>
          {/* Corner bracket top-left */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: 20, height: 20, borderTop: '2px solid rgba(212,175,55,0.3)', borderLeft: '2px solid rgba(212,175,55,0.3)' }} />
          {/* Corner bracket bottom-right */}
          <div style={{ position: 'absolute', bottom: 0, right: 0, width: 20, height: 20, borderBottom: '2px solid rgba(212,175,55,0.3)', borderRight: '2px solid rgba(212,175,55,0.3)' }} />
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', lineHeight: 1.8, color: '#94a3b8' }}>
            The <span style={{ color: '#dc2626', fontWeight: 600 }}>26th Marine Expeditionary Unit (SOC)</span> is a dedicated Arma Reforger realism unit built around structured tactical gameplay and authenticity — bringing players together in a cooperative environment that reflects the discipline and coordination of real-world military operations. Whether infantry, squad elements, or supporting roles, every member plays a critical part in the success of the mission. Since our launch we've opened our doors to PC, PS5 &amp; Xbox players who are ready to commit to a higher level of teamwork and tactical execution.
          </p>
        </div>
      </div>
    </section>
  )
}
