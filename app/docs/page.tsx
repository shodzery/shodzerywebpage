import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen, FileText, PenLine } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { DocsSidebar } from '@/components/docs/docs-sidebar'
import { getAllDocs, groupByCategory } from '@/lib/docs'

export const metadata: Metadata = {
  title: 'Documentación',
  description:
    'Guías, apuntes técnicos y documentación sobre desarrollo y configuración de servidores de Minecraft.',
}

export default async function DocsPage() {
  const docs = await getAllDocs()
  const groups = groupByCategory(docs)

  return (
    <main>
      <PageHeader
        eyebrow="{ docs }"
        title="Documentación"
        description="Guías y apuntes técnicos. Este apartado empieza vacío: cada documento que crees aparecerá aquí automáticamente."
        icon="BookOpen"
        meta={[
          { label: 'Documentos', value: String(docs.length) },
          { label: 'Categorías', value: String(groups.length) },
        ]}
      />

      <section className="relative py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
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
            <div className="flex flex-col gap-10 lg:flex-row">
              <aside className="lg:sticky lg:top-24 lg:h-fit lg:w-64 lg:shrink-0">
                <DocsSidebar docs={docs} />
              </aside>

              <div className="flex min-w-0 flex-1 flex-col gap-10">
                {groups.map(([category, items]) => (
                  <div key={category} className="flex flex-col gap-4">
                    <h2 className="font-mono text-lg font-bold text-foreground">
                      {category}
                    </h2>
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
          )}
        </div>
      </section>
    </main>
  )
}
