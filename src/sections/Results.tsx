import { useState } from 'react'
import { MoveHorizontal, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { clinic } from '../config/clinic'
import { BookLink, Container, Reveal, Section, SectionHeading } from '../components/ui'

export default function Results() {
  const { t } = useTranslation()
  const [position, setPosition] = useState(50)
  return (
    <Section id="results" className="border-y border-line bg-soft/50">
      <Container className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div>
          <SectionHeading section="results" description />
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-line px-3 py-2 text-[9px] font-medium tracking-wide">
            <Sparkles className="size-3.5 text-primary" aria-hidden="true" />
            {t('results.tag')}
          </div>
          <div className="mt-8">
            <BookLink />
          </div>
        </div>
        <Reveal>
          <div
            className="relative isolate aspect-[4/3] overflow-hidden rounded-3xl bg-soft"
            dir="ltr"
          >
            <img
              src={clinic.images.before}
              alt={t('results.beforeAlt')}
              width="900"
              height="675"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <img
              src={clinic.images.after}
              alt={t('results.afterAlt')}
              width="900"
              height="675"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
            />
            <span className="absolute start-5 top-5 rounded-full bg-surface/95 px-4 py-2 text-xs font-medium text-ink">
              {t('results.after')}
            </span>
            <span className="absolute end-5 top-5 rounded-full bg-surface/95 px-4 py-2 text-xs font-medium text-ink">
              {t('results.before')}
            </span>
            <div
              className="pointer-events-none absolute inset-y-0 w-0.5 bg-deep-ink shadow-xl shadow-deep/20"
              style={{ left: `${position}%` }}
            >
              <span className="absolute top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-deep bg-primary text-primary-ink shadow-lg shadow-deep/20">
                <MoveHorizontal className="size-5" aria-hidden="true" />
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={position}
              onChange={(event) => setPosition(Number(event.target.value))}
              aria-label={t('results.slider')}
              aria-valuetext={`${position}% ${t('results.after')}`}
              className="absolute inset-0 h-full w-full cursor-ew-resize appearance-none bg-transparent opacity-0 focus:opacity-100 focus:outline-deep focus:outline-offset-[-6px] [&::-webkit-slider-thumb]:h-full [&::-webkit-slider-thumb]:w-1 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-transparent"
            />
          </div>
          <p className="mt-4 flex items-center justify-center gap-2 text-xs text-muted">
            <MoveHorizontal className="size-3.5" aria-hidden="true" />
            {t('results.hint')}
          </p>
          <p className="mx-auto mt-3 max-w-md text-center text-[10px] leading-5 text-muted">
            {t('results.disclaimer')}
          </p>
        </Reveal>
      </Container>
    </Section>
  )
}
