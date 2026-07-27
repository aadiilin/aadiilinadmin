import { useState, useEffect } from 'react'

export function LiveClock({ timezone = 'America/Toronto', label = 'MONTREAL, CA' }: { timezone?: string; label?: string }) {
  const [timeStr, setTimeStr] = useState('')

  useEffect(() => {
    const updateTime = () => {
      try {
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: timezone,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
        setTimeStr(formatter.format(new Date()))
      } catch {
        setTimeStr(new Date().toLocaleTimeString())
      }
    }

    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [timezone])

  return (
    <div className="flex items-center gap-2 text-white/50 text-xs font-mono tracking-widest uppercase">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
      <span>{label}</span>
      <span className="text-white/80">{timeStr}</span>
    </div>
  )
}
