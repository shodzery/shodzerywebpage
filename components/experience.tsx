'use client'

import { motion } from 'framer-motion'
import { Award, Calendar, Server, Wrench } from 'lucide-react'
import { experience } from '@/data/portfolio'
import { SectionHeading } from '@/components/section-heading'

export function Experience({ showHeading = true }: { showHeading?: boolean }) {
  return (
    <section id="experiencia" className="relative scroll-mt-24 py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {showHeading && (
          <SectionHeading
            label="{ 02 }"
            title="Experiencia"
            description="Los roles técnicos que he desempeñado dentro del ecosistema de Minecraft. Los nombres de servidor, periodos y logros están listos para completar con tus datos reales."
          />
        )}

        <ol className="relative pl-6 sm:pl-10">
          {/* Línea de tiempo con degradado */}
          <span
            className="absolute left-0 top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-primary/70 via-accent/50 to-transparent"
            aria-hidden="true"
          />

          {experience.map((item, i) => (
            <motion.li
              key={item.position}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="relative mb-8 last:mb-0"
            >
              {/* Punto de la línea de tiempo */}
              <span
                className="glow-primary absolute -left-[30px] top-7 size-3 rotate-45 rounded-sm bg-primary sm:-left-[46px]"
                aria-hidden="true"
              />

              <div className="glass-card shine rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-lg font-semibold text-primary">
                    {item.position}
                  </h3>
                  <span className="glass-soft flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs text-muted-foreground">
                    <Calendar className="size-3.5" aria-hidden="true" />
                    {item.period}
                  </span>
                </div>

                <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Server className="size-3.5" aria-hidden="true" />
                  {item.server}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-foreground/85">
                  {item.responsibilities}
                </p>

                <p className="mt-3 flex items-start gap-1.5 text-sm text-muted-foreground">
                  <Award
                    className="mt-0.5 size-3.5 shrink-0 text-success"
                    aria-hidden="true"
                  />
                  {item.achievements}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border/60 pt-4">
                  <Wrench
                    className="size-3.5 text-muted-foreground"
                    aria-hidden="true"
                  />
                  {item.tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-md bg-primary/10 px-2 py-0.5 text-xs text-primary ring-1 ring-primary/15"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
