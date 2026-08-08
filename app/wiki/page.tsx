import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { PageHeader } from '@/components/page-header'
import { Icon } from '@/components/icon-registry'
import { CtaBand } from '@/components/cta-band'
import { WikiHomeSearch } from '@/components/wiki/wiki-home-search'
import { wikiCategories } from '@/data/wiki-categories'
import { wikiDimensions } from '@/data/wiki'

export const metadata: Metadata = {
  title: 'Wiki de Minecraft',
  description:
    'Wiki de Minecraft en vivo desde minecraft.wiki: objetos, bloques, pociones, crafteos, encantamientos, mobs, biomas, redstone, comandos, tutoriales y más, con fotos e información completa.',
}

export default function WikiPage() {
  return (
    <main className="relative z-10">
      <PageHeader
        icon="BookOpen"
        eyebrow="{ wiki }"
        title="Wiki de Minecraft"
        description="Todo el contenido de Minecraft, en vivo desde minecraft.wiki: objetos, bloques, pociones, crafteos, encantamientos, mobs, biomas, estructuras, redstone, comandos, historia y tutoriales — con texto y fotos reales."
        meta={[
          { label: 'Fuente', value: 'minecraft.wiki' },
          { label: 'Secciones', value: '16' },
          { label: 'Actualización', value: 'En vivo' },
        ]}
      />

      {/* Barra de búsqueda sobre minecraft.wiki */}
      <section className="relative py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 text-center sm:px-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Encuentra de todo, al instante</h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
              Busca cualquier objeto, mob, bioma, mecánica o comando y lee el artículo completo, con fotos, sin
              salir del sitio.
            </p>
          </div>
          <WikiHomeSearch />
        </div>
      </section>

      {/* Las 16 secciones principales */}
      <section className="relative py-6">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-4">
            {wikiCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/wiki/categoria/${cat.slug}`}
                className="glass-card border-gradient hover-lift group flex flex-col items-center gap-3 rounded-xl p-5 text-center"
              >
                <span className="glass-soft glow-primary flex size-14 items-center justify-center rounded-xl text-2xl text-primary">
                  <Icon name={cat.icon} className="size-6" />
                </span>
                <span className="text-sm font-bold text-foreground">{cat.name}</span>
                <span className="flex items-center gap-1 text-[11px] font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Ver
                  <ArrowRight className="size-3" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Guías por dimensión (contenido curado propio) */}
      <section className="relative py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Guías rápidas por dimensión</h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground">
              Referencia curada del Overworld, el Nether y el End: biomas, mobs y estructuras destacadas.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {wikiDimensions.map((dim) => (
              <Link
                key={dim.slug}
                href={`/wiki/${dim.slug}`}
                className="glass-card border-gradient hover-lift group flex flex-col gap-4 rounded-xl p-7"
              >
                <span className="glass-soft glow-primary flex size-12 items-center justify-center rounded-xl text-primary">
                  <Icon name={dim.icon} className="size-6" />
                </span>
                <div>
                  <h3 className="mb-1.5 text-xl font-bold text-foreground">{dim.name}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{dim.tagline}</p>
                </div>
                <span className="mt-auto flex items-center gap-1.5 text-sm font-medium text-primary">
                  Explorar
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <p className="mx-auto mb-4 max-w-6xl px-4 text-center text-[11px] text-muted-foreground/60 sm:px-6">
        El catálogo de esta wiki muestra contenido en vivo de{' '}
        <a href="https://minecraft.wiki" target="_blank" rel="noopener noreferrer" className="text-primary underline">
          minecraft.wiki
        </a>
        , bajo licencia CC BY-NC-SA 3.0.
      </p>

      <CtaBand
        title="¿Configurando un servidor con mods de estas dimensiones?"
        description="Preparo generación de mundo, datapacks y configuraciones de bioma a medida para tu tipo de servidor."
      />
    </main>
  )
}
