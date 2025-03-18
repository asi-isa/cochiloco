import { Metadata, ResolvingMetadata } from 'next'

import { getPayload } from '@/app/(payload)'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import { RefreshRouteOnSave } from '@/components/refresh-route-on-save'
import { LanguageChanger } from '@/lib/i18n/language-changer'
import { Locale } from '@/lib/i18n/i18nConfig'
import { isChapter } from '@/app/(payload)/collections/chapters/utils'
import { isLesson } from '@/app/(payload)/collections/lessons/utils'

type HomePageProps = {
  params: Promise<{ locale: Locale }>
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params
  const payload = await getPayload()
  const data = await payload.findGlobal({ slug: 'home-page', locale })
  const courseStructure = await payload.findGlobal({ slug: 'course-structure', locale, depth: 2 })

  return (
    <>
      <RefreshRouteOnSave />
      <div>
        <h1 className="text-3xl font-bold underline">{data.title}</h1>
        <ThemeToggle />
        <LanguageChanger />
        {courseStructure.chapters?.map((chapter) => {
          if (!isChapter(chapter)) {
            throw new Error(`Expected a Chapter but got: ${chapter}`)
          }
          return (
            <div key={chapter.id}>
              <h2>{chapter.title}</h2>
              {chapter.lessons?.map((lesson) => {
                if (!isLesson(lesson)) {
                  throw new Error(`Expected a Lesson but got: ${lesson}`)
                }
                return (
                  <div key={lesson.id} className="pl-4">
                    <h3>{lesson.title}</h3>
                  </div>
                )
              })}
            </div>
          )
        })}
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
