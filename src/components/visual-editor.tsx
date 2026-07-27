import { useState } from "react"
import { SiteContent, DEFAULT_THEME, DEFAULT_DESIGN, applyTheme } from "@/lib/content-store"
import { Plus, Trash2, ChevronUp, ChevronDown, Eye, EyeOff } from "lucide-react"

type Selection =
  | { type: "hero"; field: "line1" | "line2" | "line3" }
  | { type: "stat"; index: number }
  | { type: "skill"; index: number }
  | { type: "project"; index: number }
  | { type: "service-slide"; index: number }
  | { type: "service-item"; slide: number; index: number }
  | { type: "industry"; index: number }
  | { type: "about"; field: "intro" | "paragraph1" | "paragraph2" }

interface Props {
  content: SiteContent
  onChange: (content: SiteContent) => void
}

const COLOR_KEYS: { key: keyof SiteContent["theme"]; label: string }[] = [
  { key: "bg", label: "Bg" },
  { key: "surface", label: "Surface" },
  { key: "subtle", label: "Subtle" },
  { key: "accent", label: "Accent" },
  { key: "accentHover", label: "Hover" },
  { key: "text", label: "Text" },
  { key: "muted", label: "Muted" },
  { key: "faint", label: "Faint" },
  { key: "line", label: "Line" },
]

const DESIGN_TOGGLES: { key: keyof SiteContent["design"]; label: string }[] = [
  { key: "showMarquee", label: "Marquee" },
  { key: "showChatBot", label: "Chat Bot" },
  { key: "showParticles", label: "Particles" },
  { key: "showSignature", label: "Signature" },
  { key: "showScrollProgress", label: "Scroll Bar" },
]

