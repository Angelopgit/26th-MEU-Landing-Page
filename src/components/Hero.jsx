export default function Hero() {
  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* YouTube Video Background */}
      <div className="absolute inset-0 pointer-events-none">
        <iframe
          src="https://www.youtube.com/embed/TlgtY4ZvDbE?autoplay=1&mute=1&loop=1&playlist=TlgtY4ZvDbE&start=90&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&disablekb=1&iv_load_policy=3"
          title="Background Video"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] min-w-full min-h-full h-[56.25vw]"
          allow="autoplay; encrypted-media"
          frameBorder="0"
        />
      </div>

      {/* Layered overlays for depth */}
      <div className="absolute inset-0 bg-navy-950/75 z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/50 via-transparent to-navy-950 z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/30 via-transparent to-navy-950/30 z-10" />

      {/* Floating ambient particles */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-[2px] h-[2px] bg-white/30 rounded-full"
            style={{
              left: `${15 + i * 14}%`,
              bottom: '-5%',
              animation: `float-up ${12 + i * 3}s linear infinite`,
              animationDelay: `${i * 2.5}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6">

        {/* Logo with ambient glow */}
        <div className="relative animate-fade-in mb-6 sm:mb-8">
          <div className="absolute inset-0 bg-crimson-700/15 rounded-full blur-[60px] scale-150 pulse-glow" />
          <img
            src="/logo.png"
            alt="26th MEU Logo"
            className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 object-contain rounded-full mix-blend-screen drop-shadow-2xl"
          />
        </div>

        <h1 className="text-white text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-4 animate-fade-in-up">
          26th Marine Expeditionary Unit
          <span className="block text-lg sm:text-xl md:text-2xl lg:text-3xl font-light gradient-text tracking-widest mt-2">
            (SOC)
          </span>
        </h1>

        {/* Decorative line */}
        <div className="w-16 sm:w-20 h-[1px] bg-gradient-to-r from-transparent via-crimson-600/60 to-transparent mb-5 animate-fade-in-up-delay" />

        <p className="text-slate-400 text-xs sm:text-sm md:text-base tracking-[0.3em] uppercase font-light mb-8 sm:mb-10 animate-fade-in-up-delay">
          Arma Reforger Realism Unit
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto animate-fade-in-up-delay-2">
          <a
            href="https://discord.com/invite/5qhqBswwZK"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glow group relative px-8 py-3.5 border border-crimson-700/70 text-crimson-400 text-sm font-medium tracking-widest uppercase overflow-hidden transition-all duration-500 hover:border-crimson-500 hover:text-crimson-300 hover:shadow-[0_0_30px_rgba(196,40,40,0.25)] text-center"
          >
            <span className="absolute inset-0 bg-crimson-900/30 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="relative flex items-center justify-center gap-2.5">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
              </svg>
              Join Discord
            </span>
          </a>
          <a
            href="/perscom"
            className="group relative px-8 py-3.5 border border-crimson-900/60 text-slate-400 text-sm font-medium tracking-widest uppercase overflow-hidden transition-all duration-500 hover:border-crimson-800/80 hover:text-crimson-400 hover:shadow-[0_0_20px_rgba(107,17,17,0.2)] text-center"
          >
            <span className="absolute inset-0 bg-crimson-900/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="relative">Access PERSCOM</span>
          </a>
        </div>

        {/* Refined scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in-up-delay-2">
          <span className="text-slate-500 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-[18px] h-[28px] border border-slate-500/40 rounded-full flex justify-center pt-1.5">
            <div className="w-[2px] h-[6px] bg-slate-400/70 rounded-full scroll-indicator-dot" />
          </div>
        </div>
      </div>
    </section>
  )
}
