import { apiClient } from "../api-client";
import type { LoginRequest, RegisterRequest, AuthResponse, AdminUser } from "@/types";

export const authApi = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>("/api/admin/auth/login", data);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>("/api/admin/auth/register", data);
    return response.data;
  },

  getCurrentUser: async (): Promise<AdminUser> => {
    const response = await apiClient.get<AdminUser>("/api/admin/auth/me");
    return response.data;
  },
};
