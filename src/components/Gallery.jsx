import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

gsap.registerPlugin(ScrollTrigger)

const SLIDES = [
  { src: '/op-squad-flag.png', caption: 'Operation Fire & Sword 1-1A', sub: 'Desert deployment — squad formation with full vehicle support' },
  { src: '/op-cqb.png', caption: 'Operation Fire & Sword 1-1B', sub: 'Close quarters breach and clear — urban operations' },
  { src: '/op-compound.png', caption: 'Operation Fire & Sword 1-1C', sub: 'Compound assault — Anizay theater' },
  { src: '/op-helo-night.png', caption: 'Night Ops', sub: 'Helicopter extraction — low-visibility insertion' },
]

export default function Gallery() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.gallery-heading', { opacity: 0, y: 30, duration: 0.7, scrollTrigger: { trigger: '.gallery-heading', start: 'top 85%' } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} style={{ padding: '100px 0', background: '#06091a', overflow: 'hidden' }}>
      <div className="gallery-heading" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', marginBottom: 48 }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', letterSpacing: '0.3em', color: '#dc2626', textTransform: 'uppercase', marginBottom: 12 }}>IN THE FIELD</div>
        <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', color: '#e8edf5', letterSpacing: '-0.02em' }}>Combat Gallery</h2>
      </div>

      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={24}
        slidesPerView={1}
        centeredSlides={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        breakpoints={{ 768: { slidesPerView: 1.4 }, 1024: { slidesPerView: 1.8 } }}
        style={{ paddingBottom: 48 }}
      >
        {SLIDES.map((slide, i) => (
          <SwiperSlide key={i}>
            <div style={{ position: 'relative', borderRadius: 8, overflow: 'hidden', aspectRatio: '16/9', border: '1px solid rgba(22,36,72,0.6)' }}>
              <img src={slide.src} alt={slide.caption} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease', display: 'block' }}
                onMouseEnter={e => { e.target.style.transform = 'scale(1.04)' }}
                onMouseLeave={e => { e.target.style.transform = 'scale(1)' }} />
              {/* Overlay */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(6,9,26,0.9) 0%, transparent 50%)' }} />
              {/* Caption */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px 28px' }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.2em', color: '#dc2626', marginBottom: 6 }}>{slide.caption}</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', color: 'rgba(148,163,184,0.8)' }}>{slide.sub}</div>
              </div>
              {/* Corner brackets */}
              <div style={{ position: 'absolute', top: 12, left: 12, width: 16, height: 16, borderTop: '1px solid rgba(212,175,55,0.4)', borderLeft: '1px solid rgba(212,175,55,0.4)' }} />
              <div style={{ position: 'absolute', top: 12, right: 12, width: 16, height: 16, borderTop: '1px solid rgba(212,175,55,0.4)', borderRight: '1px solid rgba(212,175,55,0.4)' }} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        .swiper-button-next, .swiper-button-prev { color: rgba(220,38,38,0.7) !important; }
        .swiper-pagination-bullet { background: rgba(148,163,184,0.4) !important; }
        .swiper-pagination-bullet-active { background: #dc2626 !important; }
      `}</style>
    </section>
  )
}
