import type { Metadata } from 'next'

import { PageHeader } from '@/components/page-header'
import { About } from '@/components/about'
import { Dashboard } from '@/components/dashboard'
import { WhyMe } from '@/components/why-me'
import { Testimonials } from '@/components/testimonials'
import { CtaBand } from '@/components/cta-band'

export const metadata: Metadata = {
  title: 'Sobre mí',
  description:
    'Quién soy, cómo trabajo y con qué profundidad domino el ecosistema técnico de Minecraft: plugins, mods, redes, rendimiento e infraestructura.',
}

export default function SobreMiPage() {
  return (
    <main className="relative z-10">
      <PageHeader
        icon="User"
        eyebrow="{ perfil }"
        title="Sobre mí"
        description="Desarrollador y configurador de servidores de Minecraft. Trabajo el ecosistema completo, desde el código de un plugin hasta el ajuste fino de la JVM y la arquitectura de una red entera."
        meta={[
          { label: 'Enfoque', value: 'Técnico y medible' },
          { label: 'Java', value: '17 / 21' },
          { label: 'Entorno', value: 'Linux · Docker' },
          { label: 'Objetivo', value: '20 TPS' },
        ]}
      />

      <About showHeading={false} showTools />
      <Dashboard showHeading={false} />
      <WhyMe />
      <Testimonials />
      <CtaBand
        title="¿Hablamos de tu proyecto?"
        description="Si buscas alguien que entienda tanto el código como la infraestructura de tu servidor, escríbeme y revisamos el estado actual."
      />
    </main>
  )
}
