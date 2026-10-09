import { Monogram } from './Glass'
import { SocialIcon } from './SocialIcons'
import { SITE_CONFIG } from '../config/site'
const NAV = [['About','about'],['Skills','skills'],['Services','services'],['Projects','projects'],['Journey','journey'],['Contact','contact']] as const
export default function Footer() {
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  return (
    <footer className="relative border-t border-white/8" aria-label="Footer">
      <div className="wrap py-14">
        <div className="flex flex-wrap items-start justify-between gap-10">
          <div className="flex items-start gap-4">
            <Monogram size={46} />
            <div>
              <p className="font-semibold tracking-[.14em]">ABRAR HASHMI STUDIOS</p>
              <p className="text-[13px] text-[var(--text2)] mt-1">AI Creator &amp; Digital Builder</p>
              <a href={`mailto:${SITE_CONFIG.email}`} className="text-[13px] text-[var(--amber)] mt-2 inline-block min-h-[32px]">{SITE_CONFIG.email}</a>
            </div>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer">
            {NAV.map(([l, id]) => <button key={id} onClick={() => go(id)} className="text-[14px] text-[var(--text2)] hover:text-white min-h-[44px] transition">{l}</button>)}
          </nav>
          <div className="flex gap-2.5">
            {SITE_CONFIG.socials.slice(0, 5).map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={`Abrar Hashmi on ${s.label}`} title={s.label}
                className="w-11 h-11 rounded-[14px] grid place-items-center bg-white/5 border border-white/10 hover:bg-white/10 hover:-translate-y-0.5 transition"><SocialIcon name={s.label} size={18} /></a>
            ))}
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-white/8 flex flex-wrap justify-between gap-3 text-[12.5px] text-[var(--muted)]">
          <p>© 2026 Abrar Hashmi Studios. All rights reserved.</p>
          <p>Built with creativity, code &amp; AI.</p>
        </div>
      </div>
      <a href={SITE_CONFIG.whatsapp} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"
        className="fixed bottom-5 right-5 z-[115] social-tile !w-[60px] !h-[60px] !rounded-full" style={{ color: '#A9DDBB', borderColor: 'rgba(141,186,158,.4)' }}>
        <SocialIcon name="WhatsApp" size={27} />
      </a>
    </footer>
  )
}
