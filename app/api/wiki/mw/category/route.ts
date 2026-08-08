import { NextRequest, NextResponse } from 'next/server'
import { getCategoryMembers } from '@/lib/mwiki'

export const runtime = 'edge'
export const revalidate = 3600

/**
 * GET /api/wiki/mw/category?name=Mobs&limit=48&cmcontinue=
 * Lista las páginas de una categoría de minecraft.wiki (Mobs,
 * Blocks, Items, Biomes, Structures, Commands, Tutorials...).
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const name = searchParams.get('name')
  const cmcontinue = searchParams.get('cmcontinue') || undefined
  const limit = Math.min(60, Math.max(1, Number(searchParams.get('limit')) || 48))

  if (!name) {
    return NextResponse.json({ error: 'Falta el parámetro name' }, { status: 400 })
  }

  try {
    const data = await getCategoryMembers(name, limit, cmcontinue)
    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' },
    })
  } catch (error) {
    console.error('[wiki mw category] error:', error)
    return NextResponse.json({ error: 'No se pudo obtener la categoría' }, { status: 502 })
  }
}
