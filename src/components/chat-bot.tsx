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
    reply: "Hey there! I'm Aadiilin's AI assistant. Ask me anything about his design work, services, skills, projects, or how to get in touch!"
  },
  {
    keywords: ["who", "are you", "aadiilin", "about", "tell me", "adil", "sarvadka"],
    reply: "Aadiilin (Adil Sarvadka) is a freelance graphic designer from Kasaragod, Kerala, India. He specializes in poster design, brand identity, campaign visuals, art direction, and editorial layout. He crafts bold visuals and strategic design solutions that resonate."
  },
  {
    keywords: ["service", "offer", "do you", "provide", "what can", "help with"],
    reply: "Aadiilin offers: Poster Design, Brand Identity & Logo Design, Campaign Visuals, Art Direction, Editorial Layout, Typography, Packaging Design, and Creative Strategy. Whether you need a single poster or a full brand identity, he's got you covered."
  },
  {
    keywords: ["price", "cost", "rate", "hire", "charge", "budget", "expensive", "fees"],
    reply: "Pricing depends on project scope and complexity. A simple poster starts around ₹1,500, while a full brand identity package ranges from ₹5,000–₹15,000. For an accurate quote, reach out via email at adilsarvadka@gmail.com or use the contact form to send details directly to WhatsApp."
  },
  {
    keywords: ["contact", "email", "phone", "reach", "message", "whatsapp", "call", "dm", "connect", "get in touch", "talk", "collaborate"],
    reply: "Here's how you can connect with Aadiilin:\n📧 Email: adilsarvadka@gmail.com\n📱 Phone / WhatsApp: +91 81378 02554\n📸 Instagram DM: ig.me/m/aadiil.in\n💼 LinkedIn: linkedin.com/in/adil-sarvadka-51282a406\n\nThe contact form (section 04) lets you send via WhatsApp or Instagram DM!"
  },
  {
    keywords: ["project", "portfolio", "work", "showcase", "done", "built", "designed", "create"],
    reply: "Check out the 'Selected Work' section above! It features projects like IMBIZO 1.0 (arts fest identity), An-Nur Fifteen Hundred (commemorative campaign), Hijra Talk Series (Muharram event), KEAM 2025 Results (editorial), Enroute (travel campaign), Token Of Love (poster series), and more."
  },
  {
    keywords: ["thanks", "thank", "appreciate", "grateful"],
    reply: "You're very welcome! Feel free to ask anything else — I'm here to help. Happy browsing!"
  },
  {
    keywords: ["skill", "tools", "software", "proficient", "tech", "stack", "photoshop", "illustrator", "figma", "indesign", "after effects"],
    reply: "Aadiilin is proficient in: Adobe Photoshop, Adobe Illustrator, Adobe InDesign, Adobe After Effects, Figma, Canva, and CorelDRAW. He also has experience with web technologies like HTML, CSS, and React for design-adjacent projects."
  },
  {
    keywords: ["location", "where", "based", "kasaragod", "kerala", "india", "live"],
    reply: "Aadiilin is based in Kasaragod, Kerala, India. He works with clients locally and globally — all projects are delivered remotely."
  },
  {
    keywords: ["experience", "background", "history", "started", "begin", "journey"],
    reply: "Aadiilin started his design journey in Kerala and has been creating visual content for over a year. He has worked with Baithul Izza on event identities, campaign visuals, and editorial layouts. His style blends bold typography with cultural aesthetics."
  },
  {
    keywords: ["process", "how work", "workflow", "step", "method", "approach"],
    reply: "Aadiilin's design process: 1) Brief & Discovery — understand your vision and requirements, 2) Research & Concept — explore styles and create initial concepts, 3) Design & Refine — develop the chosen direction with revisions, 4) Final Delivery — provide ready-to-use files in your preferred formats."
  },
  {
    keywords: ["availability", "available", "freelance", "book", "free", "open"],
    reply: "Yes, Aadiilin is currently available for freelance projects! The 'Open to work' badge in the header confirms it. Reach out via email or WhatsApp to discuss your project."
  },
  {
    keywords: ["education", "study", "learn", "course", "college", "school", "degree", "qualification"],
    reply: "Aadiilin studied at Baithul Izza in Kasaragod, where he developed his design skills through hands-on projects in event branding, editorial design, and campaign visuals. He is continuously learning and exploring new design techniques and tools."
  },
  {
    keywords: ["social", "instagram", "twitter", "x", "linkedin", "github", "pinterest", "behance", "dribbble", "follow"],
    reply: "Follow Aadiilin online:\n• Instagram: @aadiil.in\n• LinkedIn: linkedin.com/in/adil-sarvadka-51282a406\n• GitHub: github.com/aadiilin\n• Pinterest: @aadiilin"
  },
  {
    keywords: ["file", "format", "delivery", "source", "vector", "print", "resolution", "pdf", "png", "ai"],
    reply: "Final deliverables include print-ready PDF, high-resolution PNG/JPEG, and source files (AI, PSD, INDD) depending on the project agreement. All files are delivered digitally via email or cloud storage."
  },
  {
    keywords: ["revision", "change", "edit", "modify", "adjust", "feedback", "update", "rework"],
    reply: "Revisions are included as part of the design process. Typically 2-3 rounds of revisions are provided per project. Additional revisions can be arranged if needed — just discuss during the briefing stage."
  },
  {
    keywords: ["timeline", "time", "duration", "how long", "deadline", "when", "turnaround", "delivery"],
    reply: "Timelines depend on project complexity: Poster designs typically take 2-5 days, brand identity projects take 1-3 weeks, and campaign design timelines are agreed upon during briefing. Rush delivery may be available on request."
  },
  {
    keywords: ["client", "customer", "collaborate", "team", "baithul", "izza", "work with"],
    reply: "Aadiilin has worked with Baithul Izza on multiple projects including event identities for IMBIZO 1.0 arts fest, commemorative campaigns like An-Nur 1500, the Hijra Talk Series, and editorial layouts for KEAM results announcements."
  },
  {
    keywords: ["brand", "identity", "logo", "rebrand", "branding"],
    reply: "Yes! Aadiilin offers full brand identity services including logo design, color palette selection, typography pairing, brand guidelines, and visual identity systems. Check the 'Selected Work' section for examples."
  },
  {
    keywords: ["poster", "flyer", "banner", "print", "brochure", "leaflet"],
    reply: "Poster design is one of Aadiilin's core specialties. He creates posters for events, campaigns, announcements, and promotions — from bold typographic posters to illustrated and photo-based designs."
  },
  {
    keywords: ["typography", "font", "type", "lettering", "text", "calligraphy"],
    reply: "Typography is a key strength of Aadiilin's work. He combines modern typefaces with calligraphic accents to create striking visual hierarchies. His projects often feature custom type treatments and expressive lettering."
  },
  {
    keywords: ["motion", "animation", "video", "after effects", "animate", "gif"],
    reply: "Yes, Aadiilin creates motion graphics using Adobe After Effects. This includes animated logos, social media motion content, UI animations, and short promotional clips."
  },
  {
    keywords: ["website", "web", "development", "coding", "frontend", "react", "html", "css"],
    reply: "Beyond graphic design, Aadiilin has web development skills including HTML, CSS, JavaScript, React, and Tailwind CSS. This portfolio website was built by him using React, Vite, and Tailwind CSS."
  },
  {
    keywords: ["savelio", "festboard", "product", "saas", "app", "build", "software"],
    reply: "Aadiilin has built several digital products including Savelio and FestBoard. These are part of his entrepreneurial projects combining design with full-stack development."
  },
  {
    keywords: ["bye", "goodbye", "see you", "later", "cya", "exit"],
    reply: "Thanks for stopping by! Feel free to come back anytime if you have more questions about Aadiilin's work. Have a great day!"
  },
  {
    keywords: ["imbizo", "an-nur", "hijra", "keam", "enroute", "guest", "token", "award", "wedding"],
    reply: "That's one of Aadiilin's projects! You can see it in the 'Selected Work' section above — click on any project card to view the full image in a lightbox. Each project showcases his skills in graphic design, typography, and visual storytelling."
  },
  {
    keywords: ["payment", "pay", "deposit", "advance", "money", "rupees", "currency", "upi", "bank"],
    reply: "Aadiilin accepts payments via UPI (GPay, PhonePe), direct bank transfer, and PayPal for international clients. A 50% advance is typically required before work begins, with the remaining 50% due on final delivery."
  },
  {
    keywords: ["language", "speak", "malayalam", "hindi", "arabic", "english", "fluent"],
    reply: "Aadiilin speaks multiple languages: Malayalam (native), English (fluent), Hindi (fluent), and Arabic. He can communicate with clients in any of these languages."
  },
  {
    keywords: ["print", "digital", "social media", "online", "pixel", "resolution", "dpi", "size"],
    reply: "Aadiilin designs for both print and digital. Print projects use CMYK with 300 DPI resolution, while digital projects use RGB. He can prepare files optimized for social media, web, or professional printing."
  },
  {
    keywords: ["recommend", "suggest", "advice", "tips", "guide", "help me", "idea", "inspiration"],
    reply: "Great question! Aadiilin always recommends starting with a clear brief — knowing your audience, message, and medium. He offers free initial consultations to discuss your vision and provide guidance before any project begins."
  },
  {
    keywords: ["festival", "event", "muharram", "cultural", "religious", "celebration", "occasion"],
    reply: "Aadiilin has experience designing for cultural and religious events including Muharram campaigns, Mawlid commemorations, and community festivals. He blends modern design with traditional and cultural aesthetics."
  },
  {
    keywords: ["source", "code", "github", "repository", "open source", "template"],
    reply: "This portfolio website is open source! You can find the full source code on GitHub at github.com/aadiilin/aadiilin. It's built with React, Vite, TypeScript, and Tailwind CSS."
  },
  {
    keywords: ["meaning", "why aadiilin", "name", "brand name", "professional"],
    reply: "Aadiilin is the professional brand name chosen by Adil Sarvadka for his graphic design work. It represents his creative identity and is how he presents his design portfolio to the world."
  },
  {
    keywords: ["certificate", "certification", "course", "diploma", "training", "workshop", "learn design"],
    reply: "Aadiilin developed his skills through hands-on practical experience at Baithul Izza and continues learning through real projects. He believes in learning by doing rather than formal certifications alone."
  },
  {
    keywords: ["target", "audience", "niche", "industry", "sector", "field", "specialize", "focus"],
    reply: "Aadiilin works across multiple industries including cultural events, educational institutions, community organizations, and small businesses. His style adapts to each client's unique audience and message."
  },
  {
    keywords: ["aadiilin", "aadiil.in", "username", "handle", "profile", "portfolio", "instagram handle", "website"],
    reply: "Aadiilin is active across platforms:\n🌐 Website: aadiilin.vercel.app\n📸 Instagram: @aadiil.in\n💻 GitHub: github.com/aadiilin\n💼 LinkedIn: linkedin.com/in/adil-sarvadka-51282a406\n📌 Pinterest: @aadiilin"
  },
]

const FALLBACK = "I'm not sure I understand — try asking about Aadiilin's background, services, projects, skills, pricing, or how to contact him. You can also check the FAQ section above for common questions! Here's what I can help with:\n• Who is Aadiilin?\n• Services & pricing\n• Projects & portfolio\n• Contact & social links\n• Skills & tools\n• Design process\n• Availability"

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
    { role: "bot", content: "👋 Hi! I'm Aadiilin's AI assistant. I can answer anything about him:\n\n🎨 Services & pricing\n📁 Projects & portfolio\n📍 Background & location\n🛠 Skills & tools\n📞 Contact & social links\n\nWhat would you like to know?" }
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
                <div className="text-[10px] text-muted uppercase tracking-wider">Ask about Aadiilin's work</div>
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
