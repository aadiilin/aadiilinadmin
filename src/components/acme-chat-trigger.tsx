import { useEffect, useState, useCallback } from "react"
import { motion } from "framer-motion"

const LINES = [
  "Start by learning design fundamentals — color, typography, layout — then pick up animation principles like timing, easing, and storytelling.",
  "Next, get hands-on with animation tools like Jitter to practice logo animations, transitions, and short clips.",
  "Over time, build a portfolio that shows creativity and how motion communicates ideas clearly.",
]

const DUR_LINE = 2.5
const DUR_PAUSE = 1.2
const TOTAL_DUR = 2 + 2 + LINES.length * DUR_LINE + DUR_PAUSE

interface AcmeChatTriggerProps {
  onToggle: () => void
  open: boolean
}

export function AcmeChatTrigger({ onToggle, open }: AcmeChatTriggerProps) {
  const [step, setStep] = useState(0)

  const advance = useCallback(() => {
    setStep((s) => (s >= LINES.length + 1 ? 0 : s + 1))
  }, [])

  useEffect(() => {
    if (open) return
    const t = setTimeout(advance, step === 0 ? 2000 : step <= LINES.length ? DUR_LINE * 1000 : DUR_PAUSE * 1000)
    return () => clearTimeout(t)
  }, [step, open, advance])

  useEffect(() => {
    if (!open) return
    setStep(0)
  }, [open])

  // Reset to 0 when component mounts so loop starts fresh
  useEffect(() => { setStep(0) }, [])

  return (
    <button
      onClick={onToggle}
      className="fixed bottom-6 right-6 z-[90] w-[172px] h-[196px] rounded-2xl shadow-lg overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-300 text-left cursor-pointer"
      aria-label="Toggle chat"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-[#F0ECF5]" />
      <div className="absolute -top-12 -left-12 w-36 h-36 rounded-full bg-[#CBD1F7] opacity-60 blur-3xl" />
      <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-[#C29BE4] opacity-50 blur-3xl" />
      <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-[#E9ACC5] opacity-50 blur-3xl" />
      <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-[#E67C8F] opacity-60 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 p-4 h-full flex flex-col">
        {/* acme logo */}
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: step >= 2 ? 1 : 0, x: step >= 2 ? 0 : -8 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex items-center gap-1.5"
        >
          <div className="w-4 h-4 rounded-md bg-[#FF3B1F] flex items-center justify-center">
            <span className="text-[8px] font-bold text-white font-heading">a</span>
          </div>
          <span className="text-[10px] font-bold text-[#1A1A1A] font-heading tracking-tight">acme</span>
        </motion.div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Ask AI pill */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{
            opacity: step >= 1 ? 0 : 1,
            y: step >= 1 ? -4 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="self-center mb-2"
        >
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1A1A1A] text-white text-[10px] font-medium shadow-sm">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a4 4 0 014 4c0 2-2 3-2 5h-4c0-2-2-3-2-5a4 4 0 014-4z" />
              <path d="M8 14h8" />
              <path d="M9 18h6" />
            </svg>
            Ask AI
          </div>
        </motion.div>

        {/* Streaming text lines */}
        <div className="space-y-1.5 mt-auto">
          {LINES.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 4 }}
              animate={{
                opacity: step > i + 1 ? 1 : 0,
                y: step > i + 1 ? 0 : 4,
              }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <div className="h-1.5 rounded-full bg-[#1A1A1A]/15" style={{ width: `${Math.max(40, 90 - i * 15)}%` }} />
              {step > i + 1 && (
                <div className="mt-1 h-1 rounded-full bg-[#1A1A1A]/10" style={{ width: `${Math.max(30, 75 - i * 12)}%` }} />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </button>
  )
}
