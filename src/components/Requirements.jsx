const requirements = [
  'Own Arma Reforger (PC, PS5, or Xbox)',
  'Willingness to participate in operations',
  'Ability to follow structure and teamwork',
  'Open to learning tactical gameplay',
  'Maintain respectful conduct',
]

export default function Requirements() {
  return (
    <section id="join" className="relative section-gap flex flex-col items-center">

      {/* Header */}
      <div className="fade-section flex flex-col items-center" style={{ marginBottom: '5rem' }}>
        <div className="flex items-center gap-4 mb-5">
          <div className="h-[1px] w-10 sm:w-16 bg-gradient-to-r from-transparent to-crimson-700/60" />
          <span className="text-crimson-400 text-[11px] font-medium tracking-[0.4em] uppercase">
            Enlistment
          </span>
          <div className="h-[1px] w-10 sm:w-16 bg-gradient-to-l from-transparent to-crimson-700/60" />
        </div>
        <h2 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-center">
          Requirements
        </h2>
      </div>

      {/* List */}
      <div className="fade-section delay-2 req-panel w-full max-w-lg sm:max-w-xl flex flex-col" style={{ padding: '2.5rem 3rem' }}>
        {requirements.map((req, i) => (
          <div
            key={i}
            className="flex items-center gap-5 py-5 sm:py-6 border-b border-navy-800/30 last:border-0 group cursor-default"
          >
            {/* Step number */}
            <span className="flex-shrink-0 text-[10px] font-mono text-navy-600 tracking-wider w-5 text-right group-hover:text-crimson-700 transition-colors duration-300">
              {String(i + 1).padStart(2, '0')}
            </span>

            {/* Checkmark */}
            <div className="flex-shrink-0 w-6 h-6 border border-navy-700/50 flex items-center justify-center group-hover:border-crimson-600/60 group-hover:bg-crimson-900/20 transition-all duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-3 h-3 text-crimson-700 group-hover:text-crimson-400 transition-colors duration-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
            </div>

            <span className="text-slate-400 text-sm sm:text-[15px] font-light tracking-wide group-hover:text-slate-200 transition-colors duration-300">
              {req}
            </span>
          </div>
        ))}
      </div>

      {/* Apply Now */}
      <div className="fade-section delay-3" style={{ marginTop: '4rem' }}>
        <a
          href="/perscom"
          className="btn-glow group relative inline-block border border-crimson-700 text-crimson-400 font-semibold tracking-widest uppercase overflow-hidden transition-all duration-500 hover:border-crimson-500 hover:text-crimson-300 hover:shadow-[0_0_50px_rgba(196,40,40,0.35)]"
          style={{ padding: '1.25rem 4rem', fontSize: '1rem', letterSpacing: '0.3em' }}
        >
          <span className="absolute inset-0 bg-crimson-900/40 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          <span className="relative z-10">Apply Now</span>
        </a>
      </div>

    </section>
  )
}
