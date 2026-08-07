import type { Metadata } from 'next'

import { PageHeader } from '@/components/page-header'
import { NewsList } from '@/components/news/news-list'
import { CtaBand } from '@/components/cta-band'

export const metadata: Metadata = {
  title: 'Novedades',
  description: 'Últimos artículos y anuncios oficiales de minecraft.net y del launcher de Mojang.',
}

export default function NovedadesPage() {
  return (
    <main className="relative z-10">
      <PageHeader
        icon="Sparkles"
        eyebrow="{ novedades }"
        title="Novedades de Minecraft"
        description="Los últimos anuncios, artículos y eventos publicados por Mojang, actualizados en directo."
        meta={[
          { label: 'Fuente', value: 'minecraft.net' },
          { label: 'Actualización', value: 'En vivo' },
          { label: 'Idioma', value: 'Original (EN)' },
        ]}
      />

      <section className="relative py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <NewsList />
        </div>
      </section>

      <CtaBand
        title="¿Quieres que tu comunidad se entere primero?"
        description="Puedo automatizar un bot de Discord que publique estas novedades y los changelogs en tu servidor al instante."
      />
    </main>
  )
}
