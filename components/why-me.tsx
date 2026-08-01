'use client'

import { motion } from 'framer-motion'

import { SectionHeading } from '@/components/section-heading'
import { Icon } from '@/components/icon-registry'
import { whyMe } from '@/data/portfolio'

export function WhyMe({ showHeading = true }: { showHeading?: boolean }) {
  return (
    <section id="por-que-elegirme" className="relative scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {showHeading && (
          <SectionHeading
            label="{ 07 }"
            title="Por qué trabajar conmigo"
            description="No entrego carpetas de configuraciones. Entrego infraestructura medible, documentada y mantenible por tu equipo."
          />
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {whyMe.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: (index % 3) * 0.07 }}
              className="glass-card flex flex-col gap-3 rounded-lg p-6"
            >
              <span className="flex size-10 items-center justify-center rounded-md bg-accent/12 text-accent">
                <Icon name={item.icon} className="size-5" />
              </span>

              <h3 className="text-base font-semibold text-foreground">
                {item.title}
              </h3>

              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
