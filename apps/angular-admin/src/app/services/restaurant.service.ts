import { Injectable, signal } from '@angular/core';
import {
  Restaurant,
  CreateRestaurantRequest,
  UpdateRestaurantRequest,
  RestaurantFilters,
  RestaurantListResponse,
  RestaurantStatus,
  VerificationStatus,
  VerificationAction,
  DocumentVerificationAction,
  DocumentVerificationStatus,
  CuisineType,
  RestaurantFeature,
  DocumentType,
} from '../types/restaurant.types';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  private restaurants = signal<Restaurant[]>([]);
  private loading = signal(false);

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData() {
    const mockRestaurants: Restaurant[] = [
      {
        id: '1',
        name: "Mama's Italian Kitchen",
        description:
          'Authentic Italian cuisine with family recipes passed down through generations',
        email: 'info@mamasitalian.com',
        phone: '+1-555-0201',
        ownerId: '2',
        ownerName: 'Jane Smith',
        address: {
          street: '123 Little Italy St',
          city: 'New York',
          state: 'NY',
          zipCode: '10013',
          country: 'USA',
          latitude: 40.7128,
          longitude: -74.006,
          deliveryRadius: 5,
        },
        cuisine: ['italian', 'pizza'],
        status: 'active',
        verificationStatus: 'verified',
        rating: 4.6,
        totalReviews: 234,
        priceRange: '$$',
        openingHours: {
          monday: { isOpen: true, openTime: '11:00', closeTime: '22:00' },
          tuesday: { isOpen: true, openTime: '11:00', closeTime: '22:00' },
          wednesday: { isOpen: true, openTime: '11:00', closeTime: '22:00' },
          thursday: { isOpen: true, openTime: '11:00', closeTime: '22:00' },
          friday: { isOpen: true, openTime: '11:00', closeTime: '23:00' },
          saturday: { isOpen: true, openTime: '11:00', closeTime: '23:00' },
          sunday: { isOpen: true, openTime: '12:00', closeTime: '21:00' },
        },
        features: ['delivery', 'pickup', 'dine_in', 'wifi', 'accepts_cards'],
        images: [
          {
            id: '1',
            url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400',
            type: 'cover',
            isPrimary: true,
          },
        ],
        documents: [
          {
            id: '1',
            type: 'business_license',
            name: 'Business License',
            url: '/documents/business_license_1.pdf',
            uploadedAt: new Date('2024-01-15'),
            verificationStatus: 'approved',
          },
          {
            id: '2',
            type: 'food_safety_certificate',
            name: 'Food Safety Certificate',
            url: '/documents/food_safety_1.pdf',
            uploadedAt: new Date('2024-01-15'),
            verificationStatus: 'approved',
          },
        ],
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-03-20'),
        verifiedAt: new Date('2024-01-20'),
        lastActiveAt: new Date('2024-03-26'),
        metrics: {
          totalOrders: 1256,
          totalRevenue: 45680,
          averageOrderValue: 36.35,
          activeMenuItems: 24,
          completionRate: 96.5,
          averagePreparationTime: 18,
        },
      },
      {
        id: '2',
        name: 'Dragon Palace Chinese',
        description: 'Traditional Chinese dishes with modern presentation',
        email: 'orders@dragonpalace.com',
        phone: '+1-555-0202',
        ownerId: '5',
        ownerName: 'Chen Wei',
        address: {
          street: '456 Chinatown Ave',
          city: 'San Francisco',
          state: 'CA',
          zipCode: '94108',
          country: 'USA',
          latitude: 37.7749,
          longitude: -122.4194,
          deliveryRadius: 7,
        },
        cuisine: ['chinese'],
        status: 'active',
        verificationStatus: 'under_review',
        rating: 4.3,
        totalReviews: 189,
        priceRange: '$$',
        openingHours: {
          monday: { isOpen: true, openTime: '11:30', closeTime: '21:30' },
          tuesday: { isOpen: true, openTime: '11:30', closeTime: '21:30' },
          wednesday: { isOpen: true, openTime: '11:30', closeTime: '21:30' },
          thursday: { isOpen: true, openTime: '11:30', closeTime: '21:30' },
          friday: { isOpen: true, openTime: '11:30', closeTime: '22:00' },
          saturday: { isOpen: true, openTime: '11:30', closeTime: '22:00' },
          sunday: { isOpen: true, openTime: '12:00', closeTime: '21:00' },
        },
        features: ['delivery', 'pickup', 'accepts_cards', 'parking'],
        images: [
          {
            id: '2',
            url: 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=400',
            type: 'cover',
            isPrimary: true,
          },
        ],
        documents: [
          {
            id: '3',
            type: 'business_license',
            name: 'Business License',
            url: '/documents/business_license_2.pdf',
            uploadedAt: new Date('2024-02-01'),
            verificationStatus: 'pending',
          },
          {
            id: '4',
            type: 'food_safety_certificate',
            name: 'Food Safety Certificate',
            url: '/documents/food_safety_2.pdf',
            uploadedAt: new Date('2024-02-01'),
            verificationStatus: 'approved',
          },
        ],
        createdAt: new Date('2024-02-01'),
        updatedAt: new Date('2024-03-18'),
        lastActiveAt: new Date('2024-03-25'),
        metrics: {
          totalOrders: 892,
          totalRevenue: 28450,
          averageOrderValue: 31.9,
          activeMenuItems: 32,
          completionRate: 94.2,
          averagePreparationTime: 22,
        },
      },
      {
        id: '3',
        name: 'Burger Paradise',
        description: 'Gourmet burgers made with locally sourced ingredients',
        email: 'hello@burgerparadise.com',
        phone: '+1-555-0203',
        ownerId: '6',
        ownerName: 'Mike Johnson',
        address: {
          street: '789 Burger Blvd',
          city: 'Austin',
          state: 'TX',
          zipCode: '73301',
          country: 'USA',
          latitude: 30.2672,
          longitude: -97.7431,
          deliveryRadius: 10,
        },
        cuisine: ['american', 'burger'],
        status: 'temporarily_closed',
        verificationStatus: 'verified',
        rating: 4.1,
        totalReviews: 156,
        priceRange: '$$',
        openingHours: {
          monday: { isOpen: true, openTime: '11:00', closeTime: '22:00' },
          tuesday: { isOpen: true, openTime: '11:00', closeTime: '22:00' },
          wednesday: { isOpen: true, openTime: '11:00', closeTime: '22:00' },
          thursday: { isOpen: true, openTime: '11:00', closeTime: '22:00' },
          friday: { isOpen: true, openTime: '11:00', closeTime: '23:00' },
          saturday: { isOpen: true, openTime: '10:00', closeTime: '23:00' },
          sunday: { isOpen: true, openTime: '10:00', closeTime: '21:00' },
        },
        features: ['delivery', 'pickup', 'outdoor_seating', 'parking', 'wifi'],
        images: [
          {
            id: '3',
            url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
            type: 'cover',
            isPrimary: true,
          },
        ],
        documents: [
          {
            id: '5',
            type: 'business_license',
            name: 'Business License',
            url: '/documents/business_license_3.pdf',
            uploadedAt: new Date('2024-01-10'),
            verificationStatus: 'approved',
          },
        ],
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-03-15'),
        verifiedAt: new Date('2024-01-15'),
        lastActiveAt: new Date('2024-03-10'),
        metrics: {
          totalOrders: 567,
          totalRevenue: 18920,
          averageOrderValue: 33.4,
          activeMenuItems: 18,
          completionRate: 92.8,
          averagePreparationTime: 15,
        },
      },
      {
        id: '4',
        name: 'Sakura Sushi Bar',
        description: 'Fresh sushi and Japanese cuisine in an elegant atmosphere',
        email: 'reservations@sakurasushi.com',
        phone: '+1-555-0204',
        ownerId: '7',
        ownerName: 'Hiroshi Tanaka',
        address: {
          street: '321 Cherry Blossom St',
          city: 'Los Angeles',
          state: 'CA',
          zipCode: '90210',
          country: 'USA',
          latitude: 34.0522,
          longitude: -118.2437,
          deliveryRadius: 8,
        },
        cuisine: ['japanese', 'sushi'],
        status: 'active',
        verificationStatus: 'rejected',
        rating: 4.8,
        totalReviews: 312,
        priceRange: '$$$',
        openingHours: {
          monday: { isOpen: false },
          tuesday: { isOpen: true, openTime: '17:00', closeTime: '22:00' },
          wednesday: { isOpen: true, openTime: '17:00', closeTime: '22:00' },
          thursday: { isOpen: true, openTime: '17:00', closeTime: '22:00' },
          friday: { isOpen: true, openTime: '17:00', closeTime: '23:00' },
          saturday: { isOpen: true, openTime: '17:00', closeTime: '23:00' },
          sunday: { isOpen: true, openTime: '17:00', closeTime: '21:00' },
        },
        features: ['delivery', 'pickup', 'dine_in', 'alcohol_served', 'accepts_cards'],
        images: [
          {
            id: '4',
            url: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400',
            type: 'cover',
            isPrimary: true,
          },
        ],
        documents: [
          {
            id: '6',
            type: 'business_license',
            name: 'Business License',
            url: '/documents/business_license_4.pdf',
            uploadedAt: new Date('2024-02-20'),
            verificationStatus: 'rejected',
            rejectionReason: 'Document is expired. Please upload a current business license.',
          },
        ],
        createdAt: new Date('2024-02-20'),
        updatedAt: new Date('2024-03-22'),
        lastActiveAt: new Date('2024-03-24'),
        metrics: {
          totalOrders: 1045,
          totalRevenue: 67890,
          averageOrderValue: 64.95,
          activeMenuItems: 45,
          completionRate: 98.1,
          averagePreparationTime: 25,
        },
      },
      {
        id: '5',
        name: 'Green Garden Café',
        description: 'Healthy vegetarian and vegan options with organic ingredients',
        email: 'info@greengarden.com',
        phone: '+1-555-0205',
        ownerId: '8',
        ownerName: 'Emma Thompson',
        address: {
          street: '654 Organic Ave',
          city: 'Portland',
          state: 'OR',
          zipCode: '97201',
          country: 'USA',
          latitude: 45.5152,
          longitude: -122.6784,
          deliveryRadius: 6,
        },
        cuisine: ['vegetarian', 'vegan'],
        status: 'active',
        verificationStatus: 'additional_info_required',
        rating: 4.4,
        totalReviews: 98,
        priceRange: '$$',
        openingHours: {
          monday: { isOpen: true, openTime: '08:00', closeTime: '20:00' },
          tuesday: { isOpen: true, openTime: '08:00', closeTime: '20:00' },
          wednesday: { isOpen: true, openTime: '08:00', closeTime: '20:00' },
          thursday: { isOpen: true, openTime: '08:00', closeTime: '20:00' },
          friday: { isOpen: true, openTime: '08:00', closeTime: '20:00' },
          saturday: { isOpen: true, openTime: '09:00', closeTime: '20:00' },
          sunday: { isOpen: true, openTime: '09:00', closeTime: '19:00' },
        },
        features: [
          'delivery',
          'pickup',
          'dine_in',
          'wifi',
          'wheelchair_accessible',
          'outdoor_seating',
        ],
        images: [
          {
            id: '5',
            url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
            type: 'cover',
            isPrimary: true,
          },
        ],
        documents: [
          {
            id: '7',
            type: 'business_license',
            name: 'Business License',
            url: '/documents/business_license_5.pdf',
            uploadedAt: new Date('2024-03-01'),
            verificationStatus: 'approved',
          },
          {
            id: '8',
            type: 'food_safety_certificate',
            name: 'Food Safety Certificate',
            url: '/documents/food_safety_5.pdf',
            uploadedAt: new Date('2024-03-01'),
            verificationStatus: 'pending',
          },
        ],
        createdAt: new Date('2024-03-01'),
        updatedAt: new Date('2024-03-20'),
        lastActiveAt: new Date('2024-03-26'),
        metrics: {
          totalOrders: 234,
          totalRevenue: 8920,
          averageOrderValue: 38.12,
          activeMenuItems: 28,
          completionRate: 95.7,
          averagePreparationTime: 20,
        },
      },
    ];

    this.restaurants.set(mockRestaurants);
  }

  getRestaurants(
    filters?: RestaurantFilters,
    page = 1,
    limit = 10,
  ): Promise<RestaurantListResponse> {
    this.loading.set(true);

    return new Promise((resolve) => {
      setTimeout(() => {
        let filteredRestaurants = [...this.restaurants()];

        if (filters?.status) {
          filteredRestaurants = filteredRestaurants.filter(
            (restaurant) => restaurant.status === filters.status,
          );
        }

        if (filters?.verificationStatus) {
          filteredRestaurants = filteredRestaurants.filter(
            (restaurant) => restaurant.verificationStatus === filters.verificationStatus,
          );
        }

        if (filters?.cuisine) {
          filteredRestaurants = filteredRestaurants.filter((restaurant) =>
            restaurant.cuisine.includes(filters.cuisine!),
          );
        }

        if (filters?.priceRange) {
          filteredRestaurants = filteredRestaurants.filter(
            (restaurant) => restaurant.priceRange === filters.priceRange,
          );
        }

        if (filters?.city) {
          filteredRestaurants = filteredRestaurants.filter((restaurant) =>
            restaurant.address.city.toLowerCase().includes(filters.city!.toLowerCase()),
          );
        }

        if (filters?.search) {
          const searchTerm = filters.search.toLowerCase();
          filteredRestaurants = filteredRestaurants.filter(
            (restaurant) =>
              restaurant.name.toLowerCase().includes(searchTerm) ||
              restaurant.description.toLowerCase().includes(searchTerm) ||
              restaurant.ownerName.toLowerCase().includes(searchTerm) ||
              restaurant.email.toLowerCase().includes(searchTerm),
          );
        }

        if (filters?.hasUnverifiedDocuments) {
          filteredRestaurants = filteredRestaurants.filter((restaurant) =>
            restaurant.documents.some(
              (doc) =>
                doc.verificationStatus === 'pending' || doc.verificationStatus === 'rejected',
            ),
          );
        }

        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedRestaurants = filteredRestaurants.slice(startIndex, endIndex);

        this.loading.set(false);
        resolve({
          restaurants: paginatedRestaurants,
          total: filteredRestaurants.length,
          page,
          limit,
        });
      }, 500);
    });
  }

  getRestaurantById(id: string): Promise<Restaurant | undefined> {
    this.loading.set(true);

    return new Promise((resolve) => {
      setTimeout(() => {
        const restaurant = this.restaurants().find((r) => r.id === id);
        this.loading.set(false);
        resolve(restaurant);
      }, 300);
    });
  }

  createRestaurant(restaurantData: CreateRestaurantRequest): Promise<Restaurant> {
    this.loading.set(true);

    return new Promise((resolve) => {
      setTimeout(() => {
        const newRestaurant: Restaurant = {
          id: Date.now().toString(),
          ...restaurantData,
          ownerName: 'New Owner', // In real app, would fetch from ownerId
          status: 'inactive',
          verificationStatus: 'pending',
          rating: 0,
          totalReviews: 0,
          images: [],
          documents: [],
          createdAt: new Date(),
          updatedAt: new Date(),
          metrics: {
            totalOrders: 0,
            totalRevenue: 0,
            averageOrderValue: 0,
            activeMenuItems: 0,
            completionRate: 0,
            averagePreparationTime: 0,
          },
        };

        this.restaurants.update((restaurants) => [...restaurants, newRestaurant]);
        this.loading.set(false);
        resolve(newRestaurant);
      }, 500);
    });
  }

  updateRestaurant(id: string, restaurantData: UpdateRestaurantRequest): Promise<Restaurant> {
    this.loading.set(true);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const restaurants = this.restaurants();
        const restaurantIndex = restaurants.findIndex((r) => r.id === id);

        if (restaurantIndex === -1) {
          this.loading.set(false);
          reject(new Error('Restaurant not found'));
          return;
        }

        const updatedRestaurant: Restaurant = {
          ...restaurants[restaurantIndex],
          ...restaurantData,
          updatedAt: new Date(),
        };

        this.restaurants.update((restaurants) => {
          const newRestaurants = [...restaurants];
          newRestaurants[restaurantIndex] = updatedRestaurant;
          return newRestaurants;
        });

        this.loading.set(false);
        resolve(updatedRestaurant);
      }, 500);
    });
  }

  deleteRestaurant(id: string): Promise<void> {
    this.loading.set(true);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const restaurants = this.restaurants();
        const restaurantExists = restaurants.some((r) => r.id === id);

        if (!restaurantExists) {
          this.loading.set(false);
          reject(new Error('Restaurant not found'));
          return;
        }

        this.restaurants.update((restaurants) => restaurants.filter((r) => r.id !== id));
        this.loading.set(false);
        resolve();
      }, 500);
    });
  }

  changeRestaurantStatus(id: string, status: RestaurantStatus): Promise<Restaurant> {
    return this.updateRestaurant(id, { status });
  }

  verifyRestaurant(action: VerificationAction): Promise<Restaurant> {
    this.loading.set(true);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const restaurants = this.restaurants();
        const restaurantIndex = restaurants.findIndex((r) => r.id === action.restaurantId);

        if (restaurantIndex === -1) {
          this.loading.set(false);
          reject(new Error('Restaurant not found'));
          return;
        }

        const updatedRestaurant: Restaurant = {
          ...restaurants[restaurantIndex],
          verificationStatus: action.status,
          updatedAt: new Date(),
          verifiedAt: action.status === 'verified' ? new Date() : undefined,
        };

        this.restaurants.update((restaurants) => {
          const newRestaurants = [...restaurants];
          newRestaurants[restaurantIndex] = updatedRestaurant;
          return newRestaurants;
        });

        this.loading.set(false);
        resolve(updatedRestaurant);
      }, 500);
    });
  }

  verifyDocument(action: DocumentVerificationAction): Promise<void> {
    this.loading.set(true);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const restaurants = this.restaurants();
        let documentFound = false;

        this.restaurants.update((restaurants) => {
          return restaurants.map((restaurant) => {
            const documentIndex = restaurant.documents.findIndex(
              (doc) => doc.id === action.documentId,
            );
            if (documentIndex !== -1) {
              documentFound = true;
              const updatedDocuments = [...restaurant.documents];
              updatedDocuments[documentIndex] = {
                ...updatedDocuments[documentIndex],
                verificationStatus: action.status,
                rejectionReason: action.rejectionReason,
              };
              return {
                ...restaurant,
                documents: updatedDocuments,
                updatedAt: new Date(),
              };
            }
            return restaurant;
          });
        });

        this.loading.set(false);
        if (documentFound) {
          resolve();
        } else {
          reject(new Error('Document not found'));
        }
      }, 500);
    });
  }

  get isLoading() {
    return this.loading.asReadonly();
  }

  getCuisineDisplayName(cuisine: CuisineType): string {
    const cuisineMap: Record<CuisineType, string> = {
      italian: 'Italian',
      chinese: 'Chinese',
      indian: 'Indian',
      mexican: 'Mexican',
      japanese: 'Japanese',
      american: 'American',
      thai: 'Thai',
      french: 'French',
      mediterranean: 'Mediterranean',
      pizza: 'Pizza',
      burger: 'Burger',
      sushi: 'Sushi',
      vegetarian: 'Vegetarian',
      vegan: 'Vegan',
      desserts: 'Desserts',
      coffee: 'Coffee',
      other: 'Other',
    };
    return cuisineMap[cuisine];
  }

  getFeatureDisplayName(feature: RestaurantFeature | string): string {
    const featureMap: Record<RestaurantFeature, string> = {
      delivery: 'Delivery',
      pickup: 'Pickup',
      dine_in: 'Dine In',
      outdoor_seating: 'Outdoor Seating',
      parking: 'Parking',
      wifi: 'WiFi',
      accepts_cards: 'Accepts Cards',
      cash_only: 'Cash Only',
      alcohol_served: 'Alcohol Served',
      halal: 'Halal',
      kosher: 'Kosher',
      wheelchair_accessible: 'Wheelchair Accessible',
    };
    return featureMap[feature as RestaurantFeature] ?? feature;
  }

  getDocumentTypeDisplayName(type: DocumentType | string): string {
    const typeMap: Record<DocumentType, string> = {
      business_license: 'Business License',
      food_safety_certificate: 'Food Safety Certificate',
      tax_certificate: 'Tax Certificate',
      insurance_certificate: 'Insurance Certificate',
      identity_proof: 'Identity Proof',
      other: 'Other',
    };
    return typeMap[type as DocumentType] ?? type;
  }

  getDocumentStatusDisplayName(status: DocumentVerificationStatus | string): string {
    const statusMap: Record<DocumentVerificationStatus, string> = {
      pending: 'Pending',
      approved: 'Approved',
      rejected: 'Rejected',
      expired: 'Expired',
    };
    return statusMap[status as DocumentVerificationStatus] ?? status;
  }

  getDocumentStatusColor(status: DocumentVerificationStatus | string): string {
    const colorMap: Record<DocumentVerificationStatus, string> = {
      pending: 'warn',
      approved: 'primary',
      rejected: '',
      expired: 'accent',
    };
    return colorMap[status as DocumentVerificationStatus] ?? '';
  }

  getStatusDisplayName(status: RestaurantStatus): string {
    const statusMap: Record<RestaurantStatus, string> = {
      active: 'Active',
      inactive: 'Inactive',
      suspended: 'Suspended',
      temporarily_closed: 'Temporarily Closed',
    };
    return statusMap[status];
  }

  getVerificationStatusDisplayName(status: VerificationStatus): string {
    const statusMap: Record<VerificationStatus, string> = {
      pending: 'Pending',
      under_review: 'Under Review',
      verified: 'Verified',
      rejected: 'Rejected',
      additional_info_required: 'Additional Info Required',
    };
    return statusMap[status];
  }

  getStatusColor(status: RestaurantStatus): string {
    const colorMap: Record<RestaurantStatus, string> = {
      active: 'primary',
      inactive: 'warn',
      suspended: 'accent',
      temporarily_closed: 'warn',
    };
    return colorMap[status];
  }

  getVerificationStatusColor(status: VerificationStatus): string {
    const colorMap: Record<VerificationStatus, string> = {
      pending: 'warn',
      under_review: 'accent',
      verified: 'primary',
      rejected: '',
      additional_info_required: 'warn',
    };
    return colorMap[status];
  }

  getPendingVerificationCount(): number {
    return this.restaurants().filter(
      (r) =>
        r.verificationStatus === 'pending' ||
        r.verificationStatus === 'under_review' ||
        r.documents.some((doc) => doc.verificationStatus === 'pending'),
    ).length;
  }
}
