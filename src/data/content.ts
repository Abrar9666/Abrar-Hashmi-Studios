import { Clapperboard, Sparkles, PenTool, Palette, Code2, MonitorPlay, TrendingUp, Target, Search, type LucideIcon } from 'lucide-react'

export interface Skill { name: string; description: string; icon: LucideIcon; accent: string }
export const SKILLS: Skill[] = [
  { name: 'Video Editing', description: 'Cinematic cuts, pacing and sound that hold attention to the last frame.', icon: Clapperboard, accent: '#C9828F' },
  { name: 'AI Video Generation', description: 'Directed AI footage — scenes, ads and stories generated frame by frame.', icon: Sparkles, accent: '#D6A45C' },
  { name: 'Prompt Engineering', description: 'Precise prompts that turn vague ideas into repeatable visual systems.', icon: PenTool, accent: '#6EAFA8' },
  { name: 'Content Creation', description: 'Short-form and long-form content built around hooks and retention.', icon: Clapperboard, accent: '#9A8FBC' },
  { name: 'Graphic Designing', description: 'Thumbnails, brand visuals and social creatives with a premium finish.', icon: Palette, accent: '#C9828F' },
  { name: 'YouTube Automation', description: 'Faceless channel systems — research, scripts, production, publishing.', icon: MonitorPlay, accent: '#D6A45C' },
  { name: 'Web Development', description: 'Fast, responsive websites and interactive experiences that convert.', icon: Code2, accent: '#6EAFA8' },
  { name: 'Social Media Marketing', description: 'Platform-first strategy, creative direction and audience growth.', icon: TrendingUp, accent: '#9A8FBC' },
  { name: 'Guest Posting & SEO', description: 'Authority building, quality backlinks and search visibility.', icon: Search, accent: '#C9828F' },
]

export interface Service { title: string; description: string; icon: LucideIcon; accent: string; featured?: boolean }
export const SERVICES: Service[] = [
  { title: 'AI Video Creation', description: 'Cinematic AI-powered videos, ads, storytelling content and visual experiments — directed like real productions, generated with modern AI tools.', icon: Sparkles, accent: '#D6A45C', featured: true },
  { title: 'Video Editing', description: 'Professional short-form and long-form editing optimized for attention and storytelling.', icon: Clapperboard, accent: '#C9828F' },
  { title: 'Graphic Design', description: 'Modern visual assets, promotional creatives, thumbnails, branding visuals and social media graphics.', icon: Palette, accent: '#6EAFA8' },
  { title: 'Website Development', description: 'Fast, responsive, modern websites and interactive digital experiences.', icon: Code2, accent: '#9A8FBC' },
  { title: 'YouTube Automation', description: 'Content systems, channel strategy, production workflows and scalable YouTube operations.', icon: MonitorPlay, accent: '#C9828F' },
  { title: 'Social Media Marketing', description: 'Content strategy, creative direction, audience growth and platform-focused marketing.', icon: TrendingUp, accent: '#D6A45C' },
  { title: 'Meta Ads Management', description: 'Creative-led Meta advertising campaigns designed around testing, optimization and measurable growth.', icon: Target, accent: '#6EAFA8' },
  { title: 'Guest Posting & SEO', description: 'Content distribution, authority building, guest posting and search visibility.', icon: Search, accent: '#9A8FBC' },
]

export interface Project { title: string; category: string; description: string; tags: string[]; video: string; poster: string; size: 'large'|'medium'|'small' }
export const PROJECTS: Project[] = [
  { title: 'AI Cinematic Ads', category: 'AI Video / Ads', description: 'Promotional films generated and directed with AI — product stories with a cinematic finish.', tags: ['AI Video','Ads','Direction'], video: '/videos/hero-studio.mp4', poster: '/posters/hero-studio.webp', size: 'large' },
  { title: 'YouTube Automation Channels', category: 'YouTube Automation', description: 'Faceless channel systems: research, scripting, AI production and publishing pipelines.', tags: ['YouTube','Systems'], video: '/videos/ai-automation.mp4', poster: '/posters/ai-automation.webp', size: 'medium' },
  { title: 'AI Adventure / AI Vlogs', category: 'Vlog / AI Travel', description: 'AI travel and adventure stories crafted as immersive short-form journeys.', tags: ['Vlog','AI Travel'], video: '/videos/content-creator.mp4', poster: '/posters/content-creator.webp', size: 'medium' },
  { title: 'Product Promo Videos', category: 'Product / Promo Video', description: 'Product showcase videos edited for attention, clarity and conversion.', tags: ['Product','Promo'], video: '/videos/video-editing.mp4', poster: '/posters/video-editing.webp', size: 'small' },
  { title: 'Portfolio Websites', category: 'Web Design / Portfolio', description: 'Modern responsive portfolio websites designed for creators and studios.', tags: ['Web Design','Portfolio'], video: '/videos/web-development.mp4', poster: '/posters/web-development.webp', size: 'small' },
  { title: 'Automation Systems', category: 'Automation Systems', description: 'Custom content automation workflows that remove repetitive production work.', tags: ['Automation','Workflows'], video: '/videos/portrait.mp4', poster: '/posters/portrait.webp', size: 'small' },
]

export const JOURNEY = [
  { year: '2021', role: 'Content Creator', text: 'Started creating digital content and learning design.' },
  { year: '2022', role: 'Freelance Video Editor', text: 'Turned editing into a professional freelance practice.' },
  { year: '2023', role: 'YouTube Automation Specialist', text: 'Built and ran faceless YouTube channel systems.' },
  { year: '2024', role: 'AI Video Production Expert', text: 'Focused on advanced AI tools for cinematic video production.' },
]

export const TOOLS = ['CapCut','Alight Motion','ElevenLabs','Google Flow','Sora','React','Tailwind CSS']
export const MARQUEE_WORDS = ['AI VIDEO','EDITING','WEB DEVELOPMENT','DESIGN','AUTOMATION','CONTENT','SEO','MARKETING']
