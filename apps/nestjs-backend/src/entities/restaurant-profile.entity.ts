import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Restaurant } from './restaurant.entity';

@Entity('restaurant_profiles')
export class RestaurantProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @OneToOne(() => User, user => user.restaurantAdminProfile)
  user: User;

  @Column({ nullable: true })
  restaurantId?: string;

  @ManyToOne(() => Restaurant, restaurant => restaurant.admins, { nullable: true })
  restaurant?: Restaurant;

  @Column({ nullable: true })
  position?: string;

  @Column({ default: false })
  canManageMenu: boolean;

  @Column({ default: false })
  canManageOrders: boolean;

  @Column({ default: false })
  canManageStaff: boolean;

  @Column({ default: false })
  canManageAnalytics: boolean;

  @Column({ default: false })
  canManageSettings: boolean;

  @Column({ type: 'jsonb', nullable: true })
  permissions?: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}