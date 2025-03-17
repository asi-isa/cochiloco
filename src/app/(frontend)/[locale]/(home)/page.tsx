import { Metadata, ResolvingMetadata } from 'next'

import { getPayload } from '@/app/(payload)'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import { RefreshRouteOnSave } from '@/components/refresh-route-on-save'
import { LanguageChanger } from '@/lib/i18n/language-changer'
import { Locale } from '@/lib/i18n/i18nConfig'

type HomePageProps = {
  params: Promise<{ locale: Locale }>
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params
  const payload = await getPayload()
  const data = await payload.findGlobal({ slug: 'home-page', locale })

  return (
    <>
      <RefreshRouteOnSave />
      <div>
        <h1 className="text-3xl font-bold underline">{data.title}</h1>
        <ThemeToggle />
        <LanguageChanger />
      </div>
    </>
  )
}

type GenerateMetadataProps = {
  params: Promise<{ locale: Locale }>
  searchParams: Promise<{}>
}

export async function generateMetadata(
  { params, searchParams }: GenerateMetadataProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { locale } = await params
  const {} = await searchParams
  const {} = await parent

  const payload = await getPayload()

  const data = await payload.findGlobal({
    slug: 'home-page',
    locale,
  })

  return {
    title: data.meta?.title ?? data.title,
    description: data.meta?.description ?? data.title,
  }
}
