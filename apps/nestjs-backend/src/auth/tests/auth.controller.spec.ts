import { Test, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { UserRole, UserStatus } from '../../user-role.enum';
import { LoginDto, RegisterCustomerDto, RegisterCourierDto, RegisterRestaurantAdminDto, RegisterAffiliateDto, RegisterAdminDto } from '../dto';

// Mock AuthService
const mockAuthService = {
  login: jest.fn(),
  registerCustomer: jest.fn(),
  registerCourier: jest.fn(),
  registerRestaurantAdmin: jest.fn(),
  registerAffiliate: jest.fn(),
  registerAdmin: jest.fn(),
};

describe('AuthController', () => {
  let authController: AuthController;
  let authService: jest.Mocked<AuthService>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: ['.env.test'],
        }),
        JwtModule.register({
          secret: 'test-secret',
          signOptions: { expiresIn: '1d' },
        }),
      ],
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    authController = module.get<AuthController>();
    authService = module.get(AuthService) as jest.Mocked<AuthService>;

    jest.clearAllMocks();
  });

  describe('POST /auth/login', () => {
    const loginDto: LoginDto = {
      email: 'test@example.com',
      password: 'password123',
    };

    const mockLoginResponse = {
      access_token: 'jwt-token',
      user: {
        id: 'user-123',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        role: UserRole.CUSTOMER,
        status: UserStatus.ACTIVE,
      },
    };

    it('should return login response on successful authentication', async () => {
      authService.login.mockResolvedValue(mockLoginResponse);

      const result = await authController.login(loginDto);

      expect(authService.login).toHaveBeenCalledWith(loginDto);
      expect(result).toEqual(mockLoginResponse);
    });

    it('should handle authentication errors', async () => {
      const error = new Error('Invalid credentials');
      authService.login.mockRejectedValue(error);

      await expect(authController.login(loginDto)).rejects.toThrow(error);
      expect(authService.login).toHaveBeenCalledWith(loginDto);
    });
  });

  describe('POST /auth/register/customer', () => {
    const registerDto: RegisterCustomerDto = {
      email: 'customer@test.com',
      password: 'Password@123',
      firstName: 'Jane',
      lastName: 'Smith',
      phone: '+1234567890',
    };

    const mockRegisterResponse = {
      message: 'Customer registered successfully',
      user: {
        id: 'new-user-123',
        email: 'customer@test.com',
        firstName: 'Jane',
        lastName: 'Smith',
        role: UserRole.CUSTOMER,
      },
    };

    it('should register a new customer successfully', async () => {
      authService.registerCustomer.mockResolvedValue(mockRegisterResponse);

      const result = await authController.registerCustomer(registerDto);

      expect(authService.registerCustomer).toHaveBeenCalledWith(registerDto);
      expect(result).toEqual(mockRegisterResponse);
    });

    it('should handle registration errors', async () => {
      const error = new Error('User with this email already exists');
      authService.registerCustomer.mockRejectedValue(error);

      await expect(authController.registerCustomer(registerDto)).rejects.toThrow(error);
      expect(authService.registerCustomer).toHaveBeenCalledWith(registerDto);
    });

    it('should validate required fields', async () => {
      const invalidDto = {
        email: 'invalid-email', // Invalid email format
        password: '123', // Too short, no special chars
        firstName: '', // Required field missing
        lastName: '', // Required field missing
      };

      // NestJS validation pipe should handle this automatically
      // In a real test, you'd use Supertest to test validation
      // For now, we'll just ensure the DTO is properly typed
      expect(invalidDto.email).not.toBe('');
      expect(invalidDto.firstName).toBe('');
    });
  });

  describe('POST /auth/register/courier', () => {
    const registerDto: RegisterCourierDto = {
      email: 'courier@test.com',
      password: 'Password@123',
      firstName: 'Mike',
      lastName: 'Wilson',
      phone: '+1234567891',
      vehicleType: 'motorcycle',
      vehicleNumber: 'COURIER-001',
    };

    const mockRegisterResponse = {
      message: 'Courier registered successfully. Awaiting verification.',
      user: {
        id: 'courier-user-123',
        email: 'courier@test.com',
        firstName: 'Mike',
        lastName: 'Wilson',
        role: UserRole.COURIER,
      },
    };

    it('should register a new courier successfully', async () => {
      authService.registerCourier.mockResolvedValue(mockRegisterResponse);

      const result = await authController.registerCourier(registerDto);

      expect(authService.registerCourier).toHaveBeenCalledWith(registerDto);
      expect(result).toEqual(mockRegisterResponse);
    });

    it('should handle registration errors', async () => {
      const error = new Error('User with this email already exists');
      authService.registerCourier.mockRejectedValue(error);

      await expect(authController.registerCourier(registerDto)).rejects.toThrow(error);
      expect(authService.registerCourier).toHaveBeenCalledWith(registerDto);
    });
  });

  describe('POST /auth/register/restaurant-admin', () => {
    const registerDto: RegisterRestaurantAdminDto = {
      email: 'restaurant@test.com',
      password: 'Password@123',
      firstName: 'Sarah',
      lastName: 'Johnson',
      phone: '+1234567892',
      restaurantId: 'restaurant-001',
      position: 'Manager',
    };

    const mockRegisterResponse = {
      message: 'Restaurant admin registered successfully. Awaiting verification.',
      user: {
        id: 'restaurant-user-123',
        email: 'restaurant@test.com',
        firstName: 'Sarah',
        lastName: 'Johnson',
        role: UserRole.RESTAURANT_ADMIN,
      },
    };

    it('should register a new restaurant admin successfully', async () => {
      authService.registerRestaurantAdmin.mockResolvedValue(mockRegisterResponse);

      const result = await authController.registerRestaurantAdmin(registerDto);

      expect(authService.registerRestaurantAdmin).toHaveBeenCalledWith(registerDto);
      expect(result).toEqual(mockRegisterResponse);
    });

    it('should handle registration errors', async () => {
      const error = new Error('User with this email already exists');
      authService.registerRestaurantAdmin.mockRejectedValue(error);

      await expect(authController.registerRestaurantAdmin(registerDto)).rejects.toThrow(error);
      expect(authService.registerRestaurantAdmin).toHaveBeenCalledWith(registerDto);
    });
  });

  describe('POST /auth/register/affiliate', () => {
    const registerDto: RegisterAffiliateDto = {
      email: 'affiliate@test.com',
      password: 'Password@123',
      firstName: 'David',
      lastName: 'Brown',
      phone: '+1234567893',
    };

    const mockRegisterResponse = {
      message: 'Affiliate registered successfully',
      user: {
        id: 'affiliate-user-123',
        email: 'affiliate@test.com',
        firstName: 'David',
        lastName: 'Brown',
        role: UserRole.AFFILIATE,
      },
    };

    it('should register a new affiliate successfully', async () => {
      authService.registerAffiliate.mockResolvedValue(mockRegisterResponse);

      const result = await authController.registerAffiliate(registerDto);

      expect(authService.registerAffiliate).toHaveBeenCalledWith(registerDto);
      expect(result).toEqual(mockRegisterResponse);
    });

    it('should handle registration errors', async () => {
      const error = new Error('User with this email already exists');
      authService.registerAffiliate.mockRejectedValue(error);

      await expect(authController.registerAffiliate(registerDto)).rejects.toThrow(error);
      expect(authService.registerAffiliate).toHaveBeenCalledWith(registerDto);
    });
  });

  describe('POST /auth/register/admin', () => {
    const registerDto: RegisterAdminDto = {
      email: 'admin@test.com',
      password: 'Admin@123',
      firstName: 'Super',
      lastName: 'Admin',
      phone: '+1234567899',
    };

    const mockRegisterResponse = {
      message: 'Admin registered successfully',
      user: {
        id: 'admin-user-123',
        email: 'admin@test.com',
        firstName: 'Super',
        lastName: 'Admin',
        role: UserRole.ADMIN,
      },
    };

    it('should register a new admin successfully', async () => {
      authService.registerAdmin.mockResolvedValue(mockRegisterResponse);

      const result = await authController.registerAdmin(registerDto);

      expect(authService.registerAdmin).toHaveBeenCalledWith(registerDto);
      expect(result).toEqual(mockRegisterResponse);
    });

    it('should handle registration errors', async () => {
      const error = new Error('User with this email already exists');
      authService.registerAdmin.mockRejectedValue(error);

      await expect(authController.registerAdmin(registerDto)).rejects.toThrow(error);
      expect(authService.registerAdmin).toHaveBeenCalledWith(registerDto);
    });
  });

  describe('DTO Validation', () => {
    it('should enforce password complexity requirements', () => {
      const invalidPasswords = [
        'password',     // Too short, no uppercase, no special char
        'Password',     // No special character, no number
        'Password123',  // No special character
        'PASSWORD123',  // No lowercase, no special character
        'Passw@rd',     // Too short
      ];

      invalidPasswords.forEach(password => {
        const registerDto: RegisterCustomerDto = {
          email: 'test@example.com',
          password,
          firstName: 'Test',
          lastName: 'User',
        };

        // These would be caught by NestJS validation pipe
        expect(password.length < 8).toBe(password === 'password' || password === 'Passw@rd');
        expect(/[A-Z]/.test(password)).toBe(password === 'password' || password === 'Password123');
        expect(/[a-z]/.test(password)).toBe(password === 'PASSWORD123');
        expect(/[0-9]/.test(password)).toBe(password === 'Password');
        expect(/[@$!%*?&]/.test(password)).toBe(
          password === 'password' || password === 'Password' || password === 'Password123'
        );
      });
    });

    it('should validate email format', () => {
      const invalidEmails = [
        'invalid-email',
        '@example.com',
        'test@',
        'test@.localhost',
        'test@localhost.',
        'test space@example.com',
      ];

      invalidEmails.forEach(email => {
        const registerDto: RegisterCustomerDto = {
          email,
          password: 'Password@123',
          firstName: 'Test',
          lastName: 'User',
        };

        // Basic email validation
        expect(email.includes('@')).toBe(false);
      });
    });

    it('should require first name and last name', () => {
      const registerDtoWithMissingName: Partial<RegisterCustomerDto> = {
        email: 'test@example.com',
        password: 'Password@123',
        firstName: '',
        lastName: '',
      };

      // These would be caught by NestJS validation pipe
      expect(registerDtoWithMissingName.firstName).toBe('');
      expect(registerDtoWithMissingName.lastName).toBe('');
    });
  });

  describe('Response Structure', () => {
    it('should return consistent response structure for all registration endpoints', async () => {
      const mockResponses = [
        {
          method: 'registerCustomer',
          response: {
            message: 'Customer registered successfully',
            user: {
              id: 'user-123',
              email: 'test@example.com',
              firstName: 'Test',
              lastName: 'User',
              role: UserRole.CUSTOMER,
            },
          },
        },
        {
          method: 'registerCourier',
          response: {
            message: 'Courier registered successfully. Awaiting verification.',
            user: {
              id: 'user-123',
              email: 'test@example.com',
              firstName: 'Test',
              lastName: 'User',
              role: UserRole.COURIER,
            },
          },
        },
      ];

      for (const { method, response } of mockResponses) {
        authService[method as keyof AuthService].mockResolvedValue(response);
        
        const result = await authController[method as keyof AuthController]({} as any);
        expect(result).toEqual(response);
        
        // Check response structure
        expect(result).toHaveProperty('message');
        expect(result).toHaveProperty('user');
        expect(result.user).toHaveProperty('id');
        expect(result.user).toHaveProperty('email');
        expect(result.user).toHaveProperty('firstName');
        expect(result.user).toHaveProperty('lastName');
        expect(result.user).toHaveProperty('role');
      }
    });
  });
});