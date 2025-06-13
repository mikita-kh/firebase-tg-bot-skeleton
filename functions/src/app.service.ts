import type { Response } from 'express'
import type { Telegraf, Context as TelegrafContext } from 'telegraf'
import type { Update as TelegramUpdate } from 'telegraf/types'

import { Injectable } from '@nestjs/common'
import { InjectBot } from 'nestjs-telegraf'

@Injectable()
export class AppService {
  constructor(
    @InjectBot()
    private readonly bot: Telegraf<TelegrafContext>,
  ) {}

  async handleUpdate(body: TelegramUpdate, res: Response) {
    return this.bot.handleUpdate(body, res)
  }
}
