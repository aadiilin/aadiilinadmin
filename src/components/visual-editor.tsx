import { useState, useRef, useCallback, useEffect } from "react"
import { SiteContent, DEFAULT_THEME, FONT_OPTIONS, FREE_TEXT_DEFAULTS } from "@/lib/content-store"
import { Plus, Trash2, Move, RotateCw, Bold, Italic, Underline, ArrowUp, ArrowDown, Layers } from "lucide-react"

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

interface Props { content: SiteContent; onChange: (content: SiteContent) => void }

const COLOR_KEYS: { key: keyof SiteContent["theme"]; label: string }[] = [
  { key: "bg", label: "Bg" },{ key: "surface", label: "Surf" },{ key: "subtle", label: "Sub" },
  { key: "accent", label: "Acc" },{ key: "accentHover", label: "Hov" },
  { key: "text", label: "Txt" },{ key: "muted", label: "Mute" },{ key: "faint", label: "Fnt" },{ key: "line", label: "Line" },
]

const DESIGN_TOGGLES: { key: keyof SiteContent["design"]; label: string }[] = [
  { key: "showMarquee", label: "Marquee" },{ key: "showChatBot", label: "Chat" },
  { key: "showParticles", label: "Parts" },{ key: "showSignature", label: "Sign" },
  { key: "showScrollProgress", label: "Scrl" },
]

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

