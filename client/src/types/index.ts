// Tutor types
export interface Tutor {
  _id: string;
  clerkUserId: string;
  name: string;
  phone: string;
  planType: 'solo' | 'pro' | 'institute';
  studentLimit: number;
  trialExpiry: string;
  planExpiry: string | null;
  subscriptionStatus: 'trial' | 'active' | 'grace' | 'locked';
  createdAt: string;
  updatedAt: string;
}

// Fee history type
export interface FeeHistoryEntry {
  amount: number;
  effectiveFrom: string; // YYYY-MM format
}

// Student types
export interface Student {
  _id: string;
  tutorId: string;
  name: string;
  phone?: string;
  monthlyFee: number;
  feeHistory?: FeeHistoryEntry[];
  startDate?: string;
  publicToken: string;
  createdAt: string;
  updatedAt: string;
}

// Payment types
export type PaymentStatus = 'Paid' | 'Pending';
export type PaymentMethod = 'Cash' | 'UPI';

export interface PaymentRecord {
  _id: string;
  studentId: string;
  month: string; // Format: YYYY-MM
  amount: number;
  status: PaymentStatus;
  method: PaymentMethod;
  markedAt: string;
  createdAt: string;
  updatedAt: string;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Form types
export interface OnboardingFormData {
  name: string;
  phone: string;
}

export interface StudentFormData {
  name: string;
  phone?: string;
  monthlyFee: number;
  startDate?: string;
}

export interface PaymentFormData {
  month: string;
  amount: number;
  status: PaymentStatus;
  method: PaymentMethod;
}

// Public payment view
export interface PublicPaymentView {
  tutorName: string;
  studentName: string;
  monthlyFee: number;
  payments: PaymentRecord[];
}
