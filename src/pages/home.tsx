import { Link } from "wouter"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { ArrowRight, Instagram, Linkedin, Github, Menu, X } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"
import { useState } from "react"
import { CanvasBackground } from "@/components/canvas-background"
import { ScrollProgress } from "@/components/scroll-progress"
import { Clock } from "@/components/clock"
import { CursorTracker } from "@/components/cursor-tracker"
import { SignatureSVG } from "@/components/signature-svg"
import { ChatBot } from "@/components/chat-bot"

const PROJECTS = [
  { slug: "imbizo", title: "IMBIZO 1.0", role: "Poster & Identity", year: "2025", category: "Graphic Design", image: `${import.meta.env.BASE_URL}images/imbizo.jpeg` },
  { slug: "an-nur", title: "An-Nur Fifteen Hundred", role: "Campaign Design", year: "2025", category: "Graphic Design", image: `${import.meta.env.BASE_URL}images/annur.jpeg` },
  { slug: "hijra", title: "Hijra Talk Series", role: "Event Identity", year: "2025", category: "Graphic Design", image: `${import.meta.env.BASE_URL}images/hijra.jpeg` },
  { slug: "keam-2025", title: "KEAM 2025 Results", role: "Editorial Layout", year: "2025", category: "Graphic Design", image: `${import.meta.env.BASE_URL}images/keam.jpeg` },
  { slug: "enroute", title: "Enroute", role: "Travel Campaign", year: "2024", category: "Graphic Design", image: `${import.meta.env.BASE_URL}images/enroute.jpeg` },
  { slug: "guest-welcome", title: "Hearty Welcomes", role: "Event Poster", year: "2024", category: "Graphic Design", image: `${import.meta.env.BASE_URL}images/guest.jpeg` },
  { slug: "token-of-love-poster-variety", title: "Token Of Love Poster Variety", role: "Poster Design", year: "2025", category: "Graphic Design", image: `${import.meta.env.BASE_URL}images/Token_Of_Love_Poster_Variety.jpg` },
  { slug: "award-poster-design", title: "Award Poster Design", role: "Poster Design", year: "2025", category: "Graphic Design", image: `${import.meta.env.BASE_URL}images/Award_Poster_Design.jpg` },
  { slug: "variety-creative-poster-design", title: "Variety Creative Poster Design", role: "Poster Design", year: "2025", category: "Graphic Design", image: `${import.meta.env.BASE_URL}images/Variety_Creative_Poster_Design.jpg` },
  { slug: "token-of-love-poster", title: "Token Of Love Poster", role: "Poster Design", year: "2025", category: "Graphic Design", image: `${import.meta.env.BASE_URL}images/Token_Of_Love_Poster.jpg` },
]

const NAV_ITEMS = ["Work", "Contact"]