export function VisualEditor({ content, onChange }: Props) {
  const [sel, setSel] = useState<Selection | null>(null)
  const [leftOpen, setLeftOpen] = useState(true)

  const th = content.theme

  function update<K extends keyof SiteContent>(field: K, value: SiteContent[K]) {
    const next = { ...content, [field]: value }
    onChange(next)
    if (field === "theme") applyTheme(value as SiteContent["theme"])
  }

  function setThemeColor(key: keyof SiteContent["theme"], value: string) {
    const next = { ...content.theme, [key]: value }
    update("theme", next)
  }

  function setDesign<K extends keyof SiteContent["design"]>(key: K, value: SiteContent["design"][K]) {
    update("design", { ...content.design, [key]: value })
  }

  function updateHero(field: "line1" | "line2" | "line3", value: string) {
    onChange({ ...content, hero: { ...content.hero, [field]: value } })
  }

  function updateStat(i: number, field: "value" | "label", value: string) {
    const stats = [...content.stats]
    stats[i] = { ...stats[i], [field]: value }
    onChange({ ...content, stats })
  }

  function moveStat(from: number, to: number) {
    const stats = [...content.stats]
    const [m] = stats.splice(from, 1)
    stats.splice(to, 0, m)
    onChange({ ...content, stats })
  }

  function updateSkill(i: number, value: string) {
    const skills = [...content.skills]
    skills[i] = value
    onChange({ ...content, skills })
  }

  function removeSkill(i: number) {
    onChange({ ...content, skills: content.skills.filter((_, j) => j !== i) })
    setSel(null)
  }

  function addSkill() {
    onChange({ ...content, skills: [...content.skills, ""] })
  }

  function moveSkill(from: number, to: number) {
    const skills = [...content.skills]
    const [m] = skills.splice(from, 1)
    skills.splice(to, 0, m)
    onChange({ ...content, skills })
  }

  function addDecor() {
    update("design", {
      ...content.design,
      decorElements: [...content.design.decorElements, { type: "blob", position: "top-right", color: th.accent, size: 200, opacity: 0.15 }],
    })
  }

  function removeDecor(i: number) {
    update("design", {
      ...content.design,
      decorElements: content.design.decorElements.filter((_, j) => j !== i),
    })
  }

  function updateDecor(i: number, field: string, value: any) {
    const els = [...content.design.decorElements]
    els[i] = { ...els[i], [field]: value }
    update("design", { ...content.design, decorElements: els })
  }

  function projectFields(i: number) {
    return content.projects[i] ? (["title", "role", "year", "category"] as const) : []
  }

  function renderProperties() {
    if (!sel) return (
      <div className="p-4 text-center text-white/30 text-xs mt-10 leading-relaxed">
        Click any element on the canvas<br />to edit its content
      </div>
    )

    if (sel.type === "hero") {
      return (
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full" style={{ background: th.accent }} />
            <span className="text-xs font-mono text-white/60 uppercase tracking-wider">Hero Text</span>
          </div>
          {(["line1", "line2", "line3"] as const).map((f) => (
            <div key={f}>
              <label className="text-[10px] font-mono text-white/40 block mb-1">{f}</label>
              <input value={content.hero[f]} onChange={(e) => updateHero(f, e.target.value)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-sm focus:outline-none focus:border-[#FF7A00]" />
            </div>
          ))}
        </div>
      )
    }

    if (sel.type === "stat") {
      const stat = content.stats[sel.index]
      if (!stat) return null
      return (
        <div className="space-y-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ background: th.accent }} />
              <span className="text-xs font-mono text-white/60 uppercase tracking-wider">Stat #{sel.index + 1}</span>
            </div>
            <div className="flex gap-1">
              {sel.index > 0 && <button onClick={() => moveStat(sel.index, sel.index - 1)} className="p-1 text-white/30 hover:text-white"><ChevronUp size={12} /></button>}
              {sel.index < content.stats.length - 1 && <button onClick={() => moveStat(sel.index, sel.index + 1)} className="p-1 text-white/30 hover:text-white"><ChevronDown size={12} /></button>}
            </div>
          </div>
          <div>
            <label className="text-[10px] font-mono text-white/40 block mb-1">Value</label>
            <input value={stat.value} onChange={(e) => updateStat(sel.index, "value", e.target.value)}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-sm focus:outline-none focus:border-[#FF7A00]" />
          </div>
          <div>
            <label className="text-[10px] font-mono text-white/40 block mb-1">Label</label>
            <input value={stat.label} onChange={(e) => updateStat(sel.index, "label", e.target.value)}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-sm focus:outline-none focus:border-[#FF7A00]" />
          </div>
        </div>
      )
    }

    if (sel.type === "skill") {
      const skill = content.skills[sel.index]
      return (
        <div className="space-y-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ background: th.accent }} />
              <span className="text-xs font-mono text-white/60 uppercase tracking-wider">Skill #{sel.index + 1}</span>
            </div>
            <div className="flex gap-1">
              {sel.index > 0 && <button onClick={() => moveSkill(sel.index, sel.index - 1)} className="p-1 text-white/30 hover:text-white"><ChevronUp size={12} /></button>}
              {sel.index < content.skills.length - 1 && <button onClick={() => moveSkill(sel.index, sel.index + 1)} className="p-1 text-white/30 hover:text-white"><ChevronDown size={12} /></button>}
              <button onClick={() => removeSkill(sel.index)} className="p-1 text-white/30 hover:text-red-400"><Trash2 size={12} /></button>
            </div>
          </div>
          <input value={skill} onChange={(e) => updateSkill(sel.index, e.target.value)}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-sm focus:outline-none focus:border-[#FF7A00]" />
          <button onClick={addSkill} className="text-xs flex items-center gap-1 px-3 py-1.5 bg-white/10 rounded-full hover:bg-white/20 transition-colors"><Plus size={10} /> Add Skill</button>
        </div>
      )
    }

    if (sel.type === "project") {
      const proj = content.projects[sel.index]
      if (!proj) return null
      return (
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full" style={{ background: th.accent }} />
            <span className="text-xs font-mono text-white/60 uppercase tracking-wider">Project #{sel.index + 1}</span>
          </div>
          {(["title", "role", "year", "category", "image"] as const).map((f) => (
            <div key={f}>
              <label className="text-[10px] font-mono text-white/40 block mb-1">{f}</label>
              <input value={proj[f]} onChange={(e) => {
                const projects = [...content.projects]
                projects[sel.index] = { ...projects[sel.index], [f]: e.target.value }
                update("projects", projects)
              }}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-sm focus:outline-none focus:border-[#FF7A00]" />
            </div>
          ))}
        </div>
      )
    }

    if (sel.type === "service-slide") {
      const slide = content.services.slides[sel.index]
      if (!slide) return null
      return (
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full" style={{ background: th.accent }} />
            <span className="text-xs font-mono text-white/60 uppercase tracking-wider">Service Slide #{sel.index + 1}</span>
          </div>
          <div>
            <label className="text-[10px] font-mono text-white/40 block mb-1">Title</label>
            <input value={slide.title} onChange={(e) => {
              const slides = [...content.services.slides]
              slides[sel.index] = { ...slides[sel.index], title: e.target.value }
              update("services", { ...content.services, slides })
            }}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-sm focus:outline-none focus:border-[#FF7A00]" />
          </div>
          {slide.items.map((item, ii) => (
            <div key={ii} className="border-t border-white/10 pt-3 mt-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-white/40">Item {ii + 1} · {item.num}</span>
                <button onClick={() => setSel({ type: "service-item", slide: sel.index, index: ii })}
                  className="text-[10px] px-2 py-0.5 bg-white/10 rounded hover:bg-white/20">Edit</button>
              </div>
            </div>
          ))}
        </div>
      )
    }

    if (sel.type === "service-item") {
      const item = content.services.slides[sel.slide]?.items[sel.index]
      if (!item) return null
      return (
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full" style={{ background: th.accent }} />
            <span className="text-xs font-mono text-white/60 uppercase tracking-wider">Slide {sel.slide + 1} · Item {sel.index + 1}</span>
          </div>
          <div>
            <label className="text-[10px] font-mono text-white/40 block mb-1">Title</label>
            <input value={item.title} onChange={(e) => {
              const slides = [...content.services.slides]
              const items = [...slides[sel.slide].items]
              items[sel.index] = { ...items[sel.index], title: e.target.value }
              slides[sel.slide] = { ...slides[sel.slide], items }
              update("services", { ...content.services, slides })
            }}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-sm focus:outline-none focus:border-[#FF7A00]" />
          </div>
          <div>
            <label className="text-[10px] font-mono text-white/40 block mb-1">Description</label>
            <textarea value={item.desc} onChange={(e) => {
              const slides = [...content.services.slides]
              const items = [...slides[sel.slide].items]
              items[sel.index] = { ...items[sel.index], desc: e.target.value }
              slides[sel.slide] = { ...slides[sel.slide], items }
              update("services", { ...content.services, slides })
            }}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-sm focus:outline-none focus:border-[#FF7A00] resize-none" rows={3} />
          </div>
        </div>
      )
    }

    if (sel.type === "industry") {
      const ind = content.industries[sel.index]
      if (!ind) return null
      return (
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full" style={{ background: th.accent }} />
            <span className="text-xs font-mono text-white/60 uppercase tracking-wider">Industry #{sel.index + 1}</span>
          </div>
          <div>
            <label className="text-[10px] font-mono text-white/40 block mb-1">Title</label>
            <input value={ind.title} onChange={(e) => {
              const industries = [...content.industries]
              industries[sel.index] = { ...industries[sel.index], title: e.target.value }
              update("industries", industries)
            }}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-sm focus:outline-none focus:border-[#FF7A00]" />
          </div>
          <div>
            <label className="text-[10px] font-mono text-white/40 block mb-1">Description</label>
            <textarea value={ind.desc} onChange={(e) => {
              const industries = [...content.industries]
              industries[sel.index] = { ...industries[sel.index], desc: e.target.value }
              update("industries", industries)
            }}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-sm focus:outline-none focus:border-[#FF7A00] resize-none" rows={2} />
          </div>
        </div>
      )
    }

    if (sel.type === "about") {
      return (
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full" style={{ background: th.accent }} />
            <span className="text-xs font-mono text-white/60 uppercase tracking-wider">About Text</span>
          </div>
          {(["intro", "paragraph1", "paragraph2"] as const).map((f) => (
            <div key={f}>
              <label className="text-[10px] font-mono text-white/40 block mb-1">{f}</label>
              <textarea value={content.about[f]} onChange={(e) => onChange({ ...content, about: { ...content.about, [f]: e.target.value } })}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-sm focus:outline-none focus:border-[#FF7A00] resize-none" rows={f === "intro" ? 2 : 3} />
            </div>
          ))}
        </div>
      )
    }

    return null
  }

  const sectionHover = "border-2 border-transparent hover:border-[#FF7A00]/30 rounded-xl transition-colors relative cursor-pointer"
  const selectedRing = (isSelected: boolean) => isSelected ? "ring-2 ring-[#FF7A00]" : ""

  return (
    <div className="flex h-full" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
      {/* Left Toolbar */}
      <div className={`${leftOpen ? "w-60" : "w-0"} shrink-0 overflow-hidden transition-all duration-200 border-r border-white/10 bg-zinc-900/50`}>
        <div className="p-4 space-y-5 overflow-y-auto h-full">
          {/* Theme Colors */}
          <div>
            <div className="text-xs font-mono text-white/40 uppercase tracking-wider mb-3">Theme Colors</div>
            <div className="grid grid-cols-3 gap-2">
              {COLOR_KEYS.map(({ key, label }) => (
                <div key={key} className="flex flex-col items-center gap-1">
                  <input type="color" value={th[key] === "transparent" ? "#ffffff" : th[key]}
                    onChange={(e) => setThemeColor(key, e.target.value)}
                    className="w-8 h-8 rounded-lg cursor-pointer border-0 p-0 bg-transparent" style={{ border: `1px solid ${th.line}` }} />
                  <span className="text-[8px] font-mono text-white/30">{label}</span>
                </div>
              ))}
            </div>
            <button onClick={() => update("theme", { ...DEFAULT_THEME })}
              className="mt-2 text-[10px] px-2 py-1 bg-white/10 rounded hover:bg-white/20 w-full">Reset</button>
          </div>

          {/* Design Toggles */}
          <div>
            <div className="text-xs font-mono text-white/40 uppercase tracking-wider mb-3">Visibility</div>
            <div className="space-y-1.5">
              {DESIGN_TOGGLES.map(({ key, label }) => (
                <label key={key} className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/5 cursor-pointer transition-colors">
                  <div className={`w-7 h-4 rounded-full relative transition-colors ${content.design[key] ? "bg-[#FF7A00]" : "bg-white/20"}`}>
                    <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${content.design[key] ? "left-3.5" : "left-0.5"}`} />
                  </div>
                  <span className="text-xs text-white/70">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Section Spacing */}
          <div>
            <div className="text-xs font-mono text-white/40 uppercase tracking-wider mb-3">Spacing</div>
            <div className="flex gap-1">
              {(["compact", "normal", "spacious"] as const).map((s) => (
                <button key={s} onClick={() => setDesign("sectionSpacing", s)}
                  className={`flex-1 px-2 py-1.5 rounded-lg text-[10px] font-medium transition-colors ${
                    content.design.sectionSpacing === s ? "bg-[#FF7A00] text-white" : "bg-white/10 text-white/60 hover:bg-white/20"
                  }`}>
                  {s[0].toUpperCase() + s.slice(1, 3)}
                </button>
              ))}
            </div>
          </div>

          {/* Decor Elements */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-white/40 uppercase tracking-wider">Decor</span>
              <button onClick={addDecor} className="text-[10px] flex items-center gap-0.5 px-2 py-1 bg-white/10 rounded hover:bg-white/20"><Plus size={8} /> Add</button>
            </div>
            {content.design.decorElements.map((el, i) => (
              <div key={i} className="bg-white/5 rounded-lg p-2 mb-2 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-white/40">#{i + 1} {el.type}</span>
                  <button onClick={() => removeDecor(i)} className="text-white/30 hover:text-red-400"><Trash2 size={10} /></button>
                </div>
                <select value={el.type} onChange={(e) => updateDecor(i, "type", e.target.value)}
                  className="w-full px-2 py-1 bg-white/10 border border-white/20 rounded text-[10px] focus:outline-none">
                  <option value="blob">Blob</option>
                  <option value="circle">Circle</option>
                  <option value="gradient">Gradient</option>
                  <option value="dots">Dots</option>
                  <option value="grid">Grid</option>
                </select>
                <select value={el.position} onChange={(e) => updateDecor(i, "position", e.target.value)}
                  className="w-full px-2 py-1 bg-white/10 border border-white/20 rounded text-[10px] focus:outline-none">
                  {["top-left", "top-right", "bottom-left", "bottom-right", "center"].map(p =>
                    <option key={p} value={p}>{p}</option>
                  )}
                </select>
                <div className="flex items-center gap-2">
                  <input type="color" value={el.color} onChange={(e) => updateDecor(i, "color", e.target.value)}
                    className="w-6 h-6 rounded cursor-pointer border-0 p-0 bg-transparent" />
                  <input type="range" min="50" max="600" value={el.size} onChange={(e) => updateDecor(i, "size", Number(e.target.value))}
                    className="flex-1 accent-[#FF7A00]" style={{ height: 3 }} />
                  <span className="text-[8px] font-mono text-white/30 w-8 text-right">{el.size}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[8px] font-mono text-white/30 w-8">Op</span>
                  <input type="range" min="0" max="100" value={Math.round(el.opacity * 100)}
                    onChange={(e) => updateDecor(i, "opacity", Number(e.target.value) / 100)}
                    className="flex-1 accent-[#FF7A00]" style={{ height: 3 }} />
                  <span className="text-[8px] font-mono text-white/30 w-8 text-right">{Math.round(el.opacity * 100)}%</span>
                </div>
              </div>
            ))}
            {content.design.decorElements.length === 0 && (
              <p className="text-[10px] text-white/20">Click + Add to place decorative shapes</p>
            )}
          </div>
        </div>
      </div>

      {/* Center: Canvas */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-zinc-900/30 shrink-0">
          <button onClick={() => setLeftOpen(!leftOpen)} className="text-xs px-2 py-1 bg-white/10 rounded hover:bg-white/20 text-white/60">
            {leftOpen ? "◀ Hide" : "▶ Tools"}
          </button>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-white/30">canvas</span>
            <span className="text-[10px] font-mono text-white/20">·</span>
            <span className="text-[10px] font-mono" style={{ color: th.accent }}>{th.accent}</span>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 overflow-y-auto p-6 bg-zinc-950/80">
          <div style={{
            background: th.bg, color: th.text,
            borderRadius: 16, overflow: "hidden",
            maxWidth: 780, margin: "0 auto",
            boxShadow: "0 20px 80px rgba(0,0,0,0.4)",
          }}>
            {/* Canvas header bar */}
            <div style={{ padding: "4px 16px", background: th.accent, color: "#fff", fontSize: 9, fontFamily: "'Space Mono', monospace", textTransform: "uppercase", letterSpacing: "0.2em", display: "flex", justifyContent: "space-between" }}>
              <span>Click any element → edit in right panel</span>
              <span style={{ opacity: 0.6 }}>v{content.design.sectionSpacing}</span>
            </div>

            {/* Hero */}
            <div onClick={() => setSel({ type: "hero", field: "line1" })} className={sectionHover} style={{ padding: "32px 28px 24px", borderBottom: `1px solid ${th.line}` }}>
              <div style={{ fontSize: 10, fontFamily: "'Space Mono', monospace", color: th.muted, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 10 }}>Freelance Graphic Designer</div>
              <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 30, lineHeight: 1.05, letterSpacing: "-0.03em" }}>
                {(["line1", "line2", "line3"] as const).map((f) => (
                  <div key={f} onClick={(e) => { e.stopPropagation(); setSel({ type: "hero", field: f }) }}
                    className={selectedRing(sel?.type === "hero" && sel.field === f)} style={{ color: f === "line2" ? th.accent : undefined, padding: "1px 4px", margin: "0 -4px", borderRadius: 4 }}>
                    {content.hero[f]}
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div onClick={() => setSel({ type: "stat", index: 0 })} className={sectionHover} style={{ padding: "20px 28px", borderBottom: `1px solid ${th.line}` }}>
              <div style={{ fontSize: 10, fontFamily: "'Space Mono', monospace", color: th.muted, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 12 }}>Stats</div>
              <div style={{ display: "grid", gridTemplateColumns: `repeat(${content.stats.length}, 1fr)`, gap: 10 }}>
                {content.stats.map((stat, i) => (
                  <div key={i} onClick={(e) => { e.stopPropagation(); setSel({ type: "stat", index: i }) }}
                    className={selectedRing(sel?.type === "stat" && sel.index === i)}
                    style={{ padding: "14px 12px", textAlign: "center", background: th.surface, borderRadius: 12, border: `1px solid ${th.line}` }}>
                    <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 22, color: th.accent }}>{stat.value}</div>
                    <div style={{ fontSize: 10, color: th.muted, marginTop: 2 }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div onClick={() => setSel({ type: "skill", index: 0 })} className={sectionHover} style={{ padding: "20px 28px", borderBottom: `1px solid ${th.line}` }}>
              <div style={{ fontSize: 10, fontFamily: "'Space Mono', monospace", color: th.muted, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 10 }}>Skills</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {content.skills.map((skill, i) => (
                  <span key={i} onClick={(e) => { e.stopPropagation(); setSel({ type: "skill", index: i }) }}
                    className={selectedRing(sel?.type === "skill" && sel.index === i)}
                    style={{ padding: "5px 14px", borderRadius: 9999, fontSize: 11, fontFamily: "'Space Mono', monospace", background: th.surface, border: `1px solid ${th.line}`, cursor: "pointer" }}>
                    {skill || <span style={{ color: th.faint }}>— empty —</span>}
                  </span>
                ))}
              </div>
            </div>

            {/* Projects (first 3) */}
            <div onClick={() => setSel({ type: "project", index: 0 })} className={sectionHover} style={{ padding: "20px 28px", borderBottom: `1px solid ${th.line}` }}>
              <div style={{ fontSize: 10, fontFamily: "'Space Mono', monospace", color: th.muted, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 10 }}>Featured Work</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                {content.projects.slice(0, 3).map((proj, i) => (
                  <div key={proj.slug} onClick={(e) => { e.stopPropagation(); setSel({ type: "project", index: i }) }}
                    className={selectedRing(sel?.type === "project" && sel.index === i)}
                    style={{ borderRadius: 12, overflow: "hidden", border: `1px solid ${th.line}` }}>
                    <div style={{ aspectRatio: "4/3", background: th.subtle, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: th.faint, fontFamily: "'Space Mono', monospace", padding: 4, textAlign: "center" }}>
                      {proj.title}
                    </div>
                    <div style={{ padding: "8px 10px" }}>
                      <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 11 }}>{proj.title}</div>
                      <div style={{ fontSize: 9, color: th.muted, marginTop: 2, fontFamily: "'Space Mono', monospace" }}>{proj.role} · {proj.year}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Services */}
            <div onClick={() => setSel({ type: "service-slide", index: 0 })} className={sectionHover} style={{ padding: "20px 28px", borderBottom: `1px solid ${th.line}` }}>
              <div style={{ fontSize: 10, fontFamily: "'Space Mono', monospace", color: th.muted, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 8 }}>Services</div>
              <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 15 }}>{content.services.slides[0].title}</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 10 }}>
                {content.services.slides[0].items.map((item, ii) => (
                  <div key={ii} onClick={(e) => { e.stopPropagation(); setSel({ type: "service-item", slide: 0, index: ii }) }}
                    className={selectedRing(sel?.type === "service-item" && sel.slide === 0 && sel.index === ii)}
                    style={{ background: th.surface, borderRadius: 10, padding: 12, border: `1px solid ${th.line}` }}>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: th.accent }}>{item.num}</div>
                    <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 600, fontSize: 11, marginTop: 4 }}>{item.title}</div>
                    <div style={{ fontSize: 9, color: th.muted, marginTop: 4, lineHeight: 1.4 }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Industries */}
            <div onClick={() => setSel({ type: "industry", index: 0 })} className={sectionHover} style={{ padding: "20px 28px", borderBottom: `1px solid ${th.line}` }}>
              <div style={{ fontSize: 10, fontFamily: "'Space Mono', monospace", color: th.muted, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 10 }}>Industries</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {content.industries.map((ind, i) => (
                  <div key={i} onClick={(e) => { e.stopPropagation(); setSel({ type: "industry", index: i }) }}
                    className={selectedRing(sel?.type === "industry" && sel.index === i)}
                    style={{ background: th.surface, borderRadius: 12, padding: 14, border: `1px solid ${th.line}` }}>
                    <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 14 }}>{ind.title}</div>
                    <div style={{ fontSize: 10, color: th.muted, marginTop: 4, lineHeight: 1.5 }}>{ind.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* About */}
            <div onClick={() => setSel({ type: "about", field: "intro" })} className={sectionHover} style={{ padding: "20px 28px" }}>
              <div style={{ fontSize: 10, fontFamily: "'Space Mono', monospace", color: th.muted, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 8 }}>About</div>
              {(["intro", "paragraph1", "paragraph2"] as const).map((f) => (
                <div key={f} onClick={(e) => { e.stopPropagation(); setSel({ type: "about", field: f }) }}
                  className={selectedRing(sel?.type === "about" && sel.field === f)}
                  style={{ fontSize: f === "intro" ? 17 : 12, fontFamily: f === "intro" ? "'Bricolage Grotesque', sans-serif" : undefined, fontWeight: f === "intro" ? 700 : undefined, color: f === "intro" ? th.text : th.muted, marginTop: f === "intro" ? 0 : 10, lineHeight: 1.6, padding: "2px 4px", margin: "0 -4px", borderRadius: 4 }}>
                  {content.about[f]}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right: Properties */}
      <div className="w-72 shrink-0 border-l border-white/10 bg-zinc-900/50 overflow-y-auto">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <span className="text-xs font-mono text-white/40 uppercase tracking-wider">Properties</span>
          {sel && <button onClick={() => setSel(null)} className="text-[10px] text-white/30 hover:text-white">✕</button>}
        </div>
        <div className="p-4">
          {renderProperties()}
        </div>
      </div>
    </div>
  )
}
