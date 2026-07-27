import { motion } from 'framer-motion'
import { SEO } from '@/components/seo'

export function PrivacyPolicy() {
  return (
    <main className="bg-[#0F0F0F] min-h-screen pt-32 pb-24">
      <SEO title="Privacy Policy" path="/privacy-policy" noIndex />
      <div className="max-w-3xl mx-auto px-6 md:px-12 lg:px-16">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="font-display text-4xl md:text-6xl font-bold text-white mb-8"
        >
          Privacy Policy
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
          className="font-sans text-sm text-white/50 leading-relaxed space-y-4"
        >
          <p>This privacy policy outlines how Aadiilin collects, uses, and protects your personal information.</p>
          <p>We do not share your personal data with third parties unless required by law.</p>
          <p>Contact us at adilsarvadka@gmail.com for any privacy-related concerns.</p>
        </motion.div>
      </div>
    </main>
  )
}
