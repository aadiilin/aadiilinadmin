import { useState, useRef, useEffect } from "react"
import { Link } from "wouter"
import { Loader2, Settings } from "lucide-react"
import {
  checkPassword, getContent, saveLocal, resetLocal, exportJSON,
  deployToGitHub, getGitHubToken, setGitHubToken, SiteContent,
} from "@/lib/content-store"
import { VisualEditor } from "@/components/visual-editor"

export function Admin() {
  const [authed, setAuthed] = useState(false)
  const [pw, setPw] = useState("")
  const [content, setContent] = useState<SiteContent>(() => getContent())
  const [deploying, setDeploying] = useState(false)
  const [deployMsg, setDeployMsg] = useState<{ ok: boolean; text: string } | null>(null)
  const [showToken, setShowToken] = useState(false)
  const [tokenInput, setTokenInput] = useState(getGitHubToken())
  const importRef = useRef<HTMLInputElement>(null)

  function handleLogin() {
    if (checkPassword(pw)) setAuthed(true)
  }

  async function handleDeploy() {
    const token = getGitHubToken()
    if (!token) {
      setDeployMsg({ ok: false, text: "Set your GitHub token first (⚙ Settings)" })
      return
    }
    saveLocal(content)
    setDeploying(true)
    setDeployMsg(null)
    try {
      await deployToGitHub(content, token)
      setDeployMsg({ ok: true, text: "Deployed to GitHub! Vercel rebuilds in ~1–2 min." })
    } catch (e: any) {
      setDeployMsg({ ok: false, text: e.message || "Deploy failed" })
    }
    setDeploying(false)
  }

  function handleReset() {
    if (confirm("Reset all content to defaults?")) {
      resetLocal()
      setContent(getContent())
      setDeployMsg(null)
    }
  }

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result as string)
        saveLocal(data)
        setContent(data)
      } catch { alert("Invalid JSON file") }
    }
    reader.readAsText(file)
  }

  function saveToken() {
    setGitHubToken(tokenInput)
    setShowToken(false)
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

  return (
    <div className="h-screen bg-[#0a0a0a] text-white flex flex-col">
      {/* Header bar */}
      <header className="shrink-0 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10 z-50">
        <div className="px-4 h-12 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="font-heading font-bold text-sm text-white/60 hover:text-white transition-colors">← Site</Link>
            <span className="text-xs font-mono text-white/30 uppercase tracking-wider">Editor</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={exportJSON} className="text-[11px] px-2.5 py-1 bg-white/10 rounded-full hover:bg-white/20 transition-colors">Export</button>
            <button onClick={() => importRef.current?.click()} className="text-[11px] px-2.5 py-1 bg-white/10 rounded-full hover:bg-white/20 transition-colors">Import</button>
            <input ref={importRef} type="file" accept=".json" onChange={handleImport} className="hidden" />
            <button onClick={() => setShowToken(!showToken)} className="p-1.5 text-white/40 hover:text-white transition-colors">
              <Settings size={13} />
            </button>
            <button onClick={handleDeploy} disabled={deploying}
              className="px-3.5 py-1.5 bg-[#FF7A00] text-white font-heading font-bold text-[11px] rounded-full hover:bg-[#E66A00] transition-colors disabled:opacity-50 flex items-center gap-1">
              {deploying ? <Loader2 size={11} className="animate-spin" /> : null}
              {deploying ? "Deploying..." : "Save & Deploy"}
            </button>
          </div>
        </div>

        {/* Token bar */}
        {showToken && (
          <div className="border-t border-white/10 px-4 py-2">
            <div className="flex items-center gap-3 max-w-md">
              <span className="text-[10px] text-white/40 font-mono shrink-0">GitHub Token</span>
              <input type="password" value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                placeholder="ghp_..."
                className="flex-1 px-2.5 py-1 bg-white/10 border border-white/20 rounded text-[11px] focus:outline-none focus:border-[#FF7A00]" />
              <button onClick={saveToken} className="text-[10px] px-2 py-1 bg-white/10 rounded-full hover:bg-white/20">Save</button>
            </div>
          </div>
        )}

        {/* Deploy msg */}
        {deployMsg && (
          <div className={`border-t ${deployMsg.ok ? "border-green-500/30" : "border-red-500/30"} px-4 py-1.5`}>
            <div className="flex items-center gap-1.5">
              <span className={`text-[10px] ${deployMsg.ok ? "text-green-400" : "text-red-400"}`}>{deployMsg.text}</span>
            </div>
          </div>
        )}
      </header>

      {/* Editor */}
      <div className="flex-1 overflow-hidden">
        <VisualEditor content={content} onChange={(c) => { setContent(c); saveLocal(c) }} />
      </div>

      {/* Bottom bar */}
      <div className="shrink-0 border-t border-white/10 px-4 py-1.5 flex items-center justify-between bg-zinc-900/50">
        <div className="flex items-center gap-3">
          <button onClick={handleReset} className="text-[10px] text-white/30 hover:text-red-400 transition-colors">Reset to Defaults</button>
        </div>
        <div className="text-[9px] font-mono text-white/20">
          changes auto-save locally · deploy to publish live
        </div>
      </div>
    </div>
  )
}
