import type {
  Applicant,
  LoanApplication,
  DashboardStats,
  AnalyticsSummary,
  TimelineEvent,
  AIAnalysisResult,
} from '@/types';

export const applicants: Applicant[] = [
  {
    id: 'ap-001',
    fullName: 'Chukwuemeka Okafor',
    email: 'chukwuemeka.okafor@gmail.com',
    phone: '+234 803 555 1101',
    age: 34,
    gender: 'Male',
    maritalStatus: 'Married',
    dependents: 3,
    education: "Bachelor's Degree",
    employmentType: 'Full-time',
    employer: 'Nigerian National Petroleum Corporation',
    jobTitle: 'Operations Manager',
    employmentYears: 7,
    monthlyIncome: 850000,
    otherIncome: 120000,
    monthlyExpenses: 320000,
    existingDebt: 450000,
    monthlyDebtPayment: 65000,
    savingsBalance: 3200000,
    creditScore: 762,
    previousLoans: 4,
    loansRepaid: 4,
    loansDefaulted: 0,
    totalApplications: 4,
    approvedLoans: 4,
    rejectedLoans: 0,
    lastApplicationDate: '2026-07-28',
    riskLevel: 'LOW',
  },
  {
    id: 'ap-002',
    fullName: 'Aminat Ibrahim',
    email: 'aminat.ibrahim@yahoo.com',
    phone: '+234 805 555 1102',
    age: 29,
    gender: 'Female',
    maritalStatus: 'Single',
    dependents: 0,
    education: "Master's Degree",
    employmentType: 'Full-time',
    employer: 'Flutterwave Technologies',
    jobTitle: 'Senior Software Engineer',
    employmentYears: 4,
    monthlyIncome: 920000,
    otherIncome: 80000,
    monthlyExpenses: 240000,
    existingDebt: 180000,
    monthlyDebtPayment: 25000,
    savingsBalance: 2800000,
    creditScore: 781,
    previousLoans: 2,
    loansRepaid: 2,
    loansDefaulted: 0,
    totalApplications: 3,
    approvedLoans: 2,
    rejectedLoans: 0,
    lastApplicationDate: '2026-08-02',
    riskLevel: 'LOW',
  },
  {
    id: 'ap-003',
    fullName: 'Tunde Bakare',
    email: 'tunde.bakare@outlook.com',
    phone: '+234 802 555 1103',
    age: 41,
    gender: 'Male',
    maritalStatus: 'Married',
    dependents: 4,
    education: 'Diploma',
    employmentType: 'Self-employed',
    employer: 'Bakare & Sons Trading',
    jobTitle: 'Owner / Trader',
    employmentYears: 12,
    monthlyIncome: 420000,
    otherIncome: 30000,
    monthlyExpenses: 280000,
    existingDebt: 1200000,
    monthlyDebtPayment: 145000,
    savingsBalance: 450000,
    creditScore: 588,
    previousLoans: 6,
    loansRepaid: 4,
    loansDefaulted: 1,
    totalApplications: 7,
    approvedLoans: 4,
    rejectedLoans: 2,
    lastApplicationDate: '2026-07-15',
    riskLevel: 'HIGH',
  },
  {
    id: 'ap-004',
    fullName: 'Ngozi Eze',
    email: 'ngozi.eze@gmail.com',
    phone: '+234 807 555 1104',
    age: 36,
    gender: 'Female',
    maritalStatus: 'Married',
    dependents: 2,
    education: "Master's Degree",
    employmentType: 'Full-time',
    employer: 'First Bank of Nigeria',
    jobTitle: 'Risk Analyst',
    employmentYears: 9,
    monthlyIncome: 780000,
    otherIncome: 50000,
    monthlyExpenses: 290000,
    existingDebt: 320000,
    monthlyDebtPayment: 42000,
    savingsBalance: 2100000,
    creditScore: 745,
    previousLoans: 3,
    loansRepaid: 3,
    loansDefaulted: 0,
    totalApplications: 3,
    approvedLoans: 3,
    rejectedLoans: 0,
    lastApplicationDate: '2026-07-30',
    riskLevel: 'LOW',
  },
  {
    id: 'ap-005',
    fullName: 'Ibrahim Suleiman',
    email: 'ibrahim.suleiman@yahoo.com',
    phone: '+234 806 555 1105',
    age: 52,
    gender: 'Male',
    maritalStatus: 'Married',
    dependents: 5,
    education: "Bachelor's Degree",
    employmentType: 'Full-time',
    employer: 'Dangote Cement Plc',
    jobTitle: 'Plant Supervisor',
    employmentYears: 18,
    monthlyIncome: 650000,
    otherIncome: 40000,
    monthlyExpenses: 360000,
    existingDebt: 890000,
    monthlyDebtPayment: 110000,
    savingsBalance: 1800000,
    creditScore: 691,
    previousLoans: 5,
    loansRepaid: 4,
    loansDefaulted: 0,
    totalApplications: 5,
    approvedLoans: 4,
    rejectedLoans: 1,
    lastApplicationDate: '2026-06-22',
    riskLevel: 'MEDIUM',
  },
  {
    id: 'ap-006',
    fullName: 'Funke Adeyemi',
    email: 'funke.adeyemi@gmail.com',
    phone: '+234 809 555 1106',
    age: 27,
    gender: 'Female',
    maritalStatus: 'Single',
    dependents: 1,
    education: "Bachelor's Degree",
    employmentType: 'Contract',
    employer: 'Andela Nigeria',
    jobTitle: 'Product Designer',
    employmentYears: 2,
    monthlyIncome: 540000,
    otherIncome: 20000,
    monthlyExpenses: 210000,
    existingDebt: 240000,
    monthlyDebtPayment: 38000,
    savingsBalance: 620000,
    creditScore: 672,
    previousLoans: 1,
    loansRepaid: 1,
    loansDefaulted: 0,
    totalApplications: 2,
    approvedLoans: 1,
    rejectedLoans: 0,
    lastApplicationDate: '2026-08-05',
    riskLevel: 'MEDIUM',
  },
  {
    id: 'ap-007',
    fullName: 'Yusuf Mohammed',
    email: 'yusuf.mohammed@outlook.com',
    phone: '+234 803 555 1107',
    age: 45,
    gender: 'Male',
    maritalStatus: 'Divorced',
    dependents: 2,
    education: 'High School',
    employmentType: 'Self-employed',
    employer: 'Mohammed Transport Services',
    jobTitle: 'Fleet Operator',
    employmentYears: 8,
    monthlyIncome: 380000,
    otherIncome: 15000,
    monthlyExpenses: 260000,
    existingDebt: 1650000,
    monthlyDebtPayment: 175000,
    savingsBalance: 180000,
    creditScore: 542,
    previousLoans: 7,
    loansRepaid: 4,
    loansDefaulted: 2,
    totalApplications: 8,
    approvedLoans: 4,
    rejectedLoans: 3,
    lastApplicationDate: '2026-07-18',
    riskLevel: 'HIGH',
  },
  {
    id: 'ap-008',
    fullName: 'Blessing Nwosu',
    email: 'blessing.nwosu@gmail.com',
    phone: '+234 805 555 1108',
    age: 31,
    gender: 'Female',
    maritalStatus: 'Married',
    dependents: 2,
    education: "Master's Degree",
    employmentType: 'Full-time',
    employer: 'Access Bank Plc',
    jobTitle: 'Branch Manager',
    employmentYears: 6,
    monthlyIncome: 720000,
    otherIncome: 60000,
    monthlyExpenses: 270000,
    existingDebt: 410000,
    monthlyDebtPayment: 55000,
    savingsBalance: 2400000,
    creditScore: 728,
    previousLoans: 3,
    loansRepaid: 3,
    loansDefaulted: 0,
    totalApplications: 3,
    approvedLoans: 3,
    rejectedLoans: 0,
    lastApplicationDate: '2026-07-25',
    riskLevel: 'LOW',
  },
  {
    id: 'ap-009',
    fullName: 'Samuel Ogundimu',
    email: 'samuel.ogundimu@yahoo.com',
    phone: '+234 802 555 1109',
    age: 38,
    gender: 'Male',
    maritalStatus: 'Married',
    dependents: 3,
    education: "Bachelor's Degree",
    employmentType: 'Full-time',
    employer: 'Lagos State Government',
    jobTitle: 'Civil Engineer',
    employmentYears: 10,
    monthlyIncome: 610000,
    otherIncome: 35000,
    monthlyExpenses: 300000,
    existingDebt: 680000,
    monthlyDebtPayment: 88000,
    savingsBalance: 1200000,
    creditScore: 704,
    previousLoans: 4,
    loansRepaid: 3,
    loansDefaulted: 0,
    totalApplications: 4,
    approvedLoans: 3,
    rejectedLoans: 1,
    lastApplicationDate: '2026-07-12',
    riskLevel: 'MEDIUM',
  },
  {
    id: 'ap-010',
    fullName: 'Fatima Bello',
    email: 'fatima.bello@gmail.com',
    phone: '+234 807 555 1110',
    age: 24,
    gender: 'Female',
    maritalStatus: 'Single',
    dependents: 0,
    education: "Bachelor's Degree",
    employmentType: 'Full-time',
    employer: 'Paystack',
    jobTitle: 'Marketing Associate',
    employmentYears: 1,
    monthlyIncome: 480000,
    otherIncome: 10000,
    monthlyExpenses: 190000,
    existingDebt: 120000,
    monthlyDebtPayment: 18000,
    savingsBalance: 540000,
    creditScore: 698,
    previousLoans: 1,
    loansRepaid: 1,
    loansDefaulted: 0,
    totalApplications: 1,
    approvedLoans: 1,
    rejectedLoans: 0,
    lastApplicationDate: '2026-08-08',
    riskLevel: 'MEDIUM',
  },
  {
    id: 'ap-011',
    fullName: 'Emeka Obi',
    email: 'emeka.obi@outlook.com',
    phone: '+234 806 555 1111',
    age: 48,
    gender: 'Male',
    maritalStatus: 'Married',
    dependents: 4,
    education: 'Diploma',
    employmentType: 'Self-employed',
    employer: 'Obi Farms & Agro-Allied',
    jobTitle: 'Agricultural Entrepreneur',
    employmentYears: 15,
    monthlyIncome: 520000,
    otherIncome: 45000,
    monthlyExpenses: 340000,
    existingDebt: 980000,
    monthlyDebtPayment: 125000,
    savingsBalance: 900000,
    creditScore: 615,
    previousLoans: 6,
    loansRepaid: 5,
    loansDefaulted: 1,
    totalApplications: 6,
    approvedLoans: 4,
    rejectedLoans: 2,
    lastApplicationDate: '2026-06-30',
    riskLevel: 'MEDIUM',
  },
  {
    id: 'ap-012',
    fullName: 'Zainab Yusuf',
    email: 'zainab.yusuf@gmail.com',
    phone: '+234 809 555 1112',
    age: 33,
    gender: 'Female',
    maritalStatus: 'Married',
    dependents: 3,
    education: "Master's Degree",
    employmentType: 'Full-time',
    employer: 'MTN Nigeria',
    jobTitle: 'Network Operations Lead',
    employmentYears: 8,
    monthlyIncome: 880000,
    otherIncome: 70000,
    monthlyExpenses: 310000,
    existingDebt: 260000,
    monthlyDebtPayment: 36000,
    savingsBalance: 3500000,
    creditScore: 774,
    previousLoans: 3,
    loansRepaid: 3,
    loansDefaulted: 0,
    totalApplications: 3,
    approvedLoans: 3,
    rejectedLoans: 0,
    lastApplicationDate: '2026-08-01',
    riskLevel: 'LOW',
  },
  {
    id: 'ap-013',
    fullName: 'Dayo Adewale',
    email: 'dayo.adewale@yahoo.com',
    phone: '+234 803 555 1113',
    age: 26,
    gender: 'Male',
    maritalStatus: 'Single',
    dependents: 0,
    education: "Bachelor's Degree",
    employmentType: 'Part-time',
    employer: 'Freelance / Upwork',
    jobTitle: 'Data Analyst',
    employmentYears: 2,
    monthlyIncome: 320000,
    otherIncome: 25000,
    monthlyExpenses: 200000,
    existingDebt: 380000,
    monthlyDebtPayment: 52000,
    savingsBalance: 210000,
    creditScore: 631,
    previousLoans: 2,
    loansRepaid: 1,
    loansDefaulted: 0,
    totalApplications: 2,
    approvedLoans: 1,
    rejectedLoans: 1,
    lastApplicationDate: '2026-07-20',
    riskLevel: 'HIGH',
  },
  {
    id: 'ap-014',
    fullName: 'Grace Okonkwo',
    email: 'grace.okonkwo@gmail.com',
    phone: '+234 805 555 1114',
    age: 39,
    gender: 'Female',
    maritalStatus: 'Widowed',
    dependents: 3,
    education: "Bachelor's Degree",
    employmentType: 'Full-time',
    employer: 'Guaranty Trust Bank',
    jobTitle: 'Compliance Officer',
    employmentYears: 11,
    monthlyIncome: 690000,
    otherIncome: 30000,
    monthlyExpenses: 280000,
    existingDebt: 350000,
    monthlyDebtPayment: 48000,
    savingsBalance: 1900000,
    creditScore: 736,
    previousLoans: 4,
    loansRepaid: 4,
    loansDefaulted: 0,
    totalApplications: 4,
    approvedLoans: 4,
    rejectedLoans: 0,
    lastApplicationDate: '2026-07-22',
    riskLevel: 'LOW',
  },
  {
    id: 'ap-015',
    fullName: 'Kunle Sanusi',
    email: 'kunle.sanusi@outlook.com',
    phone: '+234 802 555 1115',
    age: 43,
    gender: 'Male',
    maritalStatus: 'Married',
    dependents: 4,
    education: 'High School',
    employmentType: 'Self-employed',
    employer: 'Sanusi Auto Workshop',
    jobTitle: 'Auto Mechanic / Owner',
    employmentYears: 14,
    monthlyIncome: 290000,
    otherIncome: 12000,
    monthlyExpenses: 230000,
    existingDebt: 1450000,
    monthlyDebtPayment: 160000,
    savingsBalance: 120000,
    creditScore: 498,
    previousLoans: 8,
    loansRepaid: 4,
    loansDefaulted: 3,
    totalApplications: 9,
    approvedLoans: 4,
    rejectedLoans: 4,
    lastApplicationDate: '2026-07-05',
    riskLevel: 'HIGH',
  },
];

