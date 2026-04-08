import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    setMobileOpen(false)
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 300)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        transition: 'background 0.3s ease, backdrop-filter 0.3s ease, border-color 0.3s ease',
        background: scrolled ? 'rgba(6,9,26,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(22,36,72,0.8)' : '1px solid transparent',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo + Name */}
        <button onClick={() => scrollTo('home')} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 'none', cursor: 'pointer' }}>
          <motion.img whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }} src="/logo.png" alt="26th MEU" style={{ width: 32, height: 32, borderRadius: '50%' }} />
          <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#dc2626', letterSpacing: '0.05em' }}>26th MEU</span>
        </button>

        {/* Desktop nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="hidden-mobile">
          {[['HOME','home'],['ABOUT','about'],['JOIN','join']].map(([label, id]) => (
            <button key={id} onClick={() => scrollTo(id)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '0.75rem', letterSpacing: '0.15em', color: '#94a3b8', padding: '8px 12px', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = '#e8edf5'}
              onMouseLeave={e => e.target.style.color = '#94a3b8'}
            >{label}</button>
          ))}
          <Link to="/operations"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '0.75rem', letterSpacing: '0.15em', color: location.pathname === '/operations' ? '#dc2626' : '#94a3b8', padding: '8px 12px', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = '#e8edf5'}
            onMouseLeave={e => e.target.style.color = location.pathname === '/operations' ? '#dc2626' : '#94a3b8'}
          >OPERATIONS</Link>
          <a href="/perscom" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '0.75rem', letterSpacing: '0.15em', color: '#94a3b8', padding: '8px 12px', textDecoration: 'none', marginLeft: 8, background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.3)', borderRadius: 4, transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(220,38,38,0.2)'; e.currentTarget.style.color = '#e8edf5' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(220,38,38,0.1)'; e.currentTarget.style.color = '#94a3b8' }}
          >PERSCOM</a>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMobileOpen(v => !v)} className="show-mobile"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, color: '#94a3b8' }}
          aria-label="Toggle menu"
        >
          <div style={{ width: 20, height: 14, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            {[0,1,2].map(i => (
              <motion.span key={i} animate={mobileOpen ? (i===1 ? {opacity:0,scaleX:0} : i===0 ? {rotate:45,y:6} : {rotate:-45,y:-6}) : {rotate:0,y:0,opacity:1,scaleX:1}}
                style={{ display: 'block', height: 2, background: '#94a3b8', borderRadius: 2, transformOrigin: 'center' }} />
            ))}
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}}
            style={{ background: 'rgba(6,9,26,0.97)', borderTop: '1px solid rgba(22,36,72,0.8)', overflow: 'hidden', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 4 }}>
            {[['HOME','home'],['ABOUT','about'],['JOIN','join']].map(([label,id]) => (
              <button key={id} onClick={() => scrollTo(id)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '0.875rem', letterSpacing: '0.12em', color: '#94a3b8', padding: '12px 0', textAlign: 'left' }}>
                {label}
              </button>
            ))}
            <Link to="/operations" onClick={() => setMobileOpen(false)} style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '0.875rem', letterSpacing: '0.12em', color: '#94a3b8', padding: '12px 0', textDecoration: 'none' }}>OPERATIONS</Link>
            <a href="/perscom" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '0.875rem', letterSpacing: '0.12em', color: '#dc2626', padding: '12px 0', textDecoration: 'none' }}>PERSCOM</a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 768px) { .hidden-mobile { display: flex !important; } .show-mobile { display: none !important; } }
        @media (max-width: 767px) { .hidden-mobile { display: none !important; } .show-mobile { display: block !important; } }
      `}</style>
    </motion.nav>
  )
}
