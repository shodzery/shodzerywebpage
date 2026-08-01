'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Clock, Copy, ExternalLink, IdCard, ListChecks } from 'lucide-react'
import { FaDiscord } from 'react-icons/fa'

import { SectionHeading } from '@/components/section-heading'
import { discord, serverTypes } from '@/data/portfolio'

const DISCORD_USERNAME = discord.username
const DISCORD_USER_ID = discord.userId
const DISCORD_PROFILE_URL = discord.profileUrl

const briefingPoints = [
  'Versión de Minecraft y núcleo actual (Paper, Fabric, etc.)',
  'Tipo de servidor o modalidad que quieres construir',
  'Qué está fallando hoy o qué quieres añadir',
  'Si necesitas desarrollo a medida o solo configuración',
  'Plazos aproximados y si ya tienes hosting',
]

export function Contact({ showHeading = true }: { showHeading?: boolean }) {
  const [copied, setCopied] = useState(false)
  const [copiedId, setCopiedId] = useState(false)

  async function copyText(value: string) {
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      const textarea = document.createElement('textarea')

      textarea.value = value
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'

      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }
  }

  async function copyDiscordUsername() {
    await copyText(DISCORD_USERNAME)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2500)
  }

  async function copyDiscordId() {
    await copyText(DISCORD_USER_ID)
    setCopiedId(true)
    window.setTimeout(() => setCopiedId(false), 2500)
  }

  async function openDiscordProfile() {
    await copyDiscordUsername()
    window.open(DISCORD_PROFILE_URL, '_blank', 'noopener,noreferrer')
  }

  return (
    <section
      id="contacto"
      className="relative scroll-mt-24 overflow-hidden py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#5865f2]/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        {showHeading && (
          <SectionHeading
            label="{ 07 }"
            title="Contacto"
            description="¿Necesitas un plugin, una optimización o un servidor completo? Hablemos directamente por Discord."
          />
        )}

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="glass-card relative overflow-hidden rounded-2xl border border-[#5865f2]/20 p-6 sm:p-10"
        >
          <div
            aria-hidden="true"
            className="absolute -right-20 -top-20 size-64 rounded-full bg-[#5865f2]/10 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="aurora-violet absolute -bottom-24 -left-16 size-64 rounded-full blur-3xl"
          />

          <div className="relative flex flex-col items-center gap-8 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="flex size-20 items-center justify-center rounded-2xl border border-[#5865f2]/30 bg-[#5865f2]/10 shadow-[0_0_40px_rgba(88,101,242,0.18)]"
            >
              <FaDiscord className="size-10 text-[#7289da]" aria-hidden="true" />
            </motion.div>

            <div className="flex max-w-2xl flex-col items-center gap-3">
              <h3 className="text-2xl font-bold sm:text-3xl">
                Hablemos por Discord
              </h3>

              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                Escríbeme para hablar sobre desarrollo de plugins o mods,
                configuración de servidores, redes Velocity, optimización de
                rendimiento, sistemas RPG, paneles web o integraciones con
                Discord.
              </p>
            </div>

            {/* Usuario e ID de Discord */}
            <div className="grid w-full max-w-2xl gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={copyDiscordUsername}
                aria-label={`Copiar usuario de Discord ${DISCORD_USERNAME}`}
                className="group flex items-center justify-between gap-4 rounded-lg border border-border bg-background/60 px-5 py-4 text-left transition-all hover:border-[#5865f2]/60 hover:bg-[#5865f2]/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5865f2]"
              >
                <div className="flex items-center gap-3">
                  <FaDiscord
                    className="size-5 shrink-0 text-[#7289da]"
                    aria-hidden="true"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Usuario</span>
                    <span className="font-mono text-base font-semibold text-foreground">
                      {DISCORD_USERNAME}
                    </span>
                  </div>
                </div>
                <span className="flex shrink-0 items-center gap-2 text-sm text-muted-foreground transition-colors group-hover:text-[#7289da]">
                  {copied ? (
                    <Check className="size-4 text-success" aria-hidden="true" />
                  ) : (
                    <Copy className="size-4" aria-hidden="true" />
                  )}
                </span>
              </button>

              <button
                type="button"
                onClick={copyDiscordId}
                aria-label={`Copiar ID de Discord ${DISCORD_USER_ID}`}
                className="group flex items-center justify-between gap-4 rounded-lg border border-border bg-background/60 px-5 py-4 text-left transition-all hover:border-primary/50 hover:bg-primary/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <IdCard
                    className="size-5 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <div className="flex min-w-0 flex-col">
                    <span className="text-xs text-muted-foreground">
                      ID de Discord
                    </span>
                    <span className="truncate font-mono text-sm font-semibold text-foreground">
                      {DISCORD_USER_ID}
                    </span>
                  </div>
                </div>
                <span className="flex shrink-0 items-center gap-2 text-sm text-muted-foreground transition-colors group-hover:text-primary">
                  {copiedId ? (
                    <Check className="size-4 text-success" aria-hidden="true" />
                  ) : (
                    <Copy className="size-4" aria-hidden="true" />
                  )}
                </span>
              </button>
            </div>

            <div className="flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
              <button
                type="button"
                onClick={openDiscordProfile}
                className="flex w-full items-center justify-center gap-2 rounded-md bg-[#5865f2] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(88,101,242,0.22)] transition-all hover:scale-[1.02] hover:bg-[#4752c4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5865f2] sm:w-auto"
              >
                <FaDiscord className="size-5" aria-hidden="true" />
                Abrir mi perfil
                <ExternalLink className="size-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={copyDiscordUsername}
                className="flex w-full items-center justify-center gap-2 rounded-md border border-border bg-background/40 px-6 py-3 text-sm font-semibold text-foreground transition-all hover:border-[#5865f2]/50 hover:text-[#7289da] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5865f2] sm:w-auto"
              >
                {copied ? (
                  <>
                    <Check className="size-4 text-success" aria-hidden="true" />
                    Usuario copiado
                  </>
                ) : (
                  <>
                    <Copy className="size-4" aria-hidden="true" />
                    Copiar usuario
                  </>
                )}
              </button>
            </div>

            <p
              aria-live="polite"
              className="min-h-5 text-xs text-muted-foreground"
            >
              {copied
                ? 'Usuario copiado. Ya puedes agregarme o enviarme un mensaje en Discord.'
                : 'El botón abrirá directamente mi perfil de Discord.'}
            </p>
          </div>
        </motion.div>

        {/* Información complementaria */}
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45 }}
            className="glass-card flex flex-col gap-4 rounded-xl p-6"
          >
            <h4 className="flex items-center gap-2 font-semibold">
              <ListChecks className="size-4 text-primary" aria-hidden="true" />
              Qué incluir en tu primer mensaje
            </h4>
            <ul className="flex flex-col gap-2">
              {briefingPoints.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground"
                >
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-success"
                    aria-hidden="true"
                  />
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="glass-card flex flex-col gap-4 rounded-xl p-6"
          >
            <h4 className="flex items-center gap-2 font-semibold">
              <Clock className="size-4 text-primary" aria-hidden="true" />
              Tipos de proyecto que acepto
            </h4>
            <ul className="flex flex-wrap gap-2">
              {serverTypes.map((type) => (
                <li
                  key={type}
                  className="rounded-md border border-border bg-secondary/50 px-3 py-1.5 text-sm text-foreground/85 transition-colors hover:border-primary/40 hover:text-primary"
                >
                  {type}
                </li>
              ))}
            </ul>
            <p className="mt-auto text-xs leading-relaxed text-muted-foreground">
              Respondo por Discord y, si el proyecto encaja, preparo una
              propuesta técnica por fases con alcance y criterios de éxito
              claros.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
