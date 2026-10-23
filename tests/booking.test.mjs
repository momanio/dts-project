import assert from 'node:assert/strict'
import { test } from 'node:test'
import { bookingSchema, clinicToday, isAvailableDate, maximumBookingDate, normalizePhone } from '../src/lib/booking.ts'
import { clinic } from '../src/config/clinic.ts'
import { en } from '../src/i18n/en.ts'
import { ar } from '../src/i18n/ar.ts'

function upcomingDay(day) {
  const date = new Date(`${clinicToday()}T12:00:00Z`)
  do {
    date.setUTCDate(date.getUTCDate() + 1)
  } while (date.getUTCDay() !== day)
  return date.toISOString().slice(0, 10)
}
const valid = {
  name: 'Test Patient',
  phone: '+962 79 123 4567',
  date: upcomingDay(0),
  service: 'checkup',
  message: '',
}

test('accepts Jordanian mobile, landline, international and Arabic-digit input', () => {
  for (const phone of [
    '+962 79 123 4567',
    '0781234567',
    '00962771234567',
    '065551234',
    '٠٧٩١٢٣٤٥٦٧',
  ]) {
    assert.equal(bookingSchema.safeParse({ ...valid, phone }).success, true, phone)
  }
  assert.equal(normalizePhone('٠٧٩١٢٣٤٥٦٧'), '+962791234567')
})
test('rejects incomplete, foreign, or invalid phone numbers', () => {
  for (const phone of ['', '+1 212 555 0123', '+962701234567', '079123', '+962791234567000']) {
    assert.equal(bookingSchema.safeParse({ ...valid, phone }).success, false, phone)
  }
})
test('rejects Friday, impossible dates, past dates and dates outside the window', () => {
  for (const date of [upcomingDay(5), '2026-02-30', '2001-01-01', '2099-12-31', 'invalid'])
    assert.equal(isAvailableDate(date), false, date)
  assert.equal(isAvailableDate(valid.date), true)
  assert.ok(maximumBookingDate() >= valid.date)
})
test('honors configurable Saturday closure', () => {
  const original = clinic.hours.saturday
  try {
    clinic.hours.saturday = null
    assert.equal(isAvailableDate(upcomingDay(6)), false)
  } finally {
    clinic.hours.saturday = original
  }
  assert.equal(isAvailableDate(upcomingDay(6)), true)
})
test('rejects unknown services and excessive message length', () => {
  assert.equal(bookingSchema.safeParse({ ...valid, service: 'unknown' }).success, false)
  assert.equal(bookingSchema.safeParse({ ...valid, name: ' ' }).success, false)
  assert.equal(bookingSchema.safeParse({ ...valid, message: 'x'.repeat(1001) }).success, false)
})
test('Arabic and English contain identical translation keys', () => {
  const keys = (value, prefix = '') =>
    Object.entries(value)
      .flatMap(([key, child]) =>
        typeof child === 'object' && child !== null
          ? keys(child, `${prefix}${key}.`)
          : `${prefix}${key}`,
      )
      .sort()
  assert.deepEqual(keys(ar), keys(en))
})
