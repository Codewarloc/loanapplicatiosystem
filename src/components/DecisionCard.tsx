import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';
import type { AIAnalysisResult } from '@/types';
import { formatNaira } from '@/utils/format';
import ProgressRing from './ui/ProgressRing';

interface DecisionCardProps {
  result: AIAnalysisResult;
}

export default function DecisionCard({ result }: DecisionCardProps) {
  const isApproved = result.decision === 'APPROVED';
  const isRejected = result.decision === 'REJECTED';
  const isPending = result.decision === 'PENDING' || result.decision === 'REVIEW';

  const Icon = isApproved ? CheckCircle2 : isRejected ? XCircle : Clock;
  const color = isApproved ? '#10b981' : isRejected ? '#f43f5e' : '#f59e0b';
  const bgGradient = isApproved
    ? 'from-emerald-500/15 to-emerald-600/5'
    : isRejected
      ? 'from-rose-500/15 to-rose-600/5'
      : 'from-amber-500/15 to-amber-600/5';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`glass-strong relative overflow-hidden bg-gradient-to-br ${bgGradient} p-6`}
    >
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-20 blur-3xl" style={{ background: color }} />
      <div className="relative flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="flex h-20 w-20 items-center justify-center rounded-2xl border"
            style={{ borderColor: `${color}40`, background: `${color}15` }}
          >
            <Icon className="h-10 w-10" style={{ color }} />
          </motion.div>
          <div className="text-center sm:text-left">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">AI Decision</p>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-bold"
              style={{ color }}
            >
              {result.decision}
            </motion.h2>
            <div className="mt-2 flex items-center justify-center gap-3 sm:justify-start">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">
                Risk: <span className="font-bold" style={{ color }}>{result.riskLevel}</span>
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">
                Score: <span className="font-bold text-white">{result.riskScore}/100</span>
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <ProgressRing value={result.confidence} size={120} strokeWidth={10} color={color} label="Confidence" />
        </div>
      </div>

      {(isApproved || isPending) && result.recommendedAmount > 0 && (
        <div className="relative mt-6 grid grid-cols-2 gap-3 border-t border-white/[0.06] pt-5">
          <div>
            <p className="text-xs text-slate-500">Recommended Loan</p>
            <p className="mt-1 text-lg font-bold text-white">{formatNaira(result.recommendedAmount, true)}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Recommended Term</p>
            <p className="mt-1 text-lg font-bold text-white">{result.recommendedTerm} Months</p>
          </div>
        </div>
      )}
    </motion.div>
  );
}
