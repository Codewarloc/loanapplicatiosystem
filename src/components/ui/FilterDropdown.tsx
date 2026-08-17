import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/utils/format';

export interface FilterOption {
  value: string;
  label: string;
}

interface FilterDropdownProps {
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
}

export default function FilterDropdown({
  options,
  value,
  onChange,
  label = 'Filter',
  className,
}: FilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className={cn('relative', className)}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-2.5 text-sm text-slate-300 transition hover:border-white/[0.14] hover:bg-white/[0.06]"
      >
        <span className="text-xs text-slate-500">{label}:</span>
        <span className="font-medium text-white">{selected?.label ?? 'All'}</span>
        <ChevronDown className={cn('h-4 w-4 text-slate-500 transition', open && 'rotate-180')} />
      </button>
      {open && (
        <div className="absolute right-0 z-50 mt-2 w-48 overflow-hidden rounded-xl border border-white/[0.08] bg-ink-800/95 py-1 shadow-2xl backdrop-blur-xl">
          {options.map((o) => (
            <button
              key={o.value}
              onClick={() => {
                onChange(o.value);
                setOpen(false);
              }}
              className={cn(
                'flex w-full items-center px-3.5 py-2 text-sm transition hover:bg-white/[0.06]',
                o.value === value ? 'text-brand-300' : 'text-slate-300'
              )}
            >
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
