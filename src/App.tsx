import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import Navbar from './components/Navbar'
import HeroSequence from './components/HeroSequence'
import CursorFollower from './components/CursorFollower'
import { About, Skills, Services, Projects, Journey, Showreel } from './components/Sections'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { useReducedMotion } from './hooks/useReducedMotion'

function Intro() {
  const reduced = useReducedMotion()
  const [show, setShow] = useState(false)
  useEffect(() => {
    if (reduced || sessionStorage.getItem('ahs-visited')) return
    setShow(true); sessionStorage.setItem('ahs-visited', '1')
    const t = setTimeout(() => setShow(false), 1500)
    return () => clearTimeout(t)
  }, [reduced])
  if (!show) return null
  return (
    <div className="fixed inset-0 z-[300] grid place-items-center bg-[#08090D] pointer-events-none" style={{ animation: 'introFade .5s ease 1.1s forwards' }} aria-hidden="true">
      <style>{`@keyframes introFade{to{opacity:0;visibility:hidden}} @keyframes introIn{from{opacity:0;transform:scale(.97)}to{opacity:1;transform:scale(1)}}`}</style>
      <div className="text-center" style={{ animation: 'introIn .8s cubic-bezier(.22,1,.36,1)' }}>
        <p className="font-[DM_Serif_Display] text-3xl md:text-5xl tracking-wide">ABRAR HASHMI STUDIOS</p>
        <p className="text-[11px] tracking-[.34em] text-[var(--amber)] mt-4">AI CREATOR &amp; DIGITAL BUILDER</p>
      </div>
    </div>
  )
}

export default function App() {
  const reduced = useReducedMotion()
  useEffect(() => {
    if (reduced) return
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true })
    let raf = 0
    const loop = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); lenis.destroy() }
  }, [reduced])
  return (
    <>
      <Intro />
      <div className="grain" aria-hidden="true" />
      <CursorFollower />
      <Navbar />
      <main>
        <HeroSequence />
        <About />
        <Showreel />
        <Skills />
        <Services />
        <Projects />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
