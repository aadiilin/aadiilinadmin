export const SITE_URL = typeof window !== 'undefined' ? window.location.origin : 'https://aadiilin.vercel.app'

export const SITE_NAME = 'Aadiilin — Freelance Graphic Designer'
export const SITE_DESCRIPTION =
  'Portfolio of Aadiilin (Adil Sarvadka), a freelance graphic designer from Kerala specializing in poster design, brand identity, and campaign visuals.'
export const DEFAULT_OG_IMAGE = '/opengraph.jpg'
export const SITE_LOCALE = 'en_US'
export const CREATOR_NAME = 'Aadiilin'
export const CREATOR_FULL_NAME = 'Adil Sarvadka'
export const CREATOR_ALTERNATE_NAME = 'Adil Sarvadka'
export const CREATOR_ALTERNATE_NAME_2 = 'Adil'
export const CREATOR_JOB_TITLE = 'Freelance Graphic Designer & Creative Director'
export const CREATOR_EMAIL = 'adilsarvadka@gmail.com'
export const CREATOR_PHONE = '+91 81378 02554'
export const CREATOR_LOCATION = 'Kasaragod, Kerala, India'
export const CREATOR_IMAGE = '/images/avatar.png'
export const GOOGLE_SITE_VERIFICATION = 'tJGBFrKTrRuP6XLRKlOAF4IP8nO7hcRe-AuFYIxK6mI'


export const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/aadiil.in',
  twitter: 'https://twitter.com/aadiilin',
  github: 'https://github.com/aadiilin',
  whatsapp: 'https://wa.me/918137802554',
  linkedin: 'https://www.linkedin.com/in/adil-sarvadka-51282a406',
  pinterest: 'https://pinterest.com/aadiilin',
}

export const SKILLS = [
  'Poster Design & Visuals',
  'Brand Identity & Logos',
  'Art Direction & Concepts',
  'Editorial Layout & Typography',
  'Campaign Visuals',
  'Web Design & UI/UX',
  'Motion Graphics',
  'Packaging & Print',
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
    slug: 'imbizo',
    title: 'IMBIZO 1.0',
    role: 'Arts Fest Identity & Poster Series',
    year: '2025',
    index: '1/4',
    description:
      'Arts fest poster and identity designed for Baithul Izza, celebrating freedom of survival and existence through bold typography, modular geometric motifs, and high-impact visual composition.',
    image: '/images/imbizo.jpeg',
    category: 'Brand & Identity',
    tags: ['poster design', 'arts fest', 'typography', 'identity'],
    link: 'https://aadiilin.vercel.app/project/imbizo',
  },
  {
    slug: 'an-nur-1500',
    title: 'An-Nur 1500',
    role: 'Commemorative Campaign Visuals',
    year: '2025',
    index: '2/4',
    description:
      'Commemorative campaign poster marking the 1500th Mawlid al-Nabi, featuring elegant typography, devotional motifs, and architectural photography integrated into a seamless grid.',
    image: '/images/annur.jpeg',
    category: 'Campaign Visuals',
    tags: ['campaign', 'mawlid', 'typography', 'cultural'],
    link: 'https://aadiilin.vercel.app/project/an-nur-1500',
  },
  {
    slug: 'hijra-talks',
    title: 'Hijra Talk Series',
    role: 'Event Identity & Announcement Layout',
    year: '2024',
    index: '3/4',
    description:
      'Event identity and announcement layout created under the Muharram campaign, blending modern minimalist typography with calligraphic accents and structured hierarchy.',
    image: '/images/hijra.jpeg',
    category: 'Event Identity',
    tags: ['event identity', 'editorial', 'muharram', 'minimalism'],
    link: 'https://aadiilin.vercel.app/project/hijra-talks',
  },
  {
    slug: 'keam-2025-results',
    title: 'KEAM 2025 Results',
    role: 'Editorial Layout & Rank Showcase',
    year: '2024',
    index: '4/4',
    description:
      'Editorial layout designed for Science Orbit at Baithul Izza, celebrating top KEAM ranks with bold portrait compositions, gold accent geometry, and structured rank displays.',
    image: '/images/keam.jpeg',
    category: 'Editorial Layout',
    tags: ['editorial', 'rank showcase', 'grid system', 'education'],
    link: 'https://aadiilin.vercel.app/project/keam-2025-results',

  },
]

export function findProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug)
}

