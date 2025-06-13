import type { CanActivate, ExecutionContext } from '@nestjs/common'
import type { AppContext } from '../../app.context'

import { Injectable } from '@nestjs/common'
import { TelegrafException, TelegrafExecutionContext } from 'nestjs-telegraf'

@Injectable()
export class AdminGuard implements CanActivate {
  private readonly ADMIN_IDS: number[] = []

  canActivate(context: ExecutionContext): boolean {
    const ctx = TelegrafExecutionContext.create(context)
    const { from } = ctx.getContext<AppContext>()

    const isAdmin = Boolean(from?.id && this.ADMIN_IDS.includes(from.id))

    if (!isAdmin) {
      throw new TelegrafException('You are not admin 😡')
    }

    return true
  }
}
