import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { Monogram } from './Glass'
import { useMagnetic } from '../hooks/useMagnetic'

const LINKS = [['About','about'],['Skills','skills'],['Services','services'],['Projects','projects'],['Journey','journey'],['Contact','contact']] as const

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const mag = useMagnetic<HTMLAnchorElement>()
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 80); fn(); window.addEventListener('scroll', fn, { passive: true }); return () => window.removeEventListener('scroll', fn) }, [])
  const go = (id: string) => { setOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) }
  return (
    <>
      <motion.nav initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .8, ease: [0.22,1,0.36,1] }}
        aria-label="Primary"
        style={{ height: scrolled ? 60 : 68, backdropFilter: `blur(${scrolled ? 28 : 24}px) saturate(130%)`, boxShadow: scrolled ? '0 12px 40px rgba(0,0,0,.35)' : 'none' }}
        className="fixed top-5 left-1/2 -translate-x-1/2 z-[120] flex items-center justify-between gap-4 px-4 rounded-[22px] border border-white/10 bg-[rgba(12,14,19,0.68)]"
        // width per §8
        // (inline width keeps it independent of Tailwind config)
        {...{ } as object}
      >
        <style>{`nav[aria-label="Primary"]{width:min(1180px,calc(100% - 48px))}@media(max-width:767px){nav[aria-label="Primary"]{width:calc(100% - 32px)}}`}</style>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3 min-h-[44px]" aria-label="Abrar Hashmi Studios — back to top">
          <Monogram size={36} />
          <span className="hidden sm:block text-left leading-tight">
            <span className="block font-semibold tracking-wide text-[14px]">Abrar Hashmi</span>
            <span className="block text-[10px] tracking-[.22em] text-[var(--text2)]">STUDIOS</span>
          </span>
        </button>
        <div className="hidden lg:flex items-center gap-1">
          {LINKS.map(([label, id]) => (
            <button key={id} onClick={() => go(id)} className="px-4 h-11 rounded-full text-[14px] font-medium text-[var(--text2)] hover:text-white hover:bg-white/5 transition">{label}</button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <a ref={mag.ref} onMouseMove={mag.onMove} onMouseLeave={mag.onLeave} href="#contact" onClick={(e) => { e.preventDefault(); go('contact') }} className="btn btn-primary hidden md:inline-flex !h-[44px]">Let&apos;s Work <ArrowUpRight size={16} /></a>
          <button className="lg:hidden icon-tile !w-11 !h-11" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(v => !v)}>{open ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </motion.nav>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[110] lg:hidden" style={{ background: 'rgba(5,6,9,.82)', backdropFilter: 'blur(30px)' }} role="dialog" aria-modal="true" aria-label="Menu">
            <div className="h-full flex flex-col items-center justify-center gap-2">
              {LINKS.map(([label, id], i) => (
                <motion.button key={id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .06 * i }} onClick={() => go(id)} className="font-[DM_Serif_Display] text-4xl py-3 min-h-[44px]">{label}</motion.button>
              ))}
              <a href="https://wa.me/923440167840" target="_blank" rel="noreferrer" className="btn btn-primary mt-6">Chat on WhatsApp</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
