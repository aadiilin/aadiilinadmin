import { Link } from 'wouter'
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'
import { SiWebflow } from 'react-icons/si'
import { RiAwardFill } from 'react-icons/ri'

export function Footer() {
  return (
    <footer className="relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-24">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="flex items-center gap-3">
            <span className="font-display text-xl md:text-2xl font-bold text-white">branding</span>
            <span className="font-serif text-xl md:text-2xl italic text-white/40">&amp;</span>
            <span className="font-display text-xl md:text-2xl font-bold text-white">visual design</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 text-white/40 text-xs tracking-widest uppercase font-sans">
            <div className="flex items-center gap-4">
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
            <span className="text-white/30">&copy;2025-2026 Aadiilin - All Rights Reserved</span>
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
