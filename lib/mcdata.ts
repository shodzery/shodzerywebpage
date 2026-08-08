/**
 * Catálogo en vivo de Minecraft (objetos, mobs, biomas, efectos y
 * encantamientos), alimentado por los datasets abiertos de
 * PrismarineJS (minecraft-data / minecraft-assets), que se
 * actualizan con cada versión de Minecraft. No requiere API key.
 */

const MC_VERSION = '1.21.1'
const DATA_BASE = `https://raw.githubusercontent.com/PrismarineJS/minecraft-data/master/data/pc/${MC_VERSION}`
const ASSET_BASE = `https://raw.githubusercontent.com/PrismarineJS/minecraft-assets/master/data/${MC_VERSION}`

export type CatalogCategory = 'objetos' | 'mobs' | 'biomas' | 'efectos' | 'encantamientos'

export const CATEGORY_FILES: Record<CatalogCategory, string> = {
  objetos: 'items',
  mobs: 'entities',
  biomas: 'biomes',
  efectos: 'effects',
  encantamientos: 'enchantments',
}

export const CATEGORY_LABELS: Record<CatalogCategory, string> = {
  objetos: 'Objetos y bloques',
  mobs: 'Mobs',
  biomas: 'Biomas',
  efectos: 'Pociones y efectos',
  encantamientos: 'Encantamientos',
}

// Caché en memoria del runtime (además de la caché HTTP de fetch) para
// no repetir la descarga completa del archivo en cada request de la
// misma instancia.
const memoryCache = new Map<string, { at: number; data: unknown }>()
const MEMORY_TTL = 1000 * 60 * 30 // 30 min

async function fetchJSON(url: string): Promise<unknown> {
  const cached = memoryCache.get(url)
  if (cached && Date.now() - cached.at < MEMORY_TTL) {
    return cached.data
  }

  const res = await fetch(url, {
    headers: { 'User-Agent': 'Shodzery/1.0' },
    next: { revalidate: 21600 },
  })

  if (!res.ok) {
    throw new Error(`mcdata: fallo al obtener ${url} (${res.status})`)
  }

  const data = await res.json()
  memoryCache.set(url, { at: Date.now(), data })
  return data
}

export async function fetchCategory(category: CatalogCategory): Promise<unknown[]> {
  const file = CATEGORY_FILES[category]
  const data = await fetchJSON(`${DATA_BASE}/${file}.json`)
  return Array.isArray(data) ? data : Object.values(data as Record<string, unknown>)
}

export async function fetchRecipes(): Promise<Record<string, unknown>> {
  const data = await fetchJSON(`${DATA_BASE}/recipes.json`)
  return (data as Record<string, unknown>) || {}
}

export function iconForItem(name: string): string {
  return `${ASSET_BASE}/items/${name}.png`
}

export interface CatalogEntry {
  category: CatalogCategory
  name: string
  displayName: string
  icon: string | null
  meta: Record<string, string>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function normalizeEntry(category: CatalogCategory, raw: any): CatalogEntry | null {
  if (!raw || typeof raw.name !== 'string') return null

  const base = {
    category,
    name: raw.name as string,
    displayName: (raw.displayName as string) || (raw.name as string),
  }

  switch (category) {
    case 'objetos':
      return {
        ...base,
        icon: iconForItem(raw.name),
        meta: {
          'Stack máx.': raw.stackSize !== undefined ? String(raw.stackSize) : '—',
          ...(raw.maxDurability ? { Durabilidad: String(raw.maxDurability) } : {}),
        },
      }
    case 'mobs':
      return {
        ...base,
        icon: null,
        meta: {
          Tipo: (raw.type as string) || (raw.category as string) || '—',
          ...(raw.width && raw.height
            ? { Tamaño: `${Number(raw.width).toFixed(1)} × ${Number(raw.height).toFixed(1)}` }
            : {}),
        },
      }
    case 'biomas':
      return {
        ...base,
        icon: null,
        meta: {
          Dimensión: (raw.dimension as string) || biomeDimensionGuess(raw.name) || '—',
          Categoría: (raw.category as string) || '—',
          ...(raw.temperature !== undefined ? { Temperatura: String(raw.temperature) } : {}),
        },
      }
    case 'efectos':
      return {
        ...base,
        icon: null,
        meta: {
          Tipo: raw.type === 'bad' ? 'Negativo' : 'Positivo',
        },
      }
    case 'encantamientos':
      return {
        ...base,
        icon: null,
        meta: {
          'Nivel máx.': raw.maxLevel !== undefined ? String(raw.maxLevel) : '—',
          Categoría: (raw.category as string) || '—',
          ...(raw.treasureOnly ? { Especial: 'Solo tesoro' } : {}),
          ...(raw.curse ? { Tipo: 'Maldición' } : {}),
        },
      }
    default:
      return { ...base, icon: null, meta: {} }
  }
}

function biomeDimensionGuess(name: string): string | null {
  if (!name) return null
  if (name.includes('nether') || name.includes('basalt') || name.includes('crimson') || name.includes('warped') || name.includes('soul_sand'))
    return 'nether'
  if (name.includes('end')) return 'the_end'
  return 'overworld'
}

export interface RecipeIngredient {
  name: string
  displayName: string
  icon: string | null
}

export interface NormalizedRecipe {
  type: 'shaped' | 'shapeless'
  grid?: (RecipeIngredient | null)[][]
  ingredients?: (RecipeIngredient | null)[]
  result: { count: number; item: RecipeIngredient | null } | null
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function buildRecipeInfo(itemId: number, recipesRaw: Record<string, any>, itemsAll: any[]): NormalizedRecipe[] {
  const list = recipesRaw?.[String(itemId)]
  if (!Array.isArray(list)) return []

  const itemById = new Map<number, { name: string; displayName: string }>()
  for (const it of itemsAll) {
    if (it && typeof it.id === 'number') {
      itemById.set(it.id, { name: it.name, displayName: it.displayName || it.name })
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function resolveIngredient(cell: any): RecipeIngredient | null {
    if (cell === null || cell === undefined) return null
    const id = typeof cell === 'number' ? cell : cell.id
    if (id === undefined || id === null || id === -1) return null
    const item = itemById.get(id)
    if (!item) return { name: `id_${id}`, displayName: `#${id}`, icon: null }
    return { name: item.name, displayName: item.displayName, icon: iconForItem(item.name) }
  }

  const normalized: NormalizedRecipe[] = []

  for (const r of list) {
    if (!r || typeof r !== 'object') continue

    const result = r.result
      ? { count: r.result.count ?? 1, item: resolveIngredient(r.result.id) }
      : null

    if (Array.isArray(r.inShape)) {
      const grid = (r.inShape as unknown[][]).map((row) => row.map((cell) => resolveIngredient(cell)))
      normalized.push({ type: 'shaped', grid, result })
      continue
    }

    if (Array.isArray(r.ingredients)) {
      const ingredients = (r.ingredients as unknown[]).map((cell) => resolveIngredient(cell))
      normalized.push({ type: 'shapeless', ingredients, result })
    }
  }

  return normalized
}
