import { useState, useEffect } from 'react'
import { Link, useLocation } from 'wouter'
import { motion, AnimatePresence } from 'framer-motion'
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'
import { SiWebflow } from 'react-icons/si'
import { RiAwardFill } from 'react-icons/ri'

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
    const timer = setTimeout(() => setFlash(false), 400)
    return () => clearTimeout(timer)
  }, [location, prevLocation])

  return (
    <>
      <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-12 mix-blend-exclusion">
        <Link href="/" className="flex flex-col items-center gap-1">
          <span className="font-display text-lg font-bold text-white tracking-tight">A</span>
          <span className="font-serif italic text-white/60 text-sm">aadiilin</span>
        </Link>

        <button
          onClick={() => setMenuOpen(true)}
          className="flex flex-col items-center gap-1 py-2 group"
          aria-label="Open menu"
        >
          <span className="text-xs font-bold tracking-[0.15em] text-white/80 font-display group-hover:text-white transition-colors">
            MENU
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] bg-[#0F0F0F] flex flex-col justify-between p-12 md:p-16"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-8 right-8 text-white/40 hover:text-white text-xs tracking-[0.2em] uppercase font-sans transition-colors"
            >
              Close
            </button>

            <div className="flex flex-col items-start gap-8 md:gap-10 mt-20">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.5, delay: 0.1 * i, ease: [0.76, 0, 0.24, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="group relative block"
                  >
                    <span className="font-serif text-6xl md:text-8xl italic text-white/20 transition-colors duration-300 group-hover:text-white">
                      {item.label}
                    </span>
                    <span className="absolute inset-0 flex items-center justify-start font-display text-6xl md:text-8xl font-bold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      {item.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col items-start gap-4">
              <div className="flex flex-col items-start gap-2 text-white/30 text-xs tracking-[0.2em] uppercase font-sans">
                <a href="tel:+918137802554" className="hover:text-white transition-colors">+91 81378 02554</a>
                <a href="mailto:adilsarvadka@gmail.com" className="hover:text-white transition-colors">adilsarvadka@gmail.com</a>
              </div>
              <div className="flex items-center gap-4 text-white/30">
                <a href="https://www.instagram.com/aadiil.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  <FaInstagram size={16} />
                </a>
                <a href="https://www.linkedin.com/in/adil-sarvadka-51282a406" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  <FaTwitter size={16} />
                </a>
                <a href="https://github.com/aadiilin" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  <RiAwardFill size={16} />
                </a>
                <a href="https://wa.me/918137802554" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  <FaYoutube size={16} />
                </a>
                <a href="https://in.pinterest.com/aadiilin" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  <SiWebflow size={16} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {flash && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[200] bg-white pointer-events-none"
          />
        )}
      </AnimatePresence>
    </>
  )
}
