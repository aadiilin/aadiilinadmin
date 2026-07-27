import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SEO } from '@/components/seo'
import { contactPageSchema } from '@/lib/schemas'

export function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-15%' })

  return (
    <main className="bg-[#0F0F0F] min-h-screen pt-32 pb-24">
      <SEO
        title="Contact — Aadiilin"
        description="Get in touch with Aadiilin (Adil Kattathadukka) for freelance graphic design projects — brand identity, poster design, campaign visuals, and more."
        path="/contact"
        jsonLd={[contactPageSchema()]}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="font-serif text-6xl md:text-8xl italic text-white/80"
            >
              let&rsquo;s
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
              className="font-display text-5xl md:text-7xl font-bold text-white mt-[-0.2em]"
            >
              create
            </motion.h2>
            <motion.h3
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
              className="font-serif italic text-3xl md:text-5xl text-white/40 mt-4"
            >
              together
            </motion.h3>
          </div>

          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
            >
              <p className="font-sans text-xs text-white/30 uppercase tracking-widest mb-3">Email</p>
              <a
                href="mailto:adilsarvadka@gmail.com"
                className="font-display text-xl md:text-2xl font-bold text-white hover:text-white/60 transition-colors"
              >
                adilsarvadka@gmail.com
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
            >
              <p className="font-sans text-xs text-white/30 uppercase tracking-widest mb-3">Phone</p>
              <a
                href="tel:+918137802554"
                className="font-display text-xl md:text-2xl font-bold text-white hover:text-white/60 transition-colors"
              >
                +91 81378 02554
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
            >
              <p className="font-sans text-xs text-white/30 uppercase tracking-widest mb-3">Location</p>
              <p className="font-sans text-base text-white/60">Kasaragod, Kerala, India</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.76, 0, 0.24, 1] }}
            >
              <p className="font-sans text-xs text-white/30 uppercase tracking-widest mb-3">Social</p>
              <div className="flex gap-6">
                <a href="https://www.instagram.com/aadiil.in" target="_blank" rel="noopener noreferrer" className="font-sans text-sm text-white/60 hover:text-white transition-colors">
                  Instagram
                </a>
                <a href="https://www.linkedin.com/in/adil-sarvadka-51282a406" target="_blank" rel="noopener noreferrer" className="font-sans text-sm text-white/60 hover:text-white transition-colors">
                  LinkedIn
                </a>
                <a href="https://github.com/aadiilin" target="_blank" rel="noopener noreferrer" className="font-sans text-sm text-white/60 hover:text-white transition-colors">
                  GitHub
                </a>
                <a href="https://wa.me/918137802554" target="_blank" rel="noopener noreferrer" className="font-sans text-sm text-white/60 hover:text-white transition-colors">
                  WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  )
}
