import { useState, useEffect } from 'react'
import { Link, useLocation } from 'wouter'
import { motion, AnimatePresence } from 'framer-motion'
import { SoundToggle } from '@/components/sound-toggle'
import { MusicToggle } from '@/components/music-toggle'
import { soundManager } from '@/lib/sound'

const navItems = [
  { href: '/', label: 'home' },
  { href: '/work', label: 'work' },
  { href: '/contact', label: 'contact' },
]

export function Navigation() {
  const [location] = useLocation()

  const [prevLocation, setPrevLocation] = useState(location)
  const [flash, setFlash] = useState(false)

  useEffect(() => {
    if (location === prevLocation) return
    setPrevLocation(location)
    setFlash(true)
    soundManager.playClick()
    const timer = setTimeout(() => setFlash(false), 350)
    return () => clearTimeout(timer)
  }, [location, prevLocation])

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-6 flex items-center justify-between pointer-events-none mix-blend-exclusion">
        <Link
          href="/"
          className="pointer-events-auto group flex items-center gap-2"
          onMouseEnter={() => soundManager.playHover()}
          onClick={() => soundManager.playClick()}
          data-cursor="pointer"
        >
          <span className="font-display text-xl font-bold tracking-tight text-white uppercase group-hover:opacity-70 transition-opacity">
            Aadiilin
          </span>
          <span className="text-white/40 text-xs font-serif italic hidden sm:inline">
            / digital practice
          </span>
        </Link>

        <div className="flex items-center gap-4 md:gap-8 pointer-events-auto">
          <div className="hidden sm:block">
            <SoundToggle />
          </div>
          <div className="hidden sm:block">
            <MusicToggle />
          </div>

          <nav className="flex items-center gap-4 md:gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onMouseEnter={() => soundManager.playHover()}
                onClick={() => soundManager.playClick()}
                className={`text-[10px] md:text-xs font-mono tracking-widest uppercase transition-all duration-300 relative py-1 ${
                  location === item.href ? 'text-white font-bold' : 'text-white/60 hover:text-white'
                }`}
                data-cursor="pointer"
              >
                {item.label}
                {location === item.href && (
                  <motion.span
                    layoutId="activeNav"
                    className="absolute bottom-0 left-0 w-full h-[1px] bg-white"
                  />
                )}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {flash && (
          <motion.div
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[200] bg-white pointer-events-none"
          />
        )}
      </AnimatePresence>
    </>
  )
}
