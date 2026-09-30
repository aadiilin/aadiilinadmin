import { useRef } from 'react'
import { Link } from 'wouter'
import { motion, useInView } from 'framer-motion'
import { SEO } from '@/components/seo'
import { PROJECTS } from '@/lib/seo-data'
import { collectionPageSchema, itemListSchema, contactPageSchema, personSchema } from '@/lib/schemas'
import { CanvasBackground } from '@/components/canvas-background'
import { HeroTitle3D } from '@/components/hero-title-3d'
import { ProjectCard3D } from '@/components/project-card-3d'
import { LiveClock } from '@/components/live-clock'
import { soundManager } from '@/lib/sound'
import { FaLinkedin, FaDribbble, FaGithub } from 'react-icons/fa'

const featured = PROJECTS.slice(0, 4)

const heroLines = [
  { text: 'High', style: 'serif' as const, italic: true, opacity: 'text-white/90' },
  { text: 'end', style: 'serif' as const, italic: true, opacity: 'text-white/70' },
  { text: 'digital', style: 'display' as const, italic: false, opacity: 'text-white' },
  { text: 'experiences', style: 'display' as const, italic: false, opacity: 'text-white/80' },
  { text: 'By Adil', style: 'serif' as const, italic: true, opacity: 'text-white/60', small: true },
]

function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-32 pb-16 px-6 md:px-12 lg:px-16 overflow-hidden bg-[#0A0A0A]">
      <CanvasBackground />

      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto">
        <HeroTitle3D lines={heroLines} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="mt-12 md:mt-20 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <p className="text-white/60 text-sm md:text-base font-sans leading-relaxed max-w-xl">
            High level experience in web design and development knowledge, producing quality work.
          </p>


          <div className="text-right shrink-0">
            <p className="text-white/40 text-xs md:text-sm font-mono leading-relaxed">
              Great design services —<br />
              <span className="text-white/80">without the pretentiousness.</span>
            </p>
            <div className="flex gap-4 mt-4">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
                data-cursor="pointer"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href="https://dribbble.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
                data-cursor="pointer"
              >
                <FaDribbble size={20} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
                data-cursor="pointer"
              >
                <FaGithub size={20} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="relative z-10 flex justify-center pt-8"
      >
        <div
          className="flex flex-col items-center gap-2 text-white/40 hover:text-white transition-colors cursor-pointer"
          onClick={() => {
            soundManager.playClick()
            window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
          }}
          data-cursor="pointer"
        >
          <span className="text-[10px] font-mono tracking-widest uppercase">SCROLL DOWN</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="animate-bounce">
            <path d="M12 5v14M5 12l7 7-7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </motion.div>
    </section>
  )
}

function TextRevealSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-20%' })

  return (
    <section ref={ref} className="py-28 md:py-48 px-6 md:px-12 lg:px-16 bg-[#0A0A0A] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="font-serif text-4xl md:text-6xl lg:text-7xl italic text-white/80 leading-tight"
        >
          We&rsquo;ll
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-black text-white mt-1 uppercase tracking-tight"
        >
          help&nbsp;you
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
          className="font-serif text-4xl md:text-6xl lg:text-7xl italic text-white/80 mt-1"
        >
          Stand out
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
          className="font-serif text-4xl md:text-6xl lg:text-7xl italic text-white/80 mt-1"
        >
          &amp;&nbsp;make
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-black text-white mt-1 uppercase tracking-tight"
        >
          all&nbsp;your dreams
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-black text-white mt-1 uppercase tracking-tight"
        >
          come&nbsp;true<span className="font-serif italic text-4xl md:text-6xl text-white/40 align-top">*</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-white/40 text-sm md:text-base font-mono mt-12 max-w-lg border-l border-white/20 pl-4 leading-relaxed"
        >
          *As long as your dreams revolve around something like; being the proud owner of a spectacular website.
        </motion.p>
      </div>
    </section>
  )
}

function FeaturedWork() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section ref={ref} className="py-24 md:py-36 px-6 md:px-12 lg:px-16 bg-[#0A0A0A] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="font-serif text-4xl md:text-6xl lg:text-7xl italic text-white/70 block"
            >
              featured
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
              className="font-display text-6xl md:text-8xl lg:text-9xl font-black text-white block mt-[-0.2em] uppercase tracking-tight"
            >
              work
            </motion.span>
          </div>

          <Link
            href="/work"
            onMouseEnter={() => soundManager.playHover()}
            onClick={() => soundManager.playClick()}
            className="text-xs font-mono tracking-widest text-white/50 hover:text-white uppercase border-b border-white/20 pb-1 hover:border-white transition-all self-start md:self-auto"
            data-cursor="pointer"
          >
            VIEW ALL PROJECTS [4]
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {featured.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 * i, ease: [0.76, 0, 0.24, 1] }}
            >
              <ProjectCard3D project={project} index={i} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-20%' })

  return (
    <section ref={ref} className="py-28 md:py-40 px-6 md:px-12 lg:px-16 bg-[#0A0A0A] border-t border-white/5">
      <div className="max-w-4xl mx-auto text-center">
        <motion.span
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="font-mono text-xs tracking-widest uppercase text-white/40 block mb-8"
        >
          Testimonial
        </motion.span>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
          className="font-serif italic text-3xl md:text-5xl lg:text-6xl text-white/80 leading-tight"
        >
          &ldquo;I get a good impression, I carry out my project with all the possible quality and attention and support 24 hours a day.&rdquo;
        </motion.p>
      </div>
    </section>
  )
}

const services = [
  { name: 'I develop the user interface.', desc: '' },
  { name: 'Web page development.', desc: '' },
  { name: 'I create ux element interactions.', desc: '' },
  { name: 'I position your company brand.', desc: '' },
]

