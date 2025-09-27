import { registerAs } from '@nestjs/config';

export interface AppConfig {
  port: number;
  globalPrefix: string;
  corsOrigin: string | string[] | boolean;
  environment: string;
}

export default registerAs('app', (): AppConfig => ({
  port: parseInt(process.env.PORT || '3001', 10),
  globalPrefix: 'api',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  environment: process.env.NODE_ENV || 'development',
}));