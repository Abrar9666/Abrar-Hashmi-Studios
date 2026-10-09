import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { ArrowDown, Play, MessageCircle } from 'lucide-react'
import { FRAME_CONFIG, frameUrl } from '../config/frames'
import { useIsMobile, useReducedMotion } from '../hooks/useReducedMotion'

const EASE = [0.22, 1, 0.36, 1] as const

function Chapter({ progress, range, children, className = '', yFrom = 60 }: {
  progress: MotionValue<number>; range: [number, number]; children: React.ReactNode; className?: string; yFrom?: number
}) {
  const [a, b] = range
  const mid = (a + b) / 2
  const opacity = useTransform(progress, [a, a + 0.04, b - 0.04, b], [0, 1, 1, 0])
  const y = useTransform(progress, [a, mid, b], [yFrom, 0, -yFrom])
  const scale = useTransform(progress, [a, mid, b], [0.96, 1, 1.02])
  return <motion.div style={{ opacity, y, scale }} className={`absolute inset-0 grid place-items-center px-5 pointer-events-none ${className}`}>{children}</motion.div>
}

export default function HeroSequence() {
  const isMobile = useIsMobile()
  const reduced = useReducedMotion()
  const cfg = isMobile ? FRAME_CONFIG.mobile : FRAME_CONFIG.desktop
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const framesRef = useRef<(HTMLImageElement | null)[]>([])
  const posterRef = useRef<HTMLImageElement | null>(null)
  const [loadPct, setLoadPct] = useState(0)
  const [ready, setReady] = useState(false)
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start start', 'end end'] })

  /* ---------- progressive preload (§11) ---------- */
  useEffect(() => {
    if (reduced) { setReady(true); return }
    let cancelled = false
    const total = cfg.frameCount
    framesRef.current = new Array(total).fill(null)
    let loaded = 0
    const poster = new Image(); poster.src = cfg.poster; posterRef.current = poster
    const order: number[] = []
    for (let i = 0; i < Math.min(5, total); i++) order.push(i)
    for (let i = 5; i < total; i++) order.push(i)
    const loadOne = (idx: number) => new Promise<void>((resolve) => {
      const img = new Image()
      img.onload = () => { framesRef.current[idx] = img; loaded++; if (!cancelled) { setLoadPct(Math.round((loaded / total) * 100)); if (loaded >= 5) setReady(true) } resolve() }
      img.onerror = () => { loaded++; if (!cancelled) setLoadPct(Math.round((loaded / total) * 100)); resolve() }
      img.src = frameUrl(cfg.path, idx + 1)
    })
    ;(async () => { const CONC = 6; let p = 0
      const workers = Array.from({ length: CONC }, async () => { while (p < order.length && !cancelled) { const cur = order[p++]; await loadOne(cur) } })
      await Promise.all(workers); if (!cancelled) setReady(true)
    })()
    return () => { cancelled = true }
  }, [cfg, reduced])

  /* ---------- canvas engine (§10) ---------- */
  useEffect(() => {
    const canvas = canvasRef.current, wrap = wrapRef.current
    if (!canvas || !wrap || reduced) return
    const ctx = canvas.getContext('2d'); if (!ctx) return
    const dprCap = isMobile ? FRAME_CONFIG.mobileMaxDpr : FRAME_CONFIG.maxDpr
    let raf = 0, current = 0, lastDrawn = -1, running = true
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, dprCap)
      canvas.width = Math.round(window.innerWidth * dpr); canvas.height = Math.round(window.innerHeight * dpr)
      lastDrawn = -1
    }
    resize(); window.addEventListener('resize', resize)
    const draw = (img: HTMLImageElement) => {
      const cw = canvas.width, ch = canvas.height
      const s = Math.max(cw / img.naturalWidth, ch / img.naturalHeight)
      const w = img.naturalWidth * s, h = img.naturalHeight * s
      ctx.clearRect(0, 0, cw, ch); ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h)
      // subtle vignette (§12)
      const g = ctx.createRadialGradient(cw/2, ch/2, Math.min(cw,ch)*.35, cw/2, ch/2, Math.max(cw,ch)*.75)
      g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,0.42)')
      ctx.fillStyle = g; ctx.fillRect(0, 0, cw, ch)
    }
    const loop = () => {
      if (!running) return
      const rect = wrap.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      const progress = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0
      const target = progress * (cfg.frameCount - 1)
      current += (target - current) * 0.12
      const idx = Math.round(current)
      if (idx !== lastDrawn) {
        const img = framesRef.current[idx] ?? posterRef.current
        if (img && img.complete && img.naturalWidth) { draw(img); lastDrawn = idx }
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    const onVis = () => { if (document.hidden) { running = false; cancelAnimationFrame(raf) } else if (!running) { running = true; raf = requestAnimationFrame(loop) } }
    document.addEventListener('visibilitychange', onVis)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); document.removeEventListener('visibilitychange', onVis) }
  }, [cfg, isMobile, reduced])

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div ref={wrapRef} style={{ height: isMobile ? '400vh' : '520vh' }} className="relative" aria-label="Abrar Hashmi — cinematic introduction">
      <div className="sticky top-0 h-[100vh] overflow-hidden">
        {/* aurora backdrop (§46) */}
        <div className="aurora" style={{ width: 560, height: 560, left: '-8%', top: '-10%', background: 'rgba(201,130,143,.13)', animation: 'drift1 24s ease-in-out infinite' }} />
        <div className="aurora" style={{ width: 480, height: 480, right: '-6%', top: '8%', background: 'rgba(214,164,92,.10)', animation: 'drift2 28s ease-in-out infinite' }} />
        <div className="aurora" style={{ width: 620, height: 620, left: '30%', bottom: '-30%', background: 'rgba(110,175,168,.08)', animation: 'drift1 30s ease-in-out infinite' }} />
        {reduced ? (
          <img src={cfg.poster} alt="Abrar Hashmi in his studio" className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-label="Scroll-driven portrait sequence of Abrar Hashmi" role="img" />
        )}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(8,9,13,.55), transparent 30%, transparent 62%, rgba(8,9,13,.78))' }} />

        {/* loader (§11) */}
        {!ready && !reduced && (
          <div className="absolute inset-0 z-20 grid place-items-center bg-[#08090D]">
            <div className="text-center px-6">
              <p className="text-[11px] font-semibold tracking-[.3em] text-[var(--text2)]">PREPARING THE EXPERIENCE</p>
              <div className="mt-5 h-px w-[min(320px,70vw)] bg-white/10 mx-auto overflow-hidden"><div className="h-full bg-[var(--amber)] transition-all duration-300" style={{ width: `${loadPct}%` }} /></div>
              <p className="mt-3 text-sm text-[var(--muted)]">{loadPct}%</p>
            </div>
          </div>
        )}

        {/* ---- scroll story chapters (§13) ---- */}
        <Chapter progress={scrollYProgress} range={[0, 0.15]}>
          <div className="text-center max-w-[900px]">
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, ease: EASE }} className="text-[13px] font-semibold tracking-[.16em] text-[var(--amber)]">ABRAR HASHMI STUDIOS</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: .1, ease: EASE }} style={{ fontSize: 'clamp(56px,9vw,132px)', lineHeight: .88, letterSpacing: '-.065em' }}>
              AI Creator<br /><span className="italic text-[var(--rose)]">&amp;</span> Digital Builder
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: .35 }} className="mt-6 text-[17px] md:text-[20px] leading-[1.65] text-[var(--text2)] max-w-[620px] mx-auto">
              I create cinematic AI videos, professional edits, and modern digital experiences for brands and creators — built to engage audiences and help businesses grow.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, delay: .5 }} className="mt-9 flex flex-wrap justify-center gap-3 pointer-events-auto">
              <button className="btn btn-primary" onClick={() => scrollTo('projects')}>Explore My Work</button>
              <button className="btn btn-ghost" onClick={() => scrollTo('contact')}>Let&apos;s Work Together</button>
            </motion.div>
            <p className="mt-8 text-[11px] tracking-[.28em] text-[var(--muted)]">VIDEO • AI • DESIGN • WEB • CONTENT</p>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2.2, repeat: Infinity }} className="mt-6 flex justify-center text-[var(--text2)]"><ArrowDown size={18} /></motion.div>
          </div>
        </Chapter>

        <Chapter progress={scrollYProgress} range={[0.15, 0.30]}>
          <div className="glass-card float-card p-6 md:p-8 max-w-[380px]" style={{ borderRadius: 22 }}>
            <p className="text-[11px] tracking-[.24em] text-[var(--amber)] font-semibold">CREATIVE PRODUCTION</p>
            <p className="font-[DM_Serif_Display] text-3xl md:text-4xl mt-3">AI Video Creation</p>
            <p className="text-[var(--text2)] mt-2 text-[15px]">Scenes, ads and stories — directed like real productions, generated with modern AI.</p>
            <div className="mt-5 flex items-center gap-3 text-[var(--rose)]"><span className="icon-tile"><Play size={18} /></span><span className="text-sm font-medium text-[var(--text)]">Watch the craft in motion</span></div>
          </div>
        </Chapter>

        <Chapter progress={scrollYProgress} range={[0.30, 0.45]}>
          <div className="text-center">
            <div className="flex flex-col leading-[.92]" style={{ fontFamily: '"DM Serif Display",Georgia,serif', fontSize: 'clamp(52px,10vw,120px)', letterSpacing: '-.04em' }}>
              <span>VIDEO</span><span className="text-[var(--rose)] italic">DESIGN</span><span>CODE</span>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-3 pointer-events-auto">
              {['AI Video','Web','Content','Automation'].map(c => <span key={c} className="glass-card px-5 py-2.5 text-sm font-semibold" style={{ borderRadius: 999 }}>{c}</span>)}
            </div>
          </div>
        </Chapter>

        <Chapter progress={scrollYProgress} range={[0.45, 0.60]}>
          <div className="glass-card p-8 md:p-12 max-w-[720px] text-center" style={{ borderRadius: 32 }}>
            <p className="font-[DM_Serif_Display] leading-[1.02]" style={{ fontSize: 'clamp(34px,5.5vw,64px)' }}>Turning ideas into<br /><span className="italic text-[var(--amber)]">digital experiences.</span></p>
            <p className="mt-5 text-[var(--text2)]">From cinematic AI production and professional editing to websites, content systems, and digital marketing.</p>
          </div>
        </Chapter>

        <Chapter progress={scrollYProgress} range={[0.60, 0.75]}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 max-w-[760px] pointer-events-auto">
            {['AI VIDEO','VIDEO EDITING','WEB DEVELOPMENT','CONTENT','DESIGN','AUTOMATION'].map((t, i) => (
              <div key={t} className="glass-card float-card px-5 py-6 text-center font-semibold tracking-[.12em] text-[13px] md:text-sm" style={{ borderRadius: 20, animationDelay: `${i * .7}s` }}>{t}</div>
            ))}
          </div>
        </Chapter>

        <Chapter progress={scrollYProgress} range={[0.75, 0.92]}>
          <div className="text-center pointer-events-auto">
            <p className="font-[DM_Serif_Display] leading-[.98]" style={{ fontSize: 'clamp(40px,7vw,96px)' }}>Built to engage.<br /><span className="italic text-[var(--teal)]">Designed to grow.</span></p>
            <button className="btn btn-primary mt-9" onClick={() => scrollTo('projects')}>View Selected Work</button>
            <a className="btn btn-ghost mt-3 ml-0 md:ml-3" href="https://wa.me/923440167840" target="_blank" rel="noreferrer"><MessageCircle size={17} /> Chat on WhatsApp</a>
          </div>
        </Chapter>
      </div>
    </div>
  )
}
