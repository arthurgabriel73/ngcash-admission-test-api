import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

require('dotenv').config();

async function bootstrap() {


    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder().addBearerAuth()
        .setTitle('NGCASH ADMISSION TEST')
        .setDescription('Essa aplicação foi feita por **Arthur Gabriel**, a pedido da empresa NG.')
        .setVersion('1.0')
        .addTag('Authentication')
        .addTag('Users')
        .addTag('Accounts')
        .addTag('Transactions')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

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
