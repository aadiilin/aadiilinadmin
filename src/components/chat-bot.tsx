import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, Sparkles } from "lucide-react"

interface Message {
  role: "user" | "bot"
  content: string
}

const RESPONSES: { keywords: string[]; reply: string }[] = [
  {
    keywords: ["hello", "hi", "hey", "greetings", "sup", "yo"],
    reply: "Hey there! I'm Aadiilin's AI assistant. Ask me anything about his graphic design work, services, pricing, projects, or how to get in touch!"
  },
  {
    keywords: ["who", "are you", "aadiilin", "about", "tell me", "adil", "sarvadka"],
    reply: "Aadiilin (Adil Sarvadka) is a freelance graphic designer based in Kasaragod, Kerala, India. He specializes in poster design, brand identity, campaign visuals, art direction, and editorial layout — crafting bold visuals that resonate."
  },
  {
    keywords: ["service", "offer", "do you", "provide", "what can", "help with", "capabilities"],
    reply: "Aadiilin offers:\n• Poster Design & Event Visuals\n• Brand Identity & Logo Systems\n• Campaign Visuals & Art Direction\n• Editorial Layout & Typography\n• Web Design & UI Prototyping\n• Packaging Design & Motion Graphics"
  },
  {
    keywords: ["price", "cost", "rate", "hire", "charge", "budget", "fees", "expensive"],
    reply: "Pricing depends on project scope:\n• Poster design: starts around ₹1,500\n• Full Brand Identity package: ₹5,000 – ₹15,000\nFor an exact quote, email adilsarvadka@gmail.com or call/WhatsApp +91 81378 02554!"
  },
  {
    keywords: ["contact", "email", "phone", "reach", "message", "whatsapp", "call", "dm", "connect"],
    reply: "Connect with Aadiilin directly:\n📧 Email: adilsarvadka@gmail.com\n📱 Phone / WhatsApp: +91 81378 02554\n📸 Instagram DM: @aadiil.in\n💼 LinkedIn: linkedin.com/in/adil-sarvadka-51282a406"
  },
  {
    keywords: ["project", "portfolio", "work", "showcase", "imbizo", "an-nur", "hijra", "keam", "enroute", "token", "savelio"],
    reply: "Aadiilin's featured projects include:\n1. IMBIZO 1.0 — Arts Fest Identity & Poster Series\n2. An-Nur 1500 — Commemorative Campaign Visuals\n3. Hijra Talk Series — Event Identity & Announcement Layout\n4. KEAM 2025 Results — Editorial Layout for Science Orbit\n5. Savelio & FestBoard — Digital SAAS Products"
  },
  {
    keywords: ["location", "where", "kasaragod", "kerala", "india", "based"],
    reply: "Aadiilin is based in Kasaragod, Kerala, India. He works with clients locally and globally — all project deliverables are handled seamlessly online."
  },
  {
    keywords: ["skill", "tools", "software", "photoshop", "illustrator", "figma", "indesign", "after effects", "react"],
    reply: "Aadiilin is proficient in Adobe Photoshop, Illustrator, InDesign, After Effects, Figma, Canva, and modern web development technologies like React, TypeScript, and Tailwind CSS."
  },
  {
    keywords: ["education", "study", "baithul", "izza"],
    reply: "Aadiilin studied at Baithul Izza in Kasaragod, developing his design skills through hands-on work in event branding, editorial design, and campaign visual identity."
  },
  {
    keywords: ["availability", "available", "freelance", "book", "open"],
    reply: "Yes! Aadiilin is currently available for freelance projects. Feel free to reach out via email or WhatsApp to discuss your project requirements."
  },
  {
    keywords: ["thanks", "thank", "appreciate"],
    reply: "You're very welcome! Feel free to ask anything else — happy to help!"
  }
]

const FALLBACK = "I'm here to help with questions about Aadiilin's graphic design work, services, project pricing, portfolio (IMBIZO, An-Nur, Hijra, KEAM), or how to reach him at adilsarvadka@gmail.com!"

function getBotReply(input: string): string {
  const lower = input.toLowerCase()
  for (const item of RESPONSES) {
    if (item.keywords.some((k) => lower.includes(k))) return item.reply
  }
  return FALLBACK
}

export function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: "Hi! Welcome to Aadiilin's portfolio assistant. I can answer questions about:\n\n• Services & pricing\n• Portfolio projects (IMBIZO 1.0, An-Nur, Hijra, KEAM)\n• Skills & design tools\n• Contact details & availability\n\nWhat would you like to know?" }
  ])

  const [input, setInput] = useState("")
  const [typing, setTyping] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300)
  }, [open])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, typing])

  function handleSend() {
    const text = input.trim()
    if (!text || typing) return
    setMessages((prev) => [...prev, { role: "user", content: text }])
    setInput("")
    setTyping(true)
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "bot", content: getBotReply(text) }])
      setTyping(false)
    }, 400 + Math.random() * 300)
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-[90] flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-text text-white text-sm font-medium shadow-lg hover:opacity-90 transition-opacity"
        aria-label="Toggle chat"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a4 4 0 014 4c0 2-2 3-2 5h-4c0-2-2-3-2-5a4 4 0 014-4z" />
          <path d="M8 14h8" />
          <path d="M9 18h6" />
        </svg>
        Ask AI
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-[90] w-[340px] max-w-[calc(100vw-2rem)] h-[460px] max-h-[calc(100vh-10rem)] bg-surface border border-line rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-line">
              <div className="w-8 h-8 rounded-full bg-subtle flex items-center justify-center">
                <Sparkles size={14} className="text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-heading font-bold text-sm text-text">AI Assistant</div>
                <div className="text-[10px] text-muted uppercase tracking-wider">Ask about Jomor Design</div>

              </div>
              <button onClick={() => setOpen(false)} className="p-1 hover:bg-subtle rounded-lg transition-colors">
                <X size={14} className="text-muted" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] px-3 py-2.5 rounded-xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-accent text-white rounded-br-sm"
                        : "bg-subtle text-text rounded-bl-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="bg-subtle px-3 py-2.5 rounded-xl rounded-bl-sm flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-faint rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-faint rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-faint rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            <div className="border-t border-line p-3">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-subtle rounded-xl px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-accent/30 text-text placeholder:text-faint"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || typing}
                  className="w-9 h-9 rounded-xl bg-subtle flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-subtle/80 transition-colors shrink-0"
                >
                  <Send size={14} className="text-text" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
