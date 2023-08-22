import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { CORS_CONFIG, SWAGGER_CONFIG } from './config/constant.config';
import { COMMON_CONST } from './share/common/app.const';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    allowedHeaders:
      'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
    methods: 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
    credentials: true,
  });

  // Start setup swagger document
  const config = new DocumentBuilder()
    .setTitle('File API Swagger')
    .setDescription('This is a detail specification of API Swagger')
    .setVersion('1.0')
    .addBearerAuth({ in: 'header', type: 'http' })
    .addServer(SWAGGER_CONFIG.URL)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // End setup swagger document

  app.setGlobalPrefix(COMMON_CONST.API_PREFIX);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(3300);
}
bootstrap();
