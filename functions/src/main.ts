import {NestFactory} from '@nestjs/core';
import once from 'lodash.once';
import {ExpressAdapter, NestExpressApplication} from '@nestjs/platform-express';
import express, { Express } from 'express';
import {AppModule} from './app.module';
// import * as logger from "firebase-functions/logger";


export const bootstrap =  once(async function bootstrap(server: Express) {
    await NestFactory.createApplicationContext(AppModule);

    const adapter = new ExpressAdapter(server);
    const app = await NestFactory.create<NestExpressApplication>(
        AppModule, adapter, { cors: true },
    );

    // app.useLogger(logger)

    await app.init()
})
