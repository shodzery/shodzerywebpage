'use client'

import { motion } from 'framer-motion'
import { getIcon } from '@/components/icon-registry'

/**
 * Cabecera reutilizable para las páginas internas. Mantiene la
 * identidad del sitio (cristal, violeta, cuadrícula) y da a cada
 * página su propio acento visual.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  icon = 'Blocks',
  meta,
}: {
  eyebrow: string
  title: string
  description: string
  icon?: string
  meta?: { label: string; value: string }[]
}) {
  const Icon = getIcon(icon)

  return (
    <header className="relative overflow-hidden pb-4 pt-32">
      <div className="grid-fade absolute inset-0" aria-hidden="true" />
      <div
        className="aurora-violet pointer-events-none absolute left-1/2 top-0 size-[520px] -translate-x-1/2 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-5"
        >
          <div className="flex items-center gap-3">
            <span className="glass-card glow-primary flex size-12 shrink-0 items-center justify-center rounded-xl text-primary">
              <Icon className="size-6" aria-hidden="true" />
            </span>
            <span className="font-pixel text-sm text-primary/80">{eyebrow}</span>
          </div>

          <h1 className="text-gradient text-balance text-4xl font-bold sm:text-5xl">
            {title}
          </h1>

          <p className="max-w-3xl text-pretty leading-relaxed text-muted-foreground sm:text-lg">
            {description}
          </p>
        </motion.div>

        {meta && meta.length > 0 && (
          <motion.dl
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-wrap gap-3"
          >
            {meta.map((item) => (
              <div
                key={item.label}
                className="glass-soft flex flex-col gap-0.5 rounded-lg px-4 py-2.5"
              >
                <dt className="text-xs text-muted-foreground">{item.label}</dt>
                <dd className="font-pixel text-sm text-primary">{item.value}</dd>
              </div>
            ))}
          </motion.dl>
        )}
      </div>
    </header>
  )
}
