const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

class ApiClient {
  private getToken: (() => Promise<string | null>) | null = null;

  setTokenGetter(getter: () => Promise<string | null>) {
    this.getToken = getter;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.getToken) {
      const token = await this.getToken();
      if (token) {
        (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
      }
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Auth & Onboarding
  async getMe() {
    return this.request<{ tutor: import('../types').Tutor }>('/me');
  }

  async completeOnboarding(data: import('../types').OnboardingFormData) {
    return this.request<{ tutor: import('../types').Tutor }>('/onboarding', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Students
  async getStudents() {
    return this.request<{ students: import('../types').Student[] }>('/students');
  }

  async getStudent(id: string) {
    return this.request<{ student: import('../types').Student }>(`/students/${id}`);
  }

  async createStudent(data: import('../types').StudentFormData) {
    return this.request<{ student: import('../types').Student }>('/students', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateStudent(id: string, data: Partial<import('../types').StudentFormData>) {
    return this.request<{ student: import('../types').Student }>(`/students/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteStudent(id: string) {
    return this.request<{ message: string }>(`/students/${id}`, {
      method: 'DELETE',
    });
  }

  async updateStudentFee(id: string, data: { amount: number; effectiveFrom: string }) {
    return this.request<{ student: import('../types').Student }>(`/students/${id}/fee`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Payments
  async getStudentPayments(studentId: string) {
    return this.request<{ payments: import('../types').PaymentRecord[] }>(
      `/students/${studentId}/payments`
    );
  }

  async createPayment(studentId: string, data: import('../types').PaymentFormData) {
    return this.request<{ payment: import('../types').PaymentRecord }>(
      `/students/${studentId}/payments`,
      {
        method: 'POST',
        body: JSON.stringify(data),
      }
    );
  }

  async updatePayment(paymentId: string, data: Partial<import('../types').PaymentFormData>) {
    return this.request<{ payment: import('../types').PaymentRecord }>(
      `/payments/${paymentId}`,
      {
        method: 'PUT',
        body: JSON.stringify(data),
      }
    );
  }

  // Public routes (no auth)
  async getPublicPaymentView(publicToken: string) {
    return fetch(`${API_URL}/public/${publicToken}`).then((res) => {
      if (!res.ok) throw new Error('Failed to fetch payment view');
      return res.json() as Promise<import('../types').PublicPaymentView>;
    });
  }
}

export const api = new ApiClient();
