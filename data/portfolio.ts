/**
 * ============================================================
 * DATOS DEL PORTAFOLIO — SHODZERY
 * ------------------------------------------------------------
 * Fuente única de contenido del sitio. Edita este archivo para
 * actualizar textos, servicios, tecnologías, proyectos, etc.
 *
 * Los valores marcados con "—" son marcadores pendientes de
 * rellenar con tus datos reales.
 * ============================================================
 */

export const identity = {
  name: 'Shodzery',
  role: 'Desarrollador y Configurador Profesional de Servidores Minecraft',
  subrole:
    'Especializado en Plugins, Mods, Optimización, Redes, Automatización y Soluciones Personalizadas.',
  tagline:
    'Diseño, desarrollo y optimizo infraestructuras completas de Minecraft: plugins a medida, mods para Fabric, NeoForge y Forge, redes Velocity de alto rendimiento y configuraciones premium listas para producción.',
  availability: 'Disponible para nuevos proyectos',
  about: [
    'Soy Shodzery, desarrollador y configurador de servidores de Minecraft. Trabajo el ecosistema completo: desde el código de un plugin en Java hasta el ajuste fino de los flags de la JVM, el reparto de carga en una red Velocity y la compatibilidad entre mods y plugins en servidores híbridos.',
    'Mi enfoque es técnico y medible. Cada proyecto empieza con una auditoría real (perfilado con timings y spark, análisis de TPS, uso de RAM y latencia) y termina con un servidor documentado, estable y preparado para escalar sin sorpresas.',
    'Desarrollo plugins personalizados con la API de Paper, mods para Fabric, NeoForge y Forge, sistemas RPG completos con MythicMobs, ModelEngine e ItemsAdder, y todo el soporte alrededor: bases de datos, APIs REST, paneles de administración, dashboards e integraciones con Discord.',
    'Lo que entrego no es una carpeta de archivos: es una infraestructura entendible, con documentación, convenciones claras y soporte posterior para que tu equipo pueda mantenerla.',
  ],
}

/**
 * SKIN DE MINECRAFT
 * ------------------------------------------------------------
 * Opción 1 — Por nombre de usuario (recomendado):
 *   username: 'TuNombreDeMinecraft'
 * Opción 2 — Por URL directa (tiene prioridad):
 *   skinUrl: 'https://ejemplo.com/mi-skin.png'
 */
export const minecraftSkin = {
  username: 'Shodzery',
  skinUrl: '',
}

export function getSkinUrl(): string {
  return (
    minecraftSkin.skinUrl ||
    `https://minotar.net/skin/${minecraftSkin.username}`
  )
}

/** Usuario de GitHub usado por la página /github */
export const githubUsername = 'Shodzery'

/**
 * ESTADÍSTICAS PRINCIPALES — reemplaza los "—" con tus cifras.
 */
export const stats = [
  { label: 'Plugins desarrollados', value: '—' },
  { label: 'Mods publicados', value: '—' },
  { label: 'Servidores configurados', value: '—' },
  { label: 'Años en el ecosistema', value: '—' },
]

/**
 * DASHBOARD — métricas para la vista tipo panel profesional.
 * `value` admite números o "—". `progress` es opcional (0-100).
 */
export const dashboardMetrics = [
  {
    icon: 'Puzzle',
    label: 'Plugins desarrollados',
    value: '-',
    hint: 'Paper API · Java 21',
  },
  {
    icon: 'Boxes',
    label: 'Mods desarrollados',
    value: '—',
    hint: 'Fabric · NeoForge · Forge',
  },
  {
    icon: 'Server',
    label: 'Servidores configurados',
    value: '7',
    hint: 'Survival, RPG, PvP, Modded',
  },
  {
    icon: 'Network',
    label: 'Redes desplegadas',
    value: '4',
    hint: 'Velocity · BungeeCord',
  },
  {
    icon: 'Cpu',
    label: 'Auditorías de rendimiento',
    value: '—',
    hint: 'spark · timings · flamegraphs',
  },
  {
    icon: 'Code2',
    label: 'APIs creadas',
    value: '—',
    hint: 'REST · WebSocket · Webhooks',
  },
  {
    icon: 'LayoutDashboard',
    label: 'Paneles y dashboards',
    value: '7',
    hint: 'Next.js · React',
  },
  {
    icon: 'Users',
    label: 'Clientes satisfechos',
    value: '18',
    hint: 'Proyectos entregados y con soporte',
  },
]

/**
 * INDICADORES TÉCNICOS — barras de progreso del dashboard.
 * `level` refleja profundidad de dominio (0-100).
 */
export const proficiency = [
  { label: 'Desarrollo de plugins (Java / Paper API)', level: 95 },
  { label: 'Optimización de rendimiento (TPS, RAM, CPU)', level: 93 },
  { label: 'Configuración de plugins premium', level: 96 },
  { label: 'Desarrollo de mods (Fabric / NeoForge / Forge)', level: 85 },
  { label: 'Redes y proxies (Velocity / BungeeCord)', level: 90 },
  { label: 'Bases de datos y APIs', level: 88 },
  { label: 'Automatización e infraestructura', level: 84 },
  { label: 'Desarrollo web y paneles', level: 82 },
]

