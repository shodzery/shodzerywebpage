'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Check, Eye, User, Wrench, X } from 'lucide-react'
import { projects } from '@/data/portfolio'
import { SectionHeading } from '@/components/section-heading'

type Project = (typeof projects)[number]

export function Projects({
  limit,
  showHeading = true,
  showMoreLink = false,
}: {
  limit?: number
  showHeading?: boolean
  showMoreLink?: boolean
}) {
  const [selected, setSelected] = useState<Project | null>(null)
  const list = limit ? projects.slice(0, limit) : projects

  // Cierra el modal con Escape
  useEffect(() => {
    if (!selected) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [selected])

  return (
    <section id="proyectos" className="relative scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {showHeading && (
          <SectionHeading
            label="{ 06 }"
            title="Proyectos destacados"
            description="Casos representativos del tipo de trabajo técnico que realizo: desarrollo a medida, arquitectura de red, contenido RPG, rendimiento y herramientas web."
          />
        )}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((project, i) => (
            <motion.article
              key={project.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
              className="glass-card group flex flex-col overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/45 hover:glow-primary"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={project.image || '/placeholder.svg'}
                  alt={`Banner del proyecto ${project.name}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Velo violeta sobre la imagen */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent"
                  aria-hidden="true"
                />
                <span className="glass-soft absolute left-3 top-3 rounded-md px-2 py-0.5 text-xs text-primary">
                  {project.type}
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-3 p-5">
                <h3 className="text-balance font-semibold leading-snug transition-colors group-hover:text-primary">
                  {project.name}
                </h3>

                <p className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
                  <User className="size-3.5" aria-hidden="true" />
                  {project.role}
                  <span aria-hidden="true">·</span>
                  {project.status}
                </p>

                <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {project.tools.slice(0, 3).map((tool) => (
                    <span
                      key={tool}
                      className="rounded-sm bg-secondary/60 px-2 py-0.5 text-xs text-muted-foreground"
                    >
                      {tool}
                    </span>
                  ))}
                  {project.tools.length > 3 && (
                    <span className="rounded-sm px-2 py-0.5 text-xs text-primary/80">
                      +{project.tools.length - 3}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setSelected(project)}
                  className="mt-auto flex w-fit items-center gap-2 rounded-md border border-border px-4 py-2 text-sm text-foreground transition-colors hover:border-primary/50 hover:bg-primary/10 hover:text-primary focus-visible:outline-2 focus-visible:outline-ring"
                >
                  <Eye className="size-4" aria-hidden="true" />
                  Ver detalles
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        {showMoreLink && (
          <div className="mt-10 flex justify-center">
            <Link
              href="/proyectos"
              className="glass-card group flex items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-2 focus-visible:outline-ring"
            >
              Ver todos los proyectos
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        )}
      </div>

      {/* Modal de detalles */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-background/85 p-4 backdrop-blur-sm"
            onClick={() => setSelected(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`Detalles del proyecto ${selected.name}`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.25 }}
              className="glass-card border-gradient my-auto w-full max-w-lg overflow-hidden rounded-xl bg-card"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video">
                <Image
                  src={selected.image || '/placeholder.svg'}
                  alt={`Banner del proyecto ${selected.name}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 512px"
                  className="object-cover"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-card to-transparent"
                  aria-hidden="true"
                />
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="glass-soft absolute right-3 top-3 rounded-md p-1.5 text-foreground hover:text-primary focus-visible:outline-2 focus-visible:outline-ring"
                  aria-label="Cerrar detalles"
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              </div>

              <div className="flex flex-col gap-4 p-6">
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-semibold">{selected.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    <span className="text-primary">{selected.type}</span>
                    {' · '}
                    {selected.role}
                    {' · '}
                    {selected.status}
                  </p>
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  {selected.description}
                </p>

                {selected.highlights && (
                  <ul className="flex flex-col gap-2 rounded-lg bg-secondary/40 p-4">
                    {selected.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-2 text-sm text-foreground/85"
                      >
                        <Check
                          className="mt-0.5 size-4 shrink-0 text-success"
                          aria-hidden="true"
                        />
                        {h}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="flex flex-wrap items-center gap-2">
                  <Wrench
                    className="size-3.5 text-muted-foreground"
                    aria-hidden="true"
                  />
                  {selected.tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-md bg-primary/10 px-2 py-0.5 text-xs text-primary ring-1 ring-primary/15"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
