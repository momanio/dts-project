import { MessageCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Accordion } from '../components/Accordion'
import { ButtonLink, Container, Section, SectionHeading } from '../components/ui'
import { whatsappHref } from '../config/clinic'

export function FAQ() {
  const { t } = useTranslation()
  const items = Array.from({ length: 6 }, (_, index) => ({
    question: t(`faq.items.${index}.question`),
    answer: t(`faq.items.${index}.answer`),
  }))
  return (
    <Section id="faq" className="border-t border-line">
      <Container className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div>
          <SectionHeading section="faq" description />
          <ButtonLink
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            className="mt-8"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            {t('common.whatsapp')}
          </ButtonLink>
        </div>
        <Accordion items={items} />
      </Container>
    </Section>
  )
}
