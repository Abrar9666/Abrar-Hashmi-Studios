import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle2, MapPin, Mail, MessageCircle } from 'lucide-react'
import { GlassCard, SectionHeading } from './Glass'
import { SocialIcon } from './SocialIcons'
import { SITE_CONFIG } from '../config/site'

const EASE = [0.22, 1, 0.36, 1] as const
type F = { name: string; email: string; message: string; type: string }

export default function Contact() {
  const [f, setF] = useState<F>({ name: '', email: '', message: '', type: 'AI Video Creation' })
  const [err, setErr] = useState<Partial<F>>({})
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const set = (k: keyof F) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setF(v => ({ ...v, [k]: e.target.value }))
  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const er: Partial<F> = {}
    if (!f.name.trim()) er.name = 'Please enter your name'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) er.email = 'Please enter a valid email'
    if (f.message.trim().length < 10) er.message = 'Tell me a little more (10+ characters)'
    setErr(er); if (Object.keys(er).length) return
    setSending(true)
    try {
      // Email integration (§24): if SITE_CONFIG.contactEndpoint is set, POST JSON there.
      // Otherwise fall back to opening the visitor's email app pre-filled. No credentials in frontend.
      if (SITE_CONFIG.contactEndpoint) {
        await fetch(SITE_CONFIG.contactEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ name: f.name, email: f.email, message: f.message, projectType: f.type }) })
      } else {
        const subject = encodeURIComponent(`New project — ${f.type} (${f.name})`)
        const body = encodeURIComponent(`Name: ${f.name}\nEmail: ${f.email}\nProject type: ${f.type}\n\n${f.message}`)
        window.location.href = `mailto:${SITE_CONFIG.email}?subject=${subject}&body=${body}`
      }
      setSent(true)
    } finally { setSending(false) }
  }
  return (
    <section id="contact" className="blk" aria-label="Contact">
      <div className="aurora" style={{ width: 560, height: 560, left: '22%', bottom: '-18%', background: 'rgba(154,143,188,.09)', animation: 'drift1 27s ease-in-out infinite' }} />
      <div className="aurora" style={{ width: 420, height: 420, right: '-6%', top: '4%', background: 'rgba(201,130,143,.09)', animation: 'drift2 24s ease-in-out infinite' }} />
      <div className="wrap relative">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: .8, ease: EASE }}>
          <SectionHeading eyebrow="Contact" title={<>Have an idea?<br /><span className="italic text-[var(--rose)]">Let&apos;s build it.</span></>} />
        </motion.div>
        <GlassCard className="grid lg:grid-cols-[1fr_1.1fr] overflow-hidden !p-0" style={{ borderRadius: 32 }}>
          <div className="p-8 md:p-10 relative art-violet">
            <div className="relative">
              <p className="text-[17px] text-[var(--text2)] leading-relaxed">Whether you need a cinematic AI video, a polished edit, a modern website, or a complete content system, tell me what you&apos;re working on.</p>
              <div className="mt-8 space-y-4 text-[15px]">
                <p className="flex items-center gap-3"><span className="icon-tile"><Mail size={17} /></span>{SITE_CONFIG.email}</p>
                <p className="flex items-center gap-3"><span className="icon-tile"><MapPin size={17} /></span>Pakistan — working worldwide</p>
                <p className="flex items-center gap-3"><span className="icon-tile"><MessageCircle size={17} /></span>+92 344 0167840</p>
              </div>
              <a href={SITE_CONFIG.whatsapp} target="_blank" rel="noreferrer" className="btn mt-9" style={{ background: 'rgba(141,186,158,.16)', border: '1px solid rgba(141,186,158,.45)', color: '#DFF2E6' }}>
                <SocialIcon name="WhatsApp" size={19} /> Chat on WhatsApp
              </a>
              <p className="eyebrow !mb-4 mt-12">Follow the work</p>
              <div className="flex flex-wrap gap-3">
                {SITE_CONFIG.socials.map(s => (
                  <a key={s.label} href={s.href} target={s.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="social-tile" aria-label={`Abrar Hashmi on ${s.label}`} title={s.label}><SocialIcon name={s.label} /></a>
                ))}
              </div>
            </div>
          </div>
          <div className="p-8 md:p-10 bg-[rgba(255,255,255,.02)]">
            {sent ? (
              <motion.div initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} className="h-full grid place-items-center text-center py-16">
                <div>
                  <span className="icon-tile mx-auto !w-16 !h-16 !rounded-full" style={{ color: 'var(--success)' }}><CheckCircle2 size={30} /></span>
                  <h3 className="text-3xl mt-6">Message sent.</h3>
                  <p className="text-[var(--text2)] mt-2">Thanks — I&apos;ll get back to you soon.</p>
                  <button className="btn btn-ghost mt-7" onClick={() => { setSent(false); setF({ name: '', email: '', message: '', type: 'AI Video Creation' }) }}>Send another message</button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={submit} noValidate className="space-y-5">
                <div><label className="flabel" htmlFor="cf-name">Name *</label>
                  <input id="cf-name" className={`field ${err.name ? 'err' : ''}`} value={f.name} onChange={set('name')} placeholder="Your name" autoComplete="name" aria-invalid={!!err.name} />
                  {err.name && <p className="text-[13px] mt-2" style={{ color: 'var(--error)' }}>{err.name}</p>}</div>
                <div><label className="flabel" htmlFor="cf-email">Email *</label>
                  <input id="cf-email" type="email" className={`field ${err.email ? 'err' : ''}`} value={f.email} onChange={set('email')} placeholder="you@example.com" autoComplete="email" aria-invalid={!!err.email} />
                  {err.email && <p className="text-[13px] mt-2" style={{ color: 'var(--error)' }}>{err.email}</p>}</div>
                <div><label className="flabel" htmlFor="cf-type">Project type</label>
                  <select id="cf-type" className="field" value={f.type} onChange={set('type')}>
                    {['AI Video Creation','Video Editing','Graphic Design','Website Development','YouTube Automation','Social Media Marketing','Meta Ads Management','Guest Posting & SEO','Something else'].map(o => <option key={o} style={{ background: '#12151C' }}>{o}</option>)}
                  </select></div>
                <div><label className="flabel" htmlFor="cf-msg">Message *</label>
                  <textarea id="cf-msg" rows={5} className={`field resize-none ${err.message ? 'err' : ''}`} value={f.message} onChange={set('message')} placeholder="Tell me what you're working on…" aria-invalid={!!err.message} />
                  {err.message && <p className="text-[13px] mt-2" style={{ color: 'var(--error)' }}>{err.message}</p>}</div>
                <button type="submit" disabled={sending} className="btn btn-primary w-full justify-center disabled:opacity-60">
                  <Send size={16} /> {sending ? 'Sending…' : 'Send Message'}
                </button>
                <p className="text-[12.5px] text-[var(--muted)] text-center">No spam, no obligation — just a conversation about your project.</p>
              </form>
            )}
          </div>
        </GlassCard>
      </div>
    </section>
  )
}
