import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, XCircle, Info, AlertTriangle, X } from 'lucide-react';
import type { ToastMessage } from '@/types';

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

const config = {
  success: { icon: CheckCircle2, color: 'text-emerald-400', border: 'border-emerald-500/30' },
  error: { icon: XCircle, color: 'text-rose-400', border: 'border-rose-500/30' },
  info: { icon: Info, color: 'text-blue-400', border: 'border-blue-500/30' },
  warning: { icon: AlertTriangle, color: 'text-amber-400', border: 'border-amber-500/30' },
};

function ToastItem({ toast, onDismiss }: { toast: ToastMessage; onDismiss: (id: string) => void }) {
  useEffect(() => {
    const t = setTimeout(() => onDismiss(toast.id), 4000);
    return () => clearTimeout(t);
  }, [toast.id, onDismiss]);

  const c = config[toast.type];
  const Icon = c.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 100, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`glass-strong pointer-events-auto flex items-start gap-3 border ${c.border} p-4 shadow-2xl`}
    >
      <Icon className={`h-5 w-5 shrink-0 ${c.color}`} />
      <div className="flex-1">
        <p className="text-sm font-semibold text-white">{toast.title}</p>
        {toast.message && <p className="mt-0.5 text-xs text-slate-400">{toast.message}</p>}
      </div>
      <button onClick={() => onDismiss(toast.id)} className="text-slate-500 hover:text-slate-300">
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  );
}

export default function ToastContainer({ toasts, onDismiss }: ToastProps) {
  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-[100] flex w-full max-w-sm flex-col gap-3">
      <AnimatePresence>
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onDismiss={onDismiss} />
        ))}
      </AnimatePresence>
    </div>
  );
}

let toastId = 0;
export function useToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = `toast-${toastId++}`;
    setToasts((prev) => [...prev, { ...toast, id }]);
  };
  const dismissToast = (id: string) => setToasts((prev) => prev.filter((t) => t.id !== id));
  return { toasts, addToast, dismissToast };
}
