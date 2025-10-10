import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export interface DatabaseConfig {
  type: 'postgres';
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
  logging: boolean;
  entities: string[];
  migrations: string[];
  migrationsRun: boolean;
  ssl: boolean;
}

export default registerAs('database', (): TypeOrmModuleOptions => {
  const config: DatabaseConfig = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5433', 10),
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'food-delivery-nest-db',
    synchronize: false, // Disable again since schema should be fixed
    logging: process.env.NODE_ENV === 'development',
    entities: [join(__dirname, '..', '**', '*.entity{.ts,.js}')],
    migrations: [join(__dirname, '..', 'migrations', '*{.ts,.js}')],
    migrationsRun: process.env.NODE_ENV !== 'development',
    ssl: process.env.DB_SSL === 'true',
  };

  // Validate required environment variables
  if (!config.host) {
    throw new Error('Database host is required');
  }
  if (!config.username) {
    throw new Error('Database username is required');
  }
  if (!config.password) {
    throw new Error('Database password is required');
  }
  if (!config.database) {
    throw new Error('Database name is required');
  }

  // Validate port
  if (isNaN(config.port) || config.port < 1 || config.port > 65535) {
    throw new Error('Database port must be a valid port number (1-65535)');
  }

  return config;
});