import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, X, Send, Sparkles } from "lucide-react"

interface Message {
  role: "user" | "bot"
  content: string
}

const RESPONSES: { keywords: string[]; reply: string }[] = [
  {
    keywords: ["hello", "hi", "hey", "greetings"],
    reply: "Hey there! I'm Aadiilin's AI assistant. Ask me about his design work, services, or how to get in touch!"
  },
  {
    keywords: ["who", "are you", "aadiilin", "about"],
    reply: "Aadiilin (Adil Sarvadka) is a freelance graphic designer from Kasaragod, Kerala. He specializes in poster design, brand identity, campaign visuals, and art direction."
  },
  {
    keywords: ["service", "offer", "do you", "work"],
    reply: "Aadiilin offers: Poster Design, Brand Identity, Campaign Visuals, Art Direction, Editorial Layout, Typography, Packaging Design, and Creative Strategy."
  },
  {
    keywords: ["price", "cost", "rate", "hire", "charge"],
    reply: "For project inquiries and pricing, please reach out via the contact form on this site or email adilsarvadka@gmail.com."
  },
  {
    keywords: ["contact", "email", "phone", "reach", "message"],
    reply: "You can reach Aadiilin at:\n• Email: adilsarvadka@gmail.com\n• Phone: +91 81378 02554\n• Instagram: @aadiil.in"
  },
  {
    keywords: ["project", "portfolio", "work", "seen", "showcase"],
    reply: "Check out the 'Selected Works' section above! It features projects like IMBIZO 1.0, An-Nur Fifteen Hundred, Hijra Talk Series, KEAM 2025 Results, Enroute, and more."
  },
  {
    keywords: ["thanks", "thank", "appreciate"],
    reply: "You're welcome! Feel free to ask anything else about Aadiilin's work. Happy browsing!"
  }
]

const FALLBACK = "I'm not sure I understand — try asking about Aadiilin's work, services, or how to get in touch!"

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
    { role: "bot", content: "Hi! I'm Aadiilin's AI assistant. Ask me anything about his design work!" }
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
        className="fixed bottom-6 right-6 z-[90] w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-all duration-200 border border-line bg-be hover:bg-be/80"
        aria-label="Toggle chat"
      >
        {open ? <X size={18} className="text-l1" /> : <MessageSquare size={18} className="text-l1" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-[90] w-[340px] max-w-[calc(100vw-2rem)] h-[460px] max-h-[calc(100vh-10rem)] bg-bg border border-line rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-line">
              <div className="w-8 h-8 rounded-full bg-be flex items-center justify-center">
                <Sparkles size={14} className="text-selection" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-sans font-bold text-sm text-l1">AI Assistant</div>
                <div className="text-[10px] text-l3 uppercase tracking-wider">Ask about Aadiilin's work</div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] px-3 py-2.5 rounded-xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-selection text-black rounded-br-sm"
                        : "bg-be text-l1 rounded-bl-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="bg-be px-3 py-2.5 rounded-xl rounded-bl-sm flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-l3 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-l3 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-l3 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
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
                  className="flex-1 bg-be rounded-xl px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-selection/40 text-l1 placeholder:text-l3"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || typing}
                  className="w-9 h-9 rounded-xl bg-be flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-be/80 transition-colors shrink-0"
                >
                  <Send size={14} className="text-l1" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
