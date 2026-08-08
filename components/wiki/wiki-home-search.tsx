'use client'

import { useRouter } from 'next/navigation'
import { CatalogSearchBar } from '@/components/wiki/catalog-search-bar'

export function WikiHomeSearch() {
  const router = useRouter()

  return (
    <CatalogSearchBar
      onSelect={(category, name) => router.push(`/wiki/catalogo?categoria=${category}&item=${encodeURIComponent(name)}`)}
    />
  )
}
