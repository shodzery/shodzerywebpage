import type { Metadata } from 'next'

import { PageHeader } from '@/components/page-header'
import { Services } from '@/components/services'
import { Specialties } from '@/components/specialties'
import { Workflow } from '@/components/workflow'
import { CtaBand } from '@/components/cta-band'
import { services, specialties } from '@/data/portfolio'

export const metadata: Metadata = {
  title: 'Servicios',
  description:
    'Desarrollo de plugins y mods, configuración de servidores, redes Velocity, optimización extrema de rendimiento, seguridad, migraciones, automatización y desarrollo web para Minecraft.',
}

export default function ServiciosPage() {
  return (
    <main className="relative z-10">
      <PageHeader
        icon="Wrench"
        eyebrow="{ servicios }"
        title="Servicios técnicos"
        description="Todo el ciclo de vida de un servidor de Minecraft: desarrollo a medida, configuración profunda, arquitectura de red, rendimiento, seguridad e infraestructura."
        meta={[
          { label: 'Servicios', value: String(services.length) },
          { label: 'Modalidades', value: String(specialties.length) },
          { label: 'Soporte', value: 'Incluido' },
          { label: 'Entrega', value: 'Documentada' },
        ]}
      />

      <Services showHeading={false} />
      <Specialties />
      <Workflow />
      <CtaBand
        title="¿Qué necesita tu servidor?"
        description="Cuéntame la versión, la modalidad y el problema concreto. Te propongo un plan por fases empezando por lo que más impacto tenga."
      />
    </main>
  )
}
