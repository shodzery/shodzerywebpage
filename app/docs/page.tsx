import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen, FileText, Lock, PenLine, Settings } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { DocsSidebar } from '@/components/docs/docs-sidebar'
import { DocsSearch } from '@/components/docs/docs-search'
import { Icon } from '@/components/icon-registry'
import { categoryIcon } from '@/lib/docs-category-icon'
import { getAllDocs, groupByCategory } from '@/lib/docs'
import { isAdmin } from '@/lib/docs-auth'

export const metadata: Metadata = {
  title: 'Documentación',
  description:
    'Guías, apuntes técnicos y referencia de la API sobre desarrollo y configuración de servidores de Minecraft.',
}

/** Tarjetas de acceso rápido en la parte superior, estilo Clerk Docs. */
const QUICK_LINKS = [
  {
    icon: 'Rocket',
    title: 'Empezar',
    description: 'Qué es este sitio, cómo está construido y por dónde arrancar si es tu primera visita.',
    href: '/docs/introduccion',
  },
  {
    icon: 'Code2',
    title: 'Referencia de la API',
    description: 'Todos los endpoints públicos de Shodzery: jugadores, servidores, wiki, changelogs y novedades.',
    href: '/docs/api-resumen',
  },
  {
    icon: 'ShieldCheck',
    title: 'Crea tu propia API',
    description: 'Guía paso a paso para diseñar, autenticar y versionar una API propia sobre Next.js.',
    href: '/docs/crea-tu-propia-api',
  },
  {
    icon: 'Layers',
    title: 'Arquitectura del sitio',
    description: 'Cómo encajan el front-end, el sistema de documentación y las integraciones externas.',
    href: '/docs/arquitectura-del-sitio',
  },
] as const

export default async function DocsPage() {
  const docs = await getAllDocs()
  const groups = groupByCategory(docs)
  const admin = await isAdmin()

  return (
    <main>
      <PageHeader
        eyebrow="{ docs }"
        title="Documentación"
        description="Guías, apuntes técnicos y referencia de la API de Shodzery. Busca con Ctrl K o navega por categorías."
        icon="BookOpen"
        meta={[
          { label: 'Documentos', value: String(docs.length) },
          { label: 'Categorías', value: String(groups.length) },
        ]}
      />

      <section className="relative py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {docs.length > 0 && <DocsSearch docs={docs} />}

            <Link
              href="/docs/admin"
              className="glass-soft flex w-fit items-center gap-2 rounded-md px-3.5 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              {admin ? (
                <>
                  <Settings className="size-3.5" aria-hidden="true" />
                  Panel de administración
                </>
              ) : (
                <>
                  <Lock className="size-3.5" aria-hidden="true" />
                  Iniciar sesión
                </>
              )}
            </Link>
          </div>

          {docs.length === 0 ? (
            <div className="glass-card flex flex-col items-center gap-5 rounded-xl px-6 py-16 text-center">
              <span className="glass-soft flex size-16 items-center justify-center rounded-2xl text-primary">
                <BookOpen className="size-8" aria-hidden="true" />
              </span>
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-semibold text-foreground">
                  Todavía no hay documentos
                </h2>
                <p className="mx-auto max-w-md text-pretty leading-relaxed text-muted-foreground">
                  Entra al editor con tu contraseña de administrador para crear el
                  primero. Podrás usar negritas, títulos, listas, tablas, código e
                  imágenes.
                </p>
              </div>
              <Link
                href="/docs/admin"
                className="flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                <PenLine className="size-4" aria-hidden="true" />
                Abrir el editor
              </Link>
            </div>
          ) : (
            <>
              {/* Tarjetas de acceso rápido, solo si el doc de destino existe */}
              <div className="mb-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {QUICK_LINKS.filter((link) =>
                  docs.some((d) => `/docs/${d.slug}` === link.href),
                ).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="glass-card group flex flex-col gap-3 rounded-xl p-5 transition-colors hover:border-primary/40"
                  >
                    <span className="flex size-10 items-center justify-center rounded-xl bg-primary/12 text-primary">
                      <Icon name={link.icon} className="size-5" />
                    </span>
                    <h3 className="font-semibold text-foreground transition-colors group-hover:text-primary">
                      {link.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-pretty text-muted-foreground">
                      {link.description}
                    </p>
                  </Link>
                ))}
              </div>

              <div className="flex flex-col gap-10 lg:flex-row">
                <aside className="lg:sticky lg:top-24 lg:h-fit lg:w-64 lg:shrink-0">
                  <DocsSidebar docs={docs} />
                </aside>

                <div className="flex min-w-0 flex-1 flex-col gap-10">
                  <h2 className="font-mono text-lg font-bold text-foreground">
                    Explora por categoría
                  </h2>
                  {groups.map(([category, items]) => (
                    <div key={category} className="flex flex-col gap-4">
                      <h3 className="flex items-center gap-2 font-mono text-base font-bold text-foreground">
                        <Icon name={categoryIcon(category)} className="size-4 text-primary" />
                        {category}
                      </h3>
                      <div className="grid gap-4 sm:grid-cols-2">
                        {items.map((doc) => (
                          <Link
                            key={doc.slug}
                            href={`/docs/${doc.slug}`}
                            className="glass-card group flex flex-col gap-3 rounded-xl p-5 transition-colors hover:border-primary/40"
                          >
                            <span className="flex size-9 items-center justify-center rounded-lg bg-primary/12 text-primary">
                              <FileText className="size-4" aria-hidden="true" />
                            </span>
                            <h3 className="font-semibold text-foreground transition-colors group-hover:text-primary">
                              {doc.title}
                            </h3>
                            {doc.description && (
                              <p className="text-sm leading-relaxed text-pretty text-muted-foreground">
                                {doc.description}
                              </p>
                            )}
                            <span className="mt-auto flex items-center gap-1.5 pt-2 text-xs font-semibold text-primary">
                              Leer
                              <ArrowRight
                                className="size-3.5 transition-transform group-hover:translate-x-1"
                                aria-hidden="true"
                              />
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  )
}
