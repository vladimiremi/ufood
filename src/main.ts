import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const PORT = 3000;

async function bootstrap() {
  const logger = new Logger(bootstrap.name);
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, () => {
    logger.log('Server is running on port 3000 🚀');
  });
}
bootstrap();
