import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SEO } from '@/components/seo'
import { personSchema } from '@/lib/schemas'

const awards = [
  { title: 'Aadiilin', detail: 'CSS Design Awards Website Of The Day (nominee)', year: '2024' },
  { title: 'Aadiilin', detail: 'Awwwards Developer Award (nominee)', year: '2024' },
  { title: 'Aadiilin', detail: 'Awwwards Site Of The Day (nominee)', year: '2024' },
  { title: 'Aadiilin', detail: 'CSS Design Awards Special Kudos (nominee)', year: '2023' },
  { title: 'Aadiilin', detail: 'Awwwards Honorable Mention (nominee)', year: '2023' },
  { title: 'Aadiilin', detail: 'CSS Design Awards Designer Of The Year (nominee)', year: '2021' },
  { title: 'Aadiilin', detail: 'Awwwards Independent Of The Year (nominee)', year: '2021' },
  { title: 'Aadiilin', detail: 'Awwwards Site Of The Day (nominee)', year: '2021' },
  { title: 'Aadiilin', detail: 'Awwwards Developer Award (nominee)', year: '2021' },
  { title: 'Aadiilin', detail: 'Awwwards Mobile Excellence (nominee)', year: '2021' },
]

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-15%' })
  const awardsRef = useRef(null)
  const awardsInView = useInView(awardsRef, { once: true, margin: '-10%' })
  const bottomRef = useRef(null)
  const bottomInView = useInView(bottomRef, { once: true, margin: '-10%' })

  return (
    <main className="bg-[#0F0F0F] min-h-screen pt-32 pb-24">
      <SEO
        title="About — Aadiilin"
        description="About Aadiilin (Adil Kattathadukka) — freelance graphic designer from Kerala, India specializing in brand identity, poster design, and visual campaigns."
        path="/about"
        jsonLd={[personSchema()]}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div ref={ref} className="mb-24 md:mb-40">
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="font-serif italic text-4xl md:text-6xl lg:text-7xl text-white/80 leading-tight max-w-5xl"
          >
            I love water and looking<br />like a complete tool in photos.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
            className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20"
          >
            <div>
              <p className="font-serif italic text-white/40 text-lg md:text-xl mb-4">
                driven by
              </p>
              <p className="text-5xl md:text-7xl lg:text-8xl leading-tight">
                <span className="font-display font-bold text-white">grit</span>
                <span className="font-serif italic text-white/40 mx-3">&amp;</span>
                <span className="font-display font-bold text-white">dedicated</span>
                <span className="font-serif italic text-white/40 mx-1">to</span>
                <span className="font-display font-bold text-white">quality</span>
              </p>
            </div>

            <div className="space-y-6">
              <p className="font-sans text-sm md:text-base text-white/60 leading-relaxed">
                Aadiilin (Adil Kattathadukka) is an independent graphic designer based in Kasaragod, Kerala.
                He works with clients from all corners of the world and across multiple industries.
              </p>
              <p className="font-sans text-sm md:text-base text-white/60 leading-relaxed">
                Plain and simple; we do good ol&rsquo; fashioned branding and design. Our goal is to make it as
                easy as possible for you to walk away with the solution that suits your needs perfectly.
                Straightforward, honest, and genuine.
              </p>
            </div>
          </motion.div>
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
                transition={{ duration: 0.5, delay: 0.05 * i, ease: [0.76, 0, 0.24, 1] }}
                className="flex items-center justify-between py-4 border-t border-white/5 group cursor-pointer hover:border-white/20 transition-colors"
              >
                <div className="flex items-center gap-x-3 gap-y-1 flex-wrap">
                  <span className="font-display text-base md:text-lg font-bold text-white/80 group-hover:text-white transition-colors">
                    {award.title}
                  </span>
                  <span className="font-sans text-xs text-white/40">{award.detail}</span>
                </div>
                <span className="font-sans text-xs text-white/30 shrink-0">{award.year}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          ref={bottomRef}
          initial={{ opacity: 0, y: 30 }}
          animate={bottomInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="border-t border-white/5 pt-12"
        >
          <p className="font-sans text-xs text-white/30 max-w-xl leading-relaxed">
            Some of the work listed here has also been featured in renowned sources such as various design
            publications and platforms. Available for freelance projects &mdash; let&rsquo;s create something together.
          </p>
        </motion.div>
      </div>
    </main>
  )
}
