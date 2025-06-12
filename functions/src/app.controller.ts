import { Controller, Post, Req, Res } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { Telegraf, Context } from 'telegraf';
import { Response, Request } from 'express';

// register endpoints 
@Controller()
export class AppController {
  constructor(
    @InjectBot()
    private readonly bot: Telegraf<Context>,
  ) {}

  @Post("updates")
  async create(@Req() req: Request, @Res() res: Response) {
    return this.bot.handleUpdate(req.body, res);
  }
}