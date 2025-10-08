import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import { CustomerProfile } from '../entities/customer-profile.entity';
import { CourierProfile } from '../entities/courier-profile.entity';
import { RestaurantProfile } from '../entities/restaurant-profile.entity';
import { AffiliateProfile } from '../entities/affiliate-profile.entity';
import { UserRole, UserStatus } from '../user-role.enum';
import { 
  RegisterCustomerDto, 
  RegisterCourierDto, 
  RegisterRestaurantAdminDto, 
  RegisterAffiliateDto, 
  RegisterAdminDto 
} from '../auth/dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(CustomerProfile)
    private customerProfileRepository: Repository<CustomerProfile>,
    @InjectRepository(CourierProfile)
    private courierProfileRepository: Repository<CourierProfile>,
    @InjectRepository(RestaurantProfile)
    private restaurantProfileRepository: Repository<RestaurantProfile>,
    @InjectRepository(AffiliateProfile)
    private affiliateProfileRepository: Repository<AffiliateProfile>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
      relations: [
        'customerProfile',
        'courierProfile', 
        'restaurantAdminProfile',
        'affiliateProfile'
      ],
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id },
      relations: [
        'customerProfile',
        'courierProfile',
        'restaurantAdminProfile', 
        'affiliateProfile'
      ],
    });
  }

  async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  async createCustomer(registerDto: RegisterCustomerDto): Promise<User> {
    const existingUser = await this.findByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // Create user
    const user = this.userRepository.create({
      email: registerDto.email,
      password: hashedPassword,
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      phone: registerDto.phone,
      role: UserRole.CUSTOMER,
      status: UserStatus.ACTIVE,
      emailVerified: false,
    });

    const savedUser = await this.userRepository.save(user);

    // Create customer profile
    const customerProfile = this.customerProfileRepository.create({
      userId: savedUser.id,
    });

    await this.customerProfileRepository.save(customerProfile);

    const userWithProfile = await this.findById(savedUser.id);
    if (!userWithProfile) {
      throw new Error('Failed to create user with profile');
    }

    return userWithProfile;
  }

  async createCourier(registerDto: RegisterCourierDto): Promise<User> {
    const existingUser = await this.findByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const user = this.userRepository.create({
      email: registerDto.email,
      password: hashedPassword,
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      phone: registerDto.phone,
      role: UserRole.COURIER,
      status: UserStatus.PENDING_VERIFICATION,
      emailVerified: false,
    });

    const savedUser = await this.userRepository.save(user);

    const courierProfile = this.courierProfileRepository.create({
      vehicleType: registerDto.vehicleType || undefined,
      vehicleNumber: registerDto.vehicleNumber,
      isOnline: false,
    });
    
    // Set the userId separately since TypeORM might not recognize it in create
    courierProfile.userId = savedUser.id;

    await this.courierProfileRepository.save(courierProfile);

    const userWithProfile = await this.findById(savedUser.id);
    if (!userWithProfile) {
      throw new Error('Failed to create user with profile');
    }

    return userWithProfile;
  }

  async createRestaurantAdmin(registerDto: RegisterRestaurantAdminDto): Promise<User> {
    const existingUser = await this.findByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const user = this.userRepository.create({
      email: registerDto.email,
      password: hashedPassword,
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      phone: registerDto.phone,
      role: UserRole.RESTAURANT_ADMIN,
      status: UserStatus.PENDING_VERIFICATION,
      emailVerified: false,
    });

    const savedUser = await this.userRepository.save(user);

    const restaurantProfile = this.restaurantProfileRepository.create({
      userId: savedUser.id,
      restaurantId: registerDto.restaurantId,
      position: registerDto.position,
    });

    await this.restaurantProfileRepository.save(restaurantProfile);

    const userWithProfile = await this.findById(savedUser.id);
    if (!userWithProfile) {
      throw new Error('Failed to create user with profile');
    }

    return userWithProfile;
  }

  async createAffiliate(registerDto: RegisterAffiliateDto): Promise<User> {
    const existingUser = await this.findByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const user = this.userRepository.create({
      email: registerDto.email,
      password: hashedPassword,
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      phone: registerDto.phone,
      role: UserRole.AFFILIATE,
      status: UserStatus.ACTIVE,
      emailVerified: false,
    });

    const savedUser = await this.userRepository.save(user);

    const affiliateCode = this.generateAffiliateCode(registerDto.firstName, registerDto.lastName);

    const affiliateProfile = this.affiliateProfileRepository.create({
      userId: savedUser.id,
      affiliateCode,
      commissionRate: 5.00, // Default 5% commission
    });

    await this.affiliateProfileRepository.save(affiliateProfile);

    const userWithProfile = await this.findById(savedUser.id);
    if (!userWithProfile) {
      throw new Error('Failed to create user with profile');
    }

    return userWithProfile;
  }

  async createAdmin(registerDto: RegisterAdminDto): Promise<User> {
    const existingUser = await this.findByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const user = this.userRepository.create({
      email: registerDto.email,
      password: hashedPassword,
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      phone: registerDto.phone,
      role: UserRole.ADMIN,
      status: UserStatus.ACTIVE,
      emailVerified: true, // Admins are pre-verified
    });

    const savedUser = await this.userRepository.save(user);

    const userWithProfile = await this.findById(savedUser.id);
    if (!userWithProfile) {
      throw new Error('Failed to create user with profile');
    }

    return userWithProfile;
  }

  async updateLastLogin(id: string): Promise<void> {
    await this.userRepository.update(id, { lastLoginAt: new Date() });
  }

  async changePassword(id: string, currentPassword: string, newPassword: string): Promise<void> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isCurrentPasswordValid = await this.validatePassword(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      throw new BadRequestException('Current password is incorrect');
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await this.userRepository.update(id, { password: hashedNewPassword });
  }

  async updateStatus(id: string, status: UserStatus): Promise<User> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.status = status;
    return this.userRepository.save(user);
  }

  private generateAffiliateCode(firstName: string, lastName: string): string {
    const namePart = (firstName[0] + lastName[0]).toUpperCase();
    const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${namePart}${randomPart}`;
  }
}