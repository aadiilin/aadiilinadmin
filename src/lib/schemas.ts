import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, PROJECTS, SKILLS, CREATOR_NAME, CREATOR_ALTERNATE_NAME, CREATOR_ALTERNATE_NAME_2, CREATOR_JOB_TITLE, CREATOR_EMAIL, CREATOR_PHONE, CREATOR_LOCATION, CREATOR_IMAGE, SOCIAL_LINKS } from './seo-data'
import type { Project } from './seo-data'

export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: CREATOR_NAME,
    alternateName: [CREATOR_ALTERNATE_NAME, CREATOR_ALTERNATE_NAME_2],
    url: SITE_URL,
    image: `${SITE_URL}${CREATOR_IMAGE}`,
    description: SITE_DESCRIPTION,
    jobTitle: CREATOR_JOB_TITLE,
    email: CREATOR_EMAIL,
    telephone: CREATOR_PHONE,
    address: { '@type': 'PostalAddress', addressLocality: CREATOR_LOCATION },
    knowsAbout: SKILLS,
    sameAs: Object.values(SOCIAL_LINKS),
    mainEntityOfPage: { '@type': 'ProfilePage', '@id': `${SITE_URL}#organization` },
    brand: { '@type': 'Brand', name: CREATOR_NAME },
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    alternateName: [CREATOR_NAME, CREATOR_ALTERNATE_NAME],
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    author: { '@type': 'Organization', name: CREATOR_NAME },
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: 'en-US',
    copyrightYear: new Date().getFullYear(),
    isFamilyFriendly: true,
  }
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: CREATOR_NAME,
    alternateName: [CREATOR_ALTERNATE_NAME, CREATOR_ALTERNATE_NAME_2],
    url: SITE_URL,
    email: CREATOR_EMAIL,
    sameAs: Object.values(SOCIAL_LINKS),
  }
}

export function profilePageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${SITE_URL}#profile`,
    url: SITE_URL,
    mainEntity: { '@type': 'Organization', name: CREATOR_NAME },
    inLanguage: 'en-US',
    isAccessibleForFree: true,
  }
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  }
}

export function collectionPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Projects by Jomor Design',
    description: 'Selected digital experiences, branding, WebGL applications, and e-commerce projects by Jomor Design.',
    url: `${SITE_URL}/work`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: PROJECTS.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: { '@type': 'CreativeWork', name: p.title, url: `${SITE_URL}/project/${p.slug}` },
      })),
    },
  }
}

export function faqPageSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }
}

export function imageObjectSchema(url: string, caption: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    url: `${SITE_URL}${url}`,
    caption,
    author: { '@type': 'Organization', name: CREATOR_NAME },
  }
}

export function contactPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Jomor Design',
    url: `${SITE_URL}/contact`,
    description: 'Get in touch with Jomor Design for digital experience design and WebGL development.',
    mainEntity: { '@type': 'Organization', name: CREATOR_NAME, email: CREATOR_EMAIL },
  }
}

export function creativeWorkSeriesSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWorkSeries',
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    author: { '@type': 'Organization', name: CREATOR_NAME },
  }
}

export function itemListSchema() {
  const categories = [...new Set(PROJECTS.map((p) => p.category).filter(Boolean))]
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Design Categories',
    itemListElement: categories.map((cat, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: { '@type': 'Thing', name: cat },
    })),
  }
}
