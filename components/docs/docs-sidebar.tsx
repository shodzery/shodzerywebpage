'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FileText } from 'lucide-react'
import { groupByCategory, type DocMeta } from '@/lib/docs-shared'

/** Índice lateral de la documentación, agrupado por categoría. */
export function DocsSidebar({ docs }: { docs: DocMeta[] }) {
  const pathname = usePathname()
  const groups = groupByCategory(docs)

  if (docs.length === 0) return null

  return (
    <nav aria-label="Índice de documentación" className="flex flex-col gap-6">
      {groups.map(([category, items]) => (
        <div key={category} className="flex flex-col gap-2">
          <p className="px-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            {category}
          </p>
          <ul className="flex flex-col gap-0.5">
            {items.map((doc) => {
              const href = `/docs/${doc.slug}`
              const active = pathname === href

              return (
                <li key={doc.slug}>
                  <Link
                    href={href}
                    aria-current={active ? 'page' : undefined}
                    className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
                      active
                        ? 'bg-primary/12 font-medium text-primary'
                        : 'text-muted-foreground hover:bg-secondary/60 hover:text-foreground'
                    }`}
                  >
                    <FileText className="size-3.5 shrink-0" aria-hidden="true" />
                    <span className="truncate">{doc.title}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )
}
