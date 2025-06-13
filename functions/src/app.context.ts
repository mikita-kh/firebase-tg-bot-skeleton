import type { Context } from 'telegraf'

import type { SessionEntity } from './session/entities/session.entity'

export interface AppContext extends Context {
  session?: Partial<Omit<SessionEntity, 'id' | 'sessionKey'>>
}
