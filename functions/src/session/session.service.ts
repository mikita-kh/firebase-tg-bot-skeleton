import type { BaseFirestoreRepository } from 'fireorm'
import type { AsyncSessionStore } from 'telegraf/session'

import { Injectable } from '@nestjs/common'
import { InjectRepository } from 'nestjs-fireorm'
import { SessionEntity } from './entities/session.entity'

@Injectable()
export class SessionsService implements AsyncSessionStore<SessionEntity> {
  constructor(
    @InjectRepository(SessionEntity)
    private sessions: BaseFirestoreRepository<SessionEntity>,
  ) {}

  async findOneBySessionKey(sessionKey: string) {
    return (await this.sessions.whereEqualTo('sessionKey', sessionKey).findOne())
  }

  async save(sessionObj: Partial<Omit<SessionEntity, 'sessionKey'>> & Pick<SessionEntity, 'sessionKey'>) {
    const { id, ...data } = sessionObj
    let prevSession: SessionEntity | null = null

    if (id) {
      prevSession = await this.sessions.findById(id)

      if (prevSession?.sessionKey === data.sessionKey) {
        await this.sessions.update({
          id,
          ...data,
        })
      }
      else if (prevSession) {
        await this.removeBySessionKey(data.sessionKey)
      }
    }
    else {
      await this.sessions.create(sessionObj)
    }

    return sessionObj
  }

  async removeBySessionKey(sessionKey: string) {
    const id = (await this.findOneBySessionKey(sessionKey))?.id

    if (id) {
      this.sessions.delete(id)
    }
  }

  async get(sessionKey: string) {
    return (await this.findOneBySessionKey(sessionKey)) ?? ({ sessionKey } as SessionEntity)
  }

  async set(sessionKey: string, sessionObj: SessionEntity) {
    const prevSession = (await this.findOneBySessionKey(sessionKey))

    if (prevSession?.id) {
      return this.sessions.update({
        ...sessionObj,
        id: prevSession?.id,
      })
    }

    return this.sessions.create(sessionObj)
  }

  async delete(sessionKey: string) {
    await this.removeBySessionKey(sessionKey)
  }
}
