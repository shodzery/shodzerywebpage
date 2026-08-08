'use client'

import { useState } from 'react'
import Image from 'next/image'
import { User } from 'lucide-react'

/**
 * Muestra la cabeza (o cara) del jugador. Encadena varias APIs
 * conocidas por su fiabilidad (mc-heads, minotar, crafatar) y solo
 * si todas fallan cae a un icono genérico, para que casi nunca se
 * vea vacío.
 */
export function PlayerAvatar({
  uuid,
  name,
  size = 56,
  variant = 'head',
  className = '',
}: {
  uuid: string
  name: string
  size?: number
  /** 'head': render 3D isométrico. 'face': cara plana 2D. */
  variant?: 'head' | 'face'
  className?: string
}) {
  const [stage, setStage] = useState(0)

  const clean = uuid.replace(/-/g, '')
  const px = size * 2

  const sources =
    variant === 'head'
      ? [
          `https://mc-heads.net/head/${clean}/${px}`,
          `https://minotar.net/helm/${clean}/${px}`,
          `https://crafatar.com/renders/head/${clean}?size=${px}&overlay`,
        ]
      : [
          `https://mc-heads.net/avatar/${clean}/${px}`,
          `https://minotar.net/avatar/${clean}/${px}`,
          `https://crafatar.com/avatars/${clean}?size=${px}&overlay=true`,
        ]

  if (stage >= sources.length) {
    return (
      <span
        className={`glass-soft flex shrink-0 items-center justify-center rounded-xl text-muted-foreground ${className}`}
        style={{ width: size, height: size }}
      >
        <User className="size-1/2" aria-hidden="true" />
      </span>
    )
  }

  return (
    <span className={`relative shrink-0 overflow-hidden ${className}`} style={{ width: size, height: size }}>
      <Image
        key={sources[stage]}
        src={sources[stage]}
        alt={name}
        fill
        sizes={`${size}px`}
        className="object-cover [image-rendering:pixelated]"
        unoptimized
        onError={() => setStage((s) => s + 1)}
      />
    </span>
  )
}
