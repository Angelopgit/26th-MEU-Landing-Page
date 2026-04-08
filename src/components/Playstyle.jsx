export default function Playstyle() {
  return (
    <section className="relative bg-navy-900/40 flex flex-col items-center overflow-hidden" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-navy-700/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="fade-section flex flex-col items-center text-center w-full max-w-2xl sm:max-w-4xl relative">

        <span className="text-crimson-400 text-[11px] font-medium tracking-[0.4em] uppercase mb-6 sm:mb-8">
          Playstyle
        </span>

        <h2 className="text-white font-bold tracking-tight leading-tight mb-6 sm:mb-8">
          <span className="block text-3xl sm:text-4xl md:text-5xl">Serious Tone, Relaxed</span>
          <span className="block text-4xl sm:text-5xl md:text-6xl gradient-text" style={{ marginTop: '0.5rem' }}>Milsim</span>
        </h2>

        <div className="flex items-center gap-3 mb-8 sm:mb-10">
          <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-crimson-700/50" />
          <div className="w-1.5 h-1.5 border border-crimson-700/50 rotate-45" />
          <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-crimson-700/50" />
        </div>

        <p className="text-slate-300 text-lg sm:text-xl md:text-2xl font-light tracking-wider italic">
          Structured when it matters. Relaxed when it doesn't.
        </p>

      </div>
    </section>
  )
}
