'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Crown, Fingerprint, History, Loader2, ServerCrash, Shirt } from 'lucide-react'
import { CopyButton } from './copy-button'
import { SkinViewer3D } from '@/components/skin-viewer-3d'

interface PlayerData {
  uuid: string
  uuidRaw: string
  name: string
  role: { role: string; description: string } | null
  skin: { url: string; variant: 'classic' | 'slim' }
  cape: { url: string } | null
  nameHistory: { name: string; changedToAt?: number }[]
  renders: { avatar: string; head: string; body: string }
}

export function PlayerProfile({ username }: { username: string }) {
  const [data, setData] = useState<PlayerData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    fetch(`/api/jugadores/${encodeURIComponent(username)}`)
      .then(async (res) => {
        const json = await res.json()
        if (!res.ok) throw new Error(json.error || 'No se pudo obtener el jugador')
        if (!cancelled) setData(json)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || 'Jugador no encontrado')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [username])

  if (loading) {
    return (
      <div className="glass-card flex flex-col items-center gap-3 rounded-xl p-16 text-center">
        <Loader2 className="size-8 animate-spin text-primary" aria-hidden="true" />
        <p className="font-pixel text-sm text-muted-foreground">Buscando a {username}…</p>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="glass-card flex flex-col items-center gap-3 rounded-xl p-16 text-center">
        <ServerCrash className="size-8 text-destructive" aria-hidden="true" />
        <h2 className="text-lg font-semibold text-foreground">No encontramos a &quot;{username}&quot;</h2>
        <p className="max-w-md text-sm text-muted-foreground">
          Comprueba que el nombre esté bien escrito. Solo se pueden buscar cuentas de Minecraft que ya existan.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      {/* Visor 3D de skin + capa */}
      <div className="glass-card border-gradient-animated flex flex-col items-center gap-4 rounded-xl p-6">
        <span className="glass-soft rounded-full px-3 py-1 text-xs text-muted-foreground">
          {data.skin.variant === 'slim' ? 'Modelo Alex (slim)' : 'Modelo Steve (classic)'}
        </span>

        <SkinViewer3D
          skinUrl={data.skin.url}
          capeUrl={data.cape?.url}
          variant={data.skin.variant}
          name={data.name}
          className="relative h-80 w-40 sm:h-96 sm:w-48"
        />

        <h1 className="font-pixel text-xl text-primary text-glow">{data.name}</h1>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {data.role && (
            <span className="glass-soft glow-primary flex items-center gap-1.5 rounded-full border border-primary/30 px-3 py-1 text-xs font-semibold text-primary">
              <Crown className="size-3.5" aria-hidden="true" />
              {data.role.role}
            </span>
          )}
          {data.cape && (
            <span className="glass-soft flex items-center gap-1.5 rounded-full px-3 py-1 text-xs text-foreground">
              <Shirt className="size-3.5" aria-hidden="true" />
              Tiene capa equipada
            </span>
          )}
        </div>

        {data.role && (
          <p className="max-w-[220px] text-center text-xs leading-relaxed text-muted-foreground">
            {data.role.description}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-6">
        {/* UUID */}
        <div className="glass-card rounded-xl p-6">
          <h2 className="mb-4 flex items-center gap-2 font-semibold text-foreground">
            <Fingerprint className="size-4 text-primary" aria-hidden="true" />
            Identificador único (UUID)
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <CodeRow label="Con guiones" value={data.uuid} />
            <CodeRow label="Sin guiones" value={data.uuidRaw} />
          </div>
        </div>

        {/* Descargas de skin */}
        <div className="glass-card rounded-xl p-6">
          <h2 className="mb-4 flex items-center gap-2 font-semibold text-foreground">
            <Shirt className="size-4 text-primary" aria-hidden="true" />
            Renders y skin
          </h2>
          <div className="flex flex-wrap gap-4">
            {[
              { label: 'Cabeza', src: data.renders.head },
              { label: 'Avatar', src: data.renders.avatar },
            ].map((r) => (
              <div key={r.label} className="flex flex-col items-center gap-2">
                <span className="glass-soft relative size-16 overflow-hidden rounded-lg">
                  <Image src={r.src} alt={r.label} fill sizes="64px" className="object-cover" unoptimized />
                </span>
                <span className="text-xs text-muted-foreground">{r.label}</span>
              </div>
            ))}
            <a
              href={data.skin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pop glass-soft flex flex-col items-center justify-center gap-1 rounded-lg px-4 text-xs font-medium text-primary"
            >
              Descargar skin
              <span className="text-[10px] text-muted-foreground">Archivo .png original</span>
            </a>
          </div>
        </div>

        {/* Historial de nombres */}
        {data.nameHistory.length > 0 && (
          <div className="glass-card rounded-xl p-6">
            <h2 className="mb-4 flex items-center gap-2 font-semibold text-foreground">
              <History className="size-4 text-primary" aria-hidden="true" />
              Historial de nombres
            </h2>
            <ul className="flex flex-col divide-y divide-border/50">
              {data.nameHistory.map((entry, i) => (
                <li key={`${entry.name}-${i}`} className="flex items-center justify-between py-2.5 text-sm">
                  <span className="font-medium text-foreground">{entry.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {entry.changedToAt
                      ? new Date(entry.changedToAt).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })
                      : 'Nombre original'}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

function CodeRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass-soft flex flex-1 items-center justify-between gap-3 rounded-lg px-4 py-3">
      <div className="flex flex-col overflow-hidden">
        <span className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</span>
        <span className="truncate font-mono text-xs text-foreground sm:text-sm">{value}</span>
      </div>
      <CopyButton value={value} />
    </div>
  )
}
