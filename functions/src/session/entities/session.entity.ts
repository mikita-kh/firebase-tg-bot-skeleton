import type { User as TelegramUser } from 'telegraf/types'

import { Collection } from 'fireorm'

@Collection('session')
export class SessionEntity {
  id!: string

  sessionKey!: string

  tgUser?: TelegramUser

  count?: number
}
