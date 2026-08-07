import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { PageHeader } from '@/components/page-header'
import { Icon } from '@/components/icon-registry'
import { CtaBand } from '@/components/cta-band'
import { wikiDimensions } from '@/data/wiki'

export const metadata: Metadata = {
  title: 'Wiki de Minecraft',
  description:
    'Guías del Overworld, el Nether y el End: biomas, mobs y estructuras explicadas para configurar y administrar tu servidor.',
}

export default function WikiPage() {
  return (
    <main className="relative z-10">
      <PageHeader
        icon="BookOpen"
        eyebrow="{ wiki }"
        title="Wiki de Minecraft"
        description="Referencia rápida de las tres dimensiones del juego: qué biomas, mobs y estructuras esperar en cada una."
        meta={[
          { label: 'Dimensiones', value: '3' },
          { label: 'Idioma', value: 'Español' },
          { label: 'Formato', value: 'Guías rápidas' },
        ]}
      />

      <section className="relative py-10">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:grid-cols-3 sm:px-6">
          {wikiDimensions.map((dim) => (
            <Link
              key={dim.slug}
              href={`/wiki/${dim.slug}`}
              className="glass-card border-gradient hover-lift group flex flex-col gap-4 rounded-xl p-7"
            >
              <span className="glass-soft glow-primary flex size-12 items-center justify-center rounded-xl text-primary">
                <Icon name={dim.icon} className="size-6" />
              </span>
              <div>
                <h2 className="mb-1.5 text-xl font-bold text-foreground">{dim.name}</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">{dim.tagline}</p>
              </div>
              <span className="mt-auto flex items-center gap-1.5 text-sm font-medium text-primary">
                Explorar
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <CtaBand
        title="¿Configurando un servidor con mods de estas dimensiones?"
        description="Preparo generación de mundo, datapacks y configuraciones de bioma a medida para tu tipo de servidor."
      />
    </main>
  )
}