export function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null)

  return (
    <div className="min-h-screen bg-bg text-l1 overflow-hidden selection:bg-selection selection:text-black">
      <CanvasBackground />
      <ScrollProgress />
      <ChatBot />

      {/* Lightbox */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
          >
            <motion.div onClick={() => setSelectedProject(null)} className="absolute inset-0 bg-bg/95 backdrop-blur-xl cursor-zoom-out" />
            <motion.div
              layoutId={selectedProject.slug}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl aspect-[4/3] bg-be rounded-2xl overflow-hidden shadow-2xl z-10 border border-line"
            >
              <button onClick={() => setSelectedProject(null)} className="absolute top-4 right-4 z-20 bg-bg/80 p-2 rounded-full hover:bg-be transition-colors">
                <X size={16} />
              </button>
              <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-contain bg-black/20" />
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent">
                <h2 className="font-display font-bold text-2xl text-white mb-1">{selectedProject.title}</h2>
                <div className="flex items-center gap-3 text-xs text-white/60">
                  <span className="text-selection font-mono uppercase tracking-wider">{selectedProject.role}</span>
                  <span className="w-1 h-1 bg-white/30 rounded-full" />
                  <span>{selectedProject.year}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fixed header */}
      <header className="fixed inset-0 z-50 flex flex-col justify-between pointer-events-none text-l1">
        <div className="flex justify-between items-center px-4 lg:px-14 py-4 lg:py-7 text-sm">
          <Link href="/" className="border-dotted-hover p-2 font-sans font-bold uppercase pointer-events-auto tracking-tight">
            aadiilin
          </Link>
          <div className="hidden lg:flex items-center gap-2 pointer-events-auto">
            {NAV_ITEMS.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="border-dotted-hover p-2 uppercase cursor-pointer text-l2 hover:text-l1 transition-colors">
                {item}
              </a>
            ))}
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden border-dotted-hover p-2 uppercase cursor-pointer pointer-events-auto">
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 z-40 bg-bg flex flex-col items-center justify-center gap-8"
            >
              {NAV_ITEMS.map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="text-4xl font-display font-bold uppercase">
                  {item}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-between px-4 lg:px-14 py-4 lg:py-7 text-xs font-mono tabular-nums text-l2">
          <span className="lg:hidden"><Clock /></span>
          <span className="hidden lg:inline">
            <Clock />
          </span>
          <CursorTracker />
        </div>
      </header>

      {/* Scrollable content */}
      <div className="scroll-container fixed inset-0 w-full h-full overflow-y-auto overscroll-contain no-scrollbar">
        {/* Hero */}
        <section className="grid grid-cols-12 grid-rows-[auto_1fr] px-4 lg:px-14 py-18 lg:py-24 w-full min-h-screen">
          <div className="flex flex-col order-2 lg:order-1 lg:grid lg:grid-cols-12 col-span-12 font-mono text-sm text-l2">
            <span className="hidden lg:block lg:col-span-3 lg:col-start-1 p-2 font-display font-medium text-[4svw] sm:text-2xl lg:text-3xl leading-tight">
              Graphic<br />Design
            </span>
            <span className="hidden lg:block lg:col-span-3 lg:col-start-4 p-2 text-balance">
              Bold visuals. Strategic identity.
            </span>
            <span className="col-span-12 lg:col-span-6 lg:col-start-7 mt-auto lg:mt-0 p-2">
              I'm Aadiilin, a freelance graphic designer from Kasaragod, Kerala — crafting brand identities, poster design, campaign visuals, and art direction.
            </span>
          </div>
          <div className="flex flex-col self-end order-1 lg:order-2 col-span-12 px-2 font-display font-bold text-[7.2svw] lg:text-[6svw] 2xl:text-[5svw] uppercase leading-none">
            <span>I bring</span>
            <span>ideas to life</span>
            <span>through design</span>
          </div>
        </section>

        {/* About */}
        <section className="grid grid-cols-12 px-4 lg:px-14 py-18 lg:py-28 w-full">
          <div className="relative col-span-12 sm:col-span-4 lg:col-span-3 p-2">
            <SignatureSVG />
            <div className="aspect-square" />
          </div>
          <div className="flex flex-col justify-start items-start gap-6 col-span-12 sm:col-span-7 lg:col-span-8 sm:col-start-6 lg:col-start-5 text-base lg:text-xl leading-relaxed">
            <p className="p-2 w-full text-l1 text-xl lg:text-[3.2svw] leading-[1.3] font-display">
              I explore how to shape visual identities with craft and taste, building design solutions that resonate.
            </p>
            <p className="p-2 w-full text-l2 text-xl lg:text-[3.2svw] leading-[1.3] font-display">
              I'm currently available for freelance projects, and previously worked with <a href="https://www.instagram.com/aadiil.in" target="_blank" rel="noopener noreferrer" className="text-l1 underline underline-offset-[0.08em] decoration-line transition-colors hover:decoration-l1">Baithul Izza</a> on event identities, campaign visuals, and editorial layouts.
            </p>
          </div>
        </section>

        {/* Projects */}
        <section id="work" className="px-4 lg:px-14 py-18 lg:py-24 w-full">
          <div className="grid grid-cols-12 gap-0 w-full">
            {PROJECTS.map((project, i) => {
              const spans = [
                "col-span-12 lg:col-span-8 lg:col-start-5",
                "col-span-12 lg:col-start-1 lg:col-span-6 xl:col-span-5",
                "col-span-12 lg:col-span-6 xl:col-span-5 lg:col-start-7",
                "col-span-6 lg:col-start-5 lg:col-span-4 xl:col-start-6 xl:col-span-3",
                "col-span-6 lg:col-start-9 lg:col-span-4 xl:col-start-10 xl:col-span-3",
                "col-span-12 lg:col-start-1 lg:col-span-4 xl:col-start-1 xl:col-span-3",
                "col-span-6 lg:col-start-5 lg:col-span-4 xl:col-start-5 xl:col-span-3",
                "col-span-6 lg:col-start-9 lg:col-span-4 xl:col-start-9 xl:col-span-3",
                "col-span-6 lg:col-start-5 lg:col-span-4 xl:col-start-6 xl:col-span-3",
                "col-span-6 lg:col-start-9 lg:col-span-4 xl:col-start-10 xl:col-span-3",
              ]
              return (
                <article key={project.slug} className={`${spans[i] || "col-span-12 lg:col-span-6"}`}>
                  <button onClick={() => setSelectedProject(project)} className="group block space-y-3 p-2 text-left w-full">
                    <div className="relative w-full pointer-events-none select-none" style={{ aspectRatio: "1 / 1" }}>
                      <span className="absolute top-0 right-0 z-10 bg-selection px-1.5 font-mono-2 text-black text-[10px] uppercase pointer-events-none select-none leading-5">
                        {project.category}
                      </span>
                      <div className="w-full h-full bg-be rounded-sm overflow-hidden border border-line transition-colors group-hover:border-l3">
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                    </div>
                    <div className="flex justify-between items-center gap-3 min-w-0 text-xs lg:text-sm uppercase font-mono">
                      <span className="flex-1 min-w-0 truncate text-l1">{project.title}</span>
                      <div className="flex items-center gap-2 font-mono tabular-nums whitespace-nowrap shrink-0 text-l2">
                        <span className="hidden lg:inline text-selection">{project.role}</span>
                        <span>{project.year}</span>
                      </div>
                    </div>
                  </button>
                </article>
              )
            })}
          </div>
        </section>

        {/* Divider */}
        <div className="relative transition-colors duration-300 text-l1" style={{ height: "8px" }}>
          <div className="top-0 sticky grid grid-cols-12 grid-rows-6 px-4 lg:px-14 py-18 lg:py-24 w-full" style={{ minHeight: "1px" }}>
            <div className="flex flex-col justify-center items-center col-span-12 row-span-6 font-display font-bold text-[7.2svw] lg:text-[6.8svw] uppercase leading-none">
              <span>Create</span>
              <span>with</span>
              <span>purpose</span>
            </div>
          </div>
        </div>

        {/* Contact */}
        <footer id="contact" className="z-10 relative flex flex-col justify-center p-6 lg:p-16 w-full min-h-screen pointer-events-none">
          <div className="grid grid-cols-12 font-display font-bold text-[7.2svw] lg:text-[6svw] 2xl:text-[5svw] uppercase leading-none gap-2">
            <span className="col-span-6 md:col-span-5 xl:col-span-4 md:col-start-2 xl:col-start-3 text-left pointer-events-auto">Let's</span>
            <span className="col-span-6 md:col-span-5 xl:col-span-4 text-right pointer-events-auto">Create</span>
          </div>
          <div className="grid grid-cols-12 font-display font-bold text-[7.2svw] lg:text-[6svw] 2xl:text-[5svw] uppercase leading-none gap-2">
            <span className="col-span-12 md:col-start-2 xl:col-start-3 text-left pointer-events-auto">Something</span>
          </div>
          <div className="grid grid-cols-12 font-display font-bold text-[7.2svw] lg:text-[6svw] 2xl:text-[5svw] uppercase leading-none gap-2">
            <span className="col-span-12 md:col-end-12 xl:col-end-11 text-right pointer-events-auto">Extraordinary</span>
          </div>

          <div className="flex flex-col lg:flex-row justify-between w-full mt-auto pt-18 lg:pt-24 px-4 lg:px-14 font-mono text-sm">
            <a href="mailto:adilsarvadka@gmail.com" className="border-dotted-hover p-2 uppercase pointer-events-auto text-l2 hover:text-l1 transition-colors">
              adilsarvadka@gmail.com
            </a>
            <div className="flex items-center gap-2 lg:gap-4">
              <a href="https://www.instagram.com/aadiil.in" target="_blank" rel="noopener noreferrer" className="border-dotted-hover p-2 uppercase pointer-events-auto text-l2 hover:text-l1 transition-colors flex items-center gap-1">
                Instagram <Instagram size={12} />
              </a>
              <a href="https://wa.me/918137802554" target="_blank" rel="noopener noreferrer" className="border-dotted-hover p-2 uppercase pointer-events-auto text-l2 hover:text-l1 transition-colors flex items-center gap-1">
                WhatsApp <FaWhatsapp size={12} />
              </a>
              <a href="https://www.linkedin.com/in/adil-sarvadka-51282a406" target="_blank" rel="noopener noreferrer" className="border-dotted-hover p-2 uppercase pointer-events-auto text-l2 hover:text-l1 transition-colors flex items-center gap-1">
                LinkedIn <Linkedin size={12} />
              </a>
              <a href="https://github.com/aadiilin" target="_blank" rel="noopener noreferrer" className="border-dotted-hover p-2 uppercase pointer-events-auto text-l2 hover:text-l1 transition-colors flex items-center gap-1">
                GitHub <Github size={12} />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
