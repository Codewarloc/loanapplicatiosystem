import { AnimatePresence, motion } from 'framer-motion';
import { Bell, CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

interface NotificationPanelProps {
  open: boolean;
  onClose: () => void;
}

const notifications = [
  { id: 1, icon: CheckCircle2, color: 'text-emerald-400', title: 'Loan Approved', desc: 'LN-2026-0341 approved for ₦15M', time: '2m ago' },
  { id: 2, icon: AlertTriangle, color: 'text-amber-400', title: 'High Risk Detected', desc: 'Application app-014 flagged high risk', time: '1h ago' },
  { id: 3, icon: Info, color: 'text-blue-400', title: 'New Application', desc: 'Fatima Bello submitted a new application', time: '3h ago' },
  { id: 4, icon: CheckCircle2, color: 'text-emerald-400', title: 'AI Analysis Complete', desc: 'Analysis for app-016 completed', time: '5h ago' },
];

export default function NotificationPanel({ open, onClose }: NotificationPanelProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-ink-950/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-sm flex-col border-l border-white/[0.06] bg-ink-900/95 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-brand-300" />
                <h3 className="text-base font-semibold text-white">Notifications</h3>
                <span className="rounded-full bg-brand-500/15 px-2 py-0.5 text-xs font-medium text-brand-300">4 new</span>
              </div>
              <button onClick={onClose} className="text-slate-500 hover:text-slate-300">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className="mb-2 flex gap-3 rounded-xl border border-white/[0.04] bg-white/[0.02] p-3.5 transition hover:bg-white/[0.04]"
                >
                  <n.icon className={`mt-0.5 h-5 w-5 shrink-0 ${n.color}`} />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">{n.title}</p>
                    <p className="mt-0.5 text-xs text-slate-400">{n.desc}</p>
                    <p className="mt-1 text-[10px] text-slate-600">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
