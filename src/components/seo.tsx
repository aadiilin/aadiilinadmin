import { Helmet } from 'react-helmet-async'
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  SITE_LOCALE,
  DEFAULT_OG_IMAGE,
  CREATOR_NAME,
} from '@/lib/seo-data'

interface SEOProps {
  title?: string
  description?: string
  path?: string
  image?: string
  type?: 'website' | 'article'
  noIndex?: boolean
  noFollow?: boolean
  publishedTime?: string
  modifiedTime?: string
  keywords?: string[]
  jsonLd?: Record<string, unknown>[]
  breadcrumbs?: { name: string; path: string }[]
}

export function SEO({
  title,
  description,
  path = '',
  image,
  type = 'website',
  noIndex = false,
  noFollow = false,
  publishedTime,
  modifiedTime,
  keywords,
  jsonLd,
  breadcrumbs,
}: SEOProps) {
  const seoTitle = title ? `${title} | Aadiilin` : SITE_NAME
  const seoDescription = description || SITE_DESCRIPTION
  const ogImage = image || DEFAULT_OG_IMAGE
  const ogImageUrl = ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`
  const url = `${SITE_URL}${path}`
  const robotsContent = noIndex && noFollow ? 'noindex, nofollow' : noIndex ? 'noindex, follow' : noFollow ? 'index, nofollow' : undefined

  const allJsonLd = [...(jsonLd || [])]

  if (breadcrumbs && breadcrumbs.length > 0) {
    allJsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: crumb.name,
        item: `${SITE_URL}${crumb.path}`,
      })),
    })
  }

  return (
    <Helmet>
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      {robotsContent && <meta name="robots" content={robotsContent} />}
      {keywords && keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      <link rel="canonical" href={url} />

      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={seoTitle} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={SITE_LOCALE} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={ogImageUrl} />
      <meta name="twitter:image:alt" content={seoTitle} />
      <meta name="twitter:site" content="@aadiilin" />
      <meta name="twitter:creator" content="@aadiilin" />

      {type === 'article' && (
        <>
          <meta property="article:author" content={CREATOR_NAME} />
          <meta property="article:publisher" content={SITE_URL} />
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
        </>
      )}

      {allJsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  )
}
