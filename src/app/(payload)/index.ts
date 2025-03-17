import { getPayload as _getPayload } from 'payload'

import config from '@/payload.config'

export async function getPayload() {
  const payloadConfig = await config
  return await _getPayload({ config: payloadConfig })
}
