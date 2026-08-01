import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { DocEditor } from '@/components/docs/doc-editor'
import { isAdmin } from '@/lib/docs-auth'
import { getDoc } from '@/lib/docs'

export const metadata: Metadata = {
  title: 'Editar documento',
  robots: { index: false, follow: false },
}

export default async function EditDocPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const admin = await isAdmin()

  if (!admin) {
    return (
      <main>
        <PageHeader
          eyebrow="{ docs / admin }"
          title="Editar documento"
          description="Necesitas iniciar sesión para editar este documento."
          icon="Lock"
        />
        <section className="relative py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <p className="text-sm text-muted-foreground">
              No tienes permiso para ver esta página.{' '}
              <Link href="/docs/admin" className="text-primary hover:underline">
                Inicia sesión aquí.
              </Link>
            </p>
          </div>
        </section>
      </main>
    )
  }

  const doc = await getDoc(slug)
  if (!doc) notFound()

  return (
    <main>
      <PageHeader
        eyebrow="{ docs / admin }"
        title={`Editar: ${doc.title}`}
        description={`/docs/${doc.slug}`}
        icon="FileText"
      />

      <section className="relative py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Link
            href="/docs/admin"
            className="mb-6 flex w-fit items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            Volver
          </Link>

          <DocEditor doc={doc} />
        </div>
      </section>
    </main>
  )
}
