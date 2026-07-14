import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// Token management
export function setToken(token: string): void {
  localStorage.setItem("authToken", token);
}

export function getToken(): string | null {
  return localStorage.getItem("authToken");
}

export function clearToken(): void {
  localStorage.removeItem("authToken");
}

// API request helper
async function apiRequest(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = getToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response;
}

// Auth API endpoints
export async function login(email: string, password: string): Promise<{ token: string }> {
  const response = await apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  return response.json();
}

export async function register(email: string, password: string, name: string): Promise<{ token: string }> {
  const response = await apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password, name }),
  });
  return response.json();
}

export async function fetchMe(): Promise<any> {
  const response = await apiRequest("/auth/me", {
    method: "GET",
  });
  return response.json();
}

