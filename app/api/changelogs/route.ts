import { NextRequest, NextResponse } from 'next/server'

const PATCH_NOTES_BASE = 'https://launchercontent.mojang.com'

/**
 * Proxy de las notas de parche oficiales de Mojang.
 *
 *  - GET /api/changelogs                  -> lista completa (Java)
 *  - GET /api/changelogs?type=bedrock     -> lista completa (Bedrock)
 *  - GET /api/changelogs?id=<contentPath> -> contenido de una entrada
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const type = searchParams.get('type') || 'java'
  const id = searchParams.get('id')

  try {
    if (id) {
      const safeId = id.replace(/^\/+/, '')
      const url = `${PATCH_NOTES_BASE}/v2/${safeId}`
      const res = await fetch(url, {
        headers: { 'User-Agent': 'Shodzery/1.0' },
        next: { revalidate: 300 },
      })
      if (!res.ok) throw new Error(`La nota de parche respondió ${res.status}`)
      const data = await res.json()
      return NextResponse.json(data, {
        headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' },
      })
    }

    const file = type === 'bedrock' ? 'bedrockPatchNotes.json' : 'javaPatchNotes.json'
    const url = `${PATCH_NOTES_BASE}/v2/${file}`

    const res = await fetch(url, {
      headers: { 'User-Agent': 'Shodzery/1.0' },
      next: { revalidate: 300 },
    })
    if (!res.ok) throw new Error(`El índice de notas de parche respondió ${res.status}`)
    const data = await res.json()

    const entries = (data.entries || []).map((e: any) => ({
      ...e,
      image: e.image
        ? {
            ...e.image,
            url: e.image.url?.startsWith('http')
              ? e.image.url
              : `${PATCH_NOTES_BASE}${e.image.url}`,
          }
        : null,
    }))

    return NextResponse.json(
      { ...data, entries },
      { headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' } },
    )
  } catch (err) {
    console.error('[changelogs] error:', err)
    return NextResponse.json({ error: 'No se pudieron obtener las notas de parche de Mojang' }, { status: 502 })
  }
}