/** Versiones de Minecraft con las que trabajo habitualmente. */
export const supportedVersions = [
  '1.8.9',
  '1.12.2',
  '1.16.5',
  '1.18.2',
  '1.19.4',
  '1.20.1',
  '1.20.4',
  '1.21.x',
]

/**
 * ESPECIALIDADES — modalidades y tipos de servidor.
 */
export const specialties = [
  {
    icon: 'Trees',
    name: 'Survival y Semi-Vanilla',
    description:
      'Economía equilibrada, protecciones de terreno, quests, rangos y progresión a largo plazo sin romper la esencia vanilla.',
    tags: ['EssentialsX', 'GriefPrevention', 'BetonQuest'],
  },
  {
    icon: 'Boxes',
    name: 'Skyblock',
    description:
      'Islas, generadores, minions, niveles, misiones, tienda y balance de economía con progresión medida.',
    tags: ['BentoBox', 'Economía', 'Custom Items'],
  },
  {
    icon: 'Swords',
    name: 'BoxPvP y PvP competitivo',
    description:
      'Kits, arenas, knockback ajustado, estadísticas, rankings y protección anti-abuso para combate intensivo.',
    tags: ['Kits', 'Ranking', 'Anti-cheat'],
  },
  {
    icon: 'HeartPulse',
    name: 'Lifesteal',
    description:
      'Sistema de corazones, revive, bans temporales por muerte, eventos y ciclos de temporada automatizados.',
    tags: ['Corazones', 'Eventos', 'Temporadas'],
  },
  {
    icon: 'Flag',
    name: 'Factions y Prison',
    description:
      'Territorios, guerras, minas dinámicas, rangos de prestigio, potenciadores y economía cerrada.',
    tags: ['Territorios', 'Minas', 'Prestigio'],
  },
  {
    icon: 'Wand2',
    name: 'Sistemas RPG',
    description:
      'Clases, habilidades, mobs personalizados, jefes por fases, modelos animados, mazmorras y loot por rareza.',
    tags: ['MythicMobs', 'ModelEngine', 'MMOItems'],
  },
  {
    icon: 'Gamepad2',
    name: 'Minijuegos',
    description:
      'Arenas rotativas, colas, mapas reiniciables, marcadores y flujo lobby-partida-recompensa.',
    tags: ['Arenas', 'Colas', 'Scoreboards'],
  },
  {
    icon: 'Sparkles',
    name: 'Modded y Pokémon',
    description:
      'Servidores Cobblemon y Pixelmon, modpacks optimizados y compatibilidad entre mods y plugins.',
    tags: ['Cobblemon', 'Pixelmon', 'Modpacks'],
  },
]

/**
 * EXPERIENCIA — rellena servidor, periodo y logros reales.
 */
export const experience = [
  {
    position: 'Desarrollador de Plugins',
    server: '— (nombre del proyecto)',
    period: '—',
    responsibilities:
      'Desarrollo de plugins personalizados con la API de Paper y Java moderno: sistemas de economía, GUIs, eventos, persistencia en MySQL y APIs internas reutilizables entre servidores de la red.',
    achievements:
      '—  (por ejemplo: reducción del uso de CPU del núcleo del servidor, sistemas propios sustituyendo dependencias externas)',
    tools: ['Java 21', 'Paper API', 'Gradle', 'MySQL', 'Adventure API'],
  },
  {
    position: 'Desarrollador de Mods',
    server: '—',
    period: '—',
    responsibilities:
      'Creación de mods para Fabric, NeoForge y Forge: contenido personalizado, mecánicas nuevas, sincronización cliente-servidor y compatibilidad con modpacks existentes.',
    achievements: '—',
    tools: ['Fabric', 'NeoForge', 'Forge', 'Mixin', 'Architectury'],
  },
  {
    position: 'Ingeniero de Rendimiento',
    server: '—',
    period: '—',
    responsibilities:
      'Auditorías de rendimiento con spark y timings, ajuste de flags de JVM (Aikar/G1, ZGC), tuning de Paper, Purpur y Pufferfish, control de chunk loading, entidades y redstone para mantener 20 TPS estables.',
    achievements: '—',
    tools: ['spark', 'Timings', 'Purpur', 'Pufferfish', 'Folia'],
  },
  {
    position: 'Arquitecto de Redes',
    server: '—',
    period: '—',
    responsibilities:
      'Diseño y despliegue de redes con Velocity y BungeeCord: lobby central, transferencias entre servidores, autenticación de backend, soporte Bedrock con Geyser y Floodgate, y compatibilidad multiversión con ViaVersion.',
    achievements: '—',
    tools: ['Velocity', 'BungeeCord', 'Geyser', 'Floodgate', 'ViaVersion'],
  },
  {
    position: 'Configurador Premium',
    server: '—',
    period: '—',
    responsibilities:
      'Configuración avanzada de LuckPerms, PlaceholderAPI, DeluxeMenus, ItemsAdder, Oraxen, MythicMobs, ModelEngine, BetonQuest, Citizens y TAB, con resource packs y shaders integrados.',
    achievements: '—',
    tools: ['LuckPerms', 'ItemsAdder', 'MythicMobs', 'DeluxeMenus', 'TAB'],
  },
  {
    position: 'Desarrollo Web y Automatización',
    server: '—',
    period: '—',
    responsibilities:
      'Paneles de administración, dashboards de estadísticas, APIs REST conectadas al servidor, bots de Discord con sincronización de rangos, backups automáticos y despliegues reproducibles.',
    achievements: '—',
    tools: ['Next.js', 'Node.js', 'PostgreSQL', 'MongoDB', 'Discord API'],
  },
]

