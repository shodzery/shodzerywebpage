/**
 * Cliente de la API pública de minecraft.wiki (MediaWiki). Permite
 * buscar, listar categorías (Mobs, Bloques, Objetos, Biomas...) y
 * obtener el artículo completo (texto + fotos) de cualquier página,
 * en vivo y sin necesidad de clave de API.
 *
 * Contenido bajo licencia CC BY-NC-SA 3.0 de Minecraft Wiki
 * (https://minecraft.wiki/w/Minecraft_Wiki:Copyrights).
 */

const API_BASE = 'https://minecraft.wiki/api.php'
const WIKI_BASE = 'https://minecraft.wiki'

async function mwFetch(params: Record<string, string>): Promise<any> {
  const url = new URL(API_BASE)
  url.searchParams.set('format', 'json')
  url.searchParams.set('formatversion', '2')
  url.searchParams.set('origin', '*')
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v)

  const res = await fetch(url.toString(), {
    headers: { 'User-Agent': 'Shodzery/1.0 (sitio de comunidad de Minecraft)' },
    next: { revalidate: 3600 },
  })

  if (!res.ok) throw new Error(`minecraft.wiki respondió ${res.status}`)
  return res.json()
}

function absolutize(url?: string | null): string | null {
  if (!url) return null
  if (url.startsWith('http')) return url
  if (url.startsWith('//')) return `https:${url}`
  return `${WIKI_BASE}${url}`
}

function stripHtml(s: string): string {
  return s.replace(/<[^>]+>/g, '')
}

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = []
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size))
  return out
}

/** Miniaturas (pageimages) para un conjunto de títulos, en lotes de 50. */
export async function getThumbnails(titles: string[]): Promise<Map<string, string>> {
  const map = new Map<string, string>()
  if (titles.length === 0) return map

  await Promise.all(
    chunk(titles, 50).map(async (group) => {
      try {
        const data = await mwFetch({
          action: 'query',
          titles: group.join('|'),
          prop: 'pageimages',
          piprop: 'thumbnail',
          pithumbsize: '400',
        })
        const pages = data?.query?.pages || []
        for (const p of pages) {
          const thumb = absolutize(p.thumbnail?.source)
          if (thumb) map.set(p.title, thumb)
        }
      } catch {
        // Se ignoran fallos parciales: mejor sin miniatura que sin resultados.
      }
    }),
  )

  return map
}

async function getExtracts(titles: string[]): Promise<Map<string, string>> {
  const map = new Map<string, string>()
  if (titles.length === 0) return map

  await Promise.all(
    chunk(titles, 20).map(async (group) => {
      try {
        const data = await mwFetch({
          action: 'query',
          titles: group.join('|'),
          prop: 'extracts',
          exintro: '1',
          explaintext: '1',
          exchars: '180',
        })
        const pages = data?.query?.pages || []
        for (const p of pages) {
          if (p.extract) map.set(p.title, p.extract)
        }
      } catch {
        // Igual que arriba: extracto opcional.
      }
    }),
  )

  return map
}

export interface MwSearchResult {
  title: string
  snippet: string
  thumbnail: string | null
}

/** Búsqueda de texto completo en minecraft.wiki. */
export async function searchWiki(query: string, limit = 10): Promise<MwSearchResult[]> {
  const data = await mwFetch({
    action: 'query',
    list: 'search',
    srsearch: query,
    srlimit: String(limit),
    srprop: 'snippet',
  })

  const results = data?.query?.search || []
  if (results.length === 0) return []

  const titles = results.map((r: { title: string }) => r.title)
  const thumbs = await getThumbnails(titles)

  return results.map((r: { title: string; snippet: string }) => ({
    title: r.title,
    snippet: stripHtml(r.snippet),
    thumbnail: thumbs.get(r.title) || null,
  }))
}

export interface MwCategoryMember {
  title: string
  thumbnail: string | null
  snippet: string
}

export interface MwCategoryResult {
  items: MwCategoryMember[]
  cmcontinue: string | null
}

/** Lista las páginas de una categoría (p. ej. "Mobs", "Blocks", "Biomes"). */
export async function getCategoryMembers(
  category: string,
  limit = 48,
  cmcontinue?: string,
): Promise<MwCategoryResult> {
  const params: Record<string, string> = {
    action: 'query',
    list: 'categorymembers',
    cmtitle: category.startsWith('Category:') ? category : `Category:${category}`,
    cmlimit: String(limit),
    cmtype: 'page',
  }
  if (cmcontinue) params.cmcontinue = cmcontinue

  const data = await mwFetch(params)
  const members: { title: string }[] = data?.query?.categorymembers || []
  const titles = members.map((m) => m.title)

  const [thumbs, extracts] = await Promise.all([getThumbnails(titles), getExtracts(titles)])

  return {
    items: members.map((m) => ({
      title: m.title,
      thumbnail: thumbs.get(m.title) || null,
      snippet: extracts.get(m.title) || '',
    })),
    cmcontinue: data?.continue?.cmcontinue || null,
  }
}

export interface MwPage {
  title: string
  html: string
  thumbnail: string | null
}

/** Obtiene el artículo completo (HTML renderizado, con fotos) de una página. */
export async function getPage(title: string): Promise<MwPage | null> {
  const data = await mwFetch({
    action: 'parse',
    page: title,
    prop: 'text|displaytitle',
    redirects: '1',
    disabletoc: '1',
    disableeditsection: '1',
    disablelimitreport: '1',
  })

  if (data.error || !data.parse) return null

  let html: string = data.parse.text || ''

  // Quita hojas de estilo incrustadas (TemplateStyles) para que no
  // choquen con el tema oscuro del sitio.
  html = html.replace(/<style[\s\S]*?<\/style>/gi, '')
  // Quita estilos y tamaños fijos en línea: nuestras clases mandan.
  html = html.replace(/\sstyle="[^"]*"/gi, '')
  html = html.replace(/\swidth="[^"]*"/gi, '').replace(/\sheight="[^"]*"/gi, '')

  // Convierte rutas relativas de imágenes y enlaces en absolutas.
  html = html.replace(/(src|href)="([^"]+)"/g, (_match, attr, url) => {
    if (/^https?:\/\//i.test(url) || /^data:/i.test(url) || /^#/.test(url) || /^mailto:/i.test(url)) {
      return `${attr}="${url}"`
    }
    if (url.startsWith('//')) return `${attr}="https:${url}"`
    if (url.startsWith('/')) return `${attr}="${WIKI_BASE}${url}"`
    return `${attr}="${WIKI_BASE}/w/${url}"`
  })

  // Los enlaces internos abren en pestaña nueva para no perder el sitio.
  html = html.replace(/<a /g, '<a target="_blank" rel="noopener noreferrer" ')

  const displayTitle = stripHtml(data.parse.displaytitle || data.parse.title || title)
  const thumbs = await getThumbnails([title])

  return {
    title: displayTitle,
    html,
    thumbnail: thumbs.get(title) || null,
  }
}

export function articleUrl(title: string): string {
  return `${WIKI_BASE}/w/${encodeURIComponent(title.replace(/ /g, '_'))}`
}
