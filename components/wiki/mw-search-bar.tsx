'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { BookOpen, Loader2, Search } from 'lucide-react'

interface MwSearchResult {
  title: string
  snippet: string
  thumbnail: string | null
}

export function MwSearchBar({
  autoFocus = false,
  onSelect,
}: {
  autoFocus?: boolean
  onSelect: (title: string) => void
}) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<MwSearchResult[]>([])
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
        const res = await fetch(`/api/wiki/mw/search?q=${encodeURIComponent(query.trim())}`)
        const data = await res.json()
        setResults(data.results || [])
        setOpen(true)
      } catch {
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 350)

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

  function pick(title: string) {
    setOpen(false)
    onSelect(title)
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (results.length > 0) pick(results[0].title)
        }}
        className="glass-card border-gradient-animated flex items-center gap-3 rounded-xl px-4 py-3.5"
      >
        <Search className="size-5 shrink-0 text-primary" aria-hidden="true" />
        <input
          autoFocus={autoFocus}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setOpen(true)}
          type="text"
          placeholder="Busca cualquier cosa de Minecraft en minecraft.wiki…"
          className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none sm:text-base"
        />
        {loading && <Loader2 className="size-4 shrink-0 animate-spin text-primary" aria-hidden="true" />}
      </form>

      {open && query.trim().length >= 2 && (
        <div className="glass-card border-gradient absolute inset-x-0 top-full z-30 mt-2 max-h-96 overflow-y-auto rounded-xl p-2 shadow-2xl shadow-primary/10">
          {results.length === 0 && !loading && (
            <p className="px-3 py-6 text-center text-sm text-muted-foreground">
              Sin coincidencias en minecraft.wiki. Prueba con otro término.
            </p>
          )}

          {results.map((r) => (
            <button
              key={r.title}
              type="button"
              onClick={() => pick(r.title)}
              className="flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-secondary/60"
            >
              <span className="glass-soft relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-lg">
                {r.thumbnail ? (
                  <Image
                    src={r.thumbnail}
                    alt=""
                    fill
                    sizes="48px"
                    className="object-cover [image-rendering:pixelated]"
                    unoptimized
                  />
                ) : (
                  <BookOpen className="size-5 text-primary" aria-hidden="true" />
                )}
              </span>
              <span className="flex min-w-0 flex-col gap-0.5">
                <span className="truncate text-sm font-semibold text-foreground">{r.title}</span>
                {r.snippet && (
                  <span className="line-clamp-1 text-xs text-muted-foreground">{r.snippet}</span>
                )}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
