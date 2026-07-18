import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { User, UserRole } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const TOKEN_KEY = "aurum_token";
const USERS_KEY = "aurum_users";

// Helper helper to get users list from localStorage
function getUsers(): User[] {
  const usersJson = localStorage.getItem(USERS_KEY);
  if (!usersJson) {
    // Seed with a default admin user if empty
    const defaultUsers: User[] = [
      {
        id: "admin-1",
        name: "Admin User",
        email: "admin@aurum.lk",
        role: "ADMIN",
      }
    ];
    localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
    return defaultUsers;
  }
  try {
    return JSON.parse(usersJson);
  } catch {
    return [];
  }
}

// Helper to save users list
function saveUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

export async function fetchMe(): Promise<User> {
  const token = getToken();
  if (!token) {
    throw new Error("No token found");
  }
  
  // The token is the user's email in this mock implementation
  const users = getUsers();
  const user = users.find(u => u.email === token);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
}

export async function login(data: { email: string; password: string }): Promise<{ token: string; user: User }> {
  // Simple mock network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const users = getUsers();
  const user = users.find(u => u.email.toLowerCase() === data.email.toLowerCase());
  if (!user) {
    throw new Error("Invalid email or password");
  }
  
  // In a real app, we would verify the password, here we accept any password
  const token = user.email; // Use email as mock token
  return { token, user };
}

export async function register(data: {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  businessName?: string;
  licenseNumber?: string;
}): Promise<{ token: string; user: User }> {
  // Simple mock network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const users = getUsers();
  if (users.some(u => u.email.toLowerCase() === data.email.toLowerCase())) {
    throw new Error("Email address already registered");
  }

  const newUser: User = {
    id: `user-${Date.now()}`,
    name: data.name,
    email: data.email,
    role: data.role,
    businessName: data.businessName,
    licenseNumber: data.licenseNumber,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveUsers(users);

  const token = newUser.email; // Use email as mock token
  return { token, user: newUser };
}
