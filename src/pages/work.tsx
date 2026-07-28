import { useState } from 'react'
import { motion } from 'framer-motion'
import { SEO } from '@/components/seo'
import { PROJECTS } from '@/lib/seo-data'
import { ProjectCard3D } from '@/components/project-card-3d'
import { soundManager } from '@/lib/sound'

const categories = ['All', 'Branding & WebGL', 'Interactive Platform', 'Luxury E-Commerce', 'Experimental Web']

export function Work() {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === selectedCategory || (p.tags && p.tags.some(t => t.toLowerCase().includes(selectedCategory.toLowerCase()))))

  return (
    <main className="bg-[#0A0A0A] min-h-screen pt-36 pb-28 px-6 md:px-12 lg:px-16 text-white">
      <SEO
        title="Work — Aadiilin"
        description="Selected poster designs, branding, event identities, and editorial projects by Aadiilin."
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

        {/* 3D Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 * i, ease: [0.76, 0, 0.24, 1] }}
            >
              <ProjectCard3D project={project} index={i} />
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}
