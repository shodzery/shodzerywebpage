'use client'

import { motion } from 'framer-motion'

export function SectionHeading({
  label,
  title,
  description,
  align = 'center',
}: {
  label: string
  title: string
  description?: string
  align?: 'center' | 'left'
}) {
  const centered = align === 'center'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className={`mb-12 flex flex-col gap-3 ${
        centered ? 'items-center text-center' : 'items-start text-left'
      }`}
    >
      <span className="glass-soft font-pixel rounded-full px-3 py-1 text-xs tracking-wide text-primary">
        {label}
      </span>
      <h2 className="text-gradient text-balance text-3xl font-bold sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl text-pretty leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
      <div
        className="mt-2 h-px w-24 bg-gradient-to-r from-primary via-accent to-transparent"
        aria-hidden="true"
      />
    </motion.div>
  )
}
