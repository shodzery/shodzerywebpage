'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'

export interface LegalSectionMeta {
  id: string
  title: string
}

export function LegalPage({
  sections,
  children,
}: {
  sections: LegalSectionMeta[]
  children: ReactNode
}) {
  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[220px_1fr]">
      <aside className="hidden lg:block">
        <nav className="glass-card sticky top-28 flex max-h-[calc(100vh-8rem)] flex-col gap-1 overflow-y-auto rounded-xl p-4">
          <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            En esta página
          </p>
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="rounded-lg px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground"
            >
              {s.title}
            </a>
          ))}
        </nav>
      </aside>

      <div className="flex flex-col gap-10">{children}</div>
    </div>
  )
}

export function LegalSection({
  id,
  number,
  title,
  children,
}: {
  id: string
  number?: string
  title: string
  children: ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <div className="mb-4 flex items-center gap-3">
        {number && (
          <span className="font-pixel text-xs text-primary/70">{number}</span>
        )}
        <h2 className="text-xl font-bold text-foreground sm:text-2xl">{title}</h2>
      </div>
      <div className="legal-prose flex flex-col gap-3 text-pretty leading-relaxed text-muted-foreground [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-foreground [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-1.5">
        {children}
      </div>
    </section>
  )
}

export function LegalCallout({
  title,
  tone = 'info',
  children,
}: {
  title?: string
  tone?: 'info' | 'warning'
  children: ReactNode
}) {
  return (
    <div
      className={`glass-soft rounded-xl border-l-2 p-5 ${
        tone === 'warning' ? 'border-l-warning' : 'border-l-primary'
      }`}
    >
      {title && <p className="mb-2 font-semibold text-foreground">{title}</p>}
      <div className="flex flex-col gap-2 text-sm leading-relaxed text-muted-foreground [&_strong]:text-foreground">
        {children}
      </div>
    </div>
  )
}

export function LegalContact() {
  return (
    <p>
      Si tienes cualquier duda sobre estos términos, escríbeme por Discord (
      <Link href="/contacto">ver contacto</Link>) o a través del formulario de{' '}
      <Link href="/contacto">contacto</Link> del sitio.
    </p>
  )
}