const loanIds = [
  'LN-2026-0341',
  'LN-2026-0342',
  'LN-2026-0343',
  'LN-2026-0344',
  'LN-2026-0345',
  'LN-2026-0346',
  'LN-2026-0347',
  'LN-2026-0348',
  'LN-2026-0349',
  'LN-2026-0350',
  'LN-2026-0351',
  'LN-2026-0352',
  'LN-2026-0353',
  'LN-2026-0354',
  'LN-2026-0355',
  'LN-2026-0356',
  'LN-2026-0357',
  'LN-2026-0358',
];

const purposes = [
  'Home Purchase',
  'Business Expansion',
  'Vehicle Purchase',
  'Education',
  'Debt Consolidation',
  'Home Construction',
  'Medical',
  'Agriculture',
  'Personal',
] as const;

const loanTypes = ['Personal', 'Business', 'Mortgage', 'Auto', 'Education', 'Agriculture'] as const;

const collateralTypes = ['Real Estate', 'Vehicle', 'Equipment', 'Savings', 'None'] as const;

interface RawApp {
  idx: number;
  applicantIdx: number;
  purpose: (typeof purposes)[number];
  loanType: (typeof loanTypes)[number];
  amount: number;
  term: number;
  rate: number;
  collateralValue: number;
  collateralType: (typeof collateralTypes)[number];
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  riskScore: number;
  recommendation: 'APPROVED' | 'REJECTED' | 'PENDING' | 'REVIEW';
  confidence: number;
  status: 'PENDING' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED';
  date: string;
  explanation: string;
  approvedAmount: number | null;
}

