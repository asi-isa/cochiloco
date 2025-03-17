'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { RefreshRouteOnSave as PayloadLivePreview } from '@payloadcms/live-preview-react'

export const RefreshRouteOnSave: React.FC = () => {
  const router = useRouter()

  if (!process.env.NEXT_PUBLIC_SERVER_URL) {
    throw new Error('Missing NEXT_PUBLIC_SERVER_URL')
  }

  return (
    <PayloadLivePreview
      refresh={() => router.refresh()}
      serverURL={process.env.NEXT_PUBLIC_SERVER_URL}
    />
  )
}
