import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionHandler } from './handler';
import { SocketAdapter } from "./socket/socket.adapter";

const logger = new Logger('Main')

async function initialize(app: INestApplication) {
  app.setGlobalPrefix('api');
  app.enableCors({ origin: process.env.CORS_BASE_URL });

  const document = SwaggerModule.createDocument(app, new DocumentBuilder()
    .setTitle('Conversation api')
    .setDescription('This is conversation api docs')
    .setVersion('1.0')
    .build())
  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      defaultModelsExpandDepth: -1
    }
  })

  app.useWebSocketAdapter(new SocketAdapter(app))

  app.useGlobalFilters(new HttpExceptionHandler());

  app.useGlobalPipes(new ValidationPipe());
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await initialize(app)

  await app.listen(+process.env.PORT);
}

bootstrap().catch(logger.error);
