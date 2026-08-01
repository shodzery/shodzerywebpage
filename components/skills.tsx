'use client'

import { motion } from 'framer-motion'
import { skills } from '@/data/portfolio'
import { SectionHeading } from '@/components/section-heading'
import { getIcon } from '@/components/icon-registry'

export function Skills({ showHeading = true }: { showHeading?: boolean }) {
  return (
    <section id="habilidades" className="relative scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {showHeading && (
          <SectionHeading
            label="{ 04 }"
            title="Tecnologías dominadas"
            description="Todo mi conocimiento agrupado por categorías: lenguajes, núcleos de servidor, plugins premium, compatibilidad, rendimiento, datos y web."
          />
        )}

        <div className="grid gap-4 md:grid-cols-2">
          {skills.map((group, i) => {
            const Icon = getIcon(group.icon)
            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
                className="glass-card group flex flex-col rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
              >
                <div className="mb-4 flex items-start gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/12 text-primary ring-1 ring-primary/20 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <h3 className="font-semibold">{group.category}</h3>
                    {group.description && (
                      <p className="text-xs leading-relaxed text-muted-foreground">
                        {group.description}
                      </p>
                    )}
                  </div>
                  <span className="ml-auto font-pixel text-xs text-primary/60">
                    {group.items.length}
                  </span>
                </div>

                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-border bg-secondary/50 px-3 py-1.5 text-sm text-foreground/85 transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