const rawApplications: RawApp[] = [
  {
    idx: 0,
    applicantIdx: 0,
    purpose: 'Home Purchase',
    loanType: 'Mortgage',
    amount: 15000000,
    term: 240,
    rate: 18.5,
    collateralValue: 22000000,
    collateralType: 'Real Estate',
    riskLevel: 'LOW',
    riskScore: 14,
    recommendation: 'APPROVED',
    confidence: 96.2,
    status: 'APPROVED',
    date: '2026-07-28',
    explanation:
      'Strong repayment capacity, healthy credit history, low debt-to-income ratio and substantial savings contributed positively to the classification.',
    approvedAmount: 15000000,
  },
  {
    idx: 1,
    applicantIdx: 1,
    purpose: 'Vehicle Purchase',
    loanType: 'Auto',
    amount: 4500000,
    term: 48,
    rate: 15.0,
    collateralValue: 4500000,
    collateralType: 'Vehicle',
    riskLevel: 'LOW',
    riskScore: 18,
    recommendation: 'APPROVED',
    confidence: 94.6,
    status: 'APPROVED',
    date: '2026-08-02',
    explanation:
      'Stable high income, excellent credit profile and minimal existing debt indicate strong repayment capacity.',
    approvedAmount: 4500000,
  },
  {
    idx: 2,
    applicantIdx: 2,
    purpose: 'Business Expansion',
    loanType: 'Business',
    amount: 8000000,
    term: 36,
    rate: 22.0,
    collateralValue: 3000000,
    collateralType: 'Equipment',
    riskLevel: 'HIGH',
    riskScore: 78,
    recommendation: 'REJECTED',
    confidence: 88.1,
    status: 'REJECTED',
    date: '2026-07-15',
    explanation:
      'Elevated debt-to-income ratio, a previous default and volatile self-employed income significantly increase repayment risk.',
    approvedAmount: null,
  },
  {
    idx: 3,
    applicantIdx: 3,
    purpose: 'Home Construction',
    loanType: 'Mortgage',
    amount: 12000000,
    term: 180,
    rate: 17.0,
    collateralValue: 18000000,
    collateralType: 'Real Estate',
    riskLevel: 'LOW',
    riskScore: 16,
    recommendation: 'APPROVED',
    confidence: 95.8,
    status: 'APPROVED',
    date: '2026-07-30',
    explanation:
      'Excellent credit score, stable banking-sector income and adequate collateral support a low-risk approval.',
    approvedAmount: 12000000,
  },
  {
    idx: 4,
    applicantIdx: 4,
    purpose: 'Education',
    loanType: 'Education',
    amount: 3500000,
    term: 60,
    rate: 12.5,
    collateralValue: 0,
    collateralType: 'None',
    riskLevel: 'MEDIUM',
    riskScore: 52,
    recommendation: 'APPROVED',
    confidence: 81.4,
    status: 'APPROVED',
    date: '2026-06-22',
    explanation:
      'Long employment tenure offsets moderate debt levels; recommended amount adjusted to protect repayment capacity.',
    approvedAmount: 3000000,
  },
  {
    idx: 5,
    applicantIdx: 5,
    purpose: 'Personal',
    loanType: 'Personal',
    amount: 2500000,
    term: 24,
    rate: 19.0,
    collateralValue: 0,
    collateralType: 'None',
    riskLevel: 'MEDIUM',
    riskScore: 48,
    recommendation: 'REVIEW',
    confidence: 79.2,
    status: 'UNDER_REVIEW',
    date: '2026-08-05',
    explanation:
      'Short contract tenure and limited credit history require manual review before a final decision.',
    approvedAmount: null,
  },
  {
    idx: 6,
    applicantIdx: 6,
    purpose: 'Debt Consolidation',
    loanType: 'Personal',
    amount: 5000000,
    term: 36,
    rate: 24.0,
    collateralValue: 1500000,
    collateralType: 'Vehicle',
    riskLevel: 'HIGH',
    riskScore: 84,
    recommendation: 'REJECTED',
    confidence: 91.3,
    status: 'REJECTED',
    date: '2026-07-18',
    explanation:
      'Two prior defaults, high existing debt burden and irregular income make repayment highly uncertain.',
    approvedAmount: null,
  },
  {
    idx: 7,
    applicantIdx: 7,
    purpose: 'Home Purchase',
    loanType: 'Mortgage',
    amount: 18000000,
    term: 240,
    rate: 16.5,
    collateralValue: 26000000,
    collateralType: 'Real Estate',
    riskLevel: 'LOW',
    riskScore: 12,
    recommendation: 'APPROVED',
    confidence: 97.1,
    status: 'APPROVED',
    date: '2026-07-25',
    explanation:
      'Strong banking-sector income, excellent credit history and substantial collateral underpin a low-risk approval.',
    approvedAmount: 18000000,
  },
  {
    idx: 8,
    applicantIdx: 8,
    purpose: 'Vehicle Purchase',
    loanType: 'Auto',
    amount: 3800000,
    term: 48,
    rate: 16.0,
    collateralValue: 3800000,
    collateralType: 'Vehicle',
    riskLevel: 'MEDIUM',
    riskScore: 45,
    recommendation: 'APPROVED',
    confidence: 83.7,
    status: 'APPROVED',
    date: '2026-07-12',
    explanation:
      'Stable public-sector income and adequate credit score support approval with a slightly reduced amount.',
    approvedAmount: 3500000,
  },
  {
    idx: 9,
    applicantIdx: 9,
    purpose: 'Personal',
    loanType: 'Personal',
    amount: 1500000,
    term: 12,
    rate: 20.0,
    collateralValue: 0,
    collateralType: 'None',
    riskLevel: 'MEDIUM',
    riskScore: 41,
    recommendation: 'APPROVED',
    confidence: 85.0,
    status: 'APPROVED',
    date: '2026-08-08',
    explanation:
      'Good credit score and low debt, but short employment history warrants a conservative approved amount.',
    approvedAmount: 1200000,
  },
  {
    idx: 10,
    applicantIdx: 10,
    purpose: 'Agriculture',
    loanType: 'Agriculture',
    amount: 6000000,
    term: 36,
    rate: 14.0,
    collateralValue: 4000000,
    collateralType: 'Equipment',
    riskLevel: 'MEDIUM',
    riskScore: 56,
    recommendation: 'REVIEW',
    confidence: 77.5,
    status: 'UNDER_REVIEW',
    date: '2026-06-30',
    explanation:
      'Seasonal agricultural income variability and a previous default require manual risk assessment.',
    approvedAmount: null,
  },
  {
    idx: 11,
    applicantIdx: 11,
    purpose: 'Home Construction',
    loanType: 'Mortgage',
    amount: 14000000,
    term: 180,
    rate: 17.5,
    collateralValue: 20000000,
    collateralType: 'Real Estate',
    riskLevel: 'LOW',
    riskScore: 13,
    recommendation: 'APPROVED',
    confidence: 96.8,
    status: 'APPROVED',
    date: '2026-08-01',
    explanation:
      'High stable income, excellent credit and significant savings indicate very low repayment risk.',
    approvedAmount: 14000000,
  },
  {
    idx: 12,
    applicantIdx: 12,
    purpose: 'Business Expansion',
    loanType: 'Business',
    amount: 3000000,
    term: 24,
    rate: 23.0,
    collateralValue: 500000,
    collateralType: 'Savings',
    riskLevel: 'HIGH',
    riskScore: 72,
    recommendation: 'REJECTED',
    confidence: 86.9,
    status: 'REJECTED',
    date: '2026-07-20',
    explanation:
      'Irregular part-time income, high debt-to-income ratio and limited collateral make approval inadvisable.',
    approvedAmount: null,
  },
  {
    idx: 13,
    applicantIdx: 13,
    purpose: 'Education',
    loanType: 'Education',
    amount: 4200000,
    term: 60,
    rate: 13.0,
    collateralValue: 0,
    collateralType: 'None',
    riskLevel: 'LOW',
    riskScore: 22,
    recommendation: 'APPROVED',
    confidence: 93.4,
    status: 'APPROVED',
    date: '2026-07-22',
    explanation:
      'Stable income, excellent credit history and low debt burden support a confident approval.',
    approvedAmount: 4200000,
  },
  {
    idx: 14,
    applicantIdx: 14,
    purpose: 'Debt Consolidation',
    loanType: 'Personal',
    amount: 4000000,
    term: 36,
    rate: 25.0,
    collateralValue: 800000,
    collateralType: 'Vehicle',
    riskLevel: 'HIGH',
    riskScore: 88,
    recommendation: 'REJECTED',
    confidence: 92.7,
    status: 'REJECTED',
    date: '2026-07-05',
    explanation:
      'Multiple defaults, severe debt burden and low irregular income indicate very high repayment risk.',
    approvedAmount: null,
  },
  {
    idx: 15,
    applicantIdx: 0,
    purpose: 'Vehicle Purchase',
    loanType: 'Auto',
    amount: 5200000,
    term: 48,
    rate: 15.5,
    collateralValue: 5200000,
    collateralType: 'Vehicle',
    riskLevel: 'LOW',
    riskScore: 17,
    recommendation: 'APPROVED',
    confidence: 95.0,
    status: 'APPROVED',
    date: '2026-06-18',
    explanation:
      'Returning applicant with flawless repayment history; strong income and low debt confirm low risk.',
    approvedAmount: 5200000,
  },
  {
    idx: 16,
    applicantIdx: 5,
    purpose: 'Medical',
    loanType: 'Personal',
    amount: 1800000,
    term: 18,
    rate: 19.5,
    collateralValue: 0,
    collateralType: 'None',
    riskLevel: 'MEDIUM',
    riskScore: 50,
    recommendation: 'PENDING',
    confidence: 0,
    status: 'PENDING',
    date: '2026-08-10',
    explanation: 'Application received and queued for AI analysis.',
    approvedAmount: null,
  },
  {
    idx: 17,
    applicantIdx: 9,
    purpose: 'Business Expansion',
    loanType: 'Business',
    amount: 6000000,
    term: 36,
    rate: 21.0,
    collateralValue: 1200000,
    collateralType: 'Savings',
    riskLevel: 'MEDIUM',
    riskScore: 54,
    recommendation: 'PENDING',
    confidence: 0,
    status: 'PENDING',
    date: '2026-08-12',
    explanation: 'Application received and queued for AI analysis.',
    approvedAmount: null,
  },
];

