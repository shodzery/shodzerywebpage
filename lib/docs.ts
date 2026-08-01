import fs from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'
import { list, head } from '@vercel/blob'

/**
 * Sistema de documentación basado en archivos Markdown.
 *
 * Cada documento es un "archivo" `.md` con frontmatter:
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
 * Almacenamiento:
 * - En local (sin BLOB_READ_WRITE_TOKEN): se leen/escriben en `content/docs/`.
 * - En Vercel (con Blob Storage conectado): se guardan como blobs bajo el
 *   prefijo `docs/`, porque el disco de las funciones de Vercel es de solo
 *   lectura y no persiste entre despliegues.
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
export const BLOB_PREFIX = 'docs/'

/** Indica si hay un Blob Store de Vercel conectado (producción). */
export function hasBlobStore(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN)
}

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
  const docs = hasBlobStore() ? await getAllDocsFromBlob() : await getAllDocsFromDisk()

  return docs.sort(
    (a, b) =>
      a.category.localeCompare(b.category, 'es') ||
      a.order - b.order ||
      a.title.localeCompare(b.title, 'es'),
  )
}

async function getAllDocsFromDisk(): Promise<Doc[]> {
  let files: string[]

  try {
    files = await fs.readdir(DOCS_DIR)
  } catch {
    // El directorio aún no existe: no hay documentación todavía.
    return []
  }

  return Promise.all(
    files
      .filter((file) => file.endsWith('.md'))
      .map(async (file) => {
        const slug = file.replace(/\.md$/, '')
        const raw = await fs.readFile(path.join(DOCS_DIR, file), 'utf8')
        const { data, content } = matter(raw)

        return { ...toMeta(slug, data), content }
      }),
  )
}

async function getAllDocsFromBlob(): Promise<Doc[]> {
  const { blobs } = await list({ prefix: BLOB_PREFIX })

  return Promise.all(
    blobs
      .filter((blob) => blob.pathname.endsWith('.md'))
      .map(async (blob) => {
        const slug = blob.pathname.slice(BLOB_PREFIX.length).replace(/\.md$/, '')
        const response = await fetch(blob.url, { cache: 'no-store' })
        const raw = await response.text()
        const { data, content } = matter(raw)

        return { ...toMeta(slug, data), content }
      }),
  )
}

/** Devuelve un documento por su slug, o null si no existe. */
export async function getDoc(slug: string): Promise<Doc | null> {
  if (!isSafeSlug(slug)) return null

  try {
    const raw = hasBlobStore() ? await getDocRawFromBlob(slug) : await getDocRawFromDisk(slug)
    if (raw === null) return null

    const { data, content } = matter(raw)
    return { ...toMeta(slug, data), content }
  } catch {
    return null
  }
}

async function getDocRawFromDisk(slug: string): Promise<string | null> {
  try {
    return await fs.readFile(path.join(DOCS_DIR, `${slug}.md`), 'utf8')
  } catch {
    return null
  }
}

async function getDocRawFromBlob(slug: string): Promise<string | null> {
  try {
    const meta = await head(`${BLOB_PREFIX}${slug}.md`)
    const response = await fetch(meta.url, { cache: 'no-store' })
    return await response.text()
  } catch {
    return null
  }
}
