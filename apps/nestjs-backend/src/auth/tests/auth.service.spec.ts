import { Test, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../auth.service';
import { UsersService } from '../../users/users.service';
import { UserRole, UserStatus } from '../../user-role.enum';
import { RegisterCustomerDto } from '../dto';

// Mock UsersService
const mockUsersService = {
  findByEmail: jest.fn(),
  createCustomer: jest.fn(),
  createCourier: jest.fn(),
  createRestaurantAdmin: jest.fn(),
  createAffiliate: jest.fn(),
  createAdmin: jest.fn(),
  updateLastLogin: jest.fn(),
  validatePassword: jest.fn(),
};

// Mock JwtService
const mockJwtService = {
  sign: jest.fn(),
};

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: jest.Mocked<UsersService>;
  let jwtService: jest.Mocked<JwtService>;

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
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>();
    usersService = module.get(UsersService) as jest.Mocked<UsersService>;
    jwtService = module.get(JwtService) as jest.Mocked<JwtService>;

    jest.clearAllMocks();
  });

  describe('login', () => {
    const mockUser = {
      id: 'user-123',
      email: 'test@example.com',
      password: 'hashedpassword',
      firstName: 'John',
      lastName: 'Doe',
      role: UserRole.CUSTOMER,
      status: UserStatus.ACTIVE,
    };

    const loginDto = {
      email: 'test@example.com',
      password: 'password123',
    };

    it('should return access token and user data on successful login', async () => {
      usersService.findByEmail.mockResolvedValue(mockUser);
      usersService.validatePassword.mockResolvedValue(true);
      jwtService.sign.mockReturnValue('jwt-token');

      const result = await authService.login(loginDto);

      expect(usersService.findByEmail).toHaveBeenCalledWith(loginDto.email);
      expect(usersService.validatePassword).toHaveBeenCalledWith(
        loginDto.password,
        mockUser.password
      );
      expect(jwtService.sign).toHaveBeenCalledWith({
        sub: mockUser.id,
        email: mockUser.email,
        role: mockUser.role,
        firstName: mockUser.firstName,
        lastName: mockUser.lastName,
        status: mockUser.status,
      });
      expect(usersService.updateLastLogin).toHaveBeenCalledWith(mockUser.id);

      expect(result).toEqual({
        access_token: 'jwt-token',
        user: {
          id: mockUser.id,
          email: mockUser.email,
          firstName: mockUser.firstName,
          lastName: mockUser.lastName,
          role: mockUser.role,
          status: mockUser.status,
        },
      });
    });

    it('should throw UnauthorizedException when user does not exist', async () => {
      usersService.findByEmail.mockResolvedValue(null);

      await expect(authService.login(loginDto)).rejects.toThrow(
        'Invalid credentials'
      );
    });

    it('should throw UnauthorizedException when password is invalid', async () => {
      usersService.findByEmail.mockResolvedValue(mockUser);
      usersService.validatePassword.mockResolvedValue(false);

      await expect(authService.login(loginDto)).rejects.toThrow(
        'Invalid credentials'
      );
    });

    it('should throw UnauthorizedException when user account is not active', async () => {
      const inactiveUser = {
        ...mockUser,
        status: UserStatus.INACTIVE,
      };
      usersService.findByEmail.mockResolvedValue(inactiveUser);
      usersService.validatePassword.mockResolvedValue(true);

      await expect(authService.login(loginDto)).rejects.toThrow(
        'Account is not active'
      );
    });
  });

  describe('registerCustomer', () => {
    const registerDto: RegisterCustomerDto = {
      email: 'customer@test.com',
      password: 'Password@123',
      firstName: 'Jane',
      lastName: 'Smith',
      phone: '+1234567890',
    };

    const mockCreatedUser = {
      id: 'new-user-123',
      email: registerDto.email,
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      role: UserRole.CUSTOMER,
      status: UserStatus.ACTIVE,
    };

    it('should register a new customer successfully', async () => {
      usersService.findByEmail.mockResolvedValue(null);
      usersService.createCustomer.mockResolvedValue(mockCreatedUser);

      const result = await authService.registerCustomer(registerDto);

      expect(usersService.findByEmail).toHaveBeenCalledWith(registerDto.email);
      expect(usersService.createCustomer).toHaveBeenCalledWith(registerDto);

      expect(result).toEqual({
        message: 'Customer registered successfully',
        user: {
          id: mockCreatedUser.id,
          email: mockCreatedUser.email,
          firstName: mockCreatedUser.firstName,
          lastName: mockCreatedUser.lastName,
          role: mockCreatedUser.role,
        },
      });
    });

    it('should throw ConflictException when user already exists', async () => {
      usersService.findByEmail.mockResolvedValue(mockUser);

      await expect(authService.registerCustomer(registerDto)).rejects.toThrow(
        'User with this email already exists'
      );
    });
  });

  describe('registerCourier', () => {
    const registerDto = {
      email: 'courier@test.com',
      password: 'Password@123',
      firstName: 'Mike',
      lastName: 'Wilson',
      phone: '+1234567891',
      vehicleType: 'motorcycle',
      vehicleNumber: 'COURIER-001',
    };

    const mockCreatedUser = {
      id: 'courier-user-123',
      email: registerDto.email,
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      role: UserRole.COURIER,
      status: UserStatus.PENDING_VERIFICATION,
    };

    it('should register a new courier successfully', async () => {
      usersService.findByEmail.mockResolvedValue(null);
      usersService.createCourier.mockResolvedValue(mockCreatedUser);

      const result = await authService.registerCourier(registerDto);

      expect(usersService.findByEmail).toHaveBeenCalledWith(registerDto.email);
      expect(usersService.createCourier).toHaveBeenCalledWith(registerDto);

      expect(result).toEqual({
        message: 'Courier registered successfully. Awaiting verification.',
        user: {
          id: mockCreatedUser.id,
          email: mockCreatedUser.email,
          firstName: mockCreatedUser.firstName,
          lastName: mockCreatedUser.lastName,
          role: mockCreatedUser.role,
        },
      });
    });

    it('should throw ConflictException when user already exists', async () => {
      usersService.findByEmail.mockResolvedValue(mockUser);

      await expect(authService.registerCourier(registerDto)).rejects.toThrow(
        'User with this email already exists'
      );
    });
  });

  describe('registerRestaurantAdmin', () => {
    const registerDto = {
      email: 'restaurant@test.com',
      password: 'Password@123',
      firstName: 'Sarah',
      lastName: 'Johnson',
      phone: '+1234567892',
      restaurantId: 'restaurant-001',
      position: 'Manager',
    };

    const mockCreatedUser = {
      id: 'restaurant-user-123',
      email: registerDto.email,
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      role: UserRole.RESTAURANT_ADMIN,
      status: UserStatus.PENDING_VERIFICATION,
    };

    it('should register a new restaurant admin successfully', async () => {
      usersService.findByEmail.mockResolvedValue(null);
      usersService.createRestaurantAdmin.mockResolvedValue(mockCreatedUser);

      const result = await authService.registerRestaurantAdmin(registerDto);

      expect(usersService.findByEmail).toHaveBeenCalledWith(registerDto.email);
      expect(usersService.createRestaurantAdmin).toHaveBeenCalledWith(registerDto);

      expect(result).toEqual({
        message: 'Restaurant admin registered successfully. Awaiting verification.',
        user: {
          id: mockCreatedUser.id,
          email: mockCreatedUser.email,
          firstName: mockCreatedUser.firstName,
          lastName: mockCreatedUser.lastName,
          role: mockCreatedUser.role,
        },
      });
    });

    it('should throw ConflictException when user already exists', async () => {
      usersService.findByEmail.mockResolvedValue(mockUser);

      await expect(authService.registerRestaurantAdmin(registerDto)).rejects.toThrow(
        'User with this email already exists'
      );
    });
  });

  describe('registerAffiliate', () => {
    const registerDto = {
      email: 'affiliate@test.com',
      password: 'Password@123',
      firstName: 'David',
      lastName: 'Brown',
      phone: '+1234567893',
    };

    const mockCreatedUser = {
      id: 'affiliate-user-123',
      email: registerDto.email,
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      role: UserRole.AFFILIATE,
      status: UserStatus.ACTIVE,
    };

    it('should register a new affiliate successfully', async () => {
      usersService.findByEmail.mockResolvedValue(null);
      usersService.createAffiliate.mockResolvedValue(mockCreatedUser);

      const result = await authService.registerAffiliate(registerDto);

      expect(usersService.findByEmail).toHaveBeenCalledWith(registerDto.email);
      expect(usersService.createAffiliate).toHaveBeenCalledWith(registerDto);

      expect(result).toEqual({
        message: 'Affiliate registered successfully',
        user: {
          id: mockCreatedUser.id,
          email: mockCreatedUser.email,
          firstName: mockCreatedUser.firstName,
          lastName: mockCreatedUser.lastName,
          role: mockCreatedUser.role,
        },
      });
    });

    it('should throw ConflictException when user already exists', async () => {
      usersService.findByEmail.mockResolvedValue(mockUser);

      await expect(authService.registerAffiliate(registerDto)).rejects.toThrow(
        'User with this email already exists'
      );
    });
  });

  describe('registerAdmin', () => {
    const registerDto = {
      email: 'admin@test.com',
      password: 'Admin@123',
      firstName: 'Super',
      lastName: 'Admin',
      phone: '+1234567899',
    };

    const mockCreatedUser = {
      id: 'admin-user-123',
      email: registerDto.email,
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      role: UserRole.ADMIN,
      status: UserStatus.ACTIVE,
    };

    it('should register a new admin successfully', async () => {
      usersService.findByEmail.mockResolvedValue(null);
      usersService.createAdmin.mockResolvedValue(mockCreatedUser);

      const result = await authService.registerAdmin(registerDto);

      expect(usersService.findByEmail).toHaveBeenCalledWith(registerDto.email);
      expect(usersService.createAdmin).toHaveBeenCalledWith(registerDto);

      expect(result).toEqual({
        message: 'Admin registered successfully',
        user: {
          id: mockCreatedUser.id,
          email: mockCreatedUser.email,
          firstName: mockCreatedUser.firstName,
          lastName: mockCreatedUser.lastName,
          role: mockCreatedUser.role,
        },
      });
    });

    it('should throw ConflictException when user already exists', async () => {
      usersService.findByEmail.mockResolvedValue(mockUser);

      await expect(authService.registerAdmin(registerDto)).rejects.toThrow(
        'User with this email already exists'
      );
    });
  });
});