export const applications: LoanApplication[] = rawApplications.map((r) => {
  const applicant = applicants[r.applicantIdx];
  return {
    id: `app-${String(r.idx + 1).padStart(3, '0')}`,
    applicantId: applicant.id,
    applicantName: applicant.fullName,
    applicantEmail: applicant.email,
    loanId: loanIds[r.idx],
    loanPurpose: r.purpose,
    loanType: r.loanType,
    requestedAmount: r.amount,
    approvedAmount: r.approvedAmount,
    loanTermMonths: r.term,
    interestRate: r.rate,
    collateralValue: r.collateralValue,
    collateralType: r.collateralType,
    creditScore: applicant.creditScore,
    monthlyIncome: applicant.monthlyIncome,
    existingDebt: applicant.existingDebt,
    riskLevel: r.riskLevel,
    riskScore: r.riskScore,
    aiRecommendation: r.recommendation,
    confidence: r.confidence,
    status: r.status,
    date: r.date,
    explanation: r.explanation,
  };
});

export function getDashboardStats(): DashboardStats {
  const total = applications.length;
  const approved = applications.filter((a) => a.status === 'APPROVED').length;
  const rejected = applications.filter((a) => a.status === 'REJECTED').length;
  const pending = applications.filter(
    (a) => a.status === 'PENDING' || a.status === 'UNDER_REVIEW'
  ).length;
  const avgRisk =
    applications.reduce((s, a) => s + a.riskScore, 0) / total;
  const totalAmount = applications
    .filter((a) => a.approvedAmount)
    .reduce((s, a) => s + (a.approvedAmount as number), 0);
  return {
    totalApplications: total,
    approvedLoans: approved,
    rejectedLoans: rejected,
    pendingApplications: pending,
    averageRiskScore: Math.round(avgRisk * 10) / 10,
    totalLoanAmount: totalAmount,
    approvalRate: Math.round((approved / total) * 1000) / 10,
  };
}

