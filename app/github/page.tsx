import type { Metadata } from 'next'
import Image from 'next/image'
import {
  Calendar,
  ExternalLink,
  GitFork,
  MapPin,
  Star,
  TriangleAlert,
  Users,
} from 'lucide-react'

import { PageHeader } from '@/components/page-header'
import { GitHubRepos } from '@/components/github-repos'
import { CtaBand } from '@/components/cta-band'
import { githubUsername } from '@/data/portfolio'
import { getGitHubData, languageColor } from '@/lib/github'

export const metadata: Metadata = {
  title: 'GitHub',
  description:
    'Repositorios, lenguajes y actividad en vivo de mi perfil de GitHub, obtenidos directamente desde la API pública de GitHub.',
}

export const revalidate = 3600

const errorMessages: Record<string, string> = {
  'not-found': `El usuario "${githubUsername}" no existe todavía en GitHub. Actualiza githubUsername en data/portfolio.ts cuando crees el perfil.`,
  'rate-limited':
    'La API pública de GitHub ha limitado las peticiones temporalmente. Vuelve a intentarlo en unos minutos o añade un GITHUB_TOKEN al proyecto.',
  unknown:
    'No se ha podido conectar con la API de GitHub en este momento. Inténtalo de nuevo más tarde.',
}

export default async function GitHubPage() {
  const { user, repos, languages, totals, error } =
    await getGitHubData(githubUsername)

  return (
    <main className="relative z-10">
      <PageHeader
        icon="Code2"
        eyebrow="{ github }"
        title="Actividad en GitHub"
        description="Datos obtenidos en vivo desde la API pública de GitHub: repositorios, lenguajes utilizados, estrellas y última actividad de cada proyecto."
        meta={[
          { label: 'Usuario', value: `@${githubUsername}` },
          { label: 'Repositorios', value: String(totals.repos) },
          { label: 'Estrellas', value: String(totals.stars) },
          { label: 'Lenguajes', value: String(languages.length) },
        ]}
      />

      <section className="relative py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:px-6">
          {error ? (
            <div className="glass-card flex flex-col items-start gap-3 rounded-xl border-warning/40 p-6">
              <span className="flex items-center gap-2 text-warning">
                <TriangleAlert className="size-4" aria-hidden="true" />
                <span className="text-sm font-semibold">
                  Sin datos de GitHub
                </span>
              </span>

              <p className="text-sm leading-relaxed text-muted-foreground">
                {errorMessages[error]}
              </p>

              <a
                href={`https://github.com/${githubUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-primary transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-ring"
              >
                Abrir el perfil en GitHub
                <ExternalLink className="size-3.5" aria-hidden="true" />
              </a>
            </div>
          ) : (
            <>
              <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
                {user && (
                  <article className="glass-card flex flex-col gap-5 rounded-xl p-6 sm:flex-row sm:items-start">
                    <Image
                      src={user.avatar_url}
                      alt={`Avatar de ${user.login}`}
                      width={96}
                      height={96}
                      className="size-20 shrink-0 rounded-xl ring-1 ring-primary/25 sm:size-24"
                      unoptimized
                    />

                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col">
                        <h2 className="text-lg font-semibold text-foreground">
                          {user.name ?? user.login}
                        </h2>
                        <a
                          href={user.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-fit font-mono text-sm text-primary transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-ring"
                        >
                          @{user.login}
                        </a>
                      </div>

                      {user.bio && (
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {user.bio}
                        </p>
                      )}

                      <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
                        <li className="flex items-center gap-1.5">
                          <Users className="size-3.5" aria-hidden="true" />
                          {user.followers} seguidores · {user.following}{' '}
                          siguiendo
                        </li>

                        {user.location && (
                          <li className="flex items-center gap-1.5">
                            <MapPin className="size-3.5" aria-hidden="true" />
                            {user.location}
                          </li>
                        )}

                        <li className="flex items-center gap-1.5">
                          <Calendar className="size-3.5" aria-hidden="true" />
                          En GitHub desde{' '}
                          {new Date(user.created_at).getFullYear()}
                        </li>
                      </ul>
                    </div>
                  </article>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="glass-card flex flex-col justify-center gap-1 rounded-xl p-5">
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Star className="size-3.5" aria-hidden="true" />
                      Estrellas
                    </span>
                    <span className="font-pixel text-2xl text-primary">
                      {totals.stars}
                    </span>
                  </div>

                  <div className="glass-card flex flex-col justify-center gap-1 rounded-xl p-5">
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <GitFork className="size-3.5" aria-hidden="true" />
                      Forks
                    </span>
                    <span className="font-pixel text-2xl text-primary">
                      {totals.forks}
                    </span>
                  </div>

                  <div className="glass-card flex flex-col justify-center gap-1 rounded-xl p-5">
                    <span className="text-xs text-muted-foreground">
                      Repos propios
                    </span>
                    <span className="font-pixel text-2xl text-primary">
                      {totals.originalRepos}
                    </span>
                  </div>

                  <div className="glass-card flex flex-col justify-center gap-1 rounded-xl p-5">
                    <span className="text-xs text-muted-foreground">
                      Topics usados
                    </span>
                    <span className="font-pixel text-2xl text-primary">
                      {totals.topics}
                    </span>
                  </div>
                </div>
              </div>

              {languages.length > 0 && (
                <div className="glass-card flex flex-col gap-4 rounded-xl p-6">
                  <h2 className="text-sm font-semibold uppercase tracking-widest text-foreground/80">
                    Lenguajes por repositorio
                  </h2>

                  <div
                    className="flex h-2.5 overflow-hidden rounded-full bg-secondary"
                    role="img"
                    aria-label="Distribución de lenguajes en los repositorios"
                  >
                    {languages.map((item) => (
                      <span
                        key={item.name}
                        style={{
                          width: `${item.percentage}%`,
                          backgroundColor: languageColor(item.name),
                        }}
                      />
                    ))}
                  </div>

                  <ul className="flex flex-wrap gap-x-5 gap-y-2">
                    {languages.map((item) => (
                      <li
                        key={item.name}
                        className="flex items-center gap-1.5 text-xs text-muted-foreground"
                      >
                        <span
                          className="size-2.5 rounded-full"
                          style={{ backgroundColor: languageColor(item.name) }}
                          aria-hidden="true"
                        />
                        {item.name}
                        <span className="font-mono text-foreground/70">
                          {item.percentage}%
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {repos.length > 0 ? (
                <GitHubRepos repos={repos} />
              ) : (
                <div className="glass-card rounded-xl p-10 text-center">
                  <p className="text-sm text-muted-foreground">
                    Este perfil todavía no tiene repositorios públicos.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <CtaBand
        title="¿Quieres código así en tu servidor?"
        description="Desarrollo plugins y mods documentados, versionados y mantenibles. Escríbeme y lo valoramos."
      />
    </main>
  )
}
