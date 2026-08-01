import fs from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'

/**
 * Sistema de documentación basado en archivos Markdown.
 *
 * Cada documento es un archivo `.md` dentro de `content/docs/`.
 * La cabecera (frontmatter) define los metadatos:
 *
 * ---
 * title: Cómo instalar un plugin
 * description: Guía paso a paso.
 * category: Plugins
 * order: 1
 * cover: /docs/mi-imagen.png
 * updated: 2026-02-14
 * ---
 *
 * # Contenido en Markdown
 *
 * NOTA: los tipos y funciones puras (sin dependencias de `node:fs`) viven en
 * `@/lib/docs-shared` para poder importarlos también desde Client Components
 * sin arrastrar módulos de Node al bundle del navegador.
 */

export type { DocMeta, Doc } from './docs-shared'
export { slugify, isSafeSlug, groupByCategory, serializeDoc } from './docs-shared'

import type { DocMeta, Doc } from './docs-shared'
import { isSafeSlug } from './docs-shared'

export const DOCS_DIR = path.join(process.cwd(), 'content', 'docs')

function toMeta(slug: string, data: Record<string, unknown>): DocMeta {
  const rawOrder = Number(data.order)

  return {
    slug,
    title: typeof data.title === 'string' && data.title.trim() ? data.title : slug,
    description: typeof data.description === 'string' ? data.description : '',
    category:
      typeof data.category === 'string' && data.category.trim()
        ? data.category
        : 'General',
    order: Number.isFinite(rawOrder) ? rawOrder : 999,
    cover: typeof data.cover === 'string' && data.cover.trim() ? data.cover : null,
    updated:
      typeof data.updated === 'string' && data.updated.trim()
        ? data.updated
        : data.updated instanceof Date
          ? data.updated.toISOString().slice(0, 10)
          : null,
  }
}

/** Devuelve todos los documentos ordenados por categoría y orden. */
export async function getAllDocs(): Promise<Doc[]> {
  let files: string[]

  try {
    files = await fs.readdir(DOCS_DIR)
  } catch {
    // El directorio aún no existe: no hay documentación todavía.
    return []
  }

  const docs = await Promise.all(
    files
      .filter((file) => file.endsWith('.md'))
      .map(async (file) => {
        const slug = file.replace(/\.md$/, '')
        const raw = await fs.readFile(path.join(DOCS_DIR, file), 'utf8')
        const { data, content } = matter(raw)

        return { ...toMeta(slug, data), content }
      }),
  )

  return docs.sort(
    (a, b) =>
      a.category.localeCompare(b.category, 'es') ||
      a.order - b.order ||
      a.title.localeCompare(b.title, 'es'),
  )
}

/** Devuelve un documento por su slug, o null si no existe. */
export async function getDoc(slug: string): Promise<Doc | null> {
  if (!isSafeSlug(slug)) return null

  try {
    const raw = await fs.readFile(path.join(DOCS_DIR, `${slug}.md`), 'utf8')
    const { data, content } = matter(raw)

    return { ...toMeta(slug, data), content }
  } catch {
    return null
  }
}
