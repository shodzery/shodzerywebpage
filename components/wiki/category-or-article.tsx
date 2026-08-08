'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Loader2, ServerCrash } from 'lucide-react'
import { MwArticleContent, type MwPageData } from '@/components/wiki/mw-article-content'
import { MwArticleModal } from '@/components/wiki/mw-article-modal'

interface MwCategoryMember {
  title: string
  thumbnail: string | null
  snippet: string
}

type Mode = 'loading' | 'category' | 'article' | 'empty' | 'error'

export function CategoryOrArticle({ name }: { name: string }) {
  const [mode, setMode] = useState<Mode>('loading')
  const [members, setMembers] = useState<MwCategoryMember[]>([])
  const [cmcontinue, setCmcontinue] = useState<string | null>(null)
  const [loadingMore, setLoadingMore] = useState(false)
  const [article, setArticle] = useState<MwPageData | null>(null)
  const [openTitle, setOpenTitle] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setMode('loading')
    setMembers([])
    setArticle(null)

    async function load() {
      try {
        const res = await fetch(`/api/wiki/mw/category?name=${encodeURIComponent(name)}&limit=48`)
        const data = await res.json()
        if (cancelled) return

        if (data.items && data.items.length > 0) {
          setMembers(data.items)
          setCmcontinue(data.cmcontinue)
          setMode('category')
          return
        }

        // No es una categoría (o está vacía): se prueba como artículo directo.
        const pageRes = await fetch(`/api/wiki/mw/page?title=${encodeURIComponent(name)}`)
        const pageData = await pageRes.json()
        if (cancelled) return

        if (pageData.error) {
          setMode('empty')
        } else {
          setArticle(pageData)
          setMode('article')
        }
      } catch {
        if (!cancelled) setMode('error')
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [name])

  async function loadMore() {
    if (!cmcontinue) return
    setLoadingMore(true)
    try {
      const res = await fetch(
        `/api/wiki/mw/category?name=${encodeURIComponent(name)}&limit=48&cmcontinue=${encodeURIComponent(cmcontinue)}`,
      )
      const data = await res.json()
      setMembers((prev) => [...prev, ...(data.items || [])])
      setCmcontinue(data.cmcontinue)
    } finally {
      setLoadingMore(false)
    }
  }

  if (mode === 'loading') {
    return (
      <div className="glass-card flex flex-col items-center gap-3 rounded-xl p-16 text-center">
        <Loader2 className="size-8 animate-spin text-primary" aria-hidden="true" />
        <p className="font-pixel text-sm text-muted-foreground">Cargando desde minecraft.wiki…</p>
      </div>
    )
  }

  if (mode === 'error' || mode === 'empty') {
    return (
      <div className="glass-card flex flex-col items-center gap-3 rounded-xl p-16 text-center">
        <ServerCrash className="size-8 text-destructive" aria-hidden="true" />
        <p className="text-sm text-muted-foreground">
          {mode === 'empty'
            ? 'No se encontró esta sección en minecraft.wiki.'
            : 'No se pudo cargar el contenido en este momento. Inténtalo de nuevo.'}
        </p>
      </div>
    )
  }

  if (mode === 'article' && article) {
    return (
      <div className="glass-card rounded-2xl p-6 sm:p-8">
        <MwArticleContent page={article} />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {members.map((m) => (
          <button
            key={m.title}
            type="button"
            onClick={() => setOpenTitle(m.title)}
            className="glass-card hover-lift flex flex-col overflow-hidden rounded-xl text-left"
          >
            <span className="relative block h-28 w-full bg-secondary/30">
              {m.thumbnail ? (
                <Image
                  src={m.thumbnail}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover [image-rendering:pixelated]"
                  unoptimized
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center text-3xl">🟩</span>
              )}
            </span>
            <span className="flex flex-1 flex-col gap-1 p-3">
              <span className="line-clamp-1 text-sm font-semibold text-foreground">{m.title}</span>
              {m.snippet && <span className="line-clamp-2 text-xs text-muted-foreground">{m.snippet}</span>}
            </span>
          </button>
        ))}
      </div>

      {cmcontinue && (
        <button
          type="button"
          onClick={loadMore}
          disabled={loadingMore}
          className="btn-pop glass-soft mx-auto flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium disabled:opacity-60"
        >
          {loadingMore && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
          Cargar más
        </button>
      )}

      <MwArticleModal title={openTitle} onClose={() => setOpenTitle(null)} />
    </div>
  )
}
