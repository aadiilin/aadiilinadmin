import { useState } from 'react'
import { Link } from 'wouter'
import { motion } from 'framer-motion'
import { SEO } from '@/components/seo'
import { PROJECTS } from '@/lib/seo-data'
import { soundManager } from '@/lib/sound'

const categories = ['All', 'Branding & WebGL', 'Interactive Platform', 'Luxury E-Commerce', 'Experimental Web', 'Event Identity']

export function Work() {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === selectedCategory || (p.tags && p.tags.some(t => t.toLowerCase().includes(selectedCategory.toLowerCase()))))

  return (
    <main className="bg-[#0A0A0A] min-h-screen pt-36 pb-28 px-6 md:px-12 lg:px-16 text-white">
      <SEO
        title="Work — Jomor Design"
        description="Selected digital experiences, branding, WebGL applications, and e-commerce projects by Jomor Design."
        path="/work"
      />

      <div className="max-w-7xl mx-auto">
        <header className="mb-16 md:mb-24">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="font-serif italic text-6xl md:text-8xl lg:text-9xl text-white/80"
          >
            selected
          </motion.h1>
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
            className="font-display font-black text-6xl md:text-8xl lg:text-9xl text-white block mt-[-0.2em] uppercase tracking-tight"
          >
            work
          </motion.span>
        </header>

        {/* Filter categories */}
        <div className="flex items-center gap-3 flex-wrap mb-16 border-b border-white/10 pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundManager.playClick()
                setSelectedCategory(cat)
              }}
              onMouseEnter={() => soundManager.playHover()}
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-white text-black font-bold scale-105'
                  : 'bg-white/5 text-white/60 hover:bg-white/15 hover:text-white border border-white/10'
              }`}
              data-cursor="pointer"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 * i, ease: [0.76, 0, 0.24, 1] }}
            >
              <Link
                href={`/project/${project.slug}`}
                className="group block"
                onMouseEnter={() => soundManager.playHover()}
                onClick={() => soundManager.playClick()}
                data-cursor="pointer"
                data-cursor-text="EXPLORE"
              >
                <div className="relative overflow-hidden rounded-xl mb-5 aspect-[16/10] bg-[#141414] border border-white/10 group-hover:border-white/30 transition-all duration-500">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity" />
                  <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-mono text-white/80 border border-white/10">
                    {project.year}
                  </div>
                </div>

                <div className="flex items-baseline justify-between border-b border-white/10 pb-3 group-hover:border-white/40 transition-colors">
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-white group-hover:text-white/80 transition-colors uppercase">
                    {project.title}
                  </h2>
                  <span className="font-mono text-xs text-white/40">{project.category}</span>
                </div>
                <p className="text-white/60 text-xs font-sans mt-3 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}
