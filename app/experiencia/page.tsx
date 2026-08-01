import type { Metadata } from 'next'

import { PageHeader } from '@/components/page-header'
import { Experience } from '@/components/experience'
import { Workflow } from '@/components/workflow'
import { CtaBand } from '@/components/cta-band'
import { experience } from '@/data/portfolio'

export const metadata: Metadata = {
  title: 'Experiencia',
  description:
    'Trayectoria en desarrollo de plugins y mods, ingeniería de rendimiento, arquitectura de redes, configuración premium y desarrollo web para Minecraft.',
}

export default function ExperienciaPage() {
  return (
    <main className="relative z-10">
      <PageHeader
        icon="Award"
        eyebrow="{ trayectoria }"
        title="Experiencia profesional"
        description="Roles que he desempeñado en el ecosistema de Minecraft. Completa los campos marcados con — en data/portfolio.ts con tus servidores y periodos reales."
        meta={[
          { label: 'Roles', value: String(experience.length) },
          { label: 'Ámbito', value: 'Dev + Infra' },
          { label: 'Perfilado', value: 'spark · timings' },
          { label: 'Proceso', value: 'Por fases' },
        ]}
      />

      <Experience showHeading={false} />
      <Workflow />
      <CtaBand
        title="¿Buscas este perfil para tu equipo?"
        description="Trabajo por proyecto o de forma continua como desarrollador e ingeniero de infraestructura de tu red."
      />
    </main>
  )
}
