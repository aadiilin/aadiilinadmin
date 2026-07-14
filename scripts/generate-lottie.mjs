import { writeFileSync, mkdirSync } from "fs"
import { resolve, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = resolve(__dirname, "..", "public", "lottie")
mkdirSync(OUT, { recursive: true })

// ── helpers ──────────────────────────────────────────────────────
const $ = (a, k) => (a ? { a: 1, k } : { a: 0, k })
const kf = (t, s, eo, ei) => {
  const k = { t, s }
  if (eo) k.o = { x: [eo[0]], y: [eo[1]] }
  if (ei) k.i = { x: [ei[0]], y: [ei[1]] }
  return k
}
const ease = [0.25, 0.1, 0.25, 1]
const easeOut = [0, 0, 0.58, 1]
const easeIn = [0.42, 0, 1, 1]
const e = (t, s, ei = ease, eo = ease) => kf(t, s, [ei[0], ei[1]], [eo[2], eo[3]])
const anim = (fps, dur, w, h, layers, nm = "animation") => ({
  v: "5.7.0", fr: fps, ip: 0, op: fps * dur, w, h, nm, layers,
  ddd: 0, assets: [], fonts: { list: [] },
})

function layerEl(ind, nm, shapes, ksOver = {}) {
  return {
    ind, nm, ty: 4, sr: 1, st: 0, ip: 0, op: 300,
    ks: {
      o: $(0, 100), r: $(0, 0), p: $(0, [0, 0]), s: $(0, [100, 100]),
      ...ksOver,
    },
    shapes, hd: false,
    ef: [], w: 800, h: 600,
  }
}

function ellipseShape(nm, w, h, pos) {
  return { ty: "el", nm, hd: false, p: $(0, pos), s: $(0, [w, h]), d: 1 }
}

function rectShape(nm, w, h, pos, r = 0) {
  return { ty: "rc", nm, hd: false, p: $(0, pos), s: $(0, [w, h]), r: $(0, r) }
}

function fillColor(r, g, b, a = 1) {
  return { ty: "fl", nm: "Fill", hd: false, c: $(0, [r, g, b, a]), o: $(0, 100), r: 2 }
}

function strokeColor(r, g, b, w, a = 1) {
  return { ty: "st", nm: "Stroke", hd: false, c: $(0, [r, g, b, a]), o: $(0, 100), w: $(0, w), lc: 1, lj: 1 }
}

function groupShape(nm, items, trOver = {}) {
  const tr = { ty: "tr", nm: "Transform", hd: false, a: $(0, [0, 0]), p: $(0, [0, 0]), s: $(0, [100, 100]), r: $(0, 0), o: $(0, 100), ...trOver }
  return { ty: "gr", nm, hd: false, it: [...items, tr] }
}

function pathShape(nm, vertices, closed = true) {
  const v = vertices, i = v.map(() => [0, 0]), o = v.map(() => [0, 0])
  return {
    ty: "sh", nm, hd: false,
    ks: $(0, { c: closed, v, i, o }),
  }
}

function trimShape(nm, start, end, offset = 0) {
  return { ty: "tm", nm, hd: false, s: $(0, start), e: $(0, end), o: $(0, offset), m: 1 }
}

function addLayerAnims(layer, anims) {
  Object.assign(layer.ks, anims)
  return layer
}

// ── color helpers ────────────────────────────────────────────────
const c = (hex) => {
  const h = hex.replace("#", "")
  return [parseInt(h.slice(0, 2), 16) / 255, parseInt(h.slice(2, 4), 16) / 255, parseInt(h.slice(4, 6), 16) / 255]
}

// ═══════════════════════════════════════════════════════════════════
//  1. FAB MENU ANIMATION
// ═══════════════════════════════════════════════════════════════════
function buildFabMenu() {
  const FPS = 30, DUR = 4, W = 400, H = 600
  const CX = 200, CY = 300, BTN_R = 22
  const T_EXPAND_START = 10, T_EXPAND_END = 30
  const T_HOLD_END = 75
  const T_COLLAPSE_END = 95
  const TOTAL = FPS * DUR

  // Positions for 4 buttons: They'll be at y = CY - 66, -22, +22, +66
  const BTN_POSITIONS = [
    [CX, CY - 66],
    [CX, CY - 22],
    [CX, CY + 22],
    [CX, CY + 66],
  ]

  const bg = c("#1A1A1A")
  const white = [1, 1, 1]

  // Main FAB circle (visible 0-10, fades out by 30, reappears 80-95)
  const mainCircleShape = groupShape("MainCircle", [
    ellipseShape("FAB", BTN_R * 2, BTN_R * 2, [0, 0]),
    fillColor(bg[0], bg[1], bg[2]),
  ], {
    p: $(1, [
      e(0, [CX, CY]),
      e(T_EXPAND_START, [CX, CY]),
      e(T_EXPAND_END, [CX, CY], easeIn, [0.25, 0.1, 0.25, 1]),
    ]),
    s: $(1, [
      e(0, [100, 100]),
      e(T_EXPAND_START, [100, 100]),
      e(T_EXPAND_END, [30, 30], easeIn, [0.25, 0.1, 0.25, 1]),
      e(T_HOLD_END, [0, 0], easeIn),
      e(T_COLLAPSE_END - 10, [0, 0]),
      e(TOTAL, [0, 0]),
    ]),
  })

  // 4-dot grid icon (inside main FAB, fades with it)
  const dotSize = 3.5
  const dotOffset = 6
  const dotPositions = [
    [-dotOffset, -dotOffset],
    [dotOffset, -dotOffset],
    [-dotOffset, dotOffset],
    [dotOffset, dotOffset],
  ]
  const gridDots = dotPositions.map((dp, i) =>
    groupShape(`Dot${i}`, [
      ellipseShape(`dot${i}`, dotSize * 2, dotSize * 2, dp),
      fillColor(white[0], white[1], white[2]),
    ])
  )

  const gridGroup = groupShape("GridIcon", gridDots, {
    o: $(1, [
      e(0, 100),
      e(T_EXPAND_START, 100),
      e(T_EXPAND_END, 0, easeIn),
      e(T_HOLD_END, 0),
      e(T_COLLAPSE_END, 100, [0.25, 0.1, 0.25, 1]),
      e(TOTAL, 100),
    ]),
  })

  // 4 individual button circles (appear during expand, disappear during collapse)
  const buttons = BTN_POSITIONS.map((pos, i) => {
    const baseY = CY
    const targetY = pos[1]
    const delay = i * 3

    return groupShape(`Btn${i}`, [
      ellipseShape(`circle${i}`, BTN_R * 2, BTN_R * 2, [0, 0]),
      fillColor(bg[0], bg[1], bg[2]),
    ], {
      p: $(1, [
        e(0, [CX, baseY]),
        e(T_EXPAND_START + delay, [CX, baseY]),
        e(T_EXPAND_END + delay, [CX, targetY], [0.34, 1, 0.64, 1], [0.34, 0, 0.64, 1]),
        e(T_HOLD_END, [CX, targetY]),
        e(T_COLLAPSE_END, [CX, baseY], easeIn, [0.42, 0, 1, 1]),
        e(TOTAL, [CX, baseY]),
      ]),
      o: $(1, [
        e(0, 0),
        e(T_EXPAND_START + delay, 0),
        e(T_EXPAND_START + delay + 5, 100, [0.25, 0.1, 0.25, 1]),
        e(T_HOLD_END, 100),
        e(T_COLLAPSE_END - 5, 100),
        e(T_COLLAPSE_END, 0, easeIn),
        e(TOTAL, 0),
      ]),
      s: $(1, [
        e(0, [0, 0]),
        e(T_EXPAND_START + delay, [0, 0]),
        e(T_EXPAND_START + delay + 5, [100, 100], [0.34, 1, 0.64, 1]),
        e(T_HOLD_END, [100, 100]),
        e(T_COLLAPSE_END - 5, [100, 100]),
        e(T_COLLAPSE_END, [0, 0], easeIn),
        e(TOTAL, [0, 0]),
      ]),
    })
  })

  // Icons inside each button (same timing as buttons)
  // Icon 0: Circle outline — a circle with only stroke, no fill
  const icon0 = groupShape("IconCircle", [
    ellipseShape("outline", 14, 14, [0, 0]),
    strokeColor(white[0], white[1], white[2], 1.5),
  ])

  // Icon 1: Home — rectangle body + triangle roof
  const homeBody = rectShape("body", 14, 10, [0, 1], 1)
  const homeRoof = pathShape("roof", [
    [0, -8], [8, -8], [4, -14],
  ])
  const icon1 = groupShape("IconHome", [
    {...homeRoof, ks: $(0, { c: true, v: [[0, -8], [8, -8], [4, -14]], i: [[0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0]] })},
    homeBody,
    fillColor(white[0], white[1], white[2]),
  ])

  // Icon 2: Map pin minus — circle + triangle + minus line
  const pinCircle = ellipseShape("pinHead", 8, 8, [0, -4])
  const pinTriangle = pathShape("pinTail", [[-4, 0], [4, 0], [0, 5]], true)
  const minusBar = rectShape("minus", 8, 2, [0, -4])
  const icon2 = groupShape("IconPin", [
    {...pinTriangle, ks: $(0, { c: true, v: [[-4, 0], [4, 0], [0, 5]], i: [[0, 0], [0, 0], [0, 0]], o: [[0, 0], [0, 0], [0, 0]] })},
    pinCircle,
    fillColor(white[0], white[1], white[2]),
    minusBar,
  ])

  // Icon 3: X / close — two rotated rectangles
  const bar1 = {...rectShape("bar1", 12, 2.5, [0, 0]), r: $(0, 45)}
  const bar2 = {...rectShape("bar2", 12, 2.5, [0, 0]), r: $(0, -45)}
  const icon3 = groupShape("IconX", [
    bar1, bar2, fillColor(white[0], white[1], white[2]),
  ])

  const icons = [icon0, icon1, icon2, icon3]

  const iconLayers = icons.map((icon, i) => {
    const pos = BTN_POSITIONS[i]
    const baseY = CY
    const targetY = pos[1]
    const delay = i * 3
    return groupShape(`IconLayer${i}`, [icon], {
      p: $(1, [
        e(0, [CX, baseY]),
        e(T_EXPAND_START + delay, [CX, baseY]),
        e(T_EXPAND_END + delay, [CX, targetY], [0.34, 1, 0.64, 1], [0.34, 0, 0.64, 1]),
        e(T_HOLD_END, [CX, targetY]),
        e(T_COLLAPSE_END, [CX, baseY], easeIn),
        e(TOTAL, [CX, baseY]),
      ]),
      o: $(1, [
        e(0, 0),
        e(T_EXPAND_START + delay + 3, 0),
        e(T_EXPAND_START + delay + 8, 100, [0.25, 0.1, 0.25, 1]),
        e(T_HOLD_END, 100),
        e(T_COLLAPSE_END - 5, 100),
        e(T_COLLAPSE_END + 3, 0, easeIn),
        e(TOTAL, 0),
      ]),
      s: $(1, [
        e(0, [0, 0]),
        e(T_EXPAND_START + delay + 3, [0, 0]),
        e(T_EXPAND_START + delay + 8, [100, 100], [0.34, 1, 0.64, 1]),
        e(T_HOLD_END, [100, 100]),
        e(T_COLLAPSE_END - 5, [100, 100]),
        e(T_COLLAPSE_END + 3, [0, 0], easeIn),
        e(TOTAL, [0, 0]),
      ]),
    })
  })

  const layers = [
    layerEl(0, "GridIcon", [gridGroup]),
    layerEl(1, "MainFAB", [mainCircleShape]),
    ...buttons.map((b, i) => layerEl(i + 2, `Btn${i}`, [b])),
    ...iconLayers.map((il, i) => layerEl(i + 6, `Icon${i}`, [il])),
  ]

  return anim(FPS, DUR, W, H, layers, "FAB Menu")
}

// ═══════════════════════════════════════════════════════════════════
//  2. GRADIENT BACKGROUND
// ═══════════════════════════════════════════════════════════════════
function buildGradientBg() {
  const FPS = 30, DUR = 5, W = 800, H = 600
  const TOT = FPS * DUR

  const blobs = [
    { color: "#CBD1F7", radius: 180, cx: 200, cy: 150, dx: 80, dy: 40 },
    { color: "#C29BE4", radius: 200, cx: 600, cy: 120, dx: -60, dy: 50 },
    { color: "#E9ACC5", radius: 170, cx: 180, cy: 450, dx: 50, dy: -40 },
    { color: "#E67C8F", radius: 190, cx: 620, cy: 480, dx: -70, dy: -30 },
  ]

  const layers = blobs.map((blob, i) => {
    const col = c(blob.color)
    const cx0 = blob.cx, cy0 = blob.cy
    const cx1 = blob.cx + blob.dx, cy1 = blob.cy + blob.dy

    const shape = groupShape(`Blob${i}`, [
      ellipseShape(`blob${i}`, blob.radius * 2, blob.radius * 2, [0, 0]),
      fillColor(col[0], col[1], col[2], 0.35),
    ], {
      p: $(1, [
        e(0, [cx0, cy0]),
        e(TOT * 0.25, [cx1, cy1], easeOut, [0.42, 0, 0.58, 1]),
        e(TOT * 0.5, [(cx0 + cx1) / 2 + 20, (cy0 + cy1) / 2 - 20], [0.42, 0, 0.58, 1]),
        e(TOT * 0.75, [cx0 + blob.dx * 0.8, cy0 + blob.dy * 0.8], easeIn, [0.42, 0, 0.58, 1]),
        e(TOT, [cx0, cy0], [0.42, 0, 0.58, 1]),
      ]),
      s: $(1, [
        e(0, [100, 100]),
        e(TOT * 0.3, [105, 108], easeOut),
        e(TOT * 0.6, [98, 95], [0.42, 0, 0.58, 1]),
        e(TOT * 0.9, [103, 102], [0.42, 0, 0.58, 1]),
        e(TOT, [100, 100]),
      ]),
    })

    return layerEl(i, `Blob${i}`, [shape])
  })

  return anim(FPS, DUR, W, H, layers, "Gradient Background")
}

// ═══════════════════════════════════════════════════════════════════
//  3. AI CHAT DEMO
// ═══════════════════════════════════════════════════════════════════
function buildAiChat() {
  const FPS = 30, DUR = 8, W = 600, H = 500
  const TOT = FPS * DUR

  const bg = c("#F5F0EB")
  const textCol = c("#1A1A1A")
  const accent = c("#FF3B1F")
  const white = [1, 1, 1]
  const midGray = c("#8A8682")

  // Background
  const bgShape = groupShape("BG", [
    rectShape("bg", W, H, [W / 2, H / 2]),
    fillColor(bg[0], bg[1], bg[2]),
  ])

  // "Ask AI" button - pill shape centered, moves up during transition
  const askBtn = groupShape("AskAIBtn", [
    rectShape("pill", 120, 38, [0, 0], 19),
    fillColor(accent[0], accent[1], accent[2]),
    // "Ask AI" text simulated as small rectangles
    groupShape("AskText", [
      rectShape("Ask", 18, 4, [-30, -2]),
      rectShape("AI", 10, 4, [16, -2]),
      fillColor(white[0], white[1], white[2]),
    ]),
  ], {
    p: $(1, [
      e(0, [W / 2, H / 2]),
      e(FPS * 1.5, [W / 2, H / 2]),
      e(FPS * 2.5, [W - 100, 40], [0.34, 1, 0.64, 1], [0.34, 0, 0.64, 1]),
      e(TOT, [W - 100, 40]),
    ]),
  })

  // "acme" logo text blocks top-left
  const logo = groupShape("Logo", [
    // Small circle logo mark
    ellipseShape("logoMark", 24, 24, [-35, 0]),
    fillColor(accent[0], accent[1], accent[2]),
    // "acme" as rectangles
    groupShape("LogoText", [
      rectShape("a", 8, 3, [14, -6]),
      rectShape("c", 8, 3, [24, -6]),
      rectShape("m", 8, 3, [34, -6]),
      rectShape("e", 8, 3, [44, -6]),
      fillColor(textCol[0], textCol[1], textCol[2]),
    ]),
  ], {
    p: $(1, [
      e(0, [W / 2, H / 2]),
      e(FPS * 1.5, [W / 2, H / 2]),
      e(FPS * 2.5, [60, 40]),
      e(TOT, [60, 40]),
    ]),
    o: $(1, [
      e(0, 0),
      e(FPS * 2.2, 100, [0.25, 0.1, 0.25, 1]),
      e(TOT, 100),
    ]),
    s: $(1, [
      e(0, [60, 60]),
      e(FPS * 1.5, [60, 60]),
      e(FPS * 2.5, [100, 100], [0.34, 1, 0.64, 1]),
      e(TOT, [100, 100]),
    ]),
  })

  // Response text lines (simulated as growing rectangles)
  const lines = [
    { text: "Start by learning design fundamentals —", delay: FPS * 3, x: 60, y: 90, width: 320 },
    { text: "color, typography, layout, then learn", delay: FPS * 4.2, x: 60, y: 118, width: 290 },
    { text: "animation principles like timing, easing,", delay: FPS * 5.4, x: 60, y: 146, width: 310 },
    { text: "and storytelling.", delay: FPS * 6.6, x: 60, y: 174, width: 150 },
  ]

  const textLayers = lines.map((line, i) => {
    const dur = 15 // frames for the line to "type out"
    const appearDelay = line.delay

    return groupShape(`Line${i}`, [
      rectShape(`tb${i}`, line.width, 5, [line.width / 2, 0], 2),
      fillColor(textCol[0], textCol[1], textCol[2]),
    ], {
      p: $(1, [
        e(0, [line.x, line.y]),
        e(appearDelay, [line.x, line.y]),
        e(TOT, [line.x, line.y]),
      ]),
      s: $(1, [
        e(0, [0, 100]),
        e(appearDelay, [0, 100]),
        e(appearDelay + dur, [100, 100], [0.25, 1, 0.5, 1]),
        e(TOT, [100, 100]),
      ]),
      o: $(1, [
        e(0, 0),
        e(appearDelay, 0),
        e(appearDelay + 2, 100, [0.25, 0.1, 0.25, 1]),
        e(TOT, 100),
      ]),
    })
  })

  const layers = [
    layerEl(0, "BG", [bgShape]),
    layerEl(1, "AskBtn", [askBtn]),
    layerEl(2, "Logo", [logo]),
    ...textLayers.map((tl, i) => layerEl(i + 3, `Text${i}`, [tl])),
  ]

  return anim(FPS, DUR, W, H, layers, "AI Chat Demo")
}

// ── GENERATE ──────────────────────────────────────────────────────
const animations = {
  "fab-menu.json": buildFabMenu(),
  "gradient-bg.json": buildGradientBg(),
  "ai-chat.json": buildAiChat(),
}

for (const [name, data] of Object.entries(animations)) {
  const path = resolve(OUT, name)
  writeFileSync(path, JSON.stringify(data))
  console.log(`✓ ${name} (${(JSON.stringify(data).length / 1024).toFixed(1)} KB)`)
}

console.log(`\nAll files written to ${OUT}`)
