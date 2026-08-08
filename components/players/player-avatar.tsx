'use client'

import { useState } from 'react'
import Image from 'next/image'
import { User } from 'lucide-react'

/**
 * Muestra la cabeza 3D del jugador (Crafatar renders/head). Si esa
 * URL falla o tarda en generarse, cae automáticamente a la cara 2D
 * (avatars), y si esa también falla, muestra un icono genérico. Así
 * nunca se ve una imagen rota.
 */
export function PlayerAvatar({
  uuid,
  name,
  size = 56,
  className = '',
}: {
  uuid: string
  name: string
  size?: number
  className?: string
}) {
  const [stage, setStage] = useState<'render' | 'avatar' | 'fallback'>('render')

  const clean = uuid.replace(/-/g, '')
  const src =
    stage === 'render'
      ? `https://crafatar.com/renders/head/${clean}?size=${size * 2}&overlay`
      : `https://crafatar.com/avatars/${clean}?size=${size * 2}&overlay=true`

  if (stage === 'fallback') {
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
        src={src}
        alt={name}
        fill
        sizes={`${size}px`}
        className={stage === 'render' ? 'object-contain p-1 [image-rendering:pixelated]' : 'object-cover'}
        unoptimized
        onError={() => setStage((s) => (s === 'render' ? 'avatar' : 'fallback'))}
      />
    </span>
  )
}