export function getAnalyticsSummary(): AnalyticsSummary {
  const total = applications.length;
  const approved = applications.filter((a) => a.status === 'APPROVED').length;
  const rejected = applications.filter((a) => a.status === 'REJECTED').length;
  const avgAmount =
    applications.reduce((s, a) => s + a.requestedAmount, 0) / total;
  const avgCredit =
    applications.reduce((s, a) => s + a.creditScore, 0) / total;
  const avgIncome =
    applications.reduce((s, a) => s + a.monthlyIncome, 0) / total;
  const avgTerm =
    applications.reduce((s, a) => s + a.loanTermMonths, 0) / total;
  const highRisk = applications.filter((a) => a.riskLevel === 'HIGH').length;
  return {
    approvalRate: Math.round((approved / total) * 1000) / 10,
    rejectionRate: Math.round((rejected / total) * 1000) / 10,
    defaultRisk: Math.round((highRisk / total) * 1000) / 10,
    averageLoanAmount: Math.round(avgAmount),
    averageCreditScore: Math.round(avgCredit),
    averageIncome: Math.round(avgIncome),
    averageLoanTerm: Math.round(avgTerm),
  };
}

export function getApplicationsOverTime() {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  return months.map((m, i) => ({
    month: m,
    applications: 8 + Math.round(Math.sin(i * 0.9) * 4) + i,
    approved: Math.max(2, Math.round((6 + Math.sin(i * 0.7) * 3 + i * 0.6))),
    rejected: Math.max(1, Math.round(2 + Math.cos(i * 0.8) * 1.5)),
  }));
}

