import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.enableCors({
    origin: 'http://localhost:5000',
  });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));
  const port = process.env.PPRODUCT_PORT;
  await app.listen(port, () => console.log('running on port'+ port)
  );
}
bootstrap();
