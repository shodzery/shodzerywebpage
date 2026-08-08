export interface SpecialPlayerRole {
  role: string
  description: string
}

/**
 * Jugadores con un rol especial dentro de Shodzery. La búsqueda es
 * insensible a mayúsculas: se compara el nombre resuelto por Mojang
 * (ya normalizado) contra estas claves en minúsculas.
 */
export const specialPlayers: Record<string, SpecialPlayerRole> = {
  shodzery: {
    role: 'Founder',
    description: 'Fundador y desarrollador de Shodzery y de todas las herramientas de este sitio.',
  },
}

export function getSpecialPlayerRole(name: string): SpecialPlayerRole | null {
  if (!name) return null
  return specialPlayers[name.toLowerCase()] ?? null
}
