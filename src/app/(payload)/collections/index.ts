import { CollectionConfig } from 'payload'

import { Users } from './users'
import { Media } from './media'
import { Chapters } from './chapters'
import { Lessons } from './lessons'

export const CollectionConfigs: CollectionConfig[] = [Lessons, Chapters, Users, Media]
