import type {
  AIAnalysisResult,
  LoanDecision,
  RiskLevel,
  RiskFactor,
} from '@/types';
import { classifyLoan, type LoanAnalysisInput } from './loanService';

export type { LoanAnalysisInput } from './loanService';

export interface LoanAnalysisResponse {
  decision: LoanDecision;
  risk_level: RiskLevel;
  risk_score: number;
  confidence: number;
  recommended_amount: number;
  recommended_term: number;
  explanation: string;
}

export async function analyzeLoanApplication(
  input: LoanAnalysisInput
): Promise<LoanAnalysisResponse> {
  const result = await classifyLoan(input);
  return {
    decision: result.decision,
    risk_level: result.risk_level,
    risk_score: result.risk_score,
    confidence: result.confidence,
    recommended_amount: result.recommended_amount,
    recommended_term: result.recommended_term,
    explanation: result.explanation,
  };
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
  const result = await classifyLoan(input);
  const base: LoanAnalysisResponse = {
    decision: result.decision,
    risk_level: result.risk_level,
    risk_score: result.risk_score,
    confidence: result.confidence,
    recommended_amount: result.recommended_amount,
    recommended_term: result.recommended_term,
    explanation: result.explanation,
  };
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
    positiveFactors: result.positive_factors.length ? result.positive_factors : positiveFactors,
    riskFactors: result.risk_factors.length ? result.risk_factors : riskFactors,
    breakdown,
    riskFactorDetails: result.risk_factor_details.map((factor) => ({
      label: factor.label ?? factor.feature,
      score: factor.impact === 'positive' ? 80 : factor.impact === 'negative' ? 30 : 50,
      impact: factor.impact,
      description: `${factor.feature}: ${String(factor.value)}`,
    })),
  };
}
