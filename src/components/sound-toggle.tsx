import { useState, useEffect } from 'react'
import { soundManager } from '@/lib/sound'

export function SoundToggle() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('jomor_sound_enabled') === 'true'
    setEnabled(saved)
    if (saved) {
      soundManager.setEnabled(true)
    }
  }, [])

  const toggleSound = () => {
    const next = !enabled
    setEnabled(next)
    localStorage.setItem('jomor_sound_enabled', String(next))
    soundManager.setEnabled(next)
  }

  return (
    <button
      onClick={toggleSound}
      onMouseEnter={() => soundManager.playHover()}
      className="flex items-center gap-2 py-1.5 px-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
      aria-label="Toggle Sound"
      data-cursor="pointer"
    >
      <div className="flex items-end gap-[2px] h-3 w-3">
        <span
          className={`w-[2px] bg-white rounded-full transition-all duration-300 ${
            enabled ? 'h-3 animate-pulse' : 'h-1.5 opacity-40'
          }`}
        />
        <span
          className={`w-[2px] bg-white rounded-full transition-all duration-300 ${
            enabled ? 'h-2 animate-bounce' : 'h-3 opacity-40'
          }`}
          style={{ animationDelay: '150ms' }}
        />
        <span
          className={`w-[2px] bg-white rounded-full transition-all duration-300 ${
            enabled ? 'h-3.5 animate-pulse' : 'h-2 opacity-40'
          }`}
          style={{ animationDelay: '300ms' }}
        />
      </div>
      <span className="text-[11px] font-mono tracking-wider text-white/70 group-hover:text-white transition-colors">
        SOUND {enabled ? 'ON' : 'OFF'}
      </span>
    </button>
  )
}
