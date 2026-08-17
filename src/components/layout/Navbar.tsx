import { Bell, Menu, Search } from 'lucide-react';
import { getInitials } from '@/utils/format';

interface NavbarProps {
  onMenuClick: () => void;
  onNotificationClick?: () => void;
}

export default function Navbar({ onMenuClick, onNotificationClick }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-white/[0.06] bg-ink-950/80 px-4 backdrop-blur-xl lg:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-slate-300 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search applications, applicants..."
            className="w-64 rounded-xl border border-white/[0.08] bg-white/[0.03] py-2 pl-9 pr-3 text-sm text-slate-200 placeholder-slate-500 focus:border-brand-500/40 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onNotificationClick}
          className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-slate-300 transition hover:bg-white/[0.06]"
        >
          <Bell className="h-[18px] w-[18px]" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500" />
        </button>
        <div className="flex items-center gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] py-1.5 pl-1.5 pr-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-accent-violet text-xs font-bold text-white">
            {getInitials('Adaeze Okeke')}
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-semibold text-white">Adaeze Okeke</p>
            <p className="text-[10px] text-slate-500">Loan Officer</p>
          </div>
        </div>
      </div>
    </header>
  );
}
