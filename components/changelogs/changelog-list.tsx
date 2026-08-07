'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Loader2, ServerCrash } from 'lucide-react'

interface PatchEntry {
  id: string
  title: string
  version?: string
  type?: string
  image?: { url: string; title?: string } | null
  contentPath?: string
  date?: string
}

export function ChangelogList() {
  const [type, setType] = useState<'java' | 'bedrock'>('java')
  const [entries, setEntries] = useState<PatchEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

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
            <a
              key={entry.id}
              href={`https://www.minecraft.net/en-us/article/${entry.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card hover-lift flex flex-col overflow-hidden rounded-xl"
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
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
