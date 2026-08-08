'use client'

import { useEffect, useRef, useState } from 'react'
import { Loader2, Search } from 'lucide-react'
import { Icon } from '@/components/icon-registry'
import { CatalogIcon } from '@/components/wiki/catalog-icon'

interface CatalogEntry {
  category: string
  name: string
  displayName: string
  icon: string | null
}

const CATEGORY_LABELS: Record<string, string> = {
  objetos: 'Objetos y bloques',
  mobs: 'Mobs',
  biomas: 'Biomas',
  efectos: 'Pociones y efectos',
  encantamientos: 'Encantamientos',
}

const CATEGORY_ICONS: Record<string, string> = {
  objetos: 'Package',
  mobs: 'Skull',
  biomas: 'Mountain',
  efectos: 'FlaskConical',
  encantamientos: 'Wand2',
}

export function CatalogSearchBar({
  autoFocus = false,
  onSelect,
}: {
  autoFocus?: boolean
  onSelect: (category: string, name: string) => void
}) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Record<string, CatalogEntry[]>>({})
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults({})
      setLoading(false)
      return
    }

    setLoading(true)
    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(`/api/wiki/buscar?q=${encodeURIComponent(query.trim())}`)
        const data = await res.json()
        setResults(data.results || {})
        setOpen(true)
      } catch {
        setResults({})
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

  const categories = Object.keys(results).filter((c) => results[c]?.length)

  function pick(category: string, name: string) {
    setOpen(false)
    onSelect(category, name)
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (categories.length > 0) {
            pick(categories[0], results[categories[0]][0].name)
          }
        }}
        className="glass-card border-gradient-animated flex items-center gap-3 rounded-xl px-4 py-3.5"
      >
        <Search className="size-5 shrink-0 text-primary" aria-hidden="true" />
        <input
          autoFocus={autoFocus}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => categories.length > 0 && setOpen(true)}
          type="text"
          placeholder="Busca cualquier cosa de Minecraft: pociones, mobs, bloques, encantamientos…"
          className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none sm:text-base"
        />
        {loading && <Loader2 className="size-4 shrink-0 animate-spin text-primary" aria-hidden="true" />}
      </form>

      {open && query.trim().length >= 2 && (
        <div className="glass-card border-gradient absolute inset-x-0 top-full z-30 mt-2 max-h-96 overflow-y-auto rounded-xl p-2 shadow-2xl shadow-primary/10">
          {categories.length === 0 && !loading && (
            <p className="px-3 py-4 text-center text-sm text-muted-foreground">
              Sin coincidencias todavía. Prueba con otro nombre.
            </p>
          )}

          {categories.map((category) => (
            <div key={category} className="mb-1 last:mb-0">
              <p className="flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-primary/80">
                <Icon name={CATEGORY_ICONS[category] || 'Blocks'} className="size-3.5" />
                {CATEGORY_LABELS[category] || category}
              </p>
              {results[category].map((entry) => (
                <button
                  key={`${category}-${entry.name}`}
                  type="button"
                  onClick={() => pick(category, entry.name)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors hover:bg-secondary/60"
                >
                  <CatalogIcon src={entry.icon} fallbackIcon={CATEGORY_ICONS[category] || 'Blocks'} size={24} />
                  <span className="text-sm text-foreground">{entry.displayName}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
