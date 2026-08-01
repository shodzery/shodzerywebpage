'use client'

import { useActionState, useRef, useState } from 'react'
import {
  Bold,
  Check,
  Code2,
  Copy,
  Eye,
  Heading2,
  ImagePlus,
  Italic,
  Link2,
  List,
  ListOrdered,
  Pencil,
  Quote,
  Save,
  Table,
} from 'lucide-react'
import type { Doc } from '@/lib/docs'
import { saveDocAction, type ActionState } from '@/app/docs/admin/actions'
import { MarkdownContent } from './markdown-content'

const initialState: ActionState = { ok: false, message: '' }

/** Botones que envuelven o insertan sintaxis Markdown. */
const tools = [
  { icon: Bold, label: 'Negrita', wrap: ['**', '**'], sample: 'texto en negrita' },
  { icon: Italic, label: 'Cursiva', wrap: ['*', '*'], sample: 'texto en cursiva' },
  { icon: Heading2, label: 'Título', wrap: ['\n## ', '\n'], sample: 'Mi título' },
  { icon: List, label: 'Lista', wrap: ['\n- ', ''], sample: 'Elemento' },
  { icon: ListOrdered, label: 'Lista numerada', wrap: ['\n1. ', ''], sample: 'Paso uno' },
  { icon: Quote, label: 'Cita', wrap: ['\n> ', '\n'], sample: 'Nota importante' },
  { icon: Code2, label: 'Código', wrap: ['\n```\n', '\n```\n'], sample: 'tu código aquí' },
  { icon: Link2, label: 'Enlace', wrap: ['[', '](https://)'], sample: 'texto del enlace' },
  {
    icon: ImagePlus,
    label: 'Imagen',
    wrap: ['\n![', '](/docs/mi-imagen.png)\n'],
    sample: 'descripción de la imagen',
  },
  {
    icon: Table,
    label: 'Tabla',
    wrap: ['\n| Columna | Valor |\n| --- | --- |\n| ', ' | dato |\n'],
    sample: 'fila',
  },
] as const

