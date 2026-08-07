import { NextResponse } from 'next/server'

export const runtime = 'edge'
export const revalidate = 300

interface MojangProfile {
  id: string
  name: string
}

interface SessionProperty {
  name: string
  value: string
}

interface SessionProfile {
  id: string
  name: string
  properties?: SessionProperty[]
}

function formatUUID(uuid: string): string {
  const clean = uuid.replace(/-/g, '')
  return `${clean.slice(0, 8)}-${clean.slice(8, 12)}-${clean.slice(12, 16)}-${clean.slice(16, 20)}-${clean.slice(20)}`
}

/**
 * GET /api/jugadores/[nombre]
 * Devuelve el perfil completo de un jugador: UUID, skin, capa e
 * historial de nombres, combinando Mojang, PlayerDB y Crafty.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ nombre: string }> },
) {
  const { nombre } = await params

  if (!nombre || nombre.length < 2 || nombre.length > 16) {
    return NextResponse.json(
      { error: 'Nombre de usuario inválido. Debe tener entre 2 y 16 caracteres.' },
      { status: 400 },
    )
  }

  try {
    let profile: MojangProfile | null = null

    const mojangRes = await fetch(
      `https://api.mojang.com/users/profiles/minecraft/${encodeURIComponent(nombre)}`,
      {
        headers: { 'User-Agent': 'Shodzery/1.0' },
        next: { revalidate: 300 },
      },
    )

    if (mojangRes.ok) {
      profile = await mojangRes.json()
    }

    if (!profile) {
      const fallbackRes = await fetch(
        `https://playerdb.co/api/player/minecraft/${encodeURIComponent(nombre)}`,
        {
          headers: { 'User-Agent': 'Shodzery/1.0' },
          next: { revalidate: 300 },
        },
      )

      if (fallbackRes.ok) {
        const fallbackData = await fallbackRes.json()
        if (fallbackData.success && fallbackData.data?.player) {
          profile = {
            id: fallbackData.data.player.raw_id || fallbackData.data.player.id.replace(/-/g, ''),
            name: fallbackData.data.player.username,
          }
        }
      }
    }

    if (!profile) {
      return NextResponse.json({ error: 'Jugador no encontrado' }, { status: 404 })
    }

    const cleanUuid = profile.id.replace(/-/g, '')

    let skinUrl: string | null = null
    let skinVariant: 'classic' | 'slim' = 'classic'
    let capeUrl: string | null = null

    try {
      const sessionRes = await fetch(
        `https://sessionserver.mojang.com/session/minecraft/profile/${cleanUuid}`,
        {
          headers: { 'User-Agent': 'Shodzery/1.0' },
          next: { revalidate: 300 },
        },
      )

      if (sessionRes.ok) {
        const session: SessionProfile = await sessionRes.json()
        const texturesProp = session.properties?.find((p) => p.name === 'textures')

        if (texturesProp) {
          const decoded = JSON.parse(atob(texturesProp.value))

          if (decoded.textures?.SKIN) {
            skinUrl = decoded.textures.SKIN.url
            skinVariant = decoded.textures.SKIN.metadata?.model === 'slim' ? 'slim' : 'classic'
          }
          if (decoded.textures?.CAPE) {
            capeUrl = decoded.textures.CAPE.url
          }
        }
      }
    } catch {
      // Continúa sin datos de sesión (opcional)
    }

    let nameHistory: { name: string; changedToAt?: number }[] = []
    try {
      const craftyRes = await fetch(`https://api.crafty.gg/api/v2/players/${cleanUuid}`, {
        headers: { 'User-Agent': 'Shodzery/1.0' },
        next: { revalidate: 600 },
      })
      if (craftyRes.ok) {
        const craftyData = await craftyRes.json()
        if (craftyData.data?.usernames) {
          nameHistory = craftyData.data.usernames.map(
            (u: { username: string; changed_at: string | null }) => ({
              name: u.username,
              changedToAt: u.changed_at ? new Date(u.changed_at).getTime() : undefined,
            }),
          )
        }
      }
    } catch {
      // Dato opcional
    }

    return NextResponse.json(
      {
        uuid: formatUUID(cleanUuid),
        uuidRaw: cleanUuid,
        name: profile.name,
        skin: {
          url: skinUrl || `https://mc-heads.net/skin/${cleanUuid}`,
          variant: skinVariant,
        },
        cape: capeUrl ? { url: capeUrl } : null,
        nameHistory,
        renders: {
          avatar: `https://crafatar.com/avatars/${cleanUuid}?size=256&overlay`,
          head: `https://crafatar.com/renders/head/${cleanUuid}?size=256&overlay`,
          body: `https://crafatar.com/renders/body/${cleanUuid}?size=256&overlay`,
        },
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      },
    )
  } catch (error) {
    console.error('[jugadores/perfil] error:', error)
    return NextResponse.json({ error: 'No se pudo obtener el perfil del jugador' }, { status: 500 })
  }
}
