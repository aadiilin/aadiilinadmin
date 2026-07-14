import { Link } from "wouter"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, ReactNode } from "react"
import { X, Menu, ExternalLink, Mail, Send } from "lucide-react"
import { ChatBot } from "@/components/chat-bot"
import { FABBackground } from "@/components/fab-background"
import { ContactForm } from "@/components/contact-form"
import { SearchOverlay } from "@/components/search-overlay"
import { FAQSection } from "@/components/faq-section"
import { SEO } from "@/components/seo"
import { collectionPageSchema, itemListSchema, contactPageSchema } from "@/lib/schemas"

const PROJECTS = [
  { slug: "imbizo", title: "IMBIZO 1.0", role: "Poster & Identity", year: "2025", category: "Event Identity", image: `${import.meta.env.BASE_URL}images/imbizo.jpeg` },
  { slug: "an-nur", title: "An-Nur Fifteen Hundred", role: "Campaign Design", year: "2025", category: "Campaign Design", image: `${import.meta.env.BASE_URL}images/annur.jpeg` },
  { slug: "hijra", title: "Hijra Talk Series", role: "Event Identity", year: "2025", category: "Event Identity", image: `${import.meta.env.BASE_URL}images/hijra.jpeg` },
  { slug: "keam-2025", title: "KEAM 2025 Results", role: "Editorial Layout", year: "2025", category: "Editorial Design", image: `${import.meta.env.BASE_URL}images/keam.jpeg` },
  { slug: "enroute", title: "Enroute", role: "Travel Campaign", year: "2024", category: "Campaign Design", image: `${import.meta.env.BASE_URL}images/enroute.jpeg` },
  { slug: "guest-welcome", title: "Hearty Welcomes", role: "Event Poster", year: "2024", category: "Event Poster", image: `${import.meta.env.BASE_URL}images/guest.jpeg` },
  { slug: "token-of-love-poster-variety", title: "Token Of Love Poster Variety", role: "Poster Design", year: "2025", category: "Poster Design", image: `${import.meta.env.BASE_URL}images/Token_Of_Love_Poster_Variety.jpg` },
  { slug: "award-poster-design", title: "Award Poster Design", role: "Poster Design", year: "2025", category: "Poster Design", image: `${import.meta.env.BASE_URL}images/Award_Poster_Design.jpg` },
  { slug: "variety-creative-poster-design", title: "Variety Creative Poster Design", role: "Poster Design", year: "2025", category: "Poster Design", image: `${import.meta.env.BASE_URL}images/Variety_Creative_Poster_Design.jpg` },
  { slug: "token-of-love-poster", title: "Token Of Love Poster", role: "Poster Design", year: "2025", category: "Poster Design", image: `${import.meta.env.BASE_URL}images/Token_Of_Love_Poster.jpg` },
  { slug: "wedding", title: "WEDDING", role: "Wedding Design", year: "2025", category: "Graphic Design", image: `${import.meta.env.BASE_URL}images/weddingnu.jpeg` },
]

const SKILLS = [
  "Poster Design", "Brand Identity", "Campaign Visuals", "Art Direction",
  "Typography", "Editorial Layout", "Packaging Design", "Visual Storytelling",
]

const MARQUEE_ITEMS = [...SKILLS, ...SKILLS]

