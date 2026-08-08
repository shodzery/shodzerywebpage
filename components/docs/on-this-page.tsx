'use client'

import { useEffect, useState } from 'react'
import { slugify } from '@/lib/docs-shared'

type Heading = { id: string; text: string; depth: 2 | 3 }

/** Extrae los `##`/`###` de un markdown crudo (sin renderizarlo). */
function extractHeadings(markdown: string): Heading[] {
  const lines = markdown.split('\n')
  const headings: Heading[] = []

  for (const line of lines) {
    const m2 = /^##\s+(.+)$/.exec(line)
    const m3 = /^###\s+(.+)$/.exec(line)

    if (m2) headings.push({ id: slugify(m2[1]), text: m2[1].trim(), depth: 2 })
    else if (m3) headings.push({ id: slugify(m3[1]), text: m3[1].trim(), depth: 3 })
  }

  return headings
}

/** Índice flotante de secciones, con resaltado del encabezado visible. */
export function OnThisPage({ content }: { content: string }) {
  const headings = extractHeadings(content)
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '-96px 0px -70% 0px' },
    )

    for (const heading of headings) {
      const el = document.getElementById(heading.id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content])

  if (headings.length === 0) return null

  return (
    <nav aria-label="En esta página" className="flex flex-col gap-3">
      <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
        En esta página
      </p>
      <ul className="flex flex-col gap-1.5 border-l border-border/60">
        {headings.map((h) => (
          <li key={h.id} style={{ paddingLeft: h.depth === 3 ? '1.5rem' : '0.75rem' }}>
            <a
              href={`#${h.id}`}
              className={`-ml-px block border-l-2 py-0.5 pl-3 text-sm transition-colors ${
                activeId === h.id
                  ? 'border-primary font-medium text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
