import type { Metadata } from 'next'
import Link from 'next/link'
import { MessageCircle } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'

import { PageHeader } from '@/components/page-header'
import { MinecraftSkinViewer } from '@/components/minecraft-skin-viewer'
import { CtaBand } from '@/components/cta-band'
import { team, discord, socialLinks } from '@/data/portfolio'

export const metadata: Metadata = {
  title: 'Equipo',
  description: 'Quién está detrás de Shodzery y de las herramientas y proyectos de este sitio.',
}

export default function EquipoPage() {
  return (
    <main className="relative z-10">
      <PageHeader
        icon="Crown"
        eyebrow="{ equipo }"
        title="Equipo"
        description="Este proyecto —el sitio, las herramientas de Minecraft y los servidores que hay detrás— está desarrollado y mantenido por una sola persona."
        meta={[
          { label: 'Miembros', value: String(team.length) },
          { label: 'Disponibilidad', value: 'Ver ficha' },
        ]}
      />

      <section className="relative py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {team.map((person) => (
            <div
              key={person.name}
              className="glass-card border-gradient-animated grid grid-cols-1 items-center gap-10 rounded-2xl p-8 lg:grid-cols-[340px_1fr] lg:p-12"
            >
              <div className="flex justify-center">
                <MinecraftSkinViewer />
              </div>

              <div className="flex flex-col gap-5">
                <div>
                  <span className="glass-soft mb-3 inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-medium text-primary">
                    {person.badge}
                  </span>
                  <h2 className="text-3xl font-bold text-foreground">{person.name}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{person.role}</p>
                </div>

                <p className="text-pretty leading-relaxed text-muted-foreground">{person.bio}</p>

                <div className="flex flex-wrap gap-2">
                  {person.skills.map((skill) => (
                    <span
                      key={skill}
                      className="chip glass-soft rounded-full px-3 py-1 text-xs text-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href={socialLinks.discord}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glow-primary btn-pop inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
                  >
                    <MessageCircle className="size-4" aria-hidden="true" />
                    {discord.username}
                  </a>
                  <a
                    href={socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary/50 hover:text-primary"
                  >
                    <FaGithub className="size-4" aria-hidden="true" />
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative pb-4">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="glass-card rounded-xl p-8 text-center">
            <h3 className="mb-2 text-lg font-semibold text-foreground">
              ¿Buscas colaborar en un proyecto?
            </h3>
            <p className="mx-auto max-w-xl text-sm text-muted-foreground">
              Este es un proyecto en solitario, pero siempre estoy abierto a hablar sobre
              colaboraciones puntuales de desarrollo o diseño. Escríbeme por Discord.
            </p>
          </div>
        </div>
      </section>

      <CtaBand />
    </main>
  )
}
