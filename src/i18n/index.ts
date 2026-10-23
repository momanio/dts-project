import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { readPreference, writePreference } from '../lib/utils'
import { ar } from './ar'
import { en } from './en'

const saved = readPreference('luma-language')
const language = saved === 'en' ? 'en' : 'ar'

function applyLanguage(lang: string) {
  document.documentElement.lang = lang
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  writePreference('luma-language', lang)
}

applyLanguage(language)
void i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, ar: { translation: ar } },
  lng: language,
  fallbackLng: 'ar',
  interpolation: { escapeValue: false },
})
i18n.on('languageChanged', applyLanguage)

export default i18n
