import type { Inquiry, Offer, Branch, Center, User, UserRole } from "./types";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";
const TOKEN_KEY = "aurumlk_token";

export function getToken() {
  return typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;
}

export function setToken(token: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_KEY, token);
  }
}

export function clearToken() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TOKEN_KEY);
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((options.headers ?? {}) as Record<string, string>),
  };

  const token = getToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.error || response.statusText || "Request failed");
  }

  return response.json();
}

export interface AuthPayload {
  email: string;
  password: string;
}

export interface RegisterPayload extends AuthPayload {
  name: string;
  role: UserRole;
  businessName?: string;
  licenseNumber?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export async function login(payload: AuthPayload) {
  return request<AuthResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function register(payload: RegisterPayload) {
  return request<AuthResponse>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function forgotPassword(email: string) {
  return request<{ message: string; resetLink: string; testPreviewUrl?: string | null }>("/api/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export async function verifyResetToken(payload: { email: string; token: string }) {
  return request<{ valid: boolean }>("/api/auth/verify-reset-token", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function resetPassword(payload: any) {
  return request<{ message: string }>("/api/auth/reset-password", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function fetchMe() {
  return request<User>("/api/auth/me");
}

export async function fetchOffers(query?: Record<string, string | number | boolean>) {
  const params = query ? `?${new URLSearchParams(Object.entries(query).map(([key, value]) => [key, String(value)]))}` : "";
  return request<Offer[]>(`/api/offers${params}`);
}

export async function fetchOffer(id: string) {
  return request<Offer>(`/api/offers/${id}`);
}

export async function fetchCenters() {
  return request<Center[]>("/api/centers");
}

export async function fetchCenter(id: string) {
  return request<Center>(`/api/centers/${id}`);
}

export async function fetchBranch(id: string) {
  return request<Branch>(`/api/branches/${id}`);
}

export async function fetchBranches() {
  return request<Branch[]>("/api/branches");
}

export async function fetchInquiries(query?: Record<string, string | number>) {
  const params = query ? `?${new URLSearchParams(Object.entries(query).map(([key, value]) => [key, String(value)]))}` : "";
  return request<Inquiry[]>(`/api/inquiries${params}`);
}

export async function createInquiry(payload: { subject: string; message: string; offerId: string }) {
  return request<Inquiry>("/api/inquiries", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateInquiry(id: string, payload: Partial<{ status: string; message: string; reply: string }>) {
  return request<Inquiry>(`/api/inquiries/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function createOffer(payload: Partial<Offer>) {
  return request<Offer>("/api/offers", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateOffer(id: string, payload: Partial<Offer>) {
  return request<Offer>(`/api/offers/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function deleteOffer(id: string) {
  return request<any>(`/api/offers/${id}`, {
    method: "DELETE",
  });
}

export async function fetchUsers() {
  return request<User[]>("/api/users");
}

export async function updateUser(id: string, payload: Partial<User>) {
  return request<User>(`/api/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function updateCenter(id: string, payload: any) {
  return request<any>(`/api/centers/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function createBranch(payload: any) {
  return request<any>("/api/branches", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateBranch(id: string, payload: any) {
  return request<any>(`/api/branches/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function deleteBranch(id: string) {
  return request<any>(`/api/branches/${id}`, {
    method: "DELETE",
  });
}

export async function fetchBusinessApprovals() {
  return request<User[]>("/api/admin/business-approvals");
}

export async function approveBusiness(id: string) {
  return request<User>(`/api/admin/business-approvals/${id}/approve`, { method: "POST" });
}

export async function rejectBusiness(id: string) {
  return request<{ message: string }>(`/api/admin/business-approvals/${id}/reject`, { method: "POST" });
}