/**
 * SERVICIOS
 */
export const services = [
  {
    icon: 'Code2',
    title: 'Desarrollo de plugins personalizados',
    description:
      'Plugins hechos a medida con la API de Paper y Java moderno: mecánicas propias, GUIs, comandos, eventos, persistencia en base de datos y API interna documentada para tu equipo.',
    highlights: ['Java 21 + Paper API', 'Persistencia MySQL/Postgres', 'Código documentado'],
  },
  {
    icon: 'Boxes',
    title: 'Desarrollo de mods',
    description:
      'Mods para Fabric, NeoForge y Forge: contenido nuevo, mecánicas exclusivas, sincronización cliente-servidor y compatibilidad garantizada con el resto del modpack.',
    highlights: ['Fabric · NeoForge · Forge', 'Mixins', 'Multiplataforma'],
  },
  {
    icon: 'Server',
    title: 'Configuración profesional de servidores',
    description:
      'Instalación y ajuste fino de Paper, Purpur, Pufferfish, Folia y Fabric, con estructura de archivos limpia, convenciones claras y documentación de cada decisión técnica.',
    highlights: ['Paper · Purpur · Folia', 'Estructura limpia', 'Documentación'],
  },
  {
    icon: 'Network',
    title: 'Redes Velocity y BungeeCord',
    description:
      'Arquitectura de red completa: proxy, lobby central, transferencias fluidas, sincronización de datos entre servidores, seguridad del backend y escalado por nodos.',
    highlights: ['Velocity moderno', 'Lobby y transferencias', 'Backend protegido'],
  },
  {
    icon: 'Gauge',
    title: 'Optimización extrema de rendimiento',
    description:
      'Perfilado con spark y timings, flags de JVM afinadas, control de entidades, chunks y redstone, y ajustes por versión para mantener 20 TPS con la latencia más baja posible.',
    highlights: ['20 TPS estables', 'RAM y CPU controladas', 'Latencia mínima'],
  },
  {
    icon: 'ShieldCheck',
    title: 'Permisos y jerarquías con LuckPerms',
    description:
      'Árbol de grupos con herencias limpias, contextos por servidor, tracks de rangos, permisos temporales y sincronización de la red mediante base de datos.',
    highlights: ['Herencias limpias', 'Contextos por servidor', 'Sync en red'],
  },
  {
    icon: 'LayoutTemplate',
    title: 'Menús, HUD y experiencia visual',
    description:
      'DeluxeMenus, PlaceholderAPI, TAB, scoreboards, bossbars, resource packs y shaders para una identidad visual coherente en todo el servidor.',
    highlights: ['DeluxeMenus', 'PlaceholderAPI', 'Resource packs'],
  },
  {
    icon: 'Wand2',
    title: 'Sistemas RPG y contenido personalizado',
    description:
      'ItemsAdder, Oraxen, MMOItems, MythicMobs, ModelEngine, BetonQuest y Citizens combinados en mazmorras, jefes por fases, clases, habilidades y quests con narrativa.',
    highlights: ['Mobs y jefes', 'Ítems y modelos', 'Quests y NPCs'],
  },
  {
    icon: 'Globe',
    title: 'Compatibilidad Bedrock y multiversión',
    description:
      'Geyser y Floodgate para jugadores Bedrock, ViaVersion y ViaBackwards para múltiples versiones, y SkinsRestorer para skins consistentes en cualquier cliente.',
    highlights: ['Geyser · Floodgate', 'ViaVersion', 'SkinsRestorer'],
  },
  {
    icon: 'Coins',
    title: 'Balance de economía y progresión',
    description:
      'Diseño de curvas de progresión, control de inflación, sumideros de dinero, tiendas, subastas y recompensas medidas para que el servidor siga siendo interesante a largo plazo.',
    highlights: ['Curvas de progresión', 'Control de inflación', 'Tiendas y subastas'],
  },
  {
    icon: 'Gamepad2',
    title: 'Modalidades y minijuegos',
    description:
      'Survival, Skyblock, BoxPvP, Lifesteal, Factions, Prison, Practice, RPG, minijuegos, Vanilla+ y servidores modded con Cobblemon o Pixelmon.',
    highlights: ['Configuración completa', 'Arenas y colas', 'Modded incluido'],
  },
  {
    icon: 'Package',
    title: 'Optimización de modpacks',
    description:
      'Depuración de modpacks: eliminación de mods redundantes, ajuste de configuraciones, corrección de conflictos y mejora de FPS y tiempos de carga.',
    highlights: ['Menos conflictos', 'Más FPS', 'Arranque más rápido'],
  },
  {
    icon: 'Lock',
    title: 'Seguridad del servidor',
    description:
      'Protección del backend, whitelist de proxy, permisos mínimos, anti-exploits, revisión de plugins de terceros y control de accesos administrativos.',
    highlights: ['Backend cerrado', 'Anti-exploits', 'Accesos controlados'],
  },
  {
    icon: 'Bug',
    title: 'Corrección de errores y soporte',
    description:
      'Lectura de logs y stacktraces, reproducción de fallos, parches urgentes y soporte continuo con tiempos de respuesta acordados.',
    highlights: ['Análisis de logs', 'Parches rápidos', 'Soporte continuo'],
  },
  {
    icon: 'ArrowUpRight',
    title: 'Migraciones y actualizaciones',
    description:
      'Cambios de versión sin pérdida de datos: migración de mundos, plugins y bases de datos, con pruebas previas en entorno de staging y plan de reversión.',
    highlights: ['Sin pérdida de datos', 'Entorno de pruebas', 'Plan de reversión'],
  },
  {
    icon: 'Workflow',
    title: 'Automatización e infraestructura',
    description:
      'Backups programados, reinicios inteligentes, despliegues reproducibles, monitorización con alertas y scripts que eliminan el trabajo manual repetitivo.',
    highlights: ['Backups y reinicios', 'Monitorización', 'Despliegues limpios'],
  },
  {
    icon: 'MessagesSquare',
    title: 'Integración con Discord y bots',
    description:
      'Bots a medida: sincronización de rangos, verificación de cuentas, tickets, logs del servidor, anuncios automáticos y estadísticas en vivo.',
    highlights: ['Sync de rangos', 'Tickets y logs', 'Estadísticas en vivo'],
  },
  {
    icon: 'LayoutDashboard',
    title: 'Paneles, dashboards y APIs',
    description:
      'Aplicaciones web conectadas a tu servidor: paneles de administración, dashboards de métricas, tiendas y APIs REST sobre MySQL, PostgreSQL o MongoDB.',
    highlights: ['Paneles admin', 'APIs REST', 'MySQL · Postgres · Mongo'],
  },
]

