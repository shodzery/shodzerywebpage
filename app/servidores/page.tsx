import type { Metadata } from 'next'
import { Gauge, MessageSquareText, Users2 } from 'lucide-react'

import { PageHeader } from '@/components/page-header'
import { ServerSearchForm } from '@/components/servers/server-search-form'
import { CtaBand } from '@/components/cta-band'

export const metadata: Metadata = {
  title: 'Estado de servidores',
  description:
    'Comprueba si un servidor de Minecraft Java o Bedrock está en línea, su versión, jugadores conectados y MOTD.',
}

const highlights = [
  {
    icon: Users2,
    title: 'Jugadores en vivo',
    description: 'Cuántos jugadores hay conectados ahora mismo y, si el servidor lo permite, quiénes son.',
  },
  {
    icon: Gauge,
    title: 'Versión y software',
    description: 'Versión del protocolo, versión de Minecraft y el software del servidor cuando está disponible.',
  },
  {
    icon: MessageSquareText,
    title: 'MOTD e icono',
    description: 'El mensaje del día tal y como lo verían los jugadores desde el listado de servidores.',
  },
]

const popular = ['play.hypixel.net', 'mc.hypixel.net', '2b2t.org', 'play.cubecraft.net']

export default function ServidoresPage() {
  return (
    <main className="relative z-10">
      <PageHeader
        icon="Server"
        eyebrow="{ servidores }"
        title="Estado de servidores Minecraft"
        description="Introduce una IP o dominio para comprobar si el servidor está en línea, cuántos jugadores tiene y con qué versión funciona."
        meta={[
          { label: 'Protocolo', value: 'Java / Bedrock' },
          { label: 'Caché', value: '60 s' },
          { label: 'Coste', value: 'Gratis' },
        ]}
      />

      <section className="relative py-4">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 text-center sm:px-6">
          <ServerSearchForm autoFocus />

          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs text-muted-foreground">Prueba con:</span>
            {popular.map((address) => (
              <a
                key={address}
                href={`/servidores/${encodeURIComponent(address)}`}
                className="chip glass-soft rounded-full px-3 py-1 text-xs text-muted-foreground transition-colors hover:text-primary"
              >
                {address}
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
        title="¿Tu propio servidor necesita optimización?"
        description="Reviso timings, TPS, uso de RAM y configuración para dejar tu servidor estable y listo para escalar."
      />
    </main>
  )
}
