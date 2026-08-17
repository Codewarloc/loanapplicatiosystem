export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';
export type LoanDecision = 'APPROVED' | 'REJECTED' | 'PENDING' | 'REVIEW';
export type ApplicationStatus = 'PENDING' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED';
export type Gender = 'Male' | 'Female';
export type MaritalStatus = 'Single' | 'Married' | 'Divorced' | 'Widowed';
export type EducationLevel = 'High School' | 'Diploma' | "Bachelor's Degree" | "Master's Degree" | 'PhD';
export type EmploymentType = 'Full-time' | 'Part-time' | 'Self-employed' | 'Contract' | 'Unemployed' | 'Retired';
export type LoanPurpose =
  | 'Home Purchase'
  | 'Home Construction'
  | 'Business Expansion'
  | 'Education'
  | 'Vehicle Purchase'
  | 'Debt Consolidation'
  | 'Medical'
  | 'Agriculture'
  | 'Personal';
export type LoanType = 'Personal' | 'Business' | 'Mortgage' | 'Auto' | 'Education' | 'Agriculture';
export type CollateralType = 'Real Estate' | 'Vehicle' | 'Equipment' | 'Savings' | 'None';

export interface Applicant {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  age: number;
  gender: Gender;
  maritalStatus: MaritalStatus;
  dependents: number;
  education: EducationLevel;
  employmentType: EmploymentType;
  employer: string;
  jobTitle: string;
  employmentYears: number;
  monthlyIncome: number;
  otherIncome: number;
  monthlyExpenses: number;
  existingDebt: number;
  monthlyDebtPayment: number;
  savingsBalance: number;
  creditScore: number;
  previousLoans: number;
  loansRepaid: number;
  loansDefaulted: number;
  totalApplications: number;
  approvedLoans: number;
  rejectedLoans: number;
  lastApplicationDate: string;
  riskLevel: RiskLevel;
}

export interface LoanApplication {
  id: string;
  applicantId: string;
  applicantName: string;
  applicantEmail: string;
  loanId: string;
  loanPurpose: LoanPurpose;
  loanType: LoanType;
  requestedAmount: number;
  approvedAmount: number | null;
  loanTermMonths: number;
  interestRate: number;
  collateralValue: number;
  collateralType: CollateralType;
  creditScore: number;
  monthlyIncome: number;
  existingDebt: number;
  riskLevel: RiskLevel;
  riskScore: number;
  aiRecommendation: LoanDecision;
  confidence: number;
  status: ApplicationStatus;
  date: string;
  explanation: string;
}

export interface RiskFactor {
  label: string;
  score: number;
  impact: 'positive' | 'negative' | 'neutral';
  description: string;
}

export interface AIAnalysisResult {
  applicationId: string;
  decision: LoanDecision;
  riskLevel: RiskLevel;
  riskScore: number;
  confidence: number;
  recommendedAmount: number;
  recommendedTerm: number;
  explanation: string;
  positiveFactors: string[];
  riskFactors: string[];
  breakdown: {
    financialHealth: number;
    creditProfile: number;
    repaymentCapacity: number;
    debtBurden: number;
  };
  riskFactors: RiskFactor[];
}

export interface AIProcessingStage {
  label: string;
  description: string;
}

export interface DashboardStats {
  totalApplications: number;
  approvedLoans: number;
  rejectedLoans: number;
  pendingApplications: number;
  averageRiskScore: number;
  totalLoanAmount: number;
  approvalRate: number;
}

export interface AnalyticsSummary {
  approvalRate: number;
  rejectionRate: number;
  defaultRisk: number;
  averageLoanAmount: number;
  averageCreditScore: number;
  averageIncome: number;
  averageLoanTerm: number;
}

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  status: 'done' | 'current' | 'pending';
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message?: string;
}

export type DateRangeFilter = '7d' | '30d' | '3m' | '6m' | '1y';
