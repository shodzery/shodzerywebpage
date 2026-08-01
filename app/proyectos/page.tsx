import type { Metadata } from 'next'

import { PageHeader } from '@/components/page-header'
import { Projects } from '@/components/projects'
import { Testimonials } from '@/components/testimonials'
import { CtaBand } from '@/components/cta-band'
import { projects } from '@/data/portfolio'

export const metadata: Metadata = {
  title: 'Proyectos',
  description:
    'Casos de desarrollo de plugins a medida, arquitectura de redes Velocity, sistemas RPG, auditorías de rendimiento y paneles web para servidores de Minecraft.',
}

export default function ProyectosPage() {
  return (
    <main className="relative z-10">
      <PageHeader
        icon="Blocks"
        eyebrow="{ proyectos }"
        title="Proyectos y casos técnicos"
        description="Ejemplos representativos del tipo de trabajo que realizo. Sustituye estos casos por tus proyectos reales editando data/portfolio.ts."
        meta={[
          { label: 'Casos', value: String(projects.length) },
          { label: 'Ámbitos', value: 'Dev · Red · RPG' },
          { label: 'Rendimiento', value: 'Auditado' },
          { label: 'Entrega', value: 'Documentada' },
        ]}
      />

      <Projects showHeading={false} />
      <Testimonials />
      <CtaBand
        title="¿Tu proyecto es el siguiente?"
        description="Desde un plugin concreto hasta una red completa. Cuéntame el alcance y lo planificamos por fases."
      />
    </main>
  )
}
