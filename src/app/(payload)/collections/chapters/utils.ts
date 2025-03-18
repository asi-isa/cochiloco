import { Chapter } from '@/payload-types'

export function isChapter(item: unknown): item is Chapter {
  return typeof item === 'object' && item !== null && 'id' in item && 'title' in item
}
