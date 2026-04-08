import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ background: '#06091a', borderTop: '1px solid rgba(22,36,72,0.6)', padding: '48px 24px 32px' }}>
      {/* Top glow line */}
      <div style={{ width: '100%', height: 1, background: 'linear-gradient(to right, transparent, rgba(220,38,38,0.3), transparent)', marginBottom: 48 }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 48, marginBottom: 48 }}>
        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <img src="/logo.png" alt="26th MEU" style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(212,175,55,0.3)' }} />
            <div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, color: '#e8edf5', fontSize: '0.875rem' }}>26th MEU (SOC)</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.625rem', letterSpacing: '0.2em', color: '#dc2626' }}>ARMA REFORGER</div>
            </div>
          </div>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8125rem', color: '#475569', lineHeight: 1.6 }}>Dedicated Arma Reforger realism unit. Structured ops, real teamwork.</p>
        </div>

        {/* Navigation */}
        <div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.625rem', letterSpacing: '0.2em', color: '#dc2626', marginBottom: 20, textTransform: 'uppercase' }}>Navigation</div>
          {[['Home','#home'],['About','#about'],['Join','#join']].map(([label, href]) => (
            <a key={label} href={href} style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', color: '#475569', textDecoration: 'none', marginBottom: 10, transition: 'color 0.2s' }}
              onMouseEnter={e => { e.target.style.color = '#94a3b8' }}
              onMouseLeave={e => { e.target.style.color = '#475569' }}
            >{label}</a>
          ))}
          <Link to="/operations" style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', color: '#475569', textDecoration: 'none', marginBottom: 10, transition: 'color 0.2s' }}
            onMouseEnter={e => { e.target.style.color = '#94a3b8' }}
            onMouseLeave={e => { e.target.style.color = '#475569' }}
          >Operations</Link>
        </div>

        {/* Social */}
        <div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.625rem', letterSpacing: '0.2em', color: '#dc2626', marginBottom: 20, textTransform: 'uppercase' }}>Community</div>
          <a href="https://discord.gg/26thmeu" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: 'rgba(88,101,242,0.1)', border: '1px solid rgba(88,101,242,0.3)', borderRadius: 4, color: '#94a3b8', textDecoration: 'none', fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', fontWeight: 500, transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(88,101,242,0.2)'; e.currentTarget.style.color = '#e8edf5' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(88,101,242,0.1)'; e.currentTarget.style.color = '#94a3b8' }}>
            <svg width="14" height="11" viewBox="0 0 71 55" fill="currentColor"><path d="M60.1 4.9A58.5 58.5 0 0045.4.2a.2.2 0 00-.2.1 40.8 40.8 0 00-1.8 3.7 54 54 0 00-16.2 0A37 37 0 0025.4.3a.2.2 0 00-.2-.1A58.4 58.4 0 0010.5 4.9a.2.2 0 00-.1.1C1.5 18.7-.9 32.2.3 45.5v.1a58.8 58.8 0 0017.7 9 .2.2 0 00.3-.1 42 42 0 003.6-5.9.2.2 0 00-.1-.3 38.8 38.8 0 01-5.5-2.6.2.2 0 010-.4l1.1-.9a.2.2 0 01.2 0 42 42 0 0035.5 0 .2.2 0 01.2 0l1.1.9a.2.2 0 010 .4 36.4 36.4 0 01-5.5 2.6.2.2 0 00-.1.3 47.2 47.2 0 003.6 5.9.2.2 0 00.2.1A58.6 58.6 0 0070.3 45.6v-.1C71.8 30.1 67.9 16.7 60.2 5a.2.2 0 00-.1-.1zM23.7 37.3c-3.5 0-6.4-3.2-6.4-7.2s2.8-7.2 6.4-7.2c3.6 0 6.5 3.3 6.4 7.2 0 4-2.8 7.2-6.4 7.2zm23.7 0c-3.5 0-6.4-3.2-6.4-7.2s2.8-7.2 6.4-7.2c3.6 0 6.5 3.3 6.4 7.2 0 4-2.8 7.2-6.4 7.2z"/></svg>
            Join Discord
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ maxWidth: 1200, margin: '0 auto', paddingTop: 24, borderTop: '1px solid rgba(22,36,72,0.5)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.625rem', color: '#1e3a5f', letterSpacing: '0.05em' }}>
          Fictional unit — not affiliated with the U.S. Department of Defense. Arma Reforger cinematic by Nightfall Pictures.
        </p>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.625rem', color: '#1e3a5f', letterSpacing: '0.05em' }}>
          © 2026 26th MEU (SOC)
        </p>
      </div>
    </footer>
  )
}
