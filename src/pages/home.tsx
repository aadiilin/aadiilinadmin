import { useRef } from 'react'
import { Link } from 'wouter'
import { motion, useInView } from 'framer-motion'
import { SEO } from '@/components/seo'
import { PROJECTS } from '@/lib/seo-data'
import { collectionPageSchema, itemListSchema, contactPageSchema } from '@/lib/schemas'
import { CanvasBackground } from '@/components/canvas-background'
import { soundManager } from '@/lib/sound'

const featured = PROJECTS.slice(0, 4)

function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-32 pb-16 px-6 md:px-12 lg:px-16 overflow-hidden bg-[#0A0A0A]">
      <CanvasBackground />

      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto">
        <div className="flex flex-col items-start space-y-1 md:space-y-2">
          <motion.div
            initial={{ opacity: 0, y: '80%', rotateX: -80 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
          >
            <span className="font-serif italic text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] text-white/90 leading-[0.85] block tracking-tight">
              High
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: '80%', rotateX: -80 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
          >
            <span className="font-serif italic text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] text-white/70 leading-[0.85] block tracking-tight">
              end
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: '80%', rotateX: -80 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
          >
            <span className="font-display font-black text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] text-white leading-[0.85] block tracking-tight uppercase">
              digital
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: '80%', rotateX: -80 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
          >
            <span className="font-display font-bold text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] text-white/80 leading-[0.85] block tracking-tight lowercase">
              experiences
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="mt-12 md:mt-20 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <p className="text-white/60 text-sm md:text-base font-sans leading-relaxed max-w-xl">
            Jomor Design is a design practice focused on digital experiences. With every single one of our clients, we bring forth a deep passion for creative problem solving — which is what we deliver in the form of custom and memorable experiences.
          </p>

          <div className="text-right shrink-0">
            <p className="text-white/40 text-xs md:text-sm font-mono leading-relaxed">
              Great design services —<br />
              <span className="text-white/80">without the pretentiousness.</span>
            </p>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="relative z-10 flex justify-center pt-8"
      >
        <div className="flex flex-col items-center gap-2 text-white/40 hover:text-white transition-colors cursor-pointer" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
          <span className="text-[10px] font-mono tracking-widest uppercase">SCROLL DOWN</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="animate-bounce">
            <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
            VIEW ALL PROJECTS [4+]
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {featured.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 * i, ease: [0.76, 0, 0.24, 1] }}
            >
              <Link
                href={`/project/${project.slug}`}
                className="group block"
                onMouseEnter={() => soundManager.playHover()}
                onClick={() => soundManager.playClick()}
                data-cursor="pointer"
                data-cursor-text="VIEW"
              >
                <div className="relative overflow-hidden rounded-xl mb-6 aspect-[16/10] bg-[#141414] border border-white/10 group-hover:border-white/30 transition-all duration-500">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                  
                  <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[11px] font-mono text-white/80">
                    {project.index || `${i + 1}/4`}
                  </div>
                </div>

                <div className="flex items-baseline justify-between border-b border-white/10 pb-4 group-hover:border-white/40 transition-colors">
                  <h3 className="font-display text-2xl md:text-4xl font-bold text-white group-hover:text-white/80 transition-colors uppercase">
                    {project.title}
                  </h3>
                  <span className="font-mono text-xs text-white/40">
                    {project.year}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-3 text-xs font-mono text-white/50">
                  <span>{project.role}</span>
                  <span>{project.category}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function AboutMarquee() {
  return (
    <section className="relative py-20 md:py-32 bg-[#0A0A0A] overflow-hidden border-t border-b border-white/10">
      <Link
        href="/about"
        className="block group"
        onMouseEnter={() => soundManager.playHover()}
        onClick={() => soundManager.playClick()}
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
      </Link>
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
        title="Jomor Design | High-End Digital Experiences"
        description="Jomor Design is an independent design practice focused on digital experiences. We mostly do good ol’ fashioned branding and websites."
        path="/"
        jsonLd={[collectionPageSchema(), itemListSchema(), contactPageSchema()]}
      />
      <HeroSection />
      <TextRevealSection />
      <FeaturedWork />
      <AboutMarquee />
      <ContactCTA />
    </main>
  )
}
