'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { services } from '@/data/portfolio'
import { SectionHeading } from '@/components/section-heading'
import { getIcon } from '@/components/icon-registry'

export function Services({
  limit,
  showHeading = true,
  showMoreLink = false,
}: {
  limit?: number
  showHeading?: boolean
  showMoreLink?: boolean
}) {
  const list = limit ? services.slice(0, limit) : services

  return (
    <section id="servicios" className="relative scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {showHeading && (
          <SectionHeading
            label="{ 03 }"
            title="Servicios"
            description="Desarrollo, configuración, optimización e infraestructura: todo el ciclo de vida técnico de un servidor de Minecraft."
          />
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((service, i) => {
            const Icon = getIcon(service.icon)
            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
                className="glass-card shine group flex flex-col gap-4 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/45 hover:glow-primary"
              >
                <span className="flex size-11 items-center justify-center rounded-lg bg-primary/12 text-primary ring-1 ring-primary/20 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:ring-primary/50">
                  <Icon className="size-5" aria-hidden="true" />
                </span>

                <h3 className="text-balance font-semibold leading-snug transition-colors group-hover:text-primary">
                  {service.title}
                </h3>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>

                {service.highlights && (
                  <ul className="mt-auto flex flex-col gap-1.5 border-t border-border/60 pt-4">
                    {service.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-center gap-2 text-xs text-muted-foreground"
                      >
                        <Check
                          className="size-3.5 shrink-0 text-success"
                          aria-hidden="true"
                        />
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.article>
            )
          })}
        </div>

        {showMoreLink && (
          <div className="mt-10 flex justify-center">
            <Link
              href="/servicios"
              className="glass-card group flex items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-2 focus-visible:outline-ring"
            >
              Ver los {services.length} servicios
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
