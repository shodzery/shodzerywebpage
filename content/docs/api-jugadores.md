---
title: "Referencia · Jugadores"
description: "Consulta el perfil, la skin y el historial de nombres de cualquier cuenta de Minecraft."
category: "API"
order: 2
updated: "2026-08-08"
---

## Endpoint

```
GET /api/v1/jugadores/{nombre}
```

Requiere la cabecera `x-api-key`. Ver [Crea tu propia API](/docs/crea-tu-propia-api)
para saber cómo se genera y se envía.

## Parámetros

| Parámetro | Tipo | Descripción |
| --- | --- | --- |
| `nombre` | ruta | Nombre de usuario de Minecraft, entre 2 y 16 caracteres |

## Ejemplo de petición

```bash
curl "https://tu-dominio.com/api/v1/jugadores/Notch" \
  -H "x-api-key: TU_CLAVE"
```

## Ejemplo de respuesta

```json
{
  "data": {
    "uuid": "069a79f4-44e9-4726-a5be-fca90e38aaf5",
    "uuidRaw": "069a79f444e94726a5befca90e38aaf5",
    "name": "Notch",
    "role": null,
    "skin": { "url": "https://textures.minecraft.net/texture/...", "variant": "classic" },
    "cape": { "url": "https://textures.minecraft.net/texture/..." },
    "nameHistory": [{ "name": "Notch" }],
    "renders": {
      "avatar": "https://crafatar.com/avatars/069a79f4...",
      "head": "https://crafatar.com/renders/head/069a79f4...",
      "body": "https://crafatar.com/renders/body/069a79f4..."
    }
  },
  "meta": { "version": "v1", "fetchedAt": "2026-08-08T12:00:00.000Z" }
}
```

## Errores

| Código | Cuándo ocurre |
| --- | --- |
| `400` | El nombre no tiene entre 2 y 16 caracteres |
| `404` | No existe ninguna cuenta con ese nombre |
| `401` | Clave de API ausente o inválida |

## De dónde salen los datos

Este endpoint combina tres fuentes, en este orden: la API de perfiles de
Mojang, `sessionserver.mojang.com` (skin y capa) y, si Mojang no
responde, PlayerDB como respaldo. El historial de nombres viene de
Crafty.gg. Todo se cachea 5 minutos (`revalidate = 300`).
