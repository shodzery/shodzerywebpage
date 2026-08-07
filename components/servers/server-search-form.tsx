'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Server } from 'lucide-react'

export function ServerSearchForm({ autoFocus = false }: { autoFocus?: boolean }) {
  const router = useRouter()
  const [query, setQuery] = useState('')

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const value = query.trim()
        if (!value) return
        router.push(`/servidores/${encodeURIComponent(value)}`)
      }}
      className="glass-card flex w-full max-w-xl items-center gap-3 rounded-xl px-4 py-3"
    >
      <Server className="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
      <input
        autoFocus={autoFocus}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        placeholder="IP o dominio del servidor… ej. play.hypixel.net"
        className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none sm:text-base"
      />
      <button
        type="submit"
        className="btn-pop flex shrink-0 items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground sm:text-sm"
      >
        <Search className="size-4" aria-hidden="true" />
        Consultar
      </button>
    </form>
  )
}
