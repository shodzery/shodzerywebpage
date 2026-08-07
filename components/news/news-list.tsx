'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Loader2, Newspaper, ServerCrash } from 'lucide-react'

interface Article {
  id: string
  title: string
  subHeader: string
  image: string
  category: string
  publishDate: string
  url: string
}

export function NewsList() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch('/api/novedades')
      .then((res) => res.json())
      .then((data) => setArticles(data.articles || []))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="glass-card flex flex-col items-center gap-3 rounded-xl p-16 text-center">
        <Loader2 className="size-8 animate-spin text-primary" aria-hidden="true" />
        <p className="font-pixel text-sm text-muted-foreground">Cargando novedades…</p>
      </div>
    )
  }

  if (error || articles.length === 0) {
    return (
      <div className="glass-card flex flex-col items-center gap-3 rounded-xl p-16 text-center">
        <ServerCrash className="size-8 text-destructive" aria-hidden="true" />
        <p className="text-sm text-muted-foreground">
          No se pudieron cargar las novedades de Mojang en este momento.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <a
          key={article.id}
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-card hover-lift flex flex-col overflow-hidden rounded-xl"
        >
          <div className="relative h-36 w-full bg-secondary/40">
            {article.image ? (
              <Image
                src={article.image}
                alt={article.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <Newspaper className="size-8 text-muted-foreground" aria-hidden="true" />
              </div>
            )}
          </div>
          <div className="flex flex-1 flex-col gap-2 p-5">
            <span className="glass-soft w-fit rounded-full px-2.5 py-0.5 text-[10px] uppercase tracking-wide text-primary">
              {article.category}
            </span>
            <h3 className="line-clamp-2 font-semibold text-foreground">{article.title}</h3>
            {article.subHeader && (
              <p className="line-clamp-2 text-sm text-muted-foreground">{article.subHeader}</p>
            )}
            <span className="mt-auto pt-2 text-xs text-muted-foreground/70">
              {new Date(article.publishDate).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>
        </a>
      ))}
    </div>
  )
}
