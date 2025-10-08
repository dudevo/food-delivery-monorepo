import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { DatabaseModule } from '../database/database.module';
import { User } from '../entities/user.entity';
import { CustomerProfile } from '../entities/customer-profile.entity';
import { CourierProfile } from '../entities/courier-profile.entity';
import { RestaurantProfile } from '../entities/restaurant-profile.entity';
import { AffiliateProfile } from '../entities/affiliate-profile.entity';

@Module({
  imports: [DatabaseModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}