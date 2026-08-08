'use client'

import { useEffect } from 'react'
import { X } from 'lucide-react'

export function Modal({
  open,
  onClose,
  title,
  eyebrow,
  children,
}: {
  open: boolean
  onClose: () => void
  title?: string
  eyebrow?: string
  children: React.ReactNode
}) {
  useEffect(() => {
    if (!open) return

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-background/80 p-4 py-10 backdrop-blur-sm sm:py-16"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="glass-card border-gradient relative w-full max-w-3xl rounded-2xl p-6 shadow-2xl shadow-primary/10 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="glass-soft absolute right-4 top-4 flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-primary"
        >
          <X className="size-4" aria-hidden="true" />
        </button>

        {eyebrow && <p className="mb-1.5 font-pixel text-xs text-primary/80">{eyebrow}</p>}
        {title && <h2 className="mb-5 pr-10 text-xl font-bold text-foreground sm:text-2xl">{title}</h2>}

        {children}
      </div>
    </div>
  )
}
