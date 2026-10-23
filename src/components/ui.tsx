import type { AnchorHTMLAttributes, ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight, Star } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '../lib/utils'

export function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12', className)} {...props} />
  )
}
type ButtonStyle = { variant?: 'primary' | 'secondary' | 'light'; className?: string }
function buttonStyle({ variant = 'primary', className }: ButtonStyle) {
  return cn(
    'inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-6 py-3 text-sm font-semibold transition-[background-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-60',
    variant === 'primary' &&
      'bg-primary text-primary-ink shadow-sm hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/10',
    variant === 'secondary' && 'border border-line bg-transparent text-ink hover:bg-soft',
    variant === 'light' && 'bg-[#f3f5eb] text-deep hover:bg-white',
    className,
  )
}
export function Button({
  variant,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & ButtonStyle) {
  return <button className={buttonStyle({ variant, className })} {...props} />
}
export function ButtonLink({
  variant,
  className,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & ButtonStyle) {
  return <a className={buttonStyle({ variant, className })} {...props} />
}
export function DirectionArrow({ className }: { className?: string }) {
  return (
    <ArrowUpRight
      className={cn('size-4 shrink-0 rtl:-scale-x-100', className)}
      aria-hidden="true"
    />
  )
}
export function BookLink({ variant, className }: ButtonStyle) {
  const { t } = useTranslation()
  return (
    <ButtonLink href="#contact" variant={variant} className={className}>
      {t('common.book')}
      <DirectionArrow />
    </ButtonLink>
  )
}
export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('rounded-3xl border border-line bg-surface/80', className)} {...props} />
  )
}
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
export function Section({
  id,
  className,
  children,
}: {
  id: string
  className?: string
  children: ReactNode
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn('py-20 sm:py-24 lg:py-28', className)}
    >
      {children}
    </section>
  )
}
export function SectionHeading({
  section,
  className,
  centered = false,
  description = false,
}: {
  section: string
  className?: string
  centered?: boolean
  description?: boolean
}) {
  const { t } = useTranslation()
  return (
    <Reveal className={cn('max-w-2xl', centered && 'mx-auto text-center', className)}>
      <p className="eyebrow mb-5">{t(`${section}.eyebrow`)}</p>
      <h2 id={`${section}-title`} className="section-title">
        {t(`${section}.title`)}
        <br />
        <em className="font-medium text-primary">{t(`${section}.accent`)}</em>
      </h2>
      {description && (
        <p className="mt-6 max-w-lg text-sm leading-7 text-muted sm:text-base">
          {t(`${section}.description`)}
        </p>
      )}
    </Reveal>
  )
}
export function Stars({ rating = 5, className }: { rating?: number; className?: string }) {
  const { t } = useTranslation()
  return (
    <span
      role="img"
      aria-label={t('common.stars', { count: rating })}
      className={cn('inline-flex gap-1 text-[#9b742e] dark:text-accent', className)}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className="size-3.5 fill-current" aria-hidden="true" />
      ))}
    </span>
  )
}
export function ToothMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path
        d="M24 10c-6-5-16-3-16 6 0 6 3 10 5 16 1 4 2 7 5 7 4 0 2-13 6-13s2 13 6 13c3 0 4-3 5-7 2-6 5-10 5-16 0-9-10-11-16-6Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M17 14c3-1 6 2 10 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
export function Logo({ inverse = false }: { inverse?: boolean }) {
  const { t } = useTranslation()
  return (
    <a
      href="#home"
      aria-label={`${t('clinic.name')} — ${t('nav.home')}`}
      className={cn(
        'inline-flex shrink-0 items-center gap-2.5',
        inverse ? 'text-[#edf3ec]' : 'text-ink',
      )}
    >
      <span
        className={cn(
          'flex size-11 items-center justify-center rounded-full border',
          inverse ? 'border-white/30' : 'border-primary/40',
        )}
      >
        <ToothMark className="size-8" />
      </span>
      <span className="text-lg font-semibold tracking-tight sm:text-xl">{t('clinic.name')}</span>
    </a>
  )
}
