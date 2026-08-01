import {
  Activity,
  ArrowUpRight,
  Award,
  Blocks,
  Boxes,
  Bug,
  Code2,
  Coins,
  Cpu,
  Crown,
  Database,
  FileText,
  Flag,
  Gamepad2,
  Gauge,
  Gavel,
  Globe,
  HeartPulse,
  Layers,
  LayoutDashboard,
  LayoutTemplate,
  LifeBuoy,
  Lock,
  MessagesSquare,
  Network,
  Package,
  Puzzle,
  Server,
  Settings,
  ShieldCheck,
  Sparkles,
  Swords,
  Trees,
  Users,
  Wand2,
  Workflow,
  Wrench,
  type LucideIcon,
} from 'lucide-react'

/**
 * Registro central de iconos: permite referenciar iconos por
 * nombre desde data/portfolio.ts sin importarlos en cada componente.
 */
export const iconRegistry: Record<string, LucideIcon> = {
  Activity,
  ArrowUpRight,
  Award,
  Blocks,
  Boxes,
  Bug,
  Code2,
  Coins,
  Cpu,
  Crown,
  Database,
  FileText,
  Flag,
  Gamepad2,
  Gauge,
  Gavel,
  Globe,
  HeartPulse,
  Layers,
  LayoutDashboard,
  LayoutTemplate,
  LifeBuoy,
  Lock,
  MessagesSquare,
  Network,
  Package,
  Puzzle,
  Server,
  Settings,
  ShieldCheck,
  Sparkles,
  Swords,
  Trees,
  Users,
  Wand2,
  Workflow,
  Wrench,
}

export function getIcon(name: string): LucideIcon {
  return iconRegistry[name] ?? Blocks
}

/** Renderiza un icono del registro a partir de su nombre. */
export function Icon({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  const Resolved = getIcon(name)
  return <Resolved className={className} aria-hidden="true" />
}
