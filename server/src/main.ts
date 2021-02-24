import { config } from 'dotenv';
config();

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as express from 'express';
import { join }  from 'path';

const clientFiles = join(__dirname, '..', '..', 'client', 'build');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.use(express.static(clientFiles));

  app.use(function(req, res, next) {
    if (req.route || req.path.startsWith('/graphql'))
      next()
    else
      res.sendFile(join(__dirname, '..', '..', 'client', 'build', 'index.html'), () => {
        res.end();
      });
  });

  await app.listen(process.env.PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
