import { useRoute, Link } from 'wouter'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { SEO } from '@/components/seo'
import { findProjectBySlug, SITE_URL, CREATOR_NAME } from '@/lib/seo-data'

export function ProjectPage() {
  const [, params] = useRoute('/project/:slug')
  const project = findProjectBySlug(params?.slug ?? '')

  if (!project) {
    return (
      <main className="bg-[#0F0F0F] min-h-screen flex items-center justify-center">
        <SEO title="Project Not Found" path="/project/unknown" noIndex noFollow />
        <div className="text-center space-y-4">
          <h1 className="font-serif text-4xl italic text-white/60">Project not found</h1>
          <Link href="/" className="font-sans text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors inline-block">
            &larr; Back to home
          </Link>
        </div>
      </main>
    )
  }

  const projectUrl = `${SITE_URL}/project/${project.slug}`
  const projectImage = `${SITE_URL}${project.image}`

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    url: projectUrl,
    image: projectImage,
    creator: { '@type': 'Person', name: CREATOR_NAME, url: SITE_URL },
    dateCreated: project.year,
    keywords: [project.role, CREATOR_NAME, ...(project.tags || [])].join(', '),
    genre: project.category || project.role,
  }

  const speakableSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${project.title} — ${CREATOR_NAME}`,
    url: projectUrl,
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'p'] },
  }

  return (
    <>
      <SEO
        title={project.title}
        description={project.description}
        path={`/project/${project.slug}`}
        image={project.image}
        type="article"
        keywords={[project.role, CREATOR_NAME, ...(project.tags || [])]}
        jsonLd={[schema, speakableSchema]}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: project.title, path: `/project/${project.slug}` },
        ]}
      />

      <main className="bg-[#0F0F0F] min-h-screen">
        <div className="fixed top-6 left-6 z-50">
          <Link
            href="/"
            className="font-sans text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft size={14} /> Back
          </Link>
        </div>

        <div className="pt-24 pb-24 px-6 md:px-12">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8"
            >
              <div className="flex items-center gap-4 text-xs uppercase tracking-widest text-white/30 font-sans mb-6">
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

              <h1 className="font-serif text-4xl md:text-7xl italic text-white leading-tight mb-6">
                {project.title}
              </h1>

              <p className="font-sans text-sm md:text-base text-white/50 max-w-2xl leading-relaxed">
                {project.description}
              </p>

              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {project.tags.map((tag) => (
                    <span key={tag} className="font-sans text-[10px] uppercase tracking-widest text-white/30 border border-white/10 rounded-full px-3 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-lg overflow-hidden bg-[#1A1A1A]"
            >
              <img
                src={project.image}
                alt={`${project.title} — ${project.role} by Aadiilin`}
                className="w-full h-auto object-contain"
              />
            </motion.div>

            {project.link && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-12 text-center"
              >
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors border border-white/20 rounded-full px-8 py-4 inline-block"
                >
                  Visit Project &rarr;
                </a>
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
