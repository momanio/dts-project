import { Check, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { clinic } from '../config/clinic'
import {
  ButtonLink,
  Container,
  DirectionArrow,
  Reveal,
  Section,
  SectionHeading,
} from '../components/ui'
import { cn } from '../lib/utils'

export function Pricing() {
  const { t, i18n } = useTranslation()
  return (
    <Section id="pricing">
      <Container>
        <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
          <SectionHeading section="pricing" />
          <p className="max-w-sm text-sm leading-7 text-muted">{t('pricing.description')}</p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {clinic.packages.map((item, index) => (
            <Reveal key={item.service} delay={index * 0.08}>
              <div
                className={cn(
                  'relative flex h-full flex-col rounded-3xl border p-7 lg:p-9',
                  item.featured ? 'border-primary bg-soft' : 'border-line bg-surface/70',
                )}
              >
                {item.featured && (
                  <div className="absolute -top-3 start-6 inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1.5 text-[10px] font-medium text-primary-ink">
                    <Sparkles className="size-3" aria-hidden="true" />
                    {t('pricing.featured')}
                  </div>
                )}
                <h3 className="mt-1 text-base font-semibold">
                  {t(`services.${item.service}.title`)}
                </h3>
                <p className="mt-7 text-[11px] text-muted">{t('common.from')}</p>
                <p className="mt-1 flex items-baseline gap-2">
                  <span className="font-display text-5xl">
                    {new Intl.NumberFormat(i18n.language).format(item.price)}
                  </span>
                  <span className="text-sm text-muted">{t('common.currency')}</span>
                </p>
                <p className="mb-8 mt-5 flex flex-1 items-start gap-2 border-t border-line pt-5 text-xs leading-6 text-muted">
                  <Check className="mt-1 size-3.5 shrink-0 text-primary" aria-hidden="true" />
                  {t(`pricing.${item.service}`)}
                </p>
                <ButtonLink
                  href="#contact"
                  variant={item.featured ? 'primary' : 'secondary'}
                  className="w-full"
                >
                  {t('common.quote')}
                  <DirectionArrow />
                </ButtonLink>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mx-auto mt-6 max-w-xl text-center text-[11px] leading-6 text-muted">
          {t('pricing.note')}
        </p>
      </Container>
    </Section>
  )
}
