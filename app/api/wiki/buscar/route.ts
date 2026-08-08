import { NextRequest, NextResponse } from 'next/server'
import { CATEGORY_FILES, type CatalogCategory, fetchCategory, normalizeEntry } from '@/lib/mcdata'

export const runtime = 'edge'
export const revalidate = 21600

const CATEGORIES = Object.keys(CATEGORY_FILES) as CatalogCategory[]

/**
 * GET /api/wiki/buscar?q=
 * Busca en las cinco categorías del catálogo a la vez (objetos,
 * mobs, biomas, efectos, encantamientos) y devuelve unos pocos
 * resultados de cada una, agrupados. Pensado para la barra de
 * búsqueda de la wiki.
 */
export async function GET(request: NextRequest) {
  const q = (request.nextUrl.searchParams.get('q') || '').trim().toLowerCase()

  if (q.length < 2) {
    return NextResponse.json({ results: {} })
  }

  try {
    const entries = await Promise.all(
      CATEGORIES.map(async (category) => {
        try {
          const raw = await fetchCategory(category)
          const matches = raw
            .map((entry) => normalizeEntry(category, entry))
            .filter((entry): entry is NonNullable<typeof entry> => {
              if (!entry) return false
              return entry.name.includes(q.replace(/\s+/g, '_')) || entry.displayName.toLowerCase().includes(q)
            })
            .slice(0, 6)
          return [category, matches] as const
        } catch {
          return [category, []] as const
        }
      }),
    )

    const results = Object.fromEntries(entries.filter(([, matches]) => matches.length > 0))

    return NextResponse.json(
      { results },
      { headers: { 'Cache-Control': 'public, s-maxage=21600, stale-while-revalidate=86400' } },
    )
  } catch (error) {
    console.error('[wiki buscar] error:', error)
    return NextResponse.json({ results: {} })
  }
}
