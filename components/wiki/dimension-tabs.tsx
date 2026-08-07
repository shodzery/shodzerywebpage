'use client'

import { useState } from 'react'
import type { WikiDimension } from '@/data/wiki'

const TABS = [
  { key: 'biomas', label: 'Biomas' },
  { key: 'mobs', label: 'Mobs' },
  { key: 'estructuras', label: 'Estructuras' },
] as const

export function DimensionTabs({ dimension }: { dimension: WikiDimension }) {
  const [tab, setTab] = useState<(typeof TABS)[number]['key']>('biomas')
  const items = dimension[tab]

  return (
    <div className="flex flex-col gap-8">
      <div className="glass-soft inline-flex w-fit gap-1 self-center rounded-full p-1">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              tab === t.key
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item.name} className="glass-card hover-lift rounded-xl p-6">
            <h3 className="mb-2 font-semibold text-foreground">{item.name}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
