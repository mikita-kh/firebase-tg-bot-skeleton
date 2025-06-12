import type { Response } from 'express'
import type { Telegraf, Context as TelegrafContext } from 'telegraf'
import type { Update as TelegramUpdate } from 'telegraf/types'
import type { AppContext } from './app.context'
import { Injectable } from '@nestjs/common'

import { Command, Ctx, Hears, InjectBot, Start, Update } from 'nestjs-telegraf'

@Injectable()
@Update()
export class AppService {
  constructor(
    @InjectBot()
    private readonly bot: Telegraf<TelegrafContext>,
  ) {}

  async handleUpdate(body: TelegramUpdate, res: Response) {
    return this.bot.handleUpdate(body, res)
  }

  @Start()
  async onStart(@Ctx() ctx: AppContext) {
    ctx.session = {
      ...ctx.session,
      tgUser: ctx.from,
    }

    await ctx.reply(':wave:')
  }

  @Hears('hi')
  async onHi(@Ctx() ctx: AppContext) {
    ctx.session = {
      ...ctx.session,
      count: (ctx.session?.count ?? 0) + 1,
    }

    await ctx.reply('hi')
  }

  @Command('stats')
  async onStats(@Ctx() ctx: AppContext) {
    await ctx.reply(`bot syas ${ctx.session?.count ?? 0} "hi"`)
  }
}
