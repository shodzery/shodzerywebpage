import type { Metadata } from 'next'

import { PageHeader } from '@/components/page-header'
import { ChangelogList } from '@/components/changelogs/changelog-list'
import { CtaBand } from '@/components/cta-band'

export const metadata: Metadata = {
  title: 'Changelogs',
  description: 'Notas de parche oficiales de Minecraft Java y Bedrock Edition, directamente desde Mojang.',
}

export default function ChangelogsPage() {
  return (
    <main className="relative z-10">
      <PageHeader
        icon="FileText"
        eyebrow="{ changelogs }"
        title="Changelogs de Minecraft"
        description="Todas las notas de parche, snapshots y versiones estables de Java y Bedrock Edition, sincronizadas en directo con los servidores de Mojang."
        meta={[
          { label: 'Fuente', value: 'Mojang' },
          { label: 'Ediciones', value: 'Java · Bedrock' },
          { label: 'Actualización', value: 'En vivo' },
        ]}
      />

      <section className="relative py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ChangelogList />
        </div>
      </section>

      <CtaBand
        title="¿Necesitas migrar tu servidor a una nueva versión?"
        description="Reviso compatibilidad de plugins y mods antes de cada actualización mayor para evitar sorpresas."
      />
    </main>
  )
}
