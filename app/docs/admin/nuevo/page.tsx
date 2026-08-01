import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { DocEditor } from '@/components/docs/doc-editor'
import { isAdmin } from '@/lib/docs-auth'

export const metadata: Metadata = {
  title: 'Nuevo documento',
  robots: { index: false, follow: false },
}

export default async function NewDocPage() {
  const admin = await isAdmin()

  return (
    <main>
      <PageHeader
        eyebrow="{ docs / admin }"
        title="Nuevo documento"
        description="Se guardará en content/docs y aparecerá automáticamente en /docs."
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

          {admin ? (
            <DocEditor />
          ) : (
            <p className="text-sm text-muted-foreground">
              No tienes permiso para ver esta página.{' '}
              <Link href="/docs/admin" className="text-primary hover:underline">
                Inicia sesión aquí.
              </Link>
            </p>
          )}
        </div>
      </section>
    </main>
  )
}
