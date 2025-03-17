import './styles.css'

import React from 'react'

import { ThemeProvider } from '@/components/theme/theme-provider'
import i18nConfig, { Locale } from '@/lib/i18n/i18nConfig'
import { notFound } from 'next/navigation'

// TODO
export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

type RootLayoutProps = {
  children: React.ReactNode
  params: Promise<{ locale: Locale }>
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { locale } = await params

  if (!i18nConfig.locales.includes(locale)) {
    notFound()
  }

  return (
    <>
      <html lang={locale} suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }))
}
