import { motion } from 'framer-motion';

export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`shimmer glass p-5 ${className}`}>
      <div className="h-3 w-24 rounded bg-white/5" />
      <div className="mt-3 h-7 w-32 rounded bg-white/5" />
      <div className="mt-3 h-3 w-16 rounded bg-white/5" />
    </div>
  );
}

export function SkeletonRow() {
  return (
    <div className="shimmer flex items-center gap-4 border-b border-white/[0.04] p-4">
      <div className="h-8 w-8 rounded-full bg-white/5" />
      <div className="h-3 flex-1 rounded bg-white/5" />
      <div className="h-3 w-20 rounded bg-white/5" />
      <div className="h-3 w-16 rounded bg-white/5" />
      <div className="h-6 w-16 rounded-full bg-white/5" />
    </div>
  );
}

export function SkeletonChart({ className = '' }: { className?: string }) {
  return (
    <div className={`shimmer glass p-5 ${className}`}>
      <div className="h-4 w-32 rounded bg-white/5" />
      <div className="mt-4 flex h-48 items-end gap-2">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t bg-white/5"
            initial={{ height: '20%' }}
            animate={{ height: `${30 + Math.random() * 60}%` }}
            transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse', delay: i * 0.1 }}
          />
        ))}
      </div>
    </div>
  );
}

export function LoadingState({ label = 'Loading...' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative h-12 w-12">
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-brand-500/20"
        />
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-brand-400"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
        />
      </div>
      <p className="mt-4 text-sm text-slate-400">{label}</p>
    </div>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.03] border border-white/[0.06]">
        <Icon className="h-7 w-7 text-slate-500" />
      </div>
      <h3 className="mt-4 text-base font-semibold text-white">{title}</h3>
      {description && <p className="mt-1 max-w-sm text-sm text-slate-400">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
