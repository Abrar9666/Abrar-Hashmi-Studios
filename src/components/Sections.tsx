import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Play, X, ExternalLink, Wrench } from 'lucide-react'
import { GlassCard, SectionHeading, Monogram } from './Glass'
import { SKILLS, SERVICES, PROJECTS, JOURNEY, TOOLS, MARQUEE_WORDS, type Project } from '../data/content'

gsap.registerPlugin(ScrollTrigger)
const EASE = [0.22, 1, 0.36, 1] as const
const fadeUp = { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-80px' }, transition: { duration: .8, ease: EASE } } as const

export function AutoVideo({ src, poster, className = '', label }: { src: string; poster: string; className?: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const v = ref.current; if (!v) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { v.play().catch(() => {}) } else v.pause() }, { threshold: 0.25 })
    io.observe(v); return () => io.disconnect()
  }, [])
  return <video ref={ref} className={className} src={src} poster={poster} muted loop playsInline preload="metadata" aria-label={label} />
}

/* ---------------- ABOUT (§17) ---------------- */
export function About() {
  return (
    <section id="about" className="blk" aria-label="About Abrar Hashmi">
      <div className="aurora" style={{ width: 500, height: 500, right: '-10%', top: '0%', background: 'rgba(201,130,143,.09)', animation: 'drift2 26s ease-in-out infinite' }} />
      <div className="wrap grid lg:grid-cols-2 gap-12 lg:gap-20 items-start relative">
        <motion.div {...fadeUp}>
          <p className="eyebrow">About</p>
          <h2 className="section-title">Building with<br />creativity <span className="italic text-[var(--rose)]">+</span> technology.</h2>
          <div className="mt-10 max-w-[420px]">
            <GlassCard className="overflow-hidden !p-0" style={{ borderRadius: 28 }}>
              <AutoVideo src="/videos/portrait.mp4" poster="/posters/portrait.webp" label="Portrait video of Abrar Hashmi" className="w-full aspect-[4/3] object-cover" />
              <div className="p-6 flex items-center gap-4">
                <Monogram size={48} />
                <div>
                  <p className="font-semibold tracking-wide">ABRAR HASHMI</p>
                  <p className="text-[11px] tracking-[.22em] text-[var(--text2)] mt-1">AI CREATOR &amp; DIGITAL BUILDER</p>
                  <p className="text-[11px] tracking-[.22em] text-[var(--amber)] mt-1">PAKISTAN</p>
                </div>
              </div>
            </GlassCard>
          </div>
        </motion.div>
        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: .12 }}>
          <p className="text-[19px] leading-[1.7] text-[var(--text)]">I create AI videos, professional edits, and websites for brands and creators, combining visual storytelling, emerging AI tools, design, and development to turn ideas into engaging digital experiences.</p>
          <p className="mt-6 text-[17px] leading-[1.7] text-[var(--text2)]">My work spans AI video production, professional editing, web development, content creation, automation, social media, and digital marketing — with a focus on making every project useful, visually strong, and built for growth.</p>
          <p className="mt-6 text-[17px] leading-[1.7] text-[var(--text2)]">My work sits at the intersection of visual storytelling, artificial intelligence, design, development, and digital growth.</p>
          <div className="mt-9 flex flex-wrap gap-2.5">
            {['AI Enthusiast','Video Expert','Web Developer','Content Creator'].map(t => <span key={t} className="px-4 py-2 rounded-full text-[13px] font-semibold bg-white/5 border border-white/10">{t}</span>)}
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3">
            {[['AI','Direction & generation'],['VIDEO','Editing & story'],['WEB','Design & code'],['CONTENT','Systems & growth']].map(([k, v]) => (
              <GlassCard key={k} className="p-5"><p className="font-[DM_Serif_Display] text-2xl">{k}</p><p className="text-[13px] text-[var(--text2)] mt-1">{v}</p></GlassCard>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ---------------- SKILLS (§18) ---------------- */
export function Skills() {
  return (
    <section id="skills" className="blk" aria-label="Skills">
      <div className="wrap">
        <motion.div {...fadeUp}><SectionHeading eyebrow="Skills & Expertise" title={<>Skills that<br />move ideas <span className="italic text-[var(--amber)]">forward.</span></>} /></motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {SKILLS.map((s, i) => (
            <motion.div key={s.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: .7, delay: (i % 3) * .08, ease: EASE }}
              whileHover={{ y: -6, scale: 1.015 }} className={i % 4 === 0 ? 'lg:translate-y-6' : ''}>
              <GlassCard className="p-6 h-full">
                <span className="icon-tile" style={{ boxShadow: `inset 0 0 18px ${s.accent}33`, color: s.accent }}><s.icon size={20} /></span>
                <h3 className="text-[21px] mt-5">{s.name}</h3>
                <p className="text-[14.5px] text-[var(--text2)] mt-2 leading-relaxed">{s.description}</p>
                <div className="mt-5 h-px w-full bg-white/8 overflow-hidden rounded"><div className="h-full w-2/3" style={{ background: `linear-gradient(90deg, ${s.accent}, transparent)` }} /></div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
      {/* skills marquee (§34) */}
      <div className="marquee mt-20" aria-hidden="true">
        <div className="marquee-track" style={{ animationDuration: '44s' }}>
          {[...MARQUEE_WORDS, ...MARQUEE_WORDS].map((w, i) => <span key={i} className="font-[DM_Serif_Display] text-[clamp(28px,4vw,52px)] whitespace-nowrap" style={{ color: i % 2 ? 'rgba(245,243,239,.16)' : 'transparent', WebkitTextStroke: i % 2 ? '0' : '1px rgba(245,243,239,.22)' }}>{w}&nbsp;&nbsp;·&nbsp;&nbsp;</span>)}
        </div>
      </div>
    </section>
  )
}

/* ---------------- SERVICES (§19) ---------------- */
export function Services() {
  const arts = ['art-rose','art-amber','art-teal','art-violet']
  return (
    <section id="services" className="blk" aria-label="Services">
      <div className="aurora" style={{ width: 520, height: 520, left: '-10%', top: '10%', background: 'rgba(110,175,168,.07)', animation: 'drift1 28s ease-in-out infinite' }} />
      <div className="wrap relative">
        <motion.div {...fadeUp}><SectionHeading eyebrow="Services" title={<>Creative services,<br />built for the <span className="italic text-[var(--teal)]">digital era.</span></>} /></motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {SERVICES.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: .7, delay: (i % 3) * .08, ease: EASE }} whileHover={{ y: -5 }} className={s.featured ? 'md:col-span-2' : ''}>
              <GlassCard className="p-7 h-full overflow-hidden">
                <div className={`absolute inset-0 opacity-60 ${arts[i % 4]}`} aria-hidden="true" />
                <div className="relative">
                  <span className="icon-tile" style={{ boxShadow: `inset 0 0 18px ${s.accent}38`, color: s.accent }}><s.icon size={20} /></span>
                  <h3 className={`${s.featured ? 'text-[28px] md:text-[32px]' : 'text-[22px]'} mt-5`}>{s.title}</h3>
                  <p className={`text-[var(--text2)] mt-2 leading-relaxed ${s.featured ? 'text-[16px] max-w-[520px]' : 'text-[14.5px]'}`}>{s.description}</p>
                  {s.featured && <div className="mt-6 rounded-2xl overflow-hidden border border-white/10"><AutoVideo src="/videos/hero-studio.mp4" poster="/posters/hero-studio.webp" label="AI video creation studio scene" className="w-full aspect-[21/9] object-cover" /></div>}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- PROJECTS + LIGHTBOX (§20-21) ---------------- */
export function Projects() {
  const [active, setActive] = useState<Project | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (!active) return
    const prev = document.body.style.overflow; document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setActive(null) }
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey) }
  }, [active])
  const spans: Record<Project['size'], string> = { large: 'md:col-span-2 md:row-span-2', medium: 'md:col-span-1', small: 'md:col-span-1' }
  return (
    <section id="projects" className="blk" style={{ background: 'linear-gradient(180deg, transparent, rgba(0,0,0,.35), transparent)' }} aria-label="Selected work">
      <div className="wrap">
        <motion.div {...fadeUp}><SectionHeading eyebrow="Selected Work" title="Selected work." sub="A collection of experiments, productions, systems, and digital experiences." /></motion.div>
        <div className="grid md:grid-cols-3 auto-rows-[240px] md:auto-rows-[210px] gap-4 md:gap-5">
          {PROJECTS.map((p, i) => (
            <motion.button key={p.title} type="button" onClick={() => setActive(p)}
              initial={{ opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: .75, delay: (i % 3) * .07, ease: EASE }}
              className={`group relative text-left overflow-hidden rounded-[24px] border border-white/10 bg-[var(--elev)] min-h-[240px] ${spans[p.size]}`} aria-label={`Open project: ${p.title}`}>
              <img src={p.poster} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 transition" style={{ background: 'linear-gradient(180deg, rgba(8,9,13,.08), rgba(8,9,13,.30) 55%, rgba(8,9,13,.92))' }} />
              <span className="absolute top-4 left-4 text-[10px] font-semibold tracking-[.22em] px-3 py-1.5 rounded-full bg-black/35 border border-white/15 backdrop-blur-md">SELECTED WORK / 0{i + 1}</span>
              <span className="absolute top-4 right-4 icon-tile !rounded-full opacity-0 group-hover:opacity-100 transition duration-500" style={{ background: 'rgba(8,9,13,.45)' }}><Play size={17} /></span>
              <span className="absolute inset-x-0 bottom-0 p-5 md:p-6 translate-y-1 group-hover:translate-y-0 transition duration-500 block">
                <span className="block text-[11px] tracking-[.2em] font-semibold text-[var(--amber)]">{p.category.toUpperCase()}</span>
                <span className="block font-[DM_Serif_Display] text-[24px] md:text-[27px] mt-1.5 leading-tight">{p.title}</span>
                <span className="hidden md:block text-[13.5px] text-[var(--text2)] mt-1.5 leading-snug">{p.description}</span>
                <span className="mt-3 flex flex-wrap gap-1.5">{p.tags.map(t => <span key={t} className="text-[11px] px-2.5 py-1 rounded-full bg-white/8 border border-white/12">{t}</span>)}</span>
              </span>
            </motion.button>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {active && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="lightbox" role="dialog" aria-modal="true" aria-label={active.title} onClick={() => setActive(null)}>
            <motion.div initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .96 }} transition={{ duration: .45, ease: EASE }}
              className="w-full max-w-[1100px]" onClick={e => e.stopPropagation()}>
              <GlassCard className="overflow-hidden !p-0" style={{ borderRadius: 28 }}>
                <video src={active.video} poster={active.poster} controls autoPlay muted loop playsInline className="w-full aspect-video object-cover bg-black" aria-label={`${active.title} video`} />
                <div className="p-6 md:p-8 flex flex-wrap items-start justify-between gap-4">
                  <div className="max-w-[620px]">
                    <p className="text-[11px] tracking-[.22em] font-semibold text-[var(--amber)]">{active.category.toUpperCase()}</p>
                    <h3 className="text-3xl mt-2">{active.title}</h3>
                    <p className="text-[var(--text2)] mt-2">{active.description}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">{active.tags.map(t => <span key={t} className="text-[11px] px-2.5 py-1 rounded-full bg-white/8 border border-white/12">{t}</span>)}</div>
                  </div>
                  <a className="btn btn-ghost !h-[46px]" href="https://wa.me/923440167840" target="_blank" rel="noreferrer">Discuss a project <ExternalLink size={15} /></a>
                </div>
              </GlassCard>
              <button ref={closeRef} onClick={() => setActive(null)} aria-label="Close project" className="icon-tile fixed top-6 right-6 !w-12 !h-12 !rounded-full z-10"><X size={20} /></button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

/* ---------------- JOURNEY (§22) ---------------- */
export function Journey() {
  const lineRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!lineRef.current) return
    const tween = gsap.fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, ease: 'none', transformOrigin: 'left center',
      scrollTrigger: { trigger: lineRef.current, start: 'top 85%', end: 'top 35%', scrub: 0.6 } })
    return () => { tween.scrollTrigger?.kill(); tween.kill() }
  }, [])
  return (
    <section id="journey" className="blk" aria-label="My journey">
      <div className="wrap">
        <motion.div {...fadeUp}><SectionHeading eyebrow="Journey" title="My journey." /></motion.div>
        <div className="relative">
          <div className="hidden md:block absolute left-0 right-0 top-[7px] h-px bg-white/10" />
          <div ref={lineRef} className="hidden md:block absolute left-0 right-0 top-[7px] h-px" style={{ background: 'linear-gradient(90deg, var(--rose), var(--amber), var(--teal))' }} />
          <div className="grid md:grid-cols-4 gap-8 md:gap-6">
            {JOURNEY.map((j, i) => (
              <motion.div key={j.year} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: .7, delay: i * .1, ease: EASE }} className="relative pl-6 md:pl-0 md:pt-10 border-l border-white/10 md:border-l-0">
                <span className={`absolute left-[-6px] md:left-0 top-1.5 md:top-0 w-[13px] h-[13px] rounded-full border-2 ${i === JOURNEY.length - 1 ? 'bg-[var(--amber)] border-[var(--amber)] shadow-[0_0_18px_rgba(214,164,92,.55)]' : 'bg-[var(--bg)] border-[var(--rose)]'}`} />
                <p className={`font-[DM_Serif_Display] text-[44px] leading-none ${i === JOURNEY.length - 1 ? 'text-[var(--amber)]' : ''}`}>{j.year}</p>
                <h3 className="text-[19px] mt-3">{j.role}</h3>
                <p className="text-[14px] text-[var(--text2)] mt-1.5 leading-relaxed">{j.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
        {/* tools marquee (§23) */}
        <div className="mt-24">
          <p className="eyebrow flex items-center gap-2"><Wrench size={13} /> Tools I build with</p>
          <div className="marquee"><div className="marquee-track">{[...TOOLS, ...TOOLS, ...TOOLS, ...TOOLS].map((t, i) => <span key={i} className="tool-pill">{t}</span>)}</div></div>
          <div className="marquee rev mt-4"><div className="marquee-track" style={{ animationDuration: '42s' }}>{[...TOOLS].reverse().concat(TOOLS, TOOLS, TOOLS).map((t, i) => <span key={i} className="tool-pill">{t}</span>)}</div></div>
        </div>
      </div>
    </section>
  )
}

/* ---------------- SHOWREEL (all 6 real scene videos) ---------------- */
const REEL = [
  { src: '/videos/hero-studio.mp4', poster: '/posters/hero-studio.webp', label: 'Studio — AI production desk' },
  { src: '/videos/video-editing.mp4', poster: '/posters/video-editing.webp', label: 'Video editing timeline' },
  { src: '/videos/web-development.mp4', poster: '/posters/web-development.webp', label: 'Web development' },
  { src: '/videos/content-creator.mp4', poster: '/posters/content-creator.webp', label: 'Content creation setup' },
  { src: '/videos/ai-automation.mp4', poster: '/posters/ai-automation.webp', label: 'AI & automation dashboards' },
  { src: '/videos/portrait.mp4', poster: '/posters/portrait.webp', label: 'Portrait' },
]
export function Showreel() {
  return (
    <section className="blk !py-24" aria-label="Showreel">
      <div className="wrap">
        <motion.div {...fadeUp}><SectionHeading eyebrow="Inside the studio" title={<>The work, <span className="italic text-[var(--rose)]">in motion.</span></>} sub="Real scenes from my desk — AI production, editing, code and content systems." /></motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {REEL.map((r, i) => (
            <motion.figure key={r.src} initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: .7, delay: (i % 3) * .08, ease: EASE }} className="relative overflow-hidden rounded-[22px] border border-white/10 group">
              <AutoVideo src={r.src} poster={r.poster} label={r.label} className="w-full aspect-video object-cover transition duration-500 group-hover:scale-[1.04]" />
              <figcaption className="absolute inset-x-0 bottom-0 p-4 text-[12px] font-semibold tracking-[.14em]" style={{ background: 'linear-gradient(transparent, rgba(8,9,13,.85))' }}>{r.label.toUpperCase()}</figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
