const pillars = [
  {
    title: 'Immersion',
    description: 'Realistic tactics, structure, and operations that mirror authentic military procedures.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
    ),
  },
  {
    title: 'Teamwork',
    description: 'Coordinated squad-based gameplay where every role matters and communication is key.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
  },
  {
    title: 'Development',
    description: 'Leadership opportunities and structured progression paths for every member.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
  },
  {
    title: 'Community',
    description: 'A respectful, cooperative player base united by a shared passion for milsim.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
      </svg>
    ),
  },
]

const delays = ['', 'delay-1', 'delay-2', 'delay-3']

export default function Pillars() {
  return (
    <section className="relative section-gap flex flex-col items-center overflow-hidden">

      {/* Background image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/playstyle-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div className="absolute inset-0 bg-navy-950/78" />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, var(--color-navy-950) 0%, transparent 18%, transparent 82%, var(--color-navy-950) 100%)' }} />

      {/* Header */}
      <div className="fade-section flex flex-col items-center relative" style={{ marginBottom: '5rem' }}>
        <div className="flex items-center gap-4 mb-5">
          <div className="h-[1px] w-10 sm:w-16 bg-gradient-to-r from-transparent to-crimson-700/60" />
          <span className="text-crimson-400 text-[11px] font-medium tracking-[0.4em] uppercase">
            Core Pillars
          </span>
          <div className="h-[1px] w-10 sm:w-16 bg-gradient-to-l from-transparent to-crimson-700/60" />
        </div>
        <h2 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-center">
          What Defines Us
        </h2>
      </div>

      {/* Cards */}
      <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
        {pillars.map((pillar, i) => (
          <div
            key={pillar.title}
            className={`pillar-card card-3d fade-section ${delays[i]} group relative p-10 sm:p-12 border border-navy-700/30 bg-navy-900/30 backdrop-blur-sm transition-all duration-500 hover:border-crimson-800/50 hover:bg-navy-800/40`}
          >
            {/* Number badge */}
            <span className="pillar-number">0{i + 1}</span>

            {/* Icon with background */}
            <div className="relative w-14 h-14 flex items-center justify-center mb-8">
              <div className="absolute inset-0 bg-crimson-900/20 border border-crimson-800/20 transition-all duration-500 group-hover:bg-crimson-900/30 group-hover:border-crimson-700/30" />
              <div className="relative text-crimson-600 transition-colors duration-300 group-hover:text-crimson-400">
                {pillar.icon}
              </div>
            </div>

            <h3 className="text-white text-base sm:text-lg font-semibold tracking-[0.15em] uppercase mb-4">
              {pillar.title}
            </h3>
            <div className="w-8 h-[1px] bg-crimson-800/40 mb-5 group-hover:w-12 group-hover:bg-crimson-600/60 transition-all duration-500" />
            <p className="text-slate-500 text-sm sm:text-[15px] leading-relaxed font-light group-hover:text-slate-400 transition-colors duration-300">
              {pillar.description}
            </p>
          </div>
        ))}
      </div>

    </section>
  )
}
