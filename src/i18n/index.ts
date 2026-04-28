import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import he from './locales/he.json'
import en from './locales/en.json'
import ar from './locales/ar.json'

export const supportedLanguages = ['he', 'en', 'ar'] as const
export type Language = (typeof supportedLanguages)[number]

export const rtlLanguages: Language[] = ['he', 'ar']

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      he: { translation: he },
      en: { translation: en },
      ar: { translation: ar },
    },
    fallbackLng: 'he',
    supportedLngs: supportedLanguages,
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'za-cpa-lang',
    },
  })

export default i18n
