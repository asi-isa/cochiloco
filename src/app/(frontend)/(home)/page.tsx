import { Metadata, ResolvingMetadata } from 'next'

import { getPayload } from '@/app/(payload)'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import { RefreshRouteOnSave } from '@/components/refresh-route-on-save'

export default async function HomePage() {
  const payload = await getPayload()
  const data = await payload.findGlobal({ slug: 'home-page' })

  return (
    <>
      <RefreshRouteOnSave />
      <div>
        <h1 className="text-3xl font-bold underline">{data.title}</h1>
        <ThemeToggle />
      </div>
    </>
  )
}

type GenerateMetadataProps = {
  params: Promise<{}>
  searchParams: Promise<{}>
}

export async function generateMetadata(
  { params, searchParams }: GenerateMetadataProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const {} = await params
  const {} = await searchParams
  const {} = await parent

  const payload = await getPayload()

  const data = await payload.findGlobal({
    slug: 'home-page',
    // locale: locale,
  })

  return {
    title: data.meta?.title ?? data.title,
    description: data.meta?.description ?? data.title,
  }
}
