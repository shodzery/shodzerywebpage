'use server'

import fs from 'node:fs/promises'
import path from 'node:path'
import { put, del } from '@vercel/blob'
import { revalidatePath } from 'next/cache'
import { BLOB_PREFIX, DOCS_DIR, blobToken, hasBlobStore, isSafeSlug, serializeDoc, slugify } from '@/lib/docs'
import { isAdmin, login, logout } from '@/lib/docs-auth'

export type ActionState = {
  ok: boolean
  message: string
  /** Markdown listo para copiar si el guardado falla por completo. */
  fallback?: string
  slug?: string
}

/** Detecta un sistema de archivos de solo lectura (previews de v0, sin Blob conectado). */
function isReadOnlyError(error: unknown): boolean {
  const code = (error as { code?: string })?.code
  const message = error instanceof Error ? error.message.toLowerCase() : ''
  return (
    code === 'EROFS' ||
    code === 'EACCES' ||
    code === 'EPERM' ||
    message.includes('read-only') ||
    message.includes('read only') ||
    message.includes('permission denied')
  )
}

export async function loginAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const password = String(formData.get('password') ?? '')

  if (!password) {
    return { ok: false, message: 'Escribe la contraseña.' }
  }

  if (!(await login(password))) {
    return { ok: false, message: 'Contraseña incorrecta.' }
  }

  revalidatePath('/docs/admin')
  return { ok: true, message: 'Sesión iniciada.' }
}

export async function logoutAction(): Promise<void> {
  await logout()
  revalidatePath('/docs/admin')
}

export async function saveDocAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  if (!(await isAdmin())) {
    return { ok: false, message: 'No tienes permiso para editar.' }
  }

  const title = String(formData.get('title') ?? '').trim()
  const content = String(formData.get('content') ?? '')
  const originalSlug = String(formData.get('originalSlug') ?? '').trim()
  const customSlug = String(formData.get('slug') ?? '').trim()

  if (!title) return { ok: false, message: 'El título es obligatorio.' }
  if (!content.trim()) return { ok: false, message: 'El contenido está vacío.' }

  const slug = slugify(customSlug || title)
  if (!isSafeSlug(slug)) {
    return { ok: false, message: 'El título no genera una URL válida.' }
  }

  const order = Number(formData.get('order'))
  const markdown = serializeDoc({
    title,
    description: String(formData.get('description') ?? '').trim(),
    category: String(formData.get('category') ?? '').trim() || 'General',
    order: Number.isFinite(order) ? order : 999,
    cover: String(formData.get('cover') ?? '').trim() || null,
    content,
  })

  try {
    if (hasBlobStore()) {
      await put(`${BLOB_PREFIX}${slug}.md`, markdown, {
        access: 'private',
        addRandomSuffix: false,
        allowOverwrite: true,
        contentType: 'text/markdown; charset=utf-8',
        ...blobToken(),
      })

      // Si se renombró el documento, elimina el blob anterior.
      if (originalSlug && originalSlug !== slug && isSafeSlug(originalSlug)) {
        await del(`${BLOB_PREFIX}${originalSlug}.md`, blobToken()).catch(() => {})
      }
    } else {
      await fs.mkdir(DOCS_DIR, { recursive: true })
      await fs.writeFile(path.join(DOCS_DIR, `${slug}.md`), markdown, 'utf8')

      // Si se renombró el documento, elimina el archivo anterior.
      if (originalSlug && originalSlug !== slug && isSafeSlug(originalSlug)) {
        await fs.rm(path.join(DOCS_DIR, `${originalSlug}.md`), { force: true })
      }
    }
  } catch (error) {
    console.error('[docs] No se pudo guardar el documento:', error)

    if (isReadOnlyError(error)) {
      return {
        ok: false,
        message:
          'El sitio publicado no permite escribir archivos. Copia el Markdown de abajo y guárdalo como content/docs/' +
          slug +
          '.md en v0 o GitHub, o conecta un Blob Store en Vercel para que se guarde solo.',
        fallback: markdown,
        slug,
      }
    }

    // No sabemos la causa exacta, pero igual devolvemos el Markdown para
    // que el usuario no pierda lo que escribió.
    return {
      ok: false,
      message:
        'No se pudo guardar automáticamente. Copia el Markdown de abajo y guárdalo como content/docs/' +
        slug +
        '.md en v0 o GitHub.',
      fallback: markdown,
      slug,
    }
  }

  revalidatePath('/docs')
  revalidatePath(`/docs/${slug}`)
  revalidatePath('/docs/admin')

  return { ok: true, message: `Guardado como /docs/${slug}`, slug }
}

export async function deleteDocAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  if (!(await isAdmin())) {
    return { ok: false, message: 'No tienes permiso para borrar.' }
  }

  const slug = String(formData.get('slug') ?? '').trim()
  if (!isSafeSlug(slug)) {
    return { ok: false, message: 'Documento no válido.' }
  }

  try {
    if (hasBlobStore()) {
      await del(`${BLOB_PREFIX}${slug}.md`, blobToken())
    } else {
      await fs.rm(path.join(DOCS_DIR, `${slug}.md`), { force: true })
    }
  } catch (error) {
    console.error('[docs] No se pudo borrar el documento:', error)

    if (isReadOnlyError(error)) {
      return {
        ok: false,
        message:
          'El sitio publicado no permite borrar archivos. Elimina content/docs/' +
          slug +
          '.md desde v0 o GitHub, o conecta un Blob Store en Vercel.',
      }
    }

    return { ok: false, message: 'No se pudo borrar el documento.' }
  }

  revalidatePath('/docs')
  revalidatePath('/docs/admin')

  return { ok: true, message: 'Documento borrado.' }
}
