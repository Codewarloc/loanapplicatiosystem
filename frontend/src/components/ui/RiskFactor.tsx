import { motion } from 'framer-motion';
import { cn } from '@/utils/format';

interface RiskFactorProps {
  label: string;
  score: number;
  impact?: 'positive' | 'negative' | 'neutral';
  description?: string;
  delay?: number;
}

export default function RiskFactor({
  label,
  score,
  impact = 'neutral',
  description,
  delay = 0,
}: RiskFactorProps) {
  const color =
    impact === 'positive' ? '#10b981' : impact === 'negative' ? '#f43f5e' : '#6366f1';
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-300">{label}</span>
        <span className="text-sm font-bold" style={{ color }}>
          {score}%
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/[0.05]">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color, boxShadow: `0 0 8px ${color}80` }}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, delay, ease: 'easeOut' }}
        />
      </div>
      {description && <p className="text-xs text-slate-500">{description}</p>}
    </div>
  );
}
