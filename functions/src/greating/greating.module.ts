import { Module } from '@nestjs/common'
import { GreatingService } from './greating.service'
import { GreatingUpdates } from './greating.updates'

@Module({
  providers: [GreatingService, GreatingUpdates],
})
export class GreatingModule {
}
