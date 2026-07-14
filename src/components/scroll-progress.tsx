import { useEffect, useState, useRef } from "react"

export function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    function handler() {
      const scrollEl = document.querySelector(".scroll-container")
      if (!scrollEl) return

      const { scrollTop, scrollHeight, clientHeight } = scrollEl
      const max = scrollHeight - clientHeight
      const pct = max > 0 ? (scrollTop / max) * 100 : 0
      setProgress(pct)

      setVisible(true)
      clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => setVisible(false), 1500)
    }

    const scrollEl = document.querySelector(".scroll-container")
    if (scrollEl) {
      scrollEl.addEventListener("scroll", handler)
      handler()
    }

    return () => {
      clearTimeout(timerRef.current)
      scrollEl?.removeEventListener("scroll", handler)
    }
  }, [])

  return (
    <div
      className="fixed left-1/2 top-6 z-40 flex h-1 w-[140px] -translate-x-1/2 items-center pointer-events-none"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 250ms cubic-bezier(0.25, 1, 0.5, 1)" }}
      aria-hidden
    >
      <div className="relative h-full w-full overflow-hidden rounded-full bg-line">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-l1"
          style={{ width: `${progress}%`, transition: "width 120ms cubic-bezier(0.22, 1, 0.36, 1)", willChange: "width" }}
        />
      </div>
    </div>
  )
}
