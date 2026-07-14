export const SITE_URL = 'https://aadiilin.vercel.app'
export const SITE_NAME = 'Aadiilin — Full-Stack Developer & Graphic Designer'
export const SITE_DESCRIPTION =
  'Portfolio of Aadiilin (Adil Sarvadka), a B.Tech CSE student, full-stack web developer, graphic designer, AI enthusiast, and SaaS entrepreneur from Kerala, India. Creator of FestBoard, Savelio, and more.'
export const DEFAULT_OG_IMAGE = '/opengraph.jpg'
export const SITE_LOCALE = 'en_IN'
export const CREATOR_NAME = 'Aadiilin'
export const CREATOR_ALTERNATE_NAME = 'Adil Sarvadka'
export const CREATOR_JOB_TITLE = 'Full-Stack Developer & Graphic Designer'
export const CREATOR_EMAIL = 'adilsarvadka@gmail.com'
export const CREATOR_PHONE = '+918137802554'
export const CREATOR_LOCATION = 'Kasaragod, Kerala, India'
export const CREATOR_IMAGE = '/images/adil-portrait.png'

export const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/aadiil.in',
  linkedin: 'https://www.linkedin.com/in/adil-sarvadka-51282a406',
  github: 'https://github.com/aadiilin',
  whatsapp: 'https://wa.me/918137802554',
  pinterest: 'https://in.pinterest.com/aadiilin',
}

export const DESIGN_SKILLS = [
  'Art Direction',
  'Brand Identity',
  'Poster Design',
  'Typography',
  'Editorial Layout',
  'Motion Graphics',
  'Packaging Design',
  'Visual Storytelling',
]

export const DEV_SKILLS = [
  'Next.js',
  'React',
  'TypeScript',
  'JavaScript',
  'Tailwind CSS',
  'Node.js',
  'Firebase',
  'Supabase',
  'PostgreSQL',
  'REST APIs',
  'Authentication',
  'SaaS Architecture',
]

export const TECH_INTERESTS = [
  'Artificial Intelligence',
  'Cyber Security',
  'Cloud Computing',
  'SaaS Development',
  'UI/UX Design',
  'Web Performance',
  'Automation',
  'DevOps',
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
}

