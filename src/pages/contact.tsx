import { useState } from 'react'
import { motion } from 'framer-motion'
import { SEO } from '@/components/seo'
import { LiveClock } from '@/components/live-clock'
import { soundManager } from '@/lib/sound'

const projectTypes = ['Web Design & WebGL', 'Brand Identity', 'Full Digital Package', 'E-Commerce Platform']
const budgetRanges = ['$10k – $25k', '$25k – $50k', '$50k – $100k', '$100k+']

export function Contact() {
  const [selectedType, setSelectedType] = useState(projectTypes[0])
  const [selectedBudget, setSelectedBudget] = useState(budgetRanges[1])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    soundManager.playClick()
    setSubmitted(true)
  }

  return (
    <main className="bg-[#0A0A0A] min-h-screen pt-36 pb-28 px-6 md:px-12 lg:px-16 text-white">
      <SEO
        title="Contact — Jomor Design"
        description="Let's build something memorable together. Contact Jomor Design at jomor@jomordesign.com or call 514-222-3461."
        path="/contact"
      />

      <div className="max-w-7xl mx-auto">
        <header className="mb-16 md:mb-24">
          <LiveClock label="MONTREAL, QC" timezone="America/Toronto" />
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="font-serif italic text-6xl md:text-8xl lg:text-9xl text-white/80 mt-6"
          >
            let&rsquo;s talk
          </motion.h1>
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
            className="font-display font-black text-6xl md:text-8xl lg:text-9xl text-white block mt-[-0.2em] uppercase tracking-tight"
          >
            business
          </motion.span>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Contact Details Left Column */}
          <div className="lg:col-span-5 space-y-12">
            <div>
              <p className="text-xs font-mono text-white/40 uppercase tracking-widest mb-2">EMAIL US DIRECTLY</p>
              <a
                href="mailto:jomor@jomordesign.com?subject=Hello%20Jomor%20Design!"
                onMouseEnter={() => soundManager.playHover()}
                onClick={() => soundManager.playClick()}
                className="font-display text-2xl md:text-3xl font-bold text-white hover:text-white/70 transition-colors block"
                data-cursor="pointer"
              >
                jomor@jomordesign.com
              </a>
            </div>

            <div>
              <p className="text-xs font-mono text-white/40 uppercase tracking-widest mb-2">PHONE / WHATSAPP</p>
              <a
                href="tel:5142223461"
                onMouseEnter={() => soundManager.playHover()}
                onClick={() => soundManager.playClick()}
                className="font-display text-2xl md:text-3xl font-bold text-white hover:text-white/70 transition-colors block"
                data-cursor="pointer"
              >
                +1 (514) 222-3461
              </a>
            </div>

            <div>
              <p className="text-xs font-mono text-white/40 uppercase tracking-widest mb-2">STUDIO LOCATION</p>
              <p className="font-sans text-lg text-white/80 leading-relaxed">
                Jomor Design Practice<br />
                Montreal, Quebec<br />
                Canada
              </p>
            </div>
          </div>

          {/* Interactive Form Right Column */}
          <div className="lg:col-span-7 bg-white/5 p-8 md:p-12 rounded-2xl border border-white/10">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-16 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center mx-auto text-2xl font-bold">
                  ✓
                </div>
                <h3 className="font-display text-3xl font-bold text-white uppercase">MESSAGE RECEIVED</h3>
                <p className="text-white/60 text-sm font-sans max-w-md mx-auto">
                  Thank you for reaching out! We have received your inquiry and will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-xs font-mono text-white/50 hover:text-white underline uppercase"
                >
                  Send another inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label className="block text-xs font-mono text-white/50 uppercase tracking-wider mb-3">
                    1. WHAT CAN WE HELP YOU WITH?
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {projectTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => {
                          soundManager.playClick()
                          setSelectedType(type)
                        }}
                        onMouseEnter={() => soundManager.playHover()}
                        className={`px-4 py-2 rounded-full text-xs font-mono transition-all ${
                          selectedType === type
                            ? 'bg-white text-black font-bold'
                            : 'bg-white/5 text-white/60 hover:bg-white/15 border border-white/10'
                        }`}
                        data-cursor="pointer"
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/50 uppercase tracking-wider mb-3">
                    2. ESTIMATED BUDGET RANGE
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {budgetRanges.map((budget) => (
                      <button
                        key={budget}
                        type="button"
                        onClick={() => {
                          soundManager.playClick()
                          setSelectedBudget(budget)
                        }}
                        onMouseEnter={() => soundManager.playHover()}
                        className={`px-4 py-2 rounded-full text-xs font-mono transition-all ${
                          selectedBudget === budget
                            ? 'bg-white text-black font-bold'
                            : 'bg-white/5 text-white/60 hover:bg-white/15 border border-white/10'
                        }`}
                        data-cursor="pointer"
                      >
                        {budget}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono text-white/50 uppercase tracking-wider mb-2">
                      YOUR NAME
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-white/50 uppercase tracking-wider mb-2">
                      YOUR EMAIL
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@company.com"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/50 uppercase tracking-wider mb-2">
                    PROJECT DETAILS
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your timeline, goals, and vision..."
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-white transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  onMouseEnter={() => soundManager.playHover()}
                  className="w-full py-4 rounded-full bg-white text-black font-mono text-sm font-bold uppercase tracking-wider hover:bg-white/90 transition-all duration-300 shadow-xl"
                  data-cursor="pointer"
                >
                  SEND INQUIRY
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
