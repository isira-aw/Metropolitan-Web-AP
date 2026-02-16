import { apiClient } from "../api-client";
import type { JobPosition, JobPositionFormData, PageResponse } from "@/types";

export interface JobPositionFilters {
  category?: string;
  fromDate?: string;
  toDate?: string;
  page?: number;
  limit?: number;
}

export const jobPositionsApi = {
  getAll: async (filters: JobPositionFilters = {}): Promise<PageResponse<JobPosition>> => {
    const params = new URLSearchParams();
    if (filters.category) params.append("category", filters.category);
    if (filters.fromDate) params.append("fromDate", filters.fromDate);
    if (filters.toDate) params.append("toDate", filters.toDate);
    params.append("page", String(filters.page || 1));
    params.append("limit", String(filters.limit || 20));

    const response = await apiClient.get<PageResponse<JobPosition>>(
      `/api/admin/job-positions?${params.toString()}`
    );
    return response.data;
  },

  getById: async (id: number): Promise<JobPosition> => {
    const response = await apiClient.get<JobPosition>(`/api/admin/job-positions/${id}`);
    return response.data;
  },

  create: async (data: JobPositionFormData): Promise<JobPosition> => {
    const response = await apiClient.post<JobPosition>("/api/admin/job-positions", data);
    return response.data;
  },

  update: async (id: number, data: JobPositionFormData): Promise<JobPosition> => {
    const response = await apiClient.put<JobPosition>(`/api/admin/job-positions/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/admin/job-positions/${id}`);
  },
};
