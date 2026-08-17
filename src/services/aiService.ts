import type {
  AIAnalysisResult,
  LoanDecision,
  RiskLevel,
  RiskFactor,
} from '@/types';

export interface LoanAnalysisInput {
  age: number;
  monthly_income: number;
  monthly_expenses: number;
  existing_debt: number;
  credit_score: number;
  previous_loans: number;
  loans_repaid: number;
  loans_defaulted: number;
  requested_loan_amount: number;
  loan_term_months: number;
  monthly_debt_payment?: number;
  savings_balance?: number;
  employment_years?: number;
}

export interface LoanAnalysisResponse {
  decision: LoanDecision;
  risk_level: RiskLevel;
  risk_score: number;
  confidence: number;
  recommended_amount: number;
  recommended_term: number;
  explanation: string;
}

const API_BASE_URL = '/api';

export async function analyzeLoanApplication(
  input: LoanAnalysisInput
): Promise<LoanAnalysisResponse> {
  if (import.meta.env.VITE_AI_API_ENABLED === 'true') {
    const response = await fetch(`${API_BASE_URL}/loan/analyze/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
    if (!response.ok) {
      throw new Error(`AI analysis failed: ${response.statusText}`);
    }
    return (await response.json()) as LoanAnalysisResponse;
  }
  await new Promise((r) => setTimeout(r, 1800));
  return mockAnalyze(input);
}

export async function getRiskScore(input: LoanAnalysisInput): Promise<number> {
  const result = await analyzeLoanApplication(input);
  return result.risk_score;
}

export async function getLoanRecommendation(
  input: LoanAnalysisInput
): Promise<{ amount: number; term: number }> {
  const result = await analyzeLoanApplication(input);
  return { amount: result.recommended_amount, term: result.recommended_term };
}

export async function getFullAnalysis(
  applicationId: string,
  input: LoanAnalysisInput
): Promise<AIAnalysisResult> {
  const base = await analyzeLoanApplication(input);
  const dti =
    input.monthly_debt_payment && input.monthly_income > 0
      ? (input.monthly_debt_payment / input.monthly_income) * 100
      : 50;
  const breakdown = {
    financialHealth: Math.min(99, Math.max(20, Math.round(100 - base.risk_score * 0.8))),
    creditProfile: Math.min(99, Math.max(20, Math.round((input.credit_score / 850) * 100))),
    repaymentCapacity: Math.min(99, Math.max(20, Math.round(100 - dti))),
    debtBurden: Math.min(99, Math.max(20, Math.round(100 - dti * 0.9))),
  };
  const positiveFactors: string[] = [];
  const riskFactors: string[] = [];
  if (input.credit_score >= 700) positiveFactors.push('Strong credit score');
  if ((input.employment_years ?? 0) >= 5) positiveFactors.push('Stable employment history');
  if (input.loans_defaulted === 0) positiveFactors.push('No loan defaults');
  if ((input.savings_balance ?? 0) > 1000000) positiveFactors.push('Healthy savings balance');
  if (dti < 20) positiveFactors.push('Low debt-to-income ratio');

  if (input.requested_loan_amount > 10000000) riskFactors.push('High requested loan amount');
  if ((input.employment_years ?? 0) < 3) riskFactors.push('Short employment history');
  if (dti > 30) riskFactors.push('Elevated debt-to-income ratio');
  if (input.loans_defaulted > 0) riskFactors.push(`${input.loans_defaulted} previous default(s)`);
  if (input.credit_score < 650) riskFactors.push('Below-average credit score');

  const riskFactorList: RiskFactor[] = [
    { label: 'Credit Score', score: breakdown.creditProfile, impact: 'positive', description: `Credit score of ${input.credit_score}.` },
    { label: 'Debt-to-Income', score: Math.round(100 - dti), impact: dti < 20 ? 'positive' : 'negative', description: `DTI ratio of ${Math.round(dti)}%.` },
    { label: 'Income Stability', score: breakdown.repaymentCapacity, impact: 'positive', description: `Monthly income of ₦${input.monthly_income.toLocaleString()}.` },
    { label: 'Repayment History', score: Math.round((input.loans_repaid / Math.max(1, input.previous_loans)) * 100), impact: 'positive', description: `${input.loans_repaid} of ${input.previous_loans} loans repaid.` },
    { label: 'Savings', score: Math.min(99, Math.round(((input.savings_balance ?? 0) / 3000000) * 100)), impact: 'positive', description: `Savings of ₦${(input.savings_balance ?? 0).toLocaleString()}.` },
  ];

  return {
    applicationId,
    decision: base.decision,
    riskLevel: base.risk_level,
    riskScore: base.risk_score,
    confidence: base.confidence,
    recommendedAmount: base.recommended_amount,
    recommendedTerm: base.recommended_term,
    explanation: base.explanation,
    positiveFactors,
    riskFactors,
    breakdown,
    riskFactors: riskFactorList,
  };
}

function mockAnalyze(input: LoanAnalysisInput): LoanAnalysisResponse {
  let score = 50;
  if (input.credit_score >= 750) score -= 30;
  else if (input.credit_score >= 700) score -= 22;
  else if (input.credit_score >= 650) score -= 12;
  else if (input.credit_score < 580) score += 25;

  const dti =
    input.monthly_debt_payment && input.monthly_income > 0
      ? (input.monthly_debt_payment / input.monthly_income) * 100
      : 0;
  if (dti < 15) score -= 15;
  else if (dti < 30) score -= 5;
  else if (dti > 40) score += 20;

  if (input.loans_defaulted === 0) score -= 8;
  else score += input.loans_defaulted * 12;

  if ((input.employment_years ?? 0) >= 5) score -= 8;
  if ((input.employment_years ?? 0) < 2) score += 10;

  if ((input.savings_balance ?? 0) > 2000000) score -= 6;

  if (input.requested_loan_amount > 10000000) score += 10;
  if (input.requested_loan_amount < 3000000) score -= 4;

  score = Math.max(5, Math.min(95, score));

  let riskLevel: RiskLevel = 'MEDIUM';
  if (score < 35) riskLevel = 'LOW';
  else if (score > 65) riskLevel = 'HIGH';

  let decision: LoanDecision = 'APPROVED';
  if (score > 65) decision = 'REJECTED';
  else if (score > 45) decision = 'REVIEW';

  const confidence = Math.round((95 - score * 0.3 + Math.random() * 3) * 10) / 10;
  const recommendedAmount =
    decision === 'REJECTED'
      ? 0
      : score < 35
        ? input.requested_loan_amount
        : Math.round(input.requested_loan_amount * (1 - score / 200));

  return {
    decision,
    risk_level: riskLevel,
    risk_score: Math.round(score),
    confidence,
    recommended_amount: recommendedAmount,
    recommended_term: input.loan_term_months,
    explanation:
      decision === 'APPROVED'
        ? 'Strong repayment capacity, healthy credit history, low debt-to-income ratio and sufficient savings contributed positively to the classification.'
        : decision === 'REJECTED'
          ? 'Elevated debt-to-income ratio, weak credit profile and insufficient repayment capacity indicate high risk of default.'
          : 'Mixed risk indicators require manual review before a final decision can be issued.',
  };
}
