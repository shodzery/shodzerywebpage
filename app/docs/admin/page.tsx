import type { Metadata } from 'next'
import Link from 'next/link'
import { AlertTriangle, FilePlus2 } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { AdminLoginForm } from '@/components/docs/admin-login-form'
import { AdminDocRow } from '@/components/docs/admin-doc-row'
import { AdminLogoutButton } from '@/components/docs/admin-logout-button'
import { isAdmin, isAdminConfigured } from '@/lib/docs-auth'
import { getAllDocs } from '@/lib/docs'

export const metadata: Metadata = {
  title: 'Administrar documentación',
  robots: { index: false, follow: false },
}

export default async function DocsAdminPage() {
  const configured = isAdminConfigured()
  const admin = configured && (await isAdmin())
  const docs = admin ? await getAllDocs() : []

  return (
    <main>
      <PageHeader
        eyebrow="{ docs / admin }"
        title="Administrar documentación"
        description="Crea, edita y borra los documentos que aparecen en /docs."
        icon="Settings"
      />

      <section className="relative py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          {!configured ? (
            <div className="glass-card flex flex-col items-center gap-4 rounded-xl px-6 py-14 text-center">
              <span className="glass-soft flex size-14 items-center justify-center rounded-2xl text-destructive">
                <AlertTriangle className="size-7" aria-hidden="true" />
              </span>
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-semibold text-foreground">
                  Falta configurar la contraseña
                </h2>
                <p className="mx-auto max-w-md text-pretty leading-relaxed text-muted-foreground">
                  Define la variable de entorno{' '}
                  <code className="rounded bg-secondary/70 px-1.5 py-0.5 text-primary">
                    DOCS_ADMIN_PASSWORD
                  </code>{' '}
                  (en <code className="rounded bg-secondary/70 px-1.5 py-0.5">.env.local</code>{' '}
                  para desarrollo, o en Vercel → Settings → Environment Variables para
                  producción) y vuelve a cargar esta página.
                </p>
              </div>
            </div>
          ) : !admin ? (
            <AdminLoginForm />
          ) : (
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">
                  {docs.length === 0
                    ? 'Todavía no hay documentos.'
                    : `${docs.length} documento${docs.length === 1 ? '' : 's'}`}
                </p>
                <div className="flex items-center gap-2">
                  <Link
                    href="/docs/admin/nuevo"
                    className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    <FilePlus2 className="size-4" aria-hidden="true" />
                    Nuevo documento
                  </Link>
                  <AdminLogoutButton />
                </div>
              </div>

              {docs.length > 0 && (
                <div className="flex flex-col gap-3">
                  {docs.map((doc) => (
                    <AdminDocRow key={doc.slug} doc={doc} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
