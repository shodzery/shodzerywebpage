import { NextResponse } from 'next/server'
import { withApiKey } from '@/lib/api-auth'

/**
 * GET /api/v1/changelogs?type=java|bedrock&id=<contentPath>
 *
 * Envuelve `/api/changelogs` con el formato `{ data, meta }` de la API v1.
 */
async function handler(request: Request) {
  const url = new URL(request.url)
  const origin = url.origin
  const upstream = await fetch(`${origin}/api/changelogs${url.search}`, {
    headers: { 'User-Agent': 'Shodzery-API-v1' },
    next: { revalidate: 300 },
  })

  const body = await upstream.json()

  if (!upstream.ok) {
    return NextResponse.json({ error: body?.error ?? 'No se pudieron obtener los changelogs.' }, { status: upstream.status })
  }

  return NextResponse.json(
    { data: body, meta: { version: 'v1', fetchedAt: new Date().toISOString() } },
    { headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' } },
  )
}

export const GET = withApiKey(handler)
