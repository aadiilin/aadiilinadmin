export const SITE_URL = 'https://websadilo.vercel.app'
export const SITE_NAME = 'Jomor Design | High-End Digital Experiences'
export const SITE_DESCRIPTION =
  'Jomor Design is an independent design practice focused on digital experiences. We mostly do good ol’ fashioned branding and websites. How can we help you?'
export const DEFAULT_OG_IMAGE = '/images/imbizo.jpeg'
export const SITE_LOCALE = 'en_US'
export const CREATOR_NAME = 'Jomor Design'
export const CREATOR_ALTERNATE_NAME = 'Jomor'
export const CREATOR_ALTERNATE_NAME_2 = 'Jomor Studio'
export const CREATOR_JOB_TITLE = 'Digital Experience & Creative Studio'
export const CREATOR_EMAIL = 'jomor@jomordesign.com'
export const CREATOR_PHONE = '+1 (514) 222-3461'
export const CREATOR_LOCATION = 'Montreal, Quebec, Canada'
export const CREATOR_IMAGE = '/images/icon.png'

export const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/jomordesign',
  twitter: 'https://twitter.com/jomordesign',
  github: 'https://github.com/jomordesign',
  whatsapp: 'https://wa.me/15142223461',
  pinterest: 'https://pinterest.com/jomordesign',
}

export const SKILLS = [
  'Web Design & WebGL',
  'Brand Identity',
  'Art Direction',
  'Interactive Prototyping',
  '3D Motion & Physics',
  'Frontend Architecture',
  'E-Commerce Development',
  'Visual Storytelling',
]

export interface Project {
  slug: string
  title: string
  role: string
  year: string
  description: string
  image: string
  category?: string
  tags?: string[]
  link?: string
  index?: string
}

export const PROJECTS: Project[] = [
  {
    slug: 'metrica',
    title: 'Métrica',
    role: 'Brand Identity & WebGL Experience',
    year: '2025',
    index: '1/4',
    description:
      'A comprehensive visual identity and interactive WebGL digital platform for Métrica, an architectural innovation studio based in Barcelona. Crafted with fluid 3D viewports and precision grid typography.',
    image: '/images/imbizo.jpeg',
    category: 'Branding & WebGL',
    tags: ['webgl', 'brand identity', 'architecture', 'typography'],
    link: 'https://www.jomor.design/project/metrica',
  },
  {
    slug: 'stellar',
    title: 'Stellar',
    role: 'Creative Direction & Digital Platform',
    year: '2025',
    index: '2/4',
    description:
      'Interactive WebGL application for Stellar, an AI research & creative audio lab. Built with real-time sound visualizers, dark mode aesthetic, and custom particle shader physics.',
    image: '/images/annur.jpeg',
    category: 'Interactive Platform',
    tags: ['interactive', 'audio visualizer', 'creative direction', 'ai platform'],
    link: 'https://www.jomor.design/project/stellar',
  },
  {
    slug: 'loeven-morcel',
    title: 'Loeven Morcel',
    role: 'High-End E-Commerce & Luxury Branding',
    year: '2024',
    index: '3/4',
    description:
      'Bespoke digital store and brand identity for Loeven Morcel luxury atelier. Features silky smooth page transitions, high-resolution product showcase, and minimalist editorial layout.',
    image: '/images/hijra.jpeg',
    category: 'Luxury E-Commerce',
    tags: ['e-commerce', 'luxury branding', 'editorial', 'minimalism'],
    link: 'https://www.jomor.design/project/loeven-morcel',
  },
  {
    slug: 'priestess',
    title: 'Priestess',
    role: 'Experimental Visual Identity & Web App',
    year: '2024',
    index: '4/4',
    description:
      'An avant-garde experimental web experience and digital gallery for Priestess records. Harmonizing dark synth aesthetics, custom typography, and dynamic audio-reactive canvas.',
    image: '/images/keam.jpeg',
    category: 'Experimental Web',
    tags: ['experimental', 'music identity', 'canvas', 'dark mode'],
    link: 'https://www.jomor.design/project/priestess',
  },
]

export function findProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug)
}
