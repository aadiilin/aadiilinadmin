// Web Audio API Synthesizer for Jomor Design Interactive Sound Effects

const CHORDS: number[][] = [
  [261.63, 329.63, 392.0, 493.88], // Cmaj7: C4 E4 G4 B4
  [220.0, 261.63, 329.63, 392.0], // Am7: A3 C4 E4 G4
  [174.61, 220.0, 261.63, 329.63], // Fmaj7: F3 A3 C4 E4
  [164.81, 196.0, 246.94, 293.66], // Em7: E3 G3 B3 D4
]
const CHORD_DURATION = 4 // seconds per chord
const ARP_PATTERN = [0, 2, 1, 3, 2, 0, 3, 1]

class SoundManager {
  private ctx: AudioContext | null = null
  private enabled: boolean = false

  private musicEnabled = false
  private musicGain: GainNode | null = null
  private musicTimer: ReturnType<typeof setInterval> | null = null
  private nextChordTime = 0
  private chordIndex = 0

  constructor() {
    // Lazy init audio context on user interaction
  }

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioContextClass) {
        this.ctx = new AudioContextClass()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  public setEnabled(enabled: boolean) {
    this.enabled = enabled
    if (enabled) {
      this.initCtx()
      this.playChime()
    }
  }

  public isEnabled(): boolean {
    return this.enabled
  }

  // ---------- Background music ----------

  public startMusic() {
    if (this.musicEnabled) return
    this.initCtx()
    if (!this.ctx) return

    if (!this.musicGain) {
      this.musicGain = this.ctx.createGain()
      this.musicGain.connect(this.ctx.destination)
    }

    const now = this.ctx.currentTime
    this.musicGain.gain.cancelScheduledValues(now)
    this.musicGain.gain.setValueAtTime(this.musicGain.gain.value, now)
    this.musicGain.gain.linearRampToValueAtTime(1, now + 2)

    this.musicEnabled = true
    this.chordIndex = 0
    this.nextChordTime = now + 0.1
    this.musicTimer = setInterval(() => this.scheduleMusic(), 100)
  }

  public stopMusic() {
    if (!this.musicEnabled) return
    this.musicEnabled = false
    if (this.musicTimer) {
      clearInterval(this.musicTimer)
      this.musicTimer = null
    }
    if (this.ctx && this.musicGain) {
      const now = this.ctx.currentTime
      this.musicGain.gain.cancelScheduledValues(now)
      this.musicGain.gain.setValueAtTime(this.musicGain.gain.value, now)
      this.musicGain.gain.linearRampToValueAtTime(0, now + 0.6)
    }
  }

  public isMusicEnabled(): boolean {
    return this.musicEnabled
  }

  private scheduleMusic() {
    const ctx = this.ctx
    if (!ctx || !this.musicEnabled || !this.musicGain) return

    const horizon = ctx.currentTime + 0.7
    while (this.nextChordTime < horizon) {
      const chord = CHORDS[this.chordIndex % CHORDS.length]
      this.playPad(chord, this.nextChordTime)
      this.scheduleArp(chord, this.nextChordTime)
      this.nextChordTime += CHORD_DURATION
      this.chordIndex++
    }
  }

  private playPad(freqs: number[], startTime: number) {
    const ctx = this.ctx
    const dest = this.musicGain
    if (!ctx || !dest) return

    try {
      const filter = ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(500, startTime)
      filter.frequency.linearRampToValueAtTime(900, startTime + CHORD_DURATION)
      filter.Q.value = 0.4

      const padGain = ctx.createGain()
      padGain.gain.setValueAtTime(0, startTime)
      padGain.gain.linearRampToValueAtTime(0.04, startTime + 1.4)
      padGain.gain.setValueAtTime(0.04, startTime + CHORD_DURATION - 1.4)
      padGain.gain.linearRampToValueAtTime(0, startTime + CHORD_DURATION + 0.6)

      filter.connect(padGain)
      padGain.connect(dest)

      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator()
        osc.type = 'triangle'
        osc.frequency.value = freq
        osc.detune.value = i % 2 === 0 ? -5 : 5
        osc.connect(filter)
        osc.start(startTime)
        osc.stop(startTime + CHORD_DURATION + 0.8)
      })
    } catch {
      // Ignore audio errors
    }
  }

  private scheduleArp(freqs: number[], startTime: number) {
    const ctx = this.ctx
    const dest = this.musicGain
    if (!ctx || !dest) return

    try {
      const stepLength = CHORD_DURATION / ARP_PATTERN.length
      ARP_PATTERN.forEach((noteIdx, step) => {
        const t = startTime + step * stepLength
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.type = 'sine'
        osc.frequency.value = freqs[noteIdx % freqs.length] * 2

        const peak = step % 2 === 0 ? 0.028 : 0.016
        gain.gain.setValueAtTime(0, t)
        gain.gain.linearRampToValueAtTime(peak, t + 0.03)
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.7)

        osc.connect(gain)
        gain.connect(dest)
        osc.start(t)
        osc.stop(t + 0.8)
      })
    } catch {
      // Ignore audio errors
    }
  }

  // ---------- SFX ----------

  public playHover() {
    if (!this.enabled) return
    this.initCtx()
    if (!this.ctx) return

    try {
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(440, this.ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.04)

      gain.gain.setValueAtTime(0.015, this.ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.04)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start()
      osc.stop(this.ctx.currentTime + 0.04)
    } catch {
      // Ignore audio errors
    }
  }

  public playClick() {
    if (!this.enabled) return
    this.initCtx()
    if (!this.ctx) return

    try {
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(220, this.ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(110, this.ctx.currentTime + 0.08)

      gain.gain.setValueAtTime(0.05, this.ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.08)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start()
      osc.stop(this.ctx.currentTime + 0.08)
    } catch {
      // Ignore audio errors
    }
  }

  public playChime() {
    this.initCtx()
    if (!this.ctx) return

    try {
      const now = this.ctx.currentTime
      const notes = [523.25, 659.25, 783.99, 1046.50] // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator()
        const gain = this.ctx!.createGain()

        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, now + idx * 0.06)

        gain.gain.setValueAtTime(0, now + idx * 0.06)
        gain.gain.linearRampToValueAtTime(0.03, now + idx * 0.06 + 0.02)
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 0.3)

        osc.connect(gain)
        gain.connect(this.ctx!.destination)

        osc.start(now + idx * 0.06)
        osc.stop(now + idx * 0.06 + 0.3)
      })
    } catch {
      // Ignore audio errors
    }
  }
}

export const soundManager = new SoundManager()
