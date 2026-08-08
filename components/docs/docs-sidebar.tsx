'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { groupByCategory, type DocMeta } from '@/lib/docs-shared'
import { categoryIcon } from '@/lib/docs-category-icon'
import { Icon } from '@/components/icon-registry'

/** Índice lateral de la documentación, agrupado por categoría con icono. */
export function DocsSidebar({ docs }: { docs: DocMeta[] }) {
  const pathname = usePathname()
  const groups = groupByCategory(docs)

  if (docs.length === 0) return null

  return (
    <nav aria-label="Índice de documentación" className="flex flex-col gap-6">
      {groups.map(([category, items]) => (
        <div key={category} className="flex flex-col gap-2">
          <p className="flex items-center gap-2 px-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            <Icon name={categoryIcon(category)} className="size-3.5 text-primary/70" />
            {category}
          </p>
          <ul className="flex flex-col gap-0.5 border-l border-border/60 pl-2">
            {items.map((doc) => {
              const href = `/docs/${doc.slug}`
              const active = pathname === href

              return (
                <li key={doc.slug}>
                  <Link
                    href={href}
                    aria-current={active ? 'page' : undefined}
                    className={`-ml-px flex items-center gap-2 rounded-md border-l-2 px-3 py-2 text-sm transition-colors ${
                      active
                        ? 'border-primary bg-primary/10 font-medium text-primary'
                        : 'border-transparent text-muted-foreground hover:border-border hover:bg-secondary/60 hover:text-foreground'
                    }`}
                  >
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
