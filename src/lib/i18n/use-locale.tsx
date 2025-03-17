'use client'

import { useState, useEffect } from 'react'

import { Locale, defaultLocale } from './i18nConfig'

export const useLocale = () => {
  const [locale, setLocale] = useState<Locale>(defaultLocale)

  useEffect(() => {
    const htmlLang = document.documentElement.lang || defaultLocale
    setLocale(htmlLang as Locale)
  }, [])

  return locale
}
