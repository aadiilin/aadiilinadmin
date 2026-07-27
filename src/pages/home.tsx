import { Link } from "wouter"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useRef, ReactNode } from "react"
import { X, Menu, ChevronRight, ArrowUpRight, Star, Mail, Check } from "lucide-react"
import { SEO } from "@/components/seo"
import { ChatBot } from "@/components/chat-bot"
import { collectionPageSchema, itemListSchema, contactPageSchema } from "@/lib/schemas"

const PROJECTS = [
  { slug: "imbizo", title: "IMBIZO 1.0", role: "Poster & Identity", year: "2025", category: "Event Identity", image: `${import.meta.env.BASE_URL}images/imbizo.jpeg` },
  { slug: "an-nur", title: "An-Nur Fifteen Hundred", role: "Campaign Design", year: "2025", category: "Campaign Design", image: `${import.meta.env.BASE_URL}images/annur.jpeg` },
  { slug: "hijra", title: "Hijra Talk Series", role: "Event Identity", year: "2025", category: "Event Identity", image: `${import.meta.env.BASE_URL}images/hijra.jpeg` },
  { slug: "keam-2025", title: "KEAM 2025 Results", role: "Editorial Layout", year: "2025", category: "Editorial Design", image: `${import.meta.env.BASE_URL}images/keam.jpeg` },
  { slug: "enroute", title: "Enroute", role: "Travel Campaign", year: "2024", category: "Campaign Design", image: `${import.meta.env.BASE_URL}images/enroute.jpeg` },
  { slug: "guest-welcome", title: "Hearty Welcomes", role: "Event Poster", year: "2024", category: "Event Poster", image: `${import.meta.env.BASE_URL}images/guest.jpeg` },
]

const SKILLS = ["Poster Design", "Brand Identity", "Campaign Visuals", "Art Direction", "Typography", "Editorial Layout", "Packaging Design", "Visual Storytelling"]

const MARQUEE_ITEMS = [...SKILLS, ...SKILLS]

const STATS = [
  { value: "1+", label: "Years Designing" },
  { value: "10+", label: "Projects Delivered" },
  { value: "5+", label: "Brands Served" },
  { value: "5.0", label: "Client Rating" },
]

const SERVICES_DATA = {
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
}

const INDUSTRIES = [
  { title: "Events", desc: "Memorable event identities that captivate audiences from first glance to last impression." },
  { title: "Education", desc: "Engaging materials and campaign visuals that make learning content stand out." },
  { title: "Branding", desc: "Strategic brand development for businesses looking to establish or refresh identity." },
  { title: "Media", desc: "Editorial design and campaign visuals for media houses and content creators." },
]

const WHY_US = [
  { title: "Design that tells stories", desc: "Every project begins with your story — crafted visuals that communicate and connect." },
  { title: "Bold, not bloated", desc: "Strong concepts, purposeful elements. Every color, font, and shape has a reason." },
  { title: "Collaborative process", desc: "You're involved at every stage. Your feedback shapes the outcome." },
  { title: "Reliable & on time", desc: "High-quality work delivered on schedule. No excuses, just dependable design." },
]

const TESTIMONIALS = [
  { quote: "Aadiilin brought our event identity to life with stunning poster designs that captured our vision perfectly.", name: "Baithul Izza Team", role: "Event Management", rating: 5 },
  { quote: "Exceptional design work with a keen understanding of brand storytelling. Every project exceeded expectations.", name: "Imbizo 1.0", role: "Conference Organizer", rating: 5 },
  { quote: "Working with Aadiilin was seamless. The creative direction and typography elevated our campaign to a new level.", name: "An-Nur Campaign", role: "Education Sector", rating: 5 },
]

const AWARDS = [
  { title: "Client Satisfaction", org: "5.0 Rating", desc: "Across all freelance platforms" },
  { title: "Top Performer", org: "Consistent Delivery", desc: "100% on-time project completion" },
  { title: "Creative Excellence", org: "Design Recognition", desc: "Featured in multiple design showcases" },
]

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/aadiil.in" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/adil-sarvadka-51282a406" },
  { label: "WhatsApp", href: "https://wa.me/918137802554" },
  { label: "GitHub", href: "https://github.com/aadiilin" },
  { label: "Behance", href: "https://www.behance.net/aadiilin" },
  { label: "Dribbble", href: "https://dribbble.com/aadiilin" },
]