export const PROJECTS: Project[] = [
  {
    slug: 'festboard',
    title: 'FestBoard',
    role: 'SaaS Platform',
    year: '2025',
    description:
      'A multi-tenant SaaS platform for schools, colleges, madrasas, and organizations to manage competitions and events. Features live scoreboard, result management, candidate portal, organization dashboard, analytics, subscription system, and shareable results with certificate generation.',
    image: `${import.meta.env.BASE_URL}images/festboard.png`,
    category: 'SaaS',
    tags: ['SaaS', 'multi-tenant', 'events', 'competitions', 'live scoreboard'],
    link: 'https://festboard.vercel.app',
  },
  {
    slug: 'savelio',
    title: 'Savelio',
    role: 'Price Comparison Platform',
    year: '2025',
    description:
      'An affiliate-based product price comparison platform helping users compare prices across leading Indian e-commerce websites including Amazon, Flipkart, Meesho, JioMart, and more. Features best deals, price history, and cashback information.',
    image: `${import.meta.env.BASE_URL}images/savelio.png`,
    category: 'E-Commerce',
    tags: ['e-commerce', 'price comparison', 'affiliate', 'shopping'],
    link: 'https://savelio.vercel.app',
  },
  {
    slug: 'zakk-events',
    title: 'Zakk Events',
    role: 'Event Management',
    year: '2025',
    description:
      'A modern event management platform for community and organizational events with online publishing, registration management, and administration dashboard.',
    image: `${import.meta.env.BASE_URL}images/zakk-events.png`,
    category: 'Event Management',
    tags: ['events', 'management', 'registration', 'platform'],
    link: 'https://zakkevents.vercel.app',
  },
  {
    slug: 'imbizo',
    title: 'IMBIZO 1.0',
    role: 'Poster & Identity',
    year: '2025',
    description:
      'Poster and identity for IMBIZO 1.0, an arts fest hosted by Baithul Izza celebrating freedom of survival and existence through bold typography and modular geometric motifs.',
    image: `${import.meta.env.BASE_URL}images/imbizo.jpeg`,
    category: 'Event Identity',
    tags: ['poster design', 'event branding', 'typography', 'geometric'],
  },
  {
    slug: 'an-nur',
    title: 'An-Nur Fifteen Hundred',
    role: 'Campaign Design',
    year: '2025',
    description:
      'Commemorative campaign poster for An-Nur 1500, marking the 1500th Mawlid al-Nabi with elegant typography, devotional motifs, and architectural photography.',
    image: `${import.meta.env.BASE_URL}images/annur.jpeg`,
    category: 'Campaign Design',
    tags: ['campaign poster', 'commemorative', 'typography', 'religious'],
  },
  {
    slug: 'hijra',
    title: 'Hijra Talk Series',
    role: 'Event Identity',
    year: '2025',
    description:
      'Identity and announcement layout for the Hijra Talk Series under the Muharram campaign, blending modern type with calligraphic accents.',
    image: `${import.meta.env.BASE_URL}images/hijra.jpeg`,
    category: 'Event Identity',
    tags: ['event identity', 'muharram', 'calligraphy', 'layout'],
  },
  {
    slug: 'keam-2025',
    title: 'KEAM 2025 Results',
    role: 'Editorial Layout',
    year: '2025',
    description:
      'Results announcement design for Science Orbit at Baithul Izza, celebrating top KEAM ranks with bold portraits and a structured grid.',
    image: `${import.meta.env.BASE_URL}images/keam.jpeg`,
    category: 'Editorial Design',
    tags: ['editorial layout', 'education', 'grid design', 'portraits'],
  },
  {
    slug: 'enroute',
    title: 'Enroute',
    role: 'Travel Campaign',
    year: '2024',
    description:
      'Visual campaign for Enroute, a Kerala–Karnataka–Tamil Nadu trip, mixing photography with map UI elements and editorial typography.',
    image: `${import.meta.env.BASE_URL}images/enroute.jpeg`,
    category: 'Campaign Design',
    tags: ['travel campaign', 'photography', 'map design', 'editorial'],
  },
  {
    slug: 'guest-welcome',
    title: 'Hearty Welcomes',
    role: 'Event Poster',
    year: '2024',
    description:
      'Chief guest welcome poster for the Kashmiri Sadath Uroos Mubarak & Milad Sangamam, designed with warm earthy tones and layered typography.',
    image: `${import.meta.env.BASE_URL}images/guest.jpeg`,
    category: 'Event Poster',
    tags: ['event poster', 'earthy tones', 'typography', 'welcome'],
  },
  {
    slug: 'token-of-love-poster-variety',
    title: 'Token Of Love Poster Variety',
    role: 'Poster Design',
    year: '2025',
    description:
      'A vibrant series of variety posters for the Token of Love campaign, exploring diverse visual approaches with bold typography and dynamic compositions.',
    image: `${import.meta.env.BASE_URL}images/Token_Of_Love_Poster_Variety.jpg`,
    category: 'Poster Design',
    tags: ['poster series', 'campaign', 'bold typography', 'dynamic'],
  },
  {
    slug: 'award-poster-design',
    title: 'Award Poster Design',
    role: 'Poster Design',
    year: '2025',
    description:
      'An elegant award ceremony poster design featuring refined typography, celebratory motifs, and a sophisticated color palette.',
    image: `${import.meta.env.BASE_URL}images/Award_Poster_Design.jpg`,
    category: 'Poster Design',
    tags: ['award ceremony', 'elegant', 'celebration', 'sophisticated'],
  },
  {
    slug: 'variety-creative-poster-design',
    title: 'Variety Creative Poster Design',
    role: 'Poster Design',
    year: '2025',
    description:
      'A creative variety poster design exploring bold compositions, experimental layouts, and striking visual hierarchies.',
    image: `${import.meta.env.BASE_URL}images/Variety_Creative_Poster_Design.jpg`,
    category: 'Poster Design',
    tags: ['creative', 'experimental', 'composition', 'visual hierarchy'],
  },
  {
    slug: 'token-of-love-poster',
    title: 'Token Of Love Poster',
    role: 'Poster Design',
    year: '2025',
    description:
      'The main campaign poster for Token of Love, blending romantic visual elements with modern design aesthetics and expressive typography.',
    image: `${import.meta.env.BASE_URL}images/Token_Of_Love_Poster.jpg`,
    category: 'Poster Design',
    tags: ['romantic', 'campaign', 'modern design', 'expressive'],
  },
]

export function findProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug)
}

export const EDUCATION = {
  degree: 'Bachelor of Technology (B.Tech)',
  field: 'Computer Science and Engineering (Cyber Security)',
  institution: 'Al Azhar College of Engineering and Technology',
  location: 'Perumbillichira, Kerala',
}

export const LANGUAGES_SPOKEN = ['English', 'Malayalam', 'Arabic (Learning)']

export const ABOUT_PARAGRAPHS = [
  'I am a B.Tech CSE student specializing in Cyber Security, a full-stack web developer, graphic designer, and AI enthusiast from Kerala, India. I build modern web applications, AI-powered platforms, and scalable SaaS products that solve real-world problems.',
  'My approach combines technical precision with creative design thinking. Whether it\'s developing a multi-tenant SaaS platform or crafting a brand identity, I focus on building experiences that are as functional as they are beautiful.',
  'I am passionate about AI, cybersecurity, and entrepreneurship, and I am on a mission to build innovative products that improve education, businesses, and communities.',
]
