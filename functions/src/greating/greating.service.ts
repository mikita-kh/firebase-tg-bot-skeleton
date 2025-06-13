import type { AppContext } from '../app.context'
import { Injectable } from '@nestjs/common'

@Injectable()
export class GreatingService {
  async handleGreating(ctx: AppContext) {
    ctx.session = {
      ...ctx.session,
      count: (ctx.session?.count ?? 0) + 1,
    }
    await ctx.reply('hi')
  }

  async handleStats(ctx: AppContext) {
    await ctx.reply(`bot says ${ctx.session?.count ?? 0} "hi"`)
  }
}
