import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/format';

interface ChartCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  action?: ReactNode;
  className?: string;
  delay?: number;
}

export default function ChartCard({
  title,
  description,
  children,
  action,
  className,
  delay = 0,
}: ChartCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn('glass p-5', className)}
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-white">{title}</h3>
          {description && <p className="mt-0.5 text-xs text-slate-400">{description}</p>}
        </div>
        {action}
      </div>
      {children}
    </motion.div>
  );
}
