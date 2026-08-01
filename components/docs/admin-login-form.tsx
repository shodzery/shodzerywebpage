'use client'

import { useActionState } from 'react'
import { Lock } from 'lucide-react'
import { loginAction, type ActionState } from '@/app/docs/admin/actions'

const initialState: ActionState = { ok: false, message: '' }

/** Formulario de acceso al editor de documentación. */
export function AdminLoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialState)

  return (
    <form
      action={formAction}
      className="glass-card mx-auto flex w-full max-w-sm flex-col gap-4 rounded-xl p-6"
    >
      <div className="flex items-center gap-3">
        <span className="glass-soft flex size-10 shrink-0 items-center justify-center rounded-lg text-primary">
          <Lock className="size-4.5" aria-hidden="true" />
        </span>
        <div>
          <p className="text-sm font-semibold text-foreground">Acceso de administrador</p>
          <p className="text-xs text-muted-foreground">
            Introduce la contraseña para editar la documentación.
          </p>
        </div>
      </div>

      <label className="flex flex-col gap-2">
        <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          Contraseña
        </span>
        <input
          name="password"
          type="password"
          required
          autoFocus
          placeholder="••••••••"
          className="rounded-md border border-border bg-input px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary"
        />
      </label>

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {pending ? 'Comprobando…' : 'Entrar'}
      </button>

      {state.message && (
        <p role="status" className={`text-sm ${state.ok ? 'text-success' : 'text-destructive'}`}>
          {state.message}
        </p>
      )}
    </form>
  )
}
