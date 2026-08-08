import { NextResponse } from 'next/server'
import { withApiKey } from '@/lib/api-auth'

export const runtime = 'edge'
export const revalidate = 300

/**
 * GET /api/v1/jugadores/{nombre}
 *
 * Versión pública y autenticada del buscador de jugadores. Reutiliza
 * la lógica interna de `/api/jugadores/[nombre]` (Mojang + PlayerDB +
 * Crafty) y la envuelve con el formato estable `{ data, meta }` de la
 * API v1, para no duplicar la integración con servicios externos.
 */
async function handler(
  request: Request,
  { params }: { params: Promise<{ nombre: string }> },
) {
  const { nombre } = await params
  const origin = new URL(request.url).origin

  const upstream = await fetch(`${origin}/api/jugadores/${encodeURIComponent(nombre)}`, {
    headers: { 'User-Agent': 'Shodzery-API-v1' },
    next: { revalidate: 300 },
  })

  const body = await upstream.json()

  if (!upstream.ok) {
    return NextResponse.json(
      { error: body?.error ?? 'No se pudo obtener el jugador.' },
      { status: upstream.status },
    )
  }

  return NextResponse.json(
    { data: body, meta: { version: 'v1', fetchedAt: new Date().toISOString() } },
    { headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' } },
  )
}

export const GET = withApiKey(handler)
