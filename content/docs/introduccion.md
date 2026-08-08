---
title: "Introducción"
description: "Qué es Shodzery, cómo está organizado el sitio y por dónde empezar."
category: "Empezar"
order: 1
updated: "2026-08-08"
---

## Qué es este sitio

Shodzery es a la vez un portafolio profesional y un pequeño conjunto de
herramientas públicas sobre Minecraft: búsqueda de jugadores, estado de
servidores, wiki, changelogs oficiales y novedades. Esta sección de
documentación cubre dos cosas distintas:

1. **Referencia**: cómo funcionan las herramientas y los endpoints que ya
   existen en el sitio.
2. **Guías**: cómo construir cosas nuevas sobre esta base, empezando por
   [cómo crear tu propia API](/docs/crea-tu-propia-api).

## Cómo está organizada la documentación

- **Empezar** — esta categoría. Introducción y arquitectura general.
- **API** — referencia de cada endpoint público: qué recibe, qué devuelve y
  cómo probarlo.
- **Guías avanzadas** — tutoriales más largos, como el de crear una API
  propia con autenticación y versionado.

Puedes navegar por categoría con el menú lateral, o pulsar `Ctrl K`
(`Cmd K` en Mac) para buscar por título, descripción o categoría en
cualquier momento.

## Requisitos para seguir las guías técnicas

Las guías asumen que ya tienes el proyecto corriendo en local:

```bash
pnpm install
pnpm dev
```

Y que tienes nociones básicas de **TypeScript**, **Next.js (App Router)**
y **Route Handlers** (los archivos `route.ts` dentro de `app/api/`). Si
algo de eso no te suena, no pasa nada: cada guía explica el porqué antes
del cómo.

## Este apartado es editable

Todo lo que ves aquí vive como Markdown y se edita desde
`/docs/admin` con la contraseña de administrador (`DOCS_ADMIN_PASSWORD`
en las variables de entorno). Puedes reescribir, ampliar o borrar
cualquier documento, incluido este.
