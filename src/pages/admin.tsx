import { useState, useRef, useEffect } from "react"
import { Link } from "wouter"
import { motion } from "framer-motion"
import { checkPassword, getContent, saveContent, resetContent, exportContent, importContent, SiteContent } from "@/lib/content-store"

type Tab = "hero" | "stats" | "skills" | "projects" | "services" | "industries" | "about"

export function Admin() {
  const [authed, setAuthed] = useState(false)
  const [pw, setPw] = useState("")
  const [content, setContent] = useState<SiteContent>(() => getContent())
  const [saved, setSaved] = useState(false)
  const [tab, setTab] = useState<Tab>("hero")
  const importRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!saved) return
    const t = setTimeout(() => setSaved(false), 2000)
    return () => clearTimeout(t)
  }, [saved])

  function handleLogin() {
    if (checkPassword(pw)) setAuthed(true)
  }

  function handleSave() {
    saveContent(content)
    setSaved(true)
  }

  function handleReset() {
    if (confirm("Reset all content to defaults?")) {
      resetContent()
      setContent(getContent())
    }
  }

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    importContent(file).then((data) => {
      setContent(data)
      setSaved(true)
    })
  }

  function updateHero(field: "line1" | "line2" | "line3", value: string) {
    setContent((c) => ({ ...c, hero: { ...c.hero, [field]: value } }))
  }

  function updateStat(i: number, field: "value" | "label", value: string) {
    setContent((c) => {
      const stats = [...c.stats]
      stats[i] = { ...stats[i], [field]: value }
      return { ...c, stats }
    })
  }

  function updateSkill(i: number, value: string) {
    setContent((c) => {
      const skills = [...c.skills]
      skills[i] = value
      return { ...c, skills }
    })
  }

  function addSkill() {
    setContent((c) => ({ ...c, skills: [...c.skills, ""] }))
  }

  function removeSkill(i: number) {
    setContent((c) => ({ ...c, skills: c.skills.filter((_, j) => j !== i) }))
  }

  function updateProject(i: number, field: string, value: string) {
    setContent((c) => {
      const projects = [...c.projects]
      projects[i] = { ...projects[i], [field]: value }
      return { ...c, projects }
    })
  }

  function updateServiceSlide(si: number, value: string) {
    setContent((c) => {
      const slides = [...c.services.slides]
      slides[si] = { ...slides[si], title: value }
      return { ...c, services: { ...c.services, slides } }
    })
  }

  function updateServiceItem(si: number, ii: number, field: "title" | "desc", value: string) {
    setContent((c) => {
      const slides = [...c.services.slides]
      const items = [...slides[si].items]
      items[ii] = { ...items[ii], [field]: value }
      slides[si] = { ...slides[si], items }
      return { ...c, services: { ...c.services, slides } }
    })
  }

  function updateIndustry(i: number, field: "title" | "desc", value: string) {
    setContent((c) => {
      const industries = [...c.industries]
      industries[i] = { ...industries[i], [field]: value }
      return { ...c, industries }
    })
  }

  function updateAbout(field: "intro" | "paragraph1" | "paragraph2", value: string) {
    setContent((c) => ({ ...c, about: { ...c.about, [field]: value } }))
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="font-heading font-bold text-2xl text-white">aadiilin<span className="text-[#FF7A00]">.</span></div>
            <div className="text-xs text-white/40 font-mono uppercase tracking-wider mt-2">Admin Panel</div>
          </div>
          <input type="password" placeholder="Enter password"
            value={pw} onChange={(e) => setPw(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#FF7A00] transition-colors" />
          <button onClick={handleLogin}
            className="w-full mt-4 px-5 py-3 bg-[#FF7A00] text-white font-heading font-bold text-sm rounded-full hover:bg-[#E66A00] transition-colors">
            Login
          </button>
        </div>
      </div>
    )
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: "hero", label: "Hero" },
    { key: "stats", label: "Stats" },
    { key: "skills", label: "Skills" },
    { key: "projects", label: "Projects" },
    { key: "services", label: "Services" },
    { key: "industries", label: "Industries" },
    { key: "about", label: "About" },
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="font-heading font-bold text-sm text-white/60 hover:text-white transition-colors">← Site</Link>
            <span className="text-xs font-mono text-white/30 uppercase tracking-wider">Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={exportContent} className="text-xs px-3 py-1.5 bg-white/10 rounded-full hover:bg-white/20 transition-colors">Export</button>
            <button onClick={() => importRef.current?.click()} className="text-xs px-3 py-1.5 bg-white/10 rounded-full hover:bg-white/20 transition-colors">Import</button>
            <input ref={importRef} type="file" accept=".json" onChange={handleImport} className="hidden" />
            {saved && <span className="text-xs text-green-400 font-mono">Saved ✓</span>}
            <button onClick={handleSave} className="px-4 py-1.5 bg-[#FF7A00] text-white font-heading font-bold text-xs rounded-full hover:bg-[#E66A00] transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-[1200px] mx-auto px-6 py-8 flex gap-8">
        <nav className="w-44 shrink-0 flex flex-col gap-1">
          {tabs.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`text-left px-4 py-2 rounded-xl text-sm transition-colors ${
                tab === t.key ? "bg-white/10 text-white font-medium" : "text-white/50 hover:text-white hover:bg-white/5"
              }`}>
              {t.label}
            </button>
          ))}
        </nav>

        <div className="flex-1 min-w-0">
          <motion.div key={tab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.15 }}>
            {/* Hero */}
            {tab === "hero" && (
              <div className="space-y-4">
                <h2 className="font-heading font-bold text-lg">Hero Section</h2>
                {(["line1", "line2", "line3"] as const).map((f) => (
                  <div key={f}>
                    <label className="text-xs font-mono text-white/40 uppercase tracking-wider mb-1 block">{f}</label>
                    <input value={content.hero[f]} onChange={(e) => updateHero(f, e.target.value)}
                      className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-sm focus:outline-none focus:border-[#FF7A00] transition-colors" />
                  </div>
                ))}
              </div>
            )}

            {/* Stats */}
            {tab === "stats" && (
              <div className="space-y-4">
                <h2 className="font-heading font-bold text-lg">Stats</h2>
                {content.stats.map((stat, i) => (
                  <div key={i} className="flex gap-3 items-start bg-white/5 rounded-xl p-4">
                    <span className="text-xs font-mono text-white/30 mt-2.5 shrink-0">#{i + 1}</span>
                    <div className="flex-1 grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-mono text-white/40 uppercase tracking-wider block mb-1">Value</label>
                        <input value={stat.value} onChange={(e) => updateStat(i, "value", e.target.value)}
                          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-sm focus:outline-none focus:border-[#FF7A00] transition-colors" />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-white/40 uppercase tracking-wider block mb-1">Label</label>
                        <input value={stat.label} onChange={(e) => updateStat(i, "label", e.target.value)}
                          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-sm focus:outline-none focus:border-[#FF7A00] transition-colors" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Skills */}
            {tab === "skills" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="font-heading font-bold text-lg">Skills</h2>
                  <button onClick={addSkill} className="text-xs px-3 py-1.5 bg-white/10 rounded-full hover:bg-white/20 transition-colors">+ Add</button>
                </div>
                {content.skills.map((skill, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <input value={skill} onChange={(e) => updateSkill(i, e.target.value)}
                      className="flex-1 px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-sm focus:outline-none focus:border-[#FF7A00] transition-colors" />
                    <button onClick={() => removeSkill(i)} className="p-2 text-white/30 hover:text-red-400 transition-colors text-xs">✕</button>
                  </div>
                ))}
              </div>
            )}

            {/* Projects */}
            {tab === "projects" && (
              <div className="space-y-6">
                <h2 className="font-heading font-bold text-lg">Projects</h2>
                {content.projects.map((proj, i) => (
                  <div key={proj.slug} className="bg-white/5 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-white/30">#{i + 1} — {proj.slug}</span>
                    </div>
                    {(["title", "role", "year", "category", "image"] as const).map((f) => (
                      <div key={f}>
                        <label className="text-[10px] font-mono text-white/40 uppercase tracking-wider block mb-1">{f}</label>
                        <input value={proj[f]} onChange={(e) => updateProject(i, f, e.target.value)}
                          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-sm focus:outline-none focus:border-[#FF7A00] transition-colors" />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {/* Services */}
            {tab === "services" && (
              <div className="space-y-6">
                <h2 className="font-heading font-bold text-lg">Services</h2>
                {content.services.slides.map((slide, si) => (
                  <div key={si} className="bg-white/5 rounded-xl p-4 space-y-3">
                    <div>
                      <label className="text-[10px] font-mono text-white/40 uppercase tracking-wider block mb-1">Slide {si + 1} Title</label>
                      <input value={slide.title} onChange={(e) => updateServiceSlide(si, e.target.value)}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-sm focus:outline-none focus:border-[#FF7A00] transition-colors" />
                    </div>
                    {slide.items.map((item, ii) => (
                      <div key={ii} className="border-t border-white/10 pt-3">
                        <div className="text-xs text-white/30 mb-2">Item {ii + 1} — {item.num}</div>
                        <div className="grid gap-2">
                          <input value={item.title} onChange={(e) => updateServiceItem(si, ii, "title", e.target.value)}
                            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-sm focus:outline-none focus:border-[#FF7A00] transition-colors" placeholder="Title" />
                          <textarea value={item.desc} onChange={(e) => updateServiceItem(si, ii, "desc", e.target.value)}
                            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-sm focus:outline-none focus:border-[#FF7A00] transition-colors resize-none" rows={2} placeholder="Description" />
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {/* Industries */}
            {tab === "industries" && (
              <div className="space-y-4">
                <h2 className="font-heading font-bold text-lg">Industries</h2>
                {content.industries.map((ind, i) => (
                  <div key={i} className="bg-white/5 rounded-xl p-4 space-y-3">
                    <span className="text-xs font-mono text-white/30 block">#{i + 1}</span>
                    <div>
                      <label className="text-[10px] font-mono text-white/40 uppercase tracking-wider block mb-1">Title</label>
                      <input value={ind.title} onChange={(e) => updateIndustry(i, "title", e.target.value)}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-sm focus:outline-none focus:border-[#FF7A00] transition-colors" />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-white/40 uppercase tracking-wider block mb-1">Description</label>
                      <textarea value={ind.desc} onChange={(e) => updateIndustry(i, "desc", e.target.value)}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-sm focus:outline-none focus:border-[#FF7A00] transition-colors resize-none" rows={2} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* About */}
            {tab === "about" && (
              <div className="space-y-4">
                <h2 className="font-heading font-bold text-lg">About</h2>
                {(["intro", "paragraph1", "paragraph2"] as const).map((f) => (
                  <div key={f}>
                    <label className="text-xs font-mono text-white/40 uppercase tracking-wider mb-1 block">{f}</label>
                    <textarea value={content.about[f]} onChange={(e) => updateAbout(f, e.target.value)}
                      className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-sm focus:outline-none focus:border-[#FF7A00] transition-colors resize-none" rows={3} />
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-4">
            <button onClick={handleSave} className="px-6 py-2.5 bg-[#FF7A00] text-white font-heading font-bold text-sm rounded-full hover:bg-[#E66A00] transition-colors">
              Save Changes
            </button>
            <button onClick={handleReset} className="px-4 py-2.5 text-xs text-white/40 hover:text-red-400 transition-colors">
              Reset to Default
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
