'use client'

import { useState } from 'react'
import { MwSearchBar } from '@/components/wiki/mw-search-bar'
import { MwArticleModal } from '@/components/wiki/mw-article-modal'

export function WikiHomeSearch() {
  const [openTitle, setOpenTitle] = useState<string | null>(null)

  return (
    <>
      <MwSearchBar onSelect={setOpenTitle} />
      <MwArticleModal title={openTitle} onClose={() => setOpenTitle(null)} />
    </>
  )
}
