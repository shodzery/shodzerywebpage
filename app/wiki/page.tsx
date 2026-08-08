import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { PageHeader } from '@/components/page-header'
import { Icon } from '@/components/icon-registry'
import { CtaBand } from '@/components/cta-band'
import { WikiHomeSearch } from '@/components/wiki/wiki-home-search'
import { wikiDimensions } from '@/data/wiki'

export const metadata: Metadata = {
  title: 'Wiki de Minecraft',
  description:
    'Wiki en vivo de Minecraft: objetos, bloques, pociones, crafteos, mobs, biomas y encantamientos, además de guías del Overworld, el Nether y el End.',
}

const CATALOG_CATEGORIES = [
  {
    key: 'objetos',
    icon: 'Package',
    name: 'Objetos y bloques',
    tagline: 'Todos los objetos y bloques del juego, con su receta de crafteo cuando existe.',
  },
  {
    key: 'mobs',
    icon: 'Skull',
    name: 'Mobs',
    tagline: 'Criaturas hostiles, pasivas y neutrales, con sus datos base.',
  },
  {
    key: 'biomas',
    icon: 'Mountain',
    name: 'Biomas',
    tagline: 'Todos los biomas de las tres dimensiones, con temperatura, lluvia y más.',
  },
  {
    key: 'efectos',
    icon: 'FlaskConical',
    name: 'Pociones y efectos',
    tagline: 'Efectos de poción, positivos y negativos, listos para consultar.',
  },
  {
    key: 'encantamientos',
    icon: 'Wand2',
    name: 'Encantamientos',
    tagline: 'Nivel máximo, categoría y costos de cada encantamiento.',
  },
] as const

export default function WikiPage() {
  return (
    <main className="relative z-10">
      <PageHeader
        icon="BookOpen"
        eyebrow="{ wiki }"
        title="Wiki de Minecraft"
        description="Busca lo que necesites de Minecraft: objetos, bloques, pociones, crafteos, mobs, biomas y encantamientos, con datos en vivo. Además, guías rápidas de las tres dimensiones."
        meta={[
          { label: 'Catálogo', value: 'En vivo' },
          { label: 'Categorías', value: '5 + 3 dimensiones' },
          { label: 'Idioma', value: 'Español' },
        ]}
      />

      {/* Barra de búsqueda del catálogo en vivo */}
      <section className="relative py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 text-center sm:px-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Encuentra de todo, al instante</h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
              Escribe el nombre de cualquier objeto, poción, mob, bioma o encantamiento y aparece al momento.
            </p>
          </div>
          <WikiHomeSearch />
        </div>
      </section>

      {/* Categorías del catálogo en vivo */}
      <section className="relative py-6">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CATALOG_CATEGORIES.map((cat) => (
              <Link
                key={cat.key}
                href={`/wiki/catalogo?categoria=${cat.key}`}
                className="glass-card border-gradient hover-lift group flex flex-col gap-4 rounded-xl p-7"
              >
                <span className="glass-soft glow-primary flex size-12 items-center justify-center rounded-xl text-primary">
                  <Icon name={cat.icon} className="size-6" />
                </span>
                <div>
                  <h3 className="mb-1.5 text-lg font-bold text-foreground">{cat.name}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{cat.tagline}</p>
                </div>
                <span className="mt-auto flex items-center gap-1.5 text-sm font-medium text-primary">
                  Ver catálogo
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            ))}

            <Link
              href="/wiki/catalogo"
              className="glass-card border-gradient-animated hover-lift group flex flex-col justify-center gap-3 rounded-xl p-7 text-center"
            >
              <span className="glass-soft glow-primary mx-auto flex size-12 items-center justify-center rounded-xl text-primary">
                <Icon name="Search" className="size-6" />
              </span>
              <h3 className="text-lg font-bold text-foreground">Ver todo el catálogo</h3>
              <span className="flex items-center justify-center gap-1.5 text-sm font-medium text-primary">
                Explorar
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Guías por dimensión (contenido curado) */}
      <section className="relative py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Guías por dimensión</h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground">
              Referencia rápida del Overworld, el Nether y el End: biomas, mobs y estructuras destacadas.
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

      <CtaBand
        title="¿Configurando un servidor con mods de estas dimensiones?"
        description="Preparo generación de mundo, datapacks y configuraciones de bioma a medida para tu tipo de servidor."
      />
    </main>
  )
}
