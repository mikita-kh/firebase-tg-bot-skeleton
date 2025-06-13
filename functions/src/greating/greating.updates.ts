import type { AppContext } from '../app.context'

import { forwardRef, Inject } from '@nestjs/common'
import { Command, Ctx, Hears, Update } from 'nestjs-telegraf'

import { GreatingService } from './greating.service'

@Update()
export class GreatingUpdates {
  constructor(
    @Inject(forwardRef(() => GreatingService))
    private readonly greatingService: GreatingService,
  ) {}

  @Hears('hi')
  async onHi(@Ctx() ctx: AppContext) {
    await this.greatingService.handleGreating(ctx)
  }

  @Command('stats')
  async onStats(@Ctx() ctx: AppContext) {
    await this.greatingService.handleStats(ctx)
  }
}
