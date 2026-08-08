import { NextRequest, NextResponse } from 'next/server'
import { getPage } from '@/lib/mwiki'

export const runtime = 'edge'
export const revalidate = 3600

/**
 * GET /api/wiki/mw/page?title=Diamond+Sword
 * Devuelve el artículo completo (HTML con fotos incluidas) de una
 * página de minecraft.wiki.
 */
export async function GET(request: NextRequest) {
  const title = request.nextUrl.searchParams.get('title')

  if (!title) {
    return NextResponse.json({ error: 'Falta el parámetro title' }, { status: 400 })
  }

  try {
    const page = await getPage(title)
    if (!page) {
      return NextResponse.json({ error: 'No se encontró esa página' }, { status: 404 })
    }
    return NextResponse.json(page, {
      headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' },
    })
  } catch (error) {
    console.error('[wiki mw page] error:', error)
    return NextResponse.json({ error: 'No se pudo obtener la página' }, { status: 502 })
  }
}
