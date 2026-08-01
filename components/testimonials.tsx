'use client'

import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

import { SectionHeading } from '@/components/section-heading'
import { testimonials } from '@/data/portfolio'

export function Testimonials({
  showHeading = true,
}: {
  showHeading?: boolean
}) {
  return (
    <section id="testimonios" className="relative scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {showHeading && (
          <SectionHeading
            label="{ 03 }"
            title="Lo que dicen los proyectos"
            description="Opiniones de owners y administradores. Los autores marcados con — están pendientes de completar."
          />
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          {testimonials.map((item, index) => (
            <motion.figure
              key={item.quote}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: (index % 2) * 0.08 }}
              className="glass-card flex flex-col gap-4 rounded-lg p-6"
            >
              <Quote className="size-5 text-primary/70" aria-hidden="true" />

              <blockquote className="text-sm leading-relaxed text-foreground/90">
                {item.quote}
              </blockquote>

              <figcaption className="mt-auto flex flex-col border-t border-border/60 pt-4">
                <span className="text-sm font-medium text-foreground">
                  {item.author}
                </span>
                <span className="text-xs text-muted-foreground">
                  {item.role}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
