'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * Fondo ambiental: cuadrícula tenue con máscara radial (se desvanece
 * hacia los bordes en vez de cubrir toda la pantalla por igual), dos
 * auroras violetas en diagonal, un polvo discreto de partículas
 * cuadradas en canvas (con soporte DPR para que no se vea borroso en
 * pantallas retina) y un brillo que sigue al cursor con inercia
 * suave. Pensado para dar profundidad sin saturar. Respeta
 * prefers-reduced-motion.
 */
export function BackgroundEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let width = window.innerWidth
    let height = window.innerHeight

    const setCanvasSize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    setCanvasSize()

    // Menos partículas y más lentas: un polvo discreto, no una lluvia de bloques
    const count = Math.min(30, Math.floor(width / 46))
    const palette = [
      '167, 139, 250', // violeta claro
      '139, 92, 246', // violeta
      '196, 181, 253', // lavanda
    ]
    const particles = Array.from({ length: count }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 1,
      speed: Math.random() * 0.16 + 0.05,
      drift: (Math.random() - 0.5) * 0.15,
      opacity: Math.random() * 0.26 + 0.06,
      // El verde aparece como un guiño muy ocasional, no como confeti
      color: i % 20 === 0 ? '74, 222, 128' : palette[i % palette.length],
    }))

    // Brillo del cursor con interpolación (lerp) para que no "salte"
    const pointer = { x: width / 2, y: height / 2 }
    const glow = { x: pointer.x, y: pointer.y }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      for (const p of particles) {
        ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`
        ctx.fillRect(p.x, p.y, p.size, p.size)
        p.y -= p.speed
        p.x += p.drift
        if (p.y < -4) {
          p.y = height + 4
          p.x = Math.random() * width
        }
        if (p.x < -4) p.x = width + 4
        if (p.x > width + 4) p.x = -4
      }

      if (glowRef.current) {
        glow.x += (pointer.x - glow.x) * 0.08
        glow.y += (pointer.y - glow.y) * 0.08
        glowRef.current.style.transform = `translate(${glow.x - 190}px, ${glow.y - 190}px)`
      }

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    const handleResize = () => setCanvasSize()
    window.addEventListener('resize', handleResize)

    const handleMouse = (e: MouseEvent) => {
      pointer.x = e.clientX
      pointer.y = e.clientY
    }
    window.addEventListener('mousemove', handleMouse)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouse)
    }
  }, [reduceMotion])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Cuadrícula tenue, con máscara radial para que se desvanezca en los bordes */}
      <div className="block-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,black,transparent_80%)]" />

      {/* Dos auroras en diagonal en vez de tres compitiendo por atención */}
      <div className="aurora-violet absolute -top-36 -left-28 size-[600px] rounded-full blur-3xl opacity-70 animate-pulse-glow" />
      <div className="aurora-purple absolute -right-28 top-1/3 size-[520px] rounded-full blur-3xl opacity-50" />

      <canvas ref={canvasRef} className="absolute inset-0 opacity-70" />

      {/* Brillo sutil que sigue el cursor, con inercia suave (solo si hay movimiento) */}
      {!reduceMotion && (
        <div
          ref={glowRef}
          className="absolute h-[380px] w-[380px] rounded-full bg-primary/[0.05] blur-3xl"
        />
      )}

      {/* Viñetas arriba y abajo: dan profundidad sin recortar el contenido */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background to-transparent" />
    </div>
  )
}