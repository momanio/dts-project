import { CalendarCheck, MessageCircle, HeartHandshake, Smile } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Container, Reveal, Section, SectionHeading } from '../components/ui'

export function Journey() {
  const { t, i18n } = useTranslation()
  const icons = [CalendarCheck, MessageCircle, HeartHandshake, Smile]
  return (
    <Section id="journey">
      <Container>
        <SectionHeading section="journey" centered />
        <ol className="mt-14 grid gap-9 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
          {icons.map((Icon, index) => (
            <li key={index}>
              <Reveal delay={index * 0.1} className="relative">
                <div className="mb-6 flex items-center gap-4">
                  <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-line bg-soft">
                    <Icon className="size-6 text-primary" strokeWidth={1.4} aria-hidden="true" />
                  </span>
                  <span className="h-px flex-1 bg-line" />
                  <span className="text-xs text-primary">
                    {new Intl.NumberFormat(i18n.language, { minimumIntegerDigits: 2 }).format(
                      index + 1,
                    )}
                  </span>
                </div>
                <h3 className="text-base font-semibold">{t(`journey.steps.${index}.title`)}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">
                  {t(`journey.steps.${index}.description`)}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  )
}
