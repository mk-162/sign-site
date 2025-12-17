import { clsx } from 'clsx';
import { X } from 'lucide-react';
import { ReactNode } from 'react';

import { Button } from '@/vibes/soul/primitives/button';

interface Props {
  variant: 'success' | 'warning' | 'error' | 'info';
  message: ReactNode;
  description?: string;
  dismissLabel?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  onDismiss?: () => void;
}

const variantStyles = {
  success: { background: '#16a34a', borderColor: '#15803d' },
  warning: { background: '#f59e0b', borderColor: '#d97706' },
  error: { background: '#dc2626', borderColor: '#b91c1c' },
  info: { background: '#2563eb', borderColor: '#1d4ed8' },
};

export function Alert({
  variant,
  message,
  description,
  action,
  dismissLabel = 'Dismiss',
  onDismiss,
}: Props) {
  return (
    <div
      className="flex min-w-[320px] max-w-[420px] items-center justify-between gap-3 rounded-lg px-5 py-4 shadow-2xl group-focus-visible:outline-none group-focus-visible:ring-2"
      style={{
        backgroundColor: variantStyles[variant].background,
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: variantStyles[variant].borderColor,
        color: 'white',
      }}
      role="alert"
    >
      <div className="flex flex-col gap-0.5">
        <span className="text-base font-bold">{message}</span>
        {Boolean(description) && (
          <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.9)' }}>{description}</span>
        )}
      </div>

      <div className="flex items-center gap-1">
        {action && (
          <Button className="text-white hover:bg-white/20 border-white/30" onClick={action.onClick} size="x-small" variant="ghost">
            {action.label}
          </Button>
        )}

        <button
          aria-label={dismissLabel}
          className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
          style={{ color: 'rgba(255,255,255,0.8)' }}
          onClick={onDismiss}
          type="button"
        >
          <X size={20} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
