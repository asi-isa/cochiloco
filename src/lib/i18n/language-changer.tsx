'use client'

import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import i18nConfig, { localeNames, locales } from './i18nConfig'

import { useLocale } from './use-locale'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Dialog, DialogSimple } from '@/components/ui/dialog'

export const LanguageChanger = () => {
  const currentPathname = usePathname()
  const currentLocale = useLocale()
  const router = useRouter()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleChange = async (value: string) => {
    setIsDialogOpen(true)
    const newLocale = value

    // set cookie for next-i18n-router
    const days = 30
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${date.toUTCString()};path=/`

    if (currentLocale === i18nConfig.defaultLocale && !i18nConfig.prefixDefault) {
      router.push('/' + newLocale + currentPathname)
    } else {
      router.push(currentPathname.replace(`/${currentLocale}`, `/${newLocale}`))
    }

    router.refresh()
  }

  return (
    <>
      <Select onValueChange={(value) => handleChange(value)} value={currentLocale}>
        <SelectTrigger aria-label={localeNames[currentLocale]}>
          <SelectValue>{localeNames[currentLocale]}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {locales.map((locale) => (
            <SelectItem key={locale} value={locale}>
              {localeNames[locale]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Dialog open={isDialogOpen} modal>
        <DialogSimple>
          <div className="flex items-center justify-center">
            <span className="relative flex size-8">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground opacity-75"></span>
              <span className="relative inline-flex size-8 rounded-full bg-foreground"></span>
            </span>
          </div>
        </DialogSimple>
      </Dialog>
    </>
  )
}