/**
 * HABILIDADES / TECNOLOGÍAS — agrupadas por categoría.
 */
export const skills = [
  {
    category: 'Lenguajes y desarrollo',
    icon: 'Code2',
    description: 'La base con la que construyo plugins, mods y servicios.',
    items: [
      'Java 17/21',
      'Kotlin',
      'TypeScript',
      'JavaScript',
      'Python',
      'SQL',
      'YAML',
      'JSON',
      'Gradle',
      'Maven',
      'Git',
    ],
  },
  {
    category: 'Software de servidor',
    icon: 'Server',
    description: 'Núcleos y proxies que despliego y afino según el proyecto.',
    items: [
      'Paper',
      'Purpur',
      'Pufferfish',
      'Folia',
      'Spigot',
      'Fabric',
      'NeoForge',
      'Forge',
      'Velocity',
      'BungeeCord',
    ],
  },
  {
    category: 'Plugins premium',
    icon: 'Puzzle',
    description: 'Configuración avanzada del ecosistema profesional.',
    items: [
      'LuckPerms',
      'PlaceholderAPI',
      'DeluxeMenus',
      'ItemsAdder',
      'Oraxen',
      'MMOItems',
      'MythicMobs',
      'ModelEngine',
      'BetonQuest',
      'Citizens',
      'TAB',
      'EssentialsX',
      'Vault',
      'WorldEdit',
      'WorldGuard',
    ],
  },
  {
    category: 'Compatibilidad y proxies',
    icon: 'Globe',
    description: 'Para que cualquier jugador entre sin fricción.',
    items: [
      'Geyser',
      'Floodgate',
      'ViaVersion',
      'ViaBackwards',
      'ViaRewind',
      'SkinsRestorer',
      'Resource packs',
      'Shaders',
    ],
  },
  {
    category: 'Rendimiento y diagnóstico',
    icon: 'Gauge',
    description: 'Herramientas con las que mido antes de tocar nada.',
    items: [
      'spark',
      'Timings v2',
      'Flags Aikar / G1',
      'ZGC',
      'Flamegraphs',
      'Chunky',
      'Análisis de entidades',
      'Tuning de redstone',
    ],
  },
  {
    category: 'Datos e infraestructura',
    icon: 'Database',
    description: 'Persistencia, caché y despliegue del lado del servidor.',
    items: [
      'MySQL',
      'MariaDB',
      'PostgreSQL',
      'MongoDB',
      'Redis',
      'SQLite',
      'Docker',
      'Linux',
      'Pterodactyl',
      'Nginx',
    ],
  },
  {
    category: 'Web, APIs e integraciones',
    icon: 'LayoutDashboard',
    description: 'Todo lo que rodea al servidor y lo hace administrable.',
    items: [
      'Next.js',
      'React',
      'Node.js',
      'APIs REST',
      'WebSockets',
      'Webhooks',
      'Discord API',
      'JDA',
      'Discord.js',
      'Tailwind CSS',
    ],
  },
]

