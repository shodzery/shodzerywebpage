'use client'

import { LogOut } from 'lucide-react'
import { logoutAction } from '@/app/docs/admin/actions'

/** Cierra la sesión de administrador. */
export function AdminLogoutButton() {
  return (
    <form action={logoutAction}>
      <button
        type="submit"
        className="flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:border-destructive/40 hover:text-destructive"
      >
        <LogOut className="size-3.5" aria-hidden="true" />
        Cerrar sesión
      </button>
    </form>
  )
}
