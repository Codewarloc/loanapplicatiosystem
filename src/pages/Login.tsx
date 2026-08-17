import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, TrendingUp, Zap, Home } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      addToast({ type: 'success', title: 'Welcome back!', message: 'Signed in successfully.' });
      navigate('/dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-ink-950 lg:grid lg:grid-cols-2">
      <div className="absolute left-6 top-6 z-20">
        <Link to="/" className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-sm text-slate-200 hover:text-white">
          <Home className="h-4 w-4" />
          Homepage
        </Link>
      </div>

      {/* Left visual */}
      <div className="relative hidden overflow-hidden border-r border-white/[0.06] lg:flex lg:flex-col lg:justify-center lg:p-12">
        <div className="absolute inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-20" />
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-radial-glow blur-3xl" />
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-violet shadow-lg shadow-brand-900/50">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">LendAI</span>
          </Link>
          <h2 className="mt-12 max-w-md text-4xl font-bold leading-tight text-white text-balance">
            The intelligent way to <span className="gradient-text">approve loans</span>
          </h2>
          <p className="mt-4 max-w-md text-slate-400">
            Sign in to access your dashboard, review applications, and let AI handle the risk assessment.
          </p>
          <div className="mt-10 space-y-4">
            {[
              { icon: Zap, title: 'Instant AI Decisions', desc: 'Get risk classifications in under 3 seconds' },
              { icon: ShieldCheck, title: 'Explainable AI', desc: 'Every decision comes with a full explanation' },
              { icon: TrendingUp, title: 'Real-time Analytics', desc: 'Track lending performance live' },
            ].map((f) => (
              <div key={f.title} className="glass flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 border border-brand-500/20">
                  <f.icon className="h-5 w-5 text-brand-300" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{f.title}</p>
                  <p className="text-xs text-slate-400">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right form */}
      <div className="flex min-h-screen items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Link to="/" className="mb-8 flex items-center justify-center gap-2.5 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-violet">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">LendAI</span>
          </Link>
          <div className="glass-strong p-8">
            <h1 className="text-2xl font-bold text-white">Welcome back</h1>
            <p className="mt-1 text-sm text-slate-400">Sign in to your LendAI account</p>
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-300">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    required
                    defaultValue="adaeze.okeke@lendai.com"
                    className="input-base pl-10"
                    placeholder="you@company.com"
                  />
                </div>
              </div>
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label className="block text-xs font-medium text-slate-300">Password</label>
                  <a href="#" className="text-xs text-brand-400 hover:text-brand-300">Forgot password?</a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    defaultValue="password"
                    className="input-base pl-10 pr-10"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <label className="flex cursor-pointer items-center gap-2">
                  <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-white/20 bg-white/5 text-brand-500 focus:ring-brand-500/20" />
                  <span className="text-sm text-slate-300">Remember me</span>
                </label>
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full">
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                  />
                ) : (
                  <>Sign In <ArrowRight className="h-4 w-4" /></>
                )}
              </button>
            </form>
            <p className="mt-6 text-center text-sm text-slate-400">
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-brand-400 hover:text-brand-300">Create account</Link>
            </p>
          </div>
          <p className="mt-6 text-center text-xs text-slate-600">
            Demo mode — any credentials will sign you in.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
