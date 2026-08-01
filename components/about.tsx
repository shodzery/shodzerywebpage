'use client'

import { motion } from 'framer-motion'
import { Quote, Terminal } from 'lucide-react'
import { identity, stats, favoriteTools } from '@/data/portfolio'
import { SectionHeading } from '@/components/section-heading'
import { AnimatedNumber } from '@/components/animated-number'

export function About({
  showTools = false,
  showHeading = true,
}: {
  showTools?: boolean
  showHeading?: boolean
}) {
  return (
    <section id="sobre-mi" className="relative scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {showHeading && (
          <SectionHeading
            label="{ 01 }"
            title="Sobre mí"
            description="Desarrollo, configuro y optimizo servidores de Minecraft tratándolos como lo que son: software en producción."
          />
        )}

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* Texto principal */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="glass-card border-gradient flex flex-col gap-5 rounded-xl p-6 sm:p-8"
          >
            {identity.about.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="text-pretty leading-relaxed text-muted-foreground"
              >
                {paragraph}
              </p>
            ))}
          </motion.div>

          {/* Tarjeta lateral: consola + cita */}
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass-card overflow-hidden rounded-xl"
            >
              <div className="flex items-center gap-2 border-b border-border/60 bg-secondary/40 px-4 py-2.5">
                <Terminal className="size-3.5 text-primary" aria-hidden="true" />
                <span className="font-mono text-xs text-muted-foreground">
                  server.log
                </span>
                <span className="ml-auto flex items-center gap-1.5 text-xs text-success">
                  <span className="size-1.5 rounded-full bg-success" />
                  20.0 TPS
                </span>
              </div>
              <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-muted-foreground">
                <code>{`[INFO] Starting minecraft server version 1.21.x
[INFO] Loading Paper + 42 plugins
[INFO] JVM flags: G1GC tuned profile
[INFO] Done (4.812s)! For help, type "help"
[TPS ] 20.0 / 20.0 · MSPT 8.4 · RAM 6.1/12 GB`}</code>
              </pre>
            </motion.div>

            <motion.blockquote
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="glass-card flex flex-1 flex-col gap-3 rounded-xl p-6"
            >
              <Quote className="size-5 text-primary/70" aria-hidden="true" />
              <p className="text-pretty leading-relaxed text-foreground/85">
                Un servidor bien hecho no se nota: simplemente funciona a 20 TPS,
                se entiende al abrirlo y se puede mantener sin miedo.
              </p>
              <span className="font-pixel text-sm text-primary">
                {identity.name}
              </span>
            </motion.blockquote>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="glass-card shine group flex flex-col items-center gap-2 rounded-xl p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
            >
              <AnimatedNumber
                value={stat.value}
                className="font-pixel text-2xl text-primary transition-colors group-hover:text-glow"
              />
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Herramientas favoritas (solo en la página Sobre mí) */}
        {showTools && (
          <div className="mt-16">
            <h3 className="mb-6 text-xl font-bold">Herramientas favoritas</h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {favoriteTools.map((tool, i) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: (i % 3) * 0.06 }}
                  className="glass-soft flex flex-col gap-1 rounded-lg p-4 transition-colors hover:border-primary/40"
                >
                  <span className="text-sm font-semibold text-foreground">
                    {tool.name}
                  </span>
                  <span className="text-xs leading-relaxed text-muted-foreground">
                    {tool.use}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
