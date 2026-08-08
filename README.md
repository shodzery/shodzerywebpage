# 🟪 Shodzery — Portafolio & Panel Profesional

> **Desarrollador y Configurador Profesional de Servidores Minecraft.**
> Web personal construida con **Next.js 16 (App Router)**, **React 19**, **TypeScript** y **Tailwind CSS 4**, pensada como un portafolio técnico completo: presentación profesional, catálogo de servicios, stack tecnológico, proyectos, integración en vivo con GitHub, sistema de documentación con panel de administración, y un formulario de contacto que genera automáticamente un mensaje de Discord.

<p align="center">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16.2.6-black?logo=next.js">
  <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white">
  <img alt="TailwindCSS" src="https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwindcss&logoColor=white">
  <img alt="Licencia" src="https://img.shields.io/badge/Licencia-Todos_los_derechos_reservados-red">
</p>

---

## 📚 Tabla de contenidos

1. [¿Qué es este proyecto?](#-qué-es-este-proyecto)
2. [Características principales](#-características-principales)
3. [Stack tecnológico](#-stack-tecnológico)
4. [Estructura del proyecto](#-estructura-del-proyecto)
5. [Mapa completo del sitio (páginas y rutas)](#-mapa-completo-del-sitio-páginas-y-rutas)
6. [Componentes principales](#-componentes-principales)
7. [Sistema de documentación (`/docs`)](#-sistema-de-documentación-docs)
8. [Panel de administración de docs (`/docs/admin`)](#-panel-de-administración-de-docs-docsadmin)
9. [Integración en vivo con GitHub](#-integración-en-vivo-con-github)
10. [Visor 3D de skin de Minecraft](#-visor-3d-de-skin-de-minecraft)
11. [Formulario de contacto vía Discord](#-formulario-de-contacto-vía-discord)
12. [Fuente única de contenido: `data/portfolio.ts`](#-fuente-única-de-contenido-dataportfolioTs)
13. [Variables de entorno](#-variables-de-entorno)
14. [Instalación y puesta en marcha](#-instalación-y-puesta-en-marcha)
15. [Scripts disponibles](#-scripts-disponibles)
16. [Despliegue en Vercel](#-despliegue-en-vercel)
17. [Seguridad](#-seguridad)
18. [SEO y metadatos](#-seo-y-metadatos)
19. [Rendimiento](#-rendimiento)
20. [Accesibilidad y diseño responsive](#-accesibilidad-y-diseño-responsive)
21. [Personalización rápida](#-personalización-rápida)
22. [Preguntas frecuentes del propio repositorio](#-preguntas-frecuentes-del-propio-repositorio)
23. [Derechos de autor y licencia](#-derechos-de-autor-y-licencia)
24. [Aviso legal y denuncias por uso no autorizado](#-aviso-legal-y-denuncias-por-uso-no-autorizado)
25. [Contacto](#-contacto)

---

## 🧩 ¿Qué es este proyecto?

**Shodzery** es un sitio web personal de tipo **portafolio profesional** dirigido a un desarrollador especializado en el ecosistema de **Minecraft**: desarrollo de **plugins** (API de Paper), **mods** (Fabric, NeoForge, Forge), configuración de **servidores** de alto rendimiento, arquitectura de **redes con Velocity**, optimización extrema de **TPS, RAM y CPU**, y soluciones a medida (paneles web, bases de datos, bots de Discord, sistemas RPG, etc.).

No es una plantilla genérica: es una aplicación **Next.js** completa, con renderizado híbrido (Server Components + Client Components), rutas dinámicas, Server Actions, autenticación por cookies firmadas, integración con una API externa en tiempo real (GitHub) y un **sistema propio de documentación tipo CMS** basado en archivos Markdown, editable desde un panel de administración protegido por contraseña.

El sitio está en **español** (`lang="es"`) y todo el contenido textual vive centralizado en un único archivo de datos (`data/portfolio.ts`), lo que permite reescribir el sitio completo sin tocar ni un componente visual.

---

## ✨ Características principales

- 🏠 **Landing profesional** con hero animado, sección "sobre mí", panel tipo dashboard con métricas, catálogo de servicios, stack de tecnologías, especialidades, proyectos destacados, motivos para contratar, flujo de trabajo y llamada a la acción final.
- 🧭 **12 rutas de navegación** completas: Inicio, Sobre mí, Servicios, Tecnologías, Stack, Proyectos, GitHub, Actividad, Experiencia, Docs, FAQ y Contacto.
- 🐙 **Integración en vivo con la API pública de GitHub**: repositorios, lenguajes usados, estrellas, forks, topics y estadísticas del perfil, calculadas en el servidor y revalidadas cada hora (`revalidate = 3600`).
- 📖 **Sistema de documentación propio** (no es un framework externo tipo Docusaurus/Nextra): lee archivos Markdown con *frontmatter* (`gray-matter`), los agrupa por categoría y los renderiza con `react-markdown` + `remark-gfm` (tablas, listas de tareas, etc.). Incluye buscador con atajo `Ctrl K`, sidebar con icono por categoría y tabla de contenidos "En esta página" con scroll-spy.
- 🔑 **API pública propia y versionada** (`/api/v1`), autenticada con clave (`x-api-key`) y formato de respuesta estable `{ data, meta }`, separada de las rutas internas que usa el propio front-end. Documentada paso a paso en `/docs/crea-tu-propia-api`.
- 🔐 **Panel de administración** en `/docs/admin` para crear, editar y borrar documentación, protegido con una contraseña de un único administrador, mediante cookies firmadas con **HMAC-SHA256** y comparación en tiempo constante (`timingSafeEqual`) para evitar *timing attacks*.
- ☁️ **Almacenamiento híbrido**: en desarrollo local los documentos se guardan como archivos `.md` en `content/docs/`; en producción (Vercel) se guardan automáticamente en **Vercel Blob Storage**, porque el sistema de archivos de las funciones serverless es de solo lectura.
- 🧙 **Visor 3D interactivo de la skin de Minecraft** del propietario del sitio, renderizado con `skinview3d` sobre un `<canvas>`, con animación, rotación con el ratón y *fallback* automático si la skin no se puede cargar.
- 💬 **Formulario de contacto inteligente**: no envía correos ni usa un backend externo — genera un mensaje pre-formateado con los datos del proyecto (versión de Minecraft, tipo de servidor, presupuesto, urgencia, descripción, etc.) listo para copiar y enviar por Discord, además de un botón para copiar el usuario/ID de Discord directamente.
- 📈 **Línea de tiempo de actividad y hoja de ruta** (`changelog` + `roadmap`) para mostrar avances de herramientas internas y funcionalidades en construcción.
- ❓ **Sección de preguntas frecuentes** reutilizable, presente tanto en su propia página como en la de contacto.
- 🗣️ **Testimonios** de clientes/colaboradores.
- 🎨 **Modo oscuro nativo** (`colorScheme: 'dark'`), efectos de fondo animados (`background-effects.tsx`), tipografías personalizadas (Space Grotesk + Pixelify Sans vía `next/font/google`) y animaciones fluidas con **Framer Motion**.
- 📊 **Analítica de uso** con `@vercel/analytics`, activada únicamente en producción.
- 🔝 **Botón "volver arriba"**, pantalla de carga inicial (`loading-screen.tsx`) y cabeceras HTTP de seguridad configuradas a nivel de servidor.
- 🧱 Construido íntegramente con **componentes de shadcn/ui** y utilidades de **Radix/Base UI**, `class-variance-authority` y `tailwind-merge` para una librería de componentes coherente y accesible.

---

## 🛠️ Stack tecnológico

### Núcleo del framework

| Tecnología | Versión | Uso |
|---|---|---|
| **Next.js** | `16.2.6` | Framework principal (App Router, Server Components, Server Actions, rutas dinámicas, revalidación) |
| **React** | `^19` | Librería de UI |
| **React DOM** | `^19` | Renderizado en el DOM |
| **TypeScript** | `5.7.3` | Tipado estático en todo el proyecto |

### Estilos y UI

| Tecnología | Uso |
|---|---|
| **Tailwind CSS 4** | Sistema de estilos utilitario (vía `@tailwindcss/postcss`) |
| **tw-animate-css** | Animaciones utilitarias adicionales sobre Tailwind |
| **shadcn** (`shadcn@4.8.0`) + `components.json` | Generador/registro de componentes de UI reutilizables |
| **@base-ui/react** | Primitivos de UI accesibles (headless) |
| **class-variance-authority (CVA)** | Variantes de estilos tipadas para componentes |
| **clsx** + **tailwind-merge** | Combinación segura de clases condicionales |
| **lucide-react** | Iconografía principal (SVG) |
| **react-icons** | Iconos adicionales (por ejemplo, el logo de Discord) |
| **Framer Motion** | Animaciones de entrada, transiciones y micro-interacciones |

### Contenido y documentación

| Tecnología | Uso |
|---|---|
| **gray-matter** | Parseo del *frontmatter* YAML de los archivos Markdown de `/docs` |
| **react-markdown** | Renderizado de Markdown a componentes React |
| **remark-gfm** | Soporte de GitHub Flavored Markdown (tablas, checklist, etc.) |
| **@vercel/blob** | Almacenamiento persistente de documentos Markdown en producción (Vercel Blob Storage) |

### Otros

| Tecnología | Uso |
|---|---|
| **skinview3d** | Renderizado 3D interactivo de skins de Minecraft en `<canvas>` |
| **@vercel/analytics** | Analítica de visitas (solo en producción) |
| **node:crypto (HMAC + timingSafeEqual)** | Autenticación segura del panel de administración, sin librerías externas |
| **pnpm** | Gestor de paquetes (workspace configurado en `pnpm-workspace.yaml`) |

---

## 📁 Estructura del proyecto

```
shodzery/
├── app/                        # App Router de Next.js (páginas y rutas)
│   ├── layout.tsx              # Layout raíz: fuentes, metadatos globales, Navbar, Footer, Analytics
│   ├── page.tsx                # Página de inicio ("/")
│   ├── globals.css             # Estilos globales y tokens de diseño (Tailwind 4)
│   ├── sobre-mi/page.tsx        # "/sobre-mi"
│   ├── servicios/page.tsx       # "/servicios"
│   ├── tecnologias/page.tsx     # "/tecnologias"
│   ├── stack/page.tsx           # "/stack"
│   ├── proyectos/page.tsx       # "/proyectos"
│   ├── github/page.tsx          # "/github"  (integración con la API de GitHub)
│   ├── actividad/page.tsx       # "/actividad" (changelog + roadmap)
│   ├── experiencia/page.tsx     # "/experiencia"
│   ├── faq/page.tsx             # "/faq"
│   ├── contacto/page.tsx        # "/contacto"
│   └── docs/
│       ├── page.tsx             # "/docs" — índice de documentación
│       ├── [slug]/page.tsx      # "/docs/[slug]" — documento individual
│       └── admin/
│           ├── page.tsx         # "/docs/admin" — login + panel de gestión
│           ├── nuevo/page.tsx   # "/docs/admin/nuevo" — crear documento
│           ├── [slug]/page.tsx  # "/docs/admin/[slug]" — editar documento
│           └── actions.ts       # Server Actions: login, logout, guardar, borrar
│
├── components/                 # Componentes de React reutilizables
│   ├── navbar.tsx               # Barra de navegación (con los 12 navLinks)
│   ├── footer.tsx
│   ├── hero.tsx                 # Sección principal de la portada
│   ├── about.tsx                # Sección "sobre mí"
│   ├── dashboard.tsx            # Panel de métricas tipo dashboard
│   ├── services.tsx              # Catálogo de servicios
│   ├── skills.tsx                # Tecnologías/habilidades
│   ├── specialties.tsx           # Especialidades técnicas
│   ├── projects.tsx              # Grid de proyectos
│   ├── why-me.tsx                # Motivos para contratar
│   ├── workflow.tsx              # Proceso de trabajo paso a paso
│   ├── cta-band.tsx              # Banda de llamada a la acción
│   ├── experience.tsx            # Línea de trayectoria profesional
│   ├── activity-timeline.tsx     # Changelog + roadmap
│   ├── github-repos.tsx          # Renderizado de repos/lenguajes de GitHub
│   ├── contact.tsx               # Formulario de contacto → generador de mensaje Discord
│   ├── faq-section.tsx           # Preguntas frecuentes
│   ├── testimonials.tsx          # Testimonios
│   ├── tech-stack.tsx            # Arquitectura por capas del stack
│   ├── minecraft-skin-viewer.tsx # Visor 3D de la skin (skinview3d)
│   ├── background-effects.tsx    # Efectos visuales de fondo
│   ├── loading-screen.tsx        # Pantalla de carga inicial
│   ├── back-to-top.tsx           # Botón flotante "volver arriba"
│   ├── animated-number.tsx       # Contadores numéricos animados
│   ├── page-header.tsx           # Cabecera reutilizable de páginas internas
│   ├── section-heading.tsx       # Encabezados de sección reutilizables
│   ├── icon-registry.tsx         # Registro central de iconos por nombre (string → componente)
│   ├── docs/                     # Componentes específicos del sistema de documentación
│   └── ui/                       # Componentes base de shadcn/ui
│
├── lib/                         # Lógica de negocio y utilidades del servidor
│   ├── github.ts                 # Cliente de la API pública de GitHub + cálculo de estadísticas
│   ├── docs.ts                   # Lectura/escritura de documentos (disco local o Vercel Blob)
│   ├── docs-shared.ts             # Tipos y funciones puras de docs (slugify, agrupar, serializar)
│   ├── docs-auth.ts               # Autenticación del panel admin (HMAC + cookies)
│   └── utils.ts                   # Utilidades genéricas (p. ej. combinación de clases)
│
├── data/
│   └── portfolio.ts              # ⭐ FUENTE ÚNICA DE CONTENIDO de todo el sitio
│
├── content/
│   └── docs/                     # Documentos Markdown (modo desarrollo local)
│
├── public/                       # Activos estáticos (iconos, imágenes de proyectos, etc.)
│
├── next.config.mjs               # Configuración de Next.js (headers de seguridad, imágenes, TS)
├── components.json               # Configuración de shadcn/ui
├── tsconfig.json                 # Configuración de TypeScript
├── postcss.config.mjs            # Configuración de PostCSS/Tailwind
├── pnpm-workspace.yaml           # Workspace de pnpm
├── package.json
└── .env.local                    # Variables de entorno locales (NO se sube al repositorio)
```

---

## 🗺️ Mapa completo del sitio (páginas y rutas)

| Ruta | Descripción |
|---|---|
| `/` | Página de inicio: hero, sobre mí, dashboard, 6 servicios destacados, tecnologías, especialidades, 3 proyectos destacados, motivos para contratar, flujo de trabajo y banda de contacto. |
| `/sobre-mi` | Perfil detallado, panel de métricas, motivos para contratar y testimonios. |
| `/servicios` | Catálogo completo de servicios (desarrollo de plugins/mods, configuración, redes, optimización, seguridad, migraciones, automatización y desarrollo web) junto con especialidades y flujo de trabajo. |
| `/tecnologias` | Lenguajes, núcleos de servidor, plugins premium, proxies, herramientas de rendimiento, bases de datos e integraciones, con conteo total de tecnologías y versiones de Minecraft soportadas. |
| `/stack` | Arquitectura técnica **por capas**: red/proxy, núcleos de servidor, contenido, datos y capa web, explicando cómo se estructura un proyecto completo. |
| `/proyectos` | Casos técnicos representativos (plugins a medida, redes Velocity, sistemas RPG, auditorías de rendimiento, paneles web) y testimonios. |
| `/github` | Estadísticas **en vivo** del perfil de GitHub configurado: avatar, bio, ubicación, repositorios, lenguajes, estrellas, forks y topics, obtenidos directamente desde `api.github.com`. |
| `/actividad` | Changelog de herramientas internas + hoja de ruta (roadmap) de lo que está en construcción. |
| `/experiencia` | Trayectoria profesional por roles dentro del ecosistema Minecraft. |
| `/docs` | Índice de toda la documentación técnica publicada, agrupada por categorías. |
| `/docs/[slug]` | Vista de un documento individual en Markdown renderizado. |
| `/docs/admin` | Panel de login y gestión (crear/editar/borrar documentos) — **protegido por contraseña**. |
| `/docs/admin/nuevo` | Formulario para crear un documento nuevo. |
| `/docs/admin/[slug]` | Formulario para editar un documento existente. |
| `/faq` | Preguntas frecuentes sobre versiones soportadas, desarrollo, optimización, migraciones y soporte. |
| `/contacto` | Formulario que genera un mensaje listo para Discord + FAQ + datos de contacto directo. |

---

## 🧱 Componentes principales

- **`navbar.tsx`** — Navegación principal, construida dinámicamente a partir de `navLinks` en `data/portfolio.ts`. Incluye estado activo por ruta y versión responsive (menú móvil).
- **`icon-registry.tsx`** — Permite referenciar iconos de `lucide-react` por **nombre en texto** (por ejemplo `icon="Activity"` en el *frontmatter* de una página), desacoplando el contenido de las importaciones de componentes.
- **`page-header.tsx`** — Cabecera reutilizable para páginas internas: icono, "eyebrow" (etiqueta pequeña tipo `{ contacto }`), título, descripción y metadatos opcionales.
- **`dashboard.tsx`** + **`animated-number.tsx`** — Panel de métricas con animación de conteo ascendente, alimentado por `dashboardMetrics` en `data/portfolio.ts`.
- **`activity-timeline.tsx`** — Renderiza dos listas (`changelog` y `roadmap`) como una línea de tiempo visual.
- **`github-repos.tsx`** — Consume los datos servidos por `lib/github.ts` y los pinta como tarjetas de repositorio con colores de lenguaje (`languageColor`), estrellas, forks y fecha relativa (`relativeDate`, en español: "hoy", "ayer", "hace X días/meses/años").
- **`minecraft-skin-viewer.tsx`** — Componente cliente (`'use client'`) que monta un visor 3D con `skinview3d`, gestiona estados de carga/error y aplica una URL de skin primaria (`mc-heads.net`) con una de repuesto (`minotar.net`).
- **`contact.tsx`** — Componente cliente con estado local (`useState`) que:
  1. Recoge los datos del proyecto del usuario a través de un formulario.
  2. Construye un mensaje de texto formateado.
  3. Permite copiarlo al portapapeles (con *fallback* manual vía `document.execCommand('copy')` para navegadores sin soporte de la Clipboard API).
  4. Muestra el usuario e ID de Discord del propietario, también copiables.
- **`components/docs/`** — Subcarpeta con los componentes específicos del sistema de documentación: barra lateral (`docs-sidebar`), renderizado de Markdown, formularios de edición, etc.
- **`components/ui/`** — Componentes base generados/gestionados con **shadcn/ui**.

---

## 📖 Sistema de documentación (`/docs`)

Este proyecto **no depende de un framework de documentación externo**. Implementa su propio motor ligero en `lib/docs.ts` y `lib/docs-shared.ts`:

- Cada documento es un archivo `.md` con **frontmatter YAML**:

  ```md
  ---
  title: Cómo instalar un plugin
  description: Guía paso a paso.
  category: Plugins
  order: 1
  cover: /docs/mi-imagen.png
  updated: 2026-02-14
  ---

  # Contenido en Markdown
  ```

- **Almacenamiento dual**, resuelto automáticamente según el entorno:
  - **Local / sin `BLOB_READ_WRITE_TOKEN`** → los documentos se leen y escriben directamente en `content/docs/*.md`.
  - **Producción en Vercel / con Blob Storage conectado** → los documentos se guardan como *blobs* bajo el prefijo `docs/`, ya que el disco de las funciones serverless de Vercel es de **solo lectura** y no persiste entre despliegues.
- Los documentos se **ordenan** por categoría, luego por el campo `order`, y finalmente alfabéticamente por título (usando `localeCompare` con configuración regional `es`).
- `lib/docs-shared.ts` contiene **solo funciones puras** (sin `node:fs` ni `node:path`) para poder importarlas también desde componentes de cliente sin arrastrar módulos de Node al bundle del navegador:
  - `slugify()` — normaliza texto (elimina acentos, minúsculas, guiones) para generar slugs de URL seguros.
  - `isSafeSlug()` — valida con expresión regular que un slug no permita *path traversal* ni caracteres peligrosos.
  - `groupByCategory()` — agrupa documentos preservando el orden de aparición.
  - `serializeDoc()` — convierte un documento editado de vuelta a Markdown + frontmatter, escapando comillas para evitar romper el YAML.

Además, `/docs` incluye un **buscador con atajo `Ctrl K`** (`components/docs/docs-search.tsx`), tarjetas de acceso rápido en la portada, sidebar con icono por categoría y una tabla de contenidos "En esta página" con scroll-spy en cada documento — pensado para que se sienta como una documentación de producto, no como una lista de artículos.

Siete documentos vienen ya escritos en `content/docs/` como punto de partida: introducción, arquitectura del sitio, referencia completa de la API (por endpoint) y la guía de abajo.

---

## 🔑 API pública propia (`/api/v1`)

Además de las rutas internas que usa el propio sitio (`/api/jugadores/[nombre]`, `/api/servidores/[ip]`, etc., sin autenticación, pensadas solo para el front-end), el proyecto expone una **API pública versionada y autenticada** bajo `/api/v1`, para que terceros (bots, otras webs, scripts) puedan consumir los mismos datos de forma estable.

- **Autenticación**: clave única en la cabecera `x-api-key`, comparada en tiempo constante contra `SHODZERY_API_KEY` (`lib/api-auth.ts`). Sin esa variable de entorno, la API responde `503` — falla cerrada, nunca abierta por defecto.
- **Formato estable**: toda respuesta autenticada sigue `{ data, meta: { version, fetchedAt } }`.
- **Manifiesto público**: `GET /api/v1` no requiere clave y lista los endpoints disponibles.
- **Endpoints actuales**: `jugadores/{nombre}`, `servidores/{ip}`, `changelogs`, `novedades` — cada uno envuelve su equivalente interno en vez de duplicar la integración externa.

Guía completa de diseño (por qué versionar, cómo se implementó la autenticación, cómo añadir un endpoint nuevo) en [`content/docs/crea-tu-propia-api.md`](content/docs/crea-tu-propia-api.md), visible en `/docs/crea-tu-propia-api` una vez el sitio está corriendo. Referencia endpoint por endpoint en [`content/docs/api-resumen.md`](content/docs/api-resumen.md).

---

## 🔐 Panel de administración de docs (`/docs/admin`)

El panel de administración permite gestionar toda la documentación **sin tocar código**, protegido por una autenticación mínima pero robusta implementada íntegramente con el módulo nativo `node:crypto` de Node.js (sin librerías de autenticación de terceros):

1. **Un único administrador.** La contraseña se define en la variable de entorno `DOCS_ADMIN_PASSWORD`.
2. **Nunca se guarda la contraseña en el navegador.** Al iniciar sesión, el servidor calcula una firma `HMAC-SHA256` de la contraseña y guarda **esa firma** (no la contraseña) en una cookie `docs_session`.
3. La cookie se configura como:
   - `httpOnly: true` → inaccesible desde JavaScript del navegador (mitiga XSS).
   - `sameSite: 'lax'` → mitiga ataques CSRF básicos.
   - `secure: true` en producción → solo se envía por HTTPS.
   - `maxAge` de **8 horas**, tras las cuales expira automáticamente.
4. En cada verificación de sesión, la firma de la cookie se compara con `timingSafeEqual()`, una comparación en **tiempo constante** que evita filtrar información mediante *timing attacks*.
5. Desde el panel se puede:
   - **Iniciar/cerrar sesión** (`loginAction` / `logoutAction`, Server Actions).
   - **Crear** un documento nuevo (`/docs/admin/nuevo`).
   - **Editar** un documento existente (`/docs/admin/[slug]`), incluyendo el cambio de slug.
   - **Guardar** (`saveDocAction`), detectando automáticamente si debe escribir en disco o en Vercel Blob, e incluso si el sistema de archivos es de **solo lectura** (por ejemplo, en un entorno de *preview*), devolviendo el contenido en Markdown como *fallback* para copiar manualmente.
   - **Borrar** documentos, con confirmación y revalidación de la caché (`revalidatePath`).

> ⚠️ Si `DOCS_ADMIN_PASSWORD` no está definida, `isAdminConfigured()` devuelve `false` y el panel de edición queda deshabilitado por completo.

---

## 🐙 Integración en vivo con GitHub

La página `/github` no muestra datos estáticos ni de relleno: consulta **directamente** la API pública de GitHub (`api.github.com`) en tiempo de renderizado en el servidor:

- `GET /users/{username}` → datos del perfil (avatar, biografía, ubicación, empresa, blog, repos públicos, seguidores, seguidos, fecha de creación de la cuenta).
- `GET /users/{username}/repos?per_page=100&sort=pushed&direction=desc` → hasta 100 repositorios, ordenados por última actividad.
- Los repositorios **archivados** se filtran automáticamente y no se muestran.
- Se calculan estadísticas agregadas: total de estrellas, forks, repositorios, repositorios originales (no forks) y topics únicos.
- Se calcula la **distribución de lenguajes** usados en todos los repositorios visibles, con porcentaje sobre el total.
- Cada lenguaje tiene asignado un **color de referencia** (idéntico al que usa GitHub: Java, Kotlin, TypeScript, JavaScript, Python, Go, Rust, C#, C++, Lua, etc.).
- Manejo de errores específico según el código de respuesta HTTP:
  - `404` → usuario no encontrado.
  - `403` / `429` → límite de peticiones de la API alcanzado (*rate limit*).
  - Otro error → mensaje genérico.
- Los datos se **revalidan cada hora** (`export const revalidate = 3600`), evitando pedir la API en cada visita y respetando los límites de uso.
- Si se define la variable opcional `GITHUB_TOKEN`, se usa para **ampliar el límite de peticiones** de la API (de 60 a 5.000 peticiones/hora), sin que sea obligatorio para el funcionamiento básico.

---

## 🎮 Visor 3D de skin de Minecraft

El componente `minecraft-skin-viewer.tsx` utiliza la librería **`skinview3d`** para renderizar, sobre un elemento `<canvas>`, un modelo 3D interactivo y animado de la skin de Minecraft del propietario del sitio:

- La skin se puede configurar de dos formas en `data/portfolio.ts`:
  - Por **nombre de usuario** (recomendado): `minecraftSkin.username`, que construye automáticamente la URL a través de `minotar.net`.
  - Por **URL directa**: `minecraftSkin.skinUrl`, que tiene prioridad si se define.
- El propio componente usa además `mc-heads.net` como fuente primaria y `minotar.net` como *fallback* si la primera falla.
- Gestiona estados de **carga** y **error** de forma explícita, mostrando una interfaz adecuada en cada caso en lugar de dejar un espacio en blanco.

---

## 💬 Formulario de contacto vía Discord

El sitio **no tiene backend de envío de correos ni base de datos de leads**. En su lugar, `components/contact.tsx` implementa un flujo pensado específicamente para un flujo de trabajo basado en Discord:

1. El visitante rellena un formulario con los datos clave del proyecto: versión de Minecraft y núcleo actual, tipo de servidor, qué necesita (desarrollo a medida o solo configuración), qué está fallando o qué quiere añadir, plazos y si ya cuenta con hosting.
2. El componente **compone automáticamente un mensaje de texto** formateado y listo para pegar en Discord.
3. Un botón permite **copiarlo al portapapeles** usando la Clipboard API moderna, con un mecanismo de respaldo manual (`document.execCommand('copy')`) para navegadores que no la soporten.
4. Se muestran también el **usuario de Discord** y el **ID de Discord** del propietario, ambos copiables con un solo clic, junto con el enlace directo al perfil.
5. Se acompaña de una sección de FAQ contextual sobre el proceso de contacto y presupuesto.

---

## 🗃️ Fuente única de contenido: `data/portfolio.ts`

Este archivo (~36 KB) es el corazón editable de todo el sitio. **Contiene absolutamente todos los textos, cifras y listas** que se muestran en la web, para que el contenido pueda actualizarse sin tocar ningún componente visual. Exporta, entre otros:

| Export | Contenido |
|---|---|
| `identity` | Nombre, rol, subrol, *tagline*, disponibilidad y párrafos de "sobre mí". |
| `minecraftSkin` | Configuración del visor 3D (usuario o URL de skin). |
| `githubUsername` | Usuario de GitHub usado en `/github`. |
| `stats` | Estadísticas rápidas (plugins desarrollados, mods publicados, servidores configurados, años de experiencia). |
| `dashboardMetrics` | Métricas del panel tipo dashboard. |
| `proficiency` | Niveles de dominio técnico. |
| `supportedVersions` | Versiones de Minecraft soportadas. |
| `specialties` | Especialidades técnicas detalladas. |
| `experience` | Trayectoria profesional por roles. |
| `services` | Catálogo completo de servicios ofrecidos. |
| `skills` | Tecnologías agrupadas (lenguajes, núcleos, plugins, proxies, herramientas, bases de datos). |
| `techStack` | Arquitectura por capas del stack técnico. |
| `favoriteTools` | Herramientas favoritas de trabajo. |
| `whyMe` | Motivos para elegir estos servicios. |
| `projects` | Proyectos y casos técnicos representativos. |
| `workflow` | Pasos del proceso de trabajo. |
| `faq` | Preguntas frecuentes. |
| `testimonials` | Testimonios de clientes. |
| `changelog` / `roadmap` | Historial de versiones y hoja de ruta. |
| `discord` | Usuario, ID y URL de perfil de Discord. |
| `socialLinks` | Enlaces a redes sociales. |
| `serverTypes` | Tipos de servidor disponibles como opción en el formulario. |
| `serviceOptions` | Lista derivada automáticamente de `services` (títulos). |
| `navLinks` | Enlaces de la barra de navegación (12 rutas). |
| `homeSections` | Anclas internas de la portada para el scroll suave. |

> 💡 Los valores marcados con `"—"` son marcadores de posición pendientes de rellenar con cifras reales antes de publicar el sitio.

---

## 🔑 Variables de entorno

Crea (o edita) un archivo `.env.local` en la raíz del proyecto — **este archivo ya está excluido de git** mediante `.gitignore`, así que nunca se sube al repositorio:

```bash
# Contraseña del panel de administración de documentación (obligatoria para poder editar /docs/admin)
DOCS_ADMIN_PASSWORD=tu_contraseña_segura

# Opcional: token personal de GitHub para ampliar el límite de peticiones de la API
GITHUB_TOKEN=

# Se añade automáticamente al conectar Vercel Blob Storage desde el panel de Vercel
BLOB_READ_WRITE_TOKEN=

# Clave maestra de la API pública v1 (/api/v1/*). Genera una con: openssl rand -hex 32
SHODZERY_API_KEY=
```

| Variable | Obligatoria | Descripción |
|---|---|---|
| `DOCS_ADMIN_PASSWORD` | Recomendada | Contraseña del único administrador del panel de documentación. Si no se define, el panel de edición queda deshabilitado. |
| `GITHUB_TOKEN` | Opcional | Token de acceso personal de GitHub para elevar el límite de peticiones a la API pública. |
| `BLOB_READ_WRITE_TOKEN` | Automática en Vercel | Habilita el almacenamiento de documentos en Vercel Blob Storage en producción. |
| `SHODZERY_API_KEY` | Recomendada | Clave que deben enviar los clientes en la cabecera `x-api-key` para usar `/api/v1/*`. Sin ella, esos endpoints responden `503`. Ver [`/docs/crea-tu-propia-api`](content/docs/crea-tu-propia-api.md). |

> ⚠️ **Importante:** nunca compartas ni subas tu `.env.local` a un repositorio público. Si en algún momento la contraseña de administrador quedó expuesta (por ejemplo en un historial de commits o capturas de pantalla), **cámbiala inmediatamente**.

---

## 🚀 Instalación y puesta en marcha

### Requisitos previos

- **Node.js** 18.18 o superior (recomendado 20+).
- **pnpm** (gestor de paquetes usado por el proyecto; puedes instalarlo con `npm i -g pnpm`).

### Pasos

```bash
# 1. Clona el repositorio
git clone <URL-de-tu-repositorio>
cd shodzery

# 2. Instala las dependencias
pnpm install

# 3. Configura las variables de entorno
cp .env.local.example .env.local   # si existe un ejemplo, o crea el archivo manualmente
# edita DOCS_ADMIN_PASSWORD y las demás variables necesarias

# 4. Inicia el servidor de desarrollo
pnpm dev
```

El sitio quedará disponible en **http://localhost:3000**.

---

## 📜 Scripts disponibles

| Comando | Descripción |
|---|---|
| `pnpm dev` | Inicia el servidor de desarrollo de Next.js con recarga en caliente. |
| `pnpm build` | Genera la build de producción optimizada. |
| `pnpm start` | Sirve la build de producción ya generada. |
| `pnpm lint` | Ejecuta ESLint sobre todo el proyecto. |

---

## ☁️ Despliegue en Vercel

Este proyecto está pensado y optimizado para desplegarse en **Vercel** (creador de Next.js):

1. Importa el repositorio en [vercel.com](https://vercel.com).
2. Define las variables de entorno (`DOCS_ADMIN_PASSWORD`, `GITHUB_TOKEN` si aplica) en el panel del proyecto.
3. **Conecta un Blob Store** desde la pestaña *Storage* del proyecto en Vercel para que el sistema de documentación pueda **guardar y persistir** documentos entre despliegues (obligatorio para poder usar `/docs/admin` en producción, ya que el sistema de archivos de las funciones serverless es de solo lectura).
4. Despliega. Vercel detecta automáticamente que es un proyecto Next.js y aplica la configuración óptima de build.

---

## 🛡️ Seguridad

El proyecto incorpora varias medidas de seguridad a nivel de aplicación y de cabeceras HTTP (`next.config.mjs`):

- `X-Content-Type-Options: nosniff` — evita que el navegador intente adivinar tipos MIME.
- `Referrer-Policy: strict-origin-when-cross-origin` — limita la información de referencia enviada entre sitios.
- `Strict-Transport-Security: max-age=63072000` — fuerza el uso de HTTPS durante 2 años (HSTS).
- `Permissions-Policy: camera=(), microphone=(), geolocation=()` — deshabilita explícitamente el acceso a cámara, micrófono y geolocalización, ya que el sitio no los necesita.
- Autenticación del panel admin basada en **HMAC-SHA256** y comparación en **tiempo constante**, sin almacenar contraseñas en cookies ni en el navegador.
- Cookies de sesión `httpOnly`, `sameSite=lax` y `secure` en producción.
- Validación estricta de *slugs* (`isSafeSlug`) para impedir *path traversal* al leer/escribir documentos en disco.
- `.env.local` excluido de git mediante `.gitignore`.

---

## 🔍 SEO y metadatos

- Metadatos completos por página mediante la API `Metadata` de Next.js (`title`, `description`, `keywords`, Open Graph).
- Plantilla de título dinámica: `%s · Shodzery`, de modo que cada página interna añade su propio título manteniendo el nombre de marca.
- Palabras clave orientadas al nicho: Minecraft, plugins, mods, Paper, Purpur, Folia, Fabric, NeoForge, Velocity, optimización, LuckPerms, MythicMobs, ItemsAdder.
- Iconos configurados para navegador y dispositivos Apple (`icon.png`, `apple-icon.png`).
- Metadato `themeColor` y `colorScheme: dark` para una integración correcta con la UI del sistema operativo/navegador.

---

## ⚡ Rendimiento

- **Server Components** por defecto en todas las páginas, minimizando el JavaScript enviado al cliente.
- **Revalidación incremental** (`revalidate = 3600`) en la página de GitHub, evitando peticiones innecesarias a la API externa.
- Imágenes configuradas como `unoptimized: true` (compatible con exportaciones estáticas y entornos donde no se dispone del optimizador de imágenes de Vercel).
- Carga de fuentes optimizada con `next/font/google` (autohospedaje, sin bloqueo de renderizado).
- Componentes de cliente (`'use client'`) aislados **solo** donde es estrictamente necesario (formularios, visor 3D, animaciones), manteniendo el resto del árbol en el servidor.

---

## 📱 Accesibilidad y diseño responsive

- Diseño **mobile-first** con Tailwind CSS 4.
- Componentes de shadcn/ui y Base UI, construidos sobre primitivas accesibles (roles ARIA, navegación por teclado, foco visible).
- Menú de navegación adaptado a pantallas pequeñas.
- Contraste de color pensado para el modo oscuro predominante del sitio.

---

## ⚙️ Personalización rápida

Para adaptar este proyecto a otro perfil o marca personal:

1. Edita `data/portfolio.ts` — cambia `identity`, `stats`, `services`, `skills`, `projects`, `experience`, `faq`, `testimonials`, `discord`, `socialLinks`, etc.
2. Cambia el nombre de usuario de GitHub en `githubUsername`.
3. Configura tu propia skin de Minecraft en `minecraftSkin`.
4. Sustituye los iconos en `public/` (`icon.png`, `apple-icon.png`, `icon.svg`).
5. Ajusta los metadatos globales (título, descripción, palabras clave) en `app/layout.tsx`.
6. Define tu propia `DOCS_ADMIN_PASSWORD` y empieza a documentar desde `/docs/admin/nuevo`.

---

## ❓ Preguntas frecuentes del propio repositorio

**¿Necesito una base de datos para que funcione?**
No. El contenido principal vive en `data/portfolio.ts` (código), y la documentación se guarda como archivos Markdown en disco o en Vercel Blob Storage — no se usa ninguna base de datos relacional ni NoSQL.

**¿Funciona sin conectar Vercel Blob Storage?**
Sí, en local funciona perfectamente guardando los documentos en `content/docs/`. Solo es obligatorio conectar Blob Storage si vas a **editar documentación en producción** en Vercel.

**¿Qué pasa si no configuro `DOCS_ADMIN_PASSWORD`?**
El sitio funciona con normalidad, pero el panel `/docs/admin` queda inaccesible para edición (no hay forma de iniciar sesión).

**¿El formulario de contacto envía correos automáticamente?**
No. Genera un mensaje de texto formateado que el visitante copia y envía manualmente por Discord; no hay backend de envío de correos ni almacenamiento de mensajes.

---

## © Derechos de autor y licencia

```
Copyright (c) 2026 Shodzery. Todos los derechos reservados.
```

Este repositorio, su código fuente, su estructura, sus componentes, sus estilos, sus textos, sus imágenes y **todo su contenido**, en su totalidad y en cada una de sus partes, es **propiedad exclusiva de su autor**.

**Queda expresamente prohibido, sin autorización previa y por escrito del autor:**

- ❌ Copiar, reproducir, distribuir o publicar total o parcialmente el código fuente de este proyecto.
- ❌ Usar este código, en todo o en parte, en proyectos propios, personales, comerciales o de terceros.
- ❌ Modificar, adaptar, traducir o crear obras derivadas a partir de este código.
- ❌ Sublicenciar, vender, alquilar, ceder o transferir cualquier derecho sobre este código a terceros.
- ❌ Realizar ingeniería inversa, descompilar o desensamblar el código con el fin de reutilizarlo.
- ❌ Presentar este proyecto, o partes de él, como propio ante clientes, empleadores o el público.
- ❌ Subir este código a repositorios públicos o privados sin consentimiento expreso del autor.

**Este NO es software de código abierto (open source).** No se concede ninguna licencia de uso, copia, modificación o distribución bajo ninguna licencia libre (MIT, GPL, Apache, BSD u otra), salvo que el autor lo autorice explícitamente y por escrito, caso por caso.

El hecho de que el repositorio sea visible o accesible (por ejemplo, en un repositorio público de GitHub) **no implica en ningún caso una licencia de uso**. La visibilidad del código no equivale a autorización de uso, copia o explotación.

Consulta el archivo [`LICENSE`](./LICENSE) para el texto legal completo.

---

## ⚖️ Aviso legal y denuncias por uso no autorizado

El autor de este proyecto **se reserva el derecho de emprender acciones legales** contra cualquier persona física o jurídica que copie, use, distribuya, publique o explote este código —o una parte sustancial del mismo— sin su autorización expresa y por escrito, incluyendo (pero sin limitarse a):

- Reclamaciones de **eliminación de contenido (DMCA takedown)** ante GitHub, servicios de hosting o cualquier otra plataforma donde se detecte el uso no autorizado.
- Acciones legales por **infracción de derechos de autor** ante las autoridades y tribunales competentes.
- Solicitudes formales de **cese de uso** dirigidas a la persona, empresa o cliente que esté empleando el código sin permiso.

**Si detectas que este código está siendo usado, copiado o vendido sin autorización por un tercero**, se agradece que lo reportes al autor a través de los canales indicados en la sección [Contacto](#-contacto), aportando pruebas (enlaces, capturas, repositorios) para poder actuar en consecuencia.

> El uso no autorizado de este código no solo constituye una infracción de derechos de autor, sino también una falta de respeto al trabajo y tiempo invertido en su desarrollo. Toda contribución, colaboración o uso legítimo es bienvenida siempre que se solicite y se conceda permiso previamente.

---

## 📬 Contacto

Para solicitar autorización de uso, colaboraciones, presupuestos o reportar un uso indebido de este código:

- 💬 **Discord:** ver `discord.profileUrl` en `data/portfolio.ts` (o directamente en la sección [`/contacto`](#) del sitio en producción).
- 🐙 **GitHub:** ver `githubUsername` en `data/portfolio.ts`.
- 🌐 **Sitio web:** consulta la página `/contacto` desplegada, que genera automáticamente un mensaje de contacto listo para enviar.

---

<p align="center">Hecho con ❤️ y mucho café por <strong>Shodzery</strong> — Todos los derechos reservados © 2026</p>
