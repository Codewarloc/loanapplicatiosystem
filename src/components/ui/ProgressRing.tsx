import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/format';

interface ProgressRingProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
  sublabel?: string;
  className?: string;
}

export default function ProgressRing({
  value,
  max = 100,
  size = 160,
  strokeWidth = 12,
  color = '#6366f1',
  label,
  sublabel,
  className,
}: ProgressRingProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(1, Math.max(0, value / max));
  const offset = circumference * (1 - pct);

  useEffect(() => {
    const t = setTimeout(() => setDisplayValue(value), 100);
    return () => clearTimeout(t);
  }, [value]);

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          style={{ filter: `drop-shadow(0 0 8px ${color}80)` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="text-4xl font-bold text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {displayValue}
        </motion.span>
        {label && <span className="mt-1 text-xs font-medium text-slate-400">{label}</span>}
        {sublabel && <span className="text-[11px] text-slate-500">{sublabel}</span>}
      </div>
    </div>
  );
}

export { ProgressRing };
