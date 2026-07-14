import { useState, useEffect } from "react"

export function CursorTracker() {
  const [pos, setPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    function handler(e: MouseEvent) {
      setPos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handler)
    return () => window.removeEventListener("mousemove", handler)
  }, [])

  return (
    <span className="hidden lg:inline border-dotted-hover p-2 cursor-pointer pointer-events-auto">
      {String(pos.x).padStart(4, "0")} X {String(pos.y).padStart(4, "0")} Y
    </span>
  )
}
