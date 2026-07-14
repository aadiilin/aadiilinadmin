import { useState, FormEvent } from "react"
import { Send } from "lucide-react"

const PHONE = "918137802554"

export function ContactForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const text = `Hi Aadiilin,%0a%0aName: ${encodeURIComponent(name)}%0aEmail: ${encodeURIComponent(email)}%0aMessage: ${encodeURIComponent(message)}`
    window.open(`https://wa.me/${PHONE}?text=${text}`, "_blank")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
      <button
        type="submit"
        className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-heading font-bold text-sm rounded-xl hover:bg-accent/90 transition-colors"
      >
        <Send size={14} /> Send via WhatsApp
      </button>
    </form>
  )
}
