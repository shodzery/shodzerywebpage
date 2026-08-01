'use client'

import { motion } from 'framer-motion'

import { SectionHeading } from '@/components/section-heading'
import { Icon } from '@/components/icon-registry'
import { specialties } from '@/data/portfolio'

export function Specialties({
  showHeading = true,
}: {
  showHeading?: boolean
}) {
  return (
    <section id="especialidades" className="relative scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {showHeading && (
          <SectionHeading
            label="{ 05 }"
            title="Especialidades por modalidad"
            description="Cada modalidad tiene sus propios problemas de balance, rendimiento y retención. Estas son las que domino."
          />
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {specialties.map((item, index) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: (index % 4) * 0.06 }}
              className="glass-card flex flex-col gap-3 rounded-lg p-5 transition-colors hover:border-primary/40"
            >
              <span className="flex size-10 items-center justify-center rounded-md bg-primary/12 text-primary">
                <Icon name={item.icon} className="size-5" />
              </span>

              <h3 className="text-base font-semibold text-foreground">
                {item.name}
              </h3>

              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>

              <ul className="mt-auto flex flex-wrap gap-1.5 pt-2">
                {item.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded border border-border/70 bg-secondary/50 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
