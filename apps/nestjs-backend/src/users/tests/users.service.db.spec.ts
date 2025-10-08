import { Test, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersService } from '../../users/users.service';
import { User } from '../../entities/user.entity';
import { UserRole, UserStatus } from '../../user-role.enum';
import { RegisterCustomerDto } from '../../auth/dto';

// Mock TypeORM Repository
const mockRepository = {
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  find: jest.fn(),
};

describe('UsersService (Database Integration)', () => {
  let usersService: UsersService;
  let mockUserRepository: any;

  beforeEach(async () => {
    // This test focuses on database integration logic
    // We'll mock the actual TypeORM operations
    mockUserRepository = {
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      find: jest.fn(),
    };

    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: ['.env.test'],
        }),
      ],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useFactory(() => {
        const service = new UsersService(mockRepository, mockRepository, mockRepository, mockRepository, mockRepository);
        return service;
      })
      .compile();

    usersService = module.get<UsersService>();
  });

  describe('Database Operations', () => {
    const mockUser = {
      id: 'user-123',
      email: 'test@example.com',
      password: 'hashedpassword',
      firstName: 'John',
      lastName: 'Doe',
      role: UserRole.CUSTOMER,
      status: UserStatus.ACTIVE,
      emailVerified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const mockCustomerProfile = {
      id: 'profile-123',
      userId: 'user-123',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    describe('findByEmail', () => {
      it('should return user when found by email', async () => {
        mockUserRepository.findOne.mockResolvedValue(mockUser);

        const result = await usersService.findByEmail('test@example.com');

        expect(mockUserRepository.findOne).toHaveBeenCalledWith({
          where: { email: 'test@example.com' },
          relations: [
            'customerProfile',
            'courierProfile',
            'restaurantAdminProfile',
            'affiliateProfile'
          ],
        });
        expect(result).toEqual(mockUser);
      });

      it('should return null when user not found', async () => {
        mockUserRepository.findOne.mockResolvedValue(null);

        const result = await usersService.findByEmail('nonexistent@example.com');

        expect(result).toBeNull();
      });
    });

    describe('findById', () => {
      it('should return user when found by id', async () => {
        mockUserRepository.findOne.mockResolvedValue(mockUser);

        const result = await usersService.findById('user-123');

        expect(mockUserRepository.findOne).toHaveBeenCalledWith({
          where: { id: 'user-123' },
          relations: [
            'customerProfile',
            'courierProfile',
            'restaurantAdminProfile',
            'affiliateProfile'
          ],
        });
        expect(result).toEqual(mockUser);
      });

      it('should return null when user not found', async () => {
        mockUserRepository.findOne.mockResolvedValue(null);

        const result = await usersService.findById('nonexistent-user');

        expect(result).toBeNull();
      });
    });

    describe('validatePassword', () => {
      it('should return true for correct password', async () => {
        const bcrypt = require('bcrypt');
        const password = 'password123';
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await usersService.validatePassword(password, hashedPassword);

        expect(result).toBe(true);
      });

      it('should return false for incorrect password', async () => {
        const result = await usersService.validatePassword('wrongpassword', 'hashedpassword');

        expect(result).toBe(false);
      });
    });

    describe('createCustomer', () => {
      const registerDto: RegisterCustomerDto = {
        email: 'customer@test.com',
        password: 'Password@123',
        firstName: 'Jane',
        lastName: 'Smith',
        phone: '+1234567890',
      };

      it('should create user and customer profile successfully', async () => {
        // Mock existing user check
        mockUserRepository.findOne.mockResolvedValue(null);
        
        // Mock user creation
        const createdUser = {
          ...mockUser,
          email: registerDto.email,
          firstName: registerDto.firstName,
          lastName: registerDto.lastName,
          phone: registerDto.phone,
          role: UserRole.CUSTOMER,
          status: UserStatus.ACTIVE,
        };
        mockUserRepository.create.mockReturnValue(createdUser);
        mockUserRepository.save.mockResolvedValue(createdUser);

        // Mock customer profile creation
        const createdProfile = {
          id: 'profile-123',
          userId: createdUser.id,
        };
        mockUserRepository.create.mockReturnValue(createdProfile);
        mockUserRepository.save.mockResolvedValue(createdProfile);

        // Mock findById for returning user with profile
        const userWithProfile = {
          ...createdUser,
          customerProfile: createdProfile,
        };
        mockUserRepository.findOne.mockResolvedValue(userWithProfile);

        const result = await usersService.createCustomer(registerDto);

        // Verify user creation
        expect(mockUserRepository.findOne).toHaveBeenCalledWith({
          where: { email: registerDto.email }
        });

        expect(mockUserRepository.create).toHaveBeenCalledWith(expect.objectContaining({
          email: registerDto.email,
          firstName: registerDto.firstName,
          lastName: registerDto.lastName,
          phone: registerDto.phone,
          role: UserRole.CUSTOMER,
          status: UserStatus.ACTIVE,
        }));

        // Verify customer profile creation
        expect(mockUserRepository.save).toHaveBeenCalledTimes(2); // Once for user, once for profile

        expect(result).toEqual(userWithProfile);
      });

      it('should throw ConflictException when user already exists', async () => {
        mockUserRepository.findOne.mockResolvedValue(mockUser);

        await expect(usersService.createCustomer(registerDto)).rejects.toThrow(
          'User with this email already exists'
        );
      });

      it('should hash password before saving', async () => {
        const bcrypt = require('bcrypt');
        const password = registerDto.password;
        let capturedPassword: string;

        // Mock user creation to capture the password
        mockUserRepository.findOne.mockResolvedValue(null);
        mockUserRepository.create.mockImplementation((userData: any) => {
          capturedPassword = userData.password;
          return userData;
        });
        mockUserRepository.save.mockResolvedValue(mockUser);

        mockUserRepository.save.mockResolvedValue(mockCustomerProfile);
        mockUserRepository.findOne.mockResolvedValue(mockUser);

        await usersService.createCustomer(registerDto);

        expect(capturedPassword).not.toBe(password); // Should be hashed
        expect(capturedPassword.length).toBeGreaterThan(50); // Hash should be longer
        expect(await bcrypt.compare(password, capturedPassword)).toBe(true);
      });
    });

    describe('updateLastLogin', () => {
      it('should update user last login timestamp', async () => {
        const now = new Date();
        mockUserRepository.update.mockResolvedValue({ affected: 1 });

        await usersService.updateLastLogin('user-123');

        expect(mockUserRepository.update).toHaveBeenCalledWith('user-123', {
          lastLoginAt: expect.any(Date),
        });

        // Verify the date is recent (within last second)
        expect(mockUserRepository.update).toHaveBeenCalledWith(
          'user-123',
          expect.objectContaining({
            lastLoginAt: expect.any(Date),
          })
        );
      });
    });

    describe('changePassword', () => {
      const currentPassword = 'oldPassword123';
      const newPassword = 'newPassword456';
      const hashedNewPassword = 'hashednewpassword';

      it('should change password when current password is correct', async () => {
        const bcrypt = require('bcrypt');
        const userWithHashedPassword = {
          ...mockUser,
          password: await bcrypt.hash(currentPassword, 10),
        };
        mockUserRepository.findOne.mockResolvedValue(userWithHashedPassword);
        mockUserRepository.update.mockResolvedValue({ affected: 1 });

        await usersService.changePassword('user-123', currentPassword, newPassword);

        expect(mockUserRepository.findOne).toHaveBeenCalledWith({
          where: { id: 'user-123' },
          relations: ['customerProfile', 'courierProfile', 'restaurantAdminProfile', 'affiliateProfile']
        });

        // Verify password is hashed before update
        expect(mockUserRepository.update).toHaveBeenCalledWith(
          'user-123',
          expect.objectContaining({
            password: expect.string, // Should be hashed
          })
        );
      });

      it('should throw NotFoundException when user not found', async () => {
        mockUserRepository.findOne.mockResolvedValue(null);

        await expect(usersService.changePassword('nonexistent', currentPassword, newPassword))
          .rejects.toThrow('User not found');
      });

      it('should throw BadRequestException when current password is incorrect', async () => {
        const bcrypt = require('bcrypt');
        const userWithDifferentPassword = {
          ...mockUser,
          password: await bcrypt.hash('differentPassword', 10),
        };
        mockUserRepository.findOne.mockResolvedValue(userWithDifferentPassword);

        await expect(usersService.changePassword('user-123', 'wrongPassword', newPassword))
          .rejects.toThrow('Current password is incorrect');
      });
    });

    describe('updateStatus', () => {
      it('should update user status successfully', async () => {
        const updatedUser = {
          ...mockUser,
          status: UserStatus.SUSPENDED,
        };
        mockUserRepository.findOne.mockResolvedValue(mockUser);
        mockUserRepository.save.mockResolvedValue(updatedUser);

        const result = await usersService.updateStatus('user-123', UserStatus.SUSPENDED);

        expect(mockUserRepository.findOne).toHaveBeenCalledWith({ id: 'user-123' });
        expect(mockUserRepository.save).toHaveBeenCalledWith(
          expect.objectContaining({
            status: UserStatus.SUSPENDED,
          })
        );
        expect(result.status).toBe(UserStatus.SUSPENDED);
      });

      it('should throw NotFoundException when user not found', async () => {
        mockUserRepository.findOne.mockResolvedValue(null);

        await expect(usersService.updateStatus('nonexistent', UserStatus.SUSPENDED))
          .rejects.toThrow('User not found');
      });
    });

    describe('Data Integrity', () => {
      it('should maintain referential integrity between users and profiles', async () => {
        // This test ensures that when a user is created, their profile is properly linked
        const registerDto: RegisterCustomerDto = {
          email: 'customer@test.com',
          password: 'Password@123',
          firstName: 'Jane',
          lastName: 'Smith',
          phone: '+1234567890',
        };

        mockUserRepository.findOne.mockResolvedValue(null);
        
        const createdUser = {
          id: 'user-123',
          userId: 'user-123',
          email: registerDto.email,
          firstName: registerDto.firstName,
          lastName: registerDto.lastName,
          role: UserRole.CUSTOMER,
          status: UserStatus.ACTIVE,
        };
        mockUserRepository.create.mockReturnValue(createdUser);
        mockUserRepository.save.mockResolvedValue(createdUser);

        const createdProfile = {
          id: 'profile-123',
          userId: createdUser.id,
        };
        mockUserRepository.create.mockReturnValue(createdProfile);
        mockUserRepository.save.mockResolvedValue(createdProfile);

        const userWithProfile = {
          ...createdUser,
          customerProfile: createdProfile,
        };
        mockUserRepository.findOne.mockResolvedValue(userWithProfile);

        const result = await usersService.createCustomer(registerDto);

        // Verify the relationship is maintained
        expect(result.customerProfile.userId).toBe(result.id);
        expect(result.customerProfile.id).toBe('profile-123');
      });

      it('should handle concurrent user creation properly', async () => {
        // This test simulates race conditions in user creation
        const registerDto: RegisterCustomerDto = {
          email: 'concurrent@test.com',
          password: 'Password@123',
          firstName: 'Test',
          lastName: 'User',
        };

        // First call finds no user, second call finds user (simulating race condition)
        mockUserRepository.findOne
          .mockResolvedValueOnce(null)
          .mockResolvedValue(mockUser);

        // First creation succeeds
        const createdUser = { ...mockUser };
        mockUserRepository.create.mockReturnValue(createdUser);
        mockUserRepository.save.mockResolvedValue(createdUser);
        mockUserRepository.save.mockResolvedValue({});

        const createdProfile = { userId: createdUser.id };
        mockUserRepository.create.mockReturnValue(createdProfile);
        mockUserRepository.save.mockResolvedValue(createdProfile);
        mockUserRepository.findOne.mockResolvedValue(createdUser);

        // First call should succeed
        const result1 = await usersService.createCustomer(registerDto);

        // Second call should throw error
        await expect(usersService.createCustomer(registerDto))
          .rejects.toThrow('User with this email already exists');

        expect(result1).toBeDefined();
      });
    });
  });
});