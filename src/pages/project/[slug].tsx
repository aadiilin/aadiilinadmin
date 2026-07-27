import { useRoute, Link } from 'wouter'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { SEO } from '@/components/seo'
import { findProjectBySlug, SITE_URL, CREATOR_NAME, PROJECTS } from '@/lib/seo-data'
import { soundManager } from '@/lib/sound'

export function ProjectPage() {
  const [, params] = useRoute('/project/:slug')
  const currentSlug = params?.slug ?? ''
  const project = findProjectBySlug(currentSlug)

  if (!project) {
    return (
      <main className="bg-[#0A0A0A] min-h-screen flex items-center justify-center text-white">
        <SEO title="Project Not Found" path="/project/unknown" noIndex noFollow />
        <div className="text-center space-y-4">
          <h1 className="font-serif text-4xl italic text-white/60">Project not found</h1>
          <Link
            href="/work"
            onClick={() => soundManager.playClick()}
            onMouseEnter={() => soundManager.playHover()}
            className="font-mono text-xs uppercase tracking-widest text-white/40 hover:text-white border-b border-white/20 pb-1"
          >
            &larr; Back to all projects
          </Link>
        </div>
      </main>
    )
  }

  const currentIndex = PROJECTS.findIndex((p) => p.slug === currentSlug)
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length]

  const projectUrl = `${SITE_URL}/project/${project.slug}`
  const projectImage = `${SITE_URL}${project.image}`

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    url: projectUrl,
    image: projectImage,
    creator: { '@type': 'Organization', name: CREATOR_NAME, url: SITE_URL },
    dateCreated: project.year,
    keywords: [project.role, CREATOR_NAME, ...(project.tags || [])].join(', '),
    genre: project.category || project.role,
  }

  return (
    <>
      <SEO
        title={`${project.title} — Jomor Design`}
        description={project.description}
        path={`/project/${project.slug}`}
        image={project.image}
        type="article"
        keywords={[project.role, CREATOR_NAME, ...(project.tags || [])]}
        jsonLd={[schema]}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Work', path: '/work' },
          { name: project.title, path: `/project/${project.slug}` },
        ]}
      />

      <main className="bg-[#0A0A0A] min-h-screen text-white pt-32 pb-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="mb-12">
            <Link
              href="/work"
              onClick={() => soundManager.playClick()}
              onMouseEnter={() => soundManager.playHover()}
              className="font-mono text-xs uppercase tracking-widest text-white/50 hover:text-white inline-flex items-center gap-2"
              data-cursor="pointer"
            >
              <ArrowLeft size={14} /> Back to Work
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="mb-16"
          >
            <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-widest text-white/40 mb-6">
              <span>{project.role}</span>
              <span className="w-px h-3 bg-white/20" />
              <span>{project.year}</span>
              {project.category && (
                <>
                  <span className="w-px h-3 bg-white/20" />
                  <span>{project.category}</span>
                </>
              )}
            </div>

            <h1 className="font-display text-5xl md:text-8xl font-black text-white uppercase tracking-tight leading-none mb-8">
              {project.title}
            </h1>

            <p className="font-sans text-base md:text-xl text-white/70 max-w-3xl leading-relaxed">
              {project.description}
            </p>

            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-8">
                {project.tags.map((tag) => (
                  <span key={tag} className="font-mono text-xs text-white/40 border border-white/10 rounded-full px-3 py-1 bg-white/5">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
            className="rounded-2xl overflow-hidden bg-[#141414] border border-white/10 mb-20 shadow-2xl"
          >
            <img
              src={project.image}
              alt={`${project.title} — ${project.role}`}
              className="w-full h-auto object-cover max-h-[80vh]"
            />
          </motion.div>

          {/* Next Project Footer Section */}
          <div className="border-t border-white/10 pt-16 mt-20 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <p className="font-mono text-xs text-white/40 uppercase tracking-widest mb-1">NEXT PROJECT</p>
              <h3 className="font-display text-3xl md:text-5xl font-bold text-white uppercase">{nextProject.title}</h3>
            </div>
            <Link
              href={`/project/${nextProject.slug}`}
              onClick={() => soundManager.playClick()}
              onMouseEnter={() => soundManager.playHover()}
              className="px-8 py-4 rounded-full bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:scale-105 transition-all"
              data-cursor="pointer"
              data-cursor-text="NEXT"
            >
              VIEW NEXT WORK &rarr;
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
