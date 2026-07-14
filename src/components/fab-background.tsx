import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

const BTN_SIZE = 44
const GAP = 58
const ICON_SIZE = 18
const DUR_EXPAND = 1.2
const DUR_HOLD = 1.8
const DUR_COLLAPSE = 1.2
const DUR_PAUSE = 1.2

const EXPANDED_Y = [
  GAP * 0.5,
  GAP * 1.5,
  GAP * 2.5,
  GAP * 3.5,
]

const iconPaths = [
  // 0: Circle outline
  <circle key="outline" cx="50%" cy="50%" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" />,
  // 1: Home
  <g key="home"><path d="M3 9.5l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M9 22V12h6v10" fill="none" stroke="currentColor" strokeWidth="1.5" /></g>,
  // 2: Map pin minus
  <g key="pin"><path d="M12 2a8 8 0 00-8 8c0 5.5 8 12 8 12s8-6.5 8-12a8 8 0 00-8-8z" fill="none" stroke="currentColor" strokeWidth="1.5" /><circle cx="12" cy="10" r="3" fill="currentColor" /><path d="M8 10h8" stroke="currentColor" strokeWidth="1.5" /></g>,
  // 3: X / close
  <g key="close"><path d="M5 5l14 14M19 5l-14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></g>,
]

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.4 },
  },
}

export function FABBackground({ hidden = false }: { hidden?: boolean }) {
  const [phase, setPhase] = useState<"idle" | "expanded" | "collapsing" | "paused">("idle")

  useEffect(() => {
    const loop = async () => {
      setPhase("idle")
      await sleep(DUR_PAUSE * 1000)
      setPhase("expanded")
      await sleep((DUR_EXPAND + DUR_HOLD) * 1000)
      setPhase("collapsing")
      await sleep(DUR_COLLAPSE * 1000)
      setPhase("paused")
      await sleep(DUR_PAUSE * 500)
    }
    loop()
    const interval = setInterval(() => {
      loop()
    }, (DUR_EXPAND + DUR_HOLD + DUR_COLLAPSE + DUR_PAUSE + DUR_PAUSE * 0.5) * 1000)
    return () => clearInterval(interval)
  }, [])

  const isExpanded = phase === "expanded" || phase === "collapsing"
  const showButtons = phase !== "idle" && phase !== "paused"

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className={`fixed inset-0 pointer-events-none z-40 flex items-start justify-start transition-opacity duration-300 ${hidden ? "opacity-0" : "opacity-100"}`}
    >
      <div className="relative mt-20 ml-6">
        {/* Main FAB */}
        <motion.div
          animate={{
            scale: isExpanded ? 0.85 : 1,
            opacity: isExpanded ? 0.5 : 1,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute left-0 top-0"
          style={{ width: BTN_SIZE, height: BTN_SIZE }}
        >
          <div className="w-full h-full rounded-full bg-text flex items-center justify-center shadow-lg">
            <div className="grid grid-cols-2 gap-[3px]">
              <div className="w-[5px] h-[5px] rounded-full bg-bg" />
              <div className="w-[5px] h-[5px] rounded-full bg-bg" />
              <div className="w-[5px] h-[5px] rounded-full bg-bg" />
              <div className="w-[5px] h-[5px] rounded-full bg-bg" />
            </div>
          </div>
        </motion.div>

        {/* Expanded buttons */}
        <AnimatePresence>
          {showButtons && EXPANDED_Y.map((y, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 0, scale: 0.5 }}
              animate={{
                opacity: phase === "collapsing" ? 0 : 1,
                y: phase === "collapsing" ? 0 : y,
                scale: phase === "collapsing" ? 0.5 : 1,
              }}
              exit={{ opacity: 0, y: 0, scale: 0.5 }}
              transition={{
                duration: phase === "collapsing" ? DUR_COLLAPSE : DUR_EXPAND,
                ease: [0.34, 1.2, 0.64, 1],
                delay: phase === "collapsing" ? 0 : i * 0.06,
              }}
              className="absolute left-0 top-0"
              style={{ width: BTN_SIZE, height: BTN_SIZE }}
            >
              <div className="w-full h-full rounded-full bg-accent flex items-center justify-center shadow-lg text-white">
                <svg
                  viewBox="0 0 24 24"
                  style={{ width: ICON_SIZE, height: ICON_SIZE }}
                  className="text-white"
                >
                  {iconPaths[i]}
                </svg>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}
