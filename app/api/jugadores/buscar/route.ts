import { NextResponse } from 'next/server'
import { getSpecialPlayerRole } from '@/data/special-players'

export const runtime = 'edge'

function toResult(name: string, uuid: string) {
  const clean = uuid.replace(/-/g, '')
  return {
    name,
    uuid: clean,
    avatar: `https://crafatar.com/renders/head/${clean}?size=128&overlay`,
    role: getSpecialPlayerRole(name)?.role ?? null,
  }
}

/**
 * GET /api/jugadores/buscar?q=nombre
 * Busca cuentas de Minecraft por nombre. Combina una búsqueda difusa
 * (Crafty) con una búsqueda exacta contra Mojang, para que un nombre
 * real que no esté indexado en el buscador difuso siempre aparezca.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')?.trim()

  if (!query || query.length < 2) {
    return NextResponse.json({ results: [] })
  }

  try {
    const [craftyResult, exactResult] = await Promise.allSettled([
      fetch(`https://api.crafty.gg/api/v2/players/search?username=${encodeURIComponent(query)}`, {
        headers: { 'User-Agent': 'Shodzery/1.0' },
        next: { revalidate: 60 },
      }).then((res) => (res.ok ? res.json() : null)),
      fetch(`https://api.mojang.com/users/profiles/minecraft/${encodeURIComponent(query)}`, {
        headers: { 'User-Agent': 'Shodzery/1.0' },
        next: { revalidate: 60 },
      }).then((res) => (res.ok ? res.json() : null)),
    ])

    const merged: ReturnType<typeof toResult>[] = []
    const seen = new Set<string>()

    // La coincidencia exacta va primero: es la más relevante.
    if (exactResult.status === 'fulfilled' && exactResult.value?.name && exactResult.value?.id) {
      const r = toResult(exactResult.value.name, exactResult.value.id)
      merged.push(r)
      seen.add(r.uuid)
    }

    if (craftyResult.status === 'fulfilled' && Array.isArray(craftyResult.value?.data)) {
      for (const p of craftyResult.value.data as { username: string; uuid: string }[]) {
        const r = toResult(p.username, p.uuid)
        if (seen.has(r.uuid)) continue
        seen.add(r.uuid)
        merged.push(r)
        if (merged.length >= 8) break
      }
    }

    return NextResponse.json({ results: merged })
  } catch (error) {
    console.error('[jugadores/buscar] error:', error)
    return NextResponse.json({ results: [] })
  }
}
