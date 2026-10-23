import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { clinic } from '../config/clinic'
import { Container, Section, SectionHeading, Stars } from '../components/ui'
import { cn } from '../lib/utils'

export function Reviews() {
  const { t, i18n } = useTranslation()
  const [index, setIndex] = useState(0)
  const reduced = useReducedMotion()
  const review = clinic.testimonials[index]!
  const change = (direction: number) =>
    setIndex(
      (current) => (current + direction + clinic.testimonials.length) % clinic.testimonials.length,
    )
  return (
    <Section id="reviews" className="bg-soft/60">
      <Container className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div>
          <SectionHeading section="reviews" description />
          <div className="mt-8 flex items-center gap-4">
            <strong className="font-display text-5xl">
              {new Intl.NumberFormat(i18n.language).format(clinic.stats.rating)}
            </strong>
            <div>
              <Stars rating={clinic.stats.rating} />
              <p className="mt-1 text-[11px] text-muted">
                {t('reviews.count', { count: clinic.stats.reviews })}
              </p>
            </div>
          </div>
          <p className="mt-4 text-[10px] text-muted">{t('reviews.note')}</p>
        </div>
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label={t('nav.reviews')}
          className="rounded-3xl border border-line bg-surface/80 p-7 sm:p-10"
        >
          <Quote className="mb-6 size-9 text-primary/40" strokeWidth={1} aria-hidden="true" />
          <div aria-live="polite" aria-atomic="true" className="min-h-62">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={index}
                initial={reduced ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduced ? 0 : 0.18 }}
              >
                <Stars rating={review.rating} />
                <blockquote className="mt-4 font-display text-[clamp(1.5rem,2.3vw,2rem)] leading-relaxed">
                  “{t(`clinic.testimonials.${index}.quote`)}”
                </blockquote>
                <div className="mt-6 flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="flex size-11 shrink-0 items-center justify-center rounded-full bg-soft font-display text-lg text-primary"
                  >
                    {t(`clinic.testimonials.${index}.name`).slice(0, 1)}
                  </span>
                  <div>
                    <p className="text-sm font-semibold">
                      {t(`clinic.testimonials.${index}.name`)}
                    </p>
                    <p className="mt-1 text-xs text-muted">
                      {t(`services.${review.service}.title`)}
                    </p>
                  </div>
                </div>
                <p className="sr-only">
                  {t('reviews.counter', { current: index + 1, total: clinic.testimonials.length })}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-7 flex items-center justify-between border-t border-line pt-5">
            <div className="flex gap-2">
              {clinic.testimonials.map((_, dot) => (
                <button
                  type="button"
                  key={dot}
                  aria-label={t('reviews.counter', {
                    current: dot + 1,
                    total: clinic.testimonials.length,
                  })}
                  aria-pressed={dot === index}
                  onClick={() => setIndex(dot)}
                  className="flex size-8 items-center justify-center"
                >
                  <span
                    className={cn(
                      'h-1.5 rounded-full transition-[width,background-color]',
                      dot === index ? 'w-6 bg-primary' : 'w-1.5 bg-line',
                    )}
                  />
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => change(-1)}
                aria-label={t('common.previous')}
                className="flex size-11 items-center justify-center rounded-full border border-line transition-colors hover:bg-soft"
              >
                <ArrowLeft className="size-4 rtl:-scale-x-100" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => change(1)}
                aria-label={t('common.next')}
                className="flex size-11 items-center justify-center rounded-full bg-primary text-primary-ink transition-colors hover:bg-primary-hover"
              >
                <ArrowRight className="size-4 rtl:-scale-x-100" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
