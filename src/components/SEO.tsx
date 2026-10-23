import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { clinic } from '../config/clinic'

export function SEO() {
  const { t, i18n } = useTranslation()
  useEffect(() => {
    document.title = t('seo.title')
    const metadata = {
      description: t('seo.description'),
      'og:title': t('seo.title'),
      'og:description': t('seo.description'),
      'og:locale': i18n.language === 'ar' ? 'ar_JO' : 'en_JO',
      'og:url': clinic.website,
      'og:image': `${clinic.website}/social-card.png`,
      'twitter:title': t('seo.title'),
      'twitter:description': t('seo.description'),
      'twitter:image': `${clinic.website}/social-card.png`,
    }
    Object.entries(metadata).forEach(([name, content]) => {
      const attribute = name.startsWith('og:') ? 'property' : 'name'
      let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${name}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute(attribute, name)
        document.head.appendChild(tag)
      }
      tag.content = content
    })
  }, [t, i18n.language])
  const data = {
    '@context': 'https://schema.org',
    '@type': ['Dentist', 'LocalBusiness'],
    name: t('clinic.name'),
    description: t('seo.description'),
    url: clinic.website,
    telephone: clinic.phone,
    image: `${clinic.website}/social-card.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: t('clinic.street'),
      addressLocality: clinic.address.city[i18n.language === 'en' ? 'en' : 'ar'],
      addressCountry: clinic.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: clinic.geo.lat, longitude: clinic.geo.lng },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: clinic.hours.weekdays.opens,
        closes: clinic.hours.weekdays.closes,
      },
      ...(clinic.hours.saturday
        ? [
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Saturday'],
              ...clinic.hours.saturday,
            },
          ]
        : []),
    ],
    currenciesAccepted: 'JOD',
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}
