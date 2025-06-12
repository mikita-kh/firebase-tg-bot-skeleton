import type { NestExpressApplication } from '@nestjs/platform-express'
import type { Express } from 'express'
import { NestFactory } from '@nestjs/core'
import { ExpressAdapter } from '@nestjs/platform-express'
import { debug, error, info, warn } from 'firebase-functions/logger'
import once from 'lodash.once'

import { AppModule } from './app.module'

export const bootstrap = once(async (server: Express) => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(server), {
    cors: true,
    logger: {
      log: info,
      warn,
      error,
      debug,
    },
  })

  await app.init()

  return app
})
