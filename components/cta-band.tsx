import Link from 'next/link'
import { ArrowRight, MessageCircle } from 'lucide-react'

import { discord, socialLinks } from '@/data/portfolio'

export function CtaBand({
  title = '¿Tienes un servidor en mente?',
  description = 'Cuéntame la versión, el tipo de servidor y qué necesitas. Reviso el estado actual y te propongo un plan técnico por fases.',
}: {
  title?: string
  description?: string
}) {
  return (
    <section className="relative py-20" aria-labelledby="cta-title">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="glass-card relative overflow-hidden rounded-xl p-8 text-center sm:p-12">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                'radial-gradient(circle at 50% 0%, color-mix(in oklab, var(--primary) 22%, transparent), transparent 65%)',
            }}
            aria-hidden="true"
          />

          <div className="relative flex flex-col items-center gap-5">
            <h2
              id="cta-title"
              className="text-balance font-pixel text-xl text-foreground sm:text-2xl"
            >
              {title}
            </h2>

            <p className="max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
              {description}
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contacto"
                className="btn-primary inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-semibold"
              >
                Iniciar un proyecto
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>

              <a
                href={socialLinks.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/50 hover:text-primary focus-visible:outline-2 focus-visible:outline-ring"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                {discord.username}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
