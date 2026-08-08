import { NextResponse } from 'next/server'

/**
 * Autenticación de la API pública propia (`/api/v1/*`).
 *
 * Es intencionadamente simple: una única clave maestra guardada en
 * `SHODZERY_API_KEY`. Suficiente para proteger endpoints "importantes"
 * (los que consumen cuota de APIs externas o exponen datos agregados)
 * sin necesitar una base de datos de usuarios ni un panel de claves.
 *
 * El cliente debe enviar la clave en la cabecera `x-api-key`.
 * Si `SHODZERY_API_KEY` no está configurada, la API queda cerrada por
 * defecto (falla en modo seguro, no en modo abierto).
 *
 * NOTA: la comparación se implementa a mano (sin `node:crypto`) para
 * que este módulo funcione igual en rutas con `runtime = 'nodejs'`
 * (por defecto) y en rutas con `runtime = 'edge'`, donde los módulos
 * nativos de Node no están disponibles.
 */

const HEADER = 'x-api-key'

/** Compara dos cadenas en tiempo aproximadamente constante. */
function safeEqual(a: string, b: string): boolean {
  const bufA = new TextEncoder().encode(a)
  const bufB = new TextEncoder().encode(b)

  // Comparamos siempre contra un buffer del mismo tamaño que `a` para
  // que el número de iteraciones no dependa de la longitud de `b`.
  const length = bufA.length
  let diff = bufA.length === bufB.length ? 0 : 1

  for (let i = 0; i < length; i++) {
    diff |= bufA[i] ^ (bufB[i] ?? 0)
  }

  return diff === 0
}

/** Clave configurada en el entorno, o null si la API está deshabilitada. */
export function configuredApiKey(): string | null {
  const key = process.env.SHODZERY_API_KEY
  return key && key.length >= 16 ? key : null
}

export type ApiAuthResult =
  | { ok: true }
  | { ok: false; status: number; error: string }

/** Valida la cabecera `x-api-key` de una petición entrante. */
export function checkApiKey(request: Request): ApiAuthResult {
  const configured = configuredApiKey()

  if (!configured) {
    return {
      ok: false,
      status: 503,
      error: 'La API v1 no está configurada en este entorno (falta SHODZERY_API_KEY).',
    }
  }

  const provided = request.headers.get(HEADER)

  if (!provided) {
    return {
      ok: false,
      status: 401,
      error: `Falta la cabecera "${HEADER}" con tu clave de API.`,
    }
  }

  if (!safeEqual(provided, configured)) {
    return { ok: false, status: 401, error: 'Clave de API inválida.' }
  }

  return { ok: true }
}

/**
 * Envuelve un handler de ruta exigiendo una clave de API válida.
 * Devuelve un 401/503 con formato JSON consistente si falla.
 */
export function withApiKey<Args extends unknown[]>(
  handler: (request: Request, ...args: Args) => Promise<Response> | Response,
) {
  return async (request: Request, ...args: Args): Promise<Response> => {
    const auth = checkApiKey(request)

    if (!auth.ok) {
      return NextResponse.json(
        { error: auth.error },
        { status: auth.status, headers: { 'WWW-Authenticate': 'ApiKey' } },
      )
    }

    return handler(request, ...args)
  }
}
