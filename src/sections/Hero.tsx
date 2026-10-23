import { Heart, MapPin, MessageCircle, ShieldCheck, Sparkles } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { clinic, whatsappHref } from '../config/clinic'
import { BookLink, ButtonLink, Container, Reveal, Stars } from '../components/ui'
import { ClinicImage } from '../components/ClinicImage'

export function Hero() {
  const { t, i18n } = useTranslation()
  const reduced = useReducedMotion()
  const number = new Intl.NumberFormat(i18n.language)
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative overflow-hidden pb-14 pt-12 sm:pb-20 sm:pt-16 lg:pt-20"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -start-40 top-12 size-[600px] rounded-full bg-[#dae8d7]/35 blur-[100px] dark:bg-primary/5"
        animate={reduced ? undefined : { x: [0, 30, 0], y: [0, 25, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <Container className="relative grid items-center gap-12 lg:grid-cols-[1.04fr_1fr] lg:gap-16">
        <Reveal className="py-2 lg:py-8">
          <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/60 px-3.5 py-2">
            <span className="size-1.5 rounded-full bg-primary" />
            <p className="eyebrow text-[9px] sm:text-[10px]">{t('hero.eyebrow')}</p>
          </div>
          <h1
            id="hero-title"
            className="font-display text-[clamp(3.6rem,6.8vw,6.4rem)] leading-[1.04] font-medium tracking-[-0.045em]"
          >
            {t('hero.title')}
            <br />
            <em className="font-medium text-primary">{t('hero.accent')}</em>
            <span className="ms-2 inline-block align-top text-accent">
              <Sparkles className="size-7 sm:size-10" strokeWidth={1} aria-hidden="true" />
            </span>
          </h1>
          <p className="mt-7 max-w-[26rem] text-base leading-8 text-muted">
            {t('hero.description')}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <BookLink />
            <ButtonLink
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              {t('common.whatsapp')}
            </ButtonLink>
          </div>
          <div className="mt-11 grid max-w-md grid-cols-3 border-t border-line pt-7">
            <div className="border-e border-line pe-3">
              <strong className="font-display text-3xl font-semibold">
                {number.format(clinic.stats.experience)}
                <span className="text-primary">+</span>
              </strong>
              <p className="mt-1 text-[11px] text-muted sm:text-xs">{t('hero.experience')}</p>
            </div>
            <div className="border-e border-line px-4 sm:px-6">
              <strong className="font-display text-3xl font-semibold">
                {number.format(clinic.stats.patients)}
                <span className="text-primary">+</span>
              </strong>
              <p className="mt-1 text-[11px] text-muted sm:text-xs">{t('hero.patients')}</p>
            </div>
            <div className="ps-4 sm:ps-6">
              <div className="flex items-center gap-2">
                <strong className="font-display text-3xl font-semibold">
                  {number.format(clinic.stats.rating)}
                </strong>
                <Stars
                  className="hidden gap-0.5 sm:inline-flex [&_svg]:size-2.5"
                  rating={clinic.stats.rating}
                />
              </div>
              <p className="mt-1 text-[11px] text-muted sm:text-xs">{t('hero.rating')}</p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.15} className="relative mx-auto w-full max-w-xl px-3 pb-10 lg:px-0">
          <div
            className="absolute -end-4 top-8 h-[90%] w-[90%] rounded-t-[12rem] rounded-b-[2rem] border border-primary/20 sm:-end-5"
            aria-hidden="true"
          />
          <div className="relative h-[420px] overflow-hidden rounded-t-[11rem] rounded-b-3xl bg-soft sm:h-[500px] lg:h-[570px]">
            <ClinicImage
              src={clinic.images.hero}
              fallback="/images/clinic.svg"
              alt={t('hero.imageAlt')}
              width="1000"
              height="1200"
              fetchPriority="high"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#123d3a]/35 via-transparent to-transparent" />
            <div className="absolute start-6 top-6 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-2 text-[9px] font-semibold tracking-widest text-deep backdrop-blur-sm">
              <MapPin className="size-3" aria-hidden="true" />
              {t('hero.location')}
            </div>
            <p className="absolute inset-x-6 bottom-6 text-center font-display text-2xl text-white">
              {t('hero.note')}
            </p>
          </div>
          <div className="absolute -start-1 top-20 flex max-w-[85%] items-center gap-3 rounded-2xl border border-line/70 bg-surface/95 p-3.5 shadow-xl shadow-deep/5 backdrop-blur-md sm:-start-6 lg:-start-8">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-soft text-primary">
              <ShieldCheck className="size-5" strokeWidth={1.5} aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-semibold">{t('hero.badge')}</p>
              <p className="mt-1 text-[10px] text-muted">{t('hero.badgeDetail')}</p>
            </div>
          </div>
          <div className="absolute -end-1 bottom-0 flex max-w-[90%] items-center gap-3 rounded-2xl border border-line/70 bg-surface/95 p-4 shadow-xl shadow-deep/5 backdrop-blur-md sm:-end-5">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#f5eadd] text-[#7d5935]">
              <Heart className="size-5" strokeWidth={1.5} aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold">{t('hero.open')}</p>
              <p className="mt-1 text-xs text-muted">{t('hero.openDetail')}</p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
