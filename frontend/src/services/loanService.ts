import type { DashboardStats, LoanApplication } from '@/types';
import { getAccessToken, logout, refreshAccessToken } from './authService';

export interface LoanAnalysisInput {
  age: number;
  monthly_income: number;
  monthly_expenses: number;
  existing_debt: number;
  monthly_debt_payment: number;
  savings_balance: number;
  credit_score: number;
  previous_loans: number;
  loans_repaid: number;
  loans_defaulted: number;
  late_payments?: number;
  credit_history_years?: number;
  requested_loan_amount: number;
  loan_term_months: number;
  interest_rate?: number;
  employment_years: number;
  collateral_value?: number;
  employment_type?: string;
  education?: string;
  loan_purpose?: string;
  loan_type?: string;
}

export interface LoanAnalysisResponse {
  application_id: string;
  decision: 'APPROVED' | 'REVIEW' | 'REJECTED';
  risk_level: 'LOW' | 'MEDIUM' | 'HIGH';
  risk_score: number;
  confidence: number;
  recommended_amount: number;
  recommended_term: number;
  explanation: string;
  positive_factors: string[];
  risk_factors: string[];
  breakdown: Record<string, number>;
  risk_factor_details: Array<{ label?: string; feature: string; value: unknown; impact: 'positive' | 'negative' | 'neutral' }>;
}

export interface DashboardData {
  stats: DashboardStats;
  applications: LoanApplication[];
  overTime: Array<{ month: string; applications: number; approved: number }>;
  approvalRejection: Array<{ name: string; value: number; color: string }>;
  riskDistribution: Array<{ name: string; value: number; color: string }>;
  amountDistribution: Array<{ name: string; value: number }>;
  monthlyVolume: Array<{ month: string; volume: number }>;
}

async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const request = (token: string | null) => fetch(`/api/${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  let response = await request(getAccessToken());
  if (response.status === 401 && await refreshAccessToken()) {
    response = await request(getAccessToken());
  }
  if (!response.ok) {
    if (response.status === 401) {
      logout();
      window.location.assign('/login');
    }
    const data = await response.json().catch(() => ({})) as { detail?: string };
    throw new Error(data.detail ?? `Request failed: ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export function classifyLoan(input: LoanAnalysisInput) {
  return apiRequest<LoanAnalysisResponse>('loans/analyze/', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export function getDashboardData() {
  return apiRequest<DashboardData>('dashboard/');
}

export function getLoanHistory() {
  return apiRequest<LoanApplication[]>('loans/');
}