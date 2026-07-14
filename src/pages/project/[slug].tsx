import { useRoute, Link } from 'wouter'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { SEO } from '@/components/seo'
import { findProjectBySlug, SITE_URL, CREATOR_NAME, CREATOR_ALTERNATE_NAME } from '@/lib/seo-data'

export function ProjectPage() {
  const [, params] = useRoute('/project/:slug')
  const project = findProjectBySlug(params?.slug ?? '')

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <SEO title="Project Not Found" path="/project/unknown" noIndex noFollow />
        <div className="text-center space-y-4">
          <h1 className="font-serif text-4xl">Project not found</h1>
          <Link href="/" className="text-primary underline text-sm">
            Back to home
          </Link>
        </div>
      </div>
    )
  }

  const isSoftware = ['SaaS', 'E-Commerce', 'Event Management'].includes(project.category || '')
  const projectUrl = `${SITE_URL}/project/${project.slug}`
  const projectImage = `${SITE_URL}${project.image}`

  const schema = {
    '@context': 'https://schema.org',
    '@type': isSoftware ? 'SoftwareApplication' : 'CreativeWork',
    name: project.title,
    description: project.description,
    url: projectUrl,
    image: projectImage,
    ...(isSoftware ? {
      applicationCategory: project.category,
      operatingSystem: 'Web',
    } : {}),
    creator: {
      '@type': 'Person',
      name: CREATOR_NAME,
      alternateName: CREATOR_ALTERNATE_NAME,
      url: SITE_URL,
    },
    dateCreated: project.year,
    keywords: [project.role, CREATOR_NAME, ...(project.tags || [])].join(', '),
    genre: project.category || project.role,
    about: project.description,
    isPartOf: {
      '@type': 'CreativeWork',
      name: `${CREATOR_NAME} Portfolio`,
      url: SITE_URL,
    },
  }

  const speakableSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${project.title} — ${CREATOR_NAME}`,
    url: projectUrl,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'p'],
    },
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

      <div className="min-h-screen bg-background text-foreground">
        <div className="fixed top-6 left-6 z-50">
          <Link
            href="/"
            className="glass px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform inline-flex items-center gap-2"
          >
            <ArrowLeft size={14} /> Back
          </Link>
        </div>

        <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-5xl space-y-8"
          >
            <div className="glass-card rounded-[2rem] overflow-hidden">
              <img
                src={project.image}
                alt={`${project.title} — ${project.role} by Aadiilin`}
                className="w-full h-auto object-contain bg-black/20"
              />
            </div>

            <div className="max-w-2xl mx-auto text-center space-y-6">
              <div className="flex items-center justify-center gap-4 text-xs uppercase tracking-widest font-bold">
                <span className="text-primary">{project.role}</span>
                <span className="w-1 h-1 bg-muted-foreground/30 rounded-full" />
                <span className="text-muted-foreground">{project.year}</span>
              </div>

              <h1 className="font-serif text-4xl md:text-6xl leading-tight">
                {project.title}
              </h1>

              <p className="text-muted-foreground text-lg leading-relaxed">
                {project.description}
              </p>

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glossy-button inline-flex items-center gap-3 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform"
                >
                  Visit Project <ExternalLink size={14} />
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
