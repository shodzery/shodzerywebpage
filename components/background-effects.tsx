'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * Fondo ambiental: cuadrícula de bloques, auroras violetas,
 * partículas cuadradas optimizadas en canvas y brillo que sigue
 * al cursor. Respeta prefers-reduced-motion.
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
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const count = Math.min(46, Math.floor(width / 34))
    const palette = [
      '167, 139, 250', // violeta claro
      '139, 92, 246', // violeta
      '196, 181, 253', // lavanda
      '74, 222, 128', // acento verde puntual
    ]
    const particles = Array.from({ length: count }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 3 + 1.5,
      speed: Math.random() * 0.3 + 0.08,
      opacity: Math.random() * 0.4 + 0.08,
      // El verde aparece solo en una de cada doce partículas
      color: palette[i % 12 === 0 ? 3 : i % 3],
    }))

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      for (const p of particles) {
        // Partículas cuadradas estilo bloque
        ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`
        ctx.fillRect(p.x, p.y, p.size, p.size)
        p.y -= p.speed
        if (p.y < -4) {
          p.y = height + 4
          p.x = Math.random() * width
        }
      }
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    const handleMouse = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${e.clientX - 240}px, ${e.clientY - 240}px)`
      }
    }
    window.addEventListener('mousemove', handleMouse)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouse)
    }
  }, [reduceMotion])

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <div className="block-grid absolute inset-0" />

      {/* Iluminación ambiental */}
      <div className="aurora-violet absolute -top-40 left-[-10%] size-[560px] rounded-full blur-3xl animate-pulse-glow" />
      <div className="aurora-purple absolute right-[-12%] top-[30%] size-[620px] rounded-full blur-3xl" />
      <div className="aurora-violet absolute bottom-[-15%] left-[30%] size-[520px] rounded-full blur-3xl" />

      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Brillo sutil que sigue el cursor */}
      <div
        ref={glowRef}
        className="absolute h-[480px] w-[480px] rounded-full bg-primary/[0.05] blur-3xl transition-transform duration-300 ease-out"
      />

      {/* Viñeta inferior para dar profundidad */}
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background to-transparent" />
    </div>
  )
}
