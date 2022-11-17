import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";

require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true
      })
  );

  const port = process.env.APP_PORT
  await app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  }).catch(console.log)
}
bootstrap();
