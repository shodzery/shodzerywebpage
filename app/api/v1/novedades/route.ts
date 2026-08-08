import { NextResponse } from 'next/server'
import { withApiKey } from '@/lib/api-auth'

/**
 * GET /api/v1/novedades
 *
 * Envuelve `/api/novedades` con el formato `{ data, meta }` de la API v1.
 */
async function handler(request: Request) {
  const origin = new URL(request.url).origin
  const upstream = await fetch(`${origin}/api/novedades`, {
    headers: { 'User-Agent': 'Shodzery-API-v1' },
    cache: 'no-store',
  })

  const body = await upstream.json()

  return NextResponse.json(
    { data: body, meta: { version: 'v1', fetchedAt: new Date().toISOString() } },
    { headers: { 'Cache-Control': 'no-store, max-age=0, must-revalidate' } },
  )
}

export const GET = withApiKey(handler)
