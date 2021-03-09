import { config } from 'dotenv';
config(); // server config
config({ path: '../.env' }); // common config

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as express from 'express';
import { join } from 'path';
import { env } from 'config';

const clientFiles = join(__dirname, '..', '..', 'client', 'build');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  if (env.production) {
    // serve static files on heroku
    app.use(express.static(clientFiles));

    // resolve unknown endpoint with index.html, also for heroku
    app.use(function (req, res, next) {
      if (req.route || req.path.startsWith('/graphql')) next();
      else
        res.sendFile(
          join(__dirname, '..', '..', 'client', 'build', 'index.html'),
          () => {
            res.end();
          },
        );
    });
  }

  const url = process.env.API_URL;
  await app.listen(url ? new URL(url).port : 4000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
