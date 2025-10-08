import { Test, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { CustomerProfile } from '../../entities/customer-profile.entity';
import { UsersService } from '../../users/users.service';
import { UserRole, UserStatus } from '../../user-role.enum';
import { RegisterCustomerDto, RegisterCourierDto, RegisterRestaurantAdminDto, RegisterAffiliateDto, RegisterAdminDto } from '../../auth/dto';

describe('UsersService E2E Tests (Database Integration)', () => {
  let userRepository: Repository<User>;
  let customerProfileRepository: Repository<CustomerProfile>;
  let usersService: UsersService;

  beforeAll(async () => {
    // This would typically be set up in a test database
    // For this example, we'll assume it's configured correctly
  });

  beforeEach(async () => {
    // Clean up database before each test
    if (userRepository) {
      await userRepository.query('DELETE FROM customer_profiles');
      await userRepository.query('DELETE FROM users');
    }
  });

  describe('Complete User Registration Flow', () => {
    let createdUser: User;

    describe('Customer Registration E2E', () => {
      const customerData: RegisterCustomerDto = {
        email: 'e2e.customer@test.com',
        password: 'Password@123',
        firstName: 'E2ECustomer',
        lastName: 'TestUser',
        phone: '+1234567890',
      };

      it('should complete full customer registration flow', async () => {
        // 1. Register customer
        createdUser = await usersService.createCustomer(customerData);

        // 2. Verify user was created in database
        expect(createdUser).toBeDefined();
        expect(createdUser.id).toBeDefined();
        expect(createdUser.email).toBe(customerData.email);
        expect(createdUser.firstName).toBe(customerData.firstName);
        expect(createdUser.lastName).toBe(customerData.lastName);
        expect(createdUser.role).toBe(UserRole.CUSTOMER);
        expect(createdUser.status).toBe(UserStatus.ACTIVE);
        expect(createdUser.emailVerified).toBe(false);

        // 3. Verify customer profile was created
        expect(createdUser.customerProfile).toBeDefined();
        expect(createdUser.customerProfile.userId).toBe(createdUser.id);

        // 4. Verify user can be found by email
        const foundUser = await usersService.findByEmail(customerData.email);
        expect(foundUser).toBeDefined();
        expect(foundUser.id).toBe(createdUser.id);
        expect(foundUser.customerProfile).toBeDefined();

        // 5. Verify user can be found by ID
        const foundUserById = await usersService.findById(createdUser.id);
        expect(foundUserById).toBeDefined();
        expect(foundUserById.id).toBe(createdUser.id);

        // 6. Test password validation
        const isValidPassword = await usersService.validatePassword(
          customerData.password,
          createdUser.password
        );
        expect(isValidPassword).toBe(true);

        // 7. Test invalid password
        const isInvalidPassword = await usersService.validatePassword(
          'wrongpassword',
          createdUser.password
        );
        expect(isInvalidPassword).toBe(false);
      });

      it('should enforce unique email constraint', async () => {
        // First registration should succeed
        await usersService.createCustomer(customerData);

        // Second registration with same email should fail
        await expect(usersService.createCustomer(customerData))
          .rejects.toThrow('User with this email already exists');
      });

      it('should update user status correctly', async () => {
        const suspendedUser = await usersService.updateStatus(
          createdUser.id,
          UserStatus.SUSPENDED
        );

        expect(suspendedUser.status).toBe(UserStatus.SUSPENDED);

        // Reactivate user
        const activeUser = await usersService.updateStatus(
          suspendedUser.id,
          UserStatus.ACTIVE
        );

        expect(activeUser.status).toBe(UserStatus.ACTIVE);
      });

      it('should handle password change correctly', async () => {
        const newPassword = 'NewPassword@456';

        // Change password
        await usersService.changePassword(
          createdUser.id,
          customerData.password,
          newPassword
        );

        // Verify new password works
        const isValidWithNewPassword = await usersService.validatePassword(
          newPassword,
          createdUser.password
        );
        expect(isValidWithNewPassword).toBe(true);

        // Verify old password no longer works
        const isInvalidWithOldPassword = await usersService.validatePassword(
          customerData.password,
          createdUser.password
        );
        expect(isInvalidWithOldPassword).toBe(false);
      });
    });

    describe('Courier Registration E2E', () => {
      let createdCourier: User;

      const courierData: RegisterCourierDto = {
        email: 'e2e.courier@test.com',
        password: 'Courier@123',
        firstName: 'E2ECourier',
        lastName: 'TestUser',
        phone: '+1234567891',
        vehicleType: 'motorcycle',
        vehicleNumber: 'COURIER-E2E',
      };

      it('should complete full courier registration flow with pending verification', async () => {
        // 1. Register courier
        createdCourier = await usersService.createCourier(courierData);

        // 2. Verify courier was created with correct initial status
        expect(createdCourier.role).toBe(UserRole.COURIER);
        expect(createdCourier.status).toBe(UserStatus.PENDING_VERIFICATION);

        // 3. Verify courier profile was created
        expect(createdCourier.courierProfile).toBeDefined();
        expect(createdCourier.courierProfile.vehicleType).toBe(courierData.vehicleType);
        expect(createdCourier.courierProfile.vehicleNumber).toBe(courierData.vehicleNumber);
        expect(createdCourier.courierProfile.isOnline).toBe(false);

        // 4. Test finding courier by email
        const foundCourier = await usersService.findByEmail(courierData.email);
        expect(foundCourier).toBeDefined();
        expect(foundCourier.role).toBe(UserRole.COURIER);
      });
    });

    describe('Restaurant Admin Registration E2E', () => {
      let createdRestaurantAdmin: User;

      const restaurantAdminData: RegisterRestaurantAdminDto = {
        email: 'e2e.restaurant@test.com',
        password: 'Restaurant@123',
        firstName: 'E2ERestaurant',
        lastName: 'TestUser',
        phone: '+1234567892',
        restaurantId: 'restaurant-e2e-001',
        position: 'Manager',
      };

      it('should complete full restaurant admin registration flow', async () => {
        // 1. Register restaurant admin
        createdRestaurantAdmin = await usersService.createRestaurantAdmin(restaurantAdminData);

        // 2. Verify restaurant admin profile
        expect(createdRestaurantAdmin.role).toBe(UserRole.RESTAURANT_ADMIN);
        expect(createdRestaurantAdmin.status).toBe(UserStatus.PENDING_VERIFICATION);

        // 3. Verify profile data
        expect(createdRestaurantAdmin.restaurantAdminProfile).toBeDefined();
        expect(createdRestaurantAdmin.restaurantAdminProfile.restaurantId)
          .toBe(restaurantAdminData.restaurantId);
        expect(createdRestaurantAdmin.restaurantAdminProfile.position)
          .toBe(restaurantAdminData.position);
      });
    });

    describe('Affiliate Registration E2E', () => {
      let createdAffiliate: User;

      const affiliateData: RegisterAffiliateDto = {
        email: 'e2e.affiliate@test.com',
        password: 'Affiliate@123',
        firstName: 'E2EAffiliate',
        lastName: 'TestUser',
        phone: '+1234567893',
      };

      it('should complete full affiliate registration flow', async () => {
        // 1. Register affiliate
        createdAffiliate = await usersService.createAffiliate(affiliateData);

        // 2. Verify affiliate profile
        expect(createdAffiliate.role).toBe(UserRole.AFFILIATE);
        expect(createdAffiliate.status).toBe(UserStatus.ACTIVE);

        // 3. Verify affiliate profile data
        expect(createdAffiliate.affiliateProfile).toBeDefined();
        expect(createdAffiliate.affiliateProfile.affiliateCode).toBeDefined();
        expect(createdAffiliate.affiliateProfile.commissionRate).toBe(5.00);
      });
    });

    describe('Admin Registration E2E', () => {
      let createdAdmin: User;

      const adminData: RegisterAdminDto = {
        email: 'e2e.admin@test.com',
        password: 'Admin@123',
        firstName: 'E2EAdmin',
        lastName: 'TestUser',
        phone: '+1234567899',
      };

      it('should complete full admin registration flow', async () => {
        // 1. Register admin
        createdAdmin = await usersService.createAdmin(adminData);

        // 2. Verify admin profile
        expect(createdAdmin.role).toBe(UserRole.ADMIN);
        expect(createdAdmin.status).toBe(UserStatus.ACTIVE);
        expect(createdAdmin.emailVerified).toBe(true); // Admins are pre-verified
      });
    });

    describe('Cross-Role Data Integrity E2E', () => {
      it('should maintain data integrity across all user roles', async () => {
        const roles = [
          {
            data: customerData,
            createFn: (dto: RegisterCustomerDto) => usersService.createCustomer(dto),
            expectedRole: UserRole.CUSTOMER,
            expectedStatus: UserStatus.ACTIVE,
          },
          {
            data: {
              email: 'cross.courier@test.com',
              password: 'Password@123',
              firstName: 'Cross',
              lastName: 'Courier',
              phone: '+1234567890',
              vehicleType: 'car',
              vehicleNumber: 'CROSS-COURIER',
            },
            createFn: (dto: any) => usersService.createCourier(dto),
            expectedRole: UserRole.COURIER,
            expectedStatus: UserStatus.PENDING_VERIFICATION,
          },
          {
            data: {
              email: 'cross.restaurant@test.com',
              password: 'Password@123',
              firstName: 'Cross',
              lastName: 'Restaurant',
              phone: '+1234567891',
              restaurantId: 'cross-restaurant',
              position: 'Cross Manager',
            },
            createFn: (dto: any) => usersService.createRestaurantAdmin(dto),
            expectedRole: UserRole.RESTAURANT_ADMIN,
            expectedStatus: UserStatus.PENDING_VERIFICATION,
          },
          {
            data: {
              email: 'cross.affiliate@test.com',
              password: 'Password@123',
              firstName: 'Cross',
              lastName: 'Affiliate',
              phone: '+1234567892',
            },
            createFn: (dto: any) => usersService.createAffiliate(dto),
            expectedRole: UserRole.AFFILIATE,
            expectedStatus: UserStatus.ACTIVE,
          },
          {
            data: {
              email: 'cross.admin@test.com',
              password: 'Admin@123',
              firstName: 'Cross',
              lastName: 'Admin',
              phone: '+1234567899',
            },
            createFn: (dto: any) => usersService.createAdmin(dto),
            expectedRole: UserRole.ADMIN,
            expectedStatus: UserStatus.ACTIVE,
          },
        ];

        const createdUsers: User[] = [];

        for (const role of roles) {
          const user = await role.createFn(role.data as any);
          expect(user.role).toBe(role.expectedRole);
          expect(user.status).toBe(role.expectedStatus);
          
          // Verify profile was created
          if (role.expectedRole === UserRole.CUSTOMER) {
            expect(user.customerProfile).toBeDefined();
          } else if (role.expectedRole === UserRole.COURIER) {
            expect(user.courierProfile).toBeDefined();
          } else if (role.expectedRole === UserRole.RESTAURANT_ADMIN) {
            expect(user.restaurantAdminProfile).toBeDefined();
          } else if (role.expectedRole === UserRole.AFFILIATE) {
            expect(user.affiliateProfile).toBeDefined();
          }
          
          createdUsers.push(user);
        }

        // Verify all users can be found by email
        for (const user of createdUsers) {
          const foundUser = await usersService.findByEmail(user.email);
          expect(foundUser).toBeDefined();
          expect(foundUser.id).toBe(user.id);
        }

        // Verify email uniqueness across all roles
        const uniqueEmails = new Set(createdUsers.map(u => u.email));
        expect(uniqueEmails.size).toBe(createdUsers.length);
      });
    });
  });

  describe('Performance and Scalability E2E', () => {
    it('should handle multiple concurrent user registrations', async () => {
      const registrationPromises = [];
      const userCount = 10;

      for (let i = 0; i < userCount; i++) {
        const customerData: RegisterCustomerDto = {
          email: `performance${i}@test.com`,
          password: 'Password@123',
          firstName: `Performance${i}`,
          lastName: 'User',
          phone: `+123456789${i}`,
        };

        registrationPromises.push(usersService.createCustomer(customerData));
      }

      const createdUsers = await Promise.all(registrationPromises);

      expect(createdUsers).toHaveLength(userCount);
      createdUsers.forEach(user => {
        expect(user).toBeDefined();
        expect(user.customerProfile).toBeDefined();
      });

      // Verify all users were created correctly
      for (const userData of registrationPromises) {
        const user = await userData;
        const foundUser = await usersService.findByEmail((await userData).email);
        expect(foundUser).toBeDefined();
      }
    });

    it('should maintain database consistency under load', async () => {
      const operations = [];
      const operationCount = 20;

      // Mix of different operations
      for (let i = 0; i < operationCount; i++) {
        const customerData: RegisterCustomerDto = {
          email: `load${i}@test.com`,
          password: 'Password@123',
          firstName: `Load${i}`,
          lastName: 'User',
          phone: `+123456789${i}`,
        };

        // Mix of create, find, update operations
        if (i % 3 === 0) {
          // Create
          operations.push(usersService.createCustomer(customerData));
        } else if (i % 3 === 1) {
          // Find by email
          operations.push(usersService.findByEmail(`existing${i}@test.com`));
        } else {
          // Update status (simulate)
          operations.push(
            usersService.findByEmail(`existing${i}@test.com`)
              .then(user => {
                if (user) {
                  return usersService.updateStatus(user.id, UserStatus.ACTIVE);
                }
              })
          );
        }
      }

      const results = await Promise.allSettled(operations);

      // Check for any failures
      const failures = results.filter(r => r.status === 'rejected');
      if (failures.length > 0) {
        console.warn('Some operations failed:', failures);
      }

      // At least 90% should succeed
      const successRate = (operations.length - failures.length) / operations.length;
      expect(successRate).toBeGreaterThan(0.9);
    });
  });

  describe('Error Handling and Edge Cases E2E', () => {
    it('should handle very long user names and emails', async () => {
      const longNameCustomerData: RegisterCustomerDto = {
        email: 'very-long-email-address-that-might-be-used-by-customers-with-long-names@example.com',
        password: 'Password@123',
        firstName: 'VeryLongFirstNameThatMightExceedNormalLimits',
        lastName: 'VeryLongLastNameThatMightAlsoExceedNormalLimitsForTesting',
        phone: '+12345678901234567890',
      };

      const createdUser = await usersService.createCustomer(longNameCustomerData);

      expect(createdUser).toBeDefined();
      expect(createdUser.email).toBe(longNameCustomerData.email);
      expect(createdUser.firstName).toBe(longNameCustomerData.firstName);
      expect(createdUser.lastName).toBe(longNameCustomerData.lastName);
      expect(createdUser.phone).toBe(longNameCustomerData.phone);
    });

    it('should handle special characters in user data', async () => {
      const specialCharCustomerData: RegisterCustomerDto = {
        email: 'special+chars@example.com',
        password: 'Password@123',
        firstName: 'Åßéáíñ',
        lastName: 'Smith-Jones',
        phone: '+1 (555) 123-456',
      };

      const createdUser = await usersService.createCustomer(specialCharCustomerData);

      expect(createdUser).toBeDefined();
      expect(createdUser.email).toBe(specialCharCustomerData.email);
      expect(createdUser.firstName).toBe(specialCharCustomerData.firstName);
      expect(createdUser.lastName).toBe(specialCharCustomerData.lastName);
      expect(createdUser.phone).toBe(specialCharCustomerData.phone);
    });

    it('should handle edge case phone numbers', async () => {
      const edgePhoneCustomerData: RegisterCustomerDto = {
        email: 'edge.phone@test.com',
        password: 'Password@123',
        firstName: 'Edge',
        lastName: 'Phone',
        phone: '',
      };

      const createdUser = await usersService.createCustomer(edgePhoneCustomerData);

      expect(createdUser).toBeDefined();
      expect(createdUser.phone).toBe('');
    });
  });
});