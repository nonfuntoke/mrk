import { ValidationResult } from './types';

const API_BASE_URL = 'https://api.emailcleaner.com/v1';

// Add mock data for development
const mockValidationResult = (emails: string[]): ValidationResult => ({
  id: Math.random().toString(36).substring(7),
  date: new Date(),
  fileName: 'upload.csv',
  totalEmails: emails.length,
  valid: emails.filter((_, i) => i % 2 === 0),
  invalid: emails.filter((_, i) => i % 3 === 0),
  risky: emails.filter((_, i) => i % 5 === 0),
  disposable: emails.filter((_, i) => i % 7 === 0),
  spamTraps: emails.filter((_, i) => i % 11 === 0),
  creditsUsed: emails.length,
  status: 'completed'
});

export async function validateEmails(emails: string[]): Promise<ValidationResult> {
  try {
    // For development, use mock data
    if (process.env.NODE_ENV === 'development') {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(mockValidationResult(emails));
        }, 2000);
      });
    }

    const response = await fetch(`${API_BASE_URL}/validate/bulk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ emails }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Validation failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Error validating emails:', error);
    throw error;
  }
}

export async function validateSingleEmail(email: string): Promise<ValidationResult> {
  try {
    // For development, use mock data
    if (process.env.NODE_ENV === 'development') {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(mockValidationResult([email]));
        }, 1000);
      });
    }

    const response = await fetch(`${API_BASE_URL}/validate/single`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Validation failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Error validating email:', error);
    throw error;
  }
}

export async function purchaseCredits(packageId: string, paymentMethod: 'stripe' | 'crypto'): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/credits/purchase`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ packageId, paymentMethod }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Purchase failed');
    }
  } catch (error) {
    console.error('Error purchasing credits:', error);
    throw error;
  }
}

export async function getUserCredits(): Promise<number> {
  try {
    // For development, return mock data
    if (process.env.NODE_ENV === 'development') {
      return Promise.resolve(1000);
    }

    const response = await fetch(`${API_BASE_URL}/credits/balance`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch credits');
    }

    const data = await response.json();
    return data.credits;
  } catch (error) {
    console.error('Error fetching credits:', error);
    throw error;
  }
}

export async function getValidationHistory(page: number = 1, filters?: Record<string, string>): Promise<{
  results: ValidationResult[];
  total: number;
  pages: number;
}> {
  try {
    // For development, return mock data
    if (process.env.NODE_ENV === 'development') {
      return Promise.resolve({
        results: Array(10).fill(null).map(() => mockValidationResult(['test@example.com'])),
        total: 100,
        pages: 10
      });
    }

    const queryParams = new URLSearchParams({
      page: page.toString(),
      ...filters,
    });

    const response = await fetch(`${API_BASE_URL}/validations/history?${queryParams}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch history');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching validation history:', error);
    throw error;
  }
}