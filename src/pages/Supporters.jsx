import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

// ─── Config — update these when amounts change ───────────────────────────────
const MONTHLY_GOAL   = 80
const MONTHLY_RAISED = 52   // update each month
const PATREON_URL    = 'https://www.patreon.com/Cub26thmeu?utm_source=26thmeu_site&utm_medium=supporters_page&utm_campaign=support_cta'

const PCT = Math.min(Math.round((MONTHLY_RAISED / MONTHLY_GOAL) * 100), 100)

// ─── Animated counter ────────────────────────────────────────────────────────
function Counter({ to, prefix = '', suffix = '' }) {
  const ref      = useRef(null)
  const inView   = useInView(ref, { once: true, margin: '-80px' })
  const raw      = useMotionValue(0)
  const smoothed = useSpring(raw, { stiffness: 60, damping: 20 })

  useEffect(() => {
    if (inView) raw.set(to)
  }, [inView, to, raw])

  const displayRef = useRef(null)
  useEffect(() => {
    return smoothed.on('change', (v) => {
      if (displayRef.current) displayRef.current.textContent = `${prefix}${Math.round(v)}${suffix}`
    })
  }, [smoothed, prefix, suffix])

  return <span ref={ref}><span ref={displayRef}>{prefix}0{suffix}</span></span>
}

// ─── What funding covers ──────────────────────────────────────────────────────
const PERKS = [
  { icon: '🖥', label: 'Dedicated Server', desc: 'Private Arma Reforger server — always online, low latency' },
  { icon: '🎮', label: 'Mod Hosting',      desc: 'Workshop mods, custom assets, and mission files' },
  { icon: '🌐', label: 'Web Infrastructure', desc: 'PERSCOM, this site, and Discord bot hosting' },
  { icon: '🎖', label: 'Unit Resources',   desc: 'Training materials, SOP docs, and recruitment tools' },
]

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Supporters() {
  return (
    <div style={{ minHeight: '100vh', background: '#06091a', position: 'relative', overflowX: 'hidden' }}>
      <Navbar />

      {/* ── Hero ── */}
      <section style={{ position: 'relative', paddingTop: 140, paddingBottom: 80, textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(22,36,72,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(22,36,72,0.08) 1px, transparent 1px)', backgroundSize: '40px 40px', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 400, background: 'radial-gradient(ellipse, rgba(220,38,38,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', maxWidth: 800, margin: '0 auto', padding: '0 24px' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.25)', borderRadius: 2, marginBottom: 28 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#dc2626', display: 'inline-block', boxShadow: '0 0 6px #dc2626' }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.625rem', letterSpacing: '0.2em', color: '#dc2626' }}>SUPPORT THE UNIT</span>
            </div>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.1 }}
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#e8edf5', letterSpacing: '-0.02em', lineHeight: 1.1, margin: '0 0 20px' }}>
            Keep the 26th MEU<br />
            <span style={{ color: '#dc2626' }}>Combat Ready</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.0625rem', color: '#64748b', lineHeight: 1.7, maxWidth: 560, margin: '0 auto 40px' }}>
            We're 100% volunteer-run. Every dollar goes directly toward server costs, mod hosting, and the infrastructure that powers our operations.
          </motion.p>

          <motion.a initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
            href={PATREON_URL} target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 32px', background: '#dc2626', borderRadius: 4, fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '0.875rem', letterSpacing: '0.1em', color: '#fff', textDecoration: 'none', transition: 'background 0.2s, transform 0.15s', boxShadow: '0 0 24px rgba(220,38,38,0.3)' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#b91c1c'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#dc2626'; e.currentTarget.style.transform = 'translateY(0)' }}>
            <PatreonIcon />
            SUPPORT ON PATREON
          </motion.a>
        </div>
      </section>

      {/* ── Monthly Goal Bar ── */}
      <GoalBar />

      {/* ── What it funds ── */}
      <section style={{ padding: '80px 24px 100px', maxWidth: 1100, margin: '0 auto' }}>
        <SectionLabel>WHERE YOUR SUPPORT GOES</SectionLabel>
        <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: '#e8edf5', margin: '12px 0 48px', letterSpacing: '-0.01em' }}>
          Keeping the lights on
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginBottom: 48 }}>
          {PERKS.map((p, i) => (
            <motion.div key={p.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.4, delay: i * 0.08 }}
              style={{ padding: '28px 24px', background: 'rgba(14,20,44,0.6)', border: '1px solid rgba(22,36,72,0.7)', borderRadius: 6 }}>
              <div style={{ fontSize: '1.75rem', marginBottom: 14 }}>{p.icon}</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.9375rem', color: '#e8edf5', marginBottom: 8 }}>{p.label}</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8125rem', color: '#475569', lineHeight: 1.6 }}>{p.desc}</div>
            </motion.div>
          ))}
        </div>

        {/* Final CTA */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ textAlign: 'center' }}>
          <a href={PATREON_URL} target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 36px', background: '#dc2626', borderRadius: 4, fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '0.875rem', letterSpacing: '0.1em', color: '#fff', textDecoration: 'none', transition: 'background 0.2s, transform 0.15s', boxShadow: '0 0 24px rgba(220,38,38,0.25)' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#b91c1c'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#dc2626'; e.currentTarget.style.transform = 'translateY(0)' }}>
            <PatreonIcon />
            SUPPORT ON PATREON
          </a>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8125rem', color: '#334155', marginTop: 14 }}>
            patreon.com/Cub26thmeu — monthly or one-time, every bit helps.
          </p>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}

