import { z } from 'zod'
import { clinic } from '../config/clinic.ts'

// Use the clinic's timezone rather than the visitor's timezone for booking dates.
export function clinicToday() {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Amman',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date())
}
export function maximumBookingDate() {
  const date = new Date(`${clinicToday()}T12:00:00Z`)
  date.setUTCDate(date.getUTCDate() + clinic.booking.maxDaysAhead)
  return date.toISOString().slice(0, 10)
}
export function normalizePhone(value: string) {
  const ascii = value
    .replace(/[٠-٩]/g, (digit) => String(digit.charCodeAt(0) - 0x660))
    .replace(/[۰-۹]/g, (digit) => String(digit.charCodeAt(0) - 0x6f0))
  const cleaned = ascii.replace(/[\s()-]/g, '')
  return cleaned.startsWith('00962')
    ? `+${cleaned.slice(2)}`
    : cleaned.startsWith('0')
      ? `+962${cleaned.slice(1)}`
      : cleaned
}
export function isAvailableDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const date = new Date(`${value}T12:00:00Z`)
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value) return false
  return (
    value >= clinicToday() &&
    value <= maximumBookingDate() &&
    date.getUTCDay() !== 5 &&
    (date.getUTCDay() !== 6 || clinic.hours.saturday !== null)
  )
}
export const bookingSchema = z.object({
  name: z.string().trim().min(2, 'name').max(80, 'name'),
  phone: z
    .string()
    .refine((value) => /^\+962(?:7[789]\d{7}|[2356]\d{7})$/.test(normalizePhone(value)), 'phone'),
  date: z.string().refine(isAvailableDate, 'date'),
  service: z
    .string()
    .refine((value) => clinic.services.some((service) => service === value), 'service'),
  message: z.string().max(1000, 'message'),
})
export type BookingValues = z.infer<typeof bookingSchema>

export async function submitAppointment(values: BookingValues): Promise<{ demo: boolean }> {
  const parsed = bookingSchema.parse(values)
  if (!clinic.booking.endpoint) {
    await new Promise<void>((resolve) => window.setTimeout(resolve, 800))
    return { demo: true }
  }
  const response = await fetch(clinic.booking.endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...parsed,
      phone: normalizePhone(parsed.phone),
      timezone: 'Asia/Amman',
    }),
    signal: AbortSignal.timeout(15000),
  })
  if (!response.ok) throw new Error('Appointment request failed')
  return { demo: false }
}
