import { Link } from "wouter";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Mail, Instagram, Linkedin, Github, Menu, X, Maximize2, Code2, BookOpen, GraduationCap, Globe } from "lucide-react";
import { FaWhatsapp, FaPinterest } from "react-icons/fa";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ShadowOverlay } from "@/components/ui/shadow-overlay";
import { OpeningLoader } from "@/components/ui/opening-loader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SEO } from "@/components/seo";
import {
  PROJECTS, SITE_URL, SITE_DESCRIPTION, SOCIAL_LINKS,
  DESIGN_SKILLS, DEV_SKILLS, TECH_INTERESTS,
  CREATOR_NAME, CREATOR_ALTERNATE_NAME, CREATOR_EMAIL, CREATOR_PHONE,
  CREATOR_LOCATION, CREATOR_IMAGE, CREATOR_JOB_TITLE, SITE_NAME, DEFAULT_OG_IMAGE,
  EDUCATION, LANGUAGES_SPOKEN, ABOUT_PARAGRAPHS,
} from "@/lib/seo-data";

export function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: 'en-IN',
    publisher: {
      '@type': 'Person',
      name: CREATOR_NAME,
      alternateName: CREATOR_ALTERNATE_NAME,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: CREATOR_NAME,
    alternateName: CREATOR_ALTERNATE_NAME,
    givenName: 'Adil',
    familyName: 'Sarvadka',
    jobTitle: CREATOR_JOB_TITLE,
    url: SITE_URL,
    image: `${SITE_URL}${CREATOR_IMAGE}`,
    email: CREATOR_EMAIL,
    telephone: CREATOR_PHONE,
    sameAs: Object.values(SOCIAL_LINKS).filter(Boolean),
    description: SITE_DESCRIPTION,
    knowsAbout: [...DESIGN_SKILLS, ...DEV_SKILLS, ...TECH_INTERESTS],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kasaragod',
      addressRegion: 'Kerala',
      addressCountry: 'IN',
    },
    birthPlace: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Kasaragod',
        addressRegion: 'Kerala',
        addressCountry: 'IN',
      },
    },
    nationality: {
      '@type': 'Country',
      name: 'IN',
    },
    hasOccupation: [
      {
        '@type': 'Occupation',
        name: 'Full-Stack Web Developer',
        description: 'Building modern web applications, SaaS platforms, and AI-powered solutions using Next.js, React, TypeScript, Node.js, and cloud technologies.',
        skills: 'Next.js, React, TypeScript, JavaScript, Node.js, Firebase, Supabase, PostgreSQL, SaaS Architecture',
        occupationLocation: {
          '@type': 'City',
          name: 'Kasaragod',
        },
      },
      {
        '@type': 'Occupation',
        name: 'Graphic Designer',
        description: 'Creating brand identities, poster designs, campaign visuals, and editorial layouts with a focus on bold typography and visual storytelling.',
        skills: 'Art Direction, Brand Identity, Typography, Editorial Layout, Motion Graphics',
        occupationLocation: {
          '@type': 'City',
          name: 'Kasaragod',
        },
      },
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Who is Aadiilin?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Aadiilin (Adil Sarvadka) is a B.Tech CSE student, full-stack web developer, graphic designer, and AI enthusiast from Kasaragod, Kerala. He builds SaaS platforms, does graphic design, and is the creator of FestBoard and Savelio.',
        },
      },
      {
        '@type': 'Question',
        name: 'What services does Aadiilin offer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Aadiilin offers full-stack web development (Next.js, React, TypeScript, Node.js, Firebase, Supabase), graphic design (poster design, brand identity, campaign visuals, editorial layout, typography), and SaaS platform development. Services include custom website development, web applications, brand identity design, poster and campaign design, and SaaS product building.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is FestBoard?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'FestBoard is a multi-tenant SaaS platform for schools, colleges, madrasas, and organizations to manage competitions and events. Features include live scoreboard, result management, candidate portal, analytics, subscription system, and shareable results with certificate generation.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is Savelio?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Savelio is an affiliate-based product price comparison platform that helps users compare prices across Indian e-commerce websites including Amazon, Flipkart, Meesho, JioMart, and Reliance Digital. Features include best deals, price history, and cashback information.',
        },
      },
      {
        '@type': 'Question',
        name: 'What technologies does Aadiilin use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Aadiilin uses Next.js, React, TypeScript, JavaScript, Tailwind CSS, Node.js, Firebase, Supabase, PostgreSQL, and Vercel for web development. For design, Adobe Photoshop, Illustrator, InDesign, and After Effects.',
        },
      },
      {
        '@type': 'Question',
        name: 'How can I hire Aadiilin?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Contact via email at adilsarvadka@gmail.com, WhatsApp at +91 81378 02554, or through the contact form on this portfolio. Aadiilin is currently accepting select development and design projects.',
        },
      },
      {
        '@type': 'Question',
        name: 'Where is Aadiilin based?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Aadiilin is based in Kasaragod, Kerala, India and works with clients worldwide, including remote collaborations.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does Aadiilin work with international clients?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Aadiilin works with clients worldwide. The portfolio is available online at aadiilin.vercel.app and remote collaborations are welcome.',
        },
      },
    ],
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Web Development & Graphic Design Services by Aadiilin',
    description: 'Professional web development and graphic design services including full-stack web development, SaaS platform development, poster design, brand identity, campaign visuals, and editorial layout.',
    provider: {
      '@type': 'Person',
      name: CREATOR_NAME,
      alternateName: CREATOR_ALTERNATE_NAME,
      url: SITE_URL,
    },
    areaServed: [
      { '@type': 'City', name: 'Kasaragod' },
      { '@type': 'City', name: 'Calicut' },
      { '@type': 'State', name: 'Kerala' },
      { '@type': 'Country', name: 'IN' },
    ],
    hasOfferCatalog: [
      {
        '@type': 'OfferCatalog',
        name: 'Web Development Services',
        itemListElement: DEV_SKILLS.map((skill, i) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: skill },
          position: i + 1,
        })),
      },
      {
        '@type': 'OfferCatalog',
        name: 'Design Services',
        itemListElement: DESIGN_SKILLS.map((skill, i) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: skill },
          position: i + 1,
        })),
      },
    ],
  }

  const speakableSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: SITE_NAME,
    url: SITE_URL,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'h2', '.faq-question', '#about p'],
    },
  }

  const imageObjectSchema = {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    url: `${SITE_URL}/opengraph.jpg`,
    width: 1200,
    height: 630,
    caption: `${CREATOR_NAME} — ${CREATOR_JOB_TITLE} Portfolio`,
    representativeOfPage: true,
  }

  const creativeWorkSchemas = PROJECTS.map((project) => {
    const isSoftware = ['SaaS', 'E-Commerce', 'Event Management'].includes(project.category || '')
    return {
      '@context': 'https://schema.org',
      '@type': isSoftware ? 'SoftwareApplication' : 'CreativeWork',
      name: project.title,
      description: project.description,
      url: `${SITE_URL}/project/${project.slug}`,
      image: `${SITE_URL}${project.image}`,
      ...(isSoftware ? {
        applicationCategory: project.category,
        operatingSystem: 'Web',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      } : {}),
      creator: {
        '@type': 'Person',
        name: CREATOR_NAME,
        url: SITE_URL,
      },
      dateCreated: project.year,
      keywords: [project.role, CREATOR_NAME, ...(project.tags || [])].join(', '),
      genre: project.category || project.role,
      about: project.description,
    }
  })

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': `${SITE_URL}#business`,
    name: CREATOR_NAME,
    alternateName: CREATOR_ALTERNATE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    image: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
    logo: `${SITE_URL}/favicon.png`,
    email: CREATOR_EMAIL,
    telephone: CREATOR_PHONE,
    priceRange: '$$',
    areaServed: [
      { '@type': 'City', name: 'Kasaradod' },
      { '@type': 'City', name: 'Calicut' },
      { '@type': 'State', name: 'Kerala' },
      { '@type': 'Country', name: 'IN' },
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Calicut',
      addressRegion: 'Kerala',
      postalCode: '673583',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 12.4983,
      longitude: 74.9899,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '18:00',
    },
    sameAs: Object.values(SOCIAL_LINKS).filter(Boolean),
    foundingDate: '2024',
    founder: {
      '@type': 'Person',
      name: 'Mohammed Adil Sarvadka',
      alternateName: CREATOR_ALTERNATE_NAME,
      url: SITE_URL,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services',
      itemListElement: [...DESIGN_SKILLS, ...DEV_SKILLS].map((skill, i) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: skill },
        position: i + 1,
      })),
    },
  }

  const contactPointSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPoint',
    name: `${CREATOR_NAME} Contact`,
    url: SITE_URL,
    email: CREATOR_EMAIL,
    telephone: CREATOR_PHONE,
    contactType: 'customer service',
    availableLanguage: ['English', 'Malayalam', 'Hindi'],
    areaServed: 'IN',
  }

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${CREATOR_NAME} — Portfolio Projects`,
    description: 'A curated collection of web development, SaaS products, and graphic design projects by Aadiilin.',
    url: SITE_URL,
    numberOfItems: PROJECTS.length,
    itemListElement: PROJECTS.map((project, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/project/${project.slug}`,
      name: project.title,
      image: `${SITE_URL}${project.image}`,
      description: project.description,
    })),
  }

  const collectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    mainEntity: {
      '@type': 'ItemList',
      url: SITE_URL,
      numberOfItems: PROJECTS.length,
    },
    about: {
      '@type': 'Person',
      name: CREATOR_NAME,
    },
  }

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Work with Aadiilin',
    description: 'The process of collaborating with Aadiilin on a web development or graphic design project.',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Reach Out',
        text: 'Contact Aadiilin via email or WhatsApp with your project brief, requirements, and goals.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Proposal & Agreement',
        text: 'Receive a custom proposal with scope, timeline, and pricing. Confirm to begin.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Development & Design',
        text: 'Aadiilin builds your project with regular updates and iterations based on feedback.',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Delivery & Launch',
        text: 'Final deliverables are provided. For web projects, deployment and handover are completed.',
      },
    ],
  }

  const educationSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollegeOrUniversity',
    name: EDUCATION.institution,
    description: `${CREATOR_NAME} is pursuing ${EDUCATION.degree} in ${EDUCATION.field} at ${EDUCATION.institution}, ${EDUCATION.location}.`,
    url: SITE_URL,
    alumni: {
      '@type': 'Person',
      name: CREATOR_NAME,
      alternateName: CREATOR_ALTERNATE_NAME,
    },
  }

  const allSchemas = [
    websiteSchema,
    personSchema,
    localBusinessSchema,
    contactPointSchema,
    educationSchema,
    faqSchema,
    serviceSchema,
    howToSchema,
    speakableSchema,
    imageObjectSchema,
    collectionPageSchema,
    itemListSchema,
    ...creativeWorkSchemas,
  ]

  return (
    <>
      <SEO
        description={SITE_DESCRIPTION}
        keywords={['Adil Sarvadka', 'Aadiilin', 'full stack developer Kerala', 'web developer India', 'SaaS developer', 'graphic designer Kerala', 'Next.js developer', 'React developer', 'AI enthusiast', 'cyber security student', 'FestBoard', 'Savelio', 'freelance developer Kerala', 'portfolio Kerala']}
        jsonLd={allSchemas}
        breadcrumbs={[
          { name: 'Home', path: '/' },
        ]}
      />

      <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-primary-foreground">
      {/* Lightbox */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-background/95 backdrop-blur-xl cursor-zoom-out"
            />
            
            <motion.div
              layoutId={selectedProject.slug}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl aspect-[4/3] md:aspect-video glass-card rounded-[2rem] overflow-hidden shadow-2xl z-10"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-20 glass p-3 rounded-full hover:scale-110 transition-transform group"
              >
                <X size={20} className="text-primary group-hover:rotate-90 transition-transform" />
              </button>
              
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title} 
                className="w-full h-full object-contain bg-black/20"
              />
              
              <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 bg-gradient-to-t from-black/80 to-transparent">
                <h2 className="font-title font-extrabold text-3xl md:text-5xl text-white mb-2">{selectedProject.title}</h2>
                <div className="flex items-center gap-4">
                  <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs">{selectedProject.role}</span>
                  <span className="w-1 h-1 bg-white/30 rounded-full" />
                  <span className="text-white/50 font-title text-sm">{selectedProject.year}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background orbs removed for performance */}
      <ShadowOverlay 
        color="rgba(255, 190, 0, 0.06)" 
        animation={{ scale: 40, speed: 12 }} 
        noise={{ opacity: 0.04, scale: 0.5 }}
        className="fixed inset-0 z-0 pointer-events-none"
      />

      {/* Navigation */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl z-50" aria-label="Main navigation">
        <div className="glass px-5 py-2 rounded-full flex justify-between items-center">
          <Link href="/" className="font-title font-extrabold text-base md:text-lg tracking-tight text-foreground hover:text-primary transition-colors" aria-label="Home">Adil.S</Link>
          
          <div className="flex items-center gap-4">
            {/* Social Icons */}
            <div className="hidden sm:flex items-center gap-4 mr-2 border-r border-white/10 pr-4">
              <a href="https://www.instagram.com/aadiil.in?utm_source=qr&igsh=bHIzNTl0bXFkeG85" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram"><Instagram size={14} /></a>
              <a href="https://wa.me/918137802554" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="WhatsApp"><FaWhatsapp size={14} /></a>
              <a href="https://www.linkedin.com/in/adil-sarvadka-51282a406?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn"><Linkedin size={14} /></a>
            </div>

            {/* Dropdown Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-white/5 transition-colors outline-none group">
                  <Menu size={16} className="text-primary group-hover:rotate-90 transition-transform duration-300" />
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Menu</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="glass border-white/10 mt-2 min-w-[140px] rounded-2xl overflow-hidden p-1 shadow-2xl">
                <motion.div
                  initial="closed"
                  animate="open"
                  variants={{
                    open: {
                      transition: { staggerChildren: 0.05, delayChildren: 0.05 }
                    },
                    closed: {
                      transition: { staggerChildren: 0.05, staggerDirection: -1 }
                    }
                  }}
                >
                  {[
                    { label: "Work", href: "#work" },
                    { label: "About", href: "#about" },
                    { label: "FAQ", href: "#faq" },
                    { label: "Contact", href: "#contact" },
                  ].map((item) => (
                    <DropdownMenuItem key={item.label} asChild>
                      <motion.a
                        href={item.href}
                        variants={{
                          open: { opacity: 1, x: 0 },
                          closed: { opacity: 0, x: 10 }
                        }}
                        className="text-[10px] font-bold tracking-[0.2em] uppercase cursor-pointer py-3 px-4 hover:bg-white/5 focus:bg-white/5 transition-colors block"
                      >
                        {item.label}
                      </motion.a>
                    </DropdownMenuItem>
                  ))}
                  
                  <motion.div 
                    variants={{
                      open: { opacity: 1, y: 0 },
                      closed: { opacity: 0, y: 10 }
                    }}
                    className="sm:hidden border-t border-white/5 mt-1 pt-1 flex justify-around py-3"
                  >
                    <a href="https://www.instagram.com/aadiil.in?utm_source=qr&igsh=bHIzNTl0bXFkeG85" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram"><Instagram size={14} /></a>
                    <a href="https://wa.me/918137802554" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="WhatsApp"><FaWhatsapp size={14} /></a>
                    <a href="https://www.linkedin.com/in/adil-sarvadka-51282a406?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn"><Linkedin size={14} /></a>
                  </motion.div>
                </motion.div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden z-10">
        <div className="relative z-10 text-center max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <h1 className="font-serif font-bold text-7xl md:text-9xl lg:text-[14rem] leading-[0.95] tracking-tight mb-2 text-foreground drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
              aadiilin
            </h1>
            <div className="h-1 w-24 bg-primary mx-auto rounded-full shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-base md:text-xl tracking-[0.4em] uppercase text-muted-foreground mb-6"
          >
            Full-Stack Developer & Graphic Designer
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs md:text-sm tracking-[0.3em] uppercase text-primary/60 mb-12 font-bold"
          >
            B.Tech CSE — Cyber Security | SaaS Creator | AI Enthusiast
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <a 
              href="#work" 
              className="glossy-button px-10 py-5 rounded-full inline-flex items-center gap-3 text-sm font-bold tracking-widest uppercase text-foreground hover:scale-105 transition-transform"
            >
              Explore Portfolio <ArrowRight size={18} className="text-primary" />
            </a>
          </motion.div>
        </div>
        
        {/* Floating decorative elements */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-12 h-12 glass rounded-xl rotate-12 opacity-40 hidden md:block"
        />
        <motion.div
          animate={{ y: [0, 30, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-20 h-20 glass rounded-full opacity-30 hidden md:block"
        />
      </section>

      {/* Work Showcase */}
      <section id="work" className="py-24 md:py-32 px-6 md:px-12 lg:px-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-24 flex items-baseline justify-between border-b border-white/10 pb-6"
        >
          <h2 className="font-serif text-3xl md:text-5xl">Selected Works</h2>
          <span className="text-sm uppercase tracking-widest text-muted-foreground">({PROJECTS.length})</span>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-12 gap-4 md:gap-10">
          {PROJECTS.map((project, i) => {
            // Define different grid spans for a "realistic bento flow" on both mobile (2 cols) and desktop (12 cols)
            const spans = [
              "col-span-2 md:col-span-7", // 1. Large
              "col-span-1 md:col-span-5", // 2. Small
              "col-span-1 md:col-span-5", // 3. Small
              "col-span-2 md:col-span-7", // 4. Large
              "col-span-1 md:col-span-6", // 5. Medium
              "col-span-1 md:col-span-6", // 6. Medium
              "col-span-2 md:col-span-7", // 7. Large
              "col-span-1 md:col-span-5", // 8. Small
              "col-span-1 md:col-span-6", // 9. Medium
              "col-span-1 md:col-span-6", // 10. Medium
              "col-span-1 md:col-span-6", // 11. Medium
              "col-span-1 md:col-span-6", // 12. Medium
              "col-span-2 md:col-span-7", // 13. Large
            ];
            const aspectRatios = [
              "aspect-[16/10] md:aspect-[16/10]",
              "aspect-square md:aspect-[4/5]",
              "aspect-square md:aspect-square",
              "aspect-video md:aspect-[16/9]",
              "aspect-square md:aspect-video",
              "aspect-square md:aspect-video",
              "aspect-video md:aspect-[16/10]",
              "aspect-square md:aspect-[4/5]",
              "aspect-square md:aspect-video",
              "aspect-square md:aspect-video",
              "aspect-video md:aspect-[16/10]",
              "aspect-square md:aspect-[4/5]",
              "aspect-video md:aspect-[16/9]",
            ];
            
            return (
              <motion.div 
                key={project.slug}
                layoutId={project.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className={`group flex flex-col ${spans[i] || "col-span-1 md:col-span-6"}`}
              >
                <button 
                  onClick={() => setSelectedProject(project)}
                  className={`block glass-card overflow-hidden relative ${aspectRatios[i] || "aspect-video"} mb-3 md:mb-6 cursor-zoom-in rounded-2xl md:rounded-[2rem] group text-left w-full outline-none focus-visible:ring-2 focus-visible:ring-primary`}
                  aria-label={`Enlarge ${project.title}`}
                >
                  <div className="absolute inset-0 bg-primary/5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="glass px-4 py-2 md:px-6 md:py-3 rounded-full flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 font-bold tracking-[0.2em] uppercase text-[8px] md:text-[10px]">
                      Enlarge <Maximize2 size={12} className="text-primary" />
                    </span>
                  </div>
                  <img 
                    src={project.image} 
                    alt={`${project.title} — ${project.role} by Aadiilin`} 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </button>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-1 md:px-4 gap-1 md:gap-0">
                  <div>
                    <Link href={`/project/${project.slug}`} className="font-title font-extrabold text-sm md:text-xl group-hover:text-primary transition-colors line-clamp-1 hover:underline">
                      {project.title}
                    </Link>
                    <p className="text-muted-foreground text-[8px] md:text-[10px] uppercase tracking-[0.1em] md:tracking-[0.2em] font-bold">{project.role}</p>
                  </div>
                  <span className="hidden md:block text-[10px] font-title font-bold text-muted-foreground bg-white/5 px-4 py-1.5 rounded-full border border-white/5">{project.year}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 md:py-32 relative z-10">
        <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
          <div className="glass-card rounded-[2rem] p-8 md:p-16 lg:p-24 overflow-hidden relative">
            {/* Subtle internal glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -mr-32 -mt-32 rounded-full" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center relative z-10">
              <div className="lg:col-span-5 relative aspect-[3/4] glass-card rounded-2xl p-2">
                <img 
                  src={`${import.meta.env.BASE_URL}images/adil-portrait.png`} 
                  alt="Aadiilin (Adil Sarvadka) — Full-Stack Developer & Graphic Designer Portrait" 
                  width="600" height="800"
                  className="w-full h-full object-cover rounded-xl shadow-2xl" 
                />
              </div>
              
              <motion.div
                className="lg:col-span-7"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                <h2 className="font-serif text-4xl md:text-6xl mb-8 leading-tight">Hi, I’m <span className="text-primary italic">Aadiilin</span> — developer &amp; designer.</h2>
                <div className="space-y-8 text-lg md:text-xl font-light text-foreground/80 leading-relaxed">
                  {ABOUT_PARAGRAPHS.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                  
                  <div className="space-y-4">
                    <h3 className="text-xs uppercase tracking-[0.2em] text-primary font-bold">Design Philosophy</h3>
                    <p className="text-base md:text-lg italic border-l-2 border-primary/30 pl-6">
                      "Design is not just what it looks like and feels like. Design is how it works. My goal is to build visual systems that are as functional as they are beautiful."
                    </p>
                  </div>
                  
                  </div>
                
                <div className="mt-16 pt-8 border-t border-white/10">
                  <h3 className="text-xs uppercase tracking-[0.2em] text-primary mb-6 font-bold">Design & Creative</h3>
                  <div className="flex flex-wrap gap-3 mb-10">
                    {DESIGN_SKILLS.map((skill) => (
                      <span key={skill} className="glass px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase border-white/5 hover:border-primary/30 transition-colors">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xs uppercase tracking-[0.2em] text-primary mb-6 font-bold">Development & Tech</h3>
                  <div className="flex flex-wrap gap-3">
                    {DEV_SKILLS.map((skill) => (
                      <span key={skill} className="glass px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase border-white/5 hover:border-primary/30 transition-colors">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-32 px-6 md:px-12 lg:px-24 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="font-serif text-5xl md:text-8xl mb-8 tracking-tighter">Let's build something <span className="italic text-primary">remarkable</span>.</h2>
            <p className="text-muted-foreground text-lg max-w-lg mx-auto">
              Currently accepting select development and design projects. Reach out to discuss how we can collaborate.
            </p>
          </motion.div>

          <div className="glass-card rounded-[2.5rem] p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
              <div className="space-y-3">
                <div className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold">Email</div>
                <a href="mailto:adilsarvadka@gmail.com" className="block text-base hover:text-primary transition-colors break-all font-medium">
                  adilsarvadka@gmail.com
                </a>
              </div>
              <div className="space-y-3">
                <div className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold">Phone</div>
                <a href="tel:+918137802554" className="block text-base hover:text-primary transition-colors font-medium">
                  +91 81378 02554
                </a>
              </div>
              <div className="space-y-3">
                <div className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold">Address</div>
                <p className="text-base font-medium">Calicut, Kerala, India — 673583</p>
              </div>
            </div>

            <form 
              className="space-y-10"
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const name = formData.get("name") as string;
                const email = formData.get("email") as string;
                const details = formData.get("details") as string;
                
                const message = `*Project Inquiry*%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Details:* ${details}`;
                window.open(`https://wa.me/918137802554?text=${message}`, '_blank');
                
                toast.success("Opening WhatsApp for inquiry...");
                (e.target as HTMLFormElement).reset();
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">Name</label>
                  <Input name="name" required className="recessed-input border-0 rounded-xl px-6 py-7 focus-visible:ring-1 focus-visible:ring-primary/30 text-base placeholder:text-muted-foreground/30" placeholder="Jane Doe" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">Email</label>
                  <Input name="email" required type="email" className="recessed-input border-0 rounded-xl px-6 py-7 focus-visible:ring-1 focus-visible:ring-primary/30 text-base placeholder:text-muted-foreground/30" placeholder="jane@example.com" />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">Project Details</label>
                <Textarea name="details" required className="recessed-input border-0 rounded-xl px-6 py-4 focus-visible:ring-1 focus-visible:ring-primary/30 text-base min-h-[180px] resize-none placeholder:text-muted-foreground/30" placeholder="Tell me about what you're building..." />
              </div>
              <div className="flex justify-center">
                <button type="submit" className="glossy-button group px-12 py-5 rounded-full text-xs font-bold uppercase tracking-[0.3em] text-foreground hover:scale-105 transition-all">
                  <span className="flex items-center gap-3">Send Inquiry <ArrowRight size={16} className="text-primary group-hover:translate-x-1 transition-transform" /></span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 md:py-32 px-6 md:px-12 lg:px-24 relative z-10" itemScope itemType="https://schema.org/FAQPage">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl md:text-6xl mb-6">Frequently Asked <span className="italic text-primary">Questions</span></h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Everything you need to know about working with me.
            </p>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                question: 'Who is Aadiilin?',
                answer: 'Aadiilin (Adil Sarvadka) is a B.Tech CSE student specializing in Cyber Security, a full-stack web developer, graphic designer, and AI enthusiast from Kasaragod, Kerala. He creates SaaS platforms like FestBoard and Savelio, designs brand identities, and builds modern web applications.'
              },
              {
                question: 'What services do you offer?',
                answer: 'I offer full-stack web development (Next.js, React, TypeScript, Node.js, Firebase, Supabase, PostgreSQL), graphic design (poster design, brand identity, campaign visuals, editorial layout, typography), and SaaS platform development.'
              },
              {
                question: 'What projects have you built?',
                answer: 'I built FestBoard, a multi-tenant SaaS platform for managing competitions and events; Savelio, a price comparison platform for Indian e-commerce; and Zakk Events, an event management platform. I also do graphic design work including posters, brand identities, and campaign visuals.'
              },
              {
                question: 'What technologies do you use?',
                answer: 'For development: Next.js, React, TypeScript, JavaScript, Tailwind CSS, Node.js, Firebase, Supabase, PostgreSQL. For design: Adobe Photoshop, Adobe Illustrator, Adobe InDesign, and Adobe After Effects.'
              },
              {
                question: 'How can I hire you?',
                answer: 'Reach out via email at adilsarvadka@gmail.com, WhatsApp at +91 81378 02554, or use the contact form on this page. I am currently accepting select development and design projects.'
              },
              {
                question: 'Do you work with international clients?',
                answer: 'Yes, I work with clients worldwide. Remote collaborations are welcome.'
              },
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="glass-card rounded-2xl overflow-hidden"
                itemScope
                itemType="https://schema.org/Question"
              >
                <details className="group">
                  <summary className="faq-question flex items-center justify-between p-6 md:p-8 cursor-pointer list-none hover:bg-white/5 transition-colors">
                    <span className="font-title font-bold text-base md:text-lg pr-4" itemProp="name">{faq.question}</span>
                    <span className="text-primary shrink-0 transition-transform duration-300 group-open:rotate-45">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    </span>
                  </summary>
                  <div className="px-6 md:px-8 pb-6 md:pb-8" itemScope itemType="https://schema.org/Answer">
                    <p className="text-muted-foreground leading-relaxed" itemProp="text">{faq.answer}</p>
                  </div>
                </details>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <footer className="py-16 px-6 md:px-12 lg:px-24 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 relative z-10 bg-background/50 backdrop-blur-sm">
        <div className="font-title text-3xl font-extrabold italic text-primary lowercase">aadiilin</div>
        <div className="flex gap-8">
          <a href="https://www.instagram.com/aadiil.in?utm_source=qr&igsh=bHIzNTl0bXFkeG85" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-all hover:scale-110" aria-label="Instagram"><Instagram size={20} /></a>
          <a href="https://in.pinterest.com/aadiilin/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-all hover:scale-110" aria-label="Pinterest"><FaPinterest size={20} /></a>
          <a href="https://www.linkedin.com/in/adil-sarvadka-51282a406?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-all hover:scale-110" aria-label="LinkedIn"><Linkedin size={20} /></a>
          <a href="https://github.com/aadiilin" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-all hover:scale-110" aria-label="GitHub"><Github size={20} /></a>
        </div>
        <div className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-bold text-center md:text-right">
          <div>© {new Date().getFullYear()} — Built with Intention</div>
        </div>
      </footer>
    </div>
    </>
  );
}
