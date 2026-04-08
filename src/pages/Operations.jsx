import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

// ─── Operations Data ────────────────────────────────────────────────────────
// lat/lon map to real-world approximations of Arma Reforger theaters
const operations = [
  {
    id: 1,
    name: 'Operation Iron Tide',
    status: 'completed',
    theater: 'Everon',
    lat: 42.0,
    lon: 9.0,
  },
  {
    id: 2,
    name: 'Operation Silent Vigil',
    status: 'completed',
    theater: 'Arland',
    lat: 59.5,
    lon: 18.0,
  },
  {
    id: 3,
    name: 'Operation Crimson Dawn',
    status: 'completed',
    theater: 'Everon',
    lat: 41.8,
    lon: 8.7,
  },
  {
    id: 4,
    name: 'Operation Frozen Steel',
    status: 'completed',
    theater: 'Arland',
    lat: 60.5,
    lon: 17.0,
  },
  {
    id: 5,
    name: 'Operation Fire and Sword',
    status: 'active',
    theater: 'Anizay, Middle East',
    lat: 33.5,
    lon: 68.8, // Anizay district, Afghanistan/Pakistan border region
    startDate: '2026-03-12',
    endDate: null,
    description: 'Directed deployment to the Anizay district in support of coalition counter-insurgency operations. The 26th MEU will conduct sustained offensive action to locate, engage, and neutralize a locally organized rebel terrorist network operating throughout the region. Secondary objectives include the establishment and securing of designated safe zones to facilitate freedom of movement for friendly joint forces and enable follow-on humanitarian and stability operations.',
    participants: null,
    outcome: null,
  },
]

// ─── Coordinate conversion ───────────────────────────────────────────────────
// Maps geographic lat/lon to Three.js XYZ on sphere surface.
// lon=0 faces the +Z axis (toward camera initially), Y axis = north pole.
function latLonToXYZ(lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = lon * (Math.PI / 180)
  return new THREE.Vector3(
    radius * Math.sin(phi) * Math.sin(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.cos(theta),
  )
}

function formatDate(d) {
  if (!d) return 'TBD'
  return new Date(d + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  })
}

// ─── Canvas texture: continent outlines ──────────────────────────────────────
function makeGlobeTexture() {
  const W = 2048, H = 1024
  const cvs = document.createElement('canvas')
  cvs.width = W; cvs.height = H
  const c = cvs.getContext('2d')
  c.fillStyle = '#050d18'
  c.fillRect(0, 0, W, H)

  const pt = (lat, lon) => [((lon + 180) / 360) * W, ((90 - lat) / 180) * H]

  const land = (pts) => {
    c.beginPath()
    pts.forEach(([la, lo], i) => {
      const [x, y] = pt(la, lo)
      i === 0 ? c.moveTo(x, y) : c.lineTo(x, y)
    })
    c.closePath()
    c.fillStyle = 'rgba(14,40,72,0.97)'
    c.fill()
    c.strokeStyle = 'rgba(40,100,180,0.35)'
    c.lineWidth = 1.5
    c.stroke()
  }

  // North America
  land([[71,-140],[65,-168],[60,-166],[54,-130],[48,-124],
    [37,-122],[30,-115],[22,-106],[15,-90],[9,-79],
    [10,-75],[12,-72],[15,-61],[18,-67],[25,-77],
    [25,-80],[29,-82],[31,-81],[35,-76],[40,-74],
    [42,-70],[45,-67],[47,-53],[52,-56],[52,-66],
    [58,-68],[60,-65],[63,-64],[65,-83],[68,-88],
    [72,-95],[75,-120]])

  // Greenland
  land([[60,-44],[65,-52],[68,-54],[72,-55],[76,-65],
    [83,-55],[83,-32],[76,-18],[70,-22],[65,-36]])

  // South America
  land([[12,-72],[8,-77],[0,-80],[-5,-81],[-17,-73],
    [-22,-70],[-30,-72],[-38,-73],[-45,-75],[-55,-68],
    [-56,-65],[-34,-53],[-23,-43],[-15,-39],[-5,-35],
    [0,-50],[5,-52],[8,-62]])

  // Europe
  land([[71,28],[70,20],[65,14],[62,5],[51,2],[45,-1],
    [36,-6],[36,3],[38,14],[40,18],[42,19],[45,14],
    [47,8],[48,2],[54,8],[55,10],[57,18],[55,22],
    [58,25],[60,22],[65,14],[70,20]])

  // Africa
  land([[36,-5],[37,10],[32,25],[30,32],[22,38],[15,42],
    [12,44],[11,51],[5,41],[0,42],[-5,40],[-10,38],
    [-20,36],[-35,28],[-35,18],[-22,14],[-5,9],
    [4,9],[14,-17],[21,-17],[28,-13]])

  // Asia (Russia + Central/East/SE Asia + Middle East + India)
  land([[40,28],[70,28],[70,180],[55,152],[45,140],
    [38,124],[30,122],[22,114],[10,105],[1,104],
    [5,98],[10,92],[15,82],[8,78],[15,75],
    [22,68],[23,60],[22,57],[12,44],
    [22,37],[30,32],[37,37]])

  // Australia
  land([[-15,129],[-15,137],[-18,147],[-25,152],
    [-32,152],[-38,147],[-38,140],[-35,137],
    [-32,127],[-20,114]])

  // Antarctica
  land([[-70,-180],[-70,180],[-90,180],[-90,-180]])

  return cvs
}

