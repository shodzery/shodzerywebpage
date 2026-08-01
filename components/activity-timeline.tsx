'use client'

import { motion } from 'framer-motion'
import { Milestone, Rocket } from 'lucide-react'

import { SectionHeading } from '@/components/section-heading'
import { changelog, roadmap } from '@/data/portfolio'

export function ActivityTimeline({
  showHeading = true,
}: {
  showHeading?: boolean
}) {
  return (
    <section id="actividad" className="relative scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {showHeading && (
          <SectionHeading
            label="{ 01 }"
            title="Actividad y hoja de ruta"
            description="Versiones publicadas de mis herramientas internas y lo que estoy construyendo ahora mismo."
          />
        )}

        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <div className="mb-6 flex items-center gap-2">
              <Milestone className="size-4 text-primary" aria-hidden="true" />
              <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground/80">
                Changelog
              </h3>
            </div>

            <ol className="relative flex flex-col gap-4 border-l border-border/70 pl-6">
              {changelog.map((entry, index) => (
                <motion.li
                  key={entry.version}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  className="glass-card relative rounded-lg p-5"
                >
                  <span
                    className="absolute -left-[31px] top-6 size-2.5 rounded-full bg-primary ring-4 ring-background"
                    aria-hidden="true"
                  />

                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-sm text-primary">
                      {entry.version}
                    </span>
                    <span className="rounded border border-success/30 bg-success/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-success">
                      {entry.state}
                    </span>
                    <span className="ml-auto font-mono text-xs text-muted-foreground">
                      {entry.date}
                    </span>
                  </div>

                  <h4 className="mt-2 text-base font-semibold text-foreground">
                    {entry.title}
                  </h4>

                  <ul className="mt-3 flex flex-col gap-1.5">
                    {entry.changes.map((change) => (
                      <li
                        key={change}
                        className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span className="mt-1.5 size-1 shrink-0 rounded-full bg-primary/60" />
                        {change}
                      </li>
                    ))}
                  </ul>
                </motion.li>
              ))}
            </ol>
          </div>

          <div>
            <div className="mb-6 flex items-center gap-2">
              <Rocket className="size-4 text-accent" aria-hidden="true" />
              <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground/80">
                En construcción
              </h3>
            </div>

            <ul className="flex flex-col gap-4">
              {roadmap.map((item, index) => (
                <motion.li
                  key={item.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  className="glass-card flex flex-col gap-3 rounded-lg p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h4 className="text-base font-semibold text-foreground">
                      {item.title}
                    </h4>
                    <span className="shrink-0 rounded border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-primary">
                      {item.state}
                    </span>
                  </div>

                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>

                  <div className="flex items-center gap-3">
                    <div
                      className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary"
                      role="progressbar"
                      aria-valuenow={item.progress}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`Progreso de ${item.title}`}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                      />
                    </div>
                    <span className="font-mono text-xs text-muted-foreground">
                      {item.progress}%
                    </span>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
