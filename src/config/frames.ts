/**
 * ============================================================
 *  HERO FRAME SEQUENCE — SINGLE CONFIGURATION POINT
 *  To replace the portrait/hero sequence, drop new WebP frames
 *  into public/frames/ (desktop) and public/frames/mobile/
 *  named frame-0001.webp … and update the counts below.
 *  Nothing else in the codebase needs to change.
 * ============================================================
 */
export const FRAME_CONFIG = {
  desktop: { frameCount: 150, path: '/frames/frame-{index}.webp', poster: '/posters/hero-studio.webp' },
  mobile: { frameCount: 75, path: '/frames/mobile/frame-{index}.webp', poster: '/posters/hero-studio.webp' },
  maxDpr: 2,
  mobileMaxDpr: 1.5,
} as const

export function frameUrl(template: string, index1Based: number): string {
  return template.replace('{index}', String(index1Based).padStart(4, '0'))
}
