import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
  Gauge,
  Home,
  Wallet,
  Percent,
  PlusCircle,
  ArrowRight,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from 'recharts';
import StatCard from '@/components/ui/StatCard';
import ChartCard from '@/components/ui/ChartCard';
import LoanTable from '@/components/LoanTable';
import { formatNaira } from '@/utils/format';
import { getDashboardData, type DashboardData } from '@/services/loanService';

const tooltipStyle = {
  backgroundColor: '#0d1019',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '12px',
  fontSize: '12px',
  color: '#e2e8f0',
};

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getDashboardData().then(setData).catch((reason: unknown) => {
      setError(reason instanceof Error ? reason.message : 'Unable to load dashboard data.');
    });
  }, []);

  if (error) {
    return <div className="glass p-8 text-center text-sm text-rose-300">{error}</div>;
  }
  if (!data) {
    return <div className="glass p-8 text-center text-sm text-slate-400">Loading dashboard data...</div>;
  }

  const { stats, overTime, approvalRejection, riskDistribution: riskDist, amountDistribution: amountDist, monthlyVolume, applications } = data;

  return (
    <div className="space-y-6">
      <div className="mb-2 flex items-center justify-between">
        <Link to="/" className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-sm text-slate-200 hover:text-white">
          <Home className="h-4 w-4" />
          Back to homepage
        </Link>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-400">Overview of your lending operations and AI performance</p>
        </div>
        <Link to="/apply" className="btn-primary text-sm">
          <PlusCircle className="h-4 w-4" /> New Application
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 xl:grid-cols-7">
        <StatCard label="Total Applications" value={stats.totalApplications} icon={FileText} accent="from-brand-500/20 to-brand-600/5" delay={0} />
        <StatCard label="Approved" value={stats.approvedLoans} icon={CheckCircle2} accent="from-emerald-500/20 to-emerald-600/5" delay={0.05} trend={{ value: '+12% this month', positive: true }} />
        <StatCard label="Rejected" value={stats.rejectedLoans} icon={XCircle} accent="from-rose-500/20 to-rose-600/5" delay={0.1} />
        <StatCard label="Pending" value={stats.pendingApplications} icon={Clock} accent="from-amber-500/20 to-amber-600/5" delay={0.15} />
        <StatCard label="Avg Risk Score" value={stats.averageRiskScore} icon={Gauge} accent="from-accent-violet/20 to-accent-violet/5" delay={0.2} />
        <StatCard label="Total Loan Amount" value={formatNaira(stats.totalLoanAmount, true)} icon={Wallet} accent="from-blue-500/20 to-blue-600/5" delay={0.25} />
        <StatCard label="Approval Rate" value={`${stats.approvalRate}%`} icon={Percent} accent="from-emerald-500/20 to-emerald-600/5" delay={0.3} trend={{ value: '+3.2%', positive: true }} />
      </div>

      {/* Charts row 1 */}
      <div className="grid gap-4 lg:grid-cols-3">
        <ChartCard title="Loan Applications Over Time" description="Monthly application volume" className="lg:col-span-2" delay={0}>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={overTime}>
              <defs>
                <linearGradient id="appGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="approvedGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="applications" stroke="#6366f1" strokeWidth={2} fill="url(#appGrad)" name="Total" />
              <Area type="monotone" dataKey="approved" stroke="#10b981" strokeWidth={2} fill="url(#approvedGrad)" name="Approved" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Approval vs Rejection" description="Decision breakdown" delay={0.05}>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={approvalRejection} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3}>
                {approvalRejection.map((e, i) => (
                  <Cell key={i} fill={e.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: '12px' }} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Charts row 2 */}
      <div className="grid gap-4 lg:grid-cols-3">
        <ChartCard title="Risk Distribution" description="Applicants by risk tier" delay={0}>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={riskDist} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} paddingAngle={3}>
                {riskDist.map((e, i) => (
                  <Cell key={i} fill={e.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: '12px' }} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Loan Amount Distribution" description="By requested amount range" delay={0.05}>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={amountDist}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
              <Bar dataKey="value" fill="#6366f1" radius={[6, 6, 0, 0]} name="Applications" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Monthly Loan Volume" description="Total disbursed (₦)" delay={0.1}>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={monthlyVolume}>
              <defs>
                <linearGradient id="volGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.2} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${v / 1000000}M`} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(255,255,255,0.03)' }} formatter={(value) => formatNaira(Number(value ?? 0), true)} />
              <Bar dataKey="volume" fill="url(#volGrad)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Recent Applications */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Recent Applications</h2>
          <Link to="/history" className="flex items-center gap-1 text-sm text-brand-400 hover:text-brand-300">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <LoanTable applications={applications} page={page} onPageChange={setPage} pageSize={6} />
      </div>
    </div>
  );
}
