import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('courier_profiles')
export class CourierProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', unique: true })
  userId: string;

  @OneToOne(() => User, user => user.courierProfile)
  @JoinColumn()
  user: User;

  @Column({ 
    type: 'enum',
    enum: ['car', 'motorcycle', 'bicycle', 'scooter', 'truck'],
    nullable: true 
  })
  vehicleType?: 'car' | 'motorcycle' | 'bicycle' | 'scooter' | 'truck';

  @Column({ nullable: true })
  vehicleNumber?: string;

  @Column({ type: 'jsonb', nullable: true })
  currentLocation?: {
    latitude: number;
    longitude: number;
    updatedAt: Date;
  };

  @Column({ default: false })
  isOnline: boolean;

  @Column({ type: 'jsonb', nullable: true })
  workSchedule?: Array<{
    dayOfWeek: number; // 0-6 (Sunday-Saturday)
    startTime: string; // HH:mm format
    endTime: string; // HH:mm format
    isActive: boolean;
  }>;

  @Column({ default: 0 })
  completedDeliveries: number;

  @Column({ type: 'decimal', precision: 3, scale: 2, default: 0.00 })
  rating: number;

  @Column({ default: 0 })
  totalRatingCount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.00 })
  totalEarnings: number;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ type: 'jsonb', nullable: true })
  verificationDocuments?: Array<{
    id: string;
    type: string;
    url: string;
    status: 'pending' | 'approved' | 'rejected';
    uploadedAt: Date;
  }>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}