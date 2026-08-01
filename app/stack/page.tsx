import type { Metadata } from 'next'

import { PageHeader } from '@/components/page-header'
import { TechStack } from '@/components/tech-stack'
import { WhyMe } from '@/components/why-me'
import { CtaBand } from '@/components/cta-band'
import { techStack } from '@/data/portfolio'

export const metadata: Metadata = {
  title: 'Stack técnico',
  description:
    'Arquitectura por capas de un proyecto de Minecraft: red y proxy, núcleos de servidor, contenido, datos y capa web con automatización.',
}

export default function StackPage() {
  return (
    <main className="relative z-10">
      <PageHeader
        icon="Network"
        eyebrow="{ arquitectura }"
        title="Stack técnico por capas"
        description="Cómo estructuro la infraestructura de un servidor o una red: cada capa con su propósito, sus herramientas y sus decisiones justificadas."
        meta={[
          { label: 'Capas', value: String(techStack.length) },
          { label: 'Proxy', value: 'Velocity' },
          { label: 'Núcleos', value: 'Paper · Purpur · Folia' },
          { label: 'Datos', value: 'SQL · Redis' },
        ]}
      />

      <TechStack showHeading={false} />
      <WhyMe />
      <CtaBand
        title="¿Quieres una arquitectura así?"
        description="Diseño la infraestructura completa de tu proyecto y la documento capa por capa para que tu equipo pueda mantenerla."
      />
    </main>
  )
}
