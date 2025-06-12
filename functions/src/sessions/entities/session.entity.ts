import type { User as TelegramUser } from 'telegraf/types'

export class SessionEntity {
  id!: string

  sessionKey!: string

  tgUser?: TelegramUser

  count?: number
}
