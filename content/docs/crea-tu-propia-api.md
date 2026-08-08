---
title: "Crea tu propia API"
description: "Guía paso a paso para diseñar, autenticar y versionar una API propia sobre Next.js, aplicada a este proyecto."
category: "Guías avanzadas"
order: 1
updated: "2026-08-08"
---

## Por qué construir una API propia

Ya teníamos rutas en `app/api/*` que el sitio usa para sí mismo (buscar
un jugador, consultar un servidor…). Eso **no es lo mismo** que tener una
API propia: esas rutas no tienen clave, no garantizan un formato estable
y cualquiera podría llamarlas directamente desde el navegador sin que lo
notemos.

Una API propia de verdad necesita cuatro cosas:

1. **Un espacio de nombres versionado** (`/api/v1`) para poder cambiar el
   formato en el futuro sin romper a quien ya la usa.
2. **Autenticación**, aunque sea simple, para saber quién la usa y poder
   cerrarla si hace falta.
3. **Un formato de respuesta consistente** en todos los endpoints.
4. **Documentación**, que es literalmente esta página.

Esto es exactamente lo que hay ahora en `app/api/v1/`. El resto de esta
guía explica cómo se construyó, para que puedas replicar el patrón al
añadir un endpoint nuevo.

## 1. Elegir el modelo de autenticación

Para un proyecto de este tamaño, una base de datos de usuarios con
claves individuales es sobre-ingeniería. El punto intermedio que usamos:
**una única clave maestra guardada en una variable de entorno**,
`SHODZERY_API_KEY`, enviada por el cliente en la cabecera `x-api-key`.

```bash
# .env.local
SHODZERY_API_KEY="una-cadena-larga-y-aleatoria-de-al-menos-32-caracteres"
```

Genera una clave decente con:

```bash
openssl rand -hex 32
```

Si más adelante necesitas varias claves (una por integración, para poder
revocarlas por separado), el mismo patrón se extiende guardando un mapa
`{ clave: nombreDelCliente }` en una tabla o en Vercel KV en vez de una
única cadena — la lógica de comparación no cambia.

## 2. El módulo de autenticación

Toda la lógica vive en `lib/api-auth.ts`:

```ts
// lib/api-auth.ts (resumen)
import { timingSafeEqual } from 'node:crypto'

export function configuredApiKey(): string | null {
  const key = process.env.SHODZERY_API_KEY
  return key && key.length >= 16 ? key : null
}

export function checkApiKey(request: Request) {
  const configured = configuredApiKey()
  if (!configured) return { ok: false, status: 503, error: '...' }

  const provided = request.headers.get('x-api-key')
  if (!provided) return { ok: false, status: 401, error: '...' }
  if (!safeEqual(provided, configured)) return { ok: false, status: 401, error: '...' }

  return { ok: true }
}
```

Dos decisiones importantes:

- **`timingSafeEqual`** en vez de `===`: comparar cadenas con `===` filtra
  por temporización cuántos caracteres iniciales coinciden, lo que en
  teoría permite adivinar la clave carácter a carácter. `timingSafeEqual`
  compara en tiempo constante.
- **Falla cerrado**: si `SHODZERY_API_KEY` no está configurada, la API
  responde `503` (no configurada) en vez de dejar pasar todo. Es el mismo
  principio que ya usa `lib/docs-auth.ts` para el panel de administración.

## 3. Envolver los handlers con `withApiKey`

En vez de repetir la comprobación en cada endpoint, hay un envoltorio:

```ts
export function withApiKey(handler) {
  return async (request, ...args) => {
    const auth = checkApiKey(request)
    if (!auth.ok) {
      return NextResponse.json({ error: auth.error }, { status: auth.status })
    }
    return handler(request, ...args)
  }
}
```

Y cada ruta protegida se reduce a:

```ts
async function handler(request: Request) {
  // ... tu lógica
}

export const GET = withApiKey(handler)
```

## 4. Reutilizar la lógica interna en vez de duplicarla

Los endpoints de `/api/v1/*` **no reimplementan** las llamadas a Mojang,
mcsrvstat.us, etc. Internamente hacen `fetch` a la ruta interna
equivalente (`/api/jugadores/[nombre]`, `/api/servidores/[ip]`…) y
reenvuelven el resultado con el formato `{ data, meta }`:

```ts
// app/api/v1/jugadores/[nombre]/route.ts (resumen)
async function handler(request: Request, { params }) {
  const { nombre } = await params
  const origin = new URL(request.url).origin

  const upstream = await fetch(`${origin}/api/jugadores/${nombre}`)
  const body = await upstream.json()

  return NextResponse.json({
    data: body,
    meta: { version: 'v1', fetchedAt: new Date().toISOString() },
  })
}

export const GET = withApiKey(handler)
```

**Por qué así y no copiando el código**: si mañana cambia cómo se
consulta la skin de un jugador, solo hay que tocar un sitio
(`/api/jugadores/[nombre]`). La capa `v1` solo se preocupa de
autenticación, formato y versión — nunca de la integración externa en
sí.

## 5. El manifiesto público

`GET /api/v1` no requiere clave a propósito. Devuelve la lista de
endpoints disponibles, para que cualquiera pueda ver qué existe antes de
pedir acceso — igual que hace esta misma página de documentación, pero
en formato máquina:

```json
{
  "name": "Shodzery API",
  "version": "v1",
  "endpoints": [
    { "method": "GET", "path": "/api/v1/jugadores/{nombre}", "description": "..." }
  ]
}
```

## 6. Añadir un endpoint nuevo: receta

Cuando quieras exponer algo nuevo bajo `v1` (por ejemplo, la wiki):

1. Crea `app/api/v1/wiki/[categoria]/route.ts`.
2. Dentro, haz `fetch` al endpoint interno equivalente
   (`/api/wiki/[categoria]`) y reenvuelve la respuesta como
   `{ data, meta }`.
3. Exporta el handler envuelto con `withApiKey`.
4. Añade la ruta al manifiesto (`app/api/v1/route.ts`).
5. Documéntala aquí, en `/docs`, con petición y respuesta de ejemplo.

Cinco pasos, siempre los mismos, para que la API crezca de forma
predecible.

## 7. Lo que falta si esto crece de verdad

Esta implementación es deliberadamente simple. Si la API empieza a
tener uso real de terceros, los siguientes pasos naturales son:

- **Rate limiting** por clave, con Vercel KV o Upstash Redis (ahora
  mismo no hay límite de peticiones más allá de la caché).
- **Claves por cliente** en vez de una única clave maestra, para poder
  revocar el acceso de uno sin afectar a los demás.
- **Métricas de uso** (peticiones por endpoint y por clave) para saber
  qué merece la pena optimizar o cachear más agresivamente.

Ninguno de los tres es necesario para empezar, y añadirlos no rompe el
patrón `withApiKey` + `{ data, meta }` que ya está en marcha: se insertan
como capas adicionales dentro del propio envoltorio.

## Referencia rápida de lo que ya existe

Toda la lista de endpoints disponibles hoy está en
[Resumen de la API](/docs/api-resumen), con ejemplos de petición y
respuesta para cada uno.
