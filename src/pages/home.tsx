import { useRef } from 'react'
import { Link } from 'wouter'
import { motion, useInView } from 'framer-motion'
import { SEO } from '@/components/seo'
import { PROJECTS } from '@/lib/seo-data'
import { collectionPageSchema, itemListSchema, contactPageSchema } from '@/lib/schemas'

const heroImages = [
  '/images/imbizo.jpeg',
  '/images/annur.jpeg',
  '/images/hijra.jpeg',
  '/images/keam.jpeg',
  '/images/enroute.jpeg',
  '/images/guest.jpeg',
  '/images/Token_Of_Love_Poster_Variety.jpg',
  '/images/Award_Poster_Design.jpg',
  '/images/weddingnu.jpeg',
]

const featured = PROJECTS.slice(0, 4)

function HeroImageGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="grid grid-cols-3 gap-1.5 md:gap-3 p-3 md:p-6 w-full h-full">
        {heroImages.map((src, i) => (
          <motion.div
            key={i}
            className="overflow-hidden rounded-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            transition={{ duration: 0.8, delay: i * 0.08 }}
          >
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#0F0F0F]">
      <HeroImageGrid />

      <div className="relative z-10 px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl">
          <div className="mb-2 md:mb-3">
            <motion.span
              initial={{ opacity: 0, y: '70%', rotateX: -92, skewX: '3deg' }}
              animate={{ opacity: 1, y: 0, rotateX: 0, skewX: '0deg' }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
              className="font-serif italic text-7xl md:text-9xl lg:text-[10rem] text-white/85 leading-none block"
              style={{ transformStyle: 'preserve-3d' }}
            >
              High
            </motion.span>
          </div>
          <div className="mb-2 md:mb-3">
            <motion.span
              initial={{ opacity: 0, y: '70%', rotateX: -92, skewX: '3deg' }}
              animate={{ opacity: 1, y: 0, rotateX: 0, skewX: '0deg' }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
              className="font-serif italic text-7xl md:text-9xl lg:text-[10rem] text-white/85 leading-none block"
              style={{ transformStyle: 'preserve-3d' }}
            >
              end
            </motion.span>
          </div>
          <div className="mb-2 md:mb-3">
            <motion.span
              initial={{ opacity: 0, y: '70%', rotateX: -92, skewX: '3deg' }}
              animate={{ opacity: 1, y: 0, rotateX: 0, skewX: '0deg' }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
              className="font-display font-bold text-7xl md:text-9xl lg:text-[10rem] text-white leading-none block"
              style={{ transformStyle: 'preserve-3d' }}
            >
              digital
            </motion.span>
          </div>
          <div>
            <motion.span
              initial={{ opacity: 0, y: '70%', rotateX: -92, skewX: '3deg' }}
              animate={{ opacity: 1, y: 0, rotateX: 0, skewX: '0deg' }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
              className="font-display font-bold text-7xl md:text-9xl lg:text-[10rem] text-white/70 leading-none block"
              style={{ transformStyle: 'preserve-3d' }}
            >
              experiences
            </motion.span>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2, ease: [0.76, 0, 0.24, 1] }}
        className="relative z-10 mt-12 md:mt-24 px-6 md:px-12 lg:px-16"
      >
        <div className="max-w-7xl flex justify-end">
          <p className="text-white/60 text-sm md:text-base font-sans leading-relaxed max-w-md text-right">
            Great design services&nbsp;—
            <br />
            without the pretentiousness.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white/40 animate-scroll-indicator">
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
    <section ref={ref} className="py-24 md:py-40 px-6 md:px-12 lg:px-16 bg-[#0F0F0F]">
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="font-serif text-3xl md:text-5xl lg:text-6xl italic text-white/80 leading-tight"
        >
          We&rsquo;ll
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mt-2"
        >
          help&nbsp;you
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
          className="font-serif text-3xl md:text-5xl lg:text-6xl italic text-white/80 mt-2"
        >
          Stand out
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
          className="font-serif text-3xl md:text-5xl lg:text-6xl italic text-white/80 mt-2"
        >
          &amp;&nbsp;make
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mt-2"
        >
          all&nbsp;your dreams
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mt-2"
        >
          come&nbsp;true<span className="font-serif italic text-3xl md:text-5xl align-top text-white/30">*</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-white/40 text-sm md:text-base font-sans mt-8 max-w-lg"
        >
          As long as your dreams revolve around something like; being the proud owner of a spectacular website.
        </motion.p>
      </div>
    </section>
  )
}

function DescriptionSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-20%' })

  return (
    <section ref={ref} className="py-16 md:py-24 px-6 md:px-12 lg:px-16 bg-[#0F0F0F]">
      <div className="max-w-7xl mx-auto flex justify-end">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="text-white/50 text-sm md:text-base font-sans leading-relaxed max-w-xl text-right"
        >
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Aadiilin is a design practice focused on visual experiences. With every single one of our clients, we bring forth a deep passion for creative problem solving&nbsp;—&nbsp;which is what we deliver in the form of custom and memorable experiences.
        </motion.p>
      </div>
    </section>
  )
}

function FeaturedWork() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section ref={ref} className="py-16 md:py-24 px-6 md:px-12 lg:px-16 bg-[#0F0F0F]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 md:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl italic text-white/80 block"
          >
            featured
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white block mt-[-0.3em]"
          >
            work
          </motion.span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {featured.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: [0.76, 0, 0.24, 1] }}
            >
              <Link href={`/project/${project.slug}`} className="group block">
                <div className="relative overflow-hidden rounded-lg mb-4 aspect-[4/3] bg-[#1A1A1A]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg md:text-xl font-bold text-white group-hover:text-white/70 transition-colors">
                    {project.title}
                  </h3>
                  <span className="font-sans text-xs text-white/40 tracking-widest">
                    {i + 1}
                    <span className="text-white/20">/{featured.length}</span>
                  </span>
                </div>
                <p className="font-sans text-sm text-white/40 mt-1">{project.category}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function AboutCTA() {
  return (
    <section className="relative py-24 md:py-32 bg-[#0F0F0F] overflow-hidden">
      <Link href="/about" className="block">
        <div className="flex whitespace-nowrap animate-scroll-marquee" style={{ width: 'fit-content' }}>
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="flex items-center gap-8 md:gap-12 mx-4 md:mx-6">
              <span className="font-display text-6xl md:text-8xl font-bold text-white/10 hover:text-white/25 transition-colors duration-500">
                about
              </span>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-white/20">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          ))}
        </div>
      </Link>
    </section>
  )
}

export function Home() {
  return (
    <main className="bg-[#0F0F0F] min-h-screen">
      <SEO
        title="Freelance Graphic Designer — Aadiilin"
        description="Portfolio of Aadiilin (Adil Kattathadukka), a freelance graphic designer from Kerala specializing in poster design, brand identity, campaign visuals, and art direction."
        path="/"
        jsonLd={[collectionPageSchema(), itemListSchema(), contactPageSchema()]}
      />
      <HeroSection />
      <TextRevealSection />
      <DescriptionSection />
      <FeaturedWork />
      <AboutCTA />
    </main>
  )
}
