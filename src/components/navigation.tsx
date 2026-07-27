import { useState, useEffect } from 'react'
import { Link, useLocation } from 'wouter'
import { motion, AnimatePresence } from 'framer-motion'
import { FaInstagram, FaTwitter, FaGithub, FaWhatsapp, FaPinterest } from 'react-icons/fa'
import { SoundToggle } from '@/components/sound-toggle'
import { LiveClock } from '@/components/live-clock'
import { soundManager } from '@/lib/sound'

const navItems = [
  { href: '/work', label: 'work' },
  { href: '/about', label: 'about' },
  { href: '/contact', label: 'contact' },
]

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [location] = useLocation()

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

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
            Jomor Design
          </span>
          <span className="text-white/40 text-xs font-serif italic hidden sm:inline">
            / websadilo
          </span>
        </Link>

        <div className="flex items-center gap-4 md:gap-8 pointer-events-auto">
          <SoundToggle />

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onMouseEnter={() => soundManager.playHover()}
                onClick={() => soundManager.playClick()}
                className={`text-xs font-mono tracking-widest uppercase transition-all duration-300 relative py-1 ${
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

          <button
            onClick={() => {
              soundManager.playClick()
              setMenuOpen(true)
            }}
            onMouseEnter={() => soundManager.playHover()}
            className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-white/80 hover:text-white px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 transition-all duration-300"
            aria-label="Open menu"
            data-cursor="pointer"
          >
            MENU
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at 95% 5%)' }}
            animate={{ clipPath: 'circle(150% at 95% 5%)' }}
            exit={{ clipPath: 'circle(0% at 95% 5%)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] bg-[#0A0A0A] flex flex-col justify-between p-8 md:p-16 border-l border-white/10"
          >
            <div className="flex items-center justify-between">
              <LiveClock label="MONTREAL, CA" timezone="America/Toronto" />
              <button
                onClick={() => {
                  soundManager.playClick()
                  setMenuOpen(false)
                }}
                onMouseEnter={() => soundManager.playHover()}
                className="text-white/60 hover:text-white text-xs tracking-[0.25em] font-mono uppercase px-4 py-2 rounded-full border border-white/10 hover:border-white/30 transition-all"
                data-cursor="pointer"
              >
                CLOSE [X]
              </button>
            </div>

            <div className="flex flex-col items-start gap-6 md:gap-8 my-auto py-12">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.5, delay: 0.08 * i, ease: [0.76, 0, 0.24, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={() => {
                      soundManager.playClick()
                      setMenuOpen(false)
                    }}
                    onMouseEnter={() => soundManager.playHover()}
                    className="group relative block"
                    data-cursor="pointer"
                    data-cursor-text="GO"
                  >
                    <span className="font-serif text-6xl md:text-8xl lg:text-9xl italic text-white/20 transition-colors duration-300 group-hover:text-white/40">
                      {item.label}
                    </span>
                    <span className="absolute inset-0 flex items-center justify-start font-display text-6xl md:text-8xl lg:text-9xl font-bold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      {item.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-8 border-t border-white/10">
              <div className="space-y-2">
                <p className="text-white/40 text-xs font-mono uppercase tracking-widest">GET IN TOUCH</p>
                <div className="flex flex-col gap-1 text-sm font-sans text-white/80">
                  <a href="mailto:jomor@jomordesign.com" className="hover:text-white transition-colors" data-cursor="pointer">
                    jomor@jomordesign.com
                  </a>
                  <a href="tel:5142223461" className="hover:text-white transition-colors" data-cursor="pointer">
                    +1 (514) 222-3461
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-5 text-white/50">
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" data-cursor="pointer">
                  <FaInstagram size={18} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" data-cursor="pointer">
                  <FaTwitter size={18} />
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" data-cursor="pointer">
                  <FaGithub size={18} />
                </a>
                <a href="https://wa.me" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" data-cursor="pointer">
                  <FaWhatsapp size={18} />
                </a>
                <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" data-cursor="pointer">
                  <FaPinterest size={18} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
