'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ExternalLink, Loader2, Newspaper, ServerCrash } from 'lucide-react'
import { Modal } from '@/components/ui/modal'

interface Article {
  id: string
  title: string
  subHeader: string
  image: string
  category: string
  publishDate: string
  url: string
  hasBody?: boolean
  body?: string
}

export function NewsList() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const [openArticle, setOpenArticle] = useState<Article | null>(null)

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
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => {
          const canReadHere = Boolean(article.hasBody && article.body)

          const cardInner = (
            <>
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
                <div className="mt-auto flex items-center justify-between pt-2">
                  <span className="text-xs text-muted-foreground/70">
                    {new Date(article.publishDate).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-medium text-primary">
                    {canReadHere ? (
                      'Leer aquí'
                    ) : (
                      <>
                        minecraft.net
                        <ExternalLink className="size-3" aria-hidden="true" />
                      </>
                    )}
                  </span>
                </div>
              </div>
            </>
          )

          if (canReadHere) {
            return (
              <button
                key={article.id}
                type="button"
                onClick={() => setOpenArticle(article)}
                className="glass-card hover-lift flex flex-col overflow-hidden rounded-xl text-left"
              >
                {cardInner}
              </button>
            )
          }

          return (
            <a
              key={article.id}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card hover-lift flex flex-col overflow-hidden rounded-xl"
            >
              {cardInner}
            </a>
          )
        })}
      </div>

      <Modal
        open={!!openArticle}
        onClose={() => setOpenArticle(null)}
        eyebrow={openArticle?.category}
        title={openArticle?.title}
      >
        {openArticle && (
          <div className="flex flex-col gap-4">
            {openArticle.image && (
              <div className="relative h-48 w-full overflow-hidden rounded-xl sm:h-64">
                <Image
                  src={openArticle.image}
                  alt={openArticle.title}
                  fill
                  sizes="700px"
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}

            {openArticle.body ? (
              <div
                className="prose-content text-sm leading-relaxed text-muted-foreground [&_a]:text-primary [&_a]:underline [&_h2]:mb-2 [&_h2]:mt-6 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-foreground [&_h3]:mb-2 [&_h3]:mt-4 [&_h3]:font-bold [&_h3]:text-foreground [&_img]:my-4 [&_img]:rounded-lg [&_li]:mb-1 [&_p]:mb-3 [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:pl-5"
                // Contenido HTML confiable: proviene directamente de la API oficial de Mojang.
                dangerouslySetInnerHTML={{ __html: openArticle.body }}
              />
            ) : (
              <p className="text-sm text-muted-foreground">Este artículo no tiene contenido disponible aquí.</p>
            )}

            <a
              href={openArticle.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-fit items-center gap-1.5 text-xs font-medium text-primary hover:underline"
            >
              Ver original en minecraft.net
              <ExternalLink className="size-3.5" aria-hidden="true" />
            </a>
          </div>
        )}
      </Modal>
    </>
  )
}