export function getRiskDistribution() {
  const low = applications.filter((a) => a.riskLevel === 'LOW').length;
  const medium = applications.filter((a) => a.riskLevel === 'MEDIUM').length;
  const high = applications.filter((a) => a.riskLevel === 'HIGH').length;
  return [
    { name: 'Low Risk', value: low, color: '#10b981' },
    { name: 'Medium Risk', value: medium, color: '#f59e0b' },
    { name: 'High Risk', value: high, color: '#f43f5e' },
  ];
}

export function getApprovalVsRejection() {
  const approved = applications.filter((a) => a.status === 'APPROVED').length;
  const rejected = applications.filter((a) => a.status === 'REJECTED').length;
  const pending = applications.filter(
    (a) => a.status === 'PENDING' || a.status === 'UNDER_REVIEW'
  ).length;
  return [
    { name: 'Approved', value: approved, color: '#10b981' },
    { name: 'Rejected', value: rejected, color: '#f43f5e' },
    { name: 'Pending', value: pending, color: '#f59e0b' },
  ];
}

export function getLoanAmountDistribution() {
  const buckets = [
    { name: '< ₦2M', min: 0, max: 2000000, value: 0 },
    { name: '₦2M–5M', min: 2000000, max: 5000000, value: 0 },
    { name: '₦5M–10M', min: 5000000, max: 10000000, value: 0 },
    { name: '₦10M–15M', min: 10000000, max: 15000000, value: 0 },
    { name: '> ₦15M', min: 15000000, max: Infinity, value: 0 },
  ];
  for (const a of applications) {
    for (const b of buckets) {
      if (a.requestedAmount >= b.min && a.requestedAmount < b.max) {
        b.value++;
        break;
      }
    }
  }
  return buckets.map(({ name, value }) => ({ name, value }));
}

