import { Lesson } from '@/payload-types'

export function isLesson(item: unknown): item is Lesson {
  return typeof item === 'object' && item !== null && 'id' in item && 'title' in item
}
