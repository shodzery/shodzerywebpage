---
title: "Arquitectura del sitio"
description: "Cómo encajan el front-end, el sistema de documentación y las integraciones externas."
category: "Empezar"
order: 2
updated: "2026-08-08"
---

## Vista general

El sitio es una única aplicación **Next.js (App Router)**, con tres capas
que conviene distinguir:

| Capa | Dónde vive | Responsabilidad |
| --- | --- | --- |
| Páginas | `app/**/page.tsx` | Renderizado (Server Components por defecto) |
| API interna | `app/api/**/route.ts` | Proxy y normalización de servicios externos |
| API pública v1 | `app/api/v1/**/route.ts` | La misma información, versionada y con clave de acceso |

## Por qué hay dos "capas" de API

`app/api/*` (sin `v1`) existe **para que el propio front-end del sitio
consuma datos**: la página de jugadores llama a `/api/jugadores/[nombre]`,
la de servidores a `/api/servidores/[ip]`, etc. No están pensadas para
que terceros las consuman directamente: no tienen clave, ni un formato de
respuesta estable garantizado a largo plazo.

`app/api/v1/*` es la **API pública real**: mismo dato, pero:

- Requiere una clave (`x-api-key`).
- Tiene un formato de respuesta estable: `{ data, meta }`.
- Está versionada (`v1`), así que si el formato cambia algún día, se
  publicará como `v2` sin romper a quien ya la usa.

La guía [Crea tu propia API](/docs/crea-tu-propia-api) explica cómo se
construyó esta segunda capa y cómo añadir un endpoint nuevo siguiendo el
mismo patrón.

## Sistema de documentación

Este apartado (`/docs`) es un pequeño CMS propio, no un generador de
sitios estático externo:

- Cada documento es un archivo Markdown con *frontmatter* (`title`,
  `description`, `category`, `order`).
- En local se guardan en `content/docs/*.md`.
- En producción (Vercel) se guardan en **Vercel Blob Storage**, porque el
  sistema de archivos de las funciones serverless es de solo lectura.
- `/docs/admin` es el editor, protegido con una contraseña de un único
  administrador (`lib/docs-auth.ts`), usando una cookie firmada con
  HMAC-SHA256 y comparación en tiempo constante.

## Datos externos que se consumen

| Servicio | Para qué |
| --- | --- |
| Mojang API / sessionserver | Perfil, skin y capa de un jugador |
| PlayerDB | Alternativa si Mojang no responde |
| Crafty.gg | Historial de nombres |
| mcsrvstat.us | Estado en vivo de servidores Java/Bedrock |
| minecraft.wiki / mcdata | Contenido de la wiki |
| launchercontent.mojang.com | Changelogs y novedades oficiales |

Ninguno de estos servicios requiere clave por nuestra parte; todos se
consultan de forma anónima y se cachean con `revalidate` para no abusar
de ellos.
