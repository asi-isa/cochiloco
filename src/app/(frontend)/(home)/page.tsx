import React from 'react'

import { getPayload } from '@/app/(payload)'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import { Metadata, ResolvingMetadata } from 'next'

export default async function HomePage() {
  const payload = await getPayload()
  const data = await payload.findGlobal({ slug: 'home-page' })

  return (
    <div>
      <h1 className="text-3xl font-bold underline">{data.title}</h1>
      <ThemeToggle />
    </div>
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
