/**
 * ============================================================
 *  SITE CONFIGURATION — edit everything personal HERE.
 *  - GitHub URL: real profile (https://github.com/Abrar9666).
 *  - Contact form: by default it opens the visitor's email app
 *    (mailto). To use a real endpoint (Formspree / Resend / your
 *    own API), set CONTACT_ENDPOINT to its POST URL — the form
 *    will then POST JSON {name,email,message,projectType}.
 *    NEVER put private API keys/credentials in frontend code.
 * ============================================================
 */
export const SITE_CONFIG = {
  name: 'Abrar Hashmi',
  brand: 'Abrar Hashmi Studios',
  title: 'AI Creator & Digital Builder',
  url: 'https://abrarhashmi.site',
  email: 'abrarnoorhashmi@gmail.com',
  whatsapp: 'https://wa.me/923440167840',
  github: 'https://github.com/Abrar9666',
  contactEndpoint: '', // e.g. 'https://formspree.io/f/xxxxxxx' — leave empty for mailto fallback
  socials: [
    { label: 'YouTube', href: 'https://youtube.com/@toxic_hashmi_editx' },
    { label: 'Instagram', href: 'https://www.instagram.com/abrarhashmi_era' },
    { label: 'TikTok', href: 'https://www.tiktok.com/@abrar_noor' },
    { label: 'Facebook', href: 'https://www.facebook.com/share/17goszk982/' },
    { label: 'WhatsApp', href: 'https://wa.me/923440167840' },
    { label: 'Email', href: 'mailto:abrarnoorhashmi@gmail.com' },
    { label: 'GitHub', href: 'https://github.com/Abrar9666' },
  ],
} as const
