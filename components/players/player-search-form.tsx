'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Crown, Loader2, Search, User } from 'lucide-react'

interface SearchResult {
  name: string
  uuid: string
  avatar: string
  role?: string | null
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
        <div className="glass-card border-gradient absolute inset-x-0 top-full z-30 mt-2 max-h-96 overflow-y-auto rounded-xl p-2 shadow-2xl shadow-primary/10">
          {results.length === 0 && !loading && (
            <div className="flex flex-col items-center gap-2 px-3 py-8 text-center">
              <span className="glass-soft flex size-10 items-center justify-center rounded-full text-muted-foreground">
                <User className="size-4" aria-hidden="true" />
              </span>
              <p className="text-sm text-muted-foreground">Sin coincidencias todavía.</p>
              <p className="text-xs text-muted-foreground/70">
                Prueba con el nombre exacto y pulsa <span className="text-primary">Buscar</span>.
              </p>
            </div>
          )}
          {results.map((r) => (
            <button
              key={r.uuid}
              onClick={() => goToPlayer(r.name)}
              className="group flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-secondary/60"
            >
              <span className="glass-soft glow-primary relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-xl transition-transform group-hover:scale-105">
                <Image
                  src={r.avatar}
                  alt={r.name}
                  fill
                  sizes="56px"
                  className="object-contain p-1 [image-rendering:pixelated]"
                  unoptimized
                />
              </span>
              <span className="flex flex-col gap-0.5">
                <span className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                  {r.name}
                  {r.role && (
                    <span className="glass-soft flex items-center gap-1 rounded-full border border-primary/30 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
                      <Crown className="size-2.5" aria-hidden="true" />
                      {r.role}
                    </span>
                  )}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <span className="font-mono">{r.uuid.slice(0, 8)}…</span>
                </span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
