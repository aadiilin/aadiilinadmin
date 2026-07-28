import { SEO } from '@/components/seo'

export function PrivacyPolicy() {
  return (
    <main className="bg-[#0A0A0A] min-h-screen pt-36 pb-28 px-6 md:px-12 lg:px-16 text-white">
      <SEO
        title="Privacy Policy — Aadiilin"
        description="Privacy policy and data protection terms for Aadiilin design practice."
        path="/privacy-policy"
      />

      <div className="max-w-4xl mx-auto space-y-12">
        <header>
          <h1 className="font-display text-5xl md:text-7xl font-black text-white uppercase tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="font-mono text-xs text-white/40 uppercase tracking-widest">LAST UPDATED: JANUARY 2026</p>
        </header>

        <section className="space-y-6 text-white/70 font-sans text-base leading-relaxed border-t border-white/10 pt-8">
          <h2 className="font-display text-2xl font-bold text-white uppercase">1. Information Collection</h2>
          <p>
            Aadiilin values your privacy. We collect minimal personal information when you fill out our contact or inquiry forms (such as your name, email address, project requirements, and budget specifications).
          </p>

          <h2 className="font-display text-2xl font-bold text-white uppercase">2. Use of Information</h2>
          <p>
            Any information collected through this website is strictly used to respond to client inquiries, scope design projects, and communicate regarding creative services. We do not sell or share your data with third parties.
          </p>

          <h2 className="font-display text-2xl font-bold text-white uppercase">3. Cookies & Analytics</h2>
          <p>
            We use essential local storage preferences (such as audio toggle state) and anonymous traffic analytics to evaluate site performance and user experience.
          </p>

          <h2 className="font-display text-2xl font-bold text-white uppercase">4. Contact Us</h2>
          <p>
            If you have any questions regarding this Privacy Policy, please email us directly at{' '}
            <a href="mailto:adilsarvadka@gmail.com" className="text-white underline">
              adilsarvadka@gmail.com
            </a>
            .
          </p>
        </section>

      </div>
    </main>
  )
}
