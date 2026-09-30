import { useState, useEffect } from 'react'
import { FaMusic } from 'react-icons/fa'
import { soundManager } from '@/lib/sound'

export function MusicToggle() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('aadiilin_music_enabled') === 'true'
    if (!saved) return

    setEnabled(true)
    // Browsers block autoplay before a user gesture — wait for the first one
    const start = () => soundManager.startMusic()
    window.addEventListener('pointerdown', start, { once: true })
    window.addEventListener('keydown', start, { once: true })
    return () => {
      window.removeEventListener('pointerdown', start)
      window.removeEventListener('keydown', start)
    }
  }, [])

  const toggleMusic = () => {
    const next = !enabled
    setEnabled(next)
    localStorage.setItem('aadiilin_music_enabled', String(next))
    if (next) {
      soundManager.startMusic()
    } else {
      soundManager.stopMusic()
    }
  }

  return (
    <button
      onClick={toggleMusic}
      onMouseEnter={() => soundManager.playHover()}
      className={`flex items-center gap-2 py-1.5 px-3 rounded-full border transition-all duration-300 group ${
        enabled
          ? 'bg-white/15 border-white/25 hover:bg-white/20'
          : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
      }`}
      aria-label="Toggle Background Music"
      aria-pressed={enabled}
      data-cursor="pointer"
    >
      <FaMusic size={12} className={enabled ? 'text-white' : 'text-white/50 group-hover:text-white/80'} />
      <span className="text-[11px] font-mono tracking-wider text-white/70 group-hover:text-white transition-colors">
        MUSIC {enabled ? 'ON' : 'OFF'}
      </span>
    </button>
  )
}
