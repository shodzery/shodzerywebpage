import type { Metadata } from 'next'

import { PageHeader } from '@/components/page-header'
import { Skills } from '@/components/skills'
import { Dashboard } from '@/components/dashboard'
import { CtaBand } from '@/components/cta-band'
import { skills, supportedVersions } from '@/data/portfolio'

export const metadata: Metadata = {
  title: 'Tecnologías',
  description:
    'Lenguajes, núcleos de servidor, plugins premium, proxies, herramientas de rendimiento, bases de datos e integraciones web con las que trabajo en Minecraft.',
}

const totalItems = skills.reduce((acc, group) => acc + group.items.length, 0)

export default function TecnologiasPage() {
  return (
    <main className="relative z-10">
      <PageHeader
        icon="Layers"
        eyebrow="{ tecnologías }"
        title="Tecnologías y herramientas"
        description="El conjunto completo de tecnologías que uso a diario, agrupadas por categoría: desde el lenguaje en el que programo hasta las herramientas con las que perfilo el servidor."
        meta={[
          { label: 'Categorías', value: String(skills.length) },
          { label: 'Tecnologías', value: `${totalItems}+` },
          { label: 'Versiones', value: String(supportedVersions.length) },
          { label: 'Java', value: '17 / 21' },
        ]}
      />

      <Skills showHeading={false} />
      <Dashboard showHeading={false} />
      <CtaBand
        title="¿Tu stack no aparece aquí?"
        description="Trabajo con casi cualquier combinación del ecosistema de Minecraft. Escríbeme y lo revisamos."
      />
    </main>
  )
}
