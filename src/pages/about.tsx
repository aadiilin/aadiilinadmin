import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SEO } from '@/components/seo'
import { personSchema } from '@/lib/schemas'

const awards = [
  { title: 'CSS Design Awards', detail: 'Website Of The Day (nominee)', year: '2024' },
  { title: 'Awwwards', detail: 'Developer Award (nominee)', year: '2024' },
  { title: 'Awwwards', detail: 'Site Of The Day (nominee)', year: '2024' },
  { title: 'CSS Design Awards', detail: 'Special Kudos (nominee)', year: '2023' },
  { title: 'Awwwards', detail: 'Honorable Mention (nominee)', year: '2023' },
]

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-15%' })
  const awardsRef = useRef(null)
  const awardsInView = useInView(awardsRef, { once: true, margin: '-10%' })

  return (
    <main className="bg-[#0F0F0F] min-h-screen pt-32 pb-24">
      <SEO
        title="About — Aadiilin"
        description="About Aadiilin (Adil Kattathadukka) — freelance graphic designer from Kerala, India specializing in brand identity, poster design, and visual campaigns."
        path="/about"
        jsonLd={[personSchema()]}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 mb-24 md:mb-40">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="font-serif text-6xl md:text-8xl italic text-white/80"
            >
              aadiilin
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
              className="font-display text-5xl md:text-7xl font-bold text-white mt-[-0.2em]"
            >
              design
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
              className="font-serif italic text-white/20 text-lg md:text-xl mt-8"
            >
              driven by curiosity, dedicated to quality.
            </motion.p>
          </div>

          <div className="space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
              className="font-sans text-sm md:text-base text-white/60 leading-relaxed"
            >
              Aadiilin (Adil Kattathadukka) is an independent graphic designer based in Kasaragod, Kerala. 
              Working with clients from across India and beyond, delivering thoughtful brand identities, 
              campaign visuals, poster design, and art direction.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
              className="font-sans text-sm md:text-base text-white/60 leading-relaxed"
            >
              Plain and simple — we do good ol&rsquo; fashioned branding and design. Our goal is to make it as easy 
              as possible for you to walk away with the solution that suits your needs perfectly. 
              Straightforward, honest, and genuine.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
              className="font-sans text-sm md:text-base text-white/60 leading-relaxed"
            >
              Specializing in poster design, brand identity, editorial layout, typography, motion graphics, 
              and visual storytelling.
            </motion.p>
          </div>
        </div>

        <div ref={awardsRef} className="mb-24">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            animate={awardsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="font-serif text-3xl md:text-5xl italic text-white/80 mb-12"
          >
            awards &amp; recognition
          </motion.h3>

          <div className="space-y-4">
            {awards.map((award, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={awardsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * i, ease: [0.76, 0, 0.24, 1] }}
                className="flex items-center justify-between py-4 border-t border-white/5 group cursor-pointer"
              >
                <div>
                  <span className="font-display text-base md:text-lg font-bold text-white/80 group-hover:text-white transition-colors">
                    {award.title}
                  </span>
                  <span className="font-sans text-xs text-white/40 ml-3">{award.detail}</span>
                </div>
                <span className="font-sans text-xs text-white/30">{award.year}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={awardsInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="border-t border-white/5 pt-12"
        >
          <p className="font-sans text-xs text-white/30 max-w-xl leading-relaxed">
            Some of the work has also been featured in renowned sources such as various design publications 
            and platforms. Available for freelance projects — let&rsquo;s create something together.
          </p>
        </motion.div>
      </div>
    </main>
  )
}
