/**
 * Asigna un icono (del registro de `components/icon-registry`) a cada
 * categoría de documentación. Las categorías son texto libre (las crea
 * quien escribe la documentación), así que esto funciona por
 * coincidencia de palabras clave y cae a un icono genérico si no
 * reconoce ninguna.
 */
const KEYWORD_ICONS: [RegExp, string][] = [
  [/empez|inicio|introducc|primeros pasos/i, 'Compass'],
  [/api/i, 'Code2'],
  [/segur|auth/i, 'ShieldCheck'],
  [/servidor/i, 'Server'],
  [/jugador|usuario|cuenta/i, 'Users'],
  [/wiki/i, 'BookOpen'],
  [/changelog|actualizaci/i, 'FileText'],
  [/novedad|noticia/i, 'Sparkles'],
  [/despliegue|deploy|producci/i, 'RadioTower'],
  [/guía|guia|avanzad/i, 'Workflow'],
  [/arquitectur|estructura/i, 'Layers'],
  [/admin|panel/i, 'Settings'],
]

export function categoryIcon(category: string): string {
  const match = KEYWORD_ICONS.find(([pattern]) => pattern.test(category))
  return match ? match[1] : 'FileText'
}