export function DocEditor({ doc }: { doc?: Doc }) {
  const [state, formAction, pending] = useActionState(saveDocAction, initialState)
  const [content, setContent] = useState(doc?.content ?? '')
  const [tab, setTab] = useState<'editar' | 'vista'>('editar')
  const [copied, setCopied] = useState(false)
  const textarea = useRef<HTMLTextAreaElement>(null)

  /** Inserta sintaxis Markdown alrededor de la selección actual. */
  function applyTool(before: string, after: string, sample: string) {
    const el = textarea.current
    if (!el) return

    const { selectionStart: start, selectionEnd: end } = el
    const selected = content.slice(start, end) || sample
    const next = content.slice(0, start) + before + selected + after + content.slice(end)

    setContent(next)

    // Deja el cursor seleccionando el texto insertado.
    requestAnimationFrame(() => {
      el.focus()
      el.setSelectionRange(start + before.length, start + before.length + selected.length)
    })
  }

  async function copyFallback() {
    if (!state.fallback) return
    await navigator.clipboard.writeText(state.fallback)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <input type="hidden" name="originalSlug" value={doc?.slug ?? ''} />
      <input type="hidden" name="content" value={content} />

      {/* Metadatos */}
      <div className="glass-card grid gap-4 rounded-xl p-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2 sm:col-span-2">
          <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            Título
          </span>
          <input
            name="title"
            required
            defaultValue={doc?.title ?? ''}
            placeholder="Cómo optimizar el TPS de tu servidor"
            className="rounded-md border border-border bg-input px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary"
          />
        </label>

        <label className="flex flex-col gap-2 sm:col-span-2">
          <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            Descripción corta
          </span>
          <input
            name="description"
            defaultValue={doc?.description ?? ''}
            placeholder="Guía práctica para bajar el MSPT sin perder contenido."
            className="rounded-md border border-border bg-input px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            Categoría
          </span>
          <input
            name="category"
            defaultValue={doc?.category ?? ''}
            placeholder="Guías"
            className="rounded-md border border-border bg-input px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            Orden en el menú
          </span>
          <input
            name="order"
            type="number"
            defaultValue={doc?.order ?? 1}
            className="rounded-md border border-border bg-input px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-primary"
          />
        </label>

        <label className="flex flex-col gap-2 sm:col-span-2">
          <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            Imagen de portada (opcional)
          </span>
          <input
            name="cover"
            defaultValue={doc?.cover ?? ''}
            placeholder="/docs/mi-portada.png"
            className="rounded-md border border-border bg-input px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary"
          />
          <span className="text-xs text-muted-foreground">
            Sube la imagen a la carpeta{' '}
            <code className="rounded bg-secondary/70 px-1 text-primary">public/docs/</code>{' '}
            y escribe aquí su ruta, o pega una URL completa.
          </span>
        </label>

        <label className="flex flex-col gap-2 sm:col-span-2">
          <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            URL personalizada (opcional)
          </span>
          <input
            name="slug"
            defaultValue={doc?.slug ?? ''}
            placeholder="Se genera desde el título"
            className="rounded-md border border-border bg-input px-3 py-2 font-mono text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary"
          />
        </label>
      </div>

      {/* Editor con barra de herramientas */}
      <div className="glass-card overflow-hidden rounded-xl">
        <div className="flex flex-wrap items-center gap-1 border-b border-border/60 bg-secondary/30 p-2">
          {tools.map((tool) => (
            <button
              key={tool.label}
              type="button"
              title={tool.label}
              aria-label={tool.label}
              onClick={() => applyTool(tool.wrap[0], tool.wrap[1], tool.sample)}
              className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
            >
              <tool.icon className="size-4" aria-hidden="true" />
            </button>
          ))}

          <div className="ml-auto flex gap-1">
            {(['editar', 'vista'] as const).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setTab(value)}
                aria-pressed={tab === value}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                  tab === value
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {value === 'editar' ? (
                  <Pencil className="size-3.5" aria-hidden="true" />
                ) : (
                  <Eye className="size-3.5" aria-hidden="true" />
                )}
                {value === 'editar' ? 'Editar' : 'Vista previa'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2">
          <textarea
            ref={textarea}
            value={content}
            onChange={(event) => setContent(event.target.value)}
            spellCheck={false}
            placeholder={'## Escribe aquí\n\nUsa **negritas**, listas y ![imágenes](/docs/foto.png).'}
            className={`min-h-[28rem] resize-y border-border/60 bg-transparent p-5 font-mono text-sm leading-relaxed text-foreground outline-none placeholder:text-muted-foreground/50 lg:border-r ${
              tab === 'vista' ? 'hidden lg:block' : ''
            }`}
          />

          <div
            className={`min-h-[28rem] overflow-y-auto p-5 ${
              tab === 'editar' ? 'hidden lg:block' : ''
            }`}
          >
            {content.trim() ? (
              <MarkdownContent content={content} />
            ) : (
              <p className="text-sm text-muted-foreground">
                La vista previa aparecerá aquí mientras escribes.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Guardar */}
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          <Save className="size-4" aria-hidden="true" />
          {pending ? 'Guardando…' : doc ? 'Guardar cambios' : 'Crear documento'}
        </button>

        {state.message && (
          <p
            role="status"
            className={`text-sm ${state.ok ? 'text-success' : 'text-destructive'}`}
          >
            {state.message}
          </p>
        )}
      </div>

      {/* Respaldo cuando el disco es de solo lectura (sitio publicado) */}
      {state.fallback && (
        <div className="glass-card flex flex-col gap-3 rounded-xl p-5">
          <div className="flex items-center justify-between gap-4">
            <p className="font-mono text-sm text-foreground">
              content/docs/{state.slug}.md
            </p>
            <button
              type="button"
              onClick={copyFallback}
              className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              {copied ? (
                <Check className="size-3.5" aria-hidden="true" />
              ) : (
                <Copy className="size-3.5" aria-hidden="true" />
              )}
              {copied ? 'Copiado' : 'Copiar'}
            </button>
          </div>
          <pre className="max-h-64 overflow-auto rounded-md bg-secondary/40 p-4 text-xs text-muted-foreground">
            {state.fallback}
          </pre>
        </div>
      )}
    </form>
  )
}
