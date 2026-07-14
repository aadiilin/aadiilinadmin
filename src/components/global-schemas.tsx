import { Helmet } from 'react-helmet-async'
import { personSchema, websiteSchema, organizationSchema, profilePageSchema } from '@/lib/schemas'

export function GlobalSchemas() {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(personSchema())}</script>
      <script type="application/ld+json">{JSON.stringify(websiteSchema())}</script>
      <script type="application/ld+json">{JSON.stringify(organizationSchema())}</script>
      <script type="application/ld+json">{JSON.stringify(profilePageSchema())}</script>
    </Helmet>
  )
}
