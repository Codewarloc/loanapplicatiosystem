import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  History as HistoryIcon,
  PlusCircle,
  ShieldCheck,
  BarChart3,
  Users,
  Settings,
  Brain,
  X,
} from 'lucide-react';
import { cn } from '@/utils/format';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/history', label: 'History', icon: HistoryIcon },
  { to: '/apply', label: 'New Application', icon: PlusCircle },
  { to: '/risk-analysis', label: 'Risk Analysis', icon: ShieldCheck },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/applicants', label: 'Applicants', icon: Users },
  { to: '/settings', label: 'Settings', icon: Settings },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-ink-950/70 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={cn(
          'fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-white/[0.06] bg-ink-900/95 backdrop-blur-xl transition-transform duration-300 lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between px-6 py-5">
          <NavLink to="/" className="flex items-center gap-2.5">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-violet shadow-lg shadow-brand-900/50">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="text-base font-bold text-white">LendAI</span>
              <span className="block text-[10px] uppercase tracking-wider text-brand-400">Risk Intelligence</span>
            </div>
          </NavLink>
          <button onClick={onClose} className="text-slate-500 lg:hidden">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-brand-500/10 text-brand-300 border border-brand-500/20'
                    : 'text-slate-400 hover:bg-white/[0.04] hover:text-slate-200 border border-transparent'
                )
              }
            >
              <item.icon className="h-[18px] w-[18px]" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-white/[0.06] p-4">
          <div className="glass p-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">AI Model Active</p>
                <p className="text-[10px] text-slate-500">v2.4.1 · Mock Mode</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
