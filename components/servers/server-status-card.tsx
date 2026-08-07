'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Cpu, Loader2, Server, ServerCrash, Users, Wifi } from 'lucide-react'

interface ServerData {
  online: boolean
  ip?: string
  port?: number
  hostname?: string
  version?: string
  protocol?: { name?: string; version?: number }
  icon?: string
  motd?: { clean?: string[]; raw?: string[] }
  players?: { online: number; max: number; list?: { name: string }[] }
  software?: string
  error?: string
}

export function ServerStatusCard({ address }: { address: string }) {
  const [data, setData] = useState<ServerData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)

    fetch(`/api/servidores/${encodeURIComponent(address)}`)
      .then((res) => res.json())
      .then((json) => {
        if (!cancelled) setData(json)
      })
      .catch(() => {
        if (!cancelled) setData({ online: false, ip: address })
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [address])

  if (loading) {
    return (
      <div className="glass-card flex flex-col items-center gap-3 rounded-xl p-16 text-center">
        <Loader2 className="size-8 animate-spin text-primary" aria-hidden="true" />
        <p className="font-pixel text-sm text-muted-foreground">Haciendo ping a {address}…</p>
      </div>
    )
  }

  if (!data || !data.online) {
    return (
      <div className="glass-card flex flex-col items-center gap-3 rounded-xl p-16 text-center">
        <ServerCrash className="size-8 text-destructive" aria-hidden="true" />
        <h2 className="text-lg font-semibold text-foreground">{address} está fuera de línea</h2>
        <p className="max-w-md text-sm text-muted-foreground">
          El servidor no respondió al ping, no existe o tiene el ping deshabilitado en su configuración.
        </p>
      </div>
    )
  }

  const online = data.players?.online ?? 0
  const max = data.players?.max ?? 0
  const fillPercent = max > 0 ? Math.min(100, Math.round((online / max) * 100)) : 0

  return (
    <div className="glass-card border-gradient-animated rounded-xl p-6 sm:p-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <span className="glass-soft relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-xl">
          {data.icon ? (
            <Image src={data.icon} alt={`Icono de ${address}`} fill sizes="64px" className="object-cover" unoptimized />
          ) : (
            <Server className="size-7 text-primary" aria-hidden="true" />
          )}
        </span>

        <div className="flex flex-1 flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-pixel text-lg text-primary text-glow">{data.hostname || address}</h1>
            <span className="glow-success flex items-center gap-1 rounded-full bg-success/15 px-2.5 py-0.5 text-xs font-medium text-success">
              <Wifi className="size-3" aria-hidden="true" />
              En línea
            </span>
          </div>
          {data.motd?.clean && (
            <p className="whitespace-pre-line font-mono text-xs text-muted-foreground sm:text-sm">
              {data.motd.clean.join('\n')}
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="glass-soft rounded-lg p-4">
          <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
            <Users className="size-3.5" aria-hidden="true" />
            Jugadores
          </div>
          <p className="font-pixel text-xl text-foreground">
            {online} <span className="text-sm text-muted-foreground">/ {max}</span>
          </p>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
            <div className="h-full rounded-full bg-primary" style={{ width: `${fillPercent}%` }} />
          </div>
        </div>

        <div className="glass-soft rounded-lg p-4">
          <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
            <Cpu className="size-3.5" aria-hidden="true" />
            Versión
          </div>
          <p className="font-pixel text-sm text-foreground">{data.version || '—'}</p>
          {data.software && <p className="mt-1 text-xs text-muted-foreground">{data.software}</p>}
        </div>

        <div className="glass-soft rounded-lg p-4">
          <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
            <Server className="size-3.5" aria-hidden="true" />
            Dirección
          </div>
          <p className="truncate font-mono text-sm text-foreground">
            {data.ip}
            {data.port ? `:${data.port}` : ''}
          </p>
        </div>
      </div>

      {data.players?.list && data.players.list.length > 0 && (
        <div className="mt-6">
          <p className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">Jugadores conectados</p>
          <div className="flex flex-wrap gap-2">
            {data.players.list.slice(0, 24).map((p) => (
              <a
                key={p.name}
                href={`/jugadores/${encodeURIComponent(p.name)}`}
                className="chip glass-soft rounded-full px-3 py-1 text-xs text-foreground transition-colors hover:text-primary"
              >
                {p.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
