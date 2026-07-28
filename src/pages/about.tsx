import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SEO } from '@/components/seo'
import { personSchema } from '@/lib/schemas'
import { LiveClock } from '@/components/live-clock'
import { soundManager } from '@/lib/sound'

const awards = [
  { title: 'Aadiilin', detail: 'Awwwards Site Of The Day', year: '2025' },
  { title: 'Aadiilin', detail: 'FWA Of The Month', year: '2025' },
  { title: 'Aadiilin', detail: 'CSS Design Awards Website Of The Year', year: '2024' },
  { title: 'Aadiilin', detail: 'Awwwards Developer Award', year: '2024' },
  { title: 'Aadiilin', detail: 'CSS Design Awards Best UI/UX', year: '2024' },
  { title: 'Aadiilin', detail: 'Awwwards Independent Of The Year (Nominee)', year: '2023' },
  { title: 'Aadiilin', detail: 'CSS Design Awards Special Kudos', year: '2023' },
  { title: 'Aadiilin', detail: 'Awwwards Mobile Excellence', year: '2023' },
]

const services = [
  { name: 'Poster Design & Visuals', desc: 'Custom event posters, campaign visuals, and striking typographic compositions.' },
  { name: 'Brand Identity', desc: 'Art direction, logo systems, brand guidelines, and strategic visual storytelling.' },
  { name: 'Web Design & WebGL', desc: 'Interactive digital platforms, 3D viewports, particle systems, and responsive web experiences.' },
  { name: 'Editorial & Packaging', desc: 'Bespoke publication design, rank showcases, magazine layouts, and packaging.' },
]

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-15%' })

  return (
    <main className="bg-[#0A0A0A] min-h-screen pt-36 pb-28 px-6 md:px-12 lg:px-16 text-white">
      <SEO
        title="About — Aadiilin"
        description="Aadiilin (Adil Sarvadka) is a freelance graphic designer based in Kasaragod, Kerala. Driven by grit & dedicated to quality."
        path="/about"
        jsonLd={[personSchema()]}
      />

      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="mb-24 md:mb-36">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between border-b border-white/10 pb-6 mb-12"
          >
            <LiveClock label="KASARAGOD STUDIO" timezone="Asia/Kolkata" />
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              AVAILABLE FOR NEW PROJECTS Q3/Q4
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
                Aadiilin (Adil Sarvadka) is a freelance graphic designer focused on high-end digital experiences, poster design, and brand identity. Based in Kasaragod, Kerala, India, partnering with clients worldwide.
              </p>
              <p className="font-sans text-base md:text-lg text-white/70 leading-relaxed">
                Plain and simple; we do good ol&rsquo; fashioned branding, poster visuals, and websites. Our goal is to make it as easy as possible for you to walk away with the solution that suits your needs perfectly. Straightforward, honest, and genuine.
              </p>
            </div>

          </motion.div>
        </div>

        {/* Services & Capabilities */}
        <section className="mb-24 md:mb-36 border-t border-white/10 pt-16">
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

        {/* Awards */}
        <section className="border-t border-white/10 pt-16">
          <h2 className="font-serif text-3xl md:text-5xl italic text-white/80 mb-12">
            awards &amp; recognition
          </h2>

          <div className="space-y-3">
            {awards.map((award, i) => (
              <div
                key={i}
                onMouseEnter={() => soundManager.playHover()}
                className="flex items-center justify-between py-4 border-b border-white/5 group hover:border-white/20 transition-colors cursor-pointer"
                data-cursor="pointer"
              >
                <div className="flex items-center gap-x-4 flex-wrap">
                  <span className="font-display text-base md:text-lg font-bold text-white group-hover:text-white/80 uppercase">
                    {award.title}
                  </span>
                  <span className="font-mono text-xs text-white/40">{award.detail}</span>
                </div>
                <span className="font-mono text-xs text-white/40 shrink-0">{award.year}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
