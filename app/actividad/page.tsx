import type { Metadata } from 'next'

import { PageHeader } from '@/components/page-header'
import { ActivityTimeline } from '@/components/activity-timeline'
import { CtaBand } from '@/components/cta-band'
import { changelog, roadmap } from '@/data/portfolio'

export const metadata: Metadata = {
  title: 'Actividad',
  description:
    'Changelog de mis herramientas internas y hoja de ruta de proyectos en construcción para el ecosistema de Minecraft.',
}

export default function ActividadPage() {
  return (
    <main className="relative z-10">
      <PageHeader
        icon="Activity"
        eyebrow="{ actividad }"
        title="Actividad y hoja de ruta"
        description="Registro de versiones de mis herramientas internas y lo que estoy construyendo ahora mismo. Completa las fechas marcadas con — cuando quieras."
        meta={[
          { label: 'Versiones', value: String(changelog.length) },
          { label: 'En curso', value: String(roadmap.length) },
          { label: 'Estado', value: 'Activo' },
        ]}
      />

      <ActivityTimeline showHeading={false} />
      <CtaBand
        title="¿Quieres seguir mi trabajo?"
        description="Publico utilidades y experimentos en GitHub. Pásate por el perfil o escríbeme por Discord."
      />
    </main>
  )
}
