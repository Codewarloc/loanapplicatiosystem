import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/utils/format';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;
  const pages: number[] = [];
  const start = Math.max(1, currentPage - 1);
  const end = Math.min(totalPages, start + 2);
  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <div className="flex items-center justify-center gap-1.5">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-slate-400 transition hover:bg-white/[0.06] disabled:opacity-30"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      {start > 1 && (
        <>
          <PageBtn n={1} current={currentPage} onClick={onPageChange} />
          {start > 2 && <span className="px-1 text-slate-500">…</span>}
        </>
      )}
      {pages.map((p) => (
        <PageBtn key={p} n={p} current={currentPage} onClick={onPageChange} />
      ))}
      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className="px-1 text-slate-500">…</span>}
          <PageBtn n={totalPages} current={currentPage} onClick={onPageChange} />
        </>
      )}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-slate-400 transition hover:bg-white/[0.06] disabled:opacity-30"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

function PageBtn({ n, current, onClick }: { n: number; current: number; onClick: (p: number) => void }) {
  return (
    <button
      onClick={() => onClick(n)}
      className={cn(
        'flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition',
        n === current
          ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30'
          : 'border border-white/[0.08] bg-white/[0.03] text-slate-400 hover:bg-white/[0.06]'
      )}
    >
      {n}
    </button>
  );
}
