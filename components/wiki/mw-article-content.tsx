import { ExternalLink } from 'lucide-react'

export interface MwPageData {
  title: string
  html: string
  thumbnail: string | null
}

function articleUrl(title: string): string {
  return `https://minecraft.wiki/w/${encodeURIComponent(title.replace(/ /g, '_'))}`
}

/**
 * Renderiza el artículo completo de minecraft.wiki: texto, tablas
 * (recetas, infobox) e imágenes, con clases utilitarias para que
 * encaje con el tema oscuro del sitio, más atribución obligatoria.
 */
export function MwArticleContent({ page }: { page: MwPageData }) {
  return (
    <div className="flex flex-col gap-5">
      <div
        className="mw-article text-sm leading-relaxed text-muted-foreground
          [&_.infobox]:my-4 [&_.infobox]:w-full [&_.infobox]:max-w-full [&_.infobox]:rounded-lg [&_.infobox]:border [&_.infobox]:border-border/50 [&_.infobox]:bg-secondary/20 [&_.infobox]:p-3 [&_.infobox]:text-xs
          [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2
          [&_h2]:mb-2 [&_h2]:mt-7 [&_h2]:border-b [&_h2]:border-border/40 [&_h2]:pb-1.5 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-foreground
          [&_h3]:mb-2 [&_h3]:mt-5 [&_h3]:font-bold [&_h3]:text-foreground
          [&_h4]:mb-1.5 [&_h4]:mt-4 [&_h4]:font-semibold [&_h4]:text-foreground
          [&_img]:mx-auto [&_img]:my-2 [&_img]:inline-block [&_img]:max-w-full [&_img]:rounded [&_img]:[image-rendering:pixelated]
          [&_li]:mb-1
          [&_ol]:list-decimal [&_ol]:pl-5
          [&_p]:mb-3
          [&_strong]:text-foreground
          [&_table]:my-4 [&_table]:w-full [&_table]:border-collapse [&_table]:overflow-hidden [&_table]:rounded-lg [&_table]:text-xs
          [&_td]:border [&_td]:border-border/30 [&_td]:p-2 [&_td]:align-top
          [&_th]:border [&_th]:border-border/30 [&_th]:bg-secondary/50 [&_th]:p-2 [&_th]:text-foreground
          [&_ul]:list-disc [&_ul]:pl-5
          [&_figure]:my-3 [&_figure]:text-center
          [&_figcaption]:text-xs [&_figcaption]:text-muted-foreground/80"
        // Contenido HTML de un tercero confiable (minecraft.wiki), con
        // estilos y atributos peligrosos ya limpiados en el servidor.
        dangerouslySetInnerHTML={{ __html: page.html }}
      />

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/40 pt-4">
        <p className="text-[11px] leading-relaxed text-muted-foreground/70">
          Contenido de{' '}
          <a
            href="https://minecraft.wiki"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            Minecraft Wiki
          </a>
          , bajo licencia CC BY-NC-SA 3.0.
        </p>
        <a
          href={articleUrl(page.title)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex shrink-0 items-center gap-1.5 text-xs font-medium text-primary hover:underline"
        >
          Ver en minecraft.wiki
          <ExternalLink className="size-3.5" aria-hidden="true" />
        </a>
      </div>
    </div>
  )
}
