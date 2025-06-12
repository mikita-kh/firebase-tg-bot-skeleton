import type { Response } from 'express'
import type { Update } from 'telegraf/types'
import type { AppService } from './app.service'

import { Body, Controller, Post, Res } from '@nestjs/common'

// register endpoints
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('updates')
  async create(@Body() body: Update, @Res() res: Response) {
    return this.appService.handleUpdate(body, res)
  }
}
