'use client'

import { useEffect, useState } from 'react'
import { Loader2, ServerCrash } from 'lucide-react'
import { Modal } from '@/components/ui/modal'
import { CatalogIcon } from '@/components/wiki/catalog-icon'
import { Icon } from '@/components/icon-registry'

const CATEGORY_LABELS: Record<string, string> = {
  objetos: 'Objetos y bloques',
  mobs: 'Mobs',
  biomas: 'Biomas',
  efectos: 'Pociones y efectos',
  encantamientos: 'Encantamientos',
}

const CATEGORY_ICONS: Record<string, string> = {
  objetos: 'Package',
  mobs: 'Skull',
  biomas: 'Mountain',
  efectos: 'FlaskConical',
  encantamientos: 'Wand2',
}

interface RecipeIngredient {
  name: string
  displayName: string
  icon: string | null
}

interface NormalizedRecipe {
  type: 'shaped' | 'shapeless'
  grid?: (RecipeIngredient | null)[][]
  ingredients?: (RecipeIngredient | null)[]
  result: { count: number; item: RecipeIngredient | null } | null
}

interface DetailData {
  category: string
  name: string
  displayName: string
  icon: string | null
  meta: Record<string, string>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  raw: any
  recipes: NormalizedRecipe[]
}

function formatCost(cost: unknown): string | undefined {
  if (cost === undefined || cost === null) return undefined
  if (typeof cost === 'number') return String(cost)
  if (typeof cost === 'object' && cost !== null && ('a' in cost || 'b' in cost)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const c = cost as any
    return `${c.a ?? 0}·nivel + ${c.b ?? 0}`
  }
  return undefined
}

export function EntryDetailModal({
  category,
  name,
  onClose,
}: {
  category: string | null
  name: string | null
  onClose: () => void
}) {
  const [data, setData] = useState<DetailData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!category || !name) {
      setData(null)
      return
    }

    let cancelled = false
    setLoading(true)
    setError(false)
    setData(null)

    fetch(`/api/wiki/${category}/${encodeURIComponent(name)}`)
      .then(async (res) => {
        const json = await res.json()
        if (!res.ok) throw new Error(json.error || 'Error')
        if (!cancelled) setData(json)
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
  }, [category, name])

  const open = Boolean(category && name)

  return (
    <Modal open={open} onClose={onClose} eyebrow={category ? CATEGORY_LABELS[category] : undefined} title={data?.displayName}>
      {loading && (
        <div className="flex flex-col items-center gap-3 py-10 text-center">
          <Loader2 className="size-7 animate-spin text-primary" aria-hidden="true" />
          <p className="text-sm text-muted-foreground">Cargando…</p>
        </div>
      )}

      {!loading && error && (
        <div className="flex flex-col items-center gap-3 py-10 text-center">
          <ServerCrash className="size-7 text-destructive" aria-hidden="true" />
          <p className="text-sm text-muted-foreground">No se pudo cargar este elemento. Inténtalo de nuevo.</p>
        </div>
      )}

      {!loading && !error && data && (
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <CatalogIcon src={data.icon} fallbackIcon={CATEGORY_ICONS[data.category] || 'Blocks'} size={56} />
            <span className="font-mono text-xs text-muted-foreground">{data.name}</span>
          </div>

          {Object.keys(data.meta).length > 0 && (
            <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {Object.entries(data.meta).map(([k, v]) => (
                <div key={k} className="glass-soft rounded-lg px-3 py-2.5">
                  <dt className="text-[10px] uppercase tracking-wide text-muted-foreground">{k}</dt>
                  <dd className="text-sm text-foreground">{v}</dd>
                </div>
              ))}
            </dl>
          )}

          {data.category === 'biomas' && (
            <ExtraFacts
              facts={[
                ['Lluvia', data.raw?.rainfall],
                [
                  'Color de agua',
                  data.raw?.color !== undefined ? `#${Number(data.raw.color).toString(16).padStart(6, '0')}` : undefined,
                ],
              ]}
            />
          )}

          {data.category === 'encantamientos' && (
            <ExtraFacts
              facts={[
                ['Costo mínimo', formatCost(data.raw?.minCost)],
                ['Costo máximo', formatCost(data.raw?.maxCost)],
                ['Solo tesoro', data.raw?.treasureOnly ? 'Sí' : undefined],
                ['Es maldición', data.raw?.curse ? 'Sí' : undefined],
              ]}
            />
          )}

          {data.category === 'efectos' && (
            <ExtraFacts facts={[['ID interno', data.raw?.id]]} />
          )}

          {data.category === 'objetos' && data.recipes.length > 0 && (
            <div className="flex flex-col gap-4">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Icon name="Hammer" className="size-4 text-primary" />
                Receta de crafteo
              </h3>
              <div className="flex flex-col gap-4">
                {data.recipes.map((recipe, i) => (
                  <RecipeCard key={i} recipe={recipe} />
                ))}
              </div>
            </div>
          )}

          {data.category === 'objetos' && data.recipes.length === 0 && (
            <p className="text-sm leading-relaxed text-muted-foreground">
              Este objeto no tiene una receta de crafteo registrada: probablemente se obtiene minando, con comercio,
              como botín, o generado de forma natural en el mundo.
            </p>
          )}
        </div>
      )}
    </Modal>
  )
}

function ExtraFacts({ facts }: { facts: [string, string | number | undefined][] }) {
  const visible = facts.filter(([, v]) => v !== undefined && v !== null && v !== '')
  if (visible.length === 0) return null

  return (
    <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {visible.map(([k, v]) => (
        <div key={k} className="glass-soft rounded-lg px-3 py-2.5">
          <dt className="text-[10px] uppercase tracking-wide text-muted-foreground">{k}</dt>
          <dd className="text-sm text-foreground">{String(v)}</dd>
        </div>
      ))}
    </dl>
  )
}

function RecipeCard({ recipe }: { recipe: NormalizedRecipe }) {
  return (
    <div className="glass-soft flex flex-col items-center gap-4 rounded-xl p-5 sm:flex-row sm:justify-center">
      {recipe.type === 'shaped' && recipe.grid && (
        <div className="flex flex-col gap-1">
          {recipe.grid.map((row, ri) => (
            <div key={ri} className="flex gap-1">
              {row.map((cell, ci) => (
                <RecipeCell key={ci} cell={cell} />
              ))}
            </div>
          ))}
        </div>
      )}

      {recipe.type === 'shapeless' && recipe.ingredients && (
        <div className="flex flex-wrap items-center justify-center gap-1">
          {recipe.ingredients.map((cell, i) => (
            <RecipeCell key={i} cell={cell} />
          ))}
        </div>
      )}

      <span className="text-xl text-muted-foreground" aria-hidden="true">
        →
      </span>

      {recipe.result?.item && (
        <div className="flex flex-col items-center gap-1.5">
          <div className="glass-card flex size-12 items-center justify-center rounded-lg border border-primary/30 p-1.5">
            <CatalogIcon src={recipe.result.item.icon} fallbackIcon="Package" size={36} />
          </div>
          <span className="text-xs text-muted-foreground">
            {recipe.result.item.displayName} × {recipe.result.count}
          </span>
        </div>
      )}
    </div>
  )
}

function RecipeCell({ cell }: { cell: RecipeIngredient | null }) {
  return (
    <div className="glass-card flex size-11 items-center justify-center rounded-md border border-border/50 p-1">
      {cell ? <CatalogIcon src={cell.icon} fallbackIcon="Package" size={30} /> : <span className="size-2 rounded-full bg-border/60" />}
    </div>
  )
}
