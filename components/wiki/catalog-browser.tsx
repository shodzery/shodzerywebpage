'use client'

import { useCallback, useEffect, useState } from 'react'
import { Loader2, Search, ServerCrash } from 'lucide-react'
import { Icon } from '@/components/icon-registry'
import { CatalogSearchBar } from '@/components/wiki/catalog-search-bar'
import { CatalogIcon } from '@/components/wiki/catalog-icon'
import { EntryDetailModal } from '@/components/wiki/entry-detail-modal'

const CATEGORIES = [
  { key: 'objetos', label: 'Objetos y bloques', icon: 'Package' },
  { key: 'mobs', label: 'Mobs', icon: 'Skull' },
  { key: 'biomas', label: 'Biomas', icon: 'Mountain' },
  { key: 'efectos', label: 'Pociones y efectos', icon: 'FlaskConical' },
  { key: 'encantamientos', label: 'Encantamientos', icon: 'Wand2' },
] as const

type CategoryKey = (typeof CATEGORIES)[number]['key']

interface CatalogEntry {
  category: string
  name: string
  displayName: string
  icon: string | null
  meta: Record<string, string>
}

const LIMIT = 48

export function CatalogBrowser({
  initialCategory,
  initialItem,
}: {
  initialCategory?: string
  initialItem?: string
}) {
  const validInitialCategory =
    initialCategory && CATEGORIES.some((c) => c.key === initialCategory) ? (initialCategory as CategoryKey) : 'objetos'

  const [category, setCategory] = useState<CategoryKey>(validInitialCategory)
  const [query, setQuery] = useState('')
  const [items, setItems] = useState<CatalogEntry[]>([])
  const [total, setTotal] = useState(0)
  const [offset, setOffset] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const [selected, setSelected] = useState<{ category: string; name: string } | null>(
    initialCategory && initialItem ? { category: initialCategory, name: initialItem } : null,
  )

  const fetchList = useCallback(async (cat: string, q: string, off: number) => {
    setLoading(true)
    setError(false)
    try {
      const res = await fetch(`/api/wiki/${cat}?q=${encodeURIComponent(q)}&limit=${LIMIT}&offset=${off}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error')
      setItems(data.items || [])
      setTotal(data.total || 0)
    } catch {
      setError(true)
      setItems([])
      setTotal(0)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    setOffset(0)
    fetchList(category, query, 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, query])

  function changePage(newOffset: number) {
    setOffset(newOffset)
    fetchList(category, query, newOffset)
  }

  const activeCategory = CATEGORIES.find((c) => c.key === category)

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-center gap-5">
        <CatalogSearchBar
          onSelect={(cat, name) => {
            setCategory(cat as CategoryKey)
            setSelected({ category: cat, name })
          }}
        />

        <div className="glass-soft flex flex-wrap justify-center gap-1 rounded-full p-1">
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={() => {
                setCategory(c.key)
                setQuery('')
              }}
              className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors sm:text-sm ${
                category === c.key ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={c.icon} className="size-3.5" />
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto w-full max-w-xl">
        <div className="glass-soft flex items-center gap-2 rounded-lg px-3.5 py-2.5">
          <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Filtrar dentro de ${activeCategory?.label.toLowerCase()}…`}
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>
      </div>

      {loading && (
        <div className="glass-card flex flex-col items-center gap-3 rounded-xl p-16 text-center">
          <Loader2 className="size-8 animate-spin text-primary" aria-hidden="true" />
          <p className="font-pixel text-sm text-muted-foreground">Cargando catálogo…</p>
        </div>
      )}

      {!loading && error && (
        <div className="glass-card flex flex-col items-center gap-3 rounded-xl p-16 text-center">
          <ServerCrash className="size-8 text-destructive" aria-hidden="true" />
          <p className="text-sm text-muted-foreground">
            No se pudo cargar el catálogo en este momento. Inténtalo de nuevo en unos segundos.
          </p>
        </div>
      )}

      {!loading && !error && (
        <>
          <p className="text-center text-xs text-muted-foreground">
            {total} resultado{total === 1 ? '' : 's'}
          </p>

          {items.length === 0 && (
            <p className="text-center text-sm text-muted-foreground">No hay resultados para esta búsqueda.</p>
          )}

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {items.map((entry) => (
              <button
                key={`${entry.category}-${entry.name}`}
                type="button"
                onClick={() => setSelected({ category: entry.category, name: entry.name })}
                className="glass-card hover-lift flex flex-col items-center gap-2.5 rounded-xl p-4 text-center"
              >
                <CatalogIcon src={entry.icon} fallbackIcon={activeCategory?.icon || 'Blocks'} size={40} />
                <span className="line-clamp-2 text-xs font-medium text-foreground">{entry.displayName}</span>
              </button>
            ))}
          </div>

          {total > LIMIT && (
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                disabled={offset === 0}
                onClick={() => changePage(Math.max(0, offset - LIMIT))}
                className="btn-pop glass-soft rounded-lg px-4 py-2 text-xs font-medium disabled:cursor-not-allowed disabled:opacity-40"
              >
                Anterior
              </button>
              <span className="text-xs text-muted-foreground">
                {Math.floor(offset / LIMIT) + 1} / {Math.ceil(total / LIMIT)}
              </span>
              <button
                type="button"
                disabled={offset + LIMIT >= total}
                onClick={() => changePage(offset + LIMIT)}
                className="btn-pop glass-soft rounded-lg px-4 py-2 text-xs font-medium disabled:cursor-not-allowed disabled:opacity-40"
              >
                Siguiente
              </button>
            </div>
          )}
        </>
      )}

      <EntryDetailModal
        category={selected?.category ?? null}
        name={selected?.name ?? null}
        onClose={() => setSelected(null)}
      />
    </div>
  )
}
