import { useEffect, useRef } from "react"

export function CanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animId: number
    let width = 0
    let height = 0
    let mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000, radius: 250 }

    interface Particle {
      x: number
      y: number
      baseX: number
      baseY: number
      vx: number
      vy: number
      size: number
      alpha: number
    }

    let particles: Particle[] = []

    function resize() {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      initParticles()
    }

    function initParticles() {
      particles = []
      const step = Math.max(35, Math.floor(Math.sqrt((width * height) / 400)))
      for (let x = 0; x < width; x += step) {
        for (let y = 0; y < height; y += step) {
          particles.push({
            x,
            y,
            baseX: x,
            baseY: y,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            size: Math.random() * 1.5 + 0.5,
            alpha: Math.random() * 0.25 + 0.05,
          })
        }
      }
    }

    function onMouseMove(e: MouseEvent) {
      mouse.targetX = e.clientX
      mouse.targetY = e.clientY
    }

    function draw() {
      if (!canvas || !ctx) return
      ctx.clearRect(0, 0, width, height)

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.1
      mouse.y += (mouse.targetY - mouse.y) * 0.1

      // Subtle gradient radial spot following mouse
      if (mouse.x > 0 && mouse.y > 0) {
        const gradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          mouse.radius * 1.8
        )
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.04)")
        gradient.addColorStop(0.5, "rgba(200, 200, 255, 0.015)")
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)")
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, width, height)
      }

      // Draw mesh nodes & connection lines
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Mouse displacement force
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < mouse.radius) {
          const force = (1 - dist / mouse.radius) * 45
          const angle = Math.atan2(dy, dx)
          p.x -= Math.cos(angle) * force * 0.05
          p.y -= Math.sin(angle) * force * 0.05
        }

        // Elastic return to base position
        p.x += (p.baseX - p.x) * 0.03 + p.vx
        p.y += (p.baseY - p.y) * 0.03 + p.vy

        // Draw particle dot
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    resize()
    draw()

    window.addEventListener("resize", resize)
    window.addEventListener("mousemove", onMouseMove)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", onMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-80"
    />
  )
}
