'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

// Cambia sessionStorage por localStorage más abajo si quieres que la
// pantalla aparezca una única vez para siempre (en vez de una vez por
// sesión/pestaña del navegador).
const SEEN_KEY = 'loading-screen-seen'

export function LoadingScreen() {
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    let alreadySeen = false
    try {
      alreadySeen = sessionStorage.getItem(SEEN_KEY) === '1'
    } catch {
      // sessionStorage puede fallar en modo privado; se ignora sin romper nada
    }

    if (alreadySeen || reduceMotion) return

    try {
      sessionStorage.setItem(SEEN_KEY, '1')
    } catch {
      // si no se pudo guardar, en el peor caso vuelve a aparecer una vez más
    }

    setVisible(true)

    const MIN_VISIBLE_MS = 700 // evita un parpadeo aunque la página cargue al instante
    const MAX_WAIT_MS = 4500 // red de seguridad si algún recurso nunca resuelve
    const start = performance.now()

    let raf = 0
    let hideTimeout = 0
    let finished = false

    // Avance visual mientras esperamos: se acerca al 90% pero nunca lo pasa,
    // así el usuario ve movimiento real sin prometer un 100% falso.
    const tick = () => {
      setProgress((p) => (p >= 90 ? p : p + (90 - p) * 0.045))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const finish = () => {
      if (finished) return
      finished = true
      cancelAnimationFrame(raf)
      setProgress(100)
      const elapsed = performance.now() - start
      const remaining = Math.max(MIN_VISIBLE_MS - elapsed, 0)
      // deja ver el 100% un instante antes de desvanecer
      hideTimeout = window.setTimeout(() => setVisible(false), remaining + 260)
    }

    // Progreso real: espera a que carguen las fuentes y el resto de recursos
    // de la página en vez de simular con números al azar.
    const fontsReady =
      'fonts' in document ? document.fonts.ready : Promise.resolve()
    const pageLoaded =
      document.readyState === 'complete'
        ? Promise.resolve()
        : new Promise<void>((resolve) =>
            window.addEventListener('load', () => resolve(), { once: true })
          )

    Promise.all([fontsReady, pageLoaded]).then(finish)
    const safety = window.setTimeout(finish, MAX_WAIT_MS)

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(hideTimeout)
      window.clearTimeout(safety)
    }
  }, [reduceMotion])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02, filter: 'blur(6px)' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          <div className="block-grid absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_55%_50%_at_50%_50%,black,transparent_80%)]" />
          <div className="aurora-violet absolute left-1/2 top-1/2 size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl" />

          <div className="relative flex items-center gap-1">
            <span className="font-pixel text-xl text-primary text-glow sm:text-2xl">
              Cargando mundo
            </span>
            {/* Cursor de terminal parpadeando, en vez de un simple fade */}
            <motion.span
              aria-hidden="true"
              className="inline-block h-5 w-2.5 translate-y-0.5 bg-primary"
              animate={{ opacity: [1, 1, 0, 0] }}
              transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
            />
          </div>

          <div className="relative flex w-64 items-center gap-3">
            <div className="h-2 flex-1 overflow-hidden rounded-full border border-border bg-secondary">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary/70 via-primary to-primary/70 shadow-[0_0_12px_rgba(139,92,246,0.55)]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>
            <span className="font-pixel w-9 shrink-0 text-right text-[11px] tabular-nums text-muted-foreground">
              {Math.round(progress)}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}