const STATS = [
  { value: "1+", label: "Years Designing" },
  { value: "10+", label: "Projects Delivered" },
  { value: "5+", label: "Brands Served" },
  { value: "0", label: "Shortcuts Taken" },
]

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.25, 1, 0.5, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function Home() {
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-bg text-text overflow-x-hidden">
      <FABBackground hidden={selectedProject !== null} />
      <SEO jsonLd={[collectionPageSchema(), itemListSchema(), contactPageSchema()]} />

      {/* Lightbox */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
          >
            <button onClick={() => setSelectedProject(null)} className="absolute inset-0 bg-text/70 backdrop-blur-sm cursor-zoom-out" />
            <motion.div
              layoutId={selectedProject.slug}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl aspect-[4/3] bg-surface rounded-2xl overflow-hidden shadow-2xl z-10"
            >
              <button onClick={() => setSelectedProject(null)} className="absolute top-4 right-4 z-20 bg-text/20 backdrop-blur-sm p-2 rounded-full hover:bg-text/30 transition-colors">
                <X size={16} className="text-text" />
              </button>
              <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-contain bg-subtle" />
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-text/80 to-transparent">
                <div className="font-heading font-bold text-2xl text-white mb-1">{selectedProject.title}</div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-accent font-mono uppercase tracking-wider">{selectedProject.role}</span>
                  <span className="w-1 h-1 bg-white/30 rounded-full" />
                  <span className="text-white/60 font-mono">{selectedProject.year}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-bg/90 backdrop-blur-md shadow-[0_1px_0_rgba(26,26,26,0.06)]" : "bg-transparent"}`}>
        <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden relative z-50 p-2 -ml-2">
              {mobileMenu ? <X size={20} /> : <Menu size={20} />}
            </button>
            <Link href="/" className="font-heading font-bold text-xl tracking-tight select-none">
              aadiilin
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <a href="#work" className="text-sm text-muted hover:text-text transition-colors">Work</a>
            <a href="#about" className="text-sm text-muted hover:text-text transition-colors">About</a>
            <a href="#contact" className="text-sm text-muted hover:text-text transition-colors">Contact</a>
            <SearchOverlay />
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-accent text-white select-none">
              Open to work
            </span>
          </div>
        </nav>

        <AnimatePresence>
          {mobileMenu && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 z-40 bg-bg flex flex-col items-center justify-center gap-8"
            >
              <a href="#work" onClick={() => setMobileMenu(false)} className="font-heading font-bold text-3xl tracking-tight">Work</a>
              <a href="#about" onClick={() => setMobileMenu(false)} className="font-heading font-bold text-3xl tracking-tight">About</a>
              <a href="#contact" onClick={() => setMobileMenu(false)} className="font-heading font-bold text-3xl tracking-tight">Contact</a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero */}
      <section className="min-h-[90vh] flex flex-col justify-center px-6 max-w-6xl mx-auto pt-28 pb-16">
        <Reveal>
          <h1 className="font-heading font-extrabold text-[clamp(2.8rem,10vw,6.5rem)] leading-[1.05] tracking-tighter">
            Graphic Designer.<br />
            who crafts<br />
            <span className="relative inline-block">
              visual stories.
              <span className="absolute -bottom-1.5 left-0 right-0 h-[0.35em] bg-yellow -z-10 rounded-sm" style={{ width: "calc(100% + 0.15em)" }} />
            </span>
          </h1>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-6 font-mono text-xs sm:text-sm text-muted tracking-wider uppercase">
            Poster Design · Brand Identity · Campaign Visuals · Art Direction
          </p>
        </Reveal>
        <Reveal delay={0.25}>
          <a href="#work" className="mt-10 inline-flex items-center gap-2 font-mono text-sm text-accent hover:underline underline-offset-4">
            See the work <ExternalLink size={12} />
          </a>
        </Reveal>
      </section>

      {/* Marquee */}
      <section className="py-6 border-t border-b border-line overflow-hidden bg-subtle">
        <div className="flex whitespace-nowrap animate-marquee">
          {MARQUEE_ITEMS.map((skill, i) => (
            <span key={i} className="mx-6 font-heading font-bold text-base sm:text-lg text-muted/80">
              {skill}
              <span className="inline-block ml-6 text-accent">✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-6xl mx-auto px-6 py-20 sm:py-24">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <div className="bg-surface rounded-2xl p-6 sm:p-8 text-center border border-line/50">
                <div className="font-heading font-extrabold text-4xl sm:text-5xl text-text">{stat.value}</div>
                <div className="mt-1.5 font-mono text-xs text-muted uppercase tracking-wider">{stat.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Selected Work */}
      <section id="work" className="max-w-6xl mx-auto px-6 pb-20 sm:pb-24">
        <Reveal>
          <div className="flex items-center gap-4 mb-10">
            <span className="font-mono text-xs text-muted uppercase tracking-widest">01</span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl tracking-tight">Selected Work</h2>
            <div className="flex-1 h-px bg-line" />
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.04}>
              <button
                onClick={() => setSelectedProject(project)}
                className="group block w-full text-left bg-surface rounded-2xl overflow-hidden border border-line/50 hover:border-line/30 hover:shadow-md transition-all duration-300"
              >
                <div className="relative aspect-square overflow-hidden bg-subtle">
                  <span className="absolute top-3 left-3 z-10 font-mono text-xs font-bold text-muted/60 select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="absolute top-3 right-3 z-10 text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded-full bg-accent text-white select-none">
                    {project.category}
                  </span>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-text/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-4 sm:p-5">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-heading font-bold text-base sm:text-lg tracking-tight truncate">{project.title}</h3>
                    <span className="font-mono text-xs text-muted shrink-0">{project.year}</span>
                  </div>
                  <p className="mt-1 font-mono text-xs text-muted uppercase tracking-wider">{project.role}</p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="max-w-6xl mx-auto px-6 pb-20 sm:pb-24">
        <Reveal>
          <div className="flex items-center gap-4 mb-10">
            <span className="font-mono text-xs text-muted uppercase tracking-widest">02</span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl tracking-tight">About</h2>
            <div className="flex-1 h-px bg-line" />
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-14">
          <Reveal delay={0.1} className="md:col-span-3">
            <p className="font-heading font-semibold text-xl sm:text-2xl leading-snug tracking-tight">
              Hi, I'm Aadiilin.
            </p>
            <p className="mt-4 text-muted leading-relaxed">
              I'm a freelance graphic designer from Kasaragod, Kerala — crafting brand identities, poster design,
              campaign visuals, and art direction. I believe in bold visuals and strategic thinking, creating
              design solutions that resonate and leave a mark.
            </p>
            <p className="mt-4 text-muted leading-relaxed">
              I've worked with Baithul Izza on event identities, campaign visuals, and editorial layouts.
              Currently available for freelance projects — let's make something great together.
            </p>
            <a
              href="mailto:adilsarvadka@gmail.com"
              className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-accent hover:underline underline-offset-4"
            >
              <Mail size={14} /> adilsarvadka@gmail.com
            </a>
          </Reveal>

          <Reveal delay={0.2} className="md:col-span-2 md:mt-0 mt-8">
            <div className="aspect-[3/4] bg-surface rounded-2xl border border-line/50 overflow-hidden">
              <img
                src={`${import.meta.env.BASE_URL}images/adil-portrait.jpg`}
                alt="Aadiilin"
                className="w-full h-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="max-w-6xl mx-auto px-6 pb-20 sm:pb-24">
        <Reveal>
          <div className="flex items-center gap-4 mb-10">
            <span className="font-mono text-xs text-muted uppercase tracking-widest">04</span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl tracking-tight">Get in Touch</h2>
            <div className="flex-1 h-px bg-line" />
          </div>
        </Reveal>
        <div className="max-w-xl">
          <Reveal delay={0.05}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <FAQSection />

      {/* Footer */}
      <footer className="border-t border-line bg-subtle">
        <div className="max-w-6xl mx-auto px-6 py-16 sm:py-20">
          <Reveal>
            <p className="font-mono text-sm text-muted">That's the work. Here's the awkward reaching out part.</p>
            <h2 className="mt-4 font-heading font-extrabold text-[clamp(2rem,6vw,4rem)] tracking-tight leading-[1.1]">
              Let's create<br />
              something together.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <a
              href="mailto:adilsarvadka@gmail.com"
              className="mt-8 inline-flex items-center gap-3 px-8 py-4 bg-accent text-white font-heading font-bold text-lg rounded-2xl hover:bg-accent/90 transition-colors"
            >
              <Mail size={20} /> Drop an Email
            </a>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-12 flex flex-wrap items-center gap-6 font-mono text-xs text-muted uppercase tracking-wider">
              <a href="https://www.instagram.com/aadiil.in" target="_blank" rel="noopener noreferrer" className="hover:text-text transition-colors">Instagram ↗</a>
              <a href="https://www.linkedin.com/in/adil-sarvadka-51282a406" target="_blank" rel="noopener noreferrer" className="hover:text-text transition-colors">LinkedIn ↗</a>
              <a href="https://wa.me/918137802554" target="_blank" rel="noopener noreferrer" className="hover:text-text transition-colors">WhatsApp ↗</a>
              <a href="https://github.com/aadiilin" target="_blank" rel="noopener noreferrer" className="hover:text-text transition-colors">GitHub ↗</a>
              <span className="text-faint ml-auto">No templates were harmed</span>
            </div>
          </Reveal>
        </div>
      </footer>

      <ChatBot />
    </div>
  )
}