// ─── Hover Intel Preview (Three.js) ─────────────────────────────────────────
function HoverPreview() {
  const canvasRef = useRef(null)
  const animRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const W = 640, H = 360
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(1)

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x050d18)

    const aspect = W / H // 1.778
    const camera = new THREE.OrthographicCamera(-aspect, aspect, 1, -1, -10, 10)

    // Enemy image as background plane
    const loader = new THREE.TextureLoader()
    const tex = loader.load('/413797.jpg')
    const bg = new THREE.Mesh(
      new THREE.PlaneGeometry(2 * aspect, 2),
      new THREE.MeshBasicMaterial({ map: tex }),
    )
    bg.position.z = -1
    scene.add(bg)

    // Red horizontal scan line sweeping top → bottom
    const scanMat = new THREE.MeshBasicMaterial({ color: 0xff1111, transparent: true, opacity: 0.55 })
    const scanLine = new THREE.Mesh(new THREE.PlaneGeometry(2 * aspect, 0.022), scanMat)
    scanLine.position.z = 0.1
    scene.add(scanLine)

    // Targeting reticle ring
    const reticleMat = new THREE.MeshBasicMaterial({ color: 0xff2222, transparent: true, opacity: 0.9, side: THREE.DoubleSide })
    const reticle = new THREE.Mesh(new THREE.RingGeometry(0.2, 0.235, 64), reticleMat)
    reticle.position.set(0.12, 0.06, 0.2)
    scene.add(reticle)

    // Crosshair lines
    const xhMat = new THREE.MeshBasicMaterial({ color: 0xff2222, transparent: true, opacity: 0.65 })
    const xhH = new THREE.Mesh(new THREE.PlaneGeometry(0.42, 0.007), xhMat)
    xhH.position.set(0.12, 0.06, 0.25)
    scene.add(xhH)
    const xhV = new THREE.Mesh(new THREE.PlaneGeometry(0.007, 0.42), xhMat)
    xhV.position.set(0.12, 0.06, 0.25)
    scene.add(xhV)

    // Corner HUD brackets
    const cMat = new THREE.LineBasicMaterial({ color: 0xff2222, transparent: true, opacity: 0.85 })
    const cS = 0.18
    const cX = aspect - 0.09
    const cY = 0.9
    ;[
      [[-cX + cS, cY, 0.3], [-cX, cY, 0.3], [-cX, cY - cS, 0.3]],
      [[cX - cS, cY, 0.3], [cX, cY, 0.3], [cX, cY - cS, 0.3]],
      [[-cX + cS, -cY, 0.3], [-cX, -cY, 0.3], [-cX, -cY + cS, 0.3]],
      [[cX - cS, -cY, 0.3], [cX, -cY, 0.3], [cX, -cY + cS, 0.3]],
    ].forEach(pts => {
      const geo = new THREE.BufferGeometry().setFromPoints(pts.map(([x, y, z]) => new THREE.Vector3(x, y, z)))
      scene.add(new THREE.Line(geo, cMat))
    })

    let scanY = 1
    const animate = () => {
      animRef.current = requestAnimationFrame(animate)
      const t = Date.now() * 0.001
      scanY -= 0.006
      if (scanY < -1) scanY = 1
      scanLine.position.y = scanY
      scanMat.opacity = 0.3 + Math.sin(t * 6) * 0.15
      const pulse = 1 + Math.sin(t * 2.5) * 0.06
      reticle.scale.setScalar(pulse)
      reticleMat.opacity = 0.65 + Math.sin(t * 3.5) * 0.3
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(animRef.current)
      tex.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      width={640}
      height={360}
      style={{ display: 'block', width: '100%', height: 'auto' }}
    />
  )
}

