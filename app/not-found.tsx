import type { Metadata } from 'next'
import Link from 'next/link'
import { Home } from 'lucide-react'
import { NotFoundSkinViewer } from '@/components/not-found-skin-viewer'

export const metadata: Metadata = {
  title: 'Página no encontrada',
}

/**
 * 404 global: se usa tanto para rutas inexistentes como para
 * cualquier notFound() llamado dentro de la app (ej. /docs/[slug]).
 */
export default function NotFound() {
  return (
    <main className="relative z-10 flex min-h-svh flex-col items-center justify-center overflow-hidden px-4 pb-24 pt-28 text-center sm:px-6">
      <div
        className="aurora-violet pointer-events-none absolute left-1/2 top-1/3 size-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <NotFoundSkinViewer />

      <p className="relative -mt-2 font-pixel text-7xl text-primary text-glow sm:text-8xl">
        404
      </p>

      <h1 className="relative mt-4 text-balance text-2xl font-bold text-foreground sm:text-3xl">
        Este chunk todavía no se generó
      </h1>

      <p className="relative mt-3 max-w-md text-pretty leading-relaxed text-muted-foreground">
        La página que buscás no existe, se movió, o la URL tiene un error.
        Revisá el enlace o volvé al inicio.
      </p>

      <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="shine glow-primary flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <Home className="size-4" aria-hidden="true" />
          Volver al inicio
        </Link>
        <Link
          href="/docs"
          className="glass-soft flex items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary"
        >
          Ver documentación
        </Link>
      </div>
    </main>
  )
}
