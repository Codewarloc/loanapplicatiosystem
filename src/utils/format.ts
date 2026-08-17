export function formatNaira(amount: number, compact = false): string {
  if (compact && Math.abs(amount) >= 1_000_000) {
    return `₦${(amount / 1_000_000).toFixed(amount % 1_000_000 === 0 ? 0 : 1)}M`;
  }
  if (compact && Math.abs(amount) >= 1_000) {
    return `₦${(amount / 1_000).toFixed(0)}K`;
  }
  return `₦${amount.toLocaleString('en-NG')}`;
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('en-NG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatDateShort(dateStr: string): string {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('en-NG', { month: 'short', day: 'numeric' });
}

export function timeAgo(dateStr: string): string {
  const d = new Date(dateStr);
  const now = new Date('2026-08-15');
  const diff = Math.round((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
  if (diff < 1) return 'Today';
  if (diff < 2) return 'Yesterday';
  if (diff < 7) return `${diff} days ago`;
  if (diff < 30) return `${Math.floor(diff / 7)} week${Math.floor(diff / 7) > 1 ? 's' : ''} ago`;
  return `${Math.floor(diff / 30)} month${Math.floor(diff / 30) > 1 ? 's' : ''} ago`;
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function riskColor(level: string): string {
  switch (level) {
    case 'LOW':
      return '#10b981';
    case 'MEDIUM':
      return '#f59e0b';
    case 'HIGH':
      return '#f43f5e';
    default:
      return '#64748b';
  }
}

export function statusColor(status: string): string {
  switch (status) {
    case 'APPROVED':
      return '#10b981';
    case 'REJECTED':
      return '#f43f5e';
    case 'PENDING':
      return '#f59e0b';
    case 'UNDER_REVIEW':
    case 'REVIEW':
      return '#3b82f6';
    default:
      return '#64748b';
  }
}

export function riskBg(level: string): string {
  switch (level) {
    case 'LOW':
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    case 'MEDIUM':
      return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    case 'HIGH':
      return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
    default:
      return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
  }
}

export function statusBg(status: string): string {
  switch (status) {
    case 'APPROVED':
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    case 'REJECTED':
      return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
    case 'PENDING':
      return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    case 'UNDER_REVIEW':
      return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    default:
      return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
  }
}

export function riskLabel(score: number): string {
  if (score < 25) return 'Excellent Applicant';
  if (score < 45) return 'Good Applicant';
  if (score < 65) return 'Moderate Risk';
  if (score < 80) return 'Elevated Risk';
  return 'High Risk';
}

export function classNames(...classes: (string | false | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export const cn = classNames;
