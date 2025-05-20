export interface Grievance {
  message: string;
  images: string[];
  createdAt: Date;
}

export interface FormState {
  message: string;
  images: File[];
}

export interface FormErrors {
  message?: string;
  images?: string;
}