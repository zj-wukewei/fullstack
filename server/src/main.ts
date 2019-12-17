import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { LoggerService } from './modules/logger/logger.service';

import exceptionFactory from './common/validation-pipe-exception-factory';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new LoggerService(),
  });
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory,
    }),
  );
  await app.listen(3000);
}
bootstrap();
