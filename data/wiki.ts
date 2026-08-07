export interface WikiItem {
  name: string
  description: string
}

export interface WikiDimension {
  slug: 'overworld' | 'nether' | 'end'
  name: string
  tagline: string
  icon: string
  accent: string
  biomas: WikiItem[]
  mobs: WikiItem[]
  estructuras: WikiItem[]
}

export const wikiDimensions: WikiDimension[] = [
  {
    slug: 'overworld',
    name: 'Overworld',
    tagline: 'La dimensión principal: bosques, océanos, montañas y todo lo que rodea el punto de aparición.',
    icon: 'Trees',
    accent: 'success',
    biomas: [
      { name: 'Llanuras', description: 'Terreno plano y abierto, ideal para las primeras bases y granjas por su facilidad para construir.' },
      { name: 'Bosque', description: 'Árboles de roble y abedul con generación moderada de mobs hostiles durante la noche.' },
      { name: 'Montañas', description: 'Picos elevados con cuevas expuestas, buena fuente de piedra, minerales y nieve en cotas altas.' },
      { name: 'Desierto', description: 'Bioma árido con templos generados bajo la arena, cactus y muy pocos recursos de madera.' },
      { name: 'Océano', description: 'Incluye variantes cálidas, templadas, frías y congeladas, cada una con su propia vida marina y ruinas.' },
      { name: 'Jungla', description: 'Vegetación densa con templos ocultos, bambú, loros y una alta tasa de generación de cuevas.' },
    ],
    mobs: [
      { name: 'Zombi', description: 'Hostil, aparece de noche o en zonas oscuras; puede convertirse en ahogado cerca del agua.' },
      { name: 'Esqueleto', description: 'Ataca a distancia con flechas; se quema al amanecer si no tiene protección contra el sol.' },
      { name: 'Creeper', description: 'Explota al acercarse al jugador; suelta pólvora y puede activarse con un gato cerca para huir.' },
      { name: 'Aldeano', description: 'NPC pasivo que comercia según su profesión; vive en aldeas y se reproduce con suficiente comida.' },
      { name: 'Lobo', description: 'Se puede domesticar con huesos y defiende a su dueño una vez que se convierte en perro.' },
      { name: 'Enderman', description: 'Neutral salvo que se le mire a los ojos; teletransporta bloques y es vulnerable al agua.' },
    ],
    estructuras: [
      { name: 'Aldea', description: 'Asentamiento de aldeanos con casas, granjas y comercio; varía según el bioma en el que aparece.' },
      { name: 'Fortaleza (Stronghold)', description: 'Estructura subterránea con el portal al End; se localiza siguiendo ojos de Ender.' },
      { name: 'Mansión del Bosque', description: 'Estructura rara en bosques oscuros, habitada por vindicators y con salas llenas de botín.' },
      { name: 'Templo del desierto', description: 'Pirámide con trampa de TNT en el sótano y cofres con esmeraldas y objetos encantados.' },
      { name: 'Ruinas submarinas', description: 'Restos de barcos y ciudades hundidas con cofres de tesoro y mapas de tesoros enterrados.' },
    ],
  },
  {
    slug: 'nether',
    name: 'Nether',
    tagline: 'Dimensión infernal accesible por portal de obsidiana, con lava, blaze y recursos exclusivos.',
    icon: 'Flame',
    accent: 'destructive',
    biomas: [
      { name: 'Nether Wastes', description: 'El bioma clásico del Nether: netherrack, lava a raudales y torres de blaze cercanas.' },
      { name: 'Bosque carmesí', description: 'Vegetación roja con huongos gigantes, cerdos zombificados y suelo de nylium carmesí.' },
      { name: 'Bosque distorsionado', description: 'Variante azulada del bosque de huongos, hogar de los enderman que huyen del agua.' },
      { name: 'Tierras áridas de basalto', description: 'Columnas de basalto y suelo de magma, punto de generación habitual de piglins brutos.' },
      { name: 'Vertedero de almas', description: 'Bioma de arena de almas donde aparecen skeletons y fantasmas; el sonido ambiental es propio.' },
    ],
    mobs: [
      { name: 'Piglin', description: 'Neutral mientras el jugador lleve oro equipado; comercia objetos a cambio de lingotes de oro.' },
      { name: 'Ghast', description: 'Vuela y dispara bolas de fuego a distancia; se puede repeler golpeando su propio proyectil de vuelta.' },
      { name: 'Blaze', description: 'Aparece en las torres del Nether y lanza bolas de fuego; su polvo es clave para pociones.' },
      { name: 'Hoglin', description: 'Hostil, habita los bosques carmesí y es la fuente principal de carne cruda en el Nether.' },
      { name: 'Wither Skeleton', description: 'Habita las fortalezas del Nether; su golpe aplica el efecto Wither y sus cráneos invocan al jefe Wither.' },
    ],
    estructuras: [
      { name: 'Fortaleza del Nether', description: 'Construcción de ladrillo del Nether con pasillos, escaleras y salas de generación de blaze.' },
      { name: 'Bastión en ruinas', description: 'Estructura de los piglins con cofres de tesoro, establos de hoglin y forjas.' },
      { name: 'Pueblo de piglins brutos', description: 'Pequeños asentamientos en las tierras de basalto con hachas de oro como botín.' },
    ],
  },
  {
    slug: 'end',
    name: 'End',
    tagline: 'La dimensión final: islas flotantes, el Dragón del End y las ciudades del fin.',
    icon: 'Sparkles',
    accent: 'accent',
    biomas: [
      { name: 'The End', description: 'Isla central con el punto de invocación del Dragón del Ender y el vacío alrededor.' },
      { name: 'Islas exteriores del End', description: 'Archipiélago disperso que se alcanza tras derrotar al dragón, con cristales de fin y chorus.' },
      { name: 'Bosques de Chorus altos / medianos', description: 'Vegetación morada usada para elytra y para crear popped chorus fruit.' },
    ],
    mobs: [
      { name: 'Enderman', description: 'También habita el End en gran número; es el mob neutral más común de esta dimensión.' },
      { name: 'Dragón del Ender', description: 'Jefe final del juego; vuela en círculos, dispara aliento ácido y se cura con cristales de fin.' },
      { name: 'Shulker', description: 'Habita las ciudades del fin, se camufla como bloque y dispara proyectiles de levitación.' },
    ],
    estructuras: [
      { name: 'Portal de salida', description: 'Se genera al derrotar al dragón por primera vez y permite volver al End en cualquier momento.' },
      { name: 'Ciudad del fin', description: 'Torres de piedra del End llenas de shulkers, con naves End Ship que guardan elytra.' },
    ],
  },
]

export function getDimension(slug: string) {
  return wikiDimensions.find((d) => d.slug === slug)
}
