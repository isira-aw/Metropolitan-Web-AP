import { apiClient } from "@/lib/api-client";

export interface KnowledgeBaseEntry {
  id: number;
  question: string;
  answer: string;
  category: string | null;
  keywords: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEntryPayload {
  question: string;
  answer: string;
  category?: string;
  keywords?: string;
}

export const chatbotApi = {
  getAll: async (): Promise<KnowledgeBaseEntry[]> => {
    const res = await apiClient.get("/api/admin/chatbot");
    return res.data;
  },

  getById: async (id: number): Promise<KnowledgeBaseEntry> => {
    const res = await apiClient.get(`/api/admin/chatbot/${id}`);
    return res.data;
  },

  create: async (payload: CreateEntryPayload): Promise<KnowledgeBaseEntry> => {
    const res = await apiClient.post("/api/admin/chatbot", payload);
    return res.data;
  },

  update: async (id: number, payload: CreateEntryPayload): Promise<KnowledgeBaseEntry> => {
    const res = await apiClient.put(`/api/admin/chatbot/${id}`, payload);
    return res.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/admin/chatbot/${id}`);
  },

  getCategories: async (): Promise<string[]> => {
    const res = await apiClient.get("/api/admin/chatbot/categories");
    return res.data;
  },
};
