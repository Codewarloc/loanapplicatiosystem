import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import type { LoanApplication } from '@/types';
import { formatNaira, formatDate, getInitials } from '@/utils/format';
import RiskBadge from './ui/RiskBadge';
import StatusBadge from './ui/StatusBadge';

interface LoanTableProps {
  applications: LoanApplication[];
  page: number;
  pageSize?: number;
  onPageChange: (page: number) => void;
  showPagination?: boolean;
}

export default function LoanTable({
  applications,
  page,
  pageSize = 8,
  onPageChange,
  showPagination = true,
}: LoanTableProps) {
  const totalPages = Math.ceil(applications.length / pageSize);
  const start = (page - 1) * pageSize;
  const pageItems = applications.slice(start, start + pageSize);

  return (
    <div className="glass overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="border-b border-white/[0.06] text-left">
              {['Applicant', 'Loan ID', 'Amount', 'Credit', 'Risk', 'AI Rec.', 'Status', 'Date', ''].map((h) => (
                <th key={h} className="px-4 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageItems.map((app) => (
              <tr
                key={app.id}
                className="border-b border-white/[0.04] transition hover:bg-white/[0.02]"
              >
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500/30 to-accent-violet/20 text-[11px] font-bold text-brand-200">
                      {getInitials(app.applicantName)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{app.applicantName}</p>
                      <p className="text-[11px] text-slate-500">{app.applicantEmail}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <span className="font-mono text-xs text-slate-400">{app.loanId}</span>
                </td>
                <td className="px-4 py-3.5">
                  <span className="text-sm font-semibold text-white">{formatNaira(app.requestedAmount, true)}</span>
                </td>
                <td className="px-4 py-3.5">
                  <span className="text-sm text-slate-300">{app.creditScore}</span>
                </td>
                <td className="px-4 py-3.5">
                  <RiskBadge level={app.riskLevel} size="sm" />
                </td>
                <td className="px-4 py-3.5">
                  <span className="text-xs font-medium text-slate-300">{app.aiRecommendation}</span>
                </td>
                <td className="px-4 py-3.5">
                  <StatusBadge status={app.status} size="sm" />
                </td>
                <td className="px-4 py-3.5">
                  <span className="text-xs text-slate-400">{formatDate(app.date)}</span>
                </td>
                <td className="px-4 py-3.5">
                  <Link
                    to={`/applications/${app.id}`}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-slate-400 transition hover:bg-brand-500/10 hover:text-brand-300"
                  >
                    <Eye className="h-4 w-4" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showPagination && totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-white/[0.06] px-4 py-3">
          <p className="text-xs text-slate-500">
            Showing {start + 1}–{Math.min(start + pageSize, applications.length)} of {applications.length}
          </p>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onPageChange(page - 1)}
              disabled={page === 1}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-slate-400 transition hover:bg-white/[0.06] disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="px-2 text-xs text-slate-400">
              {page} / {totalPages}
            </span>
            <button
              onClick={() => onPageChange(page + 1)}
              disabled={page === totalPages}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-slate-400 transition hover:bg-white/[0.06] disabled:opacity-30"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
