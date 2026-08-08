'use client'

import { useEffect, useRef, useState } from 'react'
import { Crosshair, Download, Pause, Play, RefreshCw } from 'lucide-react'

interface SkinViewer3DProps {
  skinUrl: string
  capeUrl?: string | null
  variant?: 'classic' | 'slim'
  name: string
  className?: string
  /** Muestra la barra de controles (descargar, animación, rotar, reiniciar vista). */
  showControls?: boolean
}

/**
 * Visor 3D de skin + capa con el mismo motor (skinview3d) que ya
 * usamos en el Hero para la skin de Shodzery, pero parametrizado
 * para poder mostrar la skin y la capa de cualquier jugador, con
 * una barra de controles de animación.
 */
export function SkinViewer3D({
  skinUrl,
  capeUrl,
  variant = 'classic',
  name,
  className,
  showControls = true,
}: SkinViewer3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const viewerRef = useRef<import('skinview3d').SkinViewer | null>(null)
  const walkAnimationRef = useRef<import('skinview3d').WalkingAnimation | null>(null)

  const [loaded, setLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [playing, setPlaying] = useState(true)
  const [autoRotate, setAutoRotate] = useState(true)

  useEffect(() => {
    let viewer: import('skinview3d').SkinViewer | null = null
    let disposed = false
    let resizeObserver: ResizeObserver | null = null

    setLoaded(false)
    setHasError(false)
    setPlaying(true)
    setAutoRotate(true)

    async function initializeViewer() {
      if (!canvasRef.current || !containerRef.current) return

      try {
        const { SkinViewer, WalkingAnimation } = await import('skinview3d')

        if (disposed || !canvasRef.current || !containerRef.current) return

        const containerWidth = containerRef.current.clientWidth || 320
        const containerHeight = containerRef.current.clientHeight || 380

        viewer = new SkinViewer({
          canvas: canvasRef.current,
          width: containerWidth,
          height: containerHeight,
        })

        viewer.autoRotate = true
        viewer.autoRotateSpeed = 0.4

        const walkAnimation = new WalkingAnimation()
        walkAnimation.speed = 0.7
        viewer.animation = walkAnimation
        walkAnimationRef.current = walkAnimation

        viewer.controls.enableZoom = false
        viewer.controls.enablePan = false
        viewer.zoom = 0.85

        viewer.globalLight.intensity = 2.6
        viewer.cameraLight.intensity = 1.2
        viewer.cameraLight.color.set(0x50fa9c)

        await viewer.loadSkin(skinUrl, { model: variant === 'slim' ? 'slim' : 'default' })

        if (capeUrl) {
          try {
            await viewer.loadCape(capeUrl)
          } catch (capeError) {
            console.warn(`No se pudo cargar la capa de ${name}:`, capeError)
          }
        }

        if (disposed) {
          viewer.dispose()
          return
        }

        viewerRef.current = viewer
        setLoaded(true)
        setHasError(false)

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
        if (reducedMotion.matches) {
          viewer.autoRotate = false
          setAutoRotate(false)
          if (viewer.animation) viewer.animation.speed = 0
        }

        resizeObserver = new ResizeObserver(() => {
          if (!viewer || !containerRef.current || disposed) return
          viewer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
        })
        resizeObserver.observe(containerRef.current)
      } catch (error) {
        console.error(`No se pudo cargar la skin de ${name}:`, error)
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
      viewerRef.current = null
      walkAnimationRef.current = null
    }
  }, [skinUrl, capeUrl, variant, name])

  function togglePlay() {
    const viewer = viewerRef.current
    if (!viewer) return
    if (playing) {
      viewer.animation = null
    } else {
      viewer.animation = walkAnimationRef.current
    }
    setPlaying(!playing)
  }

  function toggleAutoRotate() {
    const viewer = viewerRef.current
    if (!viewer) return
    viewer.autoRotate = !autoRotate
    setAutoRotate(!autoRotate)
  }

  function resetView() {
    const viewer = viewerRef.current
    if (!viewer) return
    if (typeof viewer.controls.reset === 'function') {
      viewer.controls.reset()
    }
    viewer.zoom = 0.85
  }

  return (
    <div
      ref={containerRef}
      className={className ?? 'relative h-72 w-40'}
      role="img"
      aria-label={`Skin de Minecraft de ${name} en 3D`}
    >
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl"
      />

      {!loaded && !hasError && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3">
          <div className="size-7 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
          <span className="font-pixel text-xs text-muted-foreground">Cargando skin…</span>
        </div>
      )}

      {hasError && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-2 text-center">
          <span className="font-pixel text-xs text-red-400">No se pudo cargar la skin</span>
        </div>
      )}

      <canvas
        ref={canvasRef}
        className={`relative z-10 h-full w-full cursor-grab transition-opacity duration-700 active:cursor-grabbing ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div
        aria-hidden="true"
        className="absolute bottom-4 left-1/2 h-3 w-28 -translate-x-1/2 rounded-full bg-black/50 blur-md"
      />

      {showControls && loaded && (
        <div className="absolute inset-x-0 bottom-2 z-20 flex items-center justify-center gap-1.5">
          <div className="glass-card flex items-center gap-1 rounded-full border border-border/60 p-1.5 shadow-lg shadow-black/20">
            <a
              href={skinUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Descargar skin"
              className="btn-pop flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary/70 hover:text-primary"
            >
              <Download className="size-3.5" aria-hidden="true" />
            </a>
            <button
              type="button"
              title={autoRotate ? 'Detener rotación' : 'Rotar automáticamente'}
              onClick={toggleAutoRotate}
              className={`btn-pop flex size-8 items-center justify-center rounded-full transition-colors hover:bg-secondary/70 ${
                autoRotate ? 'text-primary' : 'text-muted-foreground hover:text-primary'
              }`}
            >
              <RefreshCw className="size-3.5" aria-hidden="true" />
            </button>
            <button
              type="button"
              title="Reiniciar vista"
              onClick={resetView}
              className="btn-pop flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary/70 hover:text-primary"
            >
              <Crosshair className="size-3.5" aria-hidden="true" />
            </button>
            <button
              type="button"
              title={playing ? 'Pausar animación' : 'Reproducir animación'}
              onClick={togglePlay}
              className={`btn-pop flex size-8 items-center justify-center rounded-full transition-colors hover:bg-secondary/70 ${
                playing ? 'text-primary' : 'text-muted-foreground hover:text-primary'
              }`}
            >
              {playing ? <Pause className="size-3.5" aria-hidden="true" /> : <Play className="size-3.5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
