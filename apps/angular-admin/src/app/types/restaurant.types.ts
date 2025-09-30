export interface Restaurant {
  id: string;
  name: string;
  description: string;
  email: string;
  phone: string;
  ownerId: string;
  ownerName: string;
  address: RestaurantAddress;
  cuisine: CuisineType[];
  status: RestaurantStatus;
  verificationStatus: VerificationStatus;
  rating: number;
  totalReviews: number;
  priceRange: PriceRange;
  openingHours: OpeningHours;
  features: RestaurantFeature[];
  images: RestaurantImage[];
  documents: RestaurantDocument[];
  createdAt: Date;
  updatedAt: Date;
  verifiedAt?: Date;
  lastActiveAt?: Date;
  metrics: RestaurantMetrics;
}

export interface RestaurantAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  latitude?: number;
  longitude?: number;
  deliveryRadius: number; // in kilometers
}

export interface OpeningHours {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
}

export interface DaySchedule {
  isOpen: boolean;
  openTime?: string; // HH:mm format
  closeTime?: string; // HH:mm format
  isAllDay?: boolean;
}

export interface RestaurantImage {
  id: string;
  url: string;
  type: 'logo' | 'cover' | 'menu' | 'interior' | 'food';
  caption?: string;
  isPrimary: boolean;
}

export interface RestaurantDocument {
  id: string;
  type: DocumentType;
  name: string;
  url: string;
  uploadedAt: Date;
  verificationStatus: DocumentVerificationStatus;
  rejectionReason?: string;
}

export interface RestaurantMetrics {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  activeMenuItems: number;
  completionRate: number; // percentage
  averagePreparationTime: number; // in minutes
}

export type RestaurantStatus = 'active' | 'inactive' | 'suspended' | 'temporarily_closed';

export type VerificationStatus = 'pending' | 'under_review' | 'verified' | 'rejected' | 'additional_info_required';

export type DocumentType = 'business_license' | 'food_safety_certificate' | 'tax_certificate' | 'insurance_certificate' | 'identity_proof' | 'other';

export type DocumentVerificationStatus = 'pending' | 'approved' | 'rejected' | 'expired';

export type CuisineType = 'italian' | 'chinese' | 'indian' | 'mexican' | 'japanese' | 'american' | 'thai' | 'french' | 'mediterranean' | 'pizza' | 'burger' | 'sushi' | 'vegetarian' | 'vegan' | 'desserts' | 'coffee' | 'other';

export type PriceRange = '$' | '$$' | '$$$' | '$$$$';

export type RestaurantFeature = 'delivery' | 'pickup' | 'dine_in' | 'outdoor_seating' | 'parking' | 'wifi' | 'accepts_cards' | 'cash_only' | 'alcohol_served' | 'halal' | 'kosher' | 'wheelchair_accessible';

export interface CreateRestaurantRequest {
  name: string;
  description: string;
  email: string;
  phone: string;
  ownerId: string;
  address: RestaurantAddress;
  cuisine: CuisineType[];
  priceRange: PriceRange;
  openingHours: OpeningHours;
  features: RestaurantFeature[];
}

export interface UpdateRestaurantRequest {
  name?: string;
  description?: string;
  email?: string;
  phone?: string;
  address?: RestaurantAddress;
  cuisine?: CuisineType[];
  status?: RestaurantStatus;
  priceRange?: PriceRange;
  openingHours?: OpeningHours;
  features?: RestaurantFeature[];
}

export interface RestaurantFilters {
  status?: RestaurantStatus;
  verificationStatus?: VerificationStatus;
  cuisine?: CuisineType;
  priceRange?: PriceRange;
  city?: string;
  search?: string;
  hasUnverifiedDocuments?: boolean;
}

export interface RestaurantListResponse {
  restaurants: Restaurant[];
  total: number;
  page: number;
  limit: number;
}

export interface VerificationAction {
  restaurantId: string;
  status: VerificationStatus;
  notes?: string;
  requiredDocuments?: DocumentType[];
}

export interface DocumentVerificationAction {
  documentId: string;
  status: DocumentVerificationStatus;
  rejectionReason?: string;
}