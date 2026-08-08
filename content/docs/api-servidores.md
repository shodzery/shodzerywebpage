---
title: "Referencia · Servidores"
description: "Comprueba en vivo si un servidor Java o Bedrock está en línea."
category: "API"
order: 3
updated: "2026-08-08"
---

## Endpoint

```
GET /api/v1/servidores/{ip}
```

Requiere la cabecera `x-api-key`.

## Parámetros

| Parámetro | Tipo | Descripción |
| --- | --- | --- |
| `ip` | ruta | Dirección o dominio del servidor, con puerto opcional (`play.ejemplo.com` o `play.ejemplo.com:25565`) |

## Ejemplo de petición

```bash
curl "https://tu-dominio.com/api/v1/servidores/hypixel.net" \
  -H "x-api-key: TU_CLAVE"
```

## Ejemplo de respuesta

```json
{
  "data": {
    "online": true,
    "ip": "hypixel.net",
    "port": 25565,
    "version": "1.8-1.21.x",
    "players": { "online": 42000, "max": 200000 },
    "motd": { "clean": ["Hypixel Network"] }
  },
  "meta": { "version": "v1", "fetchedAt": "2026-08-08T12:00:00.000Z" }
}
```

Si el servidor está apagado o la IP no responde, `data.online` es
`false` en vez de devolver un error — así puedes mostrar el estado
"offline" directamente sin manejar un caso de error aparte.

## De dónde salen los datos

Este endpoint consulta [mcsrvstat.us](https://mcsrvstat.us), un servicio
público de terceros. Se cachea 60 segundos.
