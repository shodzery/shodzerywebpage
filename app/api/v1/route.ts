import { NextResponse } from 'next/server'
import { configuredApiKey } from '@/lib/api-auth'

export const runtime = 'edge'

/**
 * GET /api/v1
 *
 * Manifiesto público de la API de Shodzery. No requiere clave: sirve
 * para que cualquiera descubra qué endpoints existen antes de pedir
 * una clave de acceso. El resto de rutas bajo /api/v1 sí requieren
 * la cabecera `x-api-key`.
 */
export async function GET() {
  return NextResponse.json({
    name: 'Shodzery API',
    version: 'v1',
    status: configuredApiKey() ? 'operational' : 'not_configured',
    documentation: '/docs/crea-tu-propia-api',
    authentication: {
      type: 'apiKey',
      header: 'x-api-key',
      note: 'Todas las rutas de /api/v1 excepto esta requieren una clave válida.',
    },
    endpoints: [
      {
        method: 'GET',
        path: '/api/v1/jugadores/{nombre}',
        description: 'Perfil completo de un jugador de Minecraft (UUID, skin, capa, historial de nombres).',
      },
      {
        method: 'GET',
        path: '/api/v1/servidores/{ip}',
        description: 'Estado en vivo de un servidor de Minecraft Java o Bedrock.',
      },
      {
        method: 'GET',
        path: '/api/v1/changelogs?type=java|bedrock',
        description: 'Notas de parche oficiales de Mojang.',
      },
      {
        method: 'GET',
        path: '/api/v1/novedades',
        description: 'Últimas noticias oficiales de Minecraft y Mojang, unificadas y ordenadas por fecha.',
      },
    ],
  })
}
