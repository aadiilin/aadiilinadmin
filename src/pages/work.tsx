import { useRef } from 'react'
import { Link } from 'wouter'
import { motion, useInView } from 'framer-motion'
import { SEO } from '@/components/seo'
import { PROJECTS } from '@/lib/seo-data'

function WorkItem({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.76, 0, 0.24, 1] }}
    >
      <Link href={`/project/${project.slug}`} className="group block">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center py-8 md:py-12 border-t border-white/5">
          <div className="md:col-span-7 overflow-hidden rounded-lg aspect-[4/3] bg-[#1A1A1A]">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-2">
              <span className="font-sans text-xs text-white/30 tracking-widest">
                {index + 1}<span className="text-white/20">/{PROJECTS.length}</span>
              </span>
              <span className="w-8 h-px bg-white/20" />
              <span className="font-sans text-xs text-white/40">{project.category}</span>
            </div>
            <h2 className="font-display text-2xl md:text-4xl font-bold text-white group-hover:text-white/60 transition-colors">
              {project.title}
            </h2>
            <p className="font-sans text-sm text-white/40 mt-3 line-clamp-2">{project.description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {project.tags?.slice(0, 3).map((tag) => (
                <span key={tag} className="font-sans text-[10px] tracking-widest text-white/30 border border-white/10 rounded-full px-3 py-1">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export function Work() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-20%' })

  return (
    <main className="bg-[#0F0F0F] min-h-screen pt-32 pb-24">
      <SEO
        title="Work — Aadiilin"
        description="Portfolio projects by Aadiilin (Adil Kattathadukka) — poster design, brand identity, campaign visuals, and more."
        path="/work"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div ref={ref} className="mb-16 md:mb-24">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="font-sans text-sm text-white/40 max-w-xl leading-relaxed"
          >
            Every project starts with a conversation. We ask questions, listen, and advise — together we create the best custom solutions. Here are a few results.
          </motion.p>
        </div>

        <div>
          {PROJECTS.map((project, i) => (
            <WorkItem key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </main>
  )
}
