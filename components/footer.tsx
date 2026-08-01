import Link from 'next/link'
import { Mail, MessageCircle, Boxes } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'

import { identity, navLinks, socialLinks, supportedVersions } from '@/data/portfolio'

const socials = [
  { icon: MessageCircle, label: 'Discord', href: socialLinks.discord },
  { icon: FaGithub, label: 'GitHub', href: socialLinks.github },
  { icon: Boxes, label: 'Minecraft', href: socialLinks.minecraft },
  { icon: Mail, label: 'Correo', href: socialLinks.email },
]

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <Link
            href="/"
            className="font-pixel text-base text-primary transition-colors hover:text-accent"
          >
            {identity.name}
          </Link>

          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            {identity.role}. Plugins, mods, redes, optimización extrema y
            soluciones personalizadas para servidores de Minecraft.
          </p>

          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, label, href }) => {
              const isExternal = href.startsWith('http')

              return (
                <a
                  key={label}
                  href={href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  aria-label={`Abrir ${label}`}
                  className="flex size-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary focus-visible:outline-2 focus-visible:outline-ring"
                >
                  <Icon className="size-4" aria-hidden="true" />
                </a>
              )
            })}
          </div>
        </div>

        <nav aria-label="Navegación del sitio" className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-foreground/70">
            Navegación
          </p>

          <ul className="grid grid-cols-2 gap-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-ring"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-foreground/70">
            Versiones soportadas
          </p>

          <ul className="flex flex-wrap gap-2">
            {supportedVersions.map((version) => (
              <li
                key={version}
                className="rounded-md border border-border/70 bg-secondary/40 px-2 py-1 font-mono text-[11px] text-muted-foreground"
              >
                {version}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border/50 px-4 py-6 sm:px-6">
        <p className="mx-auto max-w-6xl text-xs text-muted-foreground/70">
          © {new Date().getFullYear()} · {identity.name} — Portafolio dedicado
          al desarrollo y configuración de servidores de Minecraft.
        </p>
      </div>
    </footer>
  )
}
