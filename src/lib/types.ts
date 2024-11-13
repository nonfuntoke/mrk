export interface User {
  id: string;
  name: string;
  email: string;
  credits: number;
  emailVerified: boolean;
}

export interface ValidationResult {
  id: string;
  date: Date;
  fileName?: string;
  totalEmails: number;
  valid: string[];
  invalid: string[];
  risky: string[];
  disposable: string[];
  spamTraps: string[];
  creditsUsed: number;
  status: 'completed' | 'processing' | 'failed';
}

export interface CreditPackage {
  id: string;
  name: string;
  credits: number;
  price: number;
  description: string;
  features: string[];
}

export interface Transaction {
  id: string;
  date: Date;
  amount: number;
  credits: number;
  paymentMethod: 'stripe' | 'crypto';
  status: 'completed' | 'pending' | 'failed';
}

export interface ValidationCategory {
  type: 'valid' | 'invalid' | 'risky' | 'disposable' | 'spamTraps';
  label: string;
  color: string;
  description: string;
  icon: string;
}

export interface ValidationFilters {
  status?: 'completed' | 'processing' | 'failed';
  dateFrom?: string;
  dateTo?: string;
  search?: string;
}