export function VisualEditor({ content, onChange }: Props) {
  const [sel, setSel] = useState<Selection | null>(null)
  const [leftOpen, setLeftOpen] = useState(true)
  const [dragging, setDragging] = useState<{ key: string; startX: number; startY: number; origX: number; origY: number } | null>(null)
  const canvasRef = useRef<HTMLDivElement>(null)

  const getOff = (key: string) => content.design.elementOffsets[key] || { x: 0, y: 0 }
  const setOff = (key: string, x: number, y: number) => onChange({ ...content, design: { ...content.design, elementOffsets: { ...content.design.elementOffsets, [key]: { x, y } } } })

  const handleDragStart = useCallback((key: string, e: React.MouseEvent) => {
    e.stopPropagation(); e.preventDefault()
    const o = getOff(key)
    setDragging({ key, startX: e.clientX, startY: e.clientY, origX: o.x, origY: o.y })
  }, [content.design.elementOffsets])

  useEffect(() => {
    if (!dragging) return
    const move = (e: MouseEvent) => setOff(dragging.key, dragging.origX + e.clientX - dragging.startX, dragging.origY + e.clientY - dragging.startY)
    const up = () => setDragging(null)
    window.addEventListener("mousemove", move); window.addEventListener("mouseup", up)
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseup", up) }
  }, [dragging])

  const th = content.theme

  function update<K extends keyof SiteContent>(f: K, v: SiteContent[K]) { onChange({ ...content, [f]: v }) }
  function setDesign<K extends keyof SiteContent["design"]>(k: K, v: SiteContent["design"][K]) { update("design", { ...content.design, [k]: v }) }
  function setThemeColor(k: keyof SiteContent["theme"], v: string) { update("theme", { ...content.theme, [k]: v }) }
  function getSS(sk: string) { return content.design.sectionStyles[sk] || {} }
  function setSS(sk: string, props: Record<string, any>) { update("design", { ...content.design, sectionStyles: { ...content.design.sectionStyles, [sk]: { ...getSS(sk), ...props } } }) }

  function updateFreeText(i: number, props: Partial<SiteContent["design"]["freeTexts"][0]>) {
    const ft = [...(content.design.freeTexts || [])]
    ft[i] = { ...ft[i], ...props }
    setDesign("freeTexts", ft)
  }

  function addFreeText() {
    const idx = (content.design.freeTexts || []).length
    setDesign("freeTexts", [...(content.design.freeTexts || []), { text: "New Text", ...FREE_TEXT_DEFAULTS }])
    setTimeout(() => setSel({ type: "free-text", index: idx }), 50)
  }

  function removeFreeText(i: number) {
    setDesign("freeTexts", (content.design.freeTexts || []).filter((_, j) => j !== i))
    setSel(null)
  }

  function moveFreeTextLayer(i: number, dir: 1 | -1) {
    const ft = [...(content.design.freeTexts || [])]
    const t = ft.splice(i, 1)[0]
    ft.splice(Math.max(0, Math.min(ft.length, i + dir)), 0, t)
    setDesign("freeTexts", ft)
    setSel({ type: "free-text", index: i + dir })
  }

  function addDecor() { setDesign("decorElements", [...content.design.decorElements, { type: "blob", position: "top-right", color: th.accent, size: 200, opacity: 0.15 }]) }
  function removeDecor(i: number) { setDesign("decorElements", content.design.decorElements.filter((_, j) => j !== i)) }
  function updateDecor(i: number, f: string, v: any) { const e = [...content.design.decorElements]; e[i] = { ...e[i], [f]: v }; setDesign("decorElements", e) }
  function resetAllOffsets() { setDesign("elementOffsets", {}); setDesign("sectionStyles", {}) }

  function updateHero(f: "line1" | "line2" | "line3", v: string) { onChange({ ...content, hero: { ...content.hero, [f]: v } }) }
  function updateStat(i: number, f: "value" | "label", v: string) { const s = [...content.stats]; s[i] = { ...s[i], [f]: v }; onChange({ ...content, stats: s }) }
  function updateSkill(i: number, v: string) { const s = [...content.skills]; s[i] = v; onChange({ ...content, skills: s }) }
  function removeSkill(i: number) { onChange({ ...content, skills: content.skills.filter((_, j) => j !== i) }); setSel(null) }
  function addSkill() { onChange({ ...content, skills: [...content.skills, ""] }) }
  function moveSkill(f: number, t: number) { const s = [...content.skills]; const [m] = s.splice(f, 1); s.splice(t, 0, m); onChange({ ...content, skills: s }) }

  // ── Formatting controls ──
  function FormatBar({ sk }: { sk: string }) {
    const ss = getSS(sk)
    return (
      <div className="space-y-2.5 border-t border-white/10 pt-3 mt-3">
        <div className="text-[9px] font-mono text-white/40 uppercase tracking-wider mb-2">Formatting</div>
        <div>
          <label className="text-[8px] font-mono text-white/30 block mb-0.5">Font</label>
          <select value={ss.fontFamily || ""} onChange={(e) => setSS(sk, e.target.value ? { fontFamily: e.target.value } : {})}
            className="w-full px-2 py-1 bg-white/10 border border-white/20 rounded text-[10px] focus:outline-none focus:border-[#FF7A00]">
            <option value="">— default —</option>
            {FONT_OPTIONS.map((f) => <option key={f.value} value={f.value}>{f.name}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[8px] font-mono text-white/30 block mb-0.5">Size</label>
            <input type="number" value={ss.fontSize || ""} onChange={(e) => setSS(sk, e.target.value ? { fontSize: Number(e.target.value) } : {})}
              className="w-full px-2 py-1 bg-white/10 border border-white/20 rounded text-[10px] focus:outline-none" placeholder="16" />
          </div>
          <div>
            <label className="text-[8px] font-mono text-white/30 block mb-0.5">Weight</label>
            <select value={ss.fontWeight || ""} onChange={(e) => setSS(sk, e.target.value ? { fontWeight: Number(e.target.value) } : {})}
              className="w-full px-2 py-1 bg-white/10 border border-white/20 rounded text-[10px] focus:outline-none">
              <option value="">—</option>
              <option value="300">Light</option>
              <option value="400">Regular</option>
              <option value="500">Medium</option>
              <option value="600">Semi Bold</option>
              <option value="700">Bold</option>
              <option value="800">Extra Bold</option>
              <option value="900">Black</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1">
          {(["left", "center", "right"] as const).map((a) => (
            <button key={a} onClick={() => setSS(sk, { textAlign: ss.textAlign === a ? undefined : a })}
              className={`px-2 py-1 rounded text-[10px] ${ss.textAlign === a ? "bg-[#FF7A00] text-white" : "bg-white/10 text-white/60 hover:bg-white/20"}`}>
              {a === "left" ? "≡" : a === "center" ? "≡" : "≡"} {a}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[8px] font-mono text-white/30 block mb-0.5">Spacing</label>
            <input type="number" value={ss.letterSpacing ?? ""} onChange={(e) => setSS(sk, { letterSpacing: e.target.value ? Number(e.target.value) : undefined })}
              className="w-full px-2 py-1 bg-white/10 border border-white/20 rounded text-[10px] focus:outline-none" placeholder="0" />
          </div>
          <div>
            <label className="text-[8px] font-mono text-white/30 block mb-0.5">Line H</label>
            <input type="number" step="0.1" value={ss.lineHeight ?? ""} onChange={(e) => setSS(sk, { lineHeight: e.target.value ? Number(e.target.value) : undefined })}
              className="w-full px-2 py-1 bg-white/10 border border-white/20 rounded text-[10px] focus:outline-none" placeholder="1.2" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[8px] font-mono text-white/30 block mb-0.5">Text Color</label>
            <input type="color" value={ss.color || th.text} onChange={(e) => setSS(sk, { color: e.target.value })}
              className="w-full h-7 rounded cursor-pointer border-0 p-0 bg-transparent" />
          </div>
          <div>
            <label className="text-[8px] font-mono text-white/30 block mb-0.5">Bg Color</label>
            <input type="color" value={ss.bgColor || th.surface} onChange={(e) => setSS(sk, { bgColor: e.target.value })}
              className="w-full h-7 rounded cursor-pointer border-0 p-0 bg-transparent" />
          </div>
        </div>
        <div className="pt-1">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[8px] font-mono text-white/30 block mb-0.5">Rotate</label>
              <input type="range" min="-180" max="180" value={ss.rotation || 0}
                onChange={(e) => setSS(sk, { rotation: Number(e.target.value) })}
                className="w-full accent-[#FF7A00]" style={{ height: 2 }} />
            </div>
            <div className="flex items-end pb-1">
              <span className="text-[9px] font-mono text-white/40">{ss.rotation || 0}°</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  function formatStyle(sk: string): React.CSSProperties {
    const ss = getSS(sk)
    const s: React.CSSProperties = {}
    if (ss.fontFamily) s.fontFamily = ss.fontFamily
    if (ss.fontSize) s.fontSize = ss.fontSize
    if (ss.fontWeight) s.fontWeight = ss.fontWeight
    if (ss.textAlign) s.textAlign = ss.textAlign as any
    if (ss.letterSpacing !== undefined) s.letterSpacing = ss.letterSpacing
    if (ss.lineHeight) s.lineHeight = ss.lineHeight
    if (ss.color) s.color = ss.color
    if (ss.bgColor) s.backgroundColor = ss.bgColor
    return s
  }

  function renderProperties() {
    if (!sel) return (
      <div className="p-4 text-center text-white/30 text-[10px] mt-8 leading-relaxed">
        Click any element to edit<br /><Move size={11} className="inline" /> drag handles to move
      </div>
    )

    const sk = getSectionKey(sel)

    if (sel.type === "hero") {
      return (
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-2"><span className="w-2 h-2 rounded-full" style={{ background: th.accent }} /><span className="text-[10px] font-mono text-white/60 uppercase tracking-wider">Hero</span></div>
          {(["line1", "line2", "line3"] as const).map((f) => (
            <div key={f}>
              <label className="text-[8px] font-mono text-white/40 block mb-0.5">{f}</label>
              <input value={content.hero[f]} onChange={(e) => updateHero(f, e.target.value)}
                className="w-full px-2.5 py-1.5 bg-white/10 border border-white/20 rounded-lg text-[11px] focus:outline-none focus:border-[#FF7A00]" />
            </div>
          ))}
          <PositionControls sk={sk} />
          <FormatBar sk={sk} />
        </div>
      )
    }

    if (sel.type === "stat") {
      const st = content.stats[sel.index]
      if (!st) return null
      return (
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-2"><span className="w-2 h-2 rounded-full" style={{ background: th.accent }} /><span className="text-[10px] font-mono text-white/60 uppercase tracking-wider">Stat #{sel.index + 1}</span></div>
          <div>
            <label className="text-[8px] font-mono text-white/40 block mb-0.5">Value</label>
            <input value={st.value} onChange={(e) => updateStat(sel.index, "value", e.target.value)}
              className="w-full px-2.5 py-1.5 bg-white/10 border border-white/20 rounded-lg text-[11px] focus:outline-none focus:border-[#FF7A00]" />
          </div>
          <div>
            <label className="text-[8px] font-mono text-white/40 block mb-0.5">Label</label>
            <input value={st.label} onChange={(e) => updateStat(sel.index, "label", e.target.value)}
              className="w-full px-2.5 py-1.5 bg-white/10 border border-white/20 rounded-lg text-[11px] focus:outline-none focus:border-[#FF7A00]" />
          </div>
          <PositionControls sk={sk} />
          <FormatBar sk={sk} />
        </div>
      )
    }

    if (sel.type === "skill") {
      return (
        <div className="space-y-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-mono text-white/60 uppercase tracking-wider">Skill #{sel.index + 1}</span>
            <div className="flex gap-1">
              {sel.index > 0 && <button onClick={() => moveSkill(sel.index, sel.index - 1)} className="p-0.5 text-white/30 hover:text-white"><ArrowUp size={10} /></button>}
              {sel.index < content.skills.length - 1 && <button onClick={() => moveSkill(sel.index, sel.index + 1)} className="p-0.5 text-white/30 hover:text-white"><ArrowDown size={10} /></button>}
              <button onClick={() => removeSkill(sel.index)} className="p-0.5 text-white/30 hover:text-red-400"><Trash2 size={10} /></button>
            </div>
          </div>
          <input value={content.skills[sel.index]} onChange={(e) => updateSkill(sel.index, e.target.value)}
            className="w-full px-2.5 py-1.5 bg-white/10 border border-white/20 rounded-lg text-[11px] focus:outline-none focus:border-[#FF7A00]" />
          <button onClick={addSkill} className="text-[10px] flex items-center gap-1 px-2.5 py-1 bg-white/10 rounded-full hover:bg-white/20"><Plus size={9} /> Add</button>
          <PositionControls sk={sk} />
          <FormatBar sk={sk} />
        </div>
      )
    }

    if (sel.type === "project" && content.projects[sel.index]) {
      const p = content.projects[sel.index]
      return (
        <div className="space-y-2">
          <div className="text-[10px] font-mono text-white/60 uppercase tracking-wider mb-1">Project #{sel.index + 1}</div>
          {(["title", "role", "year", "category", "image"] as const).map((f) => (
            <div key={f}>
              <label className="text-[8px] font-mono text-white/40 block mb-0.5">{f}</label>
              <input value={p[f]} onChange={(e) => { const pr = [...content.projects]; pr[sel.index] = { ...pr[sel.index], [f]: e.target.value }; update("projects", pr) }}
                className="w-full px-2.5 py-1.5 bg-white/10 border border-white/20 rounded-lg text-[11px] focus:outline-none focus:border-[#FF7A00]" />
            </div>
          ))}
          <PositionControls sk={sk} />
          <FormatBar sk={sk} />
        </div>
      )
    }

    if (sel.type === "industry" && content.industries[sel.index]) {
      const ind = content.industries[sel.index]
      return (
        <div className="space-y-2">
          <div className="text-[10px] font-mono text-white/60 uppercase tracking-wider mb-1">Industry #{sel.index + 1}</div>
          <div>
            <label className="text-[8px] font-mono text-white/40 block mb-0.5">Title</label>
            <input value={ind.title} onChange={(e) => { const inds = [...content.industries]; inds[sel.index] = { ...inds[sel.index], title: e.target.value }; update("industries", inds) }}
              className="w-full px-2.5 py-1.5 bg-white/10 border border-white/20 rounded-lg text-[11px] focus:outline-none focus:border-[#FF7A00]" />
          </div>
          <div>
            <label className="text-[8px] font-mono text-white/40 block mb-0.5">Description</label>
            <textarea value={ind.desc} onChange={(e) => { const inds = [...content.industries]; inds[sel.index] = { ...inds[sel.index], desc: e.target.value }; update("industries", inds) }}
              className="w-full px-2.5 py-1.5 bg-white/10 border border-white/20 rounded-lg text-[11px] focus:outline-none focus:border-[#FF7A00] resize-none" rows={2} />
          </div>
          <PositionControls sk={sk} />
          <FormatBar sk={sk} />
        </div>
      )
    }

    if (sel.type === "about") {
      return (
        <div className="space-y-2">
          <div className="text-[10px] font-mono text-white/60 uppercase tracking-wider mb-1">About</div>
          {(["intro", "paragraph1", "paragraph2"] as const).map((f) => (
            <div key={f}>
              <label className="text-[8px] font-mono text-white/40 block mb-0.5">{f}</label>
              <textarea value={content.about[f]} onChange={(e) => onChange({ ...content, about: { ...content.about, [f]: e.target.value } })}
                className="w-full px-2.5 py-1.5 bg-white/10 border border-white/20 rounded-lg text-[11px] focus:outline-none focus:border-[#FF7A00] resize-none" rows={f === "intro" ? 2 : 2} />
            </div>
          ))}
          <PositionControls sk={sk} />
          <FormatBar sk={sk} />
        </div>
      )
    }

    if (sel.type === "free-text") {
      const ft = (content.design.freeTexts || [])[sel.index]
      if (!ft) return null
      return (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{ background: th.accent }} /><span className="text-[10px] font-mono text-white/60 uppercase tracking-wider">Free Text</span></div>
            <div className="flex gap-1">
              <button onClick={() => moveFreeTextLayer(sel.index, -1)} className="p-0.5 text-white/30 hover:text-white"><ArrowUp size={10} /></button>
              <button onClick={() => moveFreeTextLayer(sel.index, 1)} className="p-0.5 text-white/30 hover:text-white"><ArrowDown size={10} /></button>
              <button onClick={() => removeFreeText(sel.index)} className="p-0.5 text-white/30 hover:text-red-400"><Trash2 size={10} /></button>
            </div>
          </div>

          <div>
            <label className="text-[8px] font-mono text-white/40 block mb-0.5">Text</label>
            <textarea value={ft.text} onChange={(e) => updateFreeText(sel.index, { text: e.target.value })}
              className="w-full px-2.5 py-1.5 bg-white/10 border border-white/20 rounded-lg text-[11px] focus:outline-none focus:border-[#FF7A00] resize-none" rows={2} />
          </div>

          <div>
            <label className="text-[8px] font-mono text-white/30 block mb-0.5">Font</label>
            <select value={ft.fontFamily} onChange={(e) => updateFreeText(sel.index, { fontFamily: e.target.value })}
              className="w-full px-2 py-1 bg-white/10 border border-white/20 rounded text-[10px] focus:outline-none focus:border-[#FF7A00]">
              {FONT_OPTIONS.map((f) => <option key={f.value} value={f.value}>{f.name}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-[8px] font-mono text-white/30 block mb-0.5">Size</label>
              <input type="number" value={ft.fontSize} onChange={(e) => updateFreeText(sel.index, { fontSize: Number(e.target.value) })}
                className="w-full px-2 py-1 bg-white/10 border border-white/20 rounded text-[10px] focus:outline-none" />
            </div>
            <div>
              <label className="text-[8px] font-mono text-white/30 block mb-0.5">Weight</label>
              <select value={ft.fontWeight} onChange={(e) => updateFreeText(sel.index, { fontWeight: Number(e.target.value) })}
                className="w-full px-2 py-1 bg-white/10 border border-white/20 rounded text-[10px] focus:outline-none">
                {[300,400,500,600,700,800,900].map(w => <option key={w} value={w}>{w}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[8px] font-mono text-white/30 block mb-0.5">Align</label>
              <select value={ft.textAlign} onChange={(e) => updateFreeText(sel.index, { textAlign: e.target.value as any })}
                className="w-full px-2 py-1 bg-white/10 border border-white/20 rounded text-[10px] focus:outline-none">
                <option value="left">Left</option><option value="center">Center</option><option value="right">Right</option>
              </select>
            </div>
          </div>

          {/* Toggle row */}
          <div className="flex items-center gap-2">
            <button onClick={() => updateFreeText(sel.index, { fontWeight: ft.fontWeight === 700 ? 400 : 700 })}
              className={`px-2.5 py-1.5 rounded text-[10px] ${ft.fontWeight >= 700 ? "bg-[#FF7A00] text-white" : "bg-white/10 text-white/60"}`}><Bold size={11} /></button>
            <button onClick={() => updateFreeText(sel.index, { italic: !ft.italic })}
              className={`px-2.5 py-1.5 rounded text-[10px] ${ft.italic ? "bg-[#FF7A00] text-white" : "bg-white/10 text-white/60"}`}><Italic size={11} /></button>
            <button onClick={() => updateFreeText(sel.index, { underline: !ft.underline })}
              className={`px-2.5 py-1.5 rounded text-[10px] ${ft.underline ? "bg-[#FF7A00] text-white" : "bg-white/10 text-white/60"}`}><Underline size={11} /></button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[8px] font-mono text-white/30 block mb-0.5">Color</label>
              <div className="flex items-center gap-1.5">
                <input type="color" value={ft.color} onChange={(e) => updateFreeText(sel.index, { color: e.target.value })}
                  className="w-7 h-7 rounded cursor-pointer border-0 p-0 bg-transparent shrink-0" />
                <span className="text-[8px] font-mono text-white/30 truncate">{ft.color}</span>
              </div>
            </div>
            <div>
              <label className="text-[8px] font-mono text-white/30 block mb-0.5">Bg Color</label>
              <div className="flex items-center gap-1.5">
                <input type="color" value={ft.bgColor === "transparent" ? "#ffffff" : ft.bgColor}
                  onChange={(e) => updateFreeText(sel.index, { bgColor: e.target.value })}
                  className="w-7 h-7 rounded cursor-pointer border-0 p-0 bg-transparent shrink-0" />
                <button onClick={() => updateFreeText(sel.index, { bgColor: "transparent" })}
                  className="text-[8px] px-1 py-0.5 bg-white/10 rounded hover:bg-white/20 text-white/50">✕</button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[8px] font-mono text-white/30 block mb-0.5">Spacing</label>
              <input type="number" value={ft.letterSpacing} onChange={(e) => updateFreeText(sel.index, { letterSpacing: Number(e.target.value) })}
                className="w-full px-2 py-1 bg-white/10 border border-white/20 rounded text-[10px] focus:outline-none" />
            </div>
            <div>
              <label className="text-[8px] font-mono text-white/30 block mb-0.5">Line H</label>
              <input type="number" step="0.1" value={ft.lineHeight} onChange={(e) => updateFreeText(sel.index, { lineHeight: Number(e.target.value) })}
                className="w-full px-2 py-1 bg-white/10 border border-white/20 rounded text-[10px] focus:outline-none" />
            </div>
          </div>

          {/* Rotation slider */}
          <div>
            <label className="text-[8px] font-mono text-white/30 block mb-0.5">Rotate {ft.rotation}°</label>
            <input type="range" min="-180" max="180" value={ft.rotation} onChange={(e) => updateFreeText(sel.index, { rotation: Number(e.target.value) })}
              className="w-full accent-[#FF7A00]" style={{ height: 2 }} />
          </div>

          {/* Border */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[8px] font-mono text-white/30 block mb-0.5">Border</label>
              <input type="number" min="0" max="20" value={ft.borderWidth} onChange={(e) => updateFreeText(sel.index, { borderWidth: Number(e.target.value) })}
                className="w-full px-2 py-1 bg-white/10 border border-white/20 rounded text-[10px] focus:outline-none" />
            </div>
            <div>
              <label className="text-[8px] font-mono text-white/30 block mb-0.5">Border Color</label>
              <input type="color" value={ft.borderColor} onChange={(e) => updateFreeText(sel.index, { borderColor: e.target.value })}
                className="w-full h-7 rounded cursor-pointer border-0 p-0 bg-transparent" />
            </div>
          </div>

          {/* Shadow */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[8px] font-mono text-white/30 block mb-0.5">Shadow</label>
              <input type="number" min="0" max="50" value={ft.shadowBlur} onChange={(e) => updateFreeText(sel.index, { shadowBlur: Number(e.target.value) })}
                className="w-full px-2 py-1 bg-white/10 border border-white/20 rounded text-[10px] focus:outline-none" />
            </div>
            <div>
              <label className="text-[8px] font-mono text-white/30 block mb-0.5">Shadow Color</label>
              <input type="color" value={ft.shadowColor === "transparent" ? "#000000" : ft.shadowColor}
                onChange={(e) => updateFreeText(sel.index, { shadowColor: e.target.value })}
                className="w-full h-7 rounded cursor-pointer border-0 p-0 bg-transparent" />
            </div>
          </div>

          {/* Z-index / Layer */}
          <div className="flex items-center justify-between pt-1 border-t border-white/10">
            <span className="text-[8px] font-mono text-white/30 flex items-center gap-1"><Layers size={9} /> Layer</span>
            <div className="flex items-center gap-2">
              <button onClick={() => updateFreeText(sel.index, { zIndex: Math.max(0, ft.zIndex - 1) })}
                className="px-2 py-0.5 bg-white/10 rounded text-[9px] hover:bg-white/20">−</button>
              <span className="text-[10px] font-mono text-white/60 w-4 text-center">{ft.zIndex}</span>
              <button onClick={() => updateFreeText(sel.index, { zIndex: ft.zIndex + 1 })}
                className="px-2 py-0.5 bg-white/10 rounded text-[9px] hover:bg-white/20">+</button>
            </div>
          </div>

          <PositionControls sk={`free-text-${sel.index}`} />
        </div>
      )
    }

    return null
  }

  function PositionControls({ sk }: { sk: string }) {
    const o = getOff(sk)
    return (
      <div className="border-t border-white/10 pt-2.5 mt-2.5">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[8px] font-mono text-white/40 uppercase tracking-wider">Position</span>
          <button onClick={() => setOff(sk, 0, 0)} className="text-[8px] flex items-center gap-0.5 px-1.5 py-0.5 bg-white/10 rounded hover:bg-white/20"><RotateCw size={7} /> Reset</button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[7px] font-mono text-white/30 block mb-0.5">X</label>
            <input type="number" value={o.x} onChange={(e) => setOff(sk, Number(e.target.value), o.y)}
              className="w-full px-2 py-1 bg-white/10 border border-white/20 rounded text-[10px] focus:outline-none focus:border-[#FF7A00]" />
          </div>
          <div>
            <label className="text-[7px] font-mono text-white/30 block mb-0.5">Y</label>
            <input type="number" value={o.y} onChange={(e) => setOff(sk, o.x, Number(e.target.value))}
              className="w-full px-2 py-1 bg-white/10 border border-white/20 rounded text-[10px] focus:outline-none focus:border-[#FF7A00]" />
          </div>
        </div>
      </div>
    )
  }

  // ── Render canvas ──
  function DraggableSection({ sectionKey, label, children, onSelect }: { sectionKey: string; label: string; children: React.ReactNode; onSelect: () => void }) {
    const off = getOff(sectionKey)
    const isDragging = dragging?.key === sectionKey
    const ss = getSS(sectionKey)
    const rot = ss.rotation || 0
    return (
      <div onClick={onSelect}
        className={`relative group cursor-default ${isDragging ? "z-50" : "z-0"}`}
        style={{
          transform: `translate(${off.x}px, ${off.y}px) rotate(${rot}deg)`,
          transition: isDragging ? "none" : "transform 0.08s ease",
          outline: sel && getSectionKey(sel) === sectionKey ? `2px solid ${th.accent}` : "2px solid transparent",
          outlineOffset: 2,
          borderRadius: 10, marginBottom: 3,
          ...formatStyle(sectionKey),
        }}>
        <div onMouseDown={(e) => handleDragStart(sectionKey, e)}
          className="absolute -left-7 top-1/2 -translate-y-1/2 w-5 h-10 flex items-center justify-center cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity z-20" style={{ color: th.muted }}>
          <Move size={12} />
        </div>
        <div className="absolute -top-2.5 right-1 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <span style={{ background: th.accent, color: "#fff", fontSize: 7, padding: "1px 5px", borderRadius: 3, fontFamily: "'Space Mono', monospace", whiteSpace: "nowrap" }}>
            {label}{off.x !== 0 || off.y !== 0 ? ` [${off.x},${off.y}]` : ""}{rot ? ` ${rot}°` : ""}
          </span>
        </div>
        {children}
      </div>
    )
  }

  function renderCanvas() {
    return (
      <div style={{
        background: th.bg, color: th.text, borderRadius: 16, overflow: "hidden",
        maxWidth: 780, margin: "0 auto", boxShadow: "0 20px 80px rgba(0,0,0,0.4)", position: "relative",
      }}>
        <div style={{ padding: "3px 14px", background: th.accent, color: "#fff", fontSize: 8, fontFamily: "'Space Mono', monospace", textTransform: "uppercase", letterSpacing: "0.2em", display: "flex", justifyContent: "space-between" }}>
          <span>Drag <Move size={7} className="inline" /> to move · click to edit</span>
          <span style={{ opacity: 0.6 }}>{th.accent}</span>
        </div>

        <DraggableSection sectionKey="hero" label="Hero" onSelect={() => setSel({ type: "hero", field: "line1" })}>
          <div style={{ padding: "28px 24px 20px", borderBottom: `1px solid ${th.line}` }}>
            <div style={{ fontSize: 9, fontFamily: "'Space Mono', monospace", color: th.muted, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 8 }}>Freelance Graphic Designer</div>
            <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 28, lineHeight: 1.05, letterSpacing: "-0.03em" }}>
              {(["line1", "line2", "line3"] as const).map((f) => (
                <div key={f} onClick={(e) => { e.stopPropagation(); setSel({ type: "hero", field: f }) }}
                  className={sel?.type === "hero" && sel.field === f ? "ring-2 ring-[#FF7A00] rounded px-1 -mx-1" : "hover:ring-1 hover:ring-[#FF7A00]/50 rounded px-1 -mx-1 cursor-pointer"}
                  style={{ color: f === "line2" ? th.accent : undefined }}>{content.hero[f]}</div>
              ))}
            </div>
          </div>
        </DraggableSection>

        <DraggableSection sectionKey="stats" label="Stats" onSelect={() => setSel({ type: "stat", index: 0 })}>
          <div style={{ padding: "16px 24px", borderBottom: `1px solid ${th.line}` }}>
            <div style={{ fontSize: 9, fontFamily: "'Space Mono', monospace", color: th.muted, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 10 }}>Stats</div>
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${content.stats.length}, 1fr)`, gap: 8 }}>
              {content.stats.map((stat, i) => (
                <div key={i} onClick={(e) => { e.stopPropagation(); setSel({ type: "stat", index: i }) }}
                  className={sel?.type === "stat" && sel.index === i ? "ring-2 ring-[#FF7A00] rounded-xl" : "hover:ring-1 hover:ring-[#FF7A00]/50 rounded-xl cursor-pointer"}
                  style={{ padding: "12px 10px", textAlign: "center", background: th.surface, borderRadius: 10, border: `1px solid ${th.line}` }}>
                  <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 20, color: th.accent }}>{stat.value}</div>
                  <div style={{ fontSize: 9, color: th.muted, marginTop: 1 }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </DraggableSection>

        <DraggableSection sectionKey="skills" label="Skills" onSelect={() => setSel({ type: "skill", index: 0 })}>
          <div style={{ padding: "16px 24px", borderBottom: `1px solid ${th.line}` }}>
            <div style={{ fontSize: 9, fontFamily: "'Space Mono', monospace", color: th.muted, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 8 }}>Skills</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {content.skills.map((skill, i) => (
                <span key={i} onClick={(e) => { e.stopPropagation(); setSel({ type: "skill", index: i }) }}
                  className={sel?.type === "skill" && sel.index === i ? "ring-2 ring-[#FF7A00]" : "hover:ring-1 hover:ring-[#FF7A00]/50 cursor-pointer"}
                  style={{ padding: "4px 12px", borderRadius: 9999, fontSize: 10, fontFamily: "'Space Mono', monospace", background: th.surface, border: `1px solid ${th.line}` }}>
                  {skill || <span style={{ color: th.faint }}>— empty —</span>}
                </span>
              ))}
            </div>
          </div>
        </DraggableSection>

        <DraggableSection sectionKey="projects" label="Projects" onSelect={() => setSel({ type: "project", index: 0 })}>
          <div style={{ padding: "16px 24px", borderBottom: `1px solid ${th.line}` }}>
            <div style={{ fontSize: 9, fontFamily: "'Space Mono', monospace", color: th.muted, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 8 }}>Featured Work</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
              {content.projects.slice(0, 3).map((proj, i) => (
                <div key={proj.slug} onClick={(e) => { e.stopPropagation(); setSel({ type: "project", index: i }) }}
                  className={sel?.type === "project" && sel.index === i ? "ring-2 ring-[#FF7A00] rounded-xl" : "hover:ring-1 hover:ring-[#FF7A00]/50 rounded-xl cursor-pointer"}
                  style={{ borderRadius: 10, overflow: "hidden", border: `1px solid ${th.line}` }}>
                  <div style={{ aspectRatio: "4/3", background: th.subtle, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, color: th.faint, fontFamily: "'Space Mono', monospace", textAlign: "center", padding: 4 }}>{proj.title}</div>
                  <div style={{ padding: "6px 8px" }}>
                    <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 10 }}>{proj.title}</div>
                    <div style={{ fontSize: 8, color: th.muted, marginTop: 1, fontFamily: "'Space Mono', monospace" }}>{proj.role} · {proj.year}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DraggableSection>

        <DraggableSection sectionKey="services" label="Services" onSelect={() => setSel({ type: "service-slide", index: 0 })}>
          <div style={{ padding: "16px 24px", borderBottom: `1px solid ${th.line}` }}>
            <div style={{ fontSize: 9, fontFamily: "'Space Mono', monospace", color: th.muted, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 6 }}>Services</div>
            <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 14 }}>{content.services.slides[0].title}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginTop: 8 }}>
              {content.services.slides[0].items.map((item, ii) => (
                <div key={ii} onClick={(e) => { e.stopPropagation(); setSel({ type: "service-item", slide: 0, index: ii }) }}
                  className={sel?.type === "service-item" && sel.slide === 0 && sel.index === ii ? "ring-2 ring-[#FF7A00] rounded-lg" : "hover:ring-1 hover:ring-[#FF7A00]/50 rounded-lg cursor-pointer"}
                  style={{ background: th.surface, borderRadius: 8, padding: 10, border: `1px solid ${th.line}` }}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: th.accent }}>{item.num}</div>
                  <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 600, fontSize: 10, marginTop: 3 }}>{item.title}</div>
                </div>
              ))}
            </div>
          </div>
        </DraggableSection>

        <DraggableSection sectionKey="industries" label="Industries" onSelect={() => setSel({ type: "industry", index: 0 })}>
          <div style={{ padding: "16px 24px", borderBottom: `1px solid ${th.line}` }}>
            <div style={{ fontSize: 9, fontFamily: "'Space Mono', monospace", color: th.muted, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 8 }}>Industries</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
              {content.industries.map((ind, i) => (
                <div key={i} onClick={(e) => { e.stopPropagation(); setSel({ type: "industry", index: i }) }}
                  className={sel?.type === "industry" && sel.index === i ? "ring-2 ring-[#FF7A00] rounded-xl" : "hover:ring-1 hover:ring-[#FF7A00]/50 rounded-xl cursor-pointer"}
                  style={{ background: th.surface, borderRadius: 10, padding: 12, border: `1px solid ${th.line}` }}>
                  <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 13 }}>{ind.title}</div>
                  <div style={{ fontSize: 9, color: th.muted, marginTop: 3 }}>{ind.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </DraggableSection>

        <DraggableSection sectionKey="about" label="About" onSelect={() => setSel({ type: "about", field: "intro" })}>
          <div style={{ padding: "16px 24px" }}>
            <div style={{ fontSize: 9, fontFamily: "'Space Mono', monospace", color: th.muted, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 6 }}>About</div>
            {(["intro", "paragraph1", "paragraph2"] as const).map((f) => (
              <div key={f} onClick={(e) => { e.stopPropagation(); setSel({ type: "about", field: f }) }}
                className={sel?.type === "about" && sel.field === f ? "ring-2 ring-[#FF7A00] rounded-lg px-1 -mx-1" : "hover:ring-1 hover:ring-[#FF7A00]/50 rounded-lg px-1 -mx-1 cursor-pointer"}
                style={{ fontSize: f === "intro" ? 16 : 11, fontFamily: f === "intro" ? "'Bricolage Grotesque', sans-serif" : undefined, fontWeight: f === "intro" ? 700 : undefined, color: f === "intro" ? th.text : th.muted, marginTop: f === "intro" ? 0 : 8, lineHeight: 1.5 }}>
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
                padding: ft.bgColor !== "transparent" ? "8px 14px" : "2px 4px",
                margin: ft.bgColor !== "transparent" ? "4px 8px" : "2px 4px",
                transform: `translate(${offFt.x}px, ${offFt.y}px) rotate(${ft.rotation}deg)`,
                transition: "transform 0.08s ease",
                fontFamily: ft.fontFamily,
                fontSize: ft.fontSize,
                fontWeight: ft.fontWeight,
                color: ft.color,
                background: ft.bgColor !== "transparent" ? ft.bgColor : undefined,
                textAlign: ft.textAlign,
                letterSpacing: ft.letterSpacing,
                lineHeight: ft.lineHeight,
                fontStyle: ft.italic ? "italic" : "normal",
                textDecoration: ft.underline ? "underline" : "none",
                borderRadius: ft.borderWidth > 0 ? 6 : undefined,
                border: ft.borderWidth > 0 ? `${ft.borderWidth}px solid ${ft.borderColor}` : undefined,
                boxShadow: ft.shadowBlur > 0 && ft.shadowColor !== "transparent" ? `0 4px ${ft.shadowBlur}px ${ft.shadowColor}` : undefined,
                zIndex: ft.zIndex,
                position: "relative",
              }}>
              <div onMouseDown={(e) => handleDragStart(`free-text-${i}`, e)}
                className="absolute -left-6 top-1/2 -translate-y-1/2 w-5 h-8 flex items-center justify-center cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity z-30" style={{ color: th.muted }}>
                <Move size={11} />
              </div>
              <div className="text-[7px] font-mono text-white/40 absolute -top-2.5 right-0 opacity-0 group-hover:opacity-100 whitespace-nowrap z-20" style={{ background: th.accent, color: "#fff", padding: "0 5px", borderRadius: 3 }}>
                FT #{i + 1} {ft.zIndex > 0 ? `z:${ft.zIndex}` : ""}
              </div>
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
      <div className={`${leftOpen ? "w-52" : "w-0"} shrink-0 overflow-hidden transition-all duration-200 border-r border-white/10 bg-zinc-900/50`}>
        <div className="p-3 space-y-3.5 overflow-y-auto h-full text-[10px]">
          <button onClick={addFreeText}
            className="w-full flex items-center justify-center gap-1 px-3 py-2 bg-[#FF7A00]/20 border border-[#FF7A00]/30 text-[#FF7A00] rounded-lg hover:bg-[#FF7A00]/30 transition-colors text-[11px] font-medium">
            <Plus size={11} /> Add Free Text
          </button>

          {/* Theme Colors */}
          <div>
            <div className="text-[9px] font-mono text-white/40 uppercase tracking-wider mb-1.5">Theme Colors</div>
            <div className="grid grid-cols-5 gap-1">
              {COLOR_KEYS.map(({ key, label }) => (
                <div key={key} className="flex flex-col items-center gap-0.5">
                  <input type="color" value={th[key] === "transparent" ? "#ffffff" : th[key]}
                    onChange={(e) => setThemeColor(key, e.target.value)}
                    className="w-6 h-6 rounded cursor-pointer border-0 p-0 bg-transparent" style={{ border: `1px solid ${th.line}` }} />
                  <span className="text-[6px] font-mono text-white/30">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visibility */}
          <div>
            <div className="text-[9px] font-mono text-white/40 uppercase tracking-wider mb-1.5">Visibility</div>
            <div className="space-y-0.5">
              {DESIGN_TOGGLES.map(({ key, label }) => (
                <label key={key} className="flex items-center gap-2 px-2 py-1 rounded hover:bg-white/5 cursor-pointer">
                  <div className={`w-5 h-3 rounded-full relative transition-colors ${content.design[key] ? "bg-[#FF7A00]" : "bg-white/20"}`}>
                    <div className={`absolute top-0.5 w-2 h-2 rounded-full bg-white transition-all ${content.design[key] ? "left-2.5" : "left-0.5"}`} />
                  </div>
                  <span className="text-[9px] text-white/70">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Spacing */}
          <div>
            <div className="text-[9px] font-mono text-white/40 uppercase tracking-wider mb-1.5">Spacing</div>
            <div className="flex gap-1">
              {(["compact", "normal", "spacious"] as const).map((s) => (
                <button key={s} onClick={() => setDesign("sectionSpacing", s)}
                  className={`flex-1 px-1.5 py-1 rounded text-[8px] font-medium transition-colors ${content.design.sectionSpacing === s ? "bg-[#FF7A00] text-white" : "bg-white/10 text-white/60 hover:bg-white/20"}`}>
                  {s[0].toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Reset */}
          <button onClick={resetAllOffsets} className="w-full px-2 py-1.5 bg-white/10 rounded-lg hover:bg-white/20 text-[9px] text-white/60">
            Reset Positions & Styles
          </button>

          {/* Decor */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[9px] font-mono text-white/40 uppercase tracking-wider">Decor</span>
              <button onClick={addDecor} className="text-[8px] flex items-center gap-0.5 px-1.5 py-0.5 bg-white/10 rounded hover:bg-white/20"><Plus size={7} /> Add</button>
            </div>
            {content.design.decorElements.map((el, i) => (
              <div key={i} className="bg-white/5 rounded-lg p-2 mb-1 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] font-mono text-white/40">#{i + 1} {el.type}</span>
                  <button onClick={() => removeDecor(i)} className="text-white/30 hover:text-red-400"><Trash2 size={8} /></button>
                </div>
                <select value={el.type} onChange={(e) => updateDecor(i, "type", e.target.value)}
                  className="w-full px-1.5 py-0.5 bg-white/10 border border-white/20 rounded text-[8px] focus:outline-none">
                  <option value="blob">Blob</option><option value="circle">Circle</option><option value="gradient">Gradient</option>
                  <option value="dots">Dots</option><option value="grid">Grid</option>
                </select>
                <div className="flex items-center gap-1">
                  <input type="color" value={el.color} onChange={(e) => updateDecor(i, "color", e.target.value)}
                    className="w-4 h-4 rounded cursor-pointer border-0 p-0 bg-transparent shrink-0" />
                  <input type="range" min="50" max="600" value={el.size} onChange={(e) => updateDecor(i, "size", Number(e.target.value))}
                    className="flex-1 accent-[#FF7A00]" style={{ height: 1.5 }} />
                  <span className="text-[6px] font-mono text-white/30 w-5 text-right">{el.size}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Center: Canvas */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center justify-between px-3 py-1 border-b border-white/10 bg-zinc-900/30 shrink-0">
          <button onClick={() => setLeftOpen(!leftOpen)} className="text-[9px] px-1.5 py-0.5 bg-white/10 rounded hover:bg-white/20 text-white/60">
            {leftOpen ? "◀" : "▶ Tools"}
          </button>
          <span className="text-[8px] font-mono text-white/20">drag <Move size={8} className="inline" /> · click to edit</span>
        </div>
        <div className="flex-1 overflow-y-auto p-4 bg-zinc-950/80" ref={canvasRef}>
          {renderCanvas()}
        </div>
      </div>

      {/* Right: Properties */}
      <div className="w-64 shrink-0 border-l border-white/10 bg-zinc-900/50 overflow-y-auto">
        <div className="p-2.5 border-b border-white/10 flex items-center justify-between">
          <span className="text-[9px] font-mono text-white/40 uppercase tracking-wider">Properties</span>
          {sel && <button onClick={() => setSel(null)} className="text-[8px] text-white/30 hover:text-white">✕</button>}
        </div>
        <div className="p-2.5 text-[10px]">
          {renderProperties()}
        </div>
      </div>
    </div>
  )
}
