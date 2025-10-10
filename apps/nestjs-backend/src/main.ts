import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const configService = app.get(ConfigService);
  
  const corsOriginRaw = configService.get('CORS_ORIGIN');
  const corsOrigins = corsOriginRaw
    ? corsOriginRaw
        .split(',')
        .map(origin => origin.trim())
        .filter(origin => origin.length > 0)
    : [];
  
  const finalOrigins = corsOrigins.length > 0 ? corsOrigins : ['http://localhost:3000', 'http://localhost:4200', 'http://localhost:4000'];
  
  app.enableCors({
    origin: finalOrigins,
    credentials: true,
  });
  
  app.setGlobalPrefix('api');
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  
  const config = new DocumentBuilder()
    .setTitle('Food Delivery API')
    .setDescription('API for food delivery platform with authentication and database')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  
  const port = configService.get('PORT') || 5001;
  await app.listen(port);
  
  console.log(`🚀 Application is running on: http://localhost:${port}`);
  console.log(`📚 Swagger docs available at: http://localhost:${port}/docs`);
  console.log(`🗄️  Database: PostgreSQL on port ${configService.get('DB_PORT') || '5433'}`);
}

bootstrap();
