import { useState, FormEvent } from "react"
import { Send, Instagram } from "lucide-react"

const PHONE = "918137802554"
const INSTA_USER = "aadiil.in"
export function ContactForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  function sendWhatsApp(e: FormEvent) {
    e.preventDefault()
    const text = `Hello Jomor Design,%0a%0aName: ${encodeURIComponent(name)}%0aEmail: ${encodeURIComponent(email)}%0aMessage: ${encodeURIComponent(message)}`
    window.open(`https://wa.me/15142223461?text=${text}`, "_blank")
  }

  function sendInstagram() {
    const text = `Hello Jomor Design! I'm ${encodeURIComponent(name || "someone")}. ${encodeURIComponent(message || "I'd like to discuss a project.")}`
    window.open(`https://ig.me/m/jomordesign?text=${text}`, "_blank")
  }

  return (
    <div className="space-y-4">
      <form onSubmit={sendWhatsApp} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full bg-surface border border-line rounded-xl px-4 py-3 text-sm text-text outline-none focus:border-accent/50 transition-colors placeholder:text-faint"
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-surface border border-line rounded-xl px-4 py-3 text-sm text-text outline-none focus:border-accent/50 transition-colors placeholder:text-faint"
          />
        </div>
        <div>
          <textarea
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={4}
            className="w-full bg-surface border border-line rounded-xl px-4 py-3 text-sm text-text outline-none focus:border-accent/50 transition-colors placeholder:text-faint resize-none"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white font-heading font-bold text-sm rounded-xl hover:bg-accent/90 transition-colors"
          >
            <Send size={14} /> Send via WhatsApp
          </button>
          <button
            type="button"
            onClick={sendInstagram}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-text text-white font-heading font-bold text-sm rounded-xl hover:opacity-90 transition-opacity"
          >
            <Instagram size={14} /> Send via Instagram DM
          </button>
        </div>
      </form>
    </div>
  )
}
