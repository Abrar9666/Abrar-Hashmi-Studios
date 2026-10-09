import { useEffect, useState } from 'react'
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const fn = () => setReduced(mq.matches)
    mq.addEventListener('change', fn); return () => mq.removeEventListener('change', fn)
  }, [])
  return reduced
}
export function useIsMobile(bp = 768): boolean {
  const [m, setM] = useState(() => typeof window !== 'undefined' && window.innerWidth < bp)
  useEffect(() => { const fn = () => setM(window.innerWidth < bp); window.addEventListener('resize', fn); return () => window.removeEventListener('resize', fn) }, [bp])
  return m
}
