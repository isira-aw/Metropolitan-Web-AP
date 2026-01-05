import { apiClient } from "../api-client";
import type { JobApplication, PageResponse } from "@/types";

export interface JobApplicationFilters {
  fromDate?: string;
  toDate?: string;
  page?: number;
  limit?: number;
}

export const jobApplicationsApi = {
  getAll: async (filters: JobApplicationFilters = {}): Promise<PageResponse<JobApplication>> => {
    const params = new URLSearchParams();
    if (filters.fromDate) params.append("fromDate", filters.fromDate);
    if (filters.toDate) params.append("toDate", filters.toDate);
    params.append("page", String(filters.page || 1));
    params.append("limit", String(filters.limit || 20));

    const response = await apiClient.get<PageResponse<JobApplication>>(
      `/api/admin/job-applications?${params.toString()}`
    );
    return response.data;
  },

  getById: async (id: number): Promise<JobApplication> => {
    const response = await apiClient.get<JobApplication>(`/api/admin/job-applications/${id}`);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/admin/job-applications/${id}`);
  },
};
