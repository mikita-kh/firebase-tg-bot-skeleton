import type { Response } from 'express'
import type { Update } from 'telegraf/types'

import { Body, Controller, forwardRef, Inject, Post, Res } from '@nestjs/common'
import { AppService } from './app.service'

// register endpoints
@Controller()
export class AppController {
  constructor(
    @Inject(forwardRef(() => AppService))
    private readonly appService: AppService,
  ) {}

  @Post('updates')
  async create(@Body() body: Update, @Res() res: Response) {
    return this.appService.handleUpdate(body, res)
  }
}
