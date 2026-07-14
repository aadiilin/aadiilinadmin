import { useEffect, useRef } from "react"

interface LottiePlayerProps {
  src: string
  className?: string
  autoplay?: boolean
  loop?: boolean
}

export function LottiePlayer({ src, className = "", autoplay = true, loop = true }: LottiePlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const animRef = useRef<import("lottie-web").AnimationItem | null>(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      const lottie = await import("lottie-web")
      if (cancelled || !containerRef.current) return
      const response = await fetch(src)
      const animationData = await response.json()
      animRef.current = lottie.default.loadAnimation({
        container: containerRef.current,
        animationData,
        autoplay,
        loop,
      })
    }
    load()
    return () => {
      cancelled = true
      animRef.current?.destroy()
    }
  }, [src, autoplay, loop])

  return <div ref={containerRef} className={className} />
}
