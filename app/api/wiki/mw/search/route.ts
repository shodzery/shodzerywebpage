import { NextRequest, NextResponse } from 'next/server'
import { searchWiki } from '@/lib/mwiki'

export const runtime = 'edge'
export const revalidate = 3600

/**
 * GET /api/wiki/mw/search?q=
 * Busca en minecraft.wiki (título, extracto y miniatura).
 */
export async function GET(request: NextRequest) {
  const q = (request.nextUrl.searchParams.get('q') || '').trim()

  if (q.length < 2) {
    return NextResponse.json({ results: [] })
  }

  try {
    const results = await searchWiki(q, 10)
    return NextResponse.json(
      { results },
      { headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' } },
    )
  } catch (error) {
    console.error('[wiki mw search] error:', error)
    return NextResponse.json({ results: [] })
  }
}
