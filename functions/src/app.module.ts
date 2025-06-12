import { Module } from '@nestjs/common';
import { TelegrafModule, Update } from 'nestjs-telegraf';
import { AppController } from './app.controller';

@Module({
    controllers: [AppController],
  imports: [
    TelegrafModule.forRoot({
      token: process.env.BOT_TOKEN as string,
      middlewares: [],
      include: [],
    })
  ],
})
export class AppModule {}