export function getMonthlyLoanVolume() {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
  return months.map((m, i) => ({
    month: m,
    volume: Math.round((15 + i * 4 + Math.sin(i) * 3) * 1000000),
  }));
}

export function getRiskTrend() {
  const months = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
  return months.map((m, i) => ({
    month: m,
    low: 30 + Math.round(Math.sin(i * 0.5) * 5) + i,
    medium: 40 + Math.round(Math.cos(i * 0.6) * 4),
    high: 20 + Math.round(Math.sin(i * 0.4) * 3) - Math.round(i * 0.8),
  }));
}

export function getApprovalRateTrend() {
  const months = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
  return months.map((m, i) => ({
    month: m,
    rate: Math.round((62 + i * 2 + Math.sin(i) * 3) * 10) / 10,
  }));
}

export function getLoanAmountTrend() {
  const months = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
  return months.map((m, i) => ({
    month: m,
    amount: Math.round((4 + i * 0.8 + Math.sin(i) * 0.5) * 1000000),
  }));
}

export function getIncomeDistribution() {
  const buckets = [
    { name: '< ₦400K', min: 0, max: 400000, value: 0 },
    { name: '₦400–600K', min: 400000, max: 600000, value: 0 },
    { name: '₦600–800K', min: 600000, max: 800000, value: 0 },
    { name: '₦800K–1M', min: 800000, max: 1000000, value: 0 },
    { name: '> ₦1M', min: 1000000, max: Infinity, value: 0 },
  ];
  for (const a of applicants) {
    for (const b of buckets) {
      if (a.monthlyIncome >= b.min && a.monthlyIncome < b.max) {
        b.value++;
        break;
      }
    }
  }
  return buckets.map(({ name, value }) => ({ name, value }));
}

export function getCreditScoreDistribution() {
  const buckets = [
    { name: '300–580', min: 300, max: 580, value: 0 },
    { name: '580–650', min: 580, max: 650, value: 0 },
    { name: '650–700', min: 650, max: 700, value: 0 },
    { name: '700–750', min: 700, max: 750, value: 0 },
    { name: '750–850', min: 750, max: 850, value: 0 },
  ];
  for (const a of applicants) {
    for (const b of buckets) {
      if (a.creditScore >= b.min && a.creditScore < b.max) {
        b.value++;
        break;
      }
    }
  }
  return buckets.map(({ name, value }) => ({ name, value }));
}

