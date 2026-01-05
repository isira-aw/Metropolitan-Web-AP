import { apiClient } from "../api-client";
import type { News, NewsFormData, PageResponse } from "@/types";

export interface NewsFilters {
  fromDate?: string;
  toDate?: string;
  page?: number;
  limit?: number;
}

export const newsApi = {
  getAll: async (filters: NewsFilters = {}): Promise<PageResponse<News>> => {
    const params = new URLSearchParams();
    if (filters.fromDate) params.append("fromDate", filters.fromDate);
    if (filters.toDate) params.append("toDate", filters.toDate);
    params.append("page", String(filters.page || 1));
    params.append("limit", String(filters.limit || 20));

    const response = await apiClient.get<PageResponse<News>>(
      `/api/admin/news?${params.toString()}`
    );
    return response.data;
  },

  getById: async (id: number): Promise<News> => {
    const response = await apiClient.get<News>(`/api/admin/news/${id}`);
    return response.data;
  },

  create: async (data: NewsFormData): Promise<News> => {
    const response = await apiClient.post<News>("/api/admin/news", data);
    return response.data;
  },

  update: async (id: number, data: NewsFormData): Promise<News> => {
    const response = await apiClient.put<News>(`/api/admin/news/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/admin/news/${id}`);
  },
};
