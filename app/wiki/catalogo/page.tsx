import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { CatalogBrowser } from '@/components/wiki/catalog-browser'

export const metadata: Metadata = {
  title: 'Catálogo de Minecraft en vivo',
  description:
    'Busca objetos, bloques, mobs, biomas, pociones y efectos, y encantamientos de Minecraft, con recetas de crafteo, actualizado en vivo.',
}

export default async function WikiCatalogoPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string; item?: string }>
}) {
  const { categoria, item } = await searchParams

  return (
    <main className="relative z-10">
      <PageHeader
        icon="Package"
        eyebrow="{ catálogo en vivo }"
        title="Catálogo de Minecraft"
        description="Objetos, bloques, mobs, biomas, pociones/efectos y encantamientos — todo en un solo lugar, con datos en vivo y recetas de crafteo incluidas."
        meta={[
          { label: 'Categorías', value: '5' },
          { label: 'Fuente', value: 'En vivo' },
          { label: 'Crafteos', value: 'Incluidos' },
        ]}
      />

      <section className="relative py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <CatalogBrowser initialCategory={categoria} initialItem={item} />
        </div>
      </section>
    </main>
  )
}
