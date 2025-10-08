import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
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

// Create classes for Swagger decorators since interfaces can't be used
class LoginResponseDto {
  access_token: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    status: string;
  };
}

class RegisterResponseDto {
  message: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, description: 'Login successful', type: LoginResponseDto })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
    return this.authService.login(loginDto);
  }

  @Post('register/customer')
  @ApiOperation({ summary: 'Register a new customer' })
  @ApiResponse({ status: 201, description: 'Customer registered successfully', type: RegisterResponseDto })
  @ApiResponse({ status: 409, description: 'User with this email already exists' })
  registerCustomer(@Body() registerDto: RegisterCustomerDto): Promise<RegisterResponse> {
    return this.authService.registerCustomer(registerDto);
  }

  @Post('register/courier')
  @ApiOperation({ summary: 'Register a new courier' })
  @ApiResponse({ status: 201, description: 'Courier registered successfully', type: RegisterResponseDto })
  @ApiResponse({ status: 409, description: 'User with this email already exists' })
  registerCourier(@Body() registerDto: RegisterCourierDto): Promise<RegisterResponse> {
    return this.authService.registerCourier(registerDto);
  }

  @Post('register/restaurant-admin')
  @ApiOperation({ summary: 'Register a new restaurant admin' })
  @ApiResponse({ status: 201, description: 'Restaurant admin registered successfully', type: RegisterResponseDto })
  @ApiResponse({ status: 409, description: 'User with this email already exists' })
  registerRestaurantAdmin(@Body() registerDto: RegisterRestaurantAdminDto): Promise<RegisterResponse> {
    return this.authService.registerRestaurantAdmin(registerDto);
  }

  @Post('register/affiliate')
  @ApiOperation({ summary: 'Register a new affiliate' })
  @ApiResponse({ status: 201, description: 'Affiliate registered successfully', type: RegisterResponseDto })
  @ApiResponse({ status: 409, description: 'User with this email already exists' })
  registerAffiliate(@Body() registerDto: RegisterAffiliateDto): Promise<RegisterResponse> {
    return this.authService.registerAffiliate(registerDto);
  }

  @Post('register/admin')
  @ApiOperation({ summary: 'Register a new admin (requires admin privileges)' })
  @ApiResponse({ status: 201, description: 'Admin registered successfully', type: RegisterResponseDto })
  @ApiResponse({ status: 409, description: 'User with this email already exists' })
  registerAdmin(@Body() registerDto: RegisterAdminDto): Promise<RegisterResponse> {
    return this.authService.registerAdmin(registerDto);
  }
}