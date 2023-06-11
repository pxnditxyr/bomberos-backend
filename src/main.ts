import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>( AppModule )

  const logger = new Logger()

  app.setGlobalPrefix( 'api' )

  app.enableCors({
    origin: '*',
  })

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  )

  await app.listen( process.env.PORT || 3000 )
  logger.log( `Application listening on ${ await app.getUrl() }` )
}
bootstrap();
