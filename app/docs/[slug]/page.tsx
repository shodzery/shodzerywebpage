import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Pencil } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { MarkdownContent } from '@/components/docs/markdown-content'
import { DocsSidebar } from '@/components/docs/docs-sidebar'
import { OnThisPage } from '@/components/docs/on-this-page'
import { isAdmin } from '@/lib/docs-auth'
import { getDoc, getAllDocs } from '@/lib/docs'

export async function generateStaticParams() {
  const docs = await getAllDocs()
  return docs.map((doc) => ({ slug: doc.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const doc = await getDoc(slug)

  if (!doc) return { title: 'Documento no encontrado' }

  return {
    title: doc.title,
    description: doc.description || undefined,
  }
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const doc = await getDoc(slug)
  if (!doc) notFound()

  const [admin, allDocs] = await Promise.all([isAdmin(), getAllDocs()])

  return (
    <main>
      <PageHeader
        eyebrow={doc.category}
        title={doc.title}
        description={doc.description || ' '}
        icon="FileText"
        meta={doc.updated ? [{ label: 'Actualizado', value: doc.updated }] : undefined}
      />

      <section className="relative py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <Link
              href="/docs"
              className="flex w-fit items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="size-3.5" aria-hidden="true" />
              Volver a la documentación
            </Link>

            {admin && (
              <Link
                href={`/docs/admin/${doc.slug}`}
                className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                <Pencil className="size-3.5" aria-hidden="true" />
                Editar
              </Link>
            )}
          </div>

          <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
            <aside className="hidden lg:sticky lg:top-24 lg:block lg:h-fit lg:w-64 lg:shrink-0">
              <DocsSidebar docs={allDocs} />
            </aside>

            <article className="glass-card min-w-0 flex-1 rounded-xl p-6 sm:p-8">
              <MarkdownContent content={doc.content} />
            </article>

            <aside className="hidden lg:sticky lg:top-24 lg:block lg:h-fit lg:w-52 lg:shrink-0">
              <OnThisPage content={doc.content} />
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}
