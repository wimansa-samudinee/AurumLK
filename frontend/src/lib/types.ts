export type UserRole = "CUSTOMER" | "BUSINESS" | "ADMIN";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  businessName?: string | null;
  licenseNumber?: string | null;
  approved: boolean;
}

export interface Center {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  phone: string;
  website?: string | null;
  rating: number;
  offers?: Offer[];
  branches?: Branch[];
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  openingHours: string;
  centerId: string;
  center?: Center;
}

export interface Offer {
  id: string;
  title: string;
  type: string;
  rate: number;
  maxAmount: number;
  tenure: string;
  description: string;
  active: boolean;
  centerId: string;
  center?: Center;
  businessId?: string | null;
  business?: User | null;
}

export type InquiryStatus = "NEW" | "IN_PROGRESS" | "RESOLVED";

export interface Inquiry {
  id: string;
  subject: string;
  message: string;
  status: InquiryStatus;
  reply?: string | null;
  customerId: string;
  businessId?: string | null;
  offerId?: string | null;
  customer?: User;
  business?: User | null;
  offer?: Offer | null;
  createdAt: string;
  updatedAt: string;
}

