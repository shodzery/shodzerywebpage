import { NextRequest, NextResponse } from 'next/server'
import { CATEGORY_FILES, type CatalogCategory, fetchCategory, normalizeEntry } from '@/lib/mcdata'

export const runtime = 'edge'
export const revalidate = 21600

/**
 * GET /api/wiki/[categoria]?q=&limit=&offset=
 * Devuelve una página del catálogo en vivo (objetos, mobs, biomas,
 * efectos o encantamientos), con búsqueda opcional por nombre.
 */
export async function GET(request: NextRequest, { params }: { params: Promise<{ categoria: string }> }) {
  const { categoria } = await params
  const category = categoria as CatalogCategory

  if (!CATEGORY_FILES[category]) {
    return NextResponse.json({ error: 'Categoría no válida' }, { status: 400 })
  }

  const { searchParams } = request.nextUrl
  const q = (searchParams.get('q') || '').trim().toLowerCase()
  const limit = Math.min(120, Math.max(1, Number(searchParams.get('limit')) || 60))
  const offset = Math.max(0, Number(searchParams.get('offset')) || 0)

  try {
    const raw = await fetchCategory(category)
    const normalized = raw
      .map((entry) => normalizeEntry(category, entry))
      .filter((entry): entry is NonNullable<typeof entry> => entry !== null)

    const filtered = q
      ? normalized.filter(
          (entry) => entry.name.includes(q.replace(/\s+/g, '_')) || entry.displayName.toLowerCase().includes(q),
        )
      : normalized

    filtered.sort((a, b) => a.displayName.localeCompare(b.displayName))

    const total = filtered.length
    const items = filtered.slice(offset, offset + limit)

    return NextResponse.json(
      { total, items, category },
      { headers: { 'Cache-Control': 'public, s-maxage=21600, stale-while-revalidate=86400' } },
    )
  } catch (error) {
    console.error('[wiki] error:', error)
    return NextResponse.json({ error: 'No se pudo obtener el catálogo en este momento' }, { status: 502 })
  }
}