/**
 * STACK TÉCNICO — vista por capas de la arquitectura.
 */
export const techStack = [
  {
    layer: 'Capa de red',
    icon: 'Network',
    summary:
      'Proxy y enrutamiento de jugadores, con soporte Bedrock y multiversión desde la puerta de entrada.',
    items: [
      { name: 'Velocity', role: 'Proxy moderno de alto rendimiento' },
      { name: 'BungeeCord', role: 'Compatibilidad con redes heredadas' },
      { name: 'Geyser + Floodgate', role: 'Acceso para jugadores Bedrock' },
      { name: 'ViaVersion / ViaBackwards', role: 'Soporte multiversión' },
    ],
  },
  {
    layer: 'Capa de servidor',
    icon: 'Server',
    summary:
      'Núcleos elegidos según la carga real del servidor y el tipo de contenido que va a ejecutar.',
    items: [
      { name: 'Paper', role: 'Base estable y compatible' },
      { name: 'Purpur / Pufferfish', role: 'Ajustes finos de rendimiento' },
      { name: 'Folia', role: 'Paralelismo por regiones para alta población' },
      { name: 'Fabric / NeoForge', role: 'Servidores modded y híbridos' },
    ],
  },
  {
    layer: 'Capa de contenido',
    icon: 'Wand2',
    summary:
      'Aquí vive la experiencia del jugador: ítems, mobs, quests, menús y progresión.',
    items: [
      { name: 'ItemsAdder / Oraxen', role: 'Ítems, bloques y texturas propias' },
      { name: 'MythicMobs + ModelEngine', role: 'Mobs, jefes y modelos animados' },
      { name: 'MMOItems', role: 'Equipamiento y estadísticas RPG' },
      { name: 'BetonQuest / Citizens', role: 'Quests, diálogos y NPCs' },
    ],
  },
  {
    layer: 'Capa de datos',
    icon: 'Database',
    summary:
      'Persistencia coherente entre todos los servidores de la red, con caché donde importa.',
    items: [
      { name: 'MySQL / MariaDB', role: 'Datos de jugadores y economía' },
      { name: 'PostgreSQL', role: 'Consultas complejas y reporting' },
      { name: 'MongoDB', role: 'Documentos flexibles y perfiles' },
      { name: 'Redis', role: 'Caché, mensajería y sesiones' },
    ],
  },
  {
    layer: 'Capa web y automatización',
    icon: 'LayoutDashboard',
    summary:
      'Interfaces y procesos que hacen el servidor administrable sin entrar por consola.',
    items: [
      { name: 'Next.js + React', role: 'Paneles y dashboards' },
      { name: 'APIs REST', role: 'Puente entre servidor y web' },
      { name: 'Bots de Discord', role: 'Rangos, tickets y logs' },
      { name: 'Docker / Linux', role: 'Despliegues reproducibles y backups' },
    ],
  },
]

/**
 * HERRAMIENTAS FAVORITAS del día a día.
 */
export const favoriteTools = [
  { name: 'IntelliJ IDEA', use: 'Desarrollo de plugins y mods en Java/Kotlin' },
  { name: 'VS Code', use: 'Web, configuraciones y scripts' },
  { name: 'spark', use: 'Perfilado de CPU y memoria en producción' },
  { name: 'Pterodactyl', use: 'Gestión de instancias y despliegues' },
  { name: 'Docker', use: 'Entornos reproducibles y aislados' },
  { name: 'Git + GitHub', use: 'Versionado y revisión de cambios' },
  { name: 'DBeaver', use: 'Inspección y migración de bases de datos' },
  { name: 'Blockbench', use: 'Modelos para ModelEngine e ItemsAdder' },
  { name: 'Postman', use: 'Pruebas de APIs REST' },
  { name: 'Linux CLI', use: 'Automatización, logs y monitorización' },
]

/**
 * ¿POR QUÉ ELEGIRME?
 */
