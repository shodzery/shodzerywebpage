---
title: "Resumen de la API"
description: "Todos los endpoints públicos de Shodzery de un vistazo: internos y versión v1 con clave."
category: "API"
order: 1
updated: "2026-08-08"
---

## Dos formas de consumir los datos

| | API interna (`/api/*`) | API pública v1 (`/api/v1/*`) |
| --- | --- | --- |
| Pensada para | El propio front-end del sitio | Terceros, bots, otras apps |
| Autenticación | Ninguna | Clave en cabecera `x-api-key` |
| Formato de respuesta | Varía por endpoint | Siempre `{ data, meta }` |
| Estabilidad | Puede cambiar sin aviso | Versionada (`v1`, luego `v2`, …) |

Si estás construyendo algo fuera de este repositorio (un bot de Discord,
otra web, una app), usa siempre **`/api/v1`**. La guía
[Crea tu propia API](/docs/crea-tu-propia-api) explica cómo se diseñó y
cómo pedir/usar una clave.

## Endpoints disponibles hoy

### Jugadores

```
GET /api/v1/jugadores/{nombre}
```

Perfil completo: UUID, skin, capa e historial de nombres. Ver
[Referencia · Jugadores](/docs/api-jugadores).

### Servidores

```
GET /api/v1/servidores/{ip}
```

Estado en vivo de un servidor Java o Bedrock. Ver
[Referencia · Servidores](/docs/api-servidores).

### Changelogs

```
GET /api/v1/changelogs?type=java|bedrock
GET /api/v1/changelogs?id=<contentPath>
```

Notas de parche oficiales de Mojang.

### Novedades

```
GET /api/v1/novedades
```

Últimas noticias de minecraft.net y del launcher, unificadas y ordenadas
por fecha.

### Manifiesto (sin clave)

```
GET /api/v1
```

Devuelve la lista de endpoints disponibles y el estado de la API. Es el
único endpoint de `v1` que **no** requiere clave — pensado para que
cualquiera pueda descubrir qué existe antes de pedir acceso.

## Formato de respuesta

Toda respuesta autenticada de `v1` sigue esta forma:

```json
{
  "data": { "...": "el mismo cuerpo que devuelve el endpoint interno" },
  "meta": {
    "version": "v1",
    "fetchedAt": "2026-08-08T12:00:00.000Z"
  }
}
```

Y los errores, este otro:

```json
{ "error": "Descripción legible del problema" }
```

## Códigos de estado

| Código | Significa |
| --- | --- |
| `200` | Todo bien |
| `401` | Falta la cabecera `x-api-key` o la clave es inválida |
| `404` | El recurso pedido no existe (p. ej. un jugador que no existe) |
| `503` | La API v1 no está configurada en este entorno |
