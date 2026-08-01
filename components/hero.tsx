'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import {
  Boxes,
  ChevronDown,
  Code2,
  Compass,
  Cpu,
  Gauge,
  Gem,
  Network,
  Package,
  Sword,
  TerminalSquare,
  Zap,
} from 'lucide-react'
import { identity, supportedVersions } from '@/data/portfolio'
import { MinecraftSkinViewer } from '@/components/minecraft-skin-viewer'

const floatingItems = [
  { icon: TerminalSquare, label: 'Bloque de comandos', className: 'left-[6%] top-[22%]', delay: 0 },
  { icon: Gem, label: 'Esmeralda', className: 'right-[8%] top-[18%]', delay: 0.6 },
  { icon: Compass, label: 'Brújula', className: 'left-[12%] bottom-[24%]', delay: 1.2 },
  { icon: Sword, label: 'Espada', className: 'right-[14%] bottom-[30%]', delay: 1.8 },
  { icon: Package, label: 'Cofre', className: 'left-[42%] top-[12%]', delay: 2.4 },
  { icon: Zap, label: 'Redstone', className: 'right-[38%] bottom-[14%]', delay: 3 },
]

const pillars = [
  { icon: Code2, label: 'Plugins a medida' },
  { icon: Boxes, label: 'Mods Fabric / NeoForge' },
  { icon: Gauge, label: 'Optimización extrema' },
  { icon: Network, label: 'Redes Velocity' },
  { icon: Cpu, label: 'Automatización' },
]

export function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="inicio"
      className="relative flex min-h-svh items-center overflow-hidden pt-28 pb-16"
    >
      <div className="grid-fade absolute inset-0" aria-hidden="true" />

      {/* Elementos decorativos flotantes */}
      {floatingItems.map(({ icon: Icon, label, className, delay }) => (
        <motion.div
          key={label}
          className={`absolute hidden text-primary/25 lg:block ${className}`}
          animate={reduceMotion ? undefined : { y: [0, -14, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          <Icon className="size-8" strokeWidth={1.5} />
        </motion.div>
      ))}

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.15fr_1fr]">
        <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-foreground/90"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-success/70" />
              <span className="relative inline-flex size-2 rounded-full bg-success" />
            </span>
            {identity.availability}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-pixel text-balance text-5xl text-primary text-glow sm:text-6xl lg:text-7xl"
          >
            {identity.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gradient text-balance text-2xl font-bold sm:text-3xl"
          >
            {identity.role}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="max-w-xl text-pretty font-medium leading-relaxed text-foreground/80"
          >
            {identity.subrole}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-xl text-pretty leading-relaxed text-muted-foreground"
          >
            {identity.tagline}
          </motion.p>

          {/* Pilares técnicos */}
          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap justify-center gap-2 lg:justify-start"
          >
            {pillars.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="glass-soft flex items-center gap-2 rounded-full px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                <Icon className="size-3.5 text-primary" aria-hidden="true" />
                {label}
              </li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4 lg:justify-start"
          >
            <Link
              href="/servicios"
              className="glow-primary shine rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              Ver servicios
            </Link>
            <Link
              href="/proyectos"
              className="glass-card rounded-md px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              Proyectos destacados
            </Link>
            <Link
              href="/contacto"
              className="rounded-md px-2 py-3 text-sm font-semibold text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline focus-visible:outline-2 focus-visible:outline-ring"
            >
              Contactarme
            </Link>
          </motion.div>

          {/* Versiones soportadas */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col items-center gap-2 lg:items-start"
          >
            <span className="text-xs uppercase tracking-widest text-muted-foreground/70">
              Versiones con las que trabajo
            </span>
            <div className="flex flex-wrap justify-center gap-1.5 lg:justify-start">
              {supportedVersions.map((v) => (
                <span
                  key={v}
                  className="font-pixel rounded-sm border border-border/70 bg-secondary/40 px-2 py-0.5 text-xs text-foreground/70"
                >
                  {v}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="relative flex justify-center"
        >
          <div
            className="aurora-violet pointer-events-none absolute inset-0 -z-10 rounded-full blur-3xl"
            aria-hidden="true"
          />
          <MinecraftSkinViewer />
        </motion.div>
      </div>

      {/* Indicador de desplazamiento */}
      <motion.a
        href="#sobre-mi"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary"
        animate={reduceMotion ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        aria-label="Desplazarse a la sección Sobre mí"
      >
        <ChevronDown className="size-6" aria-hidden="true" />
      </motion.a>
    </section>
  )
}
