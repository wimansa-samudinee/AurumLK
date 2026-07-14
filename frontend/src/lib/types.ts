export type UserRole = "ADMIN" | "BUSINESS" | "CUSTOMER";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  businessName?: string;
  licenseNumber?: string;
  createdAt?: string;
  updatedAt?: string;
}