// ─── Operation Card ──────────────────────────────────────────────────────────
function OpCard({ op }) {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const isUpcoming = op.status === 'upcoming' || op.status === 'active'
  const isFireAndSword = op.id === 5

  const onMouseMove = (e) => {
    const r = cardRef.current.getBoundingClientRect()
    setTilt({
      x: ((e.clientY - r.top) / r.height - 0.5) * -10,
      y: ((e.clientX - r.left) / r.width - 0.5) * 10,
    })
  }

  return (
    <div
      style={{ position: 'relative' }}
      onMouseEnter={() => isFireAndSword && setHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false) }}
    >
      {/* Intel hover preview — floats to the right of the card */}
      {isFireAndSword && hovered && (
        <div style={{
          position: 'absolute',
          top: '0',
          left: 'calc(100% + 12px)',
          width: '320px',
          zIndex: 50,
          border: '1px solid rgba(196,40,40,0.55)',
          boxShadow: '0 0 30px rgba(196,40,40,0.3), 0 0 60px rgba(0,0,0,0.6)',
          overflow: 'hidden',
        }}>
          {/* HUD top bar */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10,
            display: 'flex', justifyContent: 'space-between',
            padding: '6px 10px', pointerEvents: 'none',
            background: 'linear-gradient(to bottom, rgba(5,13,24,0.85) 0%, transparent 100%)',
          }}>
            <span style={{ fontFamily: 'monospace', fontSize: '10px', fontWeight: 'bold', letterSpacing: '0.22em', color: 'rgba(255,40,40,0.9)', textTransform: 'uppercase' }}>● HOSTILE FORCES</span>
            <span style={{ fontFamily: 'monospace', fontSize: '8px', letterSpacing: '0.2em', color: 'rgba(255,40,40,0.55)', textTransform: 'uppercase' }}>CLASSIFIED</span>
          </div>
          {/* HUD bottom bar */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10,
            display: 'flex', justifyContent: 'space-between',
            padding: '6px 10px', pointerEvents: 'none',
            background: 'linear-gradient(to top, rgba(5,13,24,0.85) 0%, transparent 100%)',
          }}>
            <span style={{ fontFamily: 'monospace', fontSize: '8px', letterSpacing: '0.2em', color: 'rgba(255,40,40,0.65)', textTransform: 'uppercase' }}>THREAT DETECTED</span>
            <span style={{ fontFamily: 'monospace', fontSize: '8px', letterSpacing: '0.18em', color: 'rgba(255,40,40,0.45)', textTransform: 'uppercase' }}>ANIZAY · AO</span>
          </div>
          <HoverPreview />
        </div>
      )}

      {/* Card */}
      <div
        ref={cardRef}
        onMouseMove={onMouseMove}
        className="op-card relative border backdrop-blur-md overflow-hidden"
        style={{
          borderColor: isUpcoming ? 'rgba(220,38,38,0.5)' : 'rgba(22,36,72,0.8)',
          background: isUpcoming
            ? 'rgba(9,15,30,0.9)'
            : 'rgba(9,15,30,0.85)',
          borderRadius: 8,
          transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.15s ease',
          boxShadow: isUpcoming
            ? '0 4px 32px rgba(220,38,38,0.15), 0 0 0 1px rgba(220,38,38,0.1)'
            : '0 4px 24px rgba(0,0,0,0.3)',
        }}
      >
        {/* Top accent */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: isUpcoming
            ? 'linear-gradient(to right, transparent, rgba(220,38,38,0.8), transparent)'
            : 'linear-gradient(to right, transparent, rgba(22,36,72,0.8), transparent)',
        }} />
        {/* Gold corner brackets on active op */}
        {isUpcoming && (
          <>
            <div style={{ position: 'absolute', top: 0, left: 0, width: 16, height: 16, borderTop: '2px solid rgba(212,175,55,0.3)', borderLeft: '2px solid rgba(212,175,55,0.3)' }} />
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: 16, height: 16, borderBottom: '2px solid rgba(212,175,55,0.3)', borderRight: '2px solid rgba(212,175,55,0.3)' }} />
          </>
        )}

        {/* Operation image header — Fire & Sword only */}
        {isFireAndSword && (
          <div style={{ height: '140px', overflow: 'hidden', position: 'relative' }}>
            <img
              src="/317670.jpg"
              alt="Operation area"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to bottom, rgba(61,10,10,0.15) 0%, rgba(10,22,40,0.92) 100%)',
            }} />
            <div style={{
              position: 'absolute', bottom: '9px', left: '14px',
              fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.22em',
              color: 'rgba(196,40,40,0.7)', textTransform: 'uppercase',
            }}>
              AO: ANIZAY · GRID 33N 68E
            </div>
          </div>
        )}

        <div className="p-6 sm:p-8">
          {/* Header row */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 16 }}>
            <div>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.625rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(148,163,184,0.4)', marginBottom: 6 }}>
                OP-{String(op.id).padStart(3, '0')} · {op.theater}
              </p>
              <h3 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 'clamp(1rem, 1.5vw, 1.25rem)', color: '#e8edf5', lineHeight: 1.3, letterSpacing: '-0.01em' }}>
                {op.name}
              </h3>
            </div>
            <span
              style={{
                flexShrink: 0,
                padding: '4px 10px',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.625rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                border: `1px solid ${isUpcoming ? 'rgba(220,38,38,0.5)' : 'rgba(22,36,72,0.6)'}`,
                borderRadius: 4,
                whiteSpace: 'nowrap',
                color: isUpcoming ? '#dc2626' : 'rgba(148,163,184,0.6)',
                background: isUpcoming ? 'rgba(220,38,38,0.08)' : 'rgba(13,20,38,0.6)',
              }}
            >
              {op.status === 'active' ? '● Active' : op.status === 'upcoming' ? '● Pending' : '✓ Complete'}
            </span>
          </div>

          {/* Dates */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 16px', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6875rem', marginBottom: 20, color: 'rgba(148,163,184,0.35)' }}>
            <span>START &nbsp;<span style={{ color: 'rgba(148,163,184,0.7)' }}>{formatDate(op.startDate)}</span></span>
            <span style={{ color: 'rgba(22,36,72,0.8)' }}>|</span>
            <span>END &nbsp;<span style={{ color: 'rgba(148,163,184,0.7)' }}>{formatDate(op.endDate)}</span></span>
          </div>

          {/* Description */}
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9375rem', lineHeight: 1.7, color: '#64748b', fontWeight: 300 }}>
            {op.description}
          </p>

          {/* Footer stats */}
          {(op.participants || op.outcome) && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, paddingTop: 16, marginTop: 16, borderTop: '1px solid rgba(22,36,72,0.4)', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6875rem' }}>
              {op.participants && (
                <span style={{ color: 'rgba(100,116,139,0.6)' }}>
                  PERSONNEL &nbsp;<span style={{ color: '#94a3b8' }}>{op.participants}</span>
                </span>
              )}
              {op.outcome && (
                <span style={{ color: 'rgba(100,116,139,0.6)' }}>
                  OUTCOME &nbsp;<span style={{ color: '#dc2626' }}>{op.outcome}</span>
                </span>
              )}
            </div>
          )}

          {/* Hover hint */}
          {isFireAndSword && (
            <p style={{ marginTop: '1rem', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.5625rem', letterSpacing: '0.25em', color: 'rgba(220,38,38,0.35)', textTransform: 'uppercase' }}>
              ↑ HOVER FOR ENEMY INTEL
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function Operations() {
  const canvasRef = useRef(null)
  const animRef = useRef(null)

  const past = operations.filter(o => o.status === 'completed')
  const upcoming = operations.filter(o => o.status === 'upcoming' || o.status === 'active')

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const W = window.innerWidth
    const H = window.innerHeight
    const RADIUS = Math.min(W, H) * 0.28

    // ── Scene ──
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x050d18)

    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 3000)
    camera.position.set(0, 30, RADIUS * 2.5)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // ── Lighting ──
    scene.add(new THREE.AmbientLight(0x1a3a6a, 1.2))
    const sun = new THREE.DirectionalLight(0x4477bb, 1.5)
    sun.position.set(2, 1, 1)
    scene.add(sun)
    const rimLight = new THREE.DirectionalLight(0x0a1628, 0.5)
    rimLight.position.set(-1, -0.5, -1)
    scene.add(rimLight)

    // ── Starfield ──
    const starPts = new Float32Array(2500 * 3)
    for (let i = 0; i < 2500; i++) {
      starPts[i * 3]     = (Math.random() - 0.5) * 3000
      starPts[i * 3 + 1] = (Math.random() - 0.5) * 3000
      starPts[i * 3 + 2] = (Math.random() - 0.5) * 3000
    }
    const starGeo = new THREE.BufferGeometry()
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPts, 3))
    scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({
      color: 0x3a5a8a, size: 0.7, transparent: true, opacity: 0.6, sizeAttenuation: true,
    })))

    // ── Globe base sphere ──
    const globe = new THREE.Group()
    scene.add(globe)

    // Canvas texture with continent outlines (offset 0.25 aligns with latLonToXYZ convention)
    const globeTex = new THREE.CanvasTexture(makeGlobeTexture())
    globeTex.wrapS = THREE.RepeatWrapping
    globeTex.offset.x = 0.25

    const baseGeo = new THREE.SphereGeometry(RADIUS, 64, 64)
    const baseMat = new THREE.MeshPhongMaterial({
      map: globeTex,
      emissive: 0x0a1830,
      emissiveIntensity: 0.4,
      shininess: 30,
      specular: new THREE.Color(0x1a3a6a),
    })
    globe.add(new THREE.Mesh(baseGeo, baseMat))

    // ── Atmosphere glow (inner) ──
    const atmMat = new THREE.MeshPhongMaterial({
      color: 0x0d2a50,
      transparent: true, opacity: 0.12,
      side: THREE.BackSide,
    })
    globe.add(new THREE.Mesh(new THREE.SphereGeometry(RADIUS * 1.04, 32, 32), atmMat))

    // ── Outer atmosphere halo (added to scene, not globe, so it doesn't rotate) ──
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x0d2a50, transparent: true, opacity: 0.18, side: THREE.BackSide,
    })
    scene.add(new THREE.Mesh(new THREE.SphereGeometry(RADIUS * 1.08, 32, 32), haloMat))

    // ── Grid lines ──
    const gridLineMat = new THREE.LineBasicMaterial({ color: 0x1a3a5a, transparent: true, opacity: 0.55 })
    const gridHighMat = new THREE.LineBasicMaterial({ color: 0x243b6a, transparent: true, opacity: 0.8 })

    // Latitude parallels
    for (let lat = -75; lat <= 75; lat += 15) {
      const isEquator = lat === 0
      const r2d = RADIUS * Math.cos(lat * Math.PI / 180)
      const y = RADIUS * Math.sin(lat * Math.PI / 180)
      const pts = []
      for (let lon = 0; lon <= 360; lon += 2) {
        pts.push(new THREE.Vector3(
          r2d * Math.sin(lon * Math.PI / 180),
          y,
          r2d * Math.cos(lon * Math.PI / 180),
        ))
      }
      pts.push(pts[0].clone())
      globe.add(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(pts),
        isEquator ? gridHighMat : gridLineMat,
      ))
    }

    // Longitude meridians
    for (let lon = 0; lon < 360; lon += 15) {
      const isPrimeMeridian = lon === 0 || lon === 180
      const pts = []
      for (let lat = -90; lat <= 90; lat += 2) {
        pts.push(latLonToXYZ(lat, lon, RADIUS))
      }
      globe.add(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(pts),
        isPrimeMeridian ? gridHighMat : gridLineMat,
      ))
    }

    // ── HUD equatorial ring (scene-level, doesn't rotate with globe) ──
    const eqRingMat = new THREE.MeshBasicMaterial({
      color: 0x1a3a5a, transparent: true, opacity: 0.5, side: THREE.DoubleSide,
    })
    const eqRing = new THREE.Mesh(
      new THREE.RingGeometry(RADIUS * 1.07, RADIUS * 1.075, 128),
      eqRingMat,
    )
    scene.add(eqRing)

    // Slow-spinning scan ring (tilted)
    const scanMat = new THREE.MeshBasicMaterial({
      color: 0x8b1a1a, transparent: true, opacity: 0.3, side: THREE.DoubleSide,
    })
    const scanRing = new THREE.Mesh(
      new THREE.RingGeometry(RADIUS * 1.09, RADIUS * 1.095, 128),
      scanMat,
    )
    scanRing.rotation.x = Math.PI / 2.5
    scene.add(scanRing)

    // ── Operation markers ──
    const pulsingRings = []
    operations.forEach((op) => {
      const pos = latLonToXYZ(op.lat, op.lon, RADIUS)
      const isUpcoming = op.status === 'upcoming' || op.status === 'active'

      // Dot
      const dotMat = new THREE.MeshBasicMaterial({
        color: isUpcoming ? 0xc42828 : 0x3d5f99,
      })
      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(isUpcoming ? RADIUS * 0.022 : RADIUS * 0.016, 8, 8),
        dotMat,
      )
      dot.position.copy(pos)
      globe.add(dot)

      // Inner bright dot
      const innerDot = new THREE.Mesh(
        new THREE.SphereGeometry(isUpcoming ? RADIUS * 0.01 : RADIUS * 0.008, 8, 8),
        new THREE.MeshBasicMaterial({ color: isUpcoming ? 0xff4444 : 0x6699cc }),
      )
      innerDot.position.copy(pos)
      globe.add(innerDot)

      // 2 staggered pulse rings per marker
      for (let p = 0; p < 2; p++) {
        const ringSize = isUpcoming ? RADIUS * 0.035 : RADIUS * 0.025
        const ringMesh = new THREE.Mesh(
          new THREE.RingGeometry(ringSize * 0.4, ringSize * 0.55, 32),
          new THREE.MeshBasicMaterial({
            color: isUpcoming ? 0xc42828 : 0x2e4a7f,
            transparent: true, opacity: 0.6,
            side: THREE.DoubleSide,
          }),
        )
        ringMesh.position.copy(pos)
        const normal = pos.clone().normalize()
        ringMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal)
        globe.add(ringMesh)
        pulsingRings.push({ mesh: ringMesh, phase: p * 0.5, isUpcoming, baseSize: ringSize })
      }
    })

    // ── Mouse tracking ──
    const mouse = { x: 0, y: 0 }
    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove)

    // ── Resize ──
    const onResize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    // ── Render loop ──
    const animate = () => {
      animRef.current = requestAnimationFrame(animate)

      globe.rotation.y += 0.0015
      eqRing.rotation.y += 0.0015 // keep eqRing aligned with globe visually
      scanRing.rotation.z += 0.004

      // Subtle camera drift
      camera.position.x += (mouse.x * 25 - camera.position.x) * 0.025
      camera.position.y += (-mouse.y * 20 + 30 - camera.position.y) * 0.025
      camera.lookAt(0, 0, 0)

      // Animate pulse rings
      const t = Date.now() * 0.001
      pulsingRings.forEach(({ mesh, phase, isUpcoming, baseSize }) => {
        const p = ((t * (isUpcoming ? 1.6 : 0.9) + phase) % 1)
        const scale = 1 + p * (isUpcoming ? 5 : 3.5)
        mesh.scale.setScalar(scale)
        mesh.material.opacity = (1 - p) * (isUpcoming ? 0.7 : 0.45)
      })

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      globeTex.dispose()
      renderer.dispose()
    }
  }, [])

  const totalPersonnel = past.reduce((s, o) => s + (o.participants || 0), 0)

  return (
    <div className="relative min-h-screen" style={{ background: '#06091a' }}>

      {/* Three.js Globe — fixed full-screen background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />

      {/* Radial vignette */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, rgba(6,9,26,0.75) 100%)',
        }}
      />

      {/* Scrollable content */}
      <div className="relative" style={{ zIndex: 2 }}>
        <Navbar />

        <main
          className="px-4 sm:px-6 lg:px-8"
          style={{ maxWidth: '80rem', margin: '0 auto', paddingTop: '10rem', paddingBottom: '6rem' }}
        >

          {/* ── Page Header ── */}
          <div className="text-center mb-24">
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', letterSpacing: '0.3em', color: '#dc2626', textTransform: 'uppercase', marginBottom: 16 }}>
              26TH MEU (SOC)
            </div>

            <h1 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: '#e8edf5', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 24 }}>
              Operations Log
            </h1>

            <div style={{ width: 60, height: 1, background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.4), transparent)', margin: '0 auto 24px' }} />

            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
              <p style={{ textAlign: 'center', maxWidth: '36rem', fontSize: '1.0625rem', color: '#64748b', fontFamily: 'Inter, sans-serif', lineHeight: 1.7, fontWeight: 300 }}>
                Operational record for the 26th Marine Expeditionary Unit. All past engagements and forthcoming deployments.
              </p>
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'clamp(2rem, 5vw, 5rem)', flexWrap: 'wrap' }}>
              {[
                { label: 'Ops Completed', value: 0 },
                { label: 'Upcoming', value: upcoming.length },
                { label: 'Personnel Deployed', value: totalPersonnel },
              ].map(stat => (
                <div key={stat.label} style={{ textAlign: 'center', background: 'rgba(9,15,30,0.7)', backdropFilter: 'blur(12px)', border: '1px solid rgba(22,36,72,0.8)', borderRadius: 8, padding: '20px 32px', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, width: 12, height: 12, borderTop: '1px solid rgba(212,175,55,0.3)', borderLeft: '1px solid rgba(212,175,55,0.3)' }} />
                  <div style={{ position: 'absolute', bottom: 0, right: 0, width: 12, height: 12, borderBottom: '1px solid rgba(212,175,55,0.3)', borderRight: '1px solid rgba(212,175,55,0.3)' }} />
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, color: '#dc2626', lineHeight: 1, marginBottom: 8, fontVariantNumeric: 'tabular-nums' }}>{stat.value}</p>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.625rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(100,116,139,0.7)' }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Upcoming Operations ── */}
          {upcoming.length > 0 && (
            <section style={{ marginBottom: '5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6875rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(220,38,38,0.9)', animation: 'glow-pulse 3s ease-in-out infinite' }}>
                  ● ACTIVE
                </span>
                <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 'clamp(1.5rem, 2.5vw, 1.875rem)', color: '#e8edf5', letterSpacing: '-0.02em' }}>
                  Upcoming Operations
                </h2>
                <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, rgba(220,38,38,0.4), transparent)' }} />
              </div>
              {/* Single card, centered */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '100%', maxWidth: '42rem' }}>
                  {upcoming.map(op => <OpCard key={op.id} op={op} />)}
                </div>
              </div>
            </section>
          )}

          {/* ── Past Operations ── */}
          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
              <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 'clamp(1.5rem, 2.5vw, 1.875rem)', color: '#e8edf5', letterSpacing: '-0.02em' }}>
                Past Operations
              </h2>
              <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, rgba(22,36,72,0.6), transparent)' }} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {past.map(op => (
                <div
                  key={op.id}
                  style={{
                    position: 'relative',
                    background: 'rgba(9,15,30,0.85)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(22,36,72,0.8)',
                    borderRadius: 8,
                    overflow: 'hidden',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
                  }}
                >
                  {/* Top accent line */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(to right, transparent, rgba(22,36,72,0.8), transparent)' }} />
                  {/* Gold corner brackets */}
                  <div style={{ position: 'absolute', top: 0, left: 0, width: 16, height: 16, borderTop: '2px solid rgba(212,175,55,0.2)', borderLeft: '2px solid rgba(212,175,55,0.2)' }} />
                  <div style={{ position: 'absolute', bottom: 0, right: 0, width: 16, height: 16, borderBottom: '2px solid rgba(212,175,55,0.2)', borderRight: '2px solid rgba(212,175,55,0.2)' }} />

                  <div className="p-6 sm:p-8">
                    {/* Header row */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 16 }}>
                      <div>
                        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.625rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(148,163,184,0.35)', marginBottom: 6 }}>
                          OP-{String(op.id).padStart(3, '0')} · {op.theater}
                        </p>
                        <h3 style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 'clamp(1rem, 1.5vw, 1.125rem)', letterSpacing: '0.12em', color: 'rgba(22,36,72,0.8)', lineHeight: 1.3 }}>
                          ██████ █████████
                        </h3>
                      </div>
                      <span
                        style={{
                          flexShrink: 0,
                          padding: '4px 10px',
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: '0.625rem',
                          letterSpacing: '0.15em',
                          textTransform: 'uppercase',
                          border: '1px solid rgba(22,36,72,0.6)',
                          borderRadius: 4,
                          whiteSpace: 'nowrap',
                          color: 'rgba(148,163,184,0.6)',
                          background: 'rgba(13,20,38,0.6)',
                        }}
                      >
                        ✓ Complete
                      </span>
                    </div>

                    {/* Classified notice */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 24, color: 'rgba(22,36,72,0.9)' }}>
                      <div style={{ flex: 1, height: 1, background: 'rgba(22,36,72,0.5)' }} />
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6875rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
                        ██ CLASSIFIED
                      </span>
                      <div style={{ flex: 1, height: 1, background: 'rgba(22,36,72,0.5)' }} />
                    </div>
                    <p style={{ textAlign: 'center', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', letterSpacing: '0.1em', color: 'rgba(22,36,72,0.8)', marginTop: 12 }}>
                      To be published at a later date
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </main>

        <Footer />
      </div>
    </div>
  )
}
