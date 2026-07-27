import { Link } from 'wouter'
import { FaInstagram, FaTwitter, FaGithub, FaWhatsapp, FaPinterest } from 'react-icons/fa'
import { soundManager } from '@/lib/sound'

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#0A0A0A] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-24">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="flex items-center gap-3">
            <span className="font-display text-xl md:text-2xl font-black uppercase tracking-tight text-white">
              Jomor Design
            </span>
            <span className="font-serif text-xl md:text-2xl italic text-white/40">&amp;</span>
            <span className="font-display text-xl md:text-2xl font-bold text-white/70">digital experiences</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-6 text-white/40 text-xs font-mono tracking-widest uppercase">
            <div className="flex items-center gap-4 text-white/60">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => soundManager.playHover()}
                className="hover:text-white transition-colors"
                data-cursor="pointer"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => soundManager.playHover()}
                className="hover:text-white transition-colors"
                data-cursor="pointer"
              >
                <FaTwitter size={18} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => soundManager.playHover()}
                className="hover:text-white transition-colors"
                data-cursor="pointer"
              >
                <FaGithub size={18} />
              </a>
              <a
                href="https://wa.me"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => soundManager.playHover()}
                className="hover:text-white transition-colors"
                data-cursor="pointer"
              >
                <FaWhatsapp size={18} />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => soundManager.playHover()}
                className="hover:text-white transition-colors"
                data-cursor="pointer"
              >
                <FaPinterest size={18} />
              </a>
            </div>

            <span className="text-white/30">&copy; 2025–2026 Jomor Design — All Rights Reserved</span>
            <Link
              href="/privacy-policy"
              onMouseEnter={() => soundManager.playHover()}
              onClick={() => soundManager.playClick()}
              className="hover:text-white border-b border-white/20 pb-0.5 transition-colors"
              data-cursor="pointer"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