function SectionLabel({ num, label }: { num: string; label?: string }) {
  return (
    <div className="flex items-center gap-4 mb-4 sm:mb-6">
      <span className="font-mono text-[11px] text-muted uppercase tracking-[0.15em] shrink-0">{num}</span>
      {label && <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight">{label}</h2>}
      <div className="flex-1 h-px bg-line" />
    </div>
  )
}

function AnimatedSection({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.25, 1, 0.5, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function StaggerGrid({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function GridItem({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function Counter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const numeric = parseInt(value.replace(/[^0-9]/g, ""))
  if (isNaN(numeric)) return <span ref={ref}>{value}</span>

  const [display, setDisplay] = useState(0)
  useEffect(() => {
    if (!inView) return
    let current = 0
    const inc = numeric / 30
    const timer = setInterval(() => {
      current += inc
      if (current >= numeric) { setDisplay(numeric); clearInterval(timer) }
      else setDisplay(Math.floor(current))
    }, 40)
    return () => clearInterval(timer)
  }, [inView, numeric])

  return <span ref={ref}>{display}{suffix || value.replace(/[0-9]/g, "")}</span>
}

export function Home() {
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeServiceSlide, setActiveServiceSlide] = useState(0)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-bg text-text overflow-x-hidden">
      <SEO jsonLd={[collectionPageSchema(), itemListSchema(), contactPageSchema()]} />

      {/* Lightbox */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
          >
            <button onClick={() => setSelectedProject(null)} className="absolute inset-0 bg-text/70 backdrop-blur-sm cursor-zoom-out" />
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl aspect-[4/3] bg-surface rounded-2xl overflow-hidden shadow-2xl z-10"
            >
              <button onClick={() => setSelectedProject(null)} className="absolute top-4 right-4 z-20 bg-text/20 backdrop-blur-sm p-2 rounded-full hover:bg-text/30 transition-colors">
                <X size={16} />
              </button>
              <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-contain bg-subtle" />
              <motion.div
                initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
                className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-text/80 to-transparent"
              >
                <div className="font-heading font-bold text-2xl text-white mb-1">{selectedProject.title}</div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-accent font-mono uppercase tracking-wider">{selectedProject.role}</span>
                  <span className="w-1 h-1 bg-white/30 rounded-full" />
                  <span className="text-white/60 font-mono">{selectedProject.year}</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ━━━━━━ Header ━━━━━━ */}
      <motion.header
        initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-bg/90 backdrop-blur-md shadow-[0_1px_0_rgba(26,26,26,0.06)]" : "bg-transparent"}`}
      >
        <div className="max-w-[1320px] mx-auto px-6 h-[72px] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden relative z-50 p-2 -ml-2">
              {mobileMenu ? <X size={20} /> : <Menu size={20} />}
            </button>
            <Link href="/" className="font-heading font-bold text-xl tracking-tight select-none">
              aadiilin<span className="text-accent">.</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#work" className="text-sm text-muted hover:text-text transition-colors">Work</a>
            <div className="relative group">
              <button className="text-sm text-muted hover:text-text transition-colors flex items-center gap-1.5">
                Services
                <svg width="10" height="6" viewBox="0 0 10 6" className="fill-current"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <div className="absolute top-full pt-3 left-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-surface rounded-2xl shadow-xl border border-line/50 p-4 min-w-[220px]">
                  {["Poster Design", "Brand Identity", "Campaign Visuals", "Art Direction", "Typography", "Editorial Layout"].map(s => (
                    <a key={s} href="#services" className="block text-sm hover:text-accent transition-colors py-1.5">{s}</a>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative group">
              <button className="text-sm text-muted hover:text-text transition-colors flex items-center gap-1.5">
                Industries
                <svg width="10" height="6" viewBox="0 0 10 6" className="fill-current"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <div className="absolute top-full pt-3 left-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-surface rounded-2xl shadow-xl border border-line/50 p-4 min-w-[200px]">
                  {["Events", "Education", "Branding", "Media"].map(i => (
                    <a key={i} href="#industries" className="block text-sm hover:text-accent transition-colors py-1.5">{i}</a>
                  ))}
                </div>
              </div>
            </div>
            <a href="#about" className="text-sm text-muted hover:text-text transition-colors">About</a>
          </nav>

          <div className="flex items-center gap-4">
            <span className="hidden md:inline-flex text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-accent text-white">Available</span>
            <a href="#contact" className="text-sm font-semibold px-5 py-2.5 bg-accent text-white rounded-full hover:bg-accent-hover transition-colors">
              Get in Touch
            </a>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenu && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 z-40 bg-bg flex flex-col items-center justify-center gap-8"
            >
              {["Work", "Services", "Industries", "About", "Contact"].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenu(false)}
                  className="font-heading font-bold text-3xl tracking-tight hover:text-accent transition-colors">{item}</a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ━━━━━━ Hero ━━━━━━ */}
      <section className="bg-[#080D10] text-white relative overflow-hidden" style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 48px), 0 100%)" }}>
        <div className="max-w-[1320px] mx-auto px-6 pt-36 pb-0 w-full">
          <AnimatedSection>
            <div className="text-xs sm:text-sm font-mono text-white/50 uppercase tracking-wider mb-5">Freelance Graphic Designer</div>
            <h1 className="font-heading font-extrabold text-[clamp(2.5rem,9vw,6rem)] leading-[0.95] tracking-tighter max-w-5xl">
              <span className="block overflow-hidden"><motion.span initial={{ y: "100%" }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 1, 0.5, 1] }} className="inline-block">I craft visual</motion.span></span>
              <span className="block overflow-hidden"><motion.span initial={{ y: "100%" }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 1, 0.5, 1] }} className="inline-block text-[#FF7A00]">stories</motion.span></span>
              <span className="block overflow-hidden"><motion.span initial={{ y: "100%" }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 1, 0.5, 1] }} className="inline-block">that connect.</motion.span></span>
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.4}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <motion.a href="#work" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-7 py-3 bg-[#FF7A00] text-white font-heading font-bold text-sm rounded-full hover:bg-[#E66A00] transition-colors uppercase tracking-wider">
                View My Work <ArrowUpRight size={14} />
              </motion.a>
              <motion.a href="#contact" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-7 py-3 border border-white/20 text-white/80 font-heading font-bold text-sm rounded-full hover:bg-white/10 transition-colors uppercase tracking-wider">
                Let's Talk <ChevronRight size={14} />
              </motion.a>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.5}>
            <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
              <div className="relative">
                <div className="aspect-video rounded-xl overflow-hidden bg-white/5">
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-white/20 text-sm font-mono">Showreel</span>
                  </div>
                </div>
                <div className="mt-3">
                  <a href="#work" className="inline-flex items-center gap-1.5 text-xs font-mono text-white/60 hover:text-white transition-colors uppercase tracking-wider">
                    View projects <ChevronRight size={10} />
                  </a>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-sm sm:text-base text-white/70 leading-relaxed max-w-lg">
                  I help brands and events stand out with bold poster design, brand identity, campaign visuals, and art direction — from Kasaragod, Kerala.
                </p>
                <div className="mt-8 pt-8 border-t border-white/10">
                  <div className="text-[11px] font-mono text-white/40 uppercase tracking-wider mb-5">In numbers</div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                    {STATS.map(stat => (
                      <div key={stat.label}>
                        <div className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
                          <Counter value={stat.value} />
                        </div>
                        <div className="mt-0.5 font-mono text-[10px] sm:text-xs text-white/50 uppercase tracking-wider">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ━━━━━━ Marquee Strips ━━━━━━ */}
      <div className="relative" style={{ zIndex: 0, marginTop: "-48px" }}>
        {/* Orange top strip — angled down right→left, goes behind black strip */}
        <div className="relative overflow-hidden bg-[#FF7A00] flex items-center py-4"
          style={{
            marginLeft: "calc(-50vw + 50%)", marginRight: "calc(-50vw + 50%)", width: "100vw",
            transform: "rotate(-1.8deg)", transformOrigin: "right center",
            zIndex: 0, marginBottom: "-18px",
          }}>
          <div className="flex whitespace-nowrap">
            <div className="flex animate-marquee items-center gap-0">
              {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((skill, i) => (
                <span key={i} className="mx-4 flex items-center gap-6 shrink-0">
                  <svg width="140" height="18" viewBox="0 0 140 18" className="shrink-0" fill="none">
                    <path d="M8 9 C 22 -2, 36 20, 50 9 C 60 2, 72 16, 82 9 C 92 2, 104 16, 114 9 C 120 5, 128 13, 132 9"
                      stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
                  </svg>
                  <span className="font-heading font-bold text-[11px] sm:text-xs uppercase tracking-[0.18em] text-white border-2 border-white rounded-full px-5 py-1.5 shrink-0">
                    {skill}
                  </span>
                </span>
              ))}
            </div>
            <div className="flex animate-marquee items-center gap-0">
              {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((skill, i) => (
                <span key={`${i}-d`} className="mx-4 flex items-center gap-6 shrink-0">
                  <svg width="140" height="18" viewBox="0 0 140 18" className="shrink-0" fill="none">
                    <path d="M8 9 C 22 -2, 36 20, 50 9 C 60 2, 72 16, 82 9 C 92 2, 104 16, 114 9 C 120 5, 128 13, 132 9"
                      stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
                  </svg>
                  <span className="font-heading font-bold text-[11px] sm:text-xs uppercase tracking-[0.18em] text-white border-2 border-white rounded-full px-5 py-1.5 shrink-0">
                    {skill}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Black middle strip — on top, scrolls reverse */}
        <div className="relative overflow-hidden bg-[#1A1A1A] flex items-center py-6"
          style={{
            marginLeft: "calc(-50vw + 50%)", marginRight: "calc(-50vw + 50%)", width: "100vw",
            zIndex: 10,
          }}>
          <div className="flex whitespace-nowrap">
            <div className="flex animate-marquee-rev items-center gap-0">
              {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((skill, i) => (
                <span key={i} className="mx-4 flex items-center gap-6 shrink-0">
                  <svg width="140" height="18" viewBox="0 0 140 18" className="shrink-0" fill="none">
                    <path d="M8 9 C 22 -2, 36 20, 50 9 C 60 2, 72 16, 82 9 C 92 2, 104 16, 114 9 C 120 5, 128 13, 132 9"
                      stroke="#FF7A00" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
                  </svg>
                  <span className="font-heading font-bold text-[11px] sm:text-xs uppercase tracking-[0.18em] text-[#FF7A00] border-2 border-[#FF7A00] rounded-full px-5 py-1.5 shrink-0">
                    {skill}
                  </span>
                </span>
              ))}
            </div>
            <div className="flex animate-marquee-rev items-center gap-0">
              {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((skill, i) => (
                <span key={`${i}-d`} className="mx-4 flex items-center gap-6 shrink-0">
                  <svg width="140" height="18" viewBox="0 0 140 18" className="shrink-0" fill="none">
                    <path d="M8 9 C 22 -2, 36 20, 50 9 C 60 2, 72 16, 82 9 C 92 2, 104 16, 114 9 C 120 5, 128 13, 132 9"
                      stroke="#FF7A00" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
                  </svg>
                  <span className="font-heading font-bold text-[11px] sm:text-xs uppercase tracking-[0.18em] text-[#FF7A00] border-2 border-[#FF7A00] rounded-full px-5 py-1.5 shrink-0">
                    {skill}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Orange bottom strip — angled down left→right, in front of black strip */}
        <div className="relative overflow-hidden bg-[#FF7A00] flex items-center py-4"
          style={{
            marginLeft: "calc(-50vw + 50%)", marginRight: "calc(-50vw + 50%)", width: "100vw",
            transform: "rotate(1.8deg)", transformOrigin: "left center",
            zIndex: 20, marginTop: "-18px",
          }}>
          <div className="flex whitespace-nowrap">
            <div className="flex animate-marquee items-center gap-0">
              {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((skill, i) => (
                <span key={i} className="mx-4 flex items-center gap-6 shrink-0">
                  <svg width="140" height="18" viewBox="0 0 140 18" className="shrink-0" fill="none">
                    <path d="M8 9 C 22 -2, 36 20, 50 9 C 60 2, 72 16, 82 9 C 92 2, 104 16, 114 9 C 120 5, 128 13, 132 9"
                      stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
                  </svg>
                  <span className="font-heading font-bold text-[11px] sm:text-xs uppercase tracking-[0.18em] text-white border-2 border-white rounded-full px-5 py-1.5 shrink-0">
                    {skill}
                  </span>
                </span>
              ))}
            </div>
            <div className="flex animate-marquee items-center gap-0">
              {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((skill, i) => (
                <span key={`${i}-d`} className="mx-4 flex items-center gap-6 shrink-0">
                  <svg width="140" height="18" viewBox="0 0 140 18" className="shrink-0" fill="none">
                    <path d="M8 9 C 22 -2, 36 20, 50 9 C 60 2, 72 16, 82 9 C 92 2, 104 16, 114 9 C 120 5, 128 13, 132 9"
                      stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
                  </svg>
                  <span className="font-heading font-bold text-[11px] sm:text-xs uppercase tracking-[0.18em] text-white border-2 border-white rounded-full px-5 py-1.5 shrink-0">
                    {skill}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ━━━━━━ Featured Work ━━━━━━ */}
      <section id="work" className="max-w-[1320px] mx-auto px-6 py-24 sm:py-32">
        <AnimatedSection>
          <SectionLabel num="01" label="Featured Work" />
          <p className="text-muted text-sm sm:text-base max-w-xl mb-12 -mt-2">Selected projects that showcase my approach to design.</p>
        </AnimatedSection>

        <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, i) => (
            <GridItem key={project.slug}>
              <motion.button
                onClick={() => setSelectedProject(project)}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="group w-full text-left"
              >
                <div className="bg-surface rounded-[20px] overflow-hidden border border-line/50 hover:border-line/30 hover:shadow-lg transition-all duration-300">
                  <div className="relative aspect-[4/3] overflow-hidden bg-subtle">
                    <span className="absolute top-3 left-3 z-10 text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-accent text-white">
                      {project.category}
                    </span>
                    <img src={project.image} alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-text/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-5 sm:p-6">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-heading font-bold text-base sm:text-lg tracking-tight truncate">{project.title}</h3>
                      <span className="font-mono text-xs text-muted shrink-0">{project.year}</span>
                    </div>
                    <p className="mt-1.5 font-mono text-xs text-muted uppercase tracking-wider">{project.role}</p>
                  </div>
                </div>
              </motion.button>
            </GridItem>
          ))}
        </StaggerGrid>
      </section>

      {/* ━━━━━━ Services ━━━━━━ */}
      <section id="services" className="bg-text text-bg mx-4 sm:mx-6 rounded-[32px] sm:rounded-[40px] py-24 sm:py-32 mb-24 sm:mb-32 overflow-hidden">
        <div className="max-w-[1320px] mx-auto px-6">
          <AnimatedSection>
            <div className="flex items-center gap-4 mb-6">
              <span className="font-mono text-[11px] text-bg/50 uppercase tracking-[0.15em]">02</span>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight">Services</h2>
              <div className="flex-1 h-px bg-bg/10" />
            </div>
            <p className="text-bg/70 max-w-xl mb-16 sm:mb-20">
              From concept to completion — here's how I can help bring your vision to life.
            </p>
          </AnimatedSection>

          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 mb-12 border-b border-bg/10 pb-4">
            {SERVICES_DATA.slides.map((slide, i) => (
              <motion.button
                key={i}
                onClick={() => setActiveServiceSlide(i)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-5 py-2.5 text-sm font-heading font-bold rounded-full transition-colors ${
                  activeServiceSlide === i ? "bg-accent text-white" : "text-bg/60 hover:text-bg hover:bg-bg/10"
                }`}
              >
                {i === 0 ? "Design" : i === 1 ? "Branding" : i === 2 ? "Print" : "Digital"}
              </motion.button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeServiceSlide}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-8">
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-bg">{SERVICES_DATA.slides[activeServiceSlide].title}</h3>
              </div>
              <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {SERVICES_DATA.slides[activeServiceSlide].items.map((item) => (
                  <GridItem key={item.title}>
                    <div className="bg-bg/5 rounded-[20px] p-8 border border-bg/10 h-full hover:bg-bg/10 transition-colors">
                      <div className="flex items-center gap-3 mb-5">
                        <span className="font-mono text-sm text-accent">{item.num}</span>
                      </div>
                      <h4 className="font-heading font-bold text-lg sm:text-xl tracking-tight mb-3 text-bg">{item.title}</h4>
                      <p className="text-sm text-bg/60 leading-relaxed">{item.desc}</p>
                    </div>
                  </GridItem>
                ))}
              </StaggerGrid>
            </motion.div>
          </AnimatePresence>

          <AnimatedSection delay={0.2}>
            <div className="mt-16 text-center">
              <a href="#contact" className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent text-white font-heading font-bold text-sm rounded-full hover:bg-accent-hover transition-colors">
                Let's Work Together <ArrowUpRight size={16} />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ━━━━━━ Industries ━━━━━━ */}
      <section id="industries" className="max-w-[1320px] mx-auto px-6 pb-24 sm:pb-32">
        <AnimatedSection>
          <SectionLabel num="03" label="Industries" />
          <p className="text-muted text-sm sm:text-base max-w-xl mb-12 -mt-2">My areas of expertise.</p>
        </AnimatedSection>

        <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {INDUSTRIES.map(ind => (
            <GridItem key={ind.title}>
              <motion.div whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="bg-surface rounded-[20px] p-8 sm:p-10 border border-line/50 hover:border-line/30 hover:shadow-md transition-all duration-300 h-full">
                <h3 className="font-heading font-bold text-2xl sm:text-3xl tracking-tight mb-4">{ind.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{ind.desc}</p>
              </motion.div>
            </GridItem>
          ))}
        </StaggerGrid>
      </section>

      {/* ━━━━━━ Why Choose Me ━━━━━━ */}
      <section className="max-w-[1320px] mx-auto px-6 pb-24 sm:pb-32">
        <AnimatedSection>
          <SectionLabel num="04" label="Why Choose Me" />
          <p className="text-muted text-sm sm:text-base max-w-xl mb-12 -mt-2">Your success is my priority.</p>
        </AnimatedSection>

        <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {WHY_US.map((item, i) => (
            <GridItem key={item.title}>
              <motion.div whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="bg-surface rounded-[20px] p-8 sm:p-10 border border-line/50 hover:border-line/30 hover:shadow-md transition-all duration-300 h-full">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mb-5">
                  <span className="font-heading font-bold text-accent text-sm">0{i + 1}</span>
                </div>
                <h3 className="font-heading font-bold text-xl tracking-tight mb-3">{item.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
              </motion.div>
            </GridItem>
          ))}
        </StaggerGrid>
      </section>



      {/* ━━━━━━ Awards ━━━━━━ */}
      <section className="max-w-[1320px] mx-auto px-6 pb-24 sm:pb-32">
        <AnimatedSection>
          <SectionLabel num="05" label="Recognition" />
        </AnimatedSection>

        <StaggerGrid className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
          {AWARDS.map(a => (
            <GridItem key={a.title}>
              <div className="bg-surface rounded-[20px] p-8 border border-line/50 text-center hover:border-line/30 hover:shadow-md transition-all duration-300">
                <div className="font-heading font-bold text-lg mb-2">{a.title}</div>
                <div className="font-mono text-xs text-accent uppercase tracking-wider mb-2">{a.org}</div>
                <p className="text-xs text-muted">{a.desc}</p>
              </div>
            </GridItem>
          ))}
        </StaggerGrid>
      </section>

      {/* ━━━━━━ About ━━━━━━ */}
      <section id="about" className="max-w-[1320px] mx-auto px-6 pb-24 sm:pb-32">
        <AnimatedSection>
          <SectionLabel num="06" label="About" />
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 mt-4">
          <AnimatedSection delay={0.1} className="lg:col-span-3">
            <p className="font-heading font-bold text-2xl sm:text-3xl tracking-tight leading-tight">
              Hi, I'm Aadiilin — a freelance graphic designer crafting bold visuals from Kasaragod, Kerala.
            </p>
            <p className="mt-5 text-muted leading-relaxed">
              I specialize in brand identities, poster design, campaign visuals, and art direction that tell stories and drive impact. Every project is built on a foundation of strategic thinking and bold creative vision.
            </p>
            <p className="mt-4 text-muted leading-relaxed">
              I've partnered with organizations like Baithul Izza on event identities and campaign visuals. Currently available for freelance projects — let's create something great together.
            </p>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {SKILLS.map(s => (
                <span key={s} className="px-4 py-1.5 bg-surface text-xs font-mono rounded-full border border-line hover:border-accent/30 transition-colors">
                  {s}
                </span>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2} className="lg:col-span-2">
            <div className="aspect-[3/4] bg-surface rounded-[20px] border border-line/50 overflow-hidden">
              <img src={`${import.meta.env.BASE_URL}images/adil-portrait.jpg`} alt="Aadiilin" className="w-full h-full object-cover" />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ━━━━━━ Contact ━━━━━━ */}
      <section id="contact" className="bg-text text-bg mx-4 sm:mx-6 rounded-[32px] sm:rounded-[40px] py-24 sm:py-32 mb-24 sm:mb-32 overflow-hidden">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
            <div className="lg:col-span-3">
              <AnimatedSection>
                <div className="text-xs font-mono text-bg/60 uppercase tracking-wider mb-4">Contact</div>
                <h2 className="font-heading font-extrabold text-[clamp(2rem,7vw,4.5rem)] tracking-tight leading-[1.05]">
                  Have a project<br />in mind?
                </h2>
                <p className="mt-4 text-bg/70 max-w-lg mb-10">
                  Let's talk about how I can help bring your vision to life. Fill in the form or reach out directly.
                </p>
              </AnimatedSection>

              <form className="space-y-5" onSubmit={(e) => {
                e.preventDefault()
                const form = e.currentTarget
                const name = (form.querySelector('[name="name"]') as HTMLInputElement)?.value || "Not provided"
                const email = (form.querySelector('[name="email"]') as HTMLInputElement)?.value || "Not provided"
                const msg = (form.querySelector('[name="message"]') as HTMLTextAreaElement)?.value || "Not provided"
                const budget = (form.querySelector('[name="budget"]:checked') as HTMLInputElement)?.value || "To be discussed"
                const text = `Hello Aadiilin,%0A%0AI hope this message finds you well. My name is *${encodeURIComponent(name)}* and I am reaching out to discuss a potential design collaboration with you.%0A%0A*── Project Overview ──*%0A${encodeURIComponent(msg)}%0A%0A*── Budget Range ──*%0A${encodeURIComponent(budget)}%0A%0A*── Contact Details ──*%0AEmail: ${encodeURIComponent(email)}%0A%0AI came across your portfolio and was truly impressed by your work — particularly in brand identity and poster design. I believe your creative vision aligns perfectly with what I am looking for.%0A%0AI look forward to hearing from you and discussing this further at your earliest convenience.%0A%0A─── *Auto Reply* ───%0A✅ Thank you for reaching out! I have received your inquiry and will respond within 24 hours. In the meantime, feel free to browse my portfolio:%0A🌐 aadiilin.vercel.app%0A📸 Instagram: @aadiil.in%0A%0ABest regards,%0A*Aadiilin*`
                window.open(`https://wa.me/918137802554?text=${text}`, "_blank")
              }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <input name="name" type="text" placeholder="Your Name" className="w-full px-5 py-3.5 bg-bg/10 border border-bg/20 rounded-xl text-sm focus:outline-none focus:border-accent transition-colors placeholder:text-bg/40 text-bg" />
                  <input name="email" type="email" placeholder="Your Email" className="w-full px-5 py-3.5 bg-bg/10 border border-bg/20 rounded-xl text-sm focus:outline-none focus:border-accent transition-colors placeholder:text-bg/40 text-bg" />
                </div>
                <textarea name="message" placeholder="Tell me about your project" rows={5} className="w-full px-5 py-3.5 bg-bg/10 border border-bg/20 rounded-xl text-sm focus:outline-none focus:border-accent transition-colors placeholder:text-bg/40 text-bg resize-none" />
                <div className="flex flex-wrap gap-3">
                  <div className="w-full text-xs font-mono text-bg/60 uppercase tracking-wider mb-1">Budget?</div>
                  {["up to $200", "$200-$500", "$500-$1k", "$1k-$5k", ">$5k"].map(b => (
                    <label key={b} className="flex items-center gap-2 px-4 py-2.5 bg-bg/10 border border-bg/20 rounded-full text-xs font-mono cursor-pointer hover:border-accent transition-colors">
                      <input type="radio" name="budget" value={b} className="accent-accent" />
                      {b}
                    </label>
                  ))}
                </div>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  type="submit" className="px-8 py-3.5 bg-accent text-white font-heading font-bold text-sm rounded-full hover:bg-accent-hover transition-colors inline-flex items-center gap-2">
                  Send Message <ArrowUpRight size={16} />
                </motion.button>
              </form>
            </div>

            <div className="lg:col-span-2">
              <AnimatedSection delay={0.15}>
                <div className="bg-bg/5 rounded-[20px] p-8 border border-bg/10">
                  <h3 className="font-heading font-bold text-lg mb-6">Contact Info</h3>
                  <div className="space-y-5">
                    <div>
                      <div className="font-mono text-xs text-bg/50 uppercase tracking-wider mb-1">Email</div>
                      <a href="mailto:adilsarvadka@gmail.com" className="text-sm hover:text-accent transition-colors">adilsarvadka@gmail.com</a>
                    </div>
                    <div>
                      <div className="font-mono text-xs text-bg/50 uppercase tracking-wider mb-1">Phone</div>
                      <a href="tel:+918137802554" className="text-sm hover:text-accent transition-colors">+91 81378 02554</a>
                    </div>
                    <div>
                      <div className="font-mono text-xs text-bg/50 uppercase tracking-wider mb-1">Location</div>
                      <span className="text-sm">Kasaragod, Kerala, India</span>
                    </div>
                    <div className="pt-5 border-t border-bg/10">
                      <div className="font-mono text-xs text-bg/50 uppercase tracking-wider mb-3">Social</div>
                      <div className="flex flex-wrap gap-2.5">
                        {SOCIAL_LINKS.map(s => (
                          <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            className="px-4 py-2 bg-bg/10 text-xs font-mono rounded-full hover:bg-accent hover:text-white transition-colors">
                            {s.label}
                          </motion.a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━ CTA Banner ━━━━━━ */}
      <section className="max-w-[1320px] mx-auto px-6 pb-24 sm:pb-32">
        <AnimatedSection>
          <motion.div className="bg-text text-bg rounded-[32px] p-12 sm:p-20 text-center relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-accent/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-accent/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <p className="font-mono text-sm text-bg/50 uppercase tracking-wider mb-4">Let's create</p>
              <h2 className="font-heading font-extrabold text-[clamp(2rem,6vw,4.5rem)] tracking-tight leading-[1.05]">
                Something<br />together.
              </h2>
              <motion.a href="mailto:adilsarvadka@gmail.com"
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                className="mt-10 inline-flex items-center gap-2 px-8 py-4 bg-accent text-white font-heading font-bold text-base rounded-full hover:bg-accent-hover transition-colors">
                <Mail size={18} /> Start a Project
              </motion.a>
            </div>
          </motion.div>
        </AnimatedSection>
      </section>

      {/* ━━━━━━ Footer ━━━━━━ */}
      <footer className="border-t border-line">
        <div className="max-w-[1320px] mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row items-start justify-between gap-10">
            <div>
              <Link href="/" className="font-heading font-bold text-xl tracking-tight">
                aadiilin<span className="text-accent">.</span>
              </Link>
              <p className="mt-3 font-mono text-xs text-muted max-w-xs leading-relaxed">
                Freelance graphic designer crafting bold visuals and brand identities from Kasaragod, Kerala.
              </p>
              <div className="flex gap-3 mt-6">
                {SOCIAL_LINKS.slice(0, 4).map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-subtle text-xs font-mono rounded-full hover:bg-accent hover:text-white transition-colors">
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 sm:gap-16">
              <div>
                <div className="font-mono text-[11px] text-muted uppercase tracking-[0.15em] mb-4">Navigate</div>
                <div className="flex flex-col gap-2.5">
                  {["Work", "Services", "About", "Contact"].map(item => (
                    <a key={item} href={`#${item.toLowerCase()}`} className="text-sm hover:text-accent transition-colors">{item}</a>
                  ))}
                </div>
              </div>
              <div>
                <div className="font-mono text-[11px] text-muted uppercase tracking-[0.15em] mb-4">Services</div>
                <div className="flex flex-col gap-2.5">
                  <a href="#services" className="text-sm hover:text-accent transition-colors">Poster Design</a>
                  <a href="#services" className="text-sm hover:text-accent transition-colors">Brand Identity</a>
                  <a href="#services" className="text-sm hover:text-accent transition-colors">Campaign Visuals</a>
                  <a href="#services" className="text-sm hover:text-accent transition-colors">Art Direction</a>
                </div>
              </div>
              <div>
                <div className="font-mono text-[11px] text-muted uppercase tracking-[0.15em] mb-4">Contact</div>
                <div className="flex flex-col gap-2.5">
                  <a href="mailto:adilsarvadka@gmail.com" className="text-sm hover:text-accent transition-colors">Email</a>
                  <a href="tel:+918137802554" className="text-sm hover:text-accent transition-colors">Phone</a>
                  <a href="https://wa.me/918137802554" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-accent transition-colors">WhatsApp</a>
                </div>
              </div>
              <div>
                <div className="font-mono text-[11px] text-muted uppercase tracking-[0.15em] mb-4">Social</div>
                <div className="flex flex-col gap-2.5">
                  <a href="https://www.instagram.com/aadiil.in" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-accent transition-colors">Instagram</a>
                  <a href="https://www.linkedin.com/in/adil-sarvadka-51282a406" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-accent transition-colors">LinkedIn</a>
                  <a href="https://github.com/aadiilin" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-accent transition-colors">GitHub</a>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-faint">
            <span>&copy; {new Date().getFullYear()} Aadiilin. All rights reserved.</span>
            <span>Freelance Graphic Designer — Kasaragod, Kerala</span>
          </div>
        </div>
      </footer>

      <ChatBot />
    </div>
  )
}