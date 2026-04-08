import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
)

const REQS = [
  'Own Arma Reforger (PC, PS5, or Xbox)',
  'Willingness to participate in operations',
  'Ability to follow structure and teamwork',
  'Open to learning tactical gameplay',
  'Maintain respectful conduct',
]

export default function Requirements() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.req-item', { opacity: 0, x: -20, duration: 0.5, stagger: 0.1, scrollTrigger: { trigger: '.req-list', start: 'top 80%' } })
      gsap.from('.req-heading', { opacity: 0, y: 30, duration: 0.7, scrollTrigger: { trigger: '.req-heading', start: 'top 85%' } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="join" ref={sectionRef} style={{ padding: '120px 24px', background: '#06091a', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 50% 50%, rgba(220,38,38,0.04) 0%, transparent 60%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
        <div className="req-heading">
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', letterSpacing: '0.3em', color: '#dc2626', textTransform: 'uppercase', marginBottom: 12 }}>ENLISTMENT</div>
          <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', color: '#e8edf5', marginBottom: 48, letterSpacing: '-0.02em' }}>Requirements</h2>
        </div>

        <div className="req-list" style={{
          background: 'rgba(9,15,30,0.85)', backdropFilter: 'blur(12px)',
          border: '1px solid rgba(22,36,72,0.8)', borderRadius: 8, padding: '40px',
          marginBottom: 40, textAlign: 'left', position: 'relative',
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: 20, height: 20, borderTop: '2px solid rgba(212,175,55,0.3)', borderLeft: '2px solid rgba(212,175,55,0.3)' }} />
          <div style={{ position: 'absolute', bottom: 0, right: 0, width: 20, height: 20, borderBottom: '2px solid rgba(212,175,55,0.3)', borderRight: '2px solid rgba(212,175,55,0.3)' }} />

          {REQS.map((req, i) => (
            <div key={i} className="req-item" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', borderBottom: i < REQS.length - 1 ? '1px solid rgba(22,36,72,0.5)' : 'none', transition: 'color 0.2s', cursor: 'default' }}
              onMouseEnter={e => { const s = e.currentTarget.querySelector('span'); if (s) s.style.color = '#e8edf5' }}
              onMouseLeave={e => { const s = e.currentTarget.querySelector('span'); if (s) s.style.color = '#64748b' }}
            >
              <CheckIcon />
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9375rem', color: '#64748b', transition: 'color 0.2s' }}>{req}</span>
            </div>
          ))}
        </div>

        <Link to="/apply"
          style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '14px 48px', background: 'linear-gradient(135deg, #dc2626, #b91c1c)', color: '#fff', fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '0.875rem', letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: 4, textDecoration: 'none', transition: 'all 0.3s', boxShadow: '0 0 30px rgba(220,38,38,0.3)', position: 'relative', overflow: 'hidden' }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 40px rgba(220,38,38,0.4)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(220,38,38,0.3)' }}
        >
          APPLY NOW
        </Link>
      </div>
    </section>
  )
}
