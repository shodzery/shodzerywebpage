export interface WikiCategoryDef {
  slug: string
  wikiTitle: string
  name: string
  icon: string
  emoji: string
}

/**
 * Las 16 secciones principales, igual que la barra de contenidos de
 * minecraft.wiki. `wikiTitle` es el nombre real de la categoría (o,
 * si no existe como categoría, del artículo) en minecraft.wiki.
 */
export const wikiCategories: WikiCategoryDef[] = [
  { slug: 'trading', wikiTitle: 'Trading', name: 'Trading', icon: 'Gem', emoji: '💚' },
  { slug: 'brewing', wikiTitle: 'Brewing', name: 'Brewing', icon: 'FlaskConical', emoji: '🧪' },
  { slug: 'enchanting', wikiTitle: 'Enchanting', name: 'Enchanting', icon: 'Wand2', emoji: '✨' },
  { slug: 'mobs', wikiTitle: 'Mobs', name: 'Mobs', icon: 'Skull', emoji: '🧟' },
  { slug: 'blocks', wikiTitle: 'Blocks', name: 'Blocks', icon: 'Blocks', emoji: '🧱' },
  { slug: 'items', wikiTitle: 'Items', name: 'Items', icon: 'Pickaxe', emoji: '⛏️' },
  { slug: 'biomes', wikiTitle: 'Biomes', name: 'Biomes', icon: 'Mountain', emoji: '🌸' },
  { slug: 'effects', wikiTitle: 'Effects', name: 'Effects', icon: 'Sparkles', emoji: '💫' },
  { slug: 'crafting', wikiTitle: 'Crafting', name: 'Crafting', icon: 'Hammer', emoji: '🛠️' },
  { slug: 'smelting', wikiTitle: 'Smelting', name: 'Smelting', icon: 'Flame', emoji: '🔥' },
  { slug: 'smithing', wikiTitle: 'Smithing', name: 'Smithing', icon: 'Wrench', emoji: '⚒️' },
  { slug: 'structures', wikiTitle: 'Structures', name: 'Structures', icon: 'Package', emoji: '🏰' },
  { slug: 'redstone', wikiTitle: 'Redstone', name: 'Redstone', icon: 'RadioTower', emoji: '🔴' },
  { slug: 'commands', wikiTitle: 'Commands', name: 'Commands', icon: 'Workflow', emoji: '🎲' },
  { slug: 'history', wikiTitle: 'History of Minecraft', name: 'History', icon: 'FileText', emoji: '📜' },
  { slug: 'tutorials', wikiTitle: 'Tutorials', name: 'Tutorials', icon: 'BookOpen', emoji: '📖' },
]

export function getWikiCategory(slug: string): WikiCategoryDef | undefined {
  return wikiCategories.find((c) => c.slug === slug.toLowerCase())
}
