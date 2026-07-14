import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { Helmet } from "react-helmet-async"
import { FAQS } from "@/lib/faq-data"
import { faqPageSchema } from "@/lib/schemas"

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="max-w-6xl mx-auto px-6 pb-20 sm:pb-24">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqPageSchema(FAQS))}</script>
      </Helmet>

      <div className="flex items-center gap-4 mb-10">
        <span className="font-mono text-xs text-muted uppercase tracking-widest">05</span>
        <h2 className="font-heading font-bold text-2xl sm:text-3xl tracking-tight">FAQ</h2>
        <div className="flex-1 h-px bg-line" />
      </div>

      <div className="max-w-3xl space-y-3">
        {FAQS.map((faq, i) => (
          <div key={i} className="bg-surface rounded-2xl border border-line/50 overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer"
            >
              <span className="font-heading font-semibold text-sm sm:text-base tracking-tight text-text">
                {faq.question}
              </span>
              <motion.span
                animate={{ rotate: openIndex === i ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="shrink-0 text-muted"
              >
                <ChevronDown size={16} />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-4 text-sm text-muted leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  )
}
