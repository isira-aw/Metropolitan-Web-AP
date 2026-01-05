// Auth Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  type: string;
  id: number;
  name: string;
  email: string;
}

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  lastLogin: string | null;
  isActive: boolean;
}

// Content Types
export interface CaseStudy {
  id: number;
  title: string;
  description: string;
  image: string;
  division: string;
  client: string;
  location: string;
  completionDate: string;
  createdAt: string;
}

export interface News {
  id: number;
  title: string;
  content: string;
  summary: string;
  image: string;
  date: string;
  createdAt: string;
}

export interface Testimonial {
  id: number;
  content: string;
  author: string;
  role: string;
  division: string;
  createdAt: string;
}

export interface Inquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  division: string;
  createdAt: string;
}

export interface JobApplication {
  id: number;
  name: string;
  email: string;
  position: string;
  portfolioUrl: string;
  coverLetter: string;
  createdAt: string;
}

// Pagination Types
export interface PageResponse<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}

// Form Types
export interface CaseStudyFormData {
  title: string;
  description: string;
  image: string;
  division: string;
  client: string;
  location: string;
  completionDate: string;
}

export interface NewsFormData {
  title: string;
  content: string;
  summary: string;
  image: string;
  date: string;
}

export interface TestimonialFormData {
  content: string;
  author: string;
  role: string;
  division: string;
}

// Division enum
export const DIVISIONS = [
  "CENTRAL_AC",
  "ELEVATORS",
  "FIRE_PROTECTION",
  "GENERATOR",
  "SOLAR",
  "ELV",
] as const;

export type Division = typeof DIVISIONS[number];

export const DIVISION_LABELS: Record<Division, string> = {
  CENTRAL_AC: "Central AC",
  ELEVATORS: "Elevators and Travelators",
  FIRE_PROTECTION: "Fire Detection & Protection",
  GENERATOR: "Generator",
  SOLAR: "Solar",
  ELV: "ELV",
};
