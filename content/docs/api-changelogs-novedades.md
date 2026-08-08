---
title: "Referencia · Changelogs y novedades"
description: "Notas de parche oficiales y últimas noticias de Minecraft/Mojang."
category: "API"
order: 4
updated: "2026-08-08"
---

## Changelogs

```
GET /api/v1/changelogs?type=java|bedrock
GET /api/v1/changelogs?id=<contentPath>
```

Sin `id`, devuelve el índice completo de notas de parche de la edición
indicada (por defecto `java`). Con `id` (el `contentPath` de una entrada
del índice), devuelve el contenido completo de esa nota.

```bash
curl "https://tu-dominio.com/api/v1/changelogs?type=bedrock" \
  -H "x-api-key: TU_CLAVE"
```

```json
{
  "data": {
    "entries": [
      { "title": "1.21.5", "version": "1.21.5", "type": "release", "contentPath": "..." }
    ]
  },
  "meta": { "version": "v1", "fetchedAt": "2026-08-08T12:00:00.000Z" }
}
```

## Novedades

```
GET /api/v1/novedades
```

Sin parámetros. Devuelve los artículos más recientes de minecraft.net
(RSS) y del launcher oficial, deduplicados y ordenados por fecha
descendente. No se cachea en servidor (`cache: 'no-store'`), porque es
contenido que cambia varias veces al día.

```json
{
  "data": {
    "articles": [
      {
        "id": "minecraft-1-21-5",
        "title": "Minecraft 1.21.5 ya está disponible",
        "category": "Java Edition",
        "publishDate": "2026-08-01T10:00:00.000Z",
        "url": "https://www.minecraft.net/en-us/article/..."
      }
    ],
    "count": 24
  },
  "meta": { "version": "v1", "fetchedAt": "2026-08-08T12:00:00.000Z" }
}
```

Ambos endpoints requieren la cabecera `x-api-key`, igual que el resto de
la API v1.
