import type { Metadata } from 'next'

import { PageHeader } from '@/components/page-header'
import { ServerSearchForm } from '@/components/servers/server-search-form'
import { ServerStatusCard } from '@/components/servers/server-status-card'
import { CtaBand } from '@/components/cta-band'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ip: string }>
}): Promise<Metadata> {
  const { ip } = await params
  return {
    title: `${ip} — Estado del servidor`,
    description: `Estado en vivo, versión y jugadores conectados del servidor de Minecraft ${ip}.`,
  }
}

export default async function ServidorPage({
  params,
}: {
  params: Promise<{ ip: string }>
}) {
  const { ip } = await params

  return (
    <main className="relative z-10">
      <PageHeader
        icon="Server"
        eyebrow="{ servidores }"
        title={ip}
        description="Estado en vivo obtenido directamente por ping al servidor."
      />

      <section className="relative pb-6">
        <div className="mx-auto flex max-w-3xl justify-center px-4 sm:px-6">
          <ServerSearchForm />
        </div>
      </section>

      <section className="relative py-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <ServerStatusCard address={ip} />
        </div>
      </section>

      <CtaBand
        title="¿Este servidor es tuyo y va lento?"
        description="Analizo timings, spark y flags de la JVM para encontrar el cuello de botella real y solucionarlo."
      />
    </main>
  )
}
