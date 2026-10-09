import type { ReactNode } from 'react'
export function GlassCard({ children, className = '', style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
  return <div className={`glass-card ${className}`} style={style}>{children}</div>
}
export function SectionHeading({ eyebrow, title, sub }: { eyebrow: string; title: ReactNode; sub?: string }) {
  return (
    <header className="section-head">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
      {sub && <p className="section-sub">{sub}</p>}
    </header>
  )
}
/** AH monogram logo (SVG, matches favicon). */
export function Monogram({ size = 38 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" className="monogram">
      <defs><linearGradient id="mg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#C9828F"/><stop offset=".55" stopColor="#D6A45C"/><stop offset="1" stopColor="#6EAFA8"/>
      </linearGradient></defs>
      <rect x="2" y="2" width="60" height="60" rx="16" fill="#12151C" stroke="rgba(255,255,255,.14)"/>
      <path d="M14 46 L28 18 L36 34 L42 22" fill="none" stroke="url(#mg)" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20 37 H31" stroke="#F5F3EF" strokeWidth="3.6" strokeLinecap="round"/>
      <path d="M44 18 V46 M44 32 H52 M52 18 V46" fill="none" stroke="#F5F3EF" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" opacity=".92"/>
    </svg>
  )
}