function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-15%' })

  return (
    <section id="about" ref={ref} className="py-24 md:py-36 px-6 md:px-12 lg:px-16 bg-[#0A0A0A] text-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 md:mb-36">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between gap-6 flex-wrap border-b border-white/10 pb-6 mb-12"
          >
            <LiveClock label="KASARAGOD STUDIO" timezone="Asia/Kolkata" />
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              AVAILABLE FOR NEW PROJECTS Q3/Q4
            </div>
            <div className="flex items-start gap-6">
              <p className="text-xs font-mono text-white/60 uppercase tracking-wider text-center">
                Years <br /> experience
              </p>
              <p className="text-xs font-mono text-white/60 uppercase tracking-wider text-center">
                Completed <br /> project
              </p>
              <p className="text-xs font-mono text-white/60 uppercase tracking-wider text-center">
                Companies <br /> worked
              </p>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="font-serif italic text-4xl md:text-6xl lg:text-7xl text-white/90 leading-tight max-w-5xl"
          >
            Crafting bold visuals,<br />high-end poster design &amp; identities.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
            className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20"
          >
            <div>
              <p className="font-serif italic text-white/40 text-xl md:text-2xl mb-4">
                driven by
              </p>
              <p className="text-5xl md:text-7xl lg:text-8xl leading-tight">
                <span className="font-display font-black text-white uppercase tracking-tight block">grit</span>
                <span className="font-serif italic text-white/40">&amp; </span>
                <span className="font-display font-bold text-white uppercase tracking-tight">dedicated</span>
                <br />
                <span className="font-serif italic text-white/40">to </span>
                <span className="font-display font-black text-white uppercase tracking-tight">quality</span>
              </p>
            </div>

            <div className="space-y-6 self-end">
              <p className="font-sans text-base md:text-lg text-white/70 leading-relaxed">
                Web developer, with extensive knowledge and years of experience, working in web technologies and Ui / Ux design, delivering quality work.
              </p>
              <p className="font-sans text-base md:text-lg text-white/70 leading-relaxed">
                Plain and simple; we do good ol&rsquo; fashioned branding, poster visuals, and websites. Our goal is to make it as easy as possible for you to walk away with the solution that suits your needs perfectly. Straightforward, honest, and genuine.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Capabilities */}
        <section className="border-t border-white/10 pt-16">
          <h2 className="font-serif text-3xl md:text-5xl italic text-white/80 mb-12">
            capabilities &amp; expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((srv, i) => (
              <div
                key={i}
                className="p-8 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
                onMouseEnter={() => soundManager.playHover()}
              >
                <h3 className="font-display text-xl font-bold text-white mb-2 uppercase">{srv.name}</h3>
                <p className="text-white/60 text-sm font-sans leading-relaxed">{srv.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  )
}

function AboutMarquee() {
  return (
    <section className="relative py-20 md:py-32 bg-[#0A0A0A] overflow-hidden border-t border-b border-white/10">
      <a
        href="#about"
        className="block group"
        onMouseEnter={() => soundManager.playHover()}
        onClick={(e) => {
          e.preventDefault()
          soundManager.playClick()
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
        }}
        data-cursor="pointer"
        data-cursor-text="ABOUT"
      >
        <div className="flex whitespace-nowrap animate-marquee" style={{ width: 'fit-content' }}>
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="flex items-center gap-12 md:gap-16 mx-6">
              <span className="font-serif italic text-6xl md:text-8xl lg:text-9xl text-white/20 group-hover:text-white transition-colors duration-500">
                about
              </span>
              <span className="font-display font-black text-6xl md:text-8xl lg:text-9xl text-white/10 group-hover:text-white/80 uppercase transition-colors duration-500">
                studio
              </span>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="text-white/30 group-hover:text-white group-hover:translate-x-3 transition-all duration-300">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          ))}
        </div>
      </a>
    </section>
  )
}

function ContactCTA() {
  return (
    <section className="py-28 md:py-40 px-6 md:px-12 lg:px-16 bg-[#0A0A0A] text-center relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-serif italic text-4xl md:text-6xl text-white/80 mb-6">
          Have a project in mind?
        </h2>
        <p className="font-display text-4xl md:text-7xl font-bold text-white uppercase tracking-tight mb-10">
          Let&rsquo;s create something extraordinary.
        </p>

        <Link
          href="/contact"
          onMouseEnter={() => soundManager.playHover()}
          onClick={() => soundManager.playClick()}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-mono text-sm font-bold uppercase tracking-wider hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-2xl"
          data-cursor="pointer"
        >
          START A PROJECT
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>
    </section>
  )
}

export function Home() {
  return (
    <main className="bg-[#0A0A0A] min-h-screen text-white">
      <SEO
        title="Aadiilin — Freelance Graphic Designer & Visual Artist"
        description="Portfolio of Aadiilin (Adil Sarvadka), a freelance graphic designer from Kerala specializing in poster design, brand identity, and campaign visuals."
        path="/"
        jsonLd={[collectionPageSchema(), itemListSchema(), contactPageSchema(), personSchema()]}
      />

      <HeroSection />
      <TextRevealSection />
      <FeaturedWork />
      <div className="py-24 md:py-36 px-6 md:px-12 lg:px-16 bg-[#0A0A0A] text-center">
        <p className="text-white/60 text-lg md:text-xl font-sans leading-relaxed max-w-2xl mx-auto">
          Website adaptable to all devices, with ui components and animated interactions.
        </p>
      </div>
      <TestimonialSection />
      <AboutMarquee />
      <AboutSection />
      <ContactCTA />
    </main>
  )
}
