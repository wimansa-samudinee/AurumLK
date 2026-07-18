import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useNavigate } from "react-router";
import type { User, UserRole } from "../lib/types";
import * as api from "../lib/api";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (data: { email: string; password: string }) => Promise<void>;
  register: (data: { name: string; email: string; password: string; role: UserRole; businessName?: string; licenseNumber?: string }) => Promise<void>;
  logout: () => void;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const token = api.getToken();
        if (token) {
          const currentUser = await api.fetchMe();
          setUser(currentUser);
        }
      } catch (error) {
        api.clearToken();
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const login = async (data: { email: string; password: string }) => {
    const response = await api.login(data);
    api.setToken(response.token);
    setUser(response.user);
    if (response.user.role === "ADMIN") {
      navigate("/admin/dashboard");
    } else if (response.user.role === "BUSINESS") {
      navigate("/business/dashboard");
    } else {
      navigate("/customer/dashboard");
    }
  };

  const register = async (data: { name: string; email: string; password: string; role: UserRole; businessName?: string; licenseNumber?: string }) => {
    const response = await api.register(data);
    api.setToken(response.token);
    setUser(response.user);
    if (response.user.role === "ADMIN") {
      navigate("/admin/dashboard");
    } else if (response.user.role === "BUSINESS") {
      navigate("/business/dashboard");
    } else {
      navigate("/customer/dashboard");
    }
  };

  const logout = () => {
    api.clearToken();
    setUser(null);
    navigate("/login");
  };

  const refresh = async () => {
    const currentUser = await api.fetchMe();
    setUser(currentUser);
  };

  const value = useMemo(
    () => ({ user, loading, login, register, logout, refresh }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

