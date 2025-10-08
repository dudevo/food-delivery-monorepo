import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('affiliate_profiles')
export class AffiliateProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @OneToOne(() => User, user => user.affiliateProfile)
  user: User;

  @Column({ unique: true })
  affiliateCode: string;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0.00 })
  totalEarnings: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.00 })
  pendingEarnings: number;

  @Column({ default: 0 })
  referralCount: number;

  @Column({ default: 0 })
  activeReferrals: number;

  @Column({ type: 'jsonb', nullable: true })
  payoutInfo?: {
    method: 'bank_transfer' | 'paypal' | 'crypto';
    accountNumber: string;
    routingNumber?: string;
    paypalEmail?: string;
    cryptoAddress?: string;
  };

  @Column({ default: 'pending' })
  payoutStatus: 'pending' | 'approved' | 'paid';

  @Column({ type: 'jsonb', nullable: true })
  referralLinks?: Array<{
    id: string;
    code: string;
    url: string;
    createdAt: Date;
    isActive: boolean;
    totalClicks: number;
    totalConversions: number;
  }>;

  @Column({ type: 'decimal', precision: 3, scale: 2, default: 0.00 })
  commissionRate: number; // Percentage

  @Column({ type: 'date', nullable: true })
  lastPayoutDate?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}