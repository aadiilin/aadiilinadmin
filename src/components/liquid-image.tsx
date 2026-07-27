import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface LiquidImageProps {
  src: string
  alt: string
  className?: string
  intensity?: number
}

const vertexShader = `
  varying vec2 vUv;
  uniform float uHover;
  uniform float uTime;
  
  void main() {
    vUv = uv;
    vec3 pos = position;
    
    // Wave displacement on hover
    float wave = sin(pos.x * 5.0 + uTime * 3.0) * cos(pos.y * 5.0 + uTime * 3.0) * uHover * 0.08;
    pos.z += wave;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const fragmentShader = `
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform float uHover;
  uniform float uTime;
  uniform vec2 uMouse;

  void main() {
    vec2 uv = vUv;
    
    // Liquid distortion noise calculation
    float dist = distance(uv, uMouse);
    float factor = smoothstep(0.5, 0.0, dist) * uHover;
    
    vec2 distortedUv = uv;
    distortedUv.x += sin(uv.y * 15.0 + uTime * 4.0) * 0.02 * factor;
    distortedUv.y += cos(uv.x * 15.0 + uTime * 4.0) * 0.02 * factor;
    
    // RGB Chromatic Aberration split
    float shift = 0.015 * uHover;
    float r = texture2D(uTexture, distortedUv + vec2(shift, 0.0)).r;
    float g = texture2D(uTexture, distortedUv).g;
    float b = texture2D(uTexture, distortedUv - vec2(shift, 0.0)).b;
    
    vec4 color = vec4(r, g, b, 1.0);
    
    // Subtle hover brightness boost
    color.rgb += uHover * 0.08;
    
    gl_FragColor = color;
  }
`

export function LiquidImage({ src, alt, className = '', intensity = 1.0 }: LiquidImageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const materialRef = useRef<THREE.ShaderMaterial | null>(null)
  const animFrameRef = useRef<number | null>(null)
  const hoverValue = useRef(0)
  const targetHover = useRef(0)
  const mousePos = useRef(new THREE.Vector2(0.5, 0.5))

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const width = container.clientWidth || 400
    const height = container.clientHeight || 250

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0.1, 10)
    camera.position.z = 1

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    const textureLoader = new THREE.TextureLoader()
    const texture = textureLoader.load(src)
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTexture: { value: texture },
        uHover: { value: 0 },
        uTime: { value: 0 },
        uMouse: { value: mousePos.current },
      },
      transparent: true,
    })
    materialRef.current = material

    const geometry = new THREE.PlaneGeometry(1, 1, 32, 32)
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    let startTime = performance.now()

    const animate = () => {
      const elapsedTime = (performance.now() - startTime) * 0.001

      // Smooth lerp hover transition
      hoverValue.current += (targetHover.current * intensity - hoverValue.current) * 0.1

      if (materialRef.current) {
        materialRef.current.uniforms.uHover.value = hoverValue.current
        materialRef.current.uniforms.uTime.value = elapsedTime
      }

      renderer.render(scene, camera)
      animFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    const onMouseEnter = () => {
      targetHover.current = 1.0
    }

    const onMouseLeave = () => {
      targetHover.current = 0.0
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = 1.0 - (e.clientY - rect.top) / rect.height
      mousePos.current.set(x, y)
    }

    const onResize = () => {
      if (!container || !renderer) return
      const w = container.clientWidth
      const h = container.clientHeight
      renderer.setSize(w, h)
    }

    container.addEventListener('mouseenter', onMouseEnter)
    container.addEventListener('mouseleave', onMouseLeave)
    container.addEventListener('mousemove', onMouseMove)
    window.addEventListener('resize', onResize)

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      container.removeEventListener('mouseenter', onMouseEnter)
      container.removeEventListener('mouseleave', onMouseLeave)
      container.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement)
      }
      renderer.dispose()
      geometry.dispose()
      material.dispose()
      texture.dispose()
    }
  }, [src, intensity])

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* Fallback image for accessibility */}
      <img src={src} alt={alt} className="sr-only" />
    </div>
  )
}
