'use client'

import { useEffect, useRef, useState } from 'react'

const MINECRAFT_USERNAME = 'Shodzery'

const PRIMARY_SKIN_URL = `https://mc-heads.net/skin/${MINECRAFT_USERNAME}`
const FALLBACK_SKIN_URL = `https://minotar.net/skin/${MINECRAFT_USERNAME}`

/**
 * Visor de skin para la página 404: corre asustado y gira sobre
 * sí mismo, como si se hubiera perdido buscando esta página.
 * Es una copia reducida de MinecraftSkinViewer (misma skin, mismo
 * patrón de carga) pero con RunningAnimation en vez de IdleAnimation,
 * para no tocar el visor que usan el resto de las páginas.
 */
export function NotFoundSkinViewer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [loaded, setLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    let viewer: import('skinview3d').SkinViewer | null = null
    let disposed = false
    let resizeObserver: ResizeObserver | null = null

    async function initializeViewer() {
      if (!canvasRef.current || !containerRef.current) {
        return
      }

      try {
        const { SkinViewer, RunningAnimation } = await import('skinview3d')

        if (disposed || !canvasRef.current || !containerRef.current) {
          return
        }

        const containerWidth = containerRef.current.clientWidth || 240
        const containerHeight = containerRef.current.clientHeight || 320

        viewer = new SkinViewer({
          canvas: canvasRef.current,
          width: containerWidth,
          height: containerHeight,
        })

        // Gira más rápido que en el inicio: parece que huye en círculos.
        viewer.autoRotate = true
        viewer.autoRotateSpeed = 1.1

        // Corriendo, un poco más rápido de lo normal (nervioso).
        viewer.animation = new RunningAnimation()
        viewer.animation.speed = 1.35

        viewer.controls.enableZoom = false
        viewer.controls.enablePan = false
        viewer.zoom = 0.85

        viewer.globalLight.intensity = 2.6
        viewer.cameraLight.intensity = 1.2
        viewer.cameraLight.color.set(0x50fa9c)

        try {
          await viewer.loadSkin(PRIMARY_SKIN_URL)
        } catch (primaryError) {
          console.warn(
            'No se pudo cargar la skin desde MCHeads. Probando Minotar.',
            primaryError,
          )
          await viewer.loadSkin(FALLBACK_SKIN_URL)
        }

        if (disposed) {
          viewer.dispose()
          return
        }

        setLoaded(true)
        setHasError(false)

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
        if (reducedMotion.matches) {
          viewer.autoRotate = false
          if (viewer.animation) viewer.animation.speed = 0
        }

        resizeObserver = new ResizeObserver(() => {
          if (!viewer || !containerRef.current || disposed) return
          viewer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
        })
        resizeObserver.observe(containerRef.current)
      } catch (error) {
        console.error(`No se pudo cargar la skin de ${MINECRAFT_USERNAME}:`, error)
        if (!disposed) {
          setLoaded(false)
          setHasError(true)
        }
      }
    }

    initializeViewer()

    return () => {
      disposed = true
      resizeObserver?.disconnect()
      viewer?.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative h-[260px] w-full max-w-[220px] sm:h-[320px] sm:max-w-[260px]"
      role="img"
      aria-label={`Skin de Minecraft de ${MINECRAFT_USERNAME}, corriendo perdida`}
    >
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl"
      />

      {!loaded && !hasError && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3">
          <div className="size-7 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
        </div>
      )}

      {hasError && (
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <span className="font-pixel text-xs text-muted-foreground">404</span>
        </div>
      )}

      <canvas
        ref={canvasRef}
        className={`relative z-10 h-full w-full transition-opacity duration-700 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div
        aria-hidden="true"
        className="absolute bottom-4 left-1/2 h-3 w-24 -translate-x-1/2 rounded-full bg-black/50 blur-md"
      />
    </div>
  )
}
