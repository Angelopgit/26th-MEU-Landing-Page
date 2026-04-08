import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'
  const isOperations = location.pathname === '/operations'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Navigate to home then scroll to anchor
  const handleHomeAnchor = (anchor) => {
    setMobileOpen(false)
    if (isHome) {
      document.querySelector(anchor)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/')
      setTimeout(() => {
        document.querySelector(anchor)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
        scrolled
          ? 'bg-navy-950/90 backdrop-blur-xl shadow-lg shadow-black/30 border-b border-navy-800/30'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="w-full px-6 py-4 flex items-center" style={{ maxWidth: '80rem', marginLeft: 'auto', marginRight: 'auto' }}>

        {/* Logo */}
        <div style={{ flex: 1 }}>
          <Link to="/" className="flex items-center gap-3 group w-fit">
            <img
              src="/logo.png"
              alt="26th MEU Logo"
              className="h-10 w-10 object-contain rounded-full mix-blend-screen transition-transform duration-300 group-hover:scale-110"
            />
            <span className="text-crimson-400 font-semibold tracking-wider text-sm hidden sm:block transition-colors duration-300 group-hover:text-crimson-300">
              26TH MEU
            </span>
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => handleHomeAnchor('#home')}
            className={`text-xs font-medium tracking-[0.2em] uppercase transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:h-[1px] after:bg-crimson-500 after:transition-all after:duration-300 hover:after:w-full ${
              isHome ? 'text-white after:w-0 hover:text-white' : 'text-slate-400 hover:text-white after:w-0'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleHomeAnchor('#about')}
            className="text-slate-400 text-xs font-medium tracking-[0.2em] uppercase hover:text-white transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-0 after:h-[1px] after:bg-crimson-500 after:transition-all after:duration-300 hover:after:w-full"
          >
            About
          </button>
          <button
            onClick={() => handleHomeAnchor('#join')}
            className="text-slate-400 text-xs font-medium tracking-[0.2em] uppercase hover:text-white transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-0 after:h-[1px] after:bg-crimson-500 after:transition-all after:duration-300 hover:after:w-full"
          >
            Join
          </button>
          <Link
            to="/operations"
            className={`text-xs font-medium tracking-[0.2em] uppercase transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:h-[1px] after:bg-crimson-500 after:transition-all after:duration-300 hover:after:w-full ${
              isOperations
                ? 'text-crimson-400 after:w-full'
                : 'text-slate-400 hover:text-white after:w-0'
            }`}
          >
            Operations
          </Link>
          <a
            href="/perscom"
            className="text-slate-400 text-xs font-medium tracking-[0.2em] uppercase hover:text-white transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-0 after:h-[1px] after:bg-crimson-500 after:transition-all after:duration-300 hover:after:w-full"
          >
            PERSCOM
          </a>
        </div>

        {/* Mobile Toggle */}
        <div style={{ flex: 1 }} className="flex justify-end">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span className={`block h-[1.5px] bg-white transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[5px]' : ''}`} />
              <span className={`block h-[1.5px] bg-white transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-[1.5px] bg-white transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[5px]' : ''}`} />
            </div>
          </button>
        </div>

      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-500 ${mobileOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-navy-950/95 backdrop-blur-xl px-6 pb-6 flex flex-col gap-4 border-t border-navy-800/20">
          <button onClick={() => handleHomeAnchor('#home')} className="text-left text-slate-400 text-xs font-medium tracking-[0.2em] uppercase hover:text-white transition-colors duration-300">Home</button>
          <button onClick={() => handleHomeAnchor('#about')} className="text-left text-slate-400 text-xs font-medium tracking-[0.2em] uppercase hover:text-white transition-colors duration-300">About</button>
          <button onClick={() => handleHomeAnchor('#join')} className="text-left text-slate-400 text-xs font-medium tracking-[0.2em] uppercase hover:text-white transition-colors duration-300">Join</button>
          <Link to="/operations" onClick={() => setMobileOpen(false)} className={`text-xs font-medium tracking-[0.2em] uppercase transition-colors duration-300 ${isOperations ? 'text-crimson-400' : 'text-slate-400 hover:text-white'}`}>Operations</Link>
          <a href="/perscom" onClick={() => setMobileOpen(false)} className="text-slate-400 text-xs font-medium tracking-[0.2em] uppercase hover:text-white transition-colors duration-300">PERSCOM</a>
        </div>
      </div>
    </nav>
  )
}
