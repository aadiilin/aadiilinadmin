import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { soundManager } from '@/lib/sound'

interface HeroTitle3DProps {
  lines: { text: string; style: 'serif' | 'display'; italic?: boolean; opacity?: string }[]
}

export function HeroTitle3D({ lines }: HeroTitle3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const xPct = (e.clientX - rect.left) / rect.width - 0.5
    const yPct = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(xPct)
    mouseY.set(yPct)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="perspective-1000 select-none space-y-1 md:space-y-2"
    >
      {lines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: '70%', rotateX: -90, z: -50 }}
          animate={{ opacity: 1, y: 0, rotateX: 0, z: 0 }}
          transition={{
            duration: 0.9,
            delay: 0.1 * (i + 1),
            ease: [0.76, 0, 0.24, 1],
          }}
          onMouseEnter={() => soundManager.playHover()}
          className="inline-block block"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <span
            className={`block tracking-tight uppercase leading-[0.85] ${
              line.style === 'serif' ? 'font-serif' : 'font-display font-black'
            } ${line.italic ? 'italic' : ''} ${line.opacity || 'text-white'} text-6xl sm:text-8xl md:text-9xl lg:text-[11rem]`}
          >
            {line.text}
          </span>
        </motion.div>
      ))}
    </motion.div>
  )
}
