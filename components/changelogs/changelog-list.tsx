'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ExternalLink, Loader2, ServerCrash } from 'lucide-react'
import { Modal } from '@/components/ui/modal'

interface PatchEntry {
  id: string
  title: string
  version?: string
  type?: string
  image?: { url: string; title?: string } | null
  contentPath?: string
  date?: string
}

interface PatchDetail {
  title?: string
  body?: string
  text?: string
  image?: { url: string; title?: string } | null
}

export function ChangelogList() {
  const [type, setType] = useState<'java' | 'bedrock'>('java')
  const [entries, setEntries] = useState<PatchEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const [openEntry, setOpenEntry] = useState<PatchEntry | null>(null)
  const [detail, setDetail] = useState<PatchDetail | null>(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [detailError, setDetailError] = useState(false)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(false)

    fetch(`/api/changelogs?type=${type}`)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return
        if (data.error) {
          setError(true)
          setEntries([])
        } else {
          setEntries(data.entries || [])
        }
      })
      .catch(() => {
        if (!cancelled) setError(true)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [type])

  function openArticle(entry: PatchEntry) {
    if (!entry.contentPath) {
      window.open(`https://www.minecraft.net/en-us/article/${entry.id}`, '_blank', 'noopener,noreferrer')
      return
    }

    setOpenEntry(entry)
    setDetail(null)
    setDetailError(false)
    setDetailLoading(true)

    fetch(`/api/changelogs?id=${encodeURIComponent(entry.contentPath)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw new Error(data.error)
        setDetail(data)
      })
      .catch(() => setDetailError(true))
      .finally(() => setDetailLoading(false))
  }

  const articleHtml = detail?.body || detail?.text || ''

  return (
    <div className="flex flex-col gap-8">
      <div className="glass-soft inline-flex w-fit gap-1 self-center rounded-full p-1">
        {(['java', 'bedrock'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
              type === t
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t === 'java' ? 'Java Edition' : 'Bedrock Edition'}
          </button>
        ))}
      </div>

      {loading && (
        <div className="glass-card flex flex-col items-center gap-3 rounded-xl p-16 text-center">
          <Loader2 className="size-8 animate-spin text-primary" aria-hidden="true" />
          <p className="font-pixel text-sm text-muted-foreground">Cargando notas de parche…</p>
        </div>
      )}

      {!loading && error && (
        <div className="glass-card flex flex-col items-center gap-3 rounded-xl p-16 text-center">
          <ServerCrash className="size-8 text-destructive" aria-hidden="true" />
          <p className="text-sm text-muted-foreground">
            No se pudieron cargar las notas de parche de Mojang. Inténtalo de nuevo en unos minutos.
          </p>
        </div>
      )}

      {!loading && !error && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {entries.map((entry) => (
            <button
              key={entry.id}
              type="button"
              onClick={() => openArticle(entry)}
              className="glass-card hover-lift flex flex-col overflow-hidden rounded-xl text-left"
            >
              {entry.image?.url && (
                <div className="relative h-36 w-full">
                  <Image
                    src={entry.image.url}
                    alt={entry.image.title || entry.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                    unoptimized
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col gap-2 p-5">
                {entry.type && (
                  <span className="glass-soft w-fit rounded-full px-2.5 py-0.5 text-[10px] uppercase tracking-wide text-primary">
                    {entry.type}
                  </span>
                )}
                <h3 className="line-clamp-2 font-semibold text-foreground">{entry.title}</h3>
                {entry.version && (
                  <span className="font-mono text-xs text-muted-foreground">{entry.version}</span>
                )}
                <span className="mt-auto text-xs font-medium text-primary">Leer aquí →</span>
              </div>
            </button>
          ))}
        </div>
      )}

      <Modal
        open={!!openEntry}
        onClose={() => {
          setOpenEntry(null)
          setDetail(null)
        }}
        eyebrow={openEntry?.version}
        title={openEntry?.title}
      >
        {detailLoading && (
          <div className="flex flex-col items-center gap-3 py-10 text-center">
            <Loader2 className="size-7 animate-spin text-primary" aria-hidden="true" />
            <p className="text-sm text-muted-foreground">Cargando artículo…</p>
          </div>
        )}

        {!detailLoading && detailError && (
          <div className="flex flex-col items-center gap-3 py-10 text-center">
            <ServerCrash className="size-7 text-destructive" aria-hidden="true" />
            <p className="text-sm text-muted-foreground">No se pudo cargar el artículo completo.</p>
            {openEntry && (
              <a
                href={`https://www.minecraft.net/en-us/article/${openEntry.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                Verlo en minecraft.net
                <ExternalLink className="size-3.5" aria-hidden="true" />
              </a>
            )}
          </div>
        )}

        {!detailLoading && !detailError && detail && (
          <div className="flex flex-col gap-4">
            {(detail.image?.url || openEntry?.image?.url) && (
              <div className="relative h-48 w-full overflow-hidden rounded-xl sm:h-64">
                <Image
                  src={detail.image?.url || openEntry?.image?.url || ''}
                  alt={openEntry?.title || ''}
                  fill
                  sizes="700px"
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}

            {articleHtml ? (
              <div
                className="prose-content text-sm leading-relaxed text-muted-foreground [&_a]:text-primary [&_a]:underline [&_h2]:mb-2 [&_h2]:mt-6 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-foreground [&_h3]:mb-2 [&_h3]:mt-4 [&_h3]:font-bold [&_h3]:text-foreground [&_img]:my-4 [&_img]:rounded-lg [&_li]:mb-1 [&_p]:mb-3 [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:pl-5"
                // Contenido HTML confiable: proviene directamente de la API oficial de Mojang.
                dangerouslySetInnerHTML={{ __html: articleHtml }}
              />
            ) : (
              <p className="text-sm text-muted-foreground">Este artículo no tiene contenido de texto disponible.</p>
            )}

            {openEntry && (
              <a
                href={`https://www.minecraft.net/en-us/article/${openEntry.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-fit items-center gap-1.5 text-xs font-medium text-primary hover:underline"
              >
                Ver original en minecraft.net
                <ExternalLink className="size-3.5" aria-hidden="true" />
              </a>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}