export const whyMe = [
  {
    icon: 'Gauge',
    title: 'Decisiones basadas en datos',
    description:
      'No adivino. Perfilo con spark y timings, mido el impacto real de cada cambio y te muestro el antes y el después.',
  },
  {
    icon: 'Code2',
    title: 'Desarrollo, no solo configuración',
    description:
      'Cuando ningún plugin hace lo que necesitas, lo programo. Eso elimina dependencias y peso innecesario en tu servidor.',
  },
  {
    icon: 'FileText',
    title: 'Todo queda documentado',
    description:
      'Cada entrega incluye documentación de la estructura, decisiones técnicas y cómo mantenerla sin depender de mí.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Seguridad desde el diseño',
    description:
      'Backend cerrado, permisos mínimos necesarios, revisión de plugins de terceros y control de accesos administrativos.',
  },
  {
    icon: 'Layers',
    title: 'Visión de arquitectura completa',
    description:
      'Proxy, servidores, base de datos, web y Discord entendidos como un solo sistema coherente, no como piezas sueltas.',
  },
  {
    icon: 'LifeBuoy',
    title: 'Soporte real después de entregar',
    description:
      'Periodo de acompañamiento incluido, respuesta a incidencias y ajustes posteriores según el uso real del servidor.',
  },
]

/**
 * PROYECTOS — reemplaza con tus proyectos reales.
 * Las imágenes están en /public/projects/.
 */
export const projects = [
  {
    image: '/projects/survival.png',
    name: 'Core Survival con economía propia',
    type: 'Survival',
    role: 'Desarrollo + Configuración',
    description:
      'Plugin núcleo desarrollado a medida para un Survival: economía persistida en MySQL, sistema de trabajos, protecciones, misiones diarias, tienda con GUI y API interna consumida por el resto de plugins de la red.',
    tools: ['Java 21', 'Paper API', 'MySQL', 'PlaceholderAPI', 'DeluxeMenus'],
    highlights: [
      'Economía con control de inflación y sumideros',
      'API interna reutilizable entre servidores',
      'Migración de datos desde el sistema anterior',
    ],
    status: 'Ejemplo editable',
  },
  {
    image: '/projects/network.png',
    name: 'Red Velocity multiservidor',
    type: 'Network',
    role: 'Arquitectura de red',
    description:
      'Red completa con proxy Velocity: lobby central, transferencias sin caídas, sincronización de datos vía Redis, soporte Bedrock con Geyser y Floodgate, compatibilidad multiversión y backend totalmente cerrado al exterior.',
    tools: ['Velocity', 'Redis', 'Geyser', 'Floodgate', 'ViaVersion'],
    highlights: [
      'Transferencias entre servidores sin pérdida de sesión',
      'Jugadores Java y Bedrock en la misma red',
      'Backend inaccesible desde fuera del proxy',
    ],
    status: 'Ejemplo editable',
  },
  {
    image: '/projects/pvp.png',
    name: 'Modalidad BoxPvP competitiva',
    type: 'BoxPvP',
    role: 'Desarrollo + Balance',
    description:
      'Modalidad PvP con kits personalizados, knockback ajustado, estadísticas persistentes, rankings por temporada, recompensas automáticas y protecciones anti-abuso frente a farmeo de kills.',
    tools: ['Paper', 'MythicMobs', 'MySQL', 'Custom Java'],
    highlights: [
      'Knockback y combate ajustados por versión',
      'Rankings y temporadas automatizadas',
      'Detección de farmeo de estadísticas',
    ],
    status: 'Ejemplo editable',
  },
  {
    image: '/projects/ranks.png',
    name: 'Sistema RPG con mazmorras',
    type: 'RPG',
    role: 'Desarrollo + Contenido',
    description:
      'Sistema RPG completo: clases con habilidades, equipamiento con estadísticas, mobs y jefes por fases con modelos animados, mazmorras instanciadas, loot por rareza y quests con narrativa.',
    tools: ['MythicMobs', 'ModelEngine', 'MMOItems', 'BetonQuest', 'ItemsAdder'],
    highlights: [
      'Jefes con múltiples fases y mecánicas propias',
      'Mazmorras instanciadas por grupo',
      'Progresión de clases equilibrada',
    ],
    status: 'Ejemplo editable',
  },
  {
    image: '/projects/lobby.png',
    name: 'Auditoría y optimización extrema',
    type: 'Rendimiento',
    role: 'Ingeniería de rendimiento',
    description:
      'Auditoría completa de un servidor con caídas de TPS: perfilado con spark, análisis de entidades y chunk loading, tuning de Purpur y Pufferfish, flags de JVM afinadas y reescritura de los puntos calientes detectados.',
    tools: ['spark', 'Purpur', 'Pufferfish', 'Flags JVM', 'Chunky'],
    highlights: [
      'TPS estabilizados en horas punta',
      'Consumo de RAM y CPU reducido',
      'Informe técnico con antes y después',
    ],
    status: 'Ejemplo editable',
  },
  {
    image: '/projects/staff-team.png',
    name: 'Panel web y bot de Discord',
    type: 'Web / API',
    role: 'Desarrollo full-stack',
    description:
      'Panel de administración en Next.js conectado al servidor mediante API REST: estadísticas en vivo, gestión de jugadores y rangos, historial de sanciones y bot de Discord con verificación de cuentas y sincronización de roles.',
    tools: ['Next.js', 'API REST', 'PostgreSQL', 'Discord API', 'JDA'],
    highlights: [
      'Métricas del servidor en tiempo real',
      'Sincronización de rangos Minecraft ↔ Discord',
      'Autenticación y permisos por rol',
    ],
    status: 'Ejemplo editable',
  },
]

