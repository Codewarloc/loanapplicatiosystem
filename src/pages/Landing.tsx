import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Brain,
  ShieldCheck,
  Activity,
  Zap,
  ArrowRight,
  TrendingUp,
  Lock,
  Eye,
  CheckCircle2,
  BarChart3,
  Sparkles,
  LineChart,
  Users,
} from 'lucide-react';
import { ProgressRing } from '@/components/ui/ProgressRing';

const features = [
  { icon: Brain, title: 'AI-Powered Analysis', desc: 'Advanced ML models evaluate applicant data in seconds, not days.' },
  { icon: ShieldCheck, title: 'Automated Risk Scoring', desc: 'Get instant risk classification from Low to High with confidence scores.' },
  { icon: Activity, title: 'Real-time Monitoring', desc: 'Track every application through the pipeline with live status updates.' },
  { icon: BarChart3, title: 'Intelligent Insights', desc: 'Deep financial analytics and lending trends at your fingertips.' },
];

const steps = [
  { num: '01', title: 'Submit Application', desc: 'Applicant fills a guided multi-step form with financial and credit details.' },
  { num: '02', title: 'AI Analysis', desc: 'Our model evaluates credit history, income stability, and debt burden.' },
  { num: '03', title: 'Risk Classification', desc: 'Applicant is classified as Low, Medium, or High risk with a score.' },
  { num: '04', title: 'Decision', desc: 'Receive an approval recommendation with a full explanation and confidence score.' },
];

const riskClasses = [
  { level: 'LOW', color: '#10b981', score: 18, desc: 'Strong repayment capacity, healthy credit history', pct: '68%' },
  { level: 'MEDIUM', color: '#f59e0b', score: 52, desc: 'Moderate risk indicators, manual review suggested', pct: '22%' },
  { level: 'HIGH', color: '#f43f5e', score: 84, desc: 'Elevated default probability, caution advised', pct: '10%' },
];

const stats = [
  { value: '48,200+', label: 'Applications Analyzed' },
  { value: '94.6%', label: 'Model Accuracy' },
  { value: '< 3s', label: 'Average Decision Time' },
  { value: '₦2.4B', label: 'Loans Processed' },
];

