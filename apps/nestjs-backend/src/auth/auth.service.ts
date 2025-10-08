import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { 
  LoginDto, 
  RegisterCustomerDto, 
  RegisterCourierDto, 
  RegisterRestaurantAdminDto, 
  RegisterAffiliateDto, 
  RegisterAdminDto, 
  LoginResponse, 
  RegisterResponse 
} from './dto';
import { UsersService } from '../users/users.service';
import { UserStatus } from '../user-role.enum';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<LoginResponse> {
    const user = await this.usersService.findByEmail(loginDto.email);
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.usersService.validatePassword(
      loginDto.password, 
      user.password
    );
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.status !== UserStatus.ACTIVE) {
      throw new UnauthorizedException('Account is not active');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      status: user.status,
    };

    const access_token = this.jwtService.sign(payload);

    // Update last login
    await this.usersService.updateLastLogin(user.id);

    return {
      access_token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        status: user.status,
      },
    };
  }

  async registerCustomer(registerDto: RegisterCustomerDto): Promise<RegisterResponse> {
    const user = await this.usersService.createCustomer(registerDto);

    return {
      message: 'Customer registered successfully',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  }

  async registerAffiliate(registerDto: RegisterAffiliateDto): Promise<RegisterResponse> {
    const user = await this.usersService.createAffiliate(registerDto);

    return {
      message: 'Affiliate registered successfully',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  }

  async registerCourier(registerDto: RegisterCourierDto): Promise<RegisterResponse> {
    const user = await this.usersService.createCourier(registerDto);

    return {
      message: 'Courier registered successfully. Awaiting verification.',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  }

  async registerRestaurantAdmin(registerDto: RegisterRestaurantAdminDto): Promise<RegisterResponse> {
    const user = await this.usersService.createRestaurantAdmin(registerDto);

    return {
      message: 'Restaurant admin registered successfully. Awaiting verification.',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  }

  async registerAdmin(registerDto: RegisterAdminDto): Promise<RegisterResponse> {
    const user = await this.usersService.createAdmin(registerDto);

    return {
      message: 'Admin registered successfully',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  }
}