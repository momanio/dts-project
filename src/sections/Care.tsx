import { useEffect, useRef } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'
import {
  Award,
  BadgeCheck,
  CalendarDays,
  Check,
  Heart,
  Microscope,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Smile,
  Baby,
  Cross,
  Layers3,
  Leaf,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { clinic } from '../config/clinic'
import type { ServiceId } from '../types/clinic'
import {
  BookLink,
  Container,
  DirectionArrow,
  Reveal,
  Section,
  SectionHeading,
  ToothMark,
} from '../components/ui'
import { ClinicImage } from '../components/ClinicImage'
import { cn } from '../lib/utils'

const serviceIcons: Record<ServiceId, LucideIcon> = {
  checkup: Stethoscope,
  whitening: Sparkles,
  implants: Layers3,
  orthodontics: Smile,
  veneers: ScanLine,
  rootCanal: Heart,
  pediatric: Baby,
  emergency: Cross,
}

export function TrustBar() {
  const { t } = useTranslation()
  const badges = [
    { key: 'association', Icon: Award },
    { key: 'digital', Icon: ScanLine },
    { key: 'sterilization', Icon: ShieldCheck },
    { key: 'care', Icon: Heart },
  ]
  return (
    <aside className="border-y border-line bg-soft/50 py-8" aria-label={t('trust.label')}>
      <Container>
        <div className="flex flex-col items-center gap-7 lg:flex-row lg:justify-between">
          <p className="max-w-40 text-center text-[9px] leading-5 font-semibold tracking-[0.12em] text-muted lg:text-start">
            {t('trust.label')}
          </p>
          <div className="grid w-full grid-cols-2 gap-x-5 gap-y-6 lg:w-auto lg:grid-cols-4 lg:gap-10">
            {badges.map(({ key, Icon }) => (
              <div key={key} className="flex items-center justify-center gap-2.5 text-primary">
                <Icon className="size-6 shrink-0" strokeWidth={1.3} aria-hidden="true" />
                <span className="max-w-32 text-[11px] leading-5 font-medium">
                  {t(`trust.${key}`)}
                </span>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-5 text-center text-[10px] text-muted">{t('trust.demo')}</p>
      </Container>
    </aside>
  )
}

export function About() {
  const { t } = useTranslation()
  return (
    <Section id="about">
      <Container className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <Reveal className="relative mx-auto w-full max-w-md">
          <div
            className="absolute -start-3 top-3 h-full w-full rounded-3xl border border-accent/60"
            aria-hidden="true"
          />
          <div className="relative overflow-hidden rounded-3xl bg-soft">
            <ClinicImage
              src={clinic.images.doctor}
              fallback="/images/doctor.svg"
              alt={t('about.imageAlt')}
              width={800}
              height={1000}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover object-top"
            />
            <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-line bg-surface/95 px-5 py-4 text-ink backdrop-blur-md">
              <p className="font-display text-2xl font-semibold">{t('clinic.doctorName')}</p>
              <p className="mt-1 text-xs text-muted">{t('clinic.doctorRole')}</p>
            </div>
          </div>
          <div className="absolute -end-4 top-7 flex size-23 -rotate-6 flex-col items-center justify-center gap-1 rounded-full border-4 border-canvas bg-primary p-3 text-center text-primary-ink">
            <Heart className="size-5" strokeWidth={1.4} aria-hidden="true" />
            <span className="text-[9px] leading-4">{t('about.badge')}</span>
          </div>
          <p className="mt-6 text-center text-[10px] text-muted">{t('about.note')}</p>
        </Reveal>
        <div>
          <SectionHeading section="about" />
          <Reveal delay={0.1}>
            <p className="mt-6 text-sm leading-8 text-muted">{t('clinic.doctorBio')}</p>
            <ul className="mt-6 space-y-3">
              {clinic.doctor.qualifications.map((_, index) => (
                <li key={index} className="flex items-start gap-3 text-xs leading-6">
                  <BadgeCheck className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  {t(`clinic.qualifications.${index}`)}
                </li>
              ))}
            </ul>
            <blockquote className="my-8 border-s-2 border-accent ps-5 font-display text-2xl leading-relaxed text-primary">
              “{t('clinic.doctorQuote')}”
            </blockquote>
            <BookLink />
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}

export function Services() {
  const { t } = useTranslation()
  return (
    <Section id="services" className="bg-soft/55">
      <Container>
        <div className="mb-12 flex flex-col justify-between gap-7 md:flex-row md:items-end">
          <SectionHeading section="services" />
          <p className="max-w-xs text-sm leading-7 text-muted">{t('services.description')}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {clinic.services.map((service, index) => {
            const Icon = serviceIcons[service]
            const featured = index === 0
            return (
              <Reveal
                key={service}
                delay={(index % 4) * 0.07}
                className={cn(featured && 'sm:col-span-2')}
              >
                <a
                  href={`#contact?service=${service}`}
                  onClick={(event) => {
                    event.preventDefault()
                    window.dispatchEvent(
                      new CustomEvent<ServiceId>('luma:service', { detail: service }),
                    )
                    document
                      .getElementById('contact')
                      ?.scrollIntoView({
                        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
                          ? 'instant'
                          : 'smooth',
                      })
                    window.history.replaceState(null, '', '#contact')
                  }}
                  className={cn(
                    'group relative flex h-full min-h-65 flex-col overflow-hidden rounded-3xl border p-7 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-deep/10',
                    featured
                      ? 'on-deep border-deep bg-deep text-deep-ink focus-visible:outline-offset-[-5px]'
                      : 'border-line bg-surface/80',
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        'flex size-11 items-center justify-center rounded-xl',
                        featured ? 'bg-deep-ink/10' : 'bg-soft text-primary',
                      )}
                    >
                      <Icon className="size-5" strokeWidth={1.4} aria-hidden="true" />
                    </span>
                    <span
                      className={cn(
                        'flex size-8 items-center justify-center rounded-full border transition-transform group-hover:rotate-12',
                        featured ? 'border-deep-ink/25' : 'border-line',
                      )}
                    >
                      <DirectionArrow />
                    </span>
                  </div>
                  {featured && (
                    <>
                      <ToothMark className="pointer-events-none absolute -end-4 bottom-6 size-52 -rotate-12 text-accent/10" />
                      <p className="mt-7 text-[9px] tracking-[0.18em] text-accent">
                        {t('services.checkup.detail')}
                      </p>
                    </>
                  )}
                  <h3
                    className={cn(
                      'relative mb-3 mt-6 text-base font-semibold',
                      featured && 'mt-3 font-display text-3xl font-medium',
                    )}
                  >
                    {t(`services.${service}.title`)}
                  </h3>
                  <p
                    className={cn(
                      'relative max-w-sm text-xs leading-6',
                      featured ? 'text-deep-muted' : 'text-muted',
                    )}
                  >
                    {t(`services.${service}.description`)}
                  </p>
                </a>
              </Reveal>
            )
          })}
          <Reveal delay={0.15}>
            <div className="flex h-full min-h-65 flex-col items-start justify-center rounded-3xl border border-dashed border-primary/30 bg-transparent p-7">
              <Leaf className="mb-4 size-7 text-primary" strokeWidth={1.3} aria-hidden="true" />
              <h3 className="text-base font-semibold">{t('services.cta')}</h3>
              <p className="mb-5 mt-2 text-xs leading-6 text-muted">{t('services.ctaDetail')}</p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-xs font-semibold text-primary"
              >
                {t('common.book')}
                <DirectionArrow />
              </a>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}

function Counter({ value, suffix, label }: { value: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const visible = useInView(ref, { once: true })
  const reduced = useReducedMotion()
  const { i18n } = useTranslation()
  useEffect(() => {
    if (!visible || !ref.current) return
    const formatter = new Intl.NumberFormat(i18n.language, {
      maximumFractionDigits: Number.isInteger(value) ? 0 : 1,
    })
    if (reduced) {
      ref.current.textContent = formatter.format(value)
      return
    }
    const animation = animate(0, value, {
      duration: 1.7,
      ease: 'easeOut',
      onUpdate: (current) => {
        if (ref.current) ref.current.textContent = formatter.format(current)
      },
    })
    return () => animation.stop()
  }, [visible, value, reduced, i18n.language])
  return (
    <div className="text-center">
      <p
        aria-label={`${new Intl.NumberFormat(i18n.language).format(value)}${suffix ?? ''}`}
        className="font-display text-4xl sm:text-5xl"
      >
        <span ref={ref} aria-hidden="true">
          {new Intl.NumberFormat(i18n.language).format(value)}
        </span>
        <span aria-hidden="true" className="text-accent">
          {suffix}
        </span>
      </p>
      <p className="mt-3 text-xs text-deep-muted">{label}</p>
    </div>
  )
}

export function WhyChooseUs() {
  const { t } = useTranslation()
  const icons = [Microscope, Heart, ShieldCheck, CalendarDays]
  return (
    <Section id="why">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading section="why" description />
            <div className="mt-9 grid gap-6 sm:grid-cols-2">
              {icons.map((Icon, index) => (
                <Reveal delay={index * 0.06} key={index}>
                  <Icon className="mb-3 size-6 text-primary" strokeWidth={1.5} aria-hidden="true" />
                  <h3 className="text-sm font-semibold">{t(`why.items.${index}.title`)}</h3>
                  <p className="mt-2 text-xs leading-6 text-muted">
                    {t(`why.items.${index}.description`)}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal className="relative">
            <ClinicImage
              src={clinic.images.clinic}
              fallback="/images/clinic.svg"
              alt={t('why.imageAlt')}
              loading="lazy"
              width={900}
              height={1000}
              className="aspect-[5/6] max-h-[570px] w-full rounded-t-[9rem] rounded-b-3xl object-cover"
            />
            <div className="absolute inset-x-6 bottom-6 flex items-center gap-3 rounded-2xl bg-surface/95 p-5 shadow-sm shadow-deep/10 backdrop-blur">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-soft text-primary">
                <Check className="size-5" aria-hidden="true" />
              </span>
              <p className="text-sm font-medium">{t('about.caption')}</p>
            </div>
          </Reveal>
        </div>
        <Reveal className="mt-16 rounded-3xl on-deep bg-deep px-5 py-10 text-deep-ink sm:px-12">
          <div className="grid grid-cols-3 gap-3 divide-x divide-deep-ink/20 rtl:divide-x-reverse">
            <Counter value={clinic.stats.experience} suffix="+" label={t('why.experience')} />
            <Counter value={clinic.stats.patients} suffix="+" label={t('why.patients')} />
            <Counter value={clinic.stats.rating} suffix="/5" label={t('why.rating')} />
          </div>
          <p className="mt-7 text-center text-[10px] text-deep-muted">{t('why.note')}</p>
        </Reveal>
      </Container>
    </Section>
  )
}
