'use client';

import { ReactNode } from 'react';
import { Toaster as Sonner, toast as SonnerToast } from 'sonner';

import { Alert } from '@/vibes/soul/primitives/alert';

type ToasterProps = React.ComponentProps<typeof Sonner>;

interface ToastOptions {
  action?: {
    label: string;
    onClick: () => void;
  };
  description?: string;
  position?: ToasterProps['position'];
  dismissLabel?: string;
}

export const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      gap={8}
      offset={120}
      toastOptions={{
        className: 'group',
      }}
      {...props}
    />
  );
};

export const toast = {
  success: (message: ReactNode, options?: ToastOptions) =>
    SonnerToast.success(message, options),
  error: (message: ReactNode, options?: ToastOptions) =>
    SonnerToast.error(message, options),
  warning: (message: ReactNode, options?: ToastOptions) =>
    SonnerToast.warning(message, options),
  info: (message: ReactNode, options?: ToastOptions) =>
    SonnerToast.message(message, options),
};
