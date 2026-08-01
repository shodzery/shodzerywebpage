import type { Metadata } from 'next'

import { PageHeader } from '@/components/page-header'
import { FaqSection } from '@/components/faq-section'
import { CtaBand } from '@/components/cta-band'
import { faq } from '@/data/portfolio'

export const metadata: Metadata = {
  title: 'Preguntas frecuentes',
  description:
    'Respuestas sobre versiones soportadas, desarrollo de plugins y mods, optimización de TPS, migraciones sin pérdida de datos y soporte posterior.',
}

export default function FaqPage() {
  return (
    <main className="relative z-10">
      <PageHeader
        icon="LifeBuoy"
        eyebrow="{ faq }"
        title="Preguntas frecuentes"
        description="Lo que suelen preguntarme antes de empezar: alcance, versiones, rendimiento, migraciones y soporte."
        meta={[
          { label: 'Preguntas', value: String(faq.length) },
          { label: 'Respuesta', value: 'Por Discord' },
          { label: 'Presupuesto', value: 'Sin coste' },
        ]}
      />

      <FaqSection showHeading={false} />
      <CtaBand
        title="¿No encuentras tu respuesta?"
        description="Escríbeme por Discord con tu duda concreta y te respondo con una valoración técnica de tu caso."
      />
    </main>
  )
}
