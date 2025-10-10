import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
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

    // Create customer profile and set relationship
    const customerProfile = this.customerProfileRepository.create();
    customerProfile.userId = savedUser.id;
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

    // Create courier profile and set relationship
    const courierProfile = this.courierProfileRepository.create();
    courierProfile.userId = savedUser.id;
    courierProfile.vehicleNumber = registerDto.vehicleNumber;
    courierProfile.isOnline = false;
    
    if (registerDto.vehicleType) {
      courierProfile.vehicleType = registerDto.vehicleType;
    }

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

    // Create restaurant profile and set relationship
    const restaurantProfile = this.restaurantProfileRepository.create();
    restaurantProfile.userId = savedUser.id;
    restaurantProfile.restaurantId = registerDto.restaurantId;
    restaurantProfile.position = registerDto.position;

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

    // Create affiliate profile and set relationship
    const affiliateProfile = this.affiliateProfileRepository.create();
    affiliateProfile.userId = savedUser.id;
    affiliateProfile.affiliateCode = affiliateCode;
    affiliateProfile.commissionRate = 5.00; // Default 5% commission

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

  async findAll(filters: {
    page?: number;
    limit?: number;
    role?: UserRole;
    status?: UserStatus;
    search?: string;
  }): Promise<{ data: User[]; total: number }> {
    const { page = 1, limit = 10, role, status, search } = filters;
    const skip = (page - 1) * limit;

    const whereConditions: any = {};

    if (role) {
      whereConditions.role = role;
    }

    if (status) {
      whereConditions.status = status;
    }

    if (search) {
      whereConditions.email = Like(`%${search}%`);
    }

    const [data, total] = await this.userRepository.findAndCount({
      where: whereConditions,
      relations: [
        'customerProfile',
        'courierProfile',
        'restaurantAdminProfile', 
        'affiliateProfile'
      ],
      skip,
      take: limit,
      order: {
        createdAt: 'DESC'
      }
    });

    return { data, total };
  }

  async updateUser(id: string, updateData: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    role?: UserRole;
    status?: UserStatus;
  }): Promise<User | null> {
    const user = await this.findById(id);
    if (!user) {
      return null;
    }

    Object.assign(user, updateData);
    return this.userRepository.save(user);
  }

  async deleteUser(id: string): Promise<boolean> {
    const result = await this.userRepository.delete(id);
    return (result.affected && result.affected > 0) || false;
  }

  private generateAffiliateCode(firstName: string, lastName: string): string {
    const namePart = (firstName[0] + lastName[0]).toUpperCase();
    const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${namePart}${randomPart}`;
  }
}