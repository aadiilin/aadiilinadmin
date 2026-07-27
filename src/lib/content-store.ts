const STORAGE_KEY = "aadiilin_content"
const ADMIN_PASSWORD = "aadiilin2026"

export function checkPassword(pw: string) {
  return pw === ADMIN_PASSWORD
}

export interface ProjectContent {
  slug: string
  title: string
  role: string
  year: string
  category: string
  image: string
}

export interface SiteContent {
  hero: { line1: string; line2: string; line3: string }
  stats: { value: string; label: string }[]
  skills: string[]
  projects: ProjectContent[]
  services: { slides: { title: string; items: { num: string; title: string; desc: string }[] }[] }
  industries: { title: string; desc: string }[]
  about: { intro: string; paragraph1: string; paragraph2: string }
  socialLinks: { label: string; href: string }[]
}

const DEFAULTS: SiteContent = {
  hero: { line1: "I craft visual", line2: "stories", line3: "that connect." },
  stats: [
    { value: "1+", label: "Years Designing" },
    { value: "10+", label: "Projects Delivered" },
    { value: "5+", label: "Brands Served" },
    { value: "5.0", label: "Client Rating" },
  ],
  skills: ["Poster Design", "Brand Identity", "Campaign Visuals", "Art Direction", "Typography", "Editorial Layout", "Packaging Design", "Visual Storytelling"],
  projects: [
    { slug: "imbizo", title: "IMBIZO 1.0", role: "Poster & Identity", year: "2025", category: "Event Identity", image: `${import.meta.env.BASE_URL}images/imbizo.jpeg` },
    { slug: "an-nur", title: "An-Nur Fifteen Hundred", role: "Campaign Design", year: "2025", category: "Campaign Design", image: `${import.meta.env.BASE_URL}images/annur.jpeg` },
    { slug: "hijra", title: "Hijra Talk Series", role: "Event Identity", year: "2025", category: "Event Identity", image: `${import.meta.env.BASE_URL}images/hijra.jpeg` },
    { slug: "keam-2025", title: "KEAM 2025 Results", role: "Editorial Layout", year: "2025", category: "Editorial Design", image: `${import.meta.env.BASE_URL}images/keam.jpeg` },
    { slug: "enroute", title: "Enroute", role: "Travel Campaign", year: "2024", category: "Campaign Design", image: `${import.meta.env.BASE_URL}images/enroute.jpeg` },
    { slug: "guest-welcome", title: "Hearty Welcomes", role: "Event Poster", year: "2024", category: "Event Poster", image: `${import.meta.env.BASE_URL}images/guest.jpeg` },
  ],
  services: {
    slides: [
      {
        title: "Bring your ideas to life",
        items: [
          { num: "01", title: "Poster Design", desc: "Impactful posters that command attention and communicate your message with clarity and style." },
          { num: "02", title: "Event Identity", desc: "Complete visual identities for events — from conferences to cultural gatherings." },
          { num: "03", title: "Campaign Visuals", desc: "Cohesive visual campaigns that tell your story across every touchpoint." },
        ],
      },
      {
        title: "Build brands that last",
        items: [
          { num: "01", title: "Brand Identity", desc: "Complete visual identity systems including colors, typography, and brand guidelines." },
          { num: "02", title: "Logo Design", desc: "Custom logos that capture your brand essence and make a lasting impression." },
          { num: "03", title: "Art Direction", desc: "Creative direction and visual strategy that elevates your brand presence." },
        ],
      },
      {
        title: "Print that stands out",
        items: [
          { num: "01", title: "Editorial Layout", desc: "Beautifully structured layouts for magazines, books, reports, and publications." },
          { num: "02", title: "Print Collateral", desc: "Business cards, brochures, flyers, and all print materials crafted with care." },
          { num: "03", title: "Packaging Design", desc: "Packaging that grabs attention on shelves and communicates brand value instantly." },
        ],
      },
      {
        title: "Digital & motion",
        items: [
          { num: "01", title: "Social Media Graphics", desc: "Scroll-stopping visuals optimized for every social media platform." },
          { num: "02", title: "Web & UI Graphics", desc: "Digital assets and interface graphics for websites and applications." },
          { num: "03", title: "Motion Graphics", desc: "Animated visuals and motion design that bring your brand to life." },
        ],
      },
    ],
  },
  industries: [
    { title: "Events", desc: "Memorable event identities that captivate audiences from first glance to last impression." },
    { title: "Education", desc: "Engaging materials and campaign visuals that make learning content stand out." },
    { title: "Branding", desc: "Strategic brand development for businesses looking to establish or refresh identity." },
    { title: "Media", desc: "Editorial design and campaign visuals for media houses and content creators." },
  ],
  about: {
    intro: "Hi, I'm Aadiilin — a freelance graphic designer crafting bold visuals from Kasaragod, Kerala.",
    paragraph1: "I specialize in brand identities, poster design, campaign visuals, and art direction that tell stories and drive impact. Every project is built on a foundation of strategic thinking and bold creative vision.",
    paragraph2: "I've partnered with organizations like Baithul Izza on event identities and campaign visuals. Currently available for freelance projects — let's create something great together.",
  },
  socialLinks: [
    { label: "Instagram", href: "https://www.instagram.com/aadiil.in" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/adil-sarvadka-51282a406" },
    { label: "WhatsApp", href: "https://wa.me/918137802554" },
    { label: "GitHub", href: "https://github.com/aadiilin" },
    { label: "Behance", href: "https://www.behance.net/aadiilin" },
    { label: "Dribbble", href: "https://dribbble.com/aadiilin" },
  ],
}

export function getContent(): SiteContent {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const saved = JSON.parse(raw)
      return { ...DEFAULTS, ...saved }
    }
  } catch {}
  return { ...DEFAULTS }
}

export function saveContent(content: SiteContent) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(content))
}

export function resetContent() {
  localStorage.removeItem(STORAGE_KEY)
}

export function exportContent() {
  const content = getContent()
  const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = "aadiilin-content.json"
  a.click()
  URL.revokeObjectURL(url)
}

export function importContent(file: File): Promise<SiteContent> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string)
        saveContent(data)
        resolve(data)
      } catch {
        reject(new Error("Invalid JSON file"))
      }
    }
    reader.onerror = () => reject(new Error("Failed to read file"))
    reader.readAsText(file)
  })
}

export function imageUrl(path: string) {
  if (path.startsWith("http") || path.startsWith("/")) return path
  return `${import.meta.env.BASE_URL}images/${path}`
}
