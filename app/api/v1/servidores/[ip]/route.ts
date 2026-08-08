import { NextResponse } from 'next/server'
import { withApiKey } from '@/lib/api-auth'

export const runtime = 'edge'
export const revalidate = 60

/**
 * GET /api/v1/servidores/{ip}
 *
 * Versión pública y autenticada del estado de servidores. Envuelve
 * `/api/servidores/[ip]` (mcsrvstat.us) con el formato `{ data, meta }`
 * de la API v1.
 */
async function handler(
  request: Request,
  { params }: { params: Promise<{ ip: string }> },
) {
  const { ip } = await params
  const origin = new URL(request.url).origin

  const upstream = await fetch(`${origin}/api/servidores/${encodeURIComponent(ip)}`, {
    headers: { 'User-Agent': 'Shodzery-API-v1' },
    next: { revalidate: 60 },
  })

  const body = await upstream.json()

  return NextResponse.json(
    { data: body, meta: { version: 'v1', fetchedAt: new Date().toISOString() } },
    { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' } },
  )
}

export const GET = withApiKey(handler)
