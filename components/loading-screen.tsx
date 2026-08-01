'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

export function LoadingScreen() {
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion) {
      setVisible(false)
      return
    }
    const interval = setInterval(() => {
      setProgress((p) => Math.min(p + Math.random() * 28, 100))
    }, 160)
    const timeout = setTimeout(() => setVisible(false), 1400)
    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [reduceMotion])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          aria-hidden="true"
        >
          <div className="block-grid absolute inset-0" />
          <motion.span
            className="font-pixel relative text-xl text-primary text-glow sm:text-2xl"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            Cargando mundo...
          </motion.span>
          <div className="relative h-2 w-56 overflow-hidden rounded-sm border border-border bg-secondary">
            <motion.div
              className="h-full bg-primary"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
