import process from 'node:process'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { credential } from 'firebase-admin'
import { FireormModule } from 'nestjs-fireorm'
import { TelegrafModule } from 'nestjs-telegraf'
import { session } from 'telegraf'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { GreatingModule } from './greating/greating.module'
import { SessionsModule } from './session/session.module'
import { SessionsService } from './session/session.service'

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FireormModule.forRoot({
      firestoreSettings: {
        projectId: process.env.GCLOUD_PROJECT,
        databaseId: '(default)',
        credential: credential.applicationDefault(),
      },
    }),
    TelegrafModule.forRootAsync({
      imports: [ConfigModule, SessionsModule],
      useFactory: (configService: ConfigService, store: SessionsService) => ({
        token: configService.getOrThrow<string>('TELEGRAM_BOT_TOKEN'),
        middlewares: [session({ store })],
        launchOptions: {
          webhook:
            process.env.NODE_ENV === 'production'
              ? {
                  domain: `https://us-central1-${process.env.GCLOUD_PROJECT}.cloudfunctions.net`,
                  path: `/${process.env.FUNCTION_TARGET}/updates`,
                }
              : undefined,
        },
      }),
      inject: [ConfigService, SessionsService],
    }),
    SessionsModule,
    GreatingModule,
  ],
})
export class AppModule {}
