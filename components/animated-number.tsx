'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

/**
 * Muestra un valor de estadística. Si el valor contiene un número
 * (por ejemplo "40+" o "120"), lo anima como contador al entrar en
 * pantalla. Si es un marcador como "—", lo muestra tal cual.
 */
export function AnimatedNumber({
  value,
  className,
}: {
  value: string
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduceMotion = useReducedMotion()

  const match = value.match(/\d+/)
  const target = match ? Number(match[0]) : null
  const [current, setCurrent] = useState(target === null ? null : 0)

  useEffect(() => {
    if (target === null) return
    if (!inView) return
    if (reduceMotion) {
      setCurrent(target)
      return
    }

    let raf = 0
    const duration = 1100
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setCurrent(Math.round(target * eased))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, reduceMotion, target])

  const display =
    target === null || current === null
      ? value
      : value.replace(String(target), String(current))

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}
