import type { Context } from 'telegraf'

import type { SessionEntity } from './sessions/entities/session.entity'

export interface AppContext extends Context {
  session?: Partial<Omit<SessionEntity, 'id' | 'sessionKey'>>
}
