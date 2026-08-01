'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

import { SectionHeading } from '@/components/section-heading'
import { faq } from '@/data/portfolio'

export function FaqSection({
  showHeading = true,
}: {
  showHeading?: boolean
}) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="relative scroll-mt-24 py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {showHeading && (
          <SectionHeading
            label="{ 01 }"
            title="Preguntas frecuentes"
            description="Las preguntas que más me hacen antes de empezar un proyecto."
          />
        )}

        <ul className="flex flex-col gap-3">
          {faq.map((item, index) => {
            const isOpen = open === index

            return (
              <li key={item.question} className="glass-card rounded-lg">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                    className="flex w-full items-center justify-between gap-4 rounded-lg px-5 py-4 text-left transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-ring"
                  >
                    <span className="text-sm font-medium text-foreground">
                      {item.question}
                    </span>

                    <ChevronDown
                      className={`size-4 shrink-0 text-primary transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="border-t border-border/60 px-5 py-4 text-sm leading-relaxed text-muted-foreground">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
