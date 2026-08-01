/**
 * Cliente para la API pública de GitHub.
 * No requiere token: usa los endpoints públicos con revalidación.
 */

export type GitHubUser = {
  login: string
  name: string | null
  avatar_url: string
  html_url: string
  bio: string | null
  location: string | null
  company: string | null
  blog: string | null
  public_repos: number
  followers: number
  following: number
  created_at: string
}

export type GitHubRepo = {
  id: number
  name: string
  full_name: string
  html_url: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  open_issues_count: number
  watchers_count: number
  size: number
  topics: string[]
  fork: boolean
  archived: boolean
  homepage: string | null
  pushed_at: string
  created_at: string
  updated_at: string
  license: { spdx_id: string | null; name: string } | null
}

export type LanguageStat = {
  name: string
  count: number
  percentage: number
}

export type GitHubData = {
  user: GitHubUser | null
  repos: GitHubRepo[]
  languages: LanguageStat[]
  totals: {
    stars: number
    forks: number
    repos: number
    originalRepos: number
    topics: number
  }
  error: 'not-found' | 'rate-limited' | 'unknown' | null
}

const API = 'https://api.github.com'

/** Cabeceras comunes. Si existe GITHUB_TOKEN se usa para ampliar el límite. */
function headers(): HeadersInit {
  const base: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  }

  if (process.env.GITHUB_TOKEN) {
    base.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }

  return base
}

function emptyData(error: GitHubData['error']): GitHubData {
  return {
    user: null,
    repos: [],
    languages: [],
    totals: {
      stars: 0,
      forks: 0,
      repos: 0,
      originalRepos: 0,
      topics: 0,
    },
    error,
  }
}

export async function getGitHubData(username: string): Promise<GitHubData> {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`${API}/users/${username}`, {
        headers: headers(),
        next: { revalidate: 3600 },
      }),
      fetch(
        `${API}/users/${username}/repos?per_page=100&sort=pushed&direction=desc`,
        { headers: headers(), next: { revalidate: 3600 } },
      ),
    ])

    if (userRes.status === 404) return emptyData('not-found')

    if (userRes.status === 403 || userRes.status === 429) {
      return emptyData('rate-limited')
    }

    if (!userRes.ok) return emptyData('unknown')

    const user = (await userRes.json()) as GitHubUser
    const repos = reposRes.ok ? ((await reposRes.json()) as GitHubRepo[]) : []

    const visible = repos.filter((repo) => !repo.archived)

    const languageCount = new Map<string, number>()
    for (const repo of visible) {
      if (!repo.language) continue
      languageCount.set(
        repo.language,
        (languageCount.get(repo.language) ?? 0) + 1,
      )
    }

    const languageTotal = Array.from(languageCount.values()).reduce(
      (acc, value) => acc + value,
      0,
    )

    const languages: LanguageStat[] = Array.from(languageCount.entries())
      .map(([name, count]) => ({
        name,
        count,
        percentage: languageTotal
          ? Math.round((count / languageTotal) * 100)
          : 0,
      }))
      .sort((a, b) => b.count - a.count)

    const topics = new Set<string>()
    for (const repo of visible) {
      for (const topic of repo.topics ?? []) topics.add(topic)
    }

    return {
      user,
      repos: visible,
      languages,
      totals: {
        stars: visible.reduce((acc, r) => acc + r.stargazers_count, 0),
        forks: visible.reduce((acc, r) => acc + r.forks_count, 0),
        repos: visible.length,
        originalRepos: visible.filter((r) => !r.fork).length,
        topics: topics.size,
      },
      error: null,
    }
  } catch {
    return emptyData('unknown')
  }
}

/** Colores de referencia para los lenguajes más habituales. */
export const languageColors: Record<string, string> = {
  Java: '#b07219',
  Kotlin: '#a97bff',
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572a5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Dockerfile: '#384d54',
  YAML: '#cb171e',
  Go: '#00add8',
  Rust: '#dea584',
  'C#': '#178600',
  'C++': '#f34b7d',
  Lua: '#000080',
  Vue: '#41b883',
  Svelte: '#ff3e00',
}

export function languageColor(name: string | null): string {
  if (!name) return 'oklch(0.55 0.02 290)'
  return languageColors[name] ?? 'oklch(0.62 0.19 295)'
}

/** Formatea una fecha ISO a texto relativo en español. */
export function relativeDate(iso: string): string {
  const then = new Date(iso).getTime()
  const diff = Date.now() - then
  const day = 86_400_000

  if (diff < day) return 'hoy'
  const days = Math.floor(diff / day)
  if (days === 1) return 'ayer'
  if (days < 30) return `hace ${days} días`
  const months = Math.floor(days / 30)
  if (months < 12) return `hace ${months} ${months === 1 ? 'mes' : 'meses'}`
  const years = Math.floor(months / 12)
  return `hace ${years} ${years === 1 ? 'año' : 'años'}`
}
