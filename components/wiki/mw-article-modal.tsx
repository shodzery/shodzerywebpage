'use client'

import { useEffect, useState } from 'react'
import { Loader2, ServerCrash } from 'lucide-react'
import { Modal } from '@/components/ui/modal'
import { MwArticleContent, type MwPageData } from '@/components/wiki/mw-article-content'

export function MwArticleModal({ title, onClose }: { title: string | null; onClose: () => void }) {
  const [page, setPage] = useState<MwPageData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!title) {
      setPage(null)
      return
    }

    let cancelled = false
    setLoading(true)
    setError(false)
    setPage(null)

    fetch(`/api/wiki/mw/page?title=${encodeURIComponent(title)}`)
      .then(async (res) => {
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Error')
        if (!cancelled) setPage(data)
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
  }, [title])

  return (
    <Modal open={!!title} onClose={onClose} eyebrow="{ minecraft.wiki }" title={page?.title || title || undefined}>
      {loading && (
        <div className="flex flex-col items-center gap-3 py-10 text-center">
          <Loader2 className="size-7 animate-spin text-primary" aria-hidden="true" />
          <p className="text-sm text-muted-foreground">Cargando artículo…</p>
        </div>
      )}

      {!loading && error && (
        <div className="flex flex-col items-center gap-3 py-10 text-center">
          <ServerCrash className="size-7 text-destructive" aria-hidden="true" />
          <p className="text-sm text-muted-foreground">No se pudo cargar este artículo. Inténtalo de nuevo.</p>
        </div>
      )}

      {!loading && !error && page && <MwArticleContent page={page} />}
    </Modal>
  )
}
