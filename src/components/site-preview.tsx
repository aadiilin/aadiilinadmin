import { SiteContent, ThemeColors } from "@/lib/content-store"

const previewContentStyle: React.CSSProperties = {
  fontFamily: "'Instrument Sans', sans-serif",
}

const h1Style: React.CSSProperties = {
  fontFamily: "'Bricolage Grotesque', sans-serif",
  fontWeight: 800,
  lineHeight: 1.1,
}

const statCardStyle: React.CSSProperties = {
  borderRadius: 16,
  padding: "16px 20px",
  textAlign: "center",
  border: "1px solid",
}

const projectCardStyle: React.CSSProperties = {
  borderRadius: 16,
  overflow: "hidden",
  border: "1px solid",
}

const skillTagStyle: React.CSSProperties = {
  padding: "6px 14px",
  borderRadius: 9999,
  fontSize: 11,
  fontFamily: "'Space Mono', monospace",
  border: "1px solid",
}

export function SitePreview({ content }: { content: SiteContent }) {
  const t = content.theme

  const rootVars = Object.fromEntries(
    Object.entries(t).map(([key, val]) => [`--theme-${key}`, val])
  ) as React.CSSProperties

  return (
    <div style={{
      ...rootVars,
      ...previewContentStyle,
      background: t.bg,
      color: t.text,
      borderRadius: 20,
      overflow: "hidden",
      border: `1px solid ${t.line}`,
    }}>
      {/* Hero preview */}
      <div style={{
        padding: "32px 28px 28px",
        background: t.bg,
        borderBottom: `1px solid ${t.line}`,
      }}>
        <div style={h1Style}>
          <span style={{ fontSize: 32, display: "block" }}>{content.hero.line1}</span>
          <span style={{ fontSize: 32, display: "block", color: t.accent }}>{content.hero.line2}</span>
          <span style={{ fontSize: 32, display: "block" }}>{content.hero.line3}</span>
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
          <span style={{
            padding: "8px 20px",
            borderRadius: 9999,
            background: t.accent,
            color: "#fff",
            fontSize: 12,
            fontWeight: 700,
            fontFamily: "'Bricolage Grotesque', sans-serif",
          }}>View Work</span>
          <span style={{
            padding: "8px 20px",
            borderRadius: 9999,
            border: `1px solid ${t.line}`,
            fontSize: 12,
            color: t.muted,
          }}>Get in Touch</span>
        </div>
      </div>

      {/* Stats */}
      <div style={{
        display: "grid",
        gridTemplateColumns: `repeat(${content.stats.length}, 1fr)`,
        gap: 8,
        padding: "16px 28px",
        borderBottom: `1px solid ${t.line}`,
      }}>
        {content.stats.map((stat, i) => (
          <div key={i} style={{ ...statCardStyle, borderColor: t.line, background: t.surface }}>
            <div style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 800,
              fontSize: 20,
              color: t.accent,
            }}>{stat.value}</div>
            <div style={{ fontSize: 10, color: t.muted, marginTop: 2 }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Projects preview */}
      <div style={{ padding: "16px 28px", borderBottom: `1px solid ${t.line}` }}>
        <div style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 10,
          color: t.muted,
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          marginBottom: 10,
        }}>Featured Work</div>
        <div style={{ display: "flex", gap: 10 }}>
          {content.projects.slice(0, 2).map((p, i) => (
            <div key={i} style={{ ...projectCardStyle, borderColor: t.line, flex: 1 }}>
              <div style={{
                aspectRatio: "4/3",
                background: t.subtle,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 10,
                color: t.faint,
                fontFamily: "'Space Mono', monospace",
              }}>{p.title}</div>
              <div style={{ padding: "8px 10px" }}>
                <div style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 700,
                  fontSize: 11,
                }}>{p.title}</div>
                <div style={{ fontSize: 9, color: t.muted, marginTop: 2 }}>{p.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div style={{ padding: "16px 28px", borderBottom: `1px solid ${t.line}` }}>
        <div style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 10,
          color: t.muted,
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          marginBottom: 10,
        }}>Skills</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {content.skills.slice(0, 6).map((s, i) => (
            <span key={i} style={{ ...skillTagStyle, borderColor: t.line, color: t.text, background: t.surface }}>
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Color palette */}
      <div style={{ padding: "16px 28px" }}>
        <div style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 10,
          color: t.muted,
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          marginBottom: 10,
        }}>Color Palette</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {Object.entries(t).map(([key, val]) => (
            <div key={key} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{
                width: 24,
                height: 24,
                borderRadius: 6,
                background: val,
                border: `1px solid ${t.line}`,
                boxShadow: val === "#FFFFFF" ? `inset 0 0 0 1px ${t.line}` : "none",
              }} />
              <span style={{ fontSize: 9, color: t.faint, fontFamily: "'Space Mono', monospace" }}>{key}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Live indicator */}
      <div style={{
        padding: "6px 28px",
        background: t.accent,
        color: "#fff",
        fontSize: 9,
        fontFamily: "'Space Mono', monospace",
        textTransform: "uppercase",
        letterSpacing: "0.2em",
        textAlign: "center",
      }}>
        Live Preview — colors & content update in real time
      </div>
    </div>
  )
}
