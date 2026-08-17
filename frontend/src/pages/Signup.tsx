import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Mail, Lock, User, ArrowRight, Home, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      addToast({ type: 'success', title: 'Account created!', message: 'Your profile is ready.' });
      navigate('/dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-ink-950 px-4 py-8 text-slate-200 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white">
            <Home className="h-4 w-4" />
            Back to homepage
          </Link>
          <Link to="/login" className="text-sm text-brand-300 hover:text-brand-200">
            Already have an account? Sign in
          </Link>
        </div>

        <div className="grid overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] shadow-2xl shadow-brand-950/20 lg:grid-cols-2">
          <div className="hidden bg-gradient-to-br from-brand-600/20 via-ink-950 to-accent-violet/10 p-8 lg:flex lg:flex-col lg:justify-center">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent-violet">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">LendAI</span>
            </div>
            <h1 className="mt-10 text-4xl font-bold text-white">Create your account</h1>
            <p className="mt-4 max-w-md text-slate-300">
              Start managing applications, reviewing AI risk scores, and approving smarter lending decisions.
            </p>
            <div className="mt-8 space-y-3 text-sm text-slate-300">
              {[
                'Fast application processing',
                'AI-powered loan grading',
                'Clear risk analysis and insights',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 sm:p-8"
          >
            <div className="mb-8 lg:hidden">
              <Link to="/" className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white">
                <Home className="h-4 w-4" />
                Home
              </Link>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white">Sign up</h2>
              <p className="mt-1 text-sm text-slate-400">Create your LendAI account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-300">Full name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input type="text" required defaultValue="Adaeze Okeke" className="input-base pl-10" placeholder="Jane Doe" />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-300">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input type="email" required defaultValue="adaeze.okeke@lendai.com" className="input-base pl-10" placeholder="you@company.com" />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-300">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    defaultValue="password123"
                    className="input-base pl-10 pr-10"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full">
                {loading ? 'Creating account...' : <>Create account <ArrowRight className="h-4 w-4" /></>}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-400">
              Already a member?{' '}
              <Link to="/login" className="font-medium text-brand-400 hover:text-brand-300">Sign in</Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
