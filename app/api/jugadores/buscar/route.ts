import { NextResponse } from 'next/server'

export const runtime = 'edge'

/**
 * GET /api/jugadores/buscar?q=nombre
 * Busca cuentas de Minecraft por nombre (búsqueda difusa) y devuelve
 * una lista corta de coincidencias con su avatar.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')?.trim()

  if (!query || query.length < 2) {
    return NextResponse.json({ results: [] })
  }

  try {
    const craftyRes = await fetch(
      `https://api.crafty.gg/api/v2/players/search?username=${encodeURIComponent(query)}`,
      {
        headers: { 'User-Agent': 'Shodzery/1.0' },
        next: { revalidate: 60 },
      },
    )

    if (craftyRes.ok) {
      const data = await craftyRes.json()
      const results = (data.data || [])
        .slice(0, 8)
        .map((p: { username: string; uuid: string }) => ({
          name: p.username,
          uuid: p.uuid,
          avatar: `https://crafatar.com/avatars/${p.uuid.replace(/-/g, '')}?size=64&overlay=true`,
        }))
      return NextResponse.json({ results })
    }

    // Alternativa: intenta una coincidencia exacta contra Mojang
    const directRes = await fetch(
      `https://api.mojang.com/users/profiles/minecraft/${encodeURIComponent(query)}`,
      { headers: { 'User-Agent': 'Shodzery/1.0' } },
    )

    if (directRes.ok) {
      const profile = await directRes.json()
      return NextResponse.json({
        results: [
          {
            name: profile.name,
            uuid: profile.id,
            avatar: `https://crafatar.com/avatars/${profile.id}?size=64&overlay=true`,
          },
        ],
      })
    }

    return NextResponse.json({ results: [] })
  } catch (error) {
    console.error('[jugadores/buscar] error:', error)
    return NextResponse.json({ results: [] })
  }
}
