import { NextResponse } from 'next/server'

export const runtime = 'edge'
export const revalidate = 0
export const dynamic = 'force-dynamic'

interface UnifiedArticle {
  id: string
  title: string
  subHeader: string
  image: string
  category: string
  publishDate: string
  url: string
  source: 'minecraft.net' | 'mojang-launcher'
}

interface LauncherEntry {
  title: string
  category?: string
  date?: string
  text?: string
  newsPageImage?: { url?: string }
  playPageImage?: { url?: string }
  readMoreLink?: string
  id?: string
}

function inferCategory(title: string, description: string): string {
  const text = `${title} ${description}`.toLowerCase()
  if (text.includes('snapshot')) return 'Snapshot'
  if (text.includes('bedrock')) return 'Bedrock'
  if (text.includes('java')) return 'Java Edition'
  if (text.includes('changelog')) return 'Actualización'
  if (text.includes('marketplace') || text.includes('add-on') || text.includes('texture pack'))
    return 'Marketplace'
  if (text.includes('dungeons')) return 'Dungeons'
  if (text.includes('legends')) return 'Legends'
  if (text.includes('live') || text.includes('event')) return 'Evento'
  return 'Noticia'
}

function decodeUtf16(buffer: ArrayBuffer): string {
  const decoder = new TextDecoder('utf-16le')
  return decoder.decode(buffer)
}

interface RSSItem {
  title: string
  description: string
  pubDate: string
  url: string
}

function parseRSS(xml: string): RSSItem[] {
  const items: RSSItem[] = []
  const itemRegex = /<item>([\s\S]*?)<\/item>/g
  let match: RegExpExecArray | null

  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1]
    const titleMatch = /<title>([\s\S]*?)<\/title>/.exec(block)
    const descMatch = /<description>([\s\S]*?)<\/description>/.exec(block)
    const dateMatch = /<pubDate>([\s\S]*?)<\/pubDate>/.exec(block)
    const linkMatch = /<a10:link\s+href="([^"]+)"/.exec(block)

    const title = (titleMatch?.[1] || '').trim()
    const description = (descMatch?.[1] || '').replace(/<[^>]+>/g, '').trim()
    const pubDate = (dateMatch?.[1] || '').trim()
    const url = (linkMatch?.[1] || '').trim()

    if (title && url) items.push({ title, description, pubDate, url })
  }
  return items
}

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
}

function slugFromUrl(url: string): string {
  const m = url.match(/\/article\/([^/?#]+)/i)
  return m ? m[1] : ''
}

async function fetchMinecraftRSS(): Promise<UnifiedArticle[]> {
  try {
    const res = await fetch('https://www.minecraft.net/en-us/feeds/community-content/rss', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Shodzery/1.0)',
        Accept: 'application/rss+xml, application/xml, text/xml',
      },
      cache: 'no-store',
    })
    if (!res.ok) return []
    const buf = await res.arrayBuffer()
    const xml = decodeUtf16(buf)
    const items = parseRSS(xml)

    return items.slice(0, 18).map((it, i) => ({
      id: slugFromUrl(it.url) || `rss-${i}`,
      title: decodeEntities(it.title),
      subHeader: decodeEntities(it.description),
      image: '',
      category: inferCategory(it.title, it.description),
      publishDate: it.pubDate ? new Date(it.pubDate).toISOString() : new Date().toISOString(),
      url: it.url,
      source: 'minecraft.net' as const,
    }))
  } catch {
    return []
  }
}

async function fetchLauncherNews(): Promise<UnifiedArticle[]> {
  try {
    const res = await fetch('https://launchercontent.mojang.com/news.json', {
      headers: { 'User-Agent': 'Shodzery/1.0' },
      cache: 'no-store',
    })
    if (!res.ok) return []
    const data = await res.json()
    const entries: LauncherEntry[] = data.entries || []
    return entries.slice(0, 24).map((e, i) => ({
      id: e.id || `launcher-${i}`,
      title: e.title,
      subHeader: e.text?.replace(/<[^>]+>/g, '').slice(0, 220) || '',
      image: e.newsPageImage?.url
        ? `https://launchercontent.mojang.com${e.newsPageImage.url}`
        : e.playPageImage?.url
          ? `https://launchercontent.mojang.com${e.playPageImage.url}`
          : '',
      category: e.category || inferCategory(e.title, e.text || ''),
      publishDate: e.date ? new Date(e.date).toISOString() : new Date().toISOString(),
      url: e.readMoreLink
        ? e.readMoreLink.startsWith('http')
          ? e.readMoreLink
          : `https://www.minecraft.net${e.readMoreLink}`
        : 'https://www.minecraft.net/en-us/articles',
      source: 'mojang-launcher' as const,
    }))
  } catch {
    return []
  }
}

/** GET /api/novedades — últimas noticias oficiales de Minecraft/Mojang. */
export async function GET() {
  try {
    const [rss, launcher] = await Promise.all([fetchMinecraftRSS(), fetchLauncherNews()])

    const launcherImageByTitle = new Map<string, string>()
    for (const a of launcher) {
      if (a.image) {
        const key = a.title.toLowerCase().replace(/[^a-z0-9]/g, '')
        if (key) launcherImageByTitle.set(key, a.image)
      }
    }

    const merged: UnifiedArticle[] = []
    const seen = new Set<string>()

    for (const a of rss) {
      if (!a.image) {
        const key = a.title.toLowerCase().replace(/[^a-z0-9]/g, '')
        const fallback = launcherImageByTitle.get(key)
        if (fallback) a.image = fallback
      }
      const dedupeKey = a.title.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 50)
      if (seen.has(dedupeKey)) continue
      seen.add(dedupeKey)
      merged.push(a)
    }

    for (const a of launcher) {
      const dedupeKey = a.title.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 50)
      if (seen.has(dedupeKey)) continue
      seen.add(dedupeKey)
      merged.push(a)
    }

    merged.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())

    return NextResponse.json(
      { articles: merged, fetchedAt: new Date().toISOString(), count: merged.length },
      { headers: { 'Cache-Control': 'no-store, max-age=0, must-revalidate' } },
    )
  } catch (error) {
    console.error('[novedades] error:', error)
    return NextResponse.json({ articles: [], fetchedAt: new Date().toISOString(), count: 0 })
  }
}
