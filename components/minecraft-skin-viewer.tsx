'use client'

import { useEffect, useRef, useState } from 'react'

const MINECRAFT_USERNAME = 'Shodzery'

const PRIMARY_SKIN_URL = `https://mc-heads.net/skin/${MINECRAFT_USERNAME}`
const FALLBACK_SKIN_URL = `https://minotar.net/skin/${MINECRAFT_USERNAME}`

export function MinecraftSkinViewer() {
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
        const {
          SkinViewer,
          IdleAnimation,
        } = await import('skinview3d')

        if (
          disposed ||
          !canvasRef.current ||
          !containerRef.current
        ) {
          return
        }

        const containerWidth =
          containerRef.current.clientWidth || 320

        const containerHeight =
          containerRef.current.clientHeight || 460

        viewer = new SkinViewer({
          canvas: canvasRef.current,
          width: containerWidth,
          height: containerHeight,
        })

        // Rotación automática.
        viewer.autoRotate = true
        viewer.autoRotateSpeed = 0.4

        // Animación de reposo.
        viewer.animation = new IdleAnimation()
        viewer.animation.speed = 0.8

        // Controles del usuario.
        viewer.controls.enableZoom = false
        viewer.controls.enablePan = false

        // Tamaño del personaje.
        viewer.zoom = 0.85

        // Iluminación.
        viewer.globalLight.intensity = 2.6
        viewer.cameraLight.intensity = 1.2
        viewer.cameraLight.color.set(0x50fa9c)

        // Intenta cargar la skin desde MCHeads.
        try {
          await viewer.loadSkin(PRIMARY_SKIN_URL)
        } catch (primaryError) {
          console.warn(
            'No se pudo cargar la skin desde MCHeads. Probando Minotar.',
            primaryError
          )

          // Si MCHeads falla, intenta Minotar.
          await viewer.loadSkin(FALLBACK_SKIN_URL)
        }

        if (disposed) {
          viewer.dispose()
          return
        }

        setLoaded(true)
        setHasError(false)

        const reducedMotion = window.matchMedia(
          '(prefers-reduced-motion: reduce)'
        )

        if (reducedMotion.matches) {
          viewer.autoRotate = false

          if (viewer.animation) {
            viewer.animation.speed = 0
          }
        }

        resizeObserver = new ResizeObserver(() => {
          if (
            !viewer ||
            !containerRef.current ||
            disposed
          ) {
            return
          }

          const newWidth =
            containerRef.current.clientWidth

          const newHeight =
            containerRef.current.clientHeight

          viewer.setSize(newWidth, newHeight)
        })

        resizeObserver.observe(containerRef.current)
      } catch (error) {
        console.error(
          `No se pudo cargar la skin de ${MINECRAFT_USERNAME}:`,
          error
        )

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
      className="relative h-[380px] w-full max-w-[320px] sm:h-[460px] sm:max-w-[380px]"
      role="img"
      aria-label={`Skin de Minecraft de ${MINECRAFT_USERNAME} en 3D`}
    >
      {/* Resplandor verde detrás de la skin */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl"
      />

      {/* Mensaje mientras carga */}
      {!loaded && !hasError && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3">
          <div className="size-8 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />

          <span className="font-pixel text-sm text-muted-foreground">
            Cargando skin de {MINECRAFT_USERNAME}...
          </span>
        </div>
      )}

      {/* Mensaje en caso de error */}
      {hasError && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 text-center">
          <span className="font-pixel text-sm text-red-400">
            No se pudo cargar la skin
          </span>

          <p className="max-w-[260px] text-xs leading-relaxed text-muted-foreground">
            Verifica que el nombre premium sea exactamente
            {' '}
            <strong className="text-foreground">
              {MINECRAFT_USERNAME}
            </strong>
            {' '}
            y recarga la página.
          </p>
        </div>
      )}

      {/* Visor 3D */}
      <canvas
        ref={canvasRef}
        className={`relative z-10 h-full w-full cursor-grab transition-opacity duration-700 active:cursor-grabbing ${loaded ? 'opacity-100' : 'opacity-0'
          }`}
      />

      {/* Nombre del jugador */}
      {loaded && (
        <div className="pointer-events-none absolute bottom-12 left-1/2 z-20 -translate-x-1/2">
          <span className="rounded-md border border-primary/20 bg-background/70 px-4 py-2 font-pixel text-xs text-primary shadow-lg backdrop-blur-md">
            {MINECRAFT_USERNAME}
          </span>
        </div>
      )}

      {/* Sombra debajo del personaje */}
      <div
        aria-hidden="true"
        className="absolute bottom-6 left-1/2 h-4 w-36 -translate-x-1/2 rounded-full bg-black/50 blur-md"
      />
    </div>
  )
}