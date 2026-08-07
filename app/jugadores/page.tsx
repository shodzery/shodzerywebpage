import type { Metadata } from 'next'
import { Fingerprint, History, Shirt } from 'lucide-react'

import { PageHeader } from '@/components/page-header'
import { PlayerSearchForm } from '@/components/players/player-search-form'
import { CtaBand } from '@/components/cta-band'

export const metadata: Metadata = {
  title: 'Buscar jugadores',
  description:
    'Busca cualquier cuenta de Minecraft por nombre: UUID, skin en 3D, capa e historial de nombres.',
}

const highlights = [
  {
    icon: Fingerprint,
    title: 'UUID exacto',
    description: 'Obtén el identificador único de cualquier cuenta, en formato con y sin guiones.',
  },
  {
    icon: Shirt,
    title: 'Skin en 3D',
    description: 'Visualiza la skin actual del jugador, su variante (classic/slim) y su capa si tiene.',
  },
  {
    icon: History,
    title: 'Historial de nombres',
    description: 'Consulta los nombres anteriores que ha usado esa cuenta, cuando el dato está disponible.',
  },
]

const popular = ['Shodzery', 'Notch', 'Dream', 'Technoblade', 'jeb_']

export default function JugadoresPage() {
  return (
    <main className="relative z-10">
      <PageHeader
        icon="Users"
        eyebrow="{ jugadores }"
        title="Buscar jugadores de Minecraft"
        description="Escribe un nombre de usuario para obtener su UUID, su skin renderizada en 3D, su capa y su historial de nombres."
        meta={[
          { label: 'Fuente', value: 'Mojang API' },
          { label: 'Caché', value: '5 min' },
          { label: 'Coste', value: 'Gratis' },
        ]}
      />

      <section className="relative py-4">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 text-center sm:px-6">
          <PlayerSearchForm autoFocus />

          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs text-muted-foreground">Prueba con:</span>
            {popular.map((name) => (
              <a
                key={name}
                href={`/jugadores/${encodeURIComponent(name)}`}
                className="chip glass-soft rounded-full px-3 py-1 text-xs text-muted-foreground transition-colors hover:text-primary"
              >
                {name}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-16">
        <div className="mx-auto grid max-w-6xl gap-5 px-4 sm:grid-cols-3 sm:px-6">
          {highlights.map(({ icon: Icon, title, description }) => (
            <div key={title} className="glass-card hover-lift rounded-xl p-6">
              <span className="glass-soft mb-4 flex size-11 items-center justify-center rounded-lg text-primary">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mb-2 font-semibold text-foreground">{title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <CtaBand
        title="¿Quieres esto integrado en tu servidor?"
        description="Puedo construir un panel de perfiles de jugador, un sistema de autenticación por skin o cualquier integración a medida con la API de Mojang."
      />
    </main>
  )
}
