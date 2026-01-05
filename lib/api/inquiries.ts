import { apiClient } from "../api-client";
import type { Inquiry, PageResponse } from "@/types";

export interface InquiryFilters {
  fromDate?: string;
  toDate?: string;
  page?: number;
  limit?: number;
}

export const inquiriesApi = {
  getAll: async (filters: InquiryFilters = {}): Promise<PageResponse<Inquiry>> => {
    const params = new URLSearchParams();
    if (filters.fromDate) params.append("fromDate", filters.fromDate);
    if (filters.toDate) params.append("toDate", filters.toDate);
    params.append("page", String(filters.page || 1));
    params.append("limit", String(filters.limit || 20));

    const response = await apiClient.get<PageResponse<Inquiry>>(
      `/api/admin/inquiries?${params.toString()}`
    );
    return response.data;
  },

  getById: async (id: number): Promise<Inquiry> => {
    const response = await apiClient.get<Inquiry>(`/api/admin/inquiries/${id}`);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/admin/inquiries/${id}`);
  },
};
