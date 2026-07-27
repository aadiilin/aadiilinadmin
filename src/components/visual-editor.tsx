import { useState, useRef, useCallback, useEffect } from "react"
import { SiteContent, DEFAULT_THEME } from "@/lib/content-store"
import { Plus, Trash2, Move, RotateCw } from "lucide-react"

type Selection =
  | { type: "hero"; field: "line1" | "line2" | "line3" }
  | { type: "stat"; index: number }
  | { type: "skill"; index: number }
  | { type: "project"; index: number }
  | { type: "service-slide"; index: number }
  | { type: "service-item"; slide: number; index: number }
  | { type: "industry"; index: number }
  | { type: "about"; field: "intro" | "paragraph1" | "paragraph2" }
  | { type: "free-text"; index: number }

interface Props {
  content: SiteContent
  onChange: (content: SiteContent) => void
}

const COLOR_KEYS: { key: keyof SiteContent["theme"]; label: string }[] = [
  { key: "bg", label: "Bg" }, { key: "surface", label: "Surface" }, { key: "subtle", label: "Subtle" },
  { key: "accent", label: "Accent" }, { key: "accentHover", label: "Hover" },
  { key: "text", label: "Text" }, { key: "muted", label: "Muted" }, { key: "faint", label: "Faint" }, { key: "line", label: "Line" },
]

const DESIGN_TOGGLES: { key: keyof SiteContent["design"]; label: string }[] = [
  { key: "showMarquee", label: "Marquee" }, { key: "showChatBot", label: "Chat Bot" },
  { key: "showParticles", label: "Particles" }, { key: "showSignature", label: "Signature" },
  { key: "showScrollProgress", label: "Scroll Bar" },
]

// Which section each element belongs to (for offset key names)
const SECTION_KEYS = ["hero", "stats", "skills", "projects", "services", "industries", "about"] as const

export function VisualEditor({ content, onChange }: Props) {
  const [sel, setSel] = useState<Selection | null>(null)
  const [leftOpen, setLeftOpen] = useState(true)
  const [dragging, setDragging] = useState<{ key: string; startX: number; startY: number; origX: number; origY: number } | null>(null)
  const canvasRef = useRef<HTMLDivElement>(null)

  // Get offset for an element
  const getOff = (key: string) => content.design.elementOffsets[key] || { x: 0, y: 0 }
  const setOff = (key: string, x: number, y: number) => {
    onChange({
      ...content,
      design: {
        ...content.design,
        elementOffsets: { ...content.design.elementOffsets, [key]: { x, y } },
      },
    })
  }

  // Drag handlers
  const handleDragStart = useCallback((key: string, e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    const off = getOff(key)
    setDragging({ key, startX: e.clientX, startY: e.clientY, origX: off.x, origY: off.y })
  }, [content.design.elementOffsets])

  useEffect(() => {
    if (!dragging) return
    const handleMove = (e: MouseEvent) => {
      const dx = e.clientX - dragging.startX
      const dy = e.clientY - dragging.startY
      setOff(dragging.key, dragging.origX + dx, dragging.origY + dy)
    }
    const handleUp = () => setDragging(null)
    window.addEventListener("mousemove", handleMove)
    window.addEventListener("mouseup", handleUp)
    return () => { window.removeEventListener("mousemove", handleMove); window.removeEventListener("mouseup", handleUp) }
  }, [dragging])

  const th = content.theme

  function update<K extends keyof SiteContent>(field: K, value: SiteContent[K]) {
    const next = { ...content, [field]: value }
    onChange(next)
  }

  function setThemeColor(key: keyof SiteContent["theme"], value: string) {
    update("theme", { ...content.theme, [key]: value })
  }

  function setDesign<K extends keyof SiteContent["design"]>(key: K, value: SiteContent["design"][K]) {
    update("design", { ...content.design, [key]: value })
  }

  function resetAllOffsets() {
    update("design", { ...content.design, elementOffsets: {} })
  }

  function updateHero(field: "line1" | "line2" | "line3", value: string) {
    onChange({ ...content, hero: { ...content.hero, [field]: value } })
  }

  function updateStat(i: number, field: "value" | "label", value: string) {
    const stats = [...content.stats]
    stats[i] = { ...stats[i], [field]: value }
    onChange({ ...content, stats })
  }

  function updateSkill(i: number, value: string) {
    const skills = [...content.skills]
    skills[i] = value
    onChange({ ...content, skills })
  }

  function removeSkill(i: number) { onChange({ ...content, skills: content.skills.filter((_, j) => j !== i) }); setSel(null) }
  function addSkill() { onChange({ ...content, skills: [...content.skills, ""] }) }
  function moveSkill(from: number, to: number) { const s = [...content.skills]; const [m] = s.splice(from, 1); s.splice(to, 0, m); onChange({ ...content, skills: s }) }

  function addFreeText() {
    const idx = (content.design.freeTexts || []).length
    const freeTexts = [...(content.design.freeTexts || []), { text: "Double click to edit", fontSize: 24, color: th.accent }]
    update("design", { ...content.design, freeTexts })
    setTimeout(() => setSel({ type: "free-text", index: idx }), 50)
  }

  function addDecor() {
    update("design", {
      ...content.design,
      decorElements: [...content.design.decorElements, { type: "blob", position: "top-right", color: th.accent, size: 200, opacity: 0.15 }],
    })
  }

  function removeDecor(i: number) {
    update("design", { ...content.design, decorElements: content.design.decorElements.filter((_, j) => j !== i) })
  }

  function updateDecor(i: number, field: string, value: any) {
    const els = [...content.design.decorElements]
    els[i] = { ...els[i], [field]: value }
    update("design", { ...content.design, decorElements: els })
  }

  // Draggable section wrapper
  function DraggableSection({ sectionKey, label, children, onSelect }: {
    sectionKey: string; label: string; children: React.ReactNode; onSelect: () => void
  }) {
    const off = getOff(sectionKey)
    const isDragging = dragging?.key === sectionKey
    return (
      <div
        onClick={onSelect}
        className={`relative group cursor-default ${isDragging ? "z-50" : "z-0"}`}
        style={{
          transform: `translate(${off.x}px, ${off.y}px)`,
          transition: isDragging ? "none" : "transform 0.05s ease",
          border: sel && getSectionKey(sel) === sectionKey ? `2px solid ${th.accent}` : "2px solid transparent",
          borderRadius: 12,
          marginBottom: 4,
        }}
      >
        {/* Drag handle (always visible) */}
        <div
          onMouseDown={(e) => handleDragStart(sectionKey, e)}
          className="absolute -left-8 top-1/2 -translate-y-1/2 w-6 h-12 flex items-center justify-center cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity z-20"
          style={{ color: th.muted }}
        >
          <Move size={14} />
        </div>
        {/* Section label */}
        <div className="absolute -top-3 right-2 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <span style={{ background: th.accent, color: "#fff", fontSize: 8, padding: "1px 6px", borderRadius: 4, fontFamily: "'Space Mono', monospace" }}>
            {label} {off.x !== 0 || off.y !== 0 ? `[${off.x},${off.y}]` : ""}
          </span>
        </div>
        {children}
      </div>
    )
  }

  function getSectionKey(sel: Selection): string {
    if (sel.type === "hero") return "hero"
    if (sel.type === "stat") return "stats"
    if (sel.type === "skill") return "skills"
    if (sel.type === "project") return "projects"
    if (sel.type === "service-slide" || sel.type === "service-item") return "services"
    if (sel.type === "industry") return "industries"
    if (sel.type === "about") return "about"
    if (sel.type === "free-text") return "free-text"
    return ""
  }

  function renderProperties() {
    if (!sel) return (
      <div className="p-4 text-center text-white/30 text-xs mt-10 leading-relaxed">
        Click any element on the canvas<br />to edit its properties<br /><br />
        <span className="text-white/20">Drag the <Move size={10} className="inline" /> handle to move</span>
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
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full" style={{ background: th.accent }} />
            <span className="text-xs font-mono text-white/60 uppercase tracking-wider">Stat #{sel.index + 1}</span>
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
            <span className="text-xs font-mono text-white/60 uppercase tracking-wider">Skill #{sel.index + 1}</span>
            <div className="flex gap-1">
              {sel.index > 0 && <button onClick={() => moveSkill(sel.index, sel.index - 1)} className="p-1 text-white/30 hover:text-white text-xs">▲</button>}
              {sel.index < content.skills.length - 1 && <button onClick={() => moveSkill(sel.index, sel.index + 1)} className="p-1 text-white/30 hover:text-white text-xs">▼</button>}
              <button onClick={() => removeSkill(sel.index)} className="p-1 text-white/30 hover:text-red-400"><Trash2 size={10} /></button>
            </div>
          </div>
          <input value={skill} onChange={(e) => updateSkill(sel.index, e.target.value)}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-sm focus:outline-none focus:border-[#FF7A00]" />
          <button onClick={addSkill} className="text-xs flex items-center gap-1 px-3 py-1.5 bg-white/10 rounded-full hover:bg-white/20"><Plus size={10} /> Add</button>
        </div>
      )
    }

    // Common position info for any selected element
    const sk = getSectionKey(sel)
    const off = getOff(sk)
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full" style={{ background: th.accent }} />
          <span className="text-xs font-mono text-white/60 uppercase tracking-wider">{sk}</span>
        </div>
        {sel.type === "project" && content.projects[sel.index] && (
          <>
            {(["title", "role", "year", "category", "image"] as const).map((f) => (
              <div key={f}>
                <label className="text-[10px] font-mono text-white/40 block mb-1">{f}</label>
                <input value={content.projects[sel.index][f]} onChange={(e) => {
                  const projects = [...content.projects]
                  projects[sel.index] = { ...projects[sel.index], [f]: e.target.value }
                  update("projects", projects)
                }}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-sm focus:outline-none focus:border-[#FF7A00]" />
              </div>
            ))}
          </>
        )}
        {sel.type === "industry" && content.industries[sel.index] && (
          <>
            <div>
              <label className="text-[10px] font-mono text-white/40 block mb-1">Title</label>
              <input value={content.industries[sel.index].title} onChange={(e) => {
                const industries = [...content.industries]
                industries[sel.index] = { ...industries[sel.index], title: e.target.value }
                update("industries", industries)
              }} className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-sm focus:outline-none focus:border-[#FF7A00]" />
            </div>
            <div>
              <label className="text-[10px] font-mono text-white/40 block mb-1">Description</label>
              <textarea value={content.industries[sel.index].desc} onChange={(e) => {
                const industries = [...content.industries]
                industries[sel.index] = { ...industries[sel.index], desc: e.target.value }
                update("industries", industries)
              }} className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-sm focus:outline-none focus:border-[#FF7A00] resize-none" rows={2} />
            </div>
          </>
        )}
        {sel.type === "about" && (
          <>
            {(["intro", "paragraph1", "paragraph2"] as const).map((f) => (
              <div key={f}>
                <label className="text-[10px] font-mono text-white/40 block mb-1">{f}</label>
                <textarea value={content.about[f]} onChange={(e) => onChange({ ...content, about: { ...content.about, [f]: e.target.value } })}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-sm focus:outline-none focus:border-[#FF7A00] resize-none" rows={2} />
              </div>
            ))}
          </>
        )}
        {sel.type === "free-text" && (
          <div>
            <label className="text-[10px] font-mono text-white/40 block mb-1">Text</label>
            <input value={(content.design.freeTexts || [])[sel.index]?.text || ""} onChange={(e) => {
              const freeTexts = [...(content.design.freeTexts || [])]
              freeTexts[sel.index] = { ...freeTexts[sel.index], text: e.target.value }
              update("design", { ...content.design, freeTexts })
            }} className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-sm focus:outline-none focus:border-[#FF7A00]" />
          </div>
        )}

        {/* Position controls */}
        <div className="border-t border-white/10 pt-4 mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">Position</span>
            <button onClick={() => setOff(sk, 0, 0)} className="text-[10px] flex items-center gap-0.5 px-2 py-0.5 bg-white/10 rounded hover:bg-white/20">
              <RotateCw size={8} /> Reset
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[8px] font-mono text-white/30 block mb-0.5">X</label>
              <input type="number" value={off.x} onChange={(e) => setOff(sk, Number(e.target.value), off.y)}
                className="w-full px-2 py-1 bg-white/10 border border-white/20 rounded text-xs focus:outline-none focus:border-[#FF7A00]" />
            </div>
            <div>
              <label className="text-[8px] font-mono text-white/30 block mb-0.5">Y</label>
              <input type="number" value={off.y} onChange={(e) => setOff(sk, off.x, Number(e.target.value))}
                className="w-full px-2 py-1 bg-white/10 border border-white/20 rounded text-xs focus:outline-none focus:border-[#FF7A00]" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  function renderCanvas() {
    const off = (k: string) => {
      const o = getOff(k)
      return { transform: `translate(${o.x}px, ${o.y}px)`, transition: dragging?.key === k ? "none" : "transform 0.05s ease" }
    }

    return (
      <div style={{
        background: th.bg, color: th.text,
        borderRadius: 16, overflow: "hidden",
        maxWidth: 780, margin: "0 auto",
        boxShadow: "0 20px 80px rgba(0,0,0,0.4)",
        position: "relative",
      }}>
        {/* Canvas toolbar */}
        <div style={{ padding: "4px 16px", background: th.accent, color: "#fff", fontSize: 9, fontFamily: "'Space Mono', monospace", textTransform: "uppercase", letterSpacing: "0.2em", display: "flex", justifyContent: "space-between" }}>
          <span>Drag <Move size={8} className="inline" /> handles to move elements freely</span>
          <span style={{ opacity: 0.6 }}>{content.design.sectionSpacing}</span>
        </div>

        {/* Hero */}
        <DraggableSection sectionKey="hero" label="Hero" onSelect={() => setSel({ type: "hero", field: "line1" })}>
          <div style={{ padding: "32px 28px 24px", borderBottom: `1px solid ${th.line}` }}>
            <div style={{ fontSize: 10, fontFamily: "'Space Mono', monospace", color: th.muted, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 10 }}>Freelance Graphic Designer</div>
            <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 30, lineHeight: 1.05, letterSpacing: "-0.03em" }}>
              {(["line1", "line2", "line3"] as const).map((f) => (
                <div key={f} onClick={(e) => { e.stopPropagation(); setSel({ type: "hero", field: f }) }}
                  className={sel?.type === "hero" && sel.field === f ? "ring-2 ring-[#FF7A00] rounded px-1 -mx-1" : "hover:ring-1 hover:ring-[#FF7A00]/50 rounded px-1 -mx-1 cursor-pointer"}
                  style={{ color: f === "line2" ? th.accent : undefined, padding: "1px 4px", margin: "0 -4px" }}>
                  {content.hero[f]}
                </div>
              ))}
            </div>
          </div>
        </DraggableSection>

        {/* Stats */}
        <DraggableSection sectionKey="stats" label="Stats" onSelect={() => setSel({ type: "stat", index: 0 })}>
          <div style={{ padding: "20px 28px", borderBottom: `1px solid ${th.line}` }}>
            <div style={{ fontSize: 10, fontFamily: "'Space Mono', monospace", color: th.muted, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 12 }}>Stats</div>
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${content.stats.length}, 1fr)`, gap: 10 }}>
              {content.stats.map((stat, i) => (
                <div key={i} onClick={(e) => { e.stopPropagation(); setSel({ type: "stat", index: i }) }}
                  className={sel?.type === "stat" && sel.index === i ? "ring-2 ring-[#FF7A00] rounded-xl" : "hover:ring-1 hover:ring-[#FF7A00]/50 rounded-xl cursor-pointer"}
                  style={{ padding: "14px 12px", textAlign: "center", background: th.surface, borderRadius: 12, border: `1px solid ${th.line}` }}>
                  <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 22, color: th.accent }}>{stat.value}</div>
                  <div style={{ fontSize: 10, color: th.muted, marginTop: 2 }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </DraggableSection>

        {/* Skills */}
        <DraggableSection sectionKey="skills" label="Skills" onSelect={() => setSel({ type: "skill", index: 0 })}>
          <div style={{ padding: "20px 28px", borderBottom: `1px solid ${th.line}` }}>
            <div style={{ fontSize: 10, fontFamily: "'Space Mono', monospace", color: th.muted, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 10 }}>Skills</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {content.skills.map((skill, i) => (
                <span key={i} onClick={(e) => { e.stopPropagation(); setSel({ type: "skill", index: i }) }}
                  className={sel?.type === "skill" && sel.index === i ? "ring-2 ring-[#FF7A00]" : "hover:ring-1 hover:ring-[#FF7A00]/50 cursor-pointer"}
                  style={{ padding: "5px 14px", borderRadius: 9999, fontSize: 11, fontFamily: "'Space Mono', monospace", background: th.surface, border: `1px solid ${th.line}` }}>
                  {skill || <span style={{ color: th.faint }}>— empty —</span>}
                </span>
              ))}
            </div>
          </div>
        </DraggableSection>

        {/* Projects */}
        <DraggableSection sectionKey="projects" label="Projects" onSelect={() => setSel({ type: "project", index: 0 })}>
          <div style={{ padding: "20px 28px", borderBottom: `1px solid ${th.line}` }}>
            <div style={{ fontSize: 10, fontFamily: "'Space Mono', monospace", color: th.muted, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 10 }}>Featured Work</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
              {content.projects.slice(0, 3).map((proj, i) => (
                <div key={proj.slug} onClick={(e) => { e.stopPropagation(); setSel({ type: "project", index: i }) }}
                  className={sel?.type === "project" && sel.index === i ? "ring-2 ring-[#FF7A00] rounded-xl" : "hover:ring-1 hover:ring-[#FF7A00]/50 rounded-xl cursor-pointer"}
                  style={{ borderRadius: 12, overflow: "hidden", border: `1px solid ${th.line}` }}>
                  <div style={{ aspectRatio: "4/3", background: th.subtle, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: th.faint, fontFamily: "'Space Mono', monospace", textAlign: "center", padding: 4 }}>{proj.title}</div>
                  <div style={{ padding: "8px 10px" }}>
                    <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 11 }}>{proj.title}</div>
                    <div style={{ fontSize: 9, color: th.muted, marginTop: 2, fontFamily: "'Space Mono', monospace" }}>{proj.role} · {proj.year}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DraggableSection>

        {/* Services */}
        <DraggableSection sectionKey="services" label="Services" onSelect={() => setSel({ type: "service-slide", index: 0 })}>
          <div style={{ padding: "20px 28px", borderBottom: `1px solid ${th.line}` }}>
            <div style={{ fontSize: 10, fontFamily: "'Space Mono', monospace", color: th.muted, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 8 }}>Services</div>
            <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 15 }}>{content.services.slides[0].title}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 10 }}>
              {content.services.slides[0].items.map((item, ii) => (
                <div key={ii} onClick={(e) => { e.stopPropagation(); setSel({ type: "service-item", slide: 0, index: ii }) }}
                  className={sel?.type === "service-item" && sel.slide === 0 && sel.index === ii ? "ring-2 ring-[#FF7A00] rounded-lg" : "hover:ring-1 hover:ring-[#FF7A00]/50 rounded-lg cursor-pointer"}
                  style={{ background: th.surface, borderRadius: 10, padding: 12, border: `1px solid ${th.line}` }}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: th.accent }}>{item.num}</div>
                  <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 600, fontSize: 11, marginTop: 4 }}>{item.title}</div>
                  <div style={{ fontSize: 9, color: th.muted, marginTop: 4 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </DraggableSection>

        {/* Industries */}
        <DraggableSection sectionKey="industries" label="Industries" onSelect={() => setSel({ type: "industry", index: 0 })}>
          <div style={{ padding: "20px 28px", borderBottom: `1px solid ${th.line}` }}>
            <div style={{ fontSize: 10, fontFamily: "'Space Mono', monospace", color: th.muted, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 10 }}>Industries</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {content.industries.map((ind, i) => (
                <div key={i} onClick={(e) => { e.stopPropagation(); setSel({ type: "industry", index: i }) }}
                  className={sel?.type === "industry" && sel.index === i ? "ring-2 ring-[#FF7A00] rounded-xl" : "hover:ring-1 hover:ring-[#FF7A00]/50 rounded-xl cursor-pointer"}
                  style={{ background: th.surface, borderRadius: 12, padding: 14, border: `1px solid ${th.line}` }}>
                  <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 14 }}>{ind.title}</div>
                  <div style={{ fontSize: 10, color: th.muted, marginTop: 4 }}>{ind.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </DraggableSection>

        {/* About */}
        <DraggableSection sectionKey="about" label="About" onSelect={() => setSel({ type: "about", field: "intro" })}>
          <div style={{ padding: "20px 28px" }}>
            <div style={{ fontSize: 10, fontFamily: "'Space Mono', monospace", color: th.muted, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 8 }}>About</div>
            {(["intro", "paragraph1", "paragraph2"] as const).map((f) => (
              <div key={f} onClick={(e) => { e.stopPropagation(); setSel({ type: "about", field: f }) }}
                className={sel?.type === "about" && sel.field === f ? "ring-2 ring-[#FF7A00] rounded-lg px-1 -mx-1" : "hover:ring-1 hover:ring-[#FF7A00]/50 rounded-lg px-1 -mx-1 cursor-pointer"}
                style={{ fontSize: f === "intro" ? 17 : 12, fontFamily: f === "intro" ? "'Bricolage Grotesque', sans-serif" : undefined, fontWeight: f === "intro" ? 700 : undefined, color: f === "intro" ? th.text : th.muted, marginTop: f === "intro" ? 0 : 10, lineHeight: 1.6 }}>
                {content.about[f]}
              </div>
            ))}
          </div>
        </DraggableSection>

        {/* Free text elements */}
        {(content.design.freeTexts || []).map((ft, i) => {
          const offFt = getOff(`free-text-${i}`)
          return (
            <div key={`ft-${i}`} onClick={() => setSel({ type: "free-text", index: i })}
              className={`relative group cursor-pointer ${sel?.type === "free-text" && sel.index === i ? "ring-2 ring-[#FF7A00]" : "hover:ring-1 hover:ring-[#FF7A00]/50"}`}
              style={{
                padding: "8px 12px",
                transform: `translate(${offFt.x}px, ${offFt.y}px)`,
                transition: "transform 0.05s ease",
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: ft.fontSize,
                color: ft.color,
              }}>
              <div onMouseDown={(e) => handleDragStart(`free-text-${i}`, e)}
                className="absolute -left-6 top-1/2 -translate-y-1/2 w-5 h-8 flex items-center justify-center cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: th.muted }}>
                <Move size={12} />
              </div>
              <div className="text-[10px] font-mono text-white/40 absolute -top-3 right-0 opacity-0 group-hover:opacity-100">{ft.text}</div>
              {ft.text}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="flex h-full" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
      {/* Left Toolbar */}
      <div className={`${leftOpen ? "w-56" : "w-0"} shrink-0 overflow-hidden transition-all duration-200 border-r border-white/10 bg-zinc-900/50`}>
        <div className="p-3 space-y-4 overflow-y-auto h-full text-[11px]">
          {/* Add Free Text */}
          <div>
            <button onClick={addFreeText}
              className="w-full flex items-center justify-center gap-1.5 px-3 py-2 bg-[#FF7A00]/20 border border-[#FF7A00]/30 text-[#FF7A00] rounded-lg hover:bg-[#FF7A00]/30 transition-colors text-xs font-medium">
              <Plus size={12} /> Add Free Text
            </button>
          </div>

          {/* Theme Colors */}
          <div>
            <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider mb-2">Theme Colors</div>
            <div className="grid grid-cols-5 gap-1.5">
              {COLOR_KEYS.map(({ key, label }) => (
                <div key={key} className="flex flex-col items-center gap-0.5">
                  <input type="color" value={th[key] === "transparent" ? "#ffffff" : th[key]}
                    onChange={(e) => setThemeColor(key, e.target.value)}
                    className="w-7 h-7 rounded-lg cursor-pointer border-0 p-0 bg-transparent" style={{ border: `1px solid ${th.line}` }} />
                  <span className="text-[7px] font-mono text-white/30">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Design Toggles */}
          <div>
            <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider mb-2">Visibility</div>
            <div className="space-y-1">
              {DESIGN_TOGGLES.map(({ key, label }) => (
                <label key={key} className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-white/5 cursor-pointer">
                  <div className={`w-6 h-3.5 rounded-full relative transition-colors ${content.design[key] ? "bg-[#FF7A00]" : "bg-white/20"}`}>
                    <div className={`absolute top-0.5 w-2.5 h-2.5 rounded-full bg-white transition-all ${content.design[key] ? "left-3" : "left-0.5"}`} />
                  </div>
                  <span className="text-[10px] text-white/70">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Section Spacing */}
          <div>
            <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider mb-2">Spacing</div>
            <div className="flex gap-1">
              {(["compact", "normal", "spacious"] as const).map((s) => (
                <button key={s} onClick={() => setDesign("sectionSpacing", s)}
                  className={`flex-1 px-2 py-1 rounded-lg text-[9px] font-medium transition-colors ${
                    content.design.sectionSpacing === s ? "bg-[#FF7A00] text-white" : "bg-white/10 text-white/60 hover:bg-white/20"
                  }`}>
                  {s[0].toUpperCase() + s.slice(1, 3)}
                </button>
              ))}
            </div>
          </div>

          {/* Position Reset */}
          <div>
            <button onClick={resetAllOffsets}
              className="w-full px-2 py-1.5 bg-white/10 rounded-lg hover:bg-white/20 text-[10px] text-white/60">
              Reset All Positions
            </button>
          </div>

          {/* Decor */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">Decor</span>
              <button onClick={addDecor} className="text-[9px] flex items-center gap-0.5 px-1.5 py-0.5 bg-white/10 rounded hover:bg-white/20"><Plus size={7} /> Add</button>
            </div>
            {content.design.decorElements.map((el, i) => (
              <div key={i} className="bg-white/5 rounded-lg p-2 mb-1.5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono text-white/40">#{i + 1} {el.type}</span>
                  <button onClick={() => removeDecor(i)} className="text-white/30 hover:text-red-400"><Trash2 size={9} /></button>
                </div>
                <select value={el.type} onChange={(e) => updateDecor(i, "type", e.target.value)}
                  className="w-full px-1.5 py-0.5 bg-white/10 border border-white/20 rounded text-[9px] focus:outline-none">
                  <option value="blob">Blob</option>
                  <option value="circle">Circle</option>
                  <option value="gradient">Gradient</option>
                  <option value="dots">Dots</option>
                  <option value="grid">Grid</option>
                </select>
                <div className="flex items-center gap-1.5">
                  <input type="color" value={el.color} onChange={(e) => updateDecor(i, "color", e.target.value)}
                    className="w-5 h-5 rounded cursor-pointer border-0 p-0 bg-transparent shrink-0" />
                  <input type="range" min="50" max="600" value={el.size} onChange={(e) => updateDecor(i, "size", Number(e.target.value))}
                    className="flex-1 accent-[#FF7A00]" style={{ height: 2 }} />
                  <span className="text-[7px] font-mono text-white/30 w-6 text-right">{el.size}</span>
                </div>
                <input type="range" min="0" max="100" value={Math.round(el.opacity * 100)}
                  onChange={(e) => updateDecor(i, "opacity", Number(e.target.value) / 100)}
                  className="w-full accent-[#FF7A00]" style={{ height: 2 }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Center: Canvas */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/10 bg-zinc-900/30 shrink-0">
          <div className="flex items-center gap-2">
            <button onClick={() => setLeftOpen(!leftOpen)} className="text-[10px] px-1.5 py-0.5 bg-white/10 rounded hover:bg-white/20 text-white/60">
              {leftOpen ? "◀" : "▶"}
            </button>
            <span className="text-[9px] font-mono text-white/20">drag elements by the <Move size={9} className="inline" /> handle</span>
          </div>
          <span className="text-[9px] font-mono" style={{ color: th.accent }}>{th.accent}</span>
        </div>
        <div className="flex-1 overflow-y-auto p-4 bg-zinc-950/80" ref={canvasRef}>
          {renderCanvas()}
        </div>
      </div>

      {/* Right: Properties */}
      <div className="w-64 shrink-0 border-l border-white/10 bg-zinc-900/50 overflow-y-auto">
        <div className="p-3 border-b border-white/10 flex items-center justify-between">
          <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">Properties</span>
          {sel && <button onClick={() => setSel(null)} className="text-[9px] text-white/30 hover:text-white">✕</button>}
        </div>
        <div className="p-3 text-[11px]">
          {renderProperties()}
        </div>
      </div>
    </div>
  )
}
