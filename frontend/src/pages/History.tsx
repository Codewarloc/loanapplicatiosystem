import { useEffect, useState } from 'react';
import { CalendarDays, Clock3, FileText, Search, SlidersHorizontal } from 'lucide-react';
import LoanTable from '@/components/LoanTable';
import type { ApplicationStatus } from '@/types';
import { getLoanHistory } from '@/services/loanService';
import type { LoanApplication } from '@/types';

const statusFilters: Array<{ label: string; value: 'ALL' | ApplicationStatus }> = [
  { label: 'All applications', value: 'ALL' },
  { label: 'Approved', value: 'APPROVED' },
  { label: 'Pending', value: 'PENDING' },
  { label: 'Under review', value: 'UNDER_REVIEW' },
  { label: 'Rejected', value: 'REJECTED' },
];

export default function History() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'ALL' | ApplicationStatus>('ALL');
  const [page, setPage] = useState(1);
  const [applications, setApplications] = useState<LoanApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getLoanHistory().then(setApplications).catch((reason: unknown) => {
      setError(reason instanceof Error ? reason.message : 'Unable to load application history.');
    }).finally(() => setLoading(false));
  }, []);

  const filteredApplications = applications
    .filter((application) => {
      const searchableText = `${application.applicantName} ${application.applicantEmail} ${application.loanId} ${application.loanPurpose}`.toLowerCase();
      const matchesQuery = searchableText.includes(query.trim().toLowerCase());
      const matchesStatus = status === 'ALL' || application.status === status;
      return matchesQuery && matchesStatus;
    })
    .sort((left, right) => right.date.localeCompare(left.date));

  const updateQuery = (value: string) => {
    setQuery(value);
    setPage(1);
  };

  const updateStatus = (value: 'ALL' | ApplicationStatus) => {
    setStatus(value);
    setPage(1);
  };

  const approvedCount = applications.filter((application) => application.status === 'APPROVED').length;
  const pendingCount = applications.filter((application) => application.status === 'PENDING' || application.status === 'UNDER_REVIEW').length;

  if (loading) {
    return <div className="glass p-8 text-center text-sm text-slate-400">Loading application history...</div>;
  }
  if (error) {
    return <div className="glass p-8 text-center text-sm text-rose-300">{error}</div>;
  }

  return (
    <div className="min-h-screen space-y-6 bg-ink-950 px-4 py-6 lg:px-8 lg:py-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-brand-300">
            <Clock3 className="h-4 w-4" />
            Application records
          </div>
          <h1 className="mt-2 text-3xl font-bold text-white">History</h1>
          <p className="mt-1 text-sm text-slate-400">Review every loan application and its latest decision.</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <CalendarDays className="h-4 w-4" />
          Sorted by most recent
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div className="glass p-4">
          <FileText className="h-5 w-5 text-brand-300" />
          <p className="mt-3 text-2xl font-bold text-white">{applications.length}</p>
          <p className="text-xs text-slate-500">Total applications</p>
        </div>
        <div className="glass p-4">
          <div className="h-5 w-5 rounded-full bg-emerald-400/20 ring-1 ring-emerald-400/30" />
          <p className="mt-3 text-2xl font-bold text-white">{approvedCount}</p>
          <p className="text-xs text-slate-500">Approved</p>
        </div>
        <div className="glass col-span-2 p-4 sm:col-span-1">
          <div className="h-5 w-5 rounded-full bg-amber-400/20 ring-1 ring-amber-400/30" />
          <p className="mt-3 text-2xl font-bold text-white">{pendingCount}</p>
          <p className="text-xs text-slate-500">Awaiting decision</p>
        </div>
      </div>

      <section className="space-y-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              value={query}
              onChange={(event) => updateQuery(event.target.value)}
              className="input-base pl-10"
              placeholder="Search applicant, loan ID, or purpose"
              aria-label="Search application history"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <SlidersHorizontal className="h-4 w-4 shrink-0 text-slate-500" />
            {statusFilters.map((filter) => (
              <button
                key={filter.value}
                type="button"
                onClick={() => updateStatus(filter.value)}
                className={`whitespace-nowrap rounded-lg border px-3 py-2 text-xs font-medium transition ${
                  status === filter.value
                    ? 'border-brand-500/30 bg-brand-500/10 text-brand-300'
                    : 'border-white/[0.08] bg-white/[0.03] text-slate-400 hover:bg-white/[0.06] hover:text-slate-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {filteredApplications.length > 0 ? (
          <LoanTable applications={filteredApplications} page={page} onPageChange={setPage} />
        ) : (
          <div className="glass flex flex-col items-center justify-center px-6 py-16 text-center">
            <FileText className="h-8 w-8 text-slate-600" />
            <h2 className="mt-4 text-lg font-semibold text-white">No applications found</h2>
            <p className="mt-1 text-sm text-slate-500">Try a different search term or status filter.</p>
          </div>
        )}
      </section>
    </div>
  );
}