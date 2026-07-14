import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, X, Send, Sparkles, Bot } from "lucide-react"

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
    reply: "Aadiilin (Adil Sarvadka) is a freelance graphic designer from Kasaragod, Kerala. He specializes in poster design, brand identity, campaign visuals, and art direction — creating bold, modern, and visually compelling work."
  },
  {
    keywords: ["service", "offer", "do you", "work"],
    reply: "Aadiilin offers: Poster Design, Brand Identity, Campaign Visuals, Art Direction, Editorial Layout, Typography, Packaging Design, and Creative Strategy. He's currently accepting select projects!"
  },
  {
    keywords: ["price", "cost", "rate", "hire", "charge"],
    reply: "For project inquiries and pricing, please reach out via the contact form on this site or email adilsarvadka@gmail.com. Each project is scoped individually based on requirements."
  },
  {
    keywords: ["contact", "email", "phone", "reach", "message"],
    reply: "You can reach Aadiilin at:\n• Email: adilsarvadka@gmail.com\n• Phone: +91 81378 02554\n• Instagram: @aadiil.in\nOr use the contact form on this page!"
  },
  {
    keywords: ["project", "portfolio", "work", "seen", "showcase"],
    reply: "Check out the 'Selected Works' section above! It features 10 projects including IMBIZO 1.0, An-Nur Fifteen Hundred, Hijra Talk Series, KEAM 2025 Results, Enroute, Token of Love, and more."
  },
  {
    keywords: ["instagram", "insta", "social", "follow"],
    reply: "Follow Aadiilin on Instagram at @aadiil.in for the latest design work and behind-the-scenes content!"
  },
  {
    keywords: ["thanks", "thank", "appreciate"],
    reply: "You're welcome! Feel free to ask anything else about Aadiilin's work. Happy browsing!"
  }
]

const FALLBACK_REPLY = "I'm not sure I understand — but I can help with questions about Aadiilin's design services, portfolio, or contact info! Try asking about his work, services, or how to get in touch."

function getBotReply(input: string): string {
  const lower = input.toLowerCase()
  for (const item of RESPONSES) {
    for (const keyword of item.keywords) {
      if (lower.includes(keyword)) {
        return item.reply
      }
    }
  }
  return FALLBACK_REPLY
}

export function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: "Hi! I'm Aadiilin's AI assistant. Ask me anything about his design work!" }
  ])
  const [input, setInput] = useState("")
  const [typing, setTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [open])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, typing])

  function handleSend() {
    const text = input.trim()
    if (!text || typing) return

    setMessages((prev) => [...prev, { role: "user", content: text }])
    setInput("")
    setTyping(true)

    setTimeout(() => {
      const reply = getBotReply(text)
      setMessages((prev) => [...prev, { role: "bot", content: reply }])
      setTyping(false)
    }, 600 + Math.random() * 400)
  }

  return (
    <>
      {/* Chat bubble button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-[90] w-14 h-14 rounded-full glass-card flex items-center justify-center shadow-2xl hover:scale-110 transition-transform group"
        aria-label="Toggle chat"
      >
        {open ? (
          <X size={22} className="text-primary" />
        ) : (
          <MessageSquare size={22} className="text-primary" />
        )}
      </button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-[90] w-[360px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-10rem)] glass rounded-2xl overflow-hidden shadow-2xl flex flex-col border border-white/10"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
              <div className="w-9 h-9 rounded-full glossy-button flex items-center justify-center">
                <Sparkles size={16} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-title font-bold text-sm">AI Assistant</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Ask about Aadiilin's work</div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "glass rounded-bl-md"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {typing && (
                <div className="flex justify-start">
                  <div className="glass px-4 py-3 rounded-2xl rounded-bl-md flex items-center gap-2">
                    <Bot size={14} className="text-primary" />
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-white/10 p-3">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSend()
                  }}
                  placeholder="Ask me anything..."
                  className="flex-1 recessed-input rounded-xl px-4 py-2.5 text-sm outline-none focus-visible:ring-1 focus-visible:ring-primary/30 placeholder:text-muted-foreground/40 bg-transparent"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || typing}
                  className="w-10 h-10 rounded-xl glossy-button flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 transition-transform shrink-0"
                >
                  <Send size={16} className="text-primary" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