/**
 * FORMA DE TRABAJO
 */
export const workflow = [
  {
    step: 'Auditoría técnica',
    description:
      'Revisión de núcleo, plugins, mods, configuraciones y logs. Perfilado con spark y timings para conocer el estado real antes de tocar nada.',
    deliverable: 'Informe con hallazgos y prioridades',
  },
  {
    step: 'Propuesta y arquitectura',
    description:
      'Definición de la arquitectura objetivo, decisiones técnicas justificadas, alcance por fases y criterios medibles de éxito.',
    deliverable: 'Plan técnico y alcance acordado',
  },
  {
    step: 'Desarrollo y configuración',
    description:
      'Programación de los plugins o mods necesarios y configuración del ecosistema completo con convenciones consistentes.',
    deliverable: 'Código y configuraciones versionadas',
  },
  {
    step: 'Pruebas en staging',
    description:
      'Validación en un entorno idéntico al de producción: pruebas de carga, compatibilidad entre versiones y verificación de cada sistema.',
    deliverable: 'Checklist de pruebas superadas',
  },
  {
    step: 'Optimización final',
    description:
      'Segunda ronda de perfilado con el contenido ya instalado, ajuste de flags de JVM y afinado de parámetros por versión.',
    deliverable: 'Comparativa de rendimiento',
  },
  {
    step: 'Despliegue y documentación',
    description:
      'Puesta en producción con plan de reversión, backups verificados y documentación completa de la infraestructura entregada.',
    deliverable: 'Servidor en producción documentado',
  },
  {
    step: 'Soporte y evolución',
    description:
      'Acompañamiento posterior, corrección de incidencias, monitorización y nuevas funcionalidades según el uso real.',
    deliverable: 'Soporte continuo acordado',
  },
]

/**
 * PREGUNTAS FRECUENTES
 */
export const faq = [
  {
    question: '¿Trabajas con plugins existentes o desarrollas desde cero?',
    answer:
      'Ambas cosas. Si existe un plugin sólido que resuelve la necesidad, lo configuro a fondo y lo integro con el resto del ecosistema. Cuando no existe, o cuando la solución disponible añade peso innecesario, desarrollo un plugin propio con la API de Paper y Java moderno.',
  },
  {
    question: '¿Qué versiones de Minecraft soportas?',
    answer:
      'Trabajo principalmente en 1.20.x y 1.21.x, y tengo experiencia en versiones anteriores como 1.8.9, 1.12.2, 1.16.5, 1.18.2 y 1.19.4. También configuro compatibilidad multiversión con ViaVersion y ViaBackwards para que jugadores de distintas versiones convivan.',
  },
  {
    question: '¿Puedes optimizar un servidor que ya tiene problemas de TPS?',
    answer:
      'Sí, y es una de mis especialidades. Empiezo perfilando con spark y timings para identificar la causa real (entidades, chunk loading, redstone, plugins mal configurados o código ineficiente) y luego aplico correcciones medibles, no ajustes a ciegas.',
  },
  {
    question: '¿Configuras mods además de plugins?',
    answer:
      'Sí. Configuro y desarrollo mods para Fabric, NeoForge y Forge, optimizo modpacks completos y resuelvo conflictos de compatibilidad entre mods y plugins en servidores híbridos, incluidos proyectos con Cobblemon o Pixelmon.',
  },
  {
    question: '¿Cómo garantizas que una migración no pierda datos?',
    answer:
      'Toda migración se prueba primero en un entorno de staging con una copia real de los datos. Se verifican mundos, bases de datos, inventarios y permisos, y siempre existe un plan de reversión con backups comprobados antes de tocar producción.',
  },
  {
    question: '¿Ofreces soporte después de entregar el proyecto?',
    answer:
      'Sí. Cada entrega incluye un periodo de acompañamiento para resolver incidencias y afinar detalles con el servidor ya en uso real. También existe la opción de soporte continuo y mantenimiento a más largo plazo.',
  },
  {
    question: '¿Puedes desarrollar la parte web y el bot de Discord?',
    answer:
      'Sí. Desarrollo paneles de administración, dashboards de estadísticas, tiendas y APIs REST con Next.js y Node.js, además de bots de Discord con verificación de cuentas, sincronización de rangos, tickets y logs del servidor.',
  },
  {
    question: '¿Cómo empezamos a trabajar juntos?',
    answer:
      'Escríbeme por Discord a sh0dzery con una descripción de tu proyecto, versión, tipo de servidor y qué necesitas. Reviso el estado actual, te propongo un plan por fases con alcance claro y empezamos por lo que más impacto tenga.',
  },
]

/**
 * TESTIMONIOS — reemplaza con opiniones reales de tus clientes.
 */
