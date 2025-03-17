import { Config } from 'next-i18n-router/dist/types'

export const localeNames = {
  en: 'English',
  de: 'Deutsch',
} as const

export const locales = Object.keys(localeNames) as (keyof typeof localeNames)[]
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'

const i18nConfig: Config = {
  locales,
  defaultLocale,
}

export default i18nConfig
