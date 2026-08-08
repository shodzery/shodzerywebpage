import { NextResponse } from 'next/server'
import {
  CATEGORY_FILES,
  type CatalogCategory,
  buildRecipeInfo,
  fetchCategory,
  fetchRecipes,
  normalizeEntry,
} from '@/lib/mcdata'

export const runtime = 'edge'
export const revalidate = 21600

/**
 * GET /api/wiki/[categoria]/[nombre]
 * Devuelve el detalle completo de un elemento del catálogo. Para
 * objetos, incluye además su receta de crafteo (si existe),
 * resuelta contra el registro de recetas de Minecraft.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ categoria: string; nombre: string }> },
) {
  const { categoria, nombre } = await params
  const category = categoria as CatalogCategory

  if (!CATEGORY_FILES[category]) {
    return NextResponse.json({ error: 'Categoría no válida' }, { status: 400 })
  }

  try {
    const raw = await fetchCategory(category)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const found = raw.find((entry: any) => entry?.name === nombre)

    if (!found) {
      return NextResponse.json({ error: 'No se encontró ese elemento' }, { status: 404 })
    }

    const entry = normalizeEntry(category, found)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let recipes: ReturnType<typeof buildRecipeInfo> = []
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let usedIn: any[] = []

    if (category === 'objetos') {
      try {
        const [recipesRaw, itemsAll] = await Promise.all([fetchRecipes(), fetchCategory('objetos')])
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        recipes = buildRecipeInfo((found as any).id, recipesRaw, itemsAll as any[])
      } catch (err) {
        console.error('[wiki detail] error al resolver receta:', err)
      }
    }

    return NextResponse.json(
      {
        ...entry,
        raw: found,
        recipes,
        usedIn,
      },
      { headers: { 'Cache-Control': 'public, s-maxage=21600, stale-while-revalidate=86400' } },
    )
  } catch (error) {
    console.error('[wiki detail] error:', error)
    return NextResponse.json({ error: 'No se pudo obtener el elemento' }, { status: 502 })
  }
}
