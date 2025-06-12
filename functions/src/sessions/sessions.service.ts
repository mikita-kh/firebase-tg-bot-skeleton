import type { FirestoreCollection } from '@cristobalgvera/nestjs-firestore'
import type { DocumentReference } from '@google-cloud/firestore'
import type { AsyncSessionStore } from 'telegraf/session'
import { InjectCollection } from '@cristobalgvera/nestjs-firestore'
import { Injectable } from '@nestjs/common'

import { SessionEntity } from './entities/session.entity'

@Injectable()
export class SessionsService implements AsyncSessionStore<SessionEntity> {
  constructor(
    @InjectCollection(SessionEntity)
    private sessions: FirestoreCollection<SessionEntity>,
  ) {}

  async findOneDocumnetBySessionKey(sessionKey: string) {
    return (await this.sessions.where('sessionKey', '==', sessionKey).get()).docs.at(0)
  }

  async findOneBySessionKey(sessionKey: string) {
    return (await this.findOneDocumnetBySessionKey(sessionKey))?.data() ?? null
  }

  async save(sessionObj: Partial<Omit<SessionEntity, 'sessionKey'>> & Pick<SessionEntity, 'sessionKey'>) {
    const { id, ...data } = sessionObj
    let docRef: DocumentReference | null = null

    if (id) {
      docRef = this.sessions.doc(id)

      if ((await docRef.get()).data()?.sessionKey !== data.sessionKey) {
        await this.removeBySessionKey(data.sessionKey)
        docRef = null
      }
    }

    docRef ??= this.sessions.doc()

    await docRef.set(data as SessionEntity)

    return sessionObj
  }

  async removeBySessionKey(sessionKey: string) {
    const docRef = (await this.findOneDocumnetBySessionKey(sessionKey))?.ref

    if (docRef) {
      await docRef.delete()
    }
  }

  async get(sessionKey: string) {
    return (await this.findOneBySessionKey(sessionKey)) ?? ({ sessionKey } as SessionEntity)
  }

  async set(sessionKey: string, sessionObj: SessionEntity) {
    return this.save({ ...(await this.findOneBySessionKey(sessionKey)), ...sessionObj, sessionKey })
  }

  async delete(sessionKey: string) {
    await this.removeBySessionKey(sessionKey)
  }
}
