import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne } from 'typeorm';
import { UserRole, UserStatus } from '../user-role.enum';
import { CustomerProfile } from './customer-profile.entity';
import { CourierProfile } from './courier-profile.entity';
import { RestaurantProfile } from './restaurant-profile.entity';
import { AffiliateProfile } from './affiliate-profile.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CUSTOMER,
  })
  role: UserRole;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.PENDING_VERIFICATION,
  })
  status: UserStatus;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ default: false })
  emailVerified: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  lastLoginAt?: Date;

  @Column({ nullable: true })
  emailVerificationToken?: string;

  @Column({ nullable: true })
  passwordResetToken?: string;

  @Column({ nullable: true })
  passwordResetExpires?: Date;

  // Relations
  @OneToOne(() => CustomerProfile, customer => customer.user, { cascade: true })
  customerProfile?: CustomerProfile;

  @OneToOne(() => CourierProfile, courier => courier.user, { cascade: true })
  courierProfile?: CourierProfile;

  @OneToOne(() => RestaurantProfile, restaurant => restaurant.user, { cascade: true })
  restaurantAdminProfile?: RestaurantProfile;

  @OneToOne(() => AffiliateProfile, affiliate => affiliate.user, { cascade: true })
  affiliateProfile?: AffiliateProfile;
}