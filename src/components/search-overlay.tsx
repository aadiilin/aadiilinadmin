import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, ExternalLink } from "lucide-react"
import { PROJECTS, SKILLS } from "@/lib/seo-data"
import { FAQS } from "@/lib/faq-data"

interface SearchResult {
  type: "project" | "skill" | "faq"
  title: string
  description?: string
  href: string
}

export function SearchOverlay() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setOpen(true)
      }
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100)
  }, [open])

  useEffect(() => {
    if (!query.trim()) { setResults([]); return }
    const q = query.toLowerCase()

    const projectResults: SearchResult[] = PROJECTS
      .filter((p) => p.title.toLowerCase().includes(q) || p.role.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
      .map((p) => ({ type: "project" as const, title: p.title, description: p.role, href: `#work` }))

    const skillResults: SearchResult[] = SKILLS
      .filter((s) => s.toLowerCase().includes(q))
      .map((s) => ({ type: "skill" as const, title: s, href: `#work` }))

    const faqResults: SearchResult[] = FAQS
      .filter((f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q))
      .map((f) => ({ type: "faq" as const, title: f.question, description: f.answer.slice(0, 100) + "...", href: `#faq` }))

    setResults([...projectResults, ...skillResults, ...faqResults].slice(0, 12))
  }, [query])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 text-sm text-muted hover:text-text transition-colors"
        aria-label="Search"
      >
        <Search size={14} />
        <span className="hidden sm:inline text-xs font-mono">Search</span>
        <kbd className="hidden sm:inline-flex text-[10px] px-1.5 py-0.5 rounded border border-line text-faint font-mono">⌘K</kbd>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-text/60 backdrop-blur-sm flex items-start justify-center pt-[15vh]"
          >
            <motion.div
              initial={{ y: -20, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="w-full max-w-lg bg-surface rounded-2xl shadow-2xl border border-line overflow-hidden"
            >
              <div className="flex items-center gap-3 px-4 py-3 border-b border-line">
                <Search size={16} className="text-muted shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search projects, skills, FAQs..."
                  className="flex-1 bg-transparent text-sm text-text outline-none placeholder:text-faint"
                />
                <button onClick={() => setOpen(false)} className="p-1 hover:bg-subtle rounded-lg transition-colors">
                  <X size={14} className="text-muted" />
                </button>
              </div>

              <div className="max-h-[50vh] overflow-y-auto p-2">
                {results.length === 0 && query.trim() && (
                  <div className="py-8 text-center text-sm text-muted">No results found</div>
                )}
                {results.length === 0 && !query.trim() && (
                  <div className="py-8 text-center text-sm text-muted">Type to search projects, skills, and FAQs</div>
                )}
                <div className="space-y-1">
                  {results.map((r, i) => (
                    <a
                      key={i}
                      href={r.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-subtle transition-colors group"
                    >
                      <span className="text-[10px] font-mono uppercase tracking-wider text-faint shrink-0 w-14">
                        {r.type}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-text truncate">{r.title}</div>
                        {r.description && (
                          <div className="text-xs text-muted truncate mt-0.5">{r.description}</div>
                        )}
                      </div>
                      <ExternalLink size={12} className="text-faint shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="px-4 py-2.5 border-t border-line flex items-center gap-4 text-[10px] text-faint font-mono">
                <span><kbd className="px-1 py-0.5 rounded border border-line">↑↓</kbd> Navigate</span>
                <span><kbd className="px-1 py-0.5 rounded border border-line">↲</kbd> Open</span>
                <span><kbd className="px-1 py-0.5 rounded border border-line">Esc</kbd> Close</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
