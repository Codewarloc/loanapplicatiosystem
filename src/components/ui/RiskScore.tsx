import { motion } from 'framer-motion';
import { cn, riskColor, riskLabel } from '@/utils/format';

interface RiskScoreProps {
  score: number;
  label?: string;
  size?: number;
  showLabel?: boolean;
}

export default function RiskScore({ score, label, size = 140, showLabel = true }: RiskScoreProps) {
  const color = score < 35 ? '#10b981' : score < 65 ? '#f59e0b' : '#f43f5e';
  const radius = (size - 14) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(100, Math.max(0, score));
  const offset = circumference * (1 - pct / 100);

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={10}
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={10}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            style={{ filter: `drop-shadow(0 0 10px ${color}90)` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-4xl font-bold text-white"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
          >
            {score}
          </motion.span>
          <span className="text-[10px] uppercase tracking-wider text-slate-500">/ 100</span>
        </div>
      </div>
      {showLabel && (
        <div className="mt-3 text-center">
          <p className="text-sm font-semibold" style={{ color }}>
            {label ?? riskLabel(score)}
          </p>
        </div>
      )}
    </div>
  );
}
