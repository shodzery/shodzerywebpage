'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { Eye, Pencil, Trash2 } from 'lucide-react'
import { deleteDocAction, type ActionState } from '@/app/docs/admin/actions'
import type { DocMeta } from '@/lib/docs-shared'

const initialState: ActionState = { ok: false, message: '' }

/** Fila de la tabla de administración: un documento con acciones de editar/borrar. */
export function AdminDocRow({ doc }: { doc: DocMeta }) {
  const [state, formAction, pending] = useActionState(deleteDocAction, initialState)

  return (
    <div className="glass-card flex flex-col gap-3 rounded-xl p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="truncate font-semibold text-foreground">{doc.title}</p>
        <p className="truncate text-xs text-muted-foreground">
          /docs/{doc.slug} · {doc.category}
        </p>
        {state.message && (
          <p className={`mt-1 text-xs ${state.ok ? 'text-success' : 'text-destructive'}`}>
            {state.message}
          </p>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-1.5">
        <Link
          href={`/docs/${doc.slug}`}
          title="Ver"
          className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <Eye className="size-4" aria-hidden="true" />
        </Link>
        <Link
          href={`/docs/admin/${doc.slug}`}
          title="Editar"
          className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
        >
          <Pencil className="size-4" aria-hidden="true" />
        </Link>
        <form
          action={formAction}
          onSubmit={(event) => {
            if (!confirm(`¿Borrar "${doc.title}"? Esta acción no se puede deshacer.`)) {
              event.preventDefault()
            }
          }}
        >
          <input type="hidden" name="slug" value={doc.slug} />
          <button
            type="submit"
            disabled={pending}
            title="Borrar"
            className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/15 hover:text-destructive disabled:opacity-60"
          >
            <Trash2 className="size-4" aria-hidden="true" />
          </button>
        </form>
      </div>
    </div>
  )
}
