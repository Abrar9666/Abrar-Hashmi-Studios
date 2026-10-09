# BUILD REPORT — Abrar Hashmi Studios (2026-10-09)

## Stack
React 19 + TypeScript + Vite 8, Tailwind CSS v4 (@tailwindcss/vite), Framer Motion, GSAP + ScrollTrigger, Lenis, lucide-react.

## Structure
- src/config/frames.ts — ONE hero frame config (150 desktop / 75 mobile, maxDpr 2 / 1.5 mobile)
- src/config/site.ts — ONE personal config (socials, email, WhatsApp, GitHub TODO placeholder, contactEndpoint)
- src/data/content.ts — skills (9), services (8), projects (6), journey, tools, marquees
- src/components/ — Navbar, HeroSequence (canvas engine), Sections (About/Showreel/Skills/Services/Projects+Lightbox/Journey), Contact, Footer, CursorFollower, Glass, SocialIcons (custom brand SVG paths in 56px glass tiles)
- src/hooks/ — useReducedMotion/useIsMobile, useMagnetic
- public/ — favicon.svg (self-made AH monogram, drawn A+H with rose→amber→teal stroke), robots.txt, sitemap.xml, frames/, videos/, posters/

## Frames
Generated from user hero video (v1 multi-monitor studio): 150 WebP @1080w (2.5MB total) + 75 WebP @720w mobile (0.9MB).
Hero: sticky 100vh canvas in 520vh (mobile 400vh) scroll, progress→frame with lerp 0.12, cover-fit, DPR cap, progressive preload (first 5 → rest, 6 workers), "Preparing the experience" % loader, poster fallback, previous-frame fallback, reduced-motion static poster, 6 scroll-story chapters, floating glass cards.

## Video mapping (real user videos, CRF28, posters extracted)
hero-studio.mp4 (v1 hero), portrait.mp4 (v2 About), video-editing.mp4 (v3), web-development.mp4 (v4), content-creator.mp4 (v5), ai-automation.mp4 (v6).
Used in: hero canvas source, About portrait, featured service, Showreel (all 6, autoplay-in-view), 6 project cards + lightbox video.
No stock photos, no fake stats/testimonials, abstract CSS art (.art-rose/teal/amber/violet) only as card background texture.

## Build / preview
- `npm run build` — PASSES (tsc + vite). JS ~544KB (gzip ~181KB), CSS 32KB.
- Preview serving at http://localhost:4173 (network http://198.19.0.2:4173) — verified 200 for /, frames, mobile frames, videos; correct <title>.
- Git repo initialized, initial commit 5dd7741.

## Not verified honestly
- Visual 60fps / real-device feel, Lighthouse scores: not measured (no browser run here) — preview locally to check.
- Contact form end-to-end delivery: default mailto path only; real inbox delivery needs contactEndpoint (see README).

## Remaining for go-live on abrarhashmi.site (needs user's logins — do not block on these)
1. Create Vercel or Netlify account (user login), import this repo or upload dist/.
2. Add custom domain abrarhashmi.site in host; update Namecheap Advanced DNS (remove Lovable records, add host A/CNAME/TXT per README).
3. Optional: real GitHub profile URL (one line, src/config/site.ts), real contact endpoint, replace hero frames if a dedicated rotation video is made.
