import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { RestaurantProfile } from './restaurant-profile.entity';

@Entity('restaurants')
export class Restaurant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column({ type: 'jsonb' })
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    latitude: number;
    longitude: number;
  };

  @Column({ type: 'jsonb', nullable: true })
  cuisine: string[];

  @Column({
    type: 'enum',
    enum: ['active', 'inactive', 'suspended', 'pending_verification'],
    default: 'pending_verification',
  })
  status: string;

  @Column({ type: 'decimal', precision: 3, scale: 2, default: 0.00 })
  rating: number;

  @Column({ default: 0 })
  totalReviews: number;

  @Column({
    type: 'enum',
    enum: ['$', '$$', '$$$', '$$$$'],
    default: '$$',
  })
  priceRange: string;

  @Column({ type: 'jsonb' })
  openingHours: {
    [key: string]: {
      isOpen: boolean;
      openTime?: string;
      closeTime?: string;
    };
  };

  @Column({ type: 'jsonb', nullable: true })
  features: string[];

  @Column({ type: 'jsonb', nullable: true })
  images: Array<{
    id: string;
    url: string;
    type: 'cover' | 'menu' | 'interior' | 'food';
    isPrimary: boolean;
    uploadedAt: Date;
  }>;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
  deliveryRadius?: number; // in kilometers

  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  deliveryFee?: number;

  @Column({ type: 'decimal', precision: 3, scale: 2, nullable: true })
  taxRate?: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn({ nullable: true })
  verifiedAt?: Date;

  // Relations
  @OneToMany(() => RestaurantProfile, profile => profile.restaurant, { cascade: true })
  admins: RestaurantProfile[];
}