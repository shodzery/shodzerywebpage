'use client'

import { motion } from 'framer-motion'
import { ArrowRight, FileCheck } from 'lucide-react'
import { workflow } from '@/data/portfolio'
import { SectionHeading } from '@/components/section-heading'

export function Workflow({ showHeading = true }: { showHeading?: boolean }) {
  return (
    <section id="proceso" className="relative scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {showHeading && (
          <SectionHeading
            label="{ 08 }"
            title="Proceso de trabajo"
            description="Un método claro y medible: nada se toca sin medir antes, y nada se entrega sin documentar después."
          />
        )}

        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {workflow.map((item, i) => (
            <motion.li
              key={item.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.1 }}
              className="glass-card shine group relative flex flex-col gap-3 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
            >
              <div className="flex items-center justify-between">
                <span className="font-pixel text-3xl text-primary/40 transition-colors group-hover:text-primary/80">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary opacity-0 ring-1 ring-primary/20 transition-opacity duration-300 group-hover:opacity-100">
                  <ArrowRight className="size-4" aria-hidden="true" />
                </span>
              </div>

              <h3 className="font-semibold transition-colors group-hover:text-primary">
                {item.step}
              </h3>

              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>

              {item.deliverable && (
                <p className="mt-auto flex items-center gap-2 border-t border-border/60 pt-4 text-xs text-muted-foreground">
                  <FileCheck
                    className="size-3.5 shrink-0 text-success"
                    aria-hidden="true"
                  />
                  {item.deliverable}
                </p>
              )}
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
