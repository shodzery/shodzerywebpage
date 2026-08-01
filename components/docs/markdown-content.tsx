'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { slugify } from '@/lib/docs-shared'

/**
 * Renderiza Markdown con los estilos del sitio.
 * Soporta negritas, títulos, listas, tablas, citas, código e imágenes.
 */
export function MarkdownContent({ content }: { content: string }) {
  return (
    <div className="max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="mt-10 mb-4 scroll-mt-28 text-balance font-mono text-3xl font-bold text-foreground first:mt-0">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2
              id={slugify(String(children))}
              className="mt-10 mb-4 scroll-mt-28 border-b border-border/60 pb-2 text-balance font-mono text-2xl font-bold text-foreground first:mt-0"
            >
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3
              id={slugify(String(children))}
              className="mt-8 mb-3 scroll-mt-28 text-balance text-xl font-semibold text-foreground"
            >
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="mt-6 mb-2 text-base font-semibold text-foreground">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="mb-4 leading-relaxed text-pretty text-muted-foreground">
              {children}
            </p>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-foreground">{children}</strong>
          ),
          em: ({ children }) => <em className="italic text-foreground/90">{children}</em>,
          a: ({ href, children }) => (
            <a
              href={href}
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="font-medium text-primary underline decoration-primary/40 underline-offset-4 transition-colors hover:decoration-primary"
            >
              {children}
            </a>
          ),
          ul: ({ children }) => (
            <ul className="mb-4 flex list-disc flex-col gap-2 pl-6 text-muted-foreground marker:text-primary">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-4 flex list-decimal flex-col gap-2 pl-6 text-muted-foreground marker:text-primary">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="mb-4 rounded-r-md border-l-2 border-primary bg-primary/5 px-4 py-2 text-muted-foreground italic">
              {children}
            </blockquote>
          ),
          code: ({ className, children }) => {
            // Los bloques de código llevan clase `language-*`; el resto es inline.
            if (!className) {
              return (
                <code className="rounded bg-secondary/70 px-1.5 py-0.5 font-mono text-[0.85em] text-primary">
                  {children}
                </code>
              )
            }

            return <code className="font-mono text-sm text-foreground">{children}</code>
          },
          pre: ({ children }) => (
            <pre className="glass-card mb-4 overflow-x-auto rounded-lg p-4 text-sm">
              {children}
            </pre>
          ),
          img: ({ src, alt }) => (
            // Imágenes de usuario en Markdown: <img> nativo evita
            // configurar dominios remotos en next.config.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={typeof src === 'string' ? src : '/placeholder.svg'}
              alt={alt ?? ''}
              className="mb-4 w-full rounded-lg border border-border/60"
              loading="lazy"
            />
          ),
          hr: () => <hr className="my-8 border-border/60" />,
          table: ({ children }) => (
            <div className="glass-card mb-4 overflow-x-auto rounded-lg">
              <table className="w-full text-left text-sm">{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border-b border-border/60 px-4 py-3 font-semibold text-foreground">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border-b border-border/40 px-4 py-3 text-muted-foreground">
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
