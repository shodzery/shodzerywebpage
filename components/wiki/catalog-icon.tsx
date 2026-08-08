'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Icon } from '@/components/icon-registry'

export function CatalogIcon({
  src,
  fallbackIcon,
  size = 40,
  className = '',
}: {
  src: string | null
  fallbackIcon: string
  size?: number
  className?: string
}) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return (
      <span
        className={`glass-soft flex shrink-0 items-center justify-center rounded-lg text-primary ${className}`}
        style={{ width: size, height: size }}
      >
        <Icon name={fallbackIcon} className="size-1/2" />
      </span>
    )
  }

  return (
    <span className={`relative shrink-0 [image-rendering:pixelated] ${className}`} style={{ width: size, height: size }}>
      <Image src={src} alt="" fill sizes={`${size}px`} className="object-contain" unoptimized onError={() => setFailed(true)} />
    </span>
  )
}
