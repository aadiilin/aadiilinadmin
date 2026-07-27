import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function CanvasBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 300

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // 3D Particles Mesh Grid
    const particleCount = 1200
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const scales = new Float32Array(particleCount)
    const originalY = new Float32Array(particleCount)

    let i = 0, j = 0
    const numX = 40
    const numZ = 30
    const gap = 20

    for (let ix = 0; ix < numX; ix++) {
      for (let iz = 0; iz < numZ; iz++) {
        const x = ix * gap - (numX * gap) / 2
        const z = iz * gap - (numZ * gap) / 2
        const y = Math.sin(ix * 0.3) * 15 + Math.cos(iz * 0.3) * 15

        positions[i] = x
        positions[i + 1] = y - 100
        positions[i + 2] = z
        originalY[j] = positions[i + 1]

        scales[j] = Math.random() * 2 + 1
        i += 3
        j++
      }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1))

    // Particle Shader Material
    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 2.2,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)

    // Mouse Interaction Variables
    let mouseX = 0
    let mouseY = 0
    let targetMouseX = 0
    let targetMouseY = 0

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX - window.innerWidth / 2) * 0.1
      targetMouseY = (e.clientY - window.innerHeight / 2) * 0.1
    }

    window.addEventListener('mousemove', onMouseMove)

    // Animation Loop
    let count = 0
    let animId: number

    const animate = () => {
      count += 0.03
      mouseX += (targetMouseX - mouseX) * 0.05
      mouseY += (targetMouseY - mouseY) * 0.05

      camera.position.x += (mouseX - camera.position.x) * 0.05
      camera.position.y += (-mouseY - camera.position.y) * 0.05
      camera.lookAt(scene.position)

      const positionAttr = geometry.attributes.position as THREE.BufferAttribute
      const posArr = positionAttr.array as Float32Array

      let pIdx = 0
      for (let ix = 0; ix < numX; ix++) {
        for (let iz = 0; iz < numZ; iz++) {
          posArr[pIdx + 1] = originalY[pIdx / 3] + Math.sin((ix + count) * 0.3) * 12 + Math.sin((iz + count) * 0.5) * 12
          pIdx += 3
        }
      }

      positionAttr.needsUpdate = true
      renderer.render(scene, camera)
      animId = requestAnimationFrame(animate)
    }

    animate()

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement)
      }
      renderer.dispose()
      geometry.dispose()
      material.dispose()
    }
  }, [])

  return <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none opacity-70" />
}
