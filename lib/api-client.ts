import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://metropolitan-web-b-production.up.railway.app";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle auth errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check for JWT-related errors (including signature mismatch)
    const isJwtError = 
      error.response?.status === 401 || 
      error.response?.status === 403 || 
      (error.response?.data?.message && 
        (error.response.data.message.includes("JWT") || 
         error.response.data.message.includes("token") || 
         error.response.data.message.includes("signature"))) ||
      (error.message && 
        (error.message.includes("JWT") || 
         error.message.includes("token") || 
         error.message.includes("signature")));

    if (isJwtError) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);
