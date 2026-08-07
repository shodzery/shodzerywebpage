import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import { PageHeader } from '@/components/page-header'
import { DimensionTabs } from '@/components/wiki/dimension-tabs'
import { CtaBand } from '@/components/cta-band'
import { getDimension, wikiDimensions } from '@/data/wiki'

export function generateStaticParams() {
  return wikiDimensions.map((d) => ({ dimension: d.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ dimension: string }>
}): Promise<Metadata> {
  const { dimension } = await params
  const dim = getDimension(dimension)
  if (!dim) return { title: 'Wiki' }
  return {
    title: `${dim.name} — Wiki de Minecraft`,
    description: dim.tagline,
  }
}

export default async function WikiDimensionPage({
  params,
}: {
  params: Promise<{ dimension: string }>
}) {
  const { dimension } = await params
  const dim = getDimension(dimension)

  if (!dim) notFound()

  return (
    <main className="relative z-10">
      <PageHeader
        icon={dim.icon}
        eyebrow="{ wiki }"
        title={dim.name}
        description={dim.tagline}
        meta={[
          { label: 'Biomas', value: String(dim.biomas.length) },
          { label: 'Mobs', value: String(dim.mobs.length) },
          { label: 'Estructuras', value: String(dim.estructuras.length) },
        ]}
      />

      <section className="relative pb-4">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Link
            href="/wiki"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Volver a la wiki
          </Link>
        </div>
      </section>

      <section className="relative py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <DimensionTabs dimension={dim} />
        </div>
      </section>

      <CtaBand
        title={`¿Necesitas un servidor ambientado en ${dim.name}?`}
        description="Configuro generación de mundo, datapacks y mecánicas personalizadas para cualquier dimensión."
      />
    </main>
  )
}
