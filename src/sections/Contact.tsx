import { useEffect, useRef, useState } from 'react'
import { useForm, type Resolver } from 'react-hook-form'
import {
  Check,
  Clock3,
  LoaderCircle,
  LockKeyhole,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { clinic, phoneHref, whatsappHref } from '../config/clinic'
import {
  bookingSchema,
  clinicToday,
  maximumBookingDate,
  submitAppointment,
  type BookingValues,
} from '../lib/booking'
import {
  Button,
  ButtonLink,
  Card,
  Container,
  DirectionArrow,
  Section,
  SectionHeading,
} from '../components/ui'

// The Zod resolver stays local so the validation contract can also be reused by an API.
const resolver: Resolver<BookingValues> = async (values) => {
  const result = bookingSchema.safeParse(values)
  if (result.success) return { values: result.data, errors: {} }
  const errors: Partial<Record<keyof BookingValues, { type: string; message: string }>> = {}
  for (const issue of result.error.issues) {
    const field = issue.path[0]
    if (typeof field === 'string' && field in values && !errors[field as keyof BookingValues])
      errors[field as keyof BookingValues] = { type: issue.code, message: issue.message }
  }
  return { values: {}, errors }
}

export default function Contact() {
  const { t } = useTranslation()
  const [success, setSuccess] = useState<{ demo: boolean } | null>(null)
  const [failed, setFailed] = useState(false)
  const [showMap, setShowMap] = useState(false)
  const successRef = useRef<HTMLDivElement>(null)
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BookingValues>({
    resolver,
    defaultValues: { name: '', phone: '', date: '', service: '', message: '' },
  })
  useEffect(() => {
    const selectService = (event: Event) => {
      if (
        event instanceof CustomEvent &&
        typeof event.detail === 'string' &&
        clinic.services.some((service) => service === event.detail)
      ) {
        setValue('service', event.detail, { shouldValidate: true })
        setSuccess(null)
      }
    }
    window.addEventListener('luma:service', selectService)
    return () => window.removeEventListener('luma:service', selectService)
  }, [setValue])
  useEffect(() => {
    if (success) successRef.current?.focus()
  }, [success])
  const submit = handleSubmit(async (values) => {
    setFailed(false)
    try {
      setSuccess(await submitAppointment(values))
      reset()
    } catch {
      setFailed(true)
    }
  })
  const error = (field: keyof BookingValues) =>
    errors[field] ? (
      <p
        id={`${field}-error`}
        role="alert"
        className="mt-2 text-xs leading-5 text-red-700 dark:text-red-300"
      >
        {t(`validation.${field}`, { days: clinic.booking.maxDaysAhead })}
      </p>
    ) : null
  const fieldProps = (field: keyof BookingValues) => ({
    id: field,
    'aria-invalid': !!errors[field],
    'aria-describedby': errors[field]
      ? `${field}-error`
      : field === 'phone'
        ? 'phone-hint'
        : undefined,
  })
  const mapUrl = `https://www.google.com/maps?q=${clinic.geo.lat},${clinic.geo.lng}&z=15`
  return (
    <Section id="contact" className="bg-soft/60">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <SectionHeading section="contact" description />
            <div className="mt-10 space-y-7">
              <div className="flex items-start gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-line bg-surface">
                  <MapPin className="size-5 text-primary" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-sm font-semibold">{t('contact.address')}</h3>
                  <address className="mt-2 text-sm leading-7 text-muted not-italic">
                    {t('clinic.street')}
                    <br />
                    {t('clinic.area')}
                  </address>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-line bg-surface">
                  <Clock3 className="size-5 text-primary" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <div className="w-full max-w-xs">
                  <h3 className="text-sm font-semibold">{t('contact.hours')}</h3>
                  <dl className="mt-2 space-y-2 text-xs leading-6 text-muted">
                    <div className="flex justify-between gap-4">
                      <dt>{t('contact.weekdays')}</dt>
                      <dd dir="ltr">
                        {clinic.hours.weekdays.opens} – {clinic.hours.weekdays.closes}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt>{t('contact.saturday')}</dt>
                      <dd>
                        {clinic.hours.saturday ? (
                          <span dir="ltr">
                            {clinic.hours.saturday.opens} – {clinic.hours.saturday.closes}
                          </span>
                        ) : (
                          t('contact.closed')
                        )}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt>{t('contact.friday')}</dt>
                      <dd>{t('contact.closed')}</dd>
                    </div>
                  </dl>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <ButtonLink href={phoneHref} variant="secondary">
                  <Phone className="size-4" aria-hidden="true" />
                  <bdi>{clinic.phone}</bdi>
                </ButtonLink>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 px-2 text-xs font-semibold text-primary"
                >
                  <MessageCircle className="size-4" aria-hidden="true" />
                  {t('common.whatsapp')}
                </a>
              </div>
            </div>
          </div>
          <Card className="p-6 shadow-lg shadow-deep/3 sm:p-9">
            {success ? (
              <div
                ref={successRef}
                tabIndex={-1}
                role="status"
                className="flex min-h-[560px] flex-col items-center justify-center text-center"
              >
                <span className="mb-6 flex size-16 items-center justify-center rounded-full bg-soft text-primary">
                  <Check className="size-8" aria-hidden="true" />
                </span>
                <h3 className="font-display text-3xl">
                  {t(success.demo ? 'contact.successTitle' : 'contact.liveSuccessTitle')}
                </h3>
                <p className="my-6 max-w-sm text-sm leading-7 text-muted">
                  {t(success.demo ? 'contact.successMessage' : 'contact.liveSuccessMessage')}
                </p>
                <Button
                  type="button"
                  onClick={() => {
                    setSuccess(null)
                    setFailed(false)
                  }}
                >
                  {t('contact.another')}
                </Button>
              </div>
            ) : (
              <form
                noValidate
                onSubmit={(event) => void submit(event)}
                aria-label={t('contact.formTitle')}
              >
                <h3 className="font-display text-3xl">{t('contact.formTitle')}</h3>
                <p className="mt-2 text-xs leading-6 text-muted">
                  {t('contact.formDescription')} {t('contact.required')}
                </p>
                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-xs font-medium">
                      {t('contact.name')} *
                    </label>
                    <input
                      {...register('name')}
                      {...fieldProps('name')}
                      autoComplete="name"
                      maxLength={80}
                      placeholder={t('contact.namePlaceholder')}
                      className="field"
                      required
                    />
                    {error('name')}
                  </div>
                  <div>
                    <label htmlFor="phone" className="mb-2 block text-xs font-medium">
                      {t('contact.phone')} *
                    </label>
                    <input
                      {...register('phone')}
                      {...fieldProps('phone')}
                      type="tel"
                      dir="ltr"
                      autoComplete="tel"
                      maxLength={25}
                      placeholder={t('contact.phonePlaceholder')}
                      className="field"
                      required
                    />
                    {error('phone')}
                    <p id="phone-hint" className="mt-1.5 text-[10px] leading-5 text-muted">
                      {t('contact.phoneHint')}
                    </p>
                  </div>
                  <div>
                    <label htmlFor="date" className="mb-2 block text-xs font-medium">
                      {t('contact.date')} *
                    </label>
                    <input
                      {...register('date')}
                      {...fieldProps('date')}
                      type="date"
                      min={clinicToday()}
                      max={maximumBookingDate()}
                      className="field min-h-12"
                      required
                    />
                    {error('date')}
                  </div>
                  <div>
                    <label htmlFor="service" className="mb-2 block text-xs font-medium">
                      {t('contact.service')} *
                    </label>
                    <select
                      {...register('service')}
                      {...fieldProps('service')}
                      className="field min-h-12"
                      required
                    >
                      <option value="">{t('contact.servicePlaceholder')}</option>
                      {clinic.services.map((service) => (
                        <option key={service} value={service}>
                          {t(`services.${service}.title`)}
                        </option>
                      ))}
                    </select>
                    {error('service')}
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="mb-2 block text-xs font-medium">
                      {t('contact.message')}{' '}
                      <span className="font-normal text-muted">{t('contact.optional')}</span>
                    </label>
                    <textarea
                      {...register('message')}
                      {...fieldProps('message')}
                      rows={3}
                      maxLength={1000}
                      placeholder={t('contact.messagePlaceholder')}
                      className="field resize-y"
                    />
                    {error('message')}
                  </div>
                </div>
                {failed && (
                  <p
                    role="alert"
                    className="mt-4 rounded-xl bg-red-50 p-3 text-xs leading-6 text-red-800 dark:bg-red-950 dark:text-red-200"
                  >
                    {t('contact.error')}
                  </p>
                )}
                <Button type="submit" disabled={isSubmitting} className="mt-5 w-full">
                  {isSubmitting ? (
                    <>
                      <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
                      {t('contact.submitting')}
                    </>
                  ) : (
                    <>
                      {t('contact.submit')}
                      <DirectionArrow />
                    </>
                  )}
                </Button>
                <p className="mt-4 flex items-start justify-center gap-2 text-center text-[10px] leading-5 text-muted">
                  <LockKeyhole className="mt-1 size-3 shrink-0" aria-hidden="true" />
                  {t('contact.privacy')}
                </p>
                {!clinic.booking.endpoint && (
                  <p className="mt-3 rounded-lg bg-soft px-3 py-2 text-center text-[10px] leading-5 text-muted">
                    {t('contact.demo')}
                  </p>
                )}
              </form>
            )}
          </Card>
        </div>
        <div className="relative mt-12 overflow-hidden rounded-3xl border border-line bg-soft">
          {showMap ? (
            <iframe
              src={`${mapUrl}&output=embed`}
              title={t('contact.mapTitle')}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-72 w-full border-0"
              allowFullScreen
            />
          ) : (
            <div className="relative flex min-h-64 items-center justify-center bg-[url('/images/map.svg')] bg-cover bg-center p-6">
              <div className="relative rounded-2xl border border-line bg-surface/95 px-8 py-6 text-center shadow-lg shadow-deep/10 backdrop-blur">
                <MapPin
                  className="mx-auto mb-3 size-6 text-primary"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <h3 className="font-display text-2xl">{t('contact.map')}</h3>
                <p className="mb-4 mt-1 text-[10px] text-muted">{t('contact.mapDescription')}</p>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setShowMap(true)}
                  className="min-h-10 px-5 py-2 text-xs"
                >
                  {t('contact.loadMap')}
                </Button>
              </div>
            </div>
          )}
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-12 items-center justify-center gap-2 bg-surface p-3 text-xs font-medium text-primary"
          >
            {t('contact.openMap')}
            <DirectionArrow />
          </a>
        </div>
      </Container>
    </Section>
  )
}
