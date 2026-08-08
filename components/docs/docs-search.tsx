'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FileText, Search, CornerDownLeft } from 'lucide-react'
import type { DocMeta } from '@/lib/docs-shared'

/**
 * Buscador de documentación tipo "Ctrl K": un input que abre un
 * modal con resultados filtrados en cliente (título, descripción y
 * categoría). Todo el índice ya está en memoria (viene del server
 * component padre), así que no hace ninguna petición de red.
 */
export function DocsSearch({ docs }: { docs: DocMeta[] }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return docs.slice(0, 8)

    return docs
      .map((doc) => {
        const haystack = `${doc.title} ${doc.description} ${doc.category}`.toLowerCase()
        const score = haystack.includes(q)
          ? doc.title.toLowerCase().includes(q)
            ? 2
            : 1
          : 0
        return { doc, score }
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map((r) => r.doc)
  }, [docs, query])

  useEffect(() => setActiveIndex(0), [query, open])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const isShortcut = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k'
      if (isShortcut) {
        event.preventDefault()
        setOpen((prev) => !prev)
      }
      if (event.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus())
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      setQuery('')
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  function go(slug: string) {
    setOpen(false)
    router.push(`/docs/${slug}`)
  }

  function onInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, results.length - 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (event.key === 'Enter' && results[activeIndex]) {
      go(results[activeIndex].slug)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="glass-soft flex w-full items-center gap-2.5 rounded-lg px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:border-primary/40 sm:w-80"
      >
        <Search className="size-4 shrink-0" aria-hidden="true" />
        <span className="flex-1 text-left">Buscar en la documentación</span>
        <kbd className="hidden items-center gap-0.5 rounded border border-border/70 bg-secondary/60 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:flex">
          Ctrl K
        </kbd>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-background/80 px-4 pt-24 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Buscar en la documentación"
            onClick={(e) => e.stopPropagation()}
            className="glass-card flex w-full max-w-xl flex-col overflow-hidden rounded-xl"
          >
            <div className="flex items-center gap-3 border-b border-border/60 px-4 py-3.5">
              <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKeyDown}
                placeholder="Busca por título, descripción o categoría…"
                className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
              <kbd className="rounded border border-border/70 bg-secondary/60 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                Esc
              </kbd>
            </div>

            <ul className="max-h-80 overflow-y-auto p-2">
              {results.length === 0 ? (
                <li className="px-3 py-8 text-center text-sm text-muted-foreground">
                  Sin resultados para &ldquo;{query}&rdquo;.
                </li>
              ) : (
                results.map((doc, i) => (
                  <li key={doc.slug}>
                    <button
                      type="button"
                      onMouseEnter={() => setActiveIndex(i)}
                      onClick={() => go(doc.slug)}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                        i === activeIndex
                          ? 'bg-primary/12 text-primary'
                          : 'text-foreground hover:bg-secondary/60'
                      }`}
                    >
                      <FileText className="size-4 shrink-0" aria-hidden="true" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium">{doc.title}</span>
                        <span className="block truncate text-xs text-muted-foreground">
                          {doc.category}
                          {doc.description ? ` · ${doc.description}` : ''}
                        </span>
                      </span>
                      {i === activeIndex && (
                        <CornerDownLeft className="size-3.5 shrink-0 text-primary" aria-hidden="true" />
                      )}
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}
