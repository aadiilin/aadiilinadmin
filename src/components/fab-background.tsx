import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

const BTN_SIZE = 44
const GAP = 58
const ICON_SIZE = 18

const EXPANDED_Y = [
  GAP * 0.5,
  GAP * 1.5,
  GAP * 2.5,
  GAP * 3.5,
]

const iconPaths = [
  <circle key="outline" cx="50%" cy="50%" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" />,
  <g key="home"><path d="M3 9.5l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M9 22V12h6v10" fill="none" stroke="currentColor" strokeWidth="1.5" /></g>,
  <g key="pin"><path d="M12 2a8 8 0 00-8 8c0 5.5 8 12 8 12s8-6.5 8-12a8 8 0 00-8-8z" fill="none" stroke="currentColor" strokeWidth="1.5" /><circle cx="12" cy="10" r="3" fill="currentColor" /><path d="M8 10h8" stroke="currentColor" strokeWidth="1.5" /></g>,
  <g key="close"><path d="M5 5l14 14M19 5l-14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></g>,
]

export function FABBackground({ hidden = false }: { hidden?: boolean }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 pointer-events-none z-40 flex items-start justify-start"
    >
      <div className="relative mt-20 ml-6">
        {/* Main FAB */}
        <motion.button
          onClick={() => setOpen(!open)}
          animate={{ scale: open ? 0.85 : 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute left-0 top-0 rounded-full bg-text shadow-lg cursor-pointer pointer-events-auto"
          style={{ width: BTN_SIZE, height: BTN_SIZE }}
        >
          <div className="w-full h-full rounded-full flex items-center justify-center">
            <div className="grid grid-cols-2 gap-[3px]">
              <div className="w-[5px] h-[5px] rounded-full bg-bg" />
              <div className="w-[5px] h-[5px] rounded-full bg-bg" />
              <div className="w-[5px] h-[5px] rounded-full bg-bg" />
              <div className="w-[5px] h-[5px] rounded-full bg-bg" />
            </div>
          </div>
        </motion.button>

        {/* Expanded buttons */}
        <AnimatePresence>
          {open && EXPANDED_Y.map((y, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 0, scale: 0.5, pointerEvents: "none" as const }}
              animate={{ opacity: 1, y, scale: 1, pointerEvents: "auto" as const }}
              exit={{ opacity: 0, y: 0, scale: 0.5, pointerEvents: "none" as const }}
              transition={{
                duration: 0.5,
                ease: [0.34, 1.2, 0.64, 1],
                delay: i * 0.06,
              }}
              onClick={() => setOpen(false)}
              className="absolute left-0 top-0 rounded-full bg-accent shadow-lg text-white cursor-pointer pointer-events-auto"
              style={{ width: BTN_SIZE, height: BTN_SIZE }}
            >
              <div className="w-full h-full rounded-full flex items-center justify-center">
                <svg viewBox="0 0 24 24" style={{ width: ICON_SIZE, height: ICON_SIZE }} className="text-white">
                  {iconPaths[i]}
                </svg>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
