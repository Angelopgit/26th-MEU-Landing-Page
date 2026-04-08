import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.hero-content', {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="home" ref={heroRef} style={{ position: 'relative', height: '100vh', minHeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      {/* YouTube video background */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <iframe
          src="https://www.youtube.com/embed/TlgtY4ZvDbE?autoplay=1&mute=1&loop=1&playlist=TlgtY4ZvDbE&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&disablekb=1&fs=0&iv_load_policy=3&start=60"
          style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '177.78vh', height: '100vh', minWidth: '100vw', minHeight: '56.25vw', pointerEvents: 'none' }}
          allow="autoplay; encrypted-media" frameBorder="0" tabIndex={-1} title="Background" />
        {/* Layered overlays */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(6,9,26,0.65)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(6,9,26,0.2) 0%, transparent 40%, rgba(6,9,26,0.8) 100%)' }} />
        <div className="scan-overlay" style={{ position: 'absolute', inset: 0 }} />
      </div>

      {/* Corner HUD decorations */}
      <div style={{ position: 'absolute', top: 80, left: 24, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.2em', color: 'rgba(22,36,72,0.8)', userSelect: 'none' }}>CLASS: RESTRICTED</div>
      <div style={{ position: 'absolute', top: 80, right: 24, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.2em', color: 'rgba(22,36,72,0.8)', userSelect: 'none' }}>26TH MEU (SOC)</div>
      <div style={{ position: 'absolute', bottom: 80, left: 24, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'rgba(22,36,72,0.8)', userSelect: 'none' }}>PERSCOM v2.0</div>
      <div style={{ position: 'absolute', bottom: 80, right: 24, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'rgba(22,36,72,0.8)', userSelect: 'none' }}>ALL ACCESS LOGGED</div>

      {/* Main content */}
      <div className="hero-content" style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 24px', maxWidth: 900, width: '100%' }}>
        {/* Logo with gold ring */}
        <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, ease: [0.16,1,0.3,1] }}
          style={{ display: 'inline-block', marginBottom: 40, position: 'relative' }}>
          {/* Ambient glow */}
          <div style={{ position: 'absolute', inset: -20, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
          {/* Outer ring */}
          <div style={{ position: 'absolute', inset: -3, borderRadius: '50%', border: '1px solid rgba(212,175,55,0.2)', pointerEvents: 'none' }} />
          <div className="logo-ring" style={{ width: 152, height: 152, borderRadius: '50%', overflow: 'hidden' }}>
            <img src="/logo.png" alt="26th MEU" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3.75rem)', color: '#e8edf5', lineHeight: 1.1, marginBottom: 16, letterSpacing: '-0.02em' }}>
          26th Marine Expeditionary Unit (SOC)
        </motion.h1>

        {/* Subtitle */}
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
          style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 'clamp(0.7rem, 1.5vw, 0.875rem)', letterSpacing: '0.35em', color: '#dc2626', textTransform: 'uppercase', marginBottom: 48, textShadow: '0 0 20px rgba(220,38,38,0.5)' }}>
          ARMA REFORGER REALISM UNIT
        </motion.p>

        {/* Divider */}
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.7 }}
          style={{ width: 120, height: 1, background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.5), transparent)', margin: '0 auto 48px' }} />

        {/* CTA Buttons */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.9 }}
          style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="https://discord.gg/26thmeu" target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 28px', background: '#5865F2', color: '#fff', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.875rem', letterSpacing: '0.05em', borderRadius: 4, textDecoration: 'none', transition: 'all 0.2s', border: 'none' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#4752C4'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#5865F2'; e.currentTarget.style.transform = 'translateY(0)' }}>
            <svg width="16" height="12" viewBox="0 0 71 55" fill="currentColor"><path d="M60.1 4.9A58.5 58.5 0 0045.4.2a.2.2 0 00-.2.1 40.8 40.8 0 00-1.8 3.7 54 54 0 00-16.2 0A37 37 0 0025.4.3a.2.2 0 00-.2-.1A58.4 58.4 0 0010.5 4.9a.2.2 0 00-.1.1C1.5 18.7-.9 32.2.3 45.5v.1a58.8 58.8 0 0017.7 9 .2.2 0 00.3-.1 42 42 0 003.6-5.9.2.2 0 00-.1-.3 38.8 38.8 0 01-5.5-2.6.2.2 0 010-.4l1.1-.9a.2.2 0 01.2 0 42 42 0 0035.5 0 .2.2 0 01.2 0l1.1.9a.2.2 0 010 .4 36.4 36.4 0 01-5.5 2.6.2.2 0 00-.1.3 47.2 47.2 0 003.6 5.9.2.2 0 00.2.1A58.6 58.6 0 0070.3 45.6v-.1C71.8 30.1 67.9 16.7 60.2 5a.2.2 0 00-.1-.1zM23.7 37.3c-3.5 0-6.4-3.2-6.4-7.2s2.8-7.2 6.4-7.2c3.6 0 6.5 3.3 6.4 7.2 0 4-2.8 7.2-6.4 7.2zm23.7 0c-3.5 0-6.4-3.2-6.4-7.2s2.8-7.2 6.4-7.2c3.6 0 6.5 3.3 6.4 7.2 0 4-2.8 7.2-6.4 7.2z"/></svg>
            JOIN DISCORD
          </a>
          <a href="/perscom"
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 28px', background: 'transparent', color: '#e8edf5', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.875rem', letterSpacing: '0.05em', borderRadius: 4, textDecoration: 'none', transition: 'all 0.2s', border: '1px solid rgba(220,38,38,0.5)' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(220,38,38,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'translateY(0)' }}>
            ACCESS PERSCOM
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.3em', color: 'rgba(148,163,184,0.5)', textTransform: 'uppercase' }}>SCROLL</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          style={{ width: 24, height: 36, border: '1px solid rgba(148,163,184,0.3)', borderRadius: 12, display: 'flex', justifyContent: 'center', paddingTop: 6 }}>
          <div style={{ width: 3, height: 8, background: 'rgba(148,163,184,0.5)', borderRadius: 2 }} />
        </motion.div>
      </motion.div>
    </section>
  )
}
