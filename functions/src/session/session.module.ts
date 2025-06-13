import { Module } from '@nestjs/common'
import { FireormModule } from 'nestjs-fireorm'

import { SessionEntity } from './entities/session.entity'
import { SessionsService } from './session.service'

@Module({
  imports: [
    FireormModule.forFeature([SessionEntity]),
  ],
  providers: [SessionsService],
  exports: [SessionsService],
})
export class SessionsModule {}
