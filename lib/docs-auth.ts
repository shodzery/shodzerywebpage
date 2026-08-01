import { cookies } from 'next/headers'
import { createHmac, timingSafeEqual } from 'node:crypto'

/**
 * Autenticación mínima para el editor de documentación.
 * Solo hay un administrador y su clave vive en DOCS_ADMIN_PASSWORD.
 * La cookie guarda una firma HMAC, nunca la contraseña.
 */

const COOKIE = 'docs_session'
const MAX_AGE = 60 * 60 * 8 // 8 horas

function secret(): string | null {
  const password = process.env.DOCS_ADMIN_PASSWORD
  return password && password.length > 0 ? password : null
}

function sign(password: string): string {
  return createHmac('sha256', password).update('docs-admin-v1').digest('hex')
}

/** Compara dos cadenas en tiempo constante. */
function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a)
  const bufB = Buffer.from(b)
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB)
}

/** Indica si la contraseña de admin está configurada en el entorno. */
export function isAdminConfigured(): boolean {
  return secret() !== null
}

/** Comprueba si la petición actual pertenece a un administrador. */
export async function isAdmin(): Promise<boolean> {
  const password = secret()
  if (!password) return false

  const token = (await cookies()).get(COOKIE)?.value
  return typeof token === 'string' && safeEqual(token, sign(password))
}

/** Valida la contraseña recibida y abre la sesión. */
export async function login(candidate: string): Promise<boolean> {
  const password = secret()
  if (!password || !safeEqual(candidate, password)) return false

  ;(await cookies()).set(COOKIE, sign(password), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: MAX_AGE,
  })

  return true
}

/** Cierra la sesión de administrador. */
export async function logout(): Promise<void> {
  ;(await cookies()).delete(COOKIE)
}
