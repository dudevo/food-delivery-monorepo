import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('customer_profiles')
export class CustomerProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @OneToOne(() => User, user => user.customerProfile)
  user: User;

  @Column({ type: 'jsonb', nullable: true })
  defaultAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    latitude?: number;
    longitude?: number;
  };

  @Column({ type: 'jsonb', nullable: true })
  deliveryAddresses?: Array<{
    id: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    latitude?: number;
    longitude?: number;
    isDefault: boolean;
  }>;

  @Column({ type: 'jsonb', nullable: true })
  dietaryPreferences?: string[];

  @Column({ default: 0 })
  loyaltyPoints: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.00 })
  totalSpent: number;

  @Column({ default: 0 })
  totalOrders: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}