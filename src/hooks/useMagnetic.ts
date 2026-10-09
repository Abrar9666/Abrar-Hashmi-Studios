import { useRef } from 'react'
/** Magnetic hover for desktop pointers. Max 8px pull, spring via CSS transition. */
export function useMagnetic<T extends HTMLElement>(max = 8) {
  const ref = useRef<T | null>(null)
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el || window.matchMedia('(pointer: coarse)').matches) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - (r.left + r.width / 2), y = e.clientY - (r.top + r.height / 2)
    const d = Math.hypot(x, y); if (d > 100) return
    el.style.transform = `translate(${(x / r.width) * max}px, ${(y / r.height) * max}px)`
  }
  const onLeave = () => { if (ref.current) ref.current.style.transform = '' }
  return { ref, onMove, onLeave }
}
