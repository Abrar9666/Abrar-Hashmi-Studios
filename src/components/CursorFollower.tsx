import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function CursorFollower() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  useEffect(() => {
    if (reduced || window.matchMedia('(pointer: coarse)').matches) return
    const el = ref.current; if (!el) return
    let x = -100, y = -100, tx = -100, ty = -100, raf = 0
    const move = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY
      const t = (e.target as HTMLElement).closest('a,button,[data-cursor]')
      el.classList.toggle('big', !!t) }
    const loop = () => { x += (tx - x) * 0.16; y += (ty - y) * 0.16
      el.style.transform = `translate(${x - el.offsetWidth / 2}px, ${y - el.offsetHeight / 2}px)`; raf = requestAnimationFrame(loop) }
    window.addEventListener('mousemove', move); raf = requestAnimationFrame(loop)
    return () => { window.removeEventListener('mousemove', move); cancelAnimationFrame(raf) }
  }, [reduced])
  if (reduced) return null
  return <div ref={ref} className="cursor-ring" aria-hidden="true"><span className="cursor-dot" /></div>
}
