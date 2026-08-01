'use client'

import { motion } from 'framer-motion'
import { Activity, Radio } from 'lucide-react'

import { SectionHeading } from '@/components/section-heading'
import { Icon } from '@/components/icon-registry'
import { dashboardMetrics, proficiency, supportedVersions } from '@/data/portfolio'

export function Dashboard({
  showHeading = true,
}: {
  showHeading?: boolean
}) {
  return (
    <section id="panel" className="relative scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {showHeading && (
          <SectionHeading
            label="{ 02 }"
            title="Panel técnico"
            description="Vista tipo dashboard de lo que hago y con qué profundidad. Los valores marcados con — están pendientes de completar con tus cifras reales."
          />
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {dashboardMetrics.map((metric, index) => (
            <motion.article
              key={metric.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="glass-card group flex flex-col gap-3 rounded-lg p-5"
            >
              <div className="flex items-center justify-between">
                <span className="flex size-9 items-center justify-center rounded-md bg-primary/12 text-primary">
                  <Icon name={metric.icon} className="size-4" />
                </span>

                <Radio
                  className="size-3.5 text-accent/70"
                  aria-hidden="true"
                />
              </div>

              <p className="font-pixel text-2xl text-foreground">
                {metric.value}
              </p>

              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium text-foreground/90">
                  {metric.label}
                </p>
                <p className="font-mono text-[11px] text-muted-foreground">
                  {metric.hint}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-lg p-6"
          >
            <div className="mb-6 flex items-center gap-2">
              <Activity className="size-4 text-primary" aria-hidden="true" />
              <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground/80">
                Nivel de dominio
              </h3>
            </div>

            <ul className="flex flex-col gap-5">
              {proficiency.map((item, index) => (
                <li key={item.label} className="flex flex-col gap-2">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-sm text-foreground/90">
                      {item.label}
                    </span>
                    <span className="font-mono text-xs text-primary">
                      {item.level}%
                    </span>
                  </div>

                  <div
                    className="h-1.5 overflow-hidden rounded-full bg-secondary"
                    role="progressbar"
                    aria-valuenow={item.level}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={item.label}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.level}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.9,
                        delay: 0.1 + index * 0.06,
                        ease: 'easeOut',
                      }}
                      className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card flex flex-col gap-5 rounded-lg p-6"
          >
            <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground/80">
              Versiones que trabajo
            </h3>

            <ul className="flex flex-wrap gap-2">
              {supportedVersions.map((version) => (
                <li
                  key={version}
                  className="rounded-md border border-primary/25 bg-primary/8 px-2.5 py-1.5 font-mono text-xs text-primary"
                >
                  {version}
                </li>
              ))}
            </ul>

            <div className="mt-auto flex flex-col gap-3 border-t border-border/60 pt-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Objetivo de TPS</span>
                <span className="font-mono text-success">20.0</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Java objetivo</span>
                <span className="font-mono text-foreground/90">17 / 21</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Entorno</span>
                <span className="font-mono text-foreground/90">
                  Linux · Docker
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Perfilado</span>
                <span className="font-mono text-foreground/90">
                  spark · timings
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
