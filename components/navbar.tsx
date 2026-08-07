'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Menu, X } from 'lucide-react'
import { FaDiscord } from 'react-icons/fa'
import { discord, identity, navLinks } from '@/data/portfolio'

const PRIMARY = ['/', '/servicios', '/tecnologias', '/proyectos', '/github']
const primaryLinks = navLinks.filter((l) => PRIMARY.includes(l.href))
const secondaryLinks = navLinks.filter(
  (l) => !PRIMARY.includes(l.href) && l.href !== '/contacto'
)

// Ajusta estos valores para controlar el "tamaño" del navbar flotante
const FLOAT_MAX_WIDTH = 880 // ancho máx. de la píldora al hacer scroll
const FULL_MAX_WIDTH = 1152 // ancho máx. original (max-w-6xl)
const SCROLL_THRESHOLD = 24 // px de scroll antes de transformar el navbar

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const moreRef = useRef<HTMLLIElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Cierra los menús al cambiar de página
  useEffect(() => {
    setOpen(false)
    setMoreOpen(false)
  }, [pathname])

  // Cierra el desplegable al hacer clic fuera o pulsar Escape
  useEffect(() => {
    if (!moreOpen) return
    const onClick = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false)
      }
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMoreOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [moreOpen])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  const secondaryActive = secondaryLinks.some((l) => isActive(l.href))

  const springTransition = {
    type: 'spring' as const,
    stiffness: 280,
    damping: 28,
    mass: 0.7,
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 sm:px-4">
      {/* Cápsula animada: se encoge, flota, se redondea y gana blur al hacer scroll */}
      <motion.div
        initial={false}
        animate={{
          marginTop: scrolled ? 14 : 0,
          maxWidth: scrolled ? FLOAT_MAX_WIDTH : FULL_MAX_WIDTH,
          borderRadius: scrolled ? 999 : 0,
        }}
        transition={springTransition}
        className={`mx-auto w-full border transition-colors duration-300 ${
          scrolled
            ? 'border-border/60 bg-background/70 shadow-[0_8px_30px_-8px_rgba(0,0,0,0.45),0_2px_10px_-2px_rgba(0,0,0,0.25)] backdrop-blur-xl'
            : 'border-transparent bg-transparent shadow-none'
        }`}
      >
        <nav
          className={`mx-auto flex items-center justify-between gap-4 transition-[padding] duration-300 ease-out ${
            scrolled ? 'px-4 py-2 sm:px-5' : 'px-4 py-3 sm:px-6'
          }`}
          aria-label="Navegación principal"
        >
          <Link
            href="/"
            className="group flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            <span className="glass-card flex size-8 items-center justify-center rounded-md text-primary transition-colors group-hover:border-primary/50">
              <span className="font-pixel text-sm">S</span>
            </span>
            <span className="font-pixel text-lg text-primary text-glow">
              {identity.name}
            </span>
          </Link>

          {/* Navegación escritorio */}
          <ul className="hidden items-center gap-0.5 lg:flex">
            {primaryLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className={`relative rounded-full px-3 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-ring ${
                    isActive(link.href)
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-primary/12 ring-1 ring-primary/25"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            ))}

            {/* Desplegable con el resto de secciones */}
            <li className="relative" ref={moreRef}>
              <button
                type="button"
                onClick={() => setMoreOpen((o) => !o)}
                aria-expanded={moreOpen}
                className={`flex items-center gap-1 rounded-full px-3 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-ring ${
                  secondaryActive || moreOpen
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Más
                <ChevronDown
                  className={`size-3.5 transition-transform ${moreOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>

              {/* El contenedor absoluto va aparte: las clases con
                  `position: relative` (border-gradient) anularían `absolute`. */}
              <div className="pointer-events-none absolute right-0 top-full z-50 w-56 pt-2 [&>*]:pointer-events-auto">
                <AnimatePresence>
                  {moreOpen && (
                    <motion.ul
                      initial={{ opacity: 0, y: -6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.98 }}
                      transition={{ duration: 0.16, ease: 'easeOut' }}
                      className="glass-card border-gradient origin-top max-h-[70vh] overflow-y-auto rounded-xl bg-background/95 p-1.5 shadow-2xl shadow-primary/10"
                    >
                      {secondaryLinks.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            onClick={() => setMoreOpen(false)}
                            aria-current={isActive(link.href) ? 'page' : undefined}
                            className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                              isActive(link.href)
                                ? 'bg-primary/12 text-primary'
                                : 'text-muted-foreground hover:bg-secondary/60 hover:text-foreground'
                            }`}
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </li>
          </ul>

          <div className="flex items-center gap-2">
            <Link
              href="/contacto"
              className="glow-primary hidden items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:flex"
            >
              <FaDiscord className="size-4" aria-hidden="true" />
              {discord.username}
            </Link>

            {/* Botón menú móvil */}
            <button
              type="button"
              className="rounded-full p-2 text-foreground transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-ring lg:hidden"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            >
              {open ? (
                <X className="size-5" aria-hidden="true" />
              ) : (
                <Menu className="size-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>

        {/* Menú móvil */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className={`overflow-hidden border-t border-border/60 bg-background/95 backdrop-blur-xl lg:hidden ${
                scrolled ? 'rounded-b-[28px]' : ''
              }`}
            >
              <ul className="grid grid-cols-2 gap-1 p-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`block rounded-xl px-4 py-3 text-sm transition-colors ${
                        isActive(link.href)
                          ? 'bg-primary/12 text-primary'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  )
}