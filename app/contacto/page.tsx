import type { Metadata } from 'next'

import { PageHeader } from '@/components/page-header'
import { Contact } from '@/components/contact'
import { FaqSection } from '@/components/faq-section'
import { discord } from '@/data/portfolio'

export const metadata: Metadata = {
  title: 'Contacto',
  description:
    'Solicita un presupuesto para desarrollo de plugins, mods, configuración de servidores, redes u optimización de rendimiento en Minecraft.',
}

export default function ContactoPage() {
  return (
    <main className="relative z-10">
      <PageHeader
        icon="MessagesSquare"
        eyebrow="{ contacto }"
        title="Hablemos de tu servidor"
        description="Rellena el formulario con los detalles de tu proyecto y se generará un mensaje listo para enviarme por Discord. Sin compromiso."
        meta={[
          { label: 'Discord', value: discord.username },
          { label: 'Respuesta', value: 'En 24-48 h' },
          { label: 'Presupuesto', value: 'Sin coste' },
        ]}
      />

      <Contact showHeading={false} />
      <FaqSection />
    </main>
  )
}
