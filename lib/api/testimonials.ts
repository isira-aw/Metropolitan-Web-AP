import { apiClient } from "../api-client";
import type { Testimonial, TestimonialFormData, PageResponse } from "@/types";

export interface TestimonialFilters {
  division?: string;
  fromDate?: string;
  toDate?: string;
  page?: number;
  limit?: number;
}

export const testimonialsApi = {
  getAll: async (filters: TestimonialFilters = {}): Promise<PageResponse<Testimonial>> => {
    const params = new URLSearchParams();
    if (filters.division) params.append("division", filters.division);
    if (filters.fromDate) params.append("fromDate", filters.fromDate);
    if (filters.toDate) params.append("toDate", filters.toDate);
    params.append("page", String(filters.page || 1));
    params.append("limit", String(filters.limit || 20));

    const response = await apiClient.get<PageResponse<Testimonial>>(
      `/api/admin/testimonials?${params.toString()}`
    );
    return response.data;
  },

  getById: async (id: number): Promise<Testimonial> => {
    const response = await apiClient.get<Testimonial>(`/api/admin/testimonials/${id}`);
    return response.data;
  },

  create: async (data: TestimonialFormData): Promise<Testimonial> => {
    const response = await apiClient.post<Testimonial>("/api/admin/testimonials", data);
    return response.data;
  },

  update: async (id: number, data: TestimonialFormData): Promise<Testimonial> => {
    const response = await apiClient.put<Testimonial>(`/api/admin/testimonials/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/admin/testimonials/${id}`);
  },
};
