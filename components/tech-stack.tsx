'use client'

import { motion } from 'framer-motion'

import { SectionHeading } from '@/components/section-heading'
import { Icon } from '@/components/icon-registry'
import { favoriteTools, techStack } from '@/data/portfolio'

export function TechStack({
  showHeading = true,
}: {
  showHeading?: boolean
}) {
  return (
    <section id="stack" className="relative scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {showHeading && (
          <SectionHeading
            label="{ 01 }"
            title="Stack técnico por capas"
            description="Así organizo la infraestructura de un proyecto: desde el proxy que recibe al jugador hasta la web que lo administra."
          />
        )}

        <ol className="relative flex flex-col gap-4">
          {techStack.map((layer, index) => (
            <motion.li
              key={layer.layer}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="glass-card rounded-lg p-6"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-8">
                <div className="flex flex-col gap-3 lg:w-72 lg:shrink-0">
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-md bg-primary/12 text-primary">
                      <Icon name={layer.icon} className="size-5" />
                    </span>

                    <span className="font-mono text-xs text-muted-foreground">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-foreground">
                    {layer.layer}
                  </h3>

                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {layer.summary}
                  </p>
                </div>

                <ul className="grid flex-1 gap-3 sm:grid-cols-2">
                  {layer.items.map((item) => (
                    <li
                      key={item.name}
                      className="rounded-md border border-border/70 bg-secondary/35 p-3"
                    >
                      <p className="text-sm font-medium text-foreground">
                        {item.name}
                      </p>
                      <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                        {item.role}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.li>
          ))}
        </ol>

        <div className="mt-16">
          <h3 className="mb-5 text-sm font-semibold uppercase tracking-widest text-foreground/80">
            Herramientas del día a día
          </h3>

          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {favoriteTools.map((tool) => (
              <li
                key={tool.name}
                className="flex items-baseline justify-between gap-3 rounded-md border border-border/70 bg-card/40 px-4 py-3"
              >
                <span className="text-sm font-medium text-foreground">
                  {tool.name}
                </span>
                <span className="text-right text-xs text-muted-foreground">
                  {tool.use}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
