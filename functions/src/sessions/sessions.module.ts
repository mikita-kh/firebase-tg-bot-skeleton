import { FirestoreModule } from '@cristobalgvera/nestjs-firestore'
import { Module } from '@nestjs/common'

import { SessionEntity } from './entities/session.entity'
import { SessionsService } from './sessions.service'

@Module({
  imports: [
    FirestoreModule.forFeature([
      {
        collection: SessionEntity,
        path: 'sessions',
      },
    ]),
  ],
  providers: [SessionsService],
  exports: [SessionsService],
})
export class SessionsModule {}