// ─── Goal Bar ─────────────────────────────────────────────────────────────────
function GoalBar() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.section ref={ref} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      style={{ maxWidth: 780, margin: '0 auto 16px', padding: '0 24px 60px' }}>
      <div style={{ padding: '36px 40px', background: 'rgba(14,20,44,0.7)', border: '1px solid rgba(22,36,72,0.8)', borderRadius: 8, backdropFilter: 'blur(8px)' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.625rem', letterSpacing: '0.2em', color: '#dc2626', marginBottom: 6 }}>MONTHLY OPERATIONS FUND</div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '1.5rem', color: '#e8edf5' }}>
              $<Counter to={MONTHLY_RAISED} /> <span style={{ fontSize: '1rem', color: '#475569', fontWeight: 400 }}>of ${MONTHLY_GOAL} / mo</span>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', color: PCT >= 100 ? '#22c55e' : '#d4af37', fontWeight: 700 }}>{PCT}%</div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: '#475569', marginTop: 2 }}>funded this month</div>
          </div>
        </div>

        <div style={{ height: 10, background: 'rgba(22,36,72,0.9)', borderRadius: 5, overflow: 'hidden', marginBottom: 16 }}>
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: `${PCT}%` } : { width: 0 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            style={{ height: '100%', borderRadius: 5, background: 'linear-gradient(to right, #b91c1c, #dc2626, #ef4444)', boxShadow: '0 0 12px rgba(220,38,38,0.5)' }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 28 }}>
          {[25, 50, 75, 100].map(m => (
            <div key={m} style={{ textAlign: 'center' }}>
              <div style={{ width: 1, height: 6, background: PCT >= m ? '#dc2626' : 'rgba(22,36,72,0.8)', margin: '0 auto 4px' }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.5625rem', color: PCT >= m ? '#dc2626' : '#1e3a5f', letterSpacing: '0.1em' }}>{m}%</span>
            </div>
          ))}
        </div>

        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: '#334155', textAlign: 'center', margin: 0 }}>
          Goal resets on the 1st of each month — recurring supporters keep us consistent.
        </p>
      </div>
    </motion.section>
  )
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
      <div style={{ width: 24, height: 1, background: '#dc2626' }} />
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.625rem', letterSpacing: '0.2em', color: '#dc2626' }}>{children}</span>
    </div>
  )
}

function PatreonIcon({ size = 16, color = '#fff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
      <circle cx="14.5" cy="9.5" r="6.5" />
      <rect x="3" y="3" width="3.5" height="18" />
    </svg>
  )
}
