import { useEffect, useRef, useState } from "react"

export function SignatureSVG() {
  const svgRef = useRef<SVGSVGElement>(null)
  const [drawing, setDrawing] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setDrawing(true)
      },
      { threshold: 0.3 }
    )
    if (svgRef.current) observer.observe(svgRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 320 154"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`svg-sign ${drawing ? "is-drawing" : ""}`}
      aria-hidden
    >
      <style>{`
        .svg-sign__path { opacity: 0; fill: none; stroke-linecap: round; }
        .svg-sign.is-drawing .svg-sign__path {
          animation: svg-sign-show 0s linear var(--path-delay, 0s) forwards,
                     svg-sign-draw var(--path-dur, 1.5s) cubic-bezier(0.65,0,0.35,1) var(--path-delay, 0s) forwards;
        }
        @keyframes svg-sign-draw { to { stroke-dashoffset: 0; } }
        @keyframes svg-sign-show { to { opacity: 1; } }
      `}</style>
      <path
        className="svg-sign__path"
        d="M138.27 11.7729C123.15 39.3885 106.223 85.497 102.06 100.029C98.6588 111.899 98.3721 128.792 98.6271 131.165"
        stroke="var(--selection-bg)" strokeWidth="4"
        style={{ strokeDasharray: 200, strokeDashoffset: 200, "--path-delay": "0s", "--path-dur": "1.2s" } as React.CSSProperties}
      />
      <path
        className="svg-sign__path"
        d="M78.2326 42.073C68.2519 91.6846 24.5171 161.888 11.6117 145.082C-3.90668 124.872 84.4229 80.042 149.127 70.3141C129.181 76.883 121.731 89.3385 127.224 93.3199C137.212 100.559 148.931 80.9071 154.826 68.4373C154.826 68.4373 145.919 84.0047 152.863 86.4553C163.666 90.2674 183.35 47.449 193.768 55.6123C200.863 61.1719 187.995 78.0438 180.889 75.6465C176.521 74.173 179.98 64.5401 184.583 59.6902C186.629 62.1747 192.878 65.6969 201.5 59.9093C210.123 54.1218 217.989 47.6358 220.844 45.1163"
        stroke="var(--selection-bg)" strokeWidth="4"
        style={{ strokeDasharray: 800, strokeDashoffset: 800, "--path-delay": "0.3s", "--path-dur": "2.5s" } as React.CSSProperties}
      />
      <path
        className="svg-sign__path"
        d="M235.554 43.4299C221.979 37.3731 206.4 60.4017 215.719 63.1233C224.115 65.5752 234.431 48.0119 239.203 40.1227C237.612 42.7522 234.822 53.6736 235.156 66.1976C235.574 81.8524 228.174 116.927 217.431 114.674C206.687 112.422 217.712 80.3645 242.778 57.3701C262.83 38.9746 269.549 28.9006 270.402 26.163C266.375 32.0516 260.249 44.2468 267.959 45.919C275.669 47.5912 298.148 19.8335 308.423 5.74565"
        stroke="var(--selection-bg)" strokeWidth="4"
        style={{ strokeDasharray: 600, strokeDashoffset: 600, "--path-delay": "0.6s", "--path-dur": "2s" } as React.CSSProperties}
      />
      <path
        className="svg-sign__path"
        d="M274.89 10.4194L274.409 16.157"
        stroke="var(--selection-bg)" strokeWidth="5"
        style={{ strokeDasharray: 20, strokeDashoffset: 20, "--path-delay": "1s", "--path-dur": "0.6s" } as React.CSSProperties}
      />
    </svg>
  )
}
