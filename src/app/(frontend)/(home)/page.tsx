import React from 'react'

import { getPayload } from '@/app/(payload)'
import { ThemeToggle } from '@/components/theme/theme-toggle'

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
