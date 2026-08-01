/**
 * Tipos y funciones puras del sistema de documentación.
 *
 * Este módulo NO importa `node:fs` ni `node:path`, por lo que es seguro
 * usarlo tanto en Server Components como en Client Components.
 */

export type DocMeta = {
  slug: string
  title: string
  description: string
  category: string
  order: number
  cover: string | null
  updated: string | null
}

export type Doc = DocMeta & {
  content: string
}

/** Convierte un título en un slug válido para la URL. */
export function slugify(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

/** Valida que un slug no permita salir del directorio de docs. */
export function isSafeSlug(slug: string): boolean {
  return /^[a-z0-9][a-z0-9-]{0,79}$/.test(slug)
}

/** Agrupa los documentos por categoría preservando el orden. */
export function groupByCategory(docs: DocMeta[]): [string, DocMeta[]][] {
  const groups = new Map<string, DocMeta[]>()

  for (const doc of docs) {
    const list = groups.get(doc.category) ?? []
    list.push(doc)
    groups.set(doc.category, list)
  }

  return [...groups.entries()]
}

/** Serializa un documento a Markdown con su frontmatter. */
export function serializeDoc(input: {
  title: string
  description: string
  category: string
  order: number
  cover: string | null
  content: string
}): string {
  const escape = (value: string) => value.replace(/"/g, '\\"')
  const lines = [
    '---',
    `title: "${escape(input.title)}"`,
    `description: "${escape(input.description)}"`,
    `category: "${escape(input.category)}"`,
    `order: ${input.order}`,
  ]

  if (input.cover) lines.push(`cover: "${escape(input.cover)}"`)
  lines.push(`updated: "${new Date().toISOString().slice(0, 10)}"`, '---', '')

  return `${lines.join('\n')}\n${input.content.trim()}\n`
}
