import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CustomCursor() {
  const [visible, setVisible] = useState(false)
  const [cursorText, setCursorText] = useState('')
  const [isHovered, setIsHovered] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springX = useSpring(cursorX, { stiffness: 400, damping: 28 })
  const springY = useSpring(cursorY, { stiffness: 400, damping: 28 })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!visible) setVisible(true)

      const target = e.target as HTMLElement | null
      if (target) {
        const interactive = target.closest('[data-cursor], a, button, input, textarea, select')
        if (interactive) {
          setIsHovered(true)
          const customText = interactive.getAttribute('data-cursor-text')
          setCursorText(customText || '')
        } else {
          setIsHovered(false)
          setCursorText('')
        }
      }
    }

    const leave = () => setVisible(false)
    const enter = () => setVisible(true)

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseleave', leave)
    document.addEventListener('mouseenter', enter)

    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseleave', leave)
      document.removeEventListener('mouseenter', enter)
    }
  }, [cursorX, cursorY, visible])

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center rounded-full bg-white text-black font-mono text-[10px] font-bold uppercase tracking-wider mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible ? 1 : 0,
        }}
        animate={{
          width: cursorText ? 90 : isHovered ? 44 : 16,
          height: cursorText ? 90 : isHovered ? 44 : 16,
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      >
        {cursorText && (
          <span className="px-2 text-center leading-tight transition-opacity duration-200">
            {cursorText}
          </span>
        )}
      </motion.div>
    </>
  )
}
