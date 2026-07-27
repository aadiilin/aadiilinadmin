import { useState, useRef } from 'react'
import { Link } from 'wouter'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { LiquidImage } from '@/components/liquid-image'
import { soundManager } from '@/lib/sound'
import type { Project } from '@/lib/seo-data'

interface ProjectCard3DProps {
  project: Project
  index: number
}

export function ProjectCard3D({ project, index }: ProjectCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  // 3D Motion values
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), { stiffness: 300, damping: 25 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 300, damping: 25 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseEnter = () => {
    setHovered(true)
    soundManager.playHover()
  }

  const handleMouseLeave = () => {
    setHovered(false)
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="perspective-1000 group cursor-pointer"
    >
      <Link
        href={`/project/${project.slug}`}
        onClick={() => soundManager.playClick()}
        className="block"
        data-cursor="pointer"
        data-cursor-text="VIEW"
      >
        <div className="relative rounded-2xl overflow-hidden bg-[#141414] border border-white/10 group-hover:border-white/40 transition-all duration-500 shadow-2xl">
          <LiquidImage
            src={project.image}
            alt={project.title}
            className="w-full aspect-[16/10]"
            intensity={1.2}
          />
          
          <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/10 text-[11px] font-mono text-white/90">
            {project.index || `${index + 1}/4`}
          </div>

          <div
            className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none transition-opacity duration-300"
            style={{ opacity: hovered ? 0.4 : 0.7 }}
          />
        </div>

        <div className="mt-5 flex items-baseline justify-between border-b border-white/10 pb-3 group-hover:border-white/40 transition-colors">
          <h3 className="font-display text-2xl md:text-4xl font-bold text-white group-hover:text-white/80 transition-colors uppercase">
            {project.title}
          </h3>
          <span className="font-mono text-xs text-white/40">{project.year}</span>
        </div>

        <div className="flex items-center justify-between mt-3 text-xs font-mono text-white/50">
          <span>{project.role}</span>
          <span>{project.category}</span>
        </div>
      </Link>
    </motion.div>
  )
}
