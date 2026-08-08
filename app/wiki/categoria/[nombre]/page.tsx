import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { CategoryOrArticle } from '@/components/wiki/category-or-article'
import { getWikiCategory } from '@/data/wiki-categories'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ nombre: string }>
}): Promise<Metadata> {
  const { nombre } = await params
  const cat = getWikiCategory(nombre)
  const title = cat?.name || decodeURIComponent(nombre)
  return {
    title: `${title} — Wiki`,
    description: `${title} en Minecraft, con datos e imágenes en vivo desde minecraft.wiki.`,
  }
}

export default async function WikiCategoriaPage({ params }: { params: Promise<{ nombre: string }> }) {
  const { nombre } = await params
  const cat = getWikiCategory(nombre)
  const wikiTitle = cat?.wikiTitle || decodeURIComponent(nombre).replace(/-/g, ' ')
  const displayName = cat?.name || wikiTitle

  return (
    <main className="relative z-10">
      <PageHeader
        icon={cat?.icon || 'BookOpen'}
        eyebrow="{ minecraft.wiki }"
        title={displayName}
        description={`Contenido de "${displayName}" en vivo desde minecraft.wiki: texto, imágenes y todo lo disponible en la wiki oficial de la comunidad.`}
        meta={[
          { label: 'Fuente', value: 'minecraft.wiki' },
          { label: 'Actualización', value: 'En vivo' },
        ]}
      />

      <section className="relative py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Link
            href="/wiki"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Volver a la wiki
          </Link>

          <CategoryOrArticle name={wikiTitle} />
        </div>
      </section>
    </main>
  )
}
