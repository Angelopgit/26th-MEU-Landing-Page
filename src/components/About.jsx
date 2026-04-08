export default function About() {
  return (
    <section id="about" className="relative section-gap flex flex-col items-center">

      {/* Header */}
      <div className="fade-section flex flex-col items-center" style={{ marginBottom: '5rem' }}>
        <div className="flex items-center gap-4 mb-5">
          <div className="h-[1px] w-10 sm:w-16 bg-gradient-to-r from-transparent to-crimson-700/60" />
          <span className="text-crimson-400 text-[11px] font-medium tracking-[0.4em] uppercase">
            About Us
          </span>
          <div className="h-[1px] w-10 sm:w-16 bg-gradient-to-l from-transparent to-crimson-700/60" />
        </div>
        <h2 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-center">
          Who We Are
        </h2>
      </div>

      {/* Body text with side accent */}
      <div className="fade-section delay-2 relative w-full max-w-3xl">
        {/* Left accent line */}
        <div className="absolute left-0 top-6 bottom-6 w-[2px] bg-gradient-to-b from-transparent via-crimson-700/40 to-transparent hidden md:block" />

        <div className="content-panel flex flex-col items-center gap-8 text-slate-400 text-base sm:text-lg md:text-xl leading-[1.9] font-light text-center md:text-left" style={{ padding: '3.5rem 3rem' }}>
          <p>
            The <span className="text-crimson-400">26th Marine Expeditionary Unit (SOC)</span> is a dedicated Arma Reforger
            realism unit focused on delivering an immersive and structured military
            simulation experience. Built around teamwork, tactical gameplay, and
            authenticity, we bring players together in a cooperative environment
            that reflects the discipline and coordination of real-world Marine
            operations.
          </p>
          <p>
            Our unit is designed for players who value immersion without
            unnecessary rigidity — balancing serious, mission-focused gameplay
            with a relaxed and welcoming community. Whether operating in infantry
            squads or supporting elements, every member plays a role in the
            success of the mission.
          </p>
          <p>
            Since our launch, we've opened our doors to PC, PS5 & Xbox players
            who are ready to commit to a higher standard of teamwork,
            communication, and tactical execution.
          </p>
        </div>
      </div>

      {/* Decorative accent */}
      <div className="fade-section delay-3 mt-14 sm:mt-16 flex items-center gap-3">
        <div className="w-2 h-2 border border-crimson-700/40 rotate-45" />
        <div className="h-[1px] w-20 bg-gradient-to-r from-crimson-700/40 to-transparent" />
      </div>

    </section>
  )
}