export const testimonials = [
  {
    quote:
      'Nos entregó un core propio que sustituyó a seis plugins distintos. El servidor va más ligero y por fin entendemos cómo está montado todo.',
    author: '—',
    role: 'Owner de servidor Survival',
  },
  {
    quote:
      'Teníamos caídas de TPS todas las tardes. Después de la auditoría y los cambios, los picos desaparecieron y nos explicó exactamente qué lo causaba.',
    author: '—',
    role: 'Administrador de red',
  },
  {
    quote:
      'El sistema RPG con jefes por fases y modelos animados quedó mejor de lo que imaginábamos, y además está documentado para que podamos añadir contenido nosotros.',
    author: '—',
    role: 'Director de proyecto RPG',
  },
  {
    quote:
      'Montó la red Velocity con soporte Bedrock y multiversión sin un solo día de caída durante la migración.',
    author: '—',
    role: 'Fundador de network',
  },
]

/**
 * ACTIVIDAD — changelog del portafolio y de mis proyectos.
 */
export const changelog = [
  {
    version: 'v3.0.0',
    date: '—',
    title: 'Portafolio enfocado en desarrollo',
    state: 'Publicado',
    changes: [
      'Rediseño completo con identidad violeta premium',
      'Nuevas páginas: stack técnico, actividad y GitHub en vivo',
      'Dashboard de métricas técnicas con indicadores de dominio',
    ],
  },
  {
    version: 'v2.4.0',
    date: '—',
    title: 'Suite de optimización',
    state: 'Publicado',
    changes: [
      'Plantillas de flags de JVM por perfil de servidor',
      'Checklist de auditoría de rendimiento reutilizable',
      'Informes comparativos de TPS antes y después',
    ],
  },
  {
    version: 'v2.1.0',
    date: '—',
    title: 'Módulos RPG reutilizables',
    state: 'Publicado',
    changes: [
      'Librería de jefes por fases para MythicMobs',
      'Integración estandarizada entre MMOItems e ItemsAdder',
      'Sistema de mazmorras instanciadas por grupo',
    ],
  },
  {
    version: 'v1.8.0',
    date: '—',
    title: 'Infraestructura de red',
    state: 'Publicado',
    changes: [
      'Plantilla base de red Velocity con Redis',
      'Soporte Bedrock mediante Geyser y Floodgate',
      'Sincronización de rangos entre Minecraft y Discord',
    ],
  },
]

export const roadmap = [
  {
    title: 'Librería pública de utilidades para Paper',
    description:
      'Conjunto de utilidades reutilizables para desarrollo de plugins: GUIs, comandos, persistencia y eventos.',
    state: 'En desarrollo',
    progress: 65,
  },
  {
    title: 'Plantilla de servidor Folia optimizada',
    description:
      'Base preconfigurada para aprovechar el paralelismo por regiones en servidores de alta población.',
    state: 'En desarrollo',
    progress: 40,
  },
  {
    title: 'Panel de administración open source',
    description:
      'Dashboard en Next.js con métricas en vivo, gestión de jugadores y API REST documentada.',
    state: 'Planificado',
    progress: 20,
  },
  {
    title: 'Mod multiplataforma de contenido',
    description:
      'Mod con Architectury para publicar simultáneamente en Fabric, NeoForge y Forge.',
    state: 'Planificado',
    progress: 10,
  },
]

/**
 * ENLACES DE CONTACTO
 */
export const discord = {
  username: 'sh0dzery',
  userId: '1278184976386359303',
  profileUrl: 'https://discord.com/users/1278184976386359303',
}

export const socialLinks = {
  discord: discord.profileUrl,
  github: `https://github.com/${githubUsername}`,
  minecraft: `https://es.namemc.com/profile/${minecraftSkin.username}`,
  email: '#',
}

export const serverTypes = [
  'Survival',
  'Semi-Vanilla',
  'Skyblock',
  'BoxPvP',
  'Lifesteal',
  'Factions',
  'Prison',
  'RPG',
  'Minijuegos',
  'Practice',
  'Lobby',
  'Network',
  'Modded (Fabric/Forge)',
  'Cobblemon / Pixelmon',
  'Otro',
]

export const serviceOptions = services.map((s) => s.title)

/**
 * NAVEGACIÓN — páginas del sitio.
 */
export const navLinks = [
  { label: 'Inicio', href: '/' },
  { label: 'Sobre mí', href: '/sobre-mi' },
  { label: 'Servicios', href: '/servicios' },
  { label: 'Tecnologías', href: '/tecnologias' },
  { label: 'Stack', href: '/stack' },
  { label: 'Proyectos', href: '/proyectos' },
  { label: 'GitHub', href: '/github' },
  { label: 'Actividad', href: '/actividad' },
  { label: 'Experiencia', href: '/experiencia' },
  { label: 'Docs', href: '/docs' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contacto', href: '/contacto' },
]

/** Anclas internas de la portada. */
export const homeSections = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Sobre mí', href: '#sobre-mi' },
  { label: 'Panel', href: '#panel' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Tecnologías', href: '#habilidades' },
  { label: 'Especialidades', href: '#especialidades' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Contacto', href: '#contacto' },
]