export function getRiskFactors() {
  return [
    { label: 'Credit Score', score: 82, impact: 'positive' as const, description: 'Strong average credit profile across applicants.' },
    { label: 'Debt-to-Income', score: 64, impact: 'negative' as const, description: 'Moderate debt burden for some applicants.' },
    { label: 'Income Stability', score: 91, impact: 'positive' as const, description: 'Consistent income across reviewed applications.' },
    { label: 'Repayment History', score: 87, impact: 'positive' as const, description: 'High ratio of repaid to total loans.' },
    { label: 'Savings', score: 73, impact: 'positive' as const, description: 'Adequate savings buffers for most applicants.' },
  ];
}

export function getApplicationTimeline(applicationId: string): TimelineEvent[] {
  const app = applications.find((a) => a.id === applicationId);
  if (!app) return [];
  const done = app.status === 'APPROVED' || app.status === 'REJECTED';
  return [
    {
      date: app.date,
      title: 'Application Submitted',
      description: `${app.applicantName} submitted a ${app.loanType} loan application.`,
      status: 'done',
    },
    {
      date: app.date,
      title: 'Initial Validation',
      description: 'Applicant information and documents validated.',
      status: 'done',
    },
    {
      date: app.date,
      title: 'AI Risk Analysis',
      description: 'AI model evaluated financial profile and credit history.',
      status: 'done',
    },
    {
      date: done ? app.date : '',
      title: 'Decision Issued',
      description: done
        ? `Application ${app.status.toLowerCase()}.`
        : 'Awaiting final decision.',
      status: done ? 'done' : 'current',
    },
  ];
}

export function getAIAnalysisResult(applicationId: string): AIAnalysisResult {
  const app = applications.find((a) => a.id === applicationId);
  if (!app) {
    return {
      applicationId,
      decision: 'PENDING',
      riskLevel: 'MEDIUM',
      riskScore: 50,
      confidence: 0,
      recommendedAmount: 0,
      recommendedTerm: 0,
      explanation: 'Application not found.',
      positiveFactors: [],
      riskFactors: [],
      breakdown: { financialHealth: 0, creditProfile: 0, repaymentCapacity: 0, debtBurden: 0 },
    };
  }
  const applicant = applicants.find((a) => a.id === app.applicantId);
  const dti = applicant
    ? (applicant.monthlyDebtPayment / applicant.monthlyIncome) * 100
    : 50;
  const breakdown = {
    financialHealth: Math.min(99, Math.max(20, Math.round(100 - app.riskScore * 0.8))),
    creditProfile: Math.min(99, Math.max(20, Math.round((app.creditScore / 850) * 100))),
    repaymentCapacity: Math.min(99, Math.max(20, Math.round(100 - dti))),
    debtBurden: Math.min(99, Math.max(20, Math.round(100 - dti * 0.9))),
  };
  const positive: string[] = [];
  const risk: string[] = [];
  if (app.creditScore >= 700) positive.push('Strong credit score');
  if (applicant && applicant.employmentYears >= 5) positive.push('Stable employment history');
  if (applicant && applicant.loansDefaulted === 0) positive.push('No loan defaults');
  if (applicant && applicant.savingsBalance > 1000000) positive.push('Healthy savings balance');
  if (dti < 20) positive.push('Low debt-to-income ratio');

  if (app.requestedAmount > 10000000) risk.push('High requested loan amount');
  if (applicant && applicant.employmentYears < 3) risk.push('Short employment history');
  if (dti > 30) risk.push('Elevated debt-to-income ratio');
  if (applicant && applicant.loansDefaulted > 0) risk.push(`${applicant.loansDefaulted} previous default(s)`);
  if (app.creditScore < 650) risk.push('Below-average credit score');

  const riskFactorList = [
    { label: 'Credit Score', score: breakdown.creditProfile, impact: 'positive' as const, description: `Credit score of ${app.creditScore}.` },
    { label: 'Debt-to-Income', score: Math.round(100 - dti), impact: dti < 20 ? ('positive' as const) : ('negative' as const), description: `DTI ratio of ${Math.round(dti)}%.` },
    { label: 'Income Stability', score: breakdown.repaymentCapacity, impact: 'positive' as const, description: `Monthly income of ₦${app.monthlyIncome.toLocaleString()}.` },
    { label: 'Repayment History', score: applicant ? Math.round((applicant.loansRepaid / Math.max(1, applicant.previousLoans)) * 100) : 50, impact: 'positive' as const, description: `${applicant?.loansRepaid ?? 0} of ${applicant?.previousLoans ?? 0} loans repaid.` },
    { label: 'Savings', score: applicant ? Math.min(99, Math.round((applicant.savingsBalance / 3000000) * 100)) : 50, impact: 'positive' as const, description: `Savings of ₦${(applicant?.savingsBalance ?? 0).toLocaleString()}.` },
  ];

  return {
    applicationId: app.id,
    decision: app.aiRecommendation,
    riskLevel: app.riskLevel,
    riskScore: app.riskScore,
    confidence: app.confidence,
    recommendedAmount: app.approvedAmount ?? app.requestedAmount,
    recommendedTerm: app.loanTermMonths,
    explanation: app.explanation,
    positiveFactors: positive,
    riskFactors: riskFactorList,
    breakdown,
  };
}
