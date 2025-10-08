import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from '../entities/user.entity';
import { CustomerProfile } from '../entities/customer-profile.entity';
import { CourierProfile } from '../entities/courier-profile.entity';
import { RestaurantProfile } from '../entities/restaurant-profile.entity';
import { Restaurant } from '../entities/restaurant.entity';
import { AffiliateProfile } from '../entities/affiliate-profile.entity';
import databaseConfig from '../config/database.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => databaseConfig(),
    }),
    TypeOrmModule.forFeature([
      User,
      CustomerProfile,
      CourierProfile,
      RestaurantProfile,
      Restaurant,
      AffiliateProfile,
    ]),
  ],
  exports: [
    TypeOrmModule,
  ],
})
export class DatabaseModule {}