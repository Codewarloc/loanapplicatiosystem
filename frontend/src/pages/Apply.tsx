import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Brain,
  Building2,
  CheckCircle2,
  CreditCard,
  Home,
  PiggyBank,
  ShieldCheck,
  Wallet,
} from 'lucide-react';
import AIProcessingAnimation from '@/components/AIProcessingAnimation';
import DecisionCard from '@/components/DecisionCard';
import { getFullAnalysis } from '@/services/aiService';
import type { AIAnalysisResult } from '@/types';

const defaultForm = {
  age: 32,
  monthly_income: 280000,
  monthly_expenses: 95000,
  existing_debt: 250000,
  credit_score: 760,
  previous_loans: 2,
  loans_repaid: 2,
  loans_defaulted: 0,
  requested_loan_amount: 3500000,
  loan_term_months: 24,
  monthly_debt_payment: 50000,
  savings_balance: 2500000,
  employment_years: 6,
};

export default function Apply() {
  const [form, setForm] = useState(defaultForm);
  const [result, setResult] = useState<AIAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleChange = (field: keyof typeof defaultForm, value: string) => {
    const parsed = value === '' ? 0 : Number(value);
    setForm((prev) => ({ ...prev, [field]: Number.isFinite(parsed) ? parsed : 0 }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsAnalyzing(true);
    setResult(null);

    const analysis = await getFullAnalysis(`loan-${Date.now()}`, {
      age: form.age,
      monthly_income: form.monthly_income,
      monthly_expenses: form.monthly_expenses,
      existing_debt: form.existing_debt,
      credit_score: form.credit_score,
      previous_loans: form.previous_loans,
      loans_repaid: form.loans_repaid,
      loans_defaulted: form.loans_defaulted,
      requested_loan_amount: form.requested_loan_amount,
      loan_term_months: form.loan_term_months,
      monthly_debt_payment: form.monthly_debt_payment,
      savings_balance: form.savings_balance,
      employment_years: form.employment_years,
    });

    setResult(analysis);
  };

  return (
    <div className="min-h-screen bg-ink-950 px-4 py-8 text-slate-200 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-sm text-slate-200 hover:text-white">
            <Home className="h-4 w-4" />
            Back to homepage
          </Link>
          <div className="hidden items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/10 px-3 py-1.5 text-sm text-brand-200 md:flex">
            <Brain className="h-4 w-4" />
            AI-backed classification
          </div>
        </div>

        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-400">Loan Application</p>
            <h1 className="mt-2 text-3xl font-bold text-white">Apply for a loan</h1>
          </div>
        </div>

        {!isAnalyzing && result ? (
          <div className="space-y-6">
            <DecisionCard result={result} />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setResult(null);
                  setForm(defaultForm);
                }}
                className="btn-primary"
              >
                Apply again <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : isAnalyzing ? (
          <AIProcessingAnimation onComplete={() => setIsAnalyzing(false)} />
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <motion.form
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              className="glass-strong space-y-6 p-6"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 text-brand-300">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-white">Applicant profile</p>
                  <p className="text-sm text-slate-400">Share the details the AI model evaluates.</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2 text-sm text-slate-300">
                  <span>Age</span>
                  <input type="number" value={form.age} onChange={(e) => handleChange('age', e.target.value)} className="input-base" />
                </label>

                <label className="space-y-2 text-sm text-slate-300">
                  <span>Employment years</span>
                  <input type="number" value={form.employment_years} onChange={(e) => handleChange('employment_years', e.target.value)} className="input-base" />
                </label>

                <label className="space-y-2 text-sm text-slate-300">
                  <span>Monthly income</span>
                  <input type="number" value={form.monthly_income} onChange={(e) => handleChange('monthly_income', e.target.value)} className="input-base" />
                </label>

                <label className="space-y-2 text-sm text-slate-300">
                  <span>Monthly expenses</span>
                  <input type="number" value={form.monthly_expenses} onChange={(e) => handleChange('monthly_expenses', e.target.value)} className="input-base" />
                </label>

                <label className="space-y-2 text-sm text-slate-300">
                  <span>Existing debt</span>
                  <input type="number" value={form.existing_debt} onChange={(e) => handleChange('existing_debt', e.target.value)} className="input-base" />
                </label>

                <label className="space-y-2 text-sm text-slate-300">
                  <span>Monthly debt payment</span>
                  <input type="number" value={form.monthly_debt_payment} onChange={(e) => handleChange('monthly_debt_payment', e.target.value)} className="input-base" />
                </label>

                <label className="space-y-2 text-sm text-slate-300">
                  <span>Credit score</span>
                  <input type="number" value={form.credit_score} onChange={(e) => handleChange('credit_score', e.target.value)} className="input-base" />
                </label>

                <label className="space-y-2 text-sm text-slate-300">
                  <span>Savings balance</span>
                  <input type="number" value={form.savings_balance} onChange={(e) => handleChange('savings_balance', e.target.value)} className="input-base" />
                </label>

                <label className="space-y-2 text-sm text-slate-300">
                  <span>Previous loans</span>
                  <input type="number" value={form.previous_loans} onChange={(e) => handleChange('previous_loans', e.target.value)} className="input-base" />
                </label>

                <label className="space-y-2 text-sm text-slate-300">
                  <span>Loans repaid</span>
                  <input type="number" value={form.loans_repaid} onChange={(e) => handleChange('loans_repaid', e.target.value)} className="input-base" />
                </label>

                <label className="space-y-2 text-sm text-slate-300">
                  <span>Loans defaulted</span>
                  <input type="number" value={form.loans_defaulted} onChange={(e) => handleChange('loans_defaulted', e.target.value)} className="input-base" />
                </label>

                <label className="space-y-2 text-sm text-slate-300">
                  <span>Requested loan amount</span>
                  <input type="number" value={form.requested_loan_amount} onChange={(e) => handleChange('requested_loan_amount', e.target.value)} className="input-base" />
                </label>

                <label className="space-y-2 text-sm text-slate-300 md:col-span-2">
                  <span>Loan term (months)</span>
                  <input type="number" value={form.loan_term_months} onChange={(e) => handleChange('loan_term_months', e.target.value)} className="input-base" />
                </label>
              </div>

              <button type="submit" className="btn-primary w-full md:w-auto">
                Classify my loan
                <ArrowRight className="h-4 w-4" />
              </button>
            </motion.form>

            <div className="space-y-4">
              <div className="glass-strong p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">AI risk model</p>
                    <p className="text-sm text-slate-400">Evaluates credit, debt, income and repayment behaviour.</p>
                  </div>
                </div>
              </div>

              <div className="glass-strong space-y-4 p-5">
                <div className="flex items-center gap-3">
                  <Wallet className="h-5 w-5 text-brand-300" />
                  <span className="font-medium text-white">Loan summary</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                    <p className="text-slate-400">Credit score</p>
                    <p className="mt-1 text-lg font-semibold text-white">{form.credit_score}</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                    <p className="text-slate-400">Requested</p>
                    <p className="mt-1 text-lg font-semibold text-white">₦{form.requested_loan_amount.toLocaleString()}</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                    <p className="text-slate-400">DTI</p>
                    <p className="mt-1 text-lg font-semibold text-white">
                      {form.monthly_debt_payment && form.monthly_income
                        ? Math.round((form.monthly_debt_payment / form.monthly_income) * 100)
                        : 0}%
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                    <p className="text-slate-400">Savings</p>
                    <p className="mt-1 text-lg font-semibold text-white">₦{form.savings_balance.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="glass-strong p-5">
                <div className="mb-3 flex items-center gap-3">
                  <PiggyBank className="h-5 w-5 text-amber-300" />
                  <span className="font-medium text-white">What gets checked</span>
                </div>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-center gap-2"><Building2 className="h-4 w-4 text-brand-300" /> Income stability</li>
                  <li className="flex items-center gap-2"><CreditCard className="h-4 w-4 text-brand-300" /> Credit history</li>
                  <li className="flex items-center gap-2"><Wallet className="h-4 w-4 text-brand-300" /> Debt-to-income ratio</li>
                  <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-brand-300" /> Repayment capacity</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
