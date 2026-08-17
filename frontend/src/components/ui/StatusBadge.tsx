import { cn } from '@/utils/format';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function StatusBadge({ status, size = 'md', className }: StatusBadgeProps) {
  const normalized = status === 'UNDER_REVIEW' ? 'UNDER REVIEW' : status;
  const styles: Record<string, string> = {
    APPROVED: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    REJECTED: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    PENDING: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    'UNDER REVIEW': 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    REVIEW: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  };
  const sizes = {
    sm: 'text-[10px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1.5',
  };
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-semibold uppercase tracking-wider',
        styles[normalized] ?? styles.PENDING,
        sizes[size],
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {normalized}
    </span>
  );
}