const securityFeatures = [
  { icon: Lock, title: 'Bank-grade Encryption', desc: '256-bit AES encryption for all sensitive data' },
  { icon: Eye, title: 'Transparent AI', desc: 'Every decision comes with a full explanation' },
  { icon: ShieldCheck, title: 'Audit Trail', desc: 'Complete decision history for compliance' },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-ink-950">
      {/* Nav */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/[0.06] bg-ink-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-violet shadow-lg shadow-brand-900/50">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold text-white">LendAI</span>
            </div>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <a href="#how" className="text-sm text-slate-400 hover:text-white transition">How It Works</a>
            <a href="#risk" className="text-sm text-slate-400 hover:text-white transition">Risk Classification</a>
            <a href="#features" className="text-sm text-slate-400 hover:text-white transition">Features</a>
            <a href="#security" className="text-sm text-slate-400 hover:text-white transition">Security</a>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="hidden text-sm font-medium text-slate-300 hover:text-white sm:block">Sign In</Link>
            <Link to="/signup" className="hidden text-sm font-medium text-slate-300 hover:text-white sm:block">Create Account</Link>
            <Link to="/dashboard" className="btn-primary text-sm">Get Started <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-30" />
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-radial-glow blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/10 px-3 py-1.5 text-xs font-medium text-brand-300">
                <Sparkles className="h-3.5 w-3.5" />
                AI-Powered Lending Intelligence
              </div>
              <h1 className="mt-6 text-5xl font-bold leading-[1.1] text-white sm:text-6xl lg:text-7xl text-balance">
                AI-Powered <span className="gradient-text">Loan Decisions</span>
              </h1>
              <p className="mt-6 max-w-lg text-lg text-slate-400 text-balance">
                Make faster, smarter and more transparent lending decisions with intelligent risk classification.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/apply" className="btn-primary">
                  Start New Application <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/signup" className="btn-ghost">
                  <BarChart3 className="h-4 w-4" /> Create Account
                </Link>
              </div>
              <div className="mt-10 flex items-center gap-6 text-sm text-slate-500">
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> No credit check impact</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Instant results</div>
              </div>
            </motion.div>

            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="glass-strong gradient-border relative p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-rose-400/60" />
                    <div className="h-2.5 w-2.5 rounded-full bg-amber-400/60" />
                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-400/60" />
                  </div>
                  <span className="font-mono text-[10px] text-slate-500">lendai/analysis</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="glass p-4">
                    <p className="text-xs text-slate-500">AI Decision</p>
                    <p className="mt-1 text-2xl font-bold text-emerald-400">APPROVED</p>
                    <div className="mt-2 flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ width: 0 }}
                          animate={{ width: `${20 - i * 2}%` }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                          className="h-1.5 rounded-full bg-emerald-400/60"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="glass flex flex-col items-center p-4">
                    <ProgressRing value={94} size={80} strokeWidth={6} color="#10b981" label="Confidence" />
                  </div>
                  <div className="glass p-4">
                    <p className="text-xs text-slate-500">Risk Level</p>
                    <p className="mt-1 text-lg font-bold text-emerald-400">LOW RISK</p>
                    <p className="mt-1 text-2xl font-bold text-white">18<span className="text-sm text-slate-500">/100</span></p>
                  </div>
                  <div className="glass p-4">
                    <p className="text-xs text-slate-500">Recommended</p>
                    <p className="mt-1 text-lg font-bold text-white">₦1.5M</p>
                    <p className="mt-1 text-xs text-slate-400">24 Months</p>
                  </div>
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3"
                >
                  <Brain className="h-4 w-4 text-emerald-400" />
                  <p className="text-xs text-slate-300">Strong repayment capacity and healthy credit history detected.</p>
                </motion.div>
              </div>
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute -right-4 -top-4 glass-strong flex items-center gap-2 p-3"
              >
                <TrendingUp className="h-4 w-4 text-emerald-400" />
                <span className="text-xs font-medium text-white">94.6% Accuracy</span>
              </motion.div>
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 glass-strong flex items-center gap-2 p-3"
              >
                <Zap className="h-4 w-4 text-amber-400" />
                <span className="text-xs font-medium text-white">2.3s Decision</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/[0.06] py-12">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <p className="text-3xl font-bold gradient-text sm:text-4xl">{s.value}</p>
              <p className="mt-1 text-sm text-slate-400">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-400">How It Works</p>
            <h2 className="mt-3 text-4xl font-bold text-white text-balance">From application to decision in seconds</h2>
            <p className="mt-4 text-slate-400">A streamlined pipeline that turns hours of manual review into an instant, explainable AI decision.</p>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass glass-hover relative p-6"
              >
                <span className="text-5xl font-bold text-white/5">{step.num}</span>
                <h3 className="mt-2 text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{step.desc}</p>
                {i < steps.length - 1 && (
                  <ArrowRight className="absolute -right-3 top-1/2 hidden h-5 w-5 text-slate-700 lg:block" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Risk Classification */}
      <section id="risk" className="border-y border-white/[0.06] bg-ink-900/40 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-400">AI Risk Classification</p>
              <h2 className="mt-3 text-4xl font-bold text-white text-balance">Three tiers of risk, instantly classified</h2>
              <p className="mt-4 text-slate-400">Every applicant is assigned a risk score from 0 to 100 and classified into one of three tiers, each with a detailed explanation.</p>
              <div className="mt-8 space-y-4">
                {riskClasses.map((r, i) => (
                  <motion.div
                    key={r.level}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="glass flex items-center gap-4 p-4"
                  >
                    <ProgressRing value={r.score} size={64} strokeWidth={6} color={r.color} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-white" style={{ color: r.color }}>{r.level} RISK</h4>
                        <span className="text-xs text-slate-500">{r.pct} of applicants</span>
                      </div>
                      <p className="mt-1 text-sm text-slate-400">{r.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass-strong p-6"
            >
              <h3 className="text-sm font-semibold text-white">AI Risk Factors</h3>
              <p className="mt-1 text-xs text-slate-500">Factors influencing lending decisions</p>
              <div className="mt-6 space-y-5">
                {[
                  { label: 'Credit Score', score: 82 },
                  { label: 'Debt-to-Income', score: 64 },
                  { label: 'Income Stability', score: 91 },
                  { label: 'Repayment History', score: 87 },
                  { label: 'Savings', score: 73 },
                ].map((f, i) => (
                  <div key={f.label}>
                    <div className="mb-1.5 flex justify-between text-sm">
                      <span className="text-slate-300">{f.label}</span>
                      <span className="font-bold text-white">{f.score}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/[0.05]">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-violet"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${f.score}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-400">Key Features</p>
            <h2 className="mt-3 text-4xl font-bold text-white text-balance">Everything you need to lend intelligently</h2>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass glass-hover group p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/20 to-accent-violet/10 transition group-hover:scale-110">
                  <f.icon className="h-6 w-6 text-brand-300" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security */}
      <section id="security" className="border-y border-white/[0.06] bg-ink-900/40 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-strong flex items-center justify-center p-12"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="flex h-48 w-48 items-center justify-center rounded-full border border-brand-500/20"
                >
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                    className="flex h-36 w-36 items-center justify-center rounded-full border border-accent-violet/20"
                  >
                    <Lock className="h-12 w-12 text-brand-300" />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-400">Security</p>
              <h2 className="mt-3 text-4xl font-bold text-white text-balance">Built secure from the ground up</h2>
              <p className="mt-4 text-slate-400">We treat every applicant's data with the highest standards of security and transparency.</p>
              <div className="mt-8 space-y-4">
                {securityFeatures.map((s, i) => (
                  <motion.div
                    key={s.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 border border-brand-500/20">
                      <s.icon className="h-5 w-5 text-brand-300" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{s.title}</h4>
                      <p className="mt-0.5 text-sm text-slate-400">{s.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-strong gradient-border relative overflow-hidden p-12 text-center"
          >
            <div className="absolute left-1/2 top-0 h-64 w-96 -translate-x-1/2 rounded-full bg-radial-glow blur-3xl" />
            <div className="relative">
              <h2 className="text-4xl font-bold text-white text-balance">Ready to make smarter lending decisions?</h2>
              <p className="mx-auto mt-4 max-w-xl text-slate-400">Join the lenders using LendAI to approve loans faster, reduce defaults, and explain every decision.</p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link to="/apply" className="btn-primary">Start New Application <ArrowRight className="h-4 w-4" /></Link>
                <Link to="/dashboard" className="btn-ghost"><LineChart className="h-4 w-4" /> Explore Dashboard</Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-accent-violet">
              <Brain className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-white">LendAI</span>
            <span className="text-xs text-slate-500">· Risk Intelligence</span>
          </div>
          <p className="text-xs text-slate-500">AI predictions are mock classifications for demonstration. Not real lending decisions.</p>
          <div className="flex gap-5 text-xs text-slate-500">
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Terms</a>
            <a href="#" className="hover:text-white transition">Docs</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
