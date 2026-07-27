const STORAGE_KEY = "aadiilin_content"
const TOKEN_KEY = "aadiilin_github_token"
const ADMIN_PASSWORD = "aadiilin2026"

const GITHUB_OWNER = "aadiilin"
const GITHUB_REPO = "aadiilinadmin"
const GITHUB_PATH = "public/data/content.json"

export function checkPassword(pw: string) {
  return pw === ADMIN_PASSWORD
}

export function getGitHubToken() {
  return localStorage.getItem(TOKEN_KEY) || ""
}

export function setGitHubToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token)
}

export interface ProjectContent {
  slug: string
  title: string
  role: string
  year: string
  category: string
  image: string
}

export interface ThemeColors {
  bg: string
  surface: string
  subtle: string
  accent: string
  accentHover: string
  text: string
  muted: string
  faint: string
  line: string
}

export interface DecorElement {
  type: "blob" | "circle" | "gradient" | "dots" | "grid"
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center"
  color: string
  size: number
  opacity: number
}

export interface DesignSettings {
  showParticles: boolean
  showMarquee: boolean
  showSignature: boolean
  showChatBot: boolean
  showScrollProgress: boolean
  sectionSpacing: "compact" | "normal" | "spacious"
  decorElements: DecorElement[]
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
  theme: ThemeColors
  design: DesignSettings
}

export const DEFAULT_THEME: ThemeColors = {
  bg: "#F2EEE3",
  surface: "#FFFFFF",
  subtle: "#F5F4EE",
  accent: "#FF7A00",
  accentHover: "#E66A00",
  text: "#1A1A1A",
  muted: "rgba(26,26,26,0.6)",
  faint: "rgba(26,26,26,0.35)",
  line: "rgba(26,26,26,0.08)",
}

export const DEFAULT_DESIGN: DesignSettings = {
  showParticles: true,
  showMarquee: true,
  showSignature: true,
  showChatBot: true,
  showScrollProgress: true,
  sectionSpacing: "normal",
  decorElements: [],
}

export const DEFAULTS: SiteContent = {
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
  theme: { ...DEFAULT_THEME },
  design: { ...DEFAULT_DESIGN },
}

export function getContent(): SiteContent {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    try { return { ...DEFAULTS, ...JSON.parse(saved) } } catch {}
  }
  return { ...DEFAULTS }
}

export function saveLocal(content: SiteContent) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(content))
}

export function resetLocal() {
  localStorage.removeItem(STORAGE_KEY)
}

export function exportJSON() {
  const c = getContent()
  const blob = new Blob([JSON.stringify(c, null, 2)], { type: "application/json" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url; a.download = "aadiilin-content.json"; a.click()
  URL.revokeObjectURL(url)
}

export async function deployToGitHub(content: SiteContent, token: string): Promise<void> {
  const json = JSON.stringify(content, null, 2)
  const encoded = btoa(unescape(encodeURIComponent(json)))

  let sha: string | undefined
  const existing = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_PATH}`,
    { headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github.v3+json" } }
  )
  if (existing.ok) {
    const data = await existing.json()
    sha = data.sha
  }

  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_PATH}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/vnd.github.v3+json",
      },
      body: JSON.stringify({
        message: "update site content from admin panel",
        content: encoded,
        sha,
      }),
    }
  )

  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.message || "GitHub deploy failed")
  }
}

export function imageUrl(path: string) {
  if (path.startsWith("http") || path.startsWith("/")) return path
  return `${import.meta.env.BASE_URL}images/${path}`
}

export function applyTheme(theme: ThemeColors) {
  const root = document.documentElement
  Object.entries(theme).forEach(([key, value]) => {
    root.style.setProperty(`--theme-${key}`, value)
  })
}

export function applyDesign(design: DesignSettings) {
  const root = document.documentElement
  root.style.setProperty("--section-spacing", String({
    compact: "48",
    normal: "96",
    spacious: "144",
  }[design.sectionSpacing] || "96"))
}
