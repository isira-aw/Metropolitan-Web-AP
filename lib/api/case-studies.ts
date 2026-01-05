import { apiClient } from "../api-client";
import type { CaseStudy, CaseStudyFormData, PageResponse } from "@/types";

export interface CaseStudyFilters {
  division?: string;
  fromDate?: string;
  toDate?: string;
  page?: number;
  limit?: number;
}

export const caseStudiesApi = {
  getAll: async (filters: CaseStudyFilters = {}): Promise<PageResponse<CaseStudy>> => {
    const params = new URLSearchParams();
    if (filters.division) params.append("division", filters.division);
    if (filters.fromDate) params.append("fromDate", filters.fromDate);
    if (filters.toDate) params.append("toDate", filters.toDate);
    params.append("page", String(filters.page || 1));
    params.append("limit", String(filters.limit || 20));

    const response = await apiClient.get<PageResponse<CaseStudy>>(
      `/api/admin/case-studies?${params.toString()}`
    );
    return response.data;
  },

  getById: async (id: number): Promise<CaseStudy> => {
    const response = await apiClient.get<CaseStudy>(`/api/admin/case-studies/${id}`);
    return response.data;
  },

  create: async (data: CaseStudyFormData): Promise<CaseStudy> => {
    const response = await apiClient.post<CaseStudy>("/api/admin/case-studies", data);
    return response.data;
  },

  update: async (id: number, data: CaseStudyFormData): Promise<CaseStudy> => {
    const response = await apiClient.put<CaseStudy>(`/api/admin/case-studies/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/admin/case-studies/${id}`);
  },
};
