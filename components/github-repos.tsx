'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  CircleDot,
  ExternalLink,
  GitFork,
  Globe,
  Scale,
  Search,
  Star,
} from 'lucide-react'

import {
  languageColor,
  relativeDate,
  type GitHubRepo,
} from '@/lib/github'

type SortKey = 'pushed' | 'stars' | 'name'

const sortOptions: { key: SortKey; label: string }[] = [
  { key: 'pushed', label: 'Actividad' },
  { key: 'stars', label: 'Estrellas' },
  { key: 'name', label: 'Nombre' },
]

export function GitHubRepos({ repos }: { repos: GitHubRepo[] }) {
  const [query, setQuery] = useState('')
  const [language, setLanguage] = useState<string>('Todos')
  const [sort, setSort] = useState<SortKey>('pushed')

  const languages = useMemo(() => {
    const set = new Set<string>()
    for (const repo of repos) if (repo.language) set.add(repo.language)
    return ['Todos', ...Array.from(set).sort()]
  }, [repos])

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()

    const list = repos.filter((repo) => {
      const matchesLanguage =
        language === 'Todos' || repo.language === language

      if (!matchesLanguage) return false
      if (!term) return true

      return (
        repo.name.toLowerCase().includes(term) ||
        (repo.description ?? '').toLowerCase().includes(term) ||
        (repo.topics ?? []).some((topic) => topic.includes(term))
      )
    })

    return [...list].sort((a, b) => {
      if (sort === 'stars') return b.stargazers_count - a.stargazers_count
      if (sort === 'name') return a.name.localeCompare(b.name)
      return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
    })
  }, [repos, query, language, sort])

  return (
    <div className="flex flex-col gap-6">
      <div className="glass-card flex flex-col gap-4 rounded-xl p-4 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <label htmlFor="repo-search" className="sr-only">
              Buscar repositorios
            </label>
            <input
              id="repo-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por nombre, descripción o topic..."
              className="w-full rounded-md border border-border bg-input/60 py-2.5 pl-9 pr-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/50 focus-visible:outline-2 focus-visible:outline-ring"
            />
          </div>

          <div
            className="flex items-center gap-1 rounded-md border border-border bg-secondary/40 p-1"
            role="group"
            aria-label="Ordenar repositorios"
          >
            {sortOptions.map((option) => (
              <button
                key={option.key}
                type="button"
                onClick={() => setSort(option.key)}
                aria-pressed={sort === option.key}
                className={`rounded px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-ring ${
                  sort === option.key
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <ul className="flex flex-wrap gap-2">
          {languages.map((item) => (
            <li key={item}>
              <button
                type="button"
                onClick={() => setLanguage(item)}
                aria-pressed={language === item}
                className={`flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs transition-colors focus-visible:outline-2 focus-visible:outline-ring ${
                  language === item
                    ? 'border-primary/50 bg-primary/15 text-primary'
                    : 'border-border text-muted-foreground hover:border-primary/30 hover:text-foreground'
                }`}
              >
                {item !== 'Todos' && (
                  <span
                    className="size-2 rounded-full"
                    style={{ backgroundColor: languageColor(item) }}
                    aria-hidden="true"
                  />
                )}
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <p className="font-mono text-xs text-muted-foreground">
        {filtered.length} de {repos.length} repositorios
      </p>

      {filtered.length === 0 ? (
        <div className="glass-card rounded-xl p-10 text-center">
          <p className="text-sm text-muted-foreground">
            No hay repositorios que coincidan con la búsqueda.
          </p>
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((repo, index) => (
            <motion.li
              key={repo.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.32, delay: Math.min(index, 8) * 0.04 }}
              className="glass-card group flex flex-col gap-3 rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/45"
            >
              <div className="flex items-start justify-between gap-3">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-mono text-sm font-semibold text-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-ring"
                >
                  {repo.name}
                  <ExternalLink
                    className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </a>

                {repo.fork && (
                  <span className="shrink-0 rounded border border-border px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                    fork
                  </span>
                )}
              </div>

              <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                {repo.description ?? 'Sin descripción.'}
              </p>

              {repo.topics?.length > 0 && (
                <ul className="flex flex-wrap gap-1.5">
                  {repo.topics.slice(0, 4).map((topic) => (
                    <li
                      key={topic}
                      className="rounded bg-primary/10 px-1.5 py-0.5 font-mono text-[10px] text-primary"
                    >
                      {topic}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border/60 pt-4 text-xs text-muted-foreground">
                {repo.language && (
                  <span className="flex items-center gap-1.5">
                    <span
                      className="size-2.5 rounded-full"
                      style={{ backgroundColor: languageColor(repo.language) }}
                      aria-hidden="true"
                    />
                    {repo.language}
                  </span>
                )}

                <span className="flex items-center gap-1">
                  <Star className="size-3.5" aria-hidden="true" />
                  {repo.stargazers_count}
                </span>

                <span className="flex items-center gap-1">
                  <GitFork className="size-3.5" aria-hidden="true" />
                  {repo.forks_count}
                </span>

                {repo.open_issues_count > 0 && (
                  <span className="flex items-center gap-1">
                    <CircleDot className="size-3.5" aria-hidden="true" />
                    {repo.open_issues_count}
                  </span>
                )}

                {repo.license?.spdx_id &&
                  repo.license.spdx_id !== 'NOASSERTION' && (
                    <span className="flex items-center gap-1">
                      <Scale className="size-3.5" aria-hidden="true" />
                      {repo.license.spdx_id}
                    </span>
                  )}

                <span className="ml-auto font-mono">
                  {relativeDate(repo.pushed_at)}
                </span>
              </div>

              {repo.homepage && (
                <a
                  href={repo.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-fit items-center gap-1.5 text-xs text-primary transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-ring"
                >
                  <Globe className="size-3.5" aria-hidden="true" />
                  Ver demo
                </a>
              )}
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  )
}
