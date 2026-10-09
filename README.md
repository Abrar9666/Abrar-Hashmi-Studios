# Abrar Hashmi Studios — abrarhashmi.site

Production portfolio for **Abrar Hashmi — AI Creator & Digital Builder**.
React + TypeScript + Vite + Tailwind CSS v4 + Framer Motion + GSAP/ScrollTrigger + Lenis + Lucide.

## Run locally
```bash
npm install
npm run dev        # development
npm run build      # production build -> dist/
npm run preview    # serve the production build (default http://localhost:4173)
```

## Replace media
- **Hero frame sequence:** put WebP frames in `public/frames/` named `frame-0001.webp`… and `public/frames/mobile/`,
  then update counts in the single config file `src/config/frames.ts` (`FRAME_CONFIG`).
  Frames here were generated from the user's hero studio video (150 desktop @1080w, 75 mobile @720w).
- **Videos:** replace files in `public/videos/` (hero-studio, portrait, video-editing, web-development, content-creator, ai-automation)
  and their posters in `public/posters/` (same base name, `.webp`).
- **Project/service/skill text:** edit `src/data/content.ts`. **Socials/GitHub/email:** edit `src/config/site.ts`
  (GitHub profile is set to https://github.com/Abrar9666 — change it in that one file if needed).

## Contact form email
Default: opens the visitor's email app pre-filled to `abrarnoorhashmi@gmail.com` (no backend, no credentials in code).
To receive submissions directly, set `contactEndpoint` in `src/config/site.ts` to a form endpoint
(e.g. Formspree `https://formspree.io/f/xxxxxxx`) — the form will POST JSON `{name,email,message,projectType}`.
Never put private API keys in frontend code.

## Deploy / GitHub
Target repo: https://github.com/Abrar9666/Abrar-Hashmi-Studios

If the repo exists on GitHub and this local copy is not yet connected, run exactly:
```
git remote add origin https://github.com/Abrar9666/Abrar-Hashmi-Studios.git
git branch -M main
git push -u origin main
```
(The local branch was `master` with all commits ready, so the `branch -M main` rename makes the
first push match GitHub's default. If the remote was already added, skip the first command.)

## Deploy + attach domain abrarhashmi.site (domain at Namecheap)
1. Deploy `dist/` (or this repo) to Vercel/Netlify (both free; import the GitHub repo or drag the `dist` folder).
2. In the host dashboard add custom domain `abrarhashmi.site` (+ `www`).
3. In Namecheap: Domain List → abrarhashmi.site → Manage → Advanced DNS:
   - Delete the old Lovable A/CNAME records.
   - Add the host's records — Vercel: `A @ 76.76.21.21` and `CNAME www cname.vercel-dns.com`;
     Netlify: follow the DNS values shown in its domain panel. Add any TXT verification record shown.
4. Wait for propagation (minutes to a few hours). SSL is automatic on Vercel/Netlify.
The domain itself stays registered at Namecheap — only DNS pointing changes.
