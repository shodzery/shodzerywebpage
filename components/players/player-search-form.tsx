'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Loader2, Search, User } from 'lucide-react'

interface SearchResult {
  name: string
  uuid: string
  avatar: string
}

export function PlayerSearchForm({ autoFocus = false }: { autoFocus?: boolean }) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([])
      setLoading(false)
      return
    }

    setLoading(true)
    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(`/api/jugadores/buscar?q=${encodeURIComponent(query.trim())}`)
        const data = await res.json()
        setResults(data.results || [])
        setOpen(true)
      } catch {
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 300)

    return () => clearTimeout(timeout)
  }, [query])

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  function goToPlayer(name: string) {
    if (!name.trim()) return
    setOpen(false)
    router.push(`/jugadores/${encodeURIComponent(name.trim())}`)
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-xl">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          goToPlayer(query)
        }}
        className="glass-card flex items-center gap-3 rounded-xl px-4 py-3"
      >
        <Search className="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
        <input
          autoFocus={autoFocus}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setOpen(true)}
          type="text"
          inputMode="text"
          maxLength={16}
          placeholder="Busca un nombre de Minecraft… ej. Shodzery"
          className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none sm:text-base"
        />
        {loading && <Loader2 className="size-4 shrink-0 animate-spin text-primary" aria-hidden="true" />}
        <button
          type="submit"
          className="btn-pop shrink-0 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground sm:text-sm"
        >
          Buscar
        </button>
      </form>

      {open && query.trim().length >= 2 && (
        <div className="glass-card border-gradient absolute inset-x-0 top-full z-30 mt-2 max-h-80 overflow-y-auto rounded-xl p-1.5 shadow-2xl shadow-primary/10">
          {results.length === 0 && !loading && (
            <p className="px-3 py-4 text-center text-sm text-muted-foreground">
              Sin coincidencias. Prueba a buscar el nombre exacto.
            </p>
          )}
          {results.map((r) => (
            <button
              key={r.uuid}
              onClick={() => goToPlayer(r.name)}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-secondary/60"
            >
              <span className="relative size-9 shrink-0 overflow-hidden rounded-md border border-border/60 bg-secondary">
                <Image
                  src={r.avatar}
                  alt={r.name}
                  fill
                  sizes="36px"
                  className="object-cover"
                  unoptimized
                />
              </span>
              <span className="flex flex-col">
                <span className="text-sm font-medium text-foreground">{r.name}</span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <User className="size-3" aria-hidden="true" />
                  {r.uuid.slice(0, 8)}…
                </span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
