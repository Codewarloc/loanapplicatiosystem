import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, CheckCircle2, Loader2 } from 'lucide-react';

const stages = [
  { label: 'Validating applicant information', description: 'Verifying personal and contact details' },
  { label: 'Analyzing financial profile', description: 'Processing income and expense data' },
  { label: 'Evaluating credit history', description: 'Reviewing credit score and loan records' },
  { label: 'Calculating debt-to-income ratio', description: 'Assessing debt burden against income' },
  { label: 'Evaluating repayment capacity', description: 'Projecting future repayment ability' },
  { label: 'Running risk classification', description: 'Applying ML risk classification model' },
  { label: 'Generating recommendation', description: 'Compiling AI decision and explanation' },
];

interface AIProcessingAnimationProps {
  onComplete: () => void;
  duration?: number;
}

export default function AIProcessingAnimation({ onComplete, duration = 4200 }: AIProcessingAnimationProps) {
  const [currentStage, setCurrentStage] = useState(0);
  const stageDuration = duration / stages.length;

  useEffect(() => {
    if (currentStage >= stages.length) {
      const t = setTimeout(onComplete, 400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setCurrentStage((s) => s + 1), stageDuration);
    return () => clearTimeout(t);
  }, [currentStage, stageDuration, onComplete]);

  const progress = Math.min(100, (currentStage / stages.length) * 100);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative mb-8"
      >
        <div className="absolute inset-0 animate-pulse-glow rounded-full bg-brand-500/30 blur-3xl" />
        <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-brand-500/30 bg-gradient-to-br from-brand-500/20 to-accent-violet/10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0"
          >
            <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-brand-400 shadow-lg shadow-brand-400/50" />
          </motion.div>
          <Brain className="h-12 w-12 text-brand-300" />
        </div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-white"
      >
        AI is analyzing your application...
      </motion.h2>
      <p className="mt-2 text-sm text-slate-400">Running risk classification model v2.4.1</p>

      <div className="mt-8 w-full max-w-md">
        <div className="mb-2 flex justify-between text-xs">
          <span className="text-slate-400">Progress</span>
          <span className="font-mono text-brand-300">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white/[0.05]">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-violet"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
      </div>

      <div className="mt-8 w-full max-w-md space-y-2.5">
        {stages.map((stage, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: i <= currentStage ? 1 : 0.3, x: 0 }}
            className={`flex items-center gap-3 rounded-xl border p-3 transition-all ${
              i < currentStage
                ? 'border-emerald-500/20 bg-emerald-500/5'
                : i === currentStage
                  ? 'border-brand-500/30 bg-brand-500/10'
                  : 'border-white/[0.04] bg-white/[0.02]'
            }`}
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
              {i < currentStage ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              ) : i === currentStage ? (
                <Loader2 className="h-5 w-5 animate-spin text-brand-300" />
              ) : (
                <div className="h-2 w-2 rounded-full bg-slate-600" />
              )}
            </div>
            <div className="flex-1">
              <p className={`text-sm font-medium ${i <= currentStage ? 'text-white' : 'text-slate-500'}`}>
                {stage.label}
              </p>
              <p className="text-[11px] text-slate-500">{stage.description}</p>
            </div>
            <AnimatePresence>
              {i < currentStage && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-[10px] font-medium text-emerald-400"
                >
                  Done
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
