import type { Metadata } from 'next'

import { PageHeader } from '@/components/page-header'
import { PlayerSearchForm } from '@/components/players/player-search-form'
import { PlayerProfile } from '@/components/players/player-profile'
import { CtaBand } from '@/components/cta-band'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ nombre: string }>
}): Promise<Metadata> {
  const { nombre } = await params
  return {
    title: `${nombre} — Perfil de jugador`,
    description: `UUID, skin en 3D, capa e historial de nombres de ${nombre} en Minecraft.`,
  }
}

export default async function JugadorPage({
  params,
}: {
  params: Promise<{ nombre: string }>
}) {
  const { nombre } = await params

  return (
    <main className="relative z-10">
      <PageHeader
        icon="Users"
        eyebrow="{ jugadores }"
        title={nombre}
        description="Perfil público obtenido en tiempo real desde la API de Mojang y servicios de renderizado de skins."
      />

      <section className="relative pb-6">
        <div className="mx-auto flex max-w-3xl justify-center px-4 sm:px-6">
          <PlayerSearchForm />
        </div>
      </section>

      <section className="relative py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <PlayerProfile username={nombre} />
        </div>
      </section>

      <CtaBand
        title="¿Necesitas esto dentro de tu servidor?"
        description="Integro lookups de jugadores, skins y capas directamente en tu plugin, web o panel de administración."
      />
    </main>
  )
}
