export type Locale = 'en' | 'ar'
export type Localized = Record<Locale, string>
export type ServiceId =
  | 'checkup'
  | 'whitening'
  | 'implants'
  | 'orthodontics'
  | 'veneers'
  | 'rootCanal'
  | 'pediatric'
  | 'emergency'

export interface ClinicConfig {
  name: Localized
  tagline: Localized
  phone: string
  whatsapp: string
  email: string
  website: string
  address: { street: Localized; area: Localized; city: Localized; country: string }
  geo: { lat: number; lng: number }
  hours: {
    weekdays: { opens: string; closes: string }
    saturday: { opens: string; closes: string } | null
  }
  doctor: {
    name: Localized
    role: Localized
    bio: Localized
    quote: Localized
    qualifications: Localized[]
  }
  stats: { experience: number; patients: number; rating: number; reviews: number }
  services: readonly ServiceId[]
  packages: { service: ServiceId; price: number; featured?: boolean }[]
  testimonials: { name: Localized; service: ServiceId; quote: Localized; rating: number }[]
  socials: { instagram: string; facebook: string }
  images: { hero: string; doctor: string; clinic: string; before: string; after: string }
  booking: { endpoint: string; maxDaysAhead: number }
}
