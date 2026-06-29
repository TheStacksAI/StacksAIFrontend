'use client';

import { toast as sonnerToast } from 'sonner';
import { CheckCircleFillIcon, WarningIcon, InfoIcon, LoaderIcon } from '@/components/icons';
import { getHumanReadableError, getErrorAction } from '@/lib/error-messages';
import type { ReactNode } from 'react';

type ToastType = 'success' | 'error' | 'info' | 'loading';

interface ToastOptions {
  description: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface LoadingToastOptions extends ToastOptions {
  id?: string | number;
}

const iconsByType: Record<ToastType, React.ReactNode> = {
  success: <CheckCircleFillIcon />,
  error: <WarningIcon />,
  info: <InfoIcon size={16} />,
  loading: <LoaderIcon size={16} />,
};

const colorsByType: Record<ToastType, string> = {
  success: 'text-green-600',
  error: 'text-red-600',
  info: 'text-blue-600',
  loading: 'text-amber-600',
};

function renderToast(
  id: string | number,
  type: ToastType,
  description: string,
  action?: { label: string; onClick: () => void },
) {
  return (
    <div className="flex w-full toast-mobile:w-[380px] justify-center">
      <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-xl w-full toast-mobile:w-fit flex flex-row gap-3 items-start shadow-lg border border-zinc-200 dark:border-zinc-700">
        <div className={`flex-shrink-0 mt-0.5 ${colorsByType[type]} ${type === 'loading' ? 'animate-spin' : ''}`}>
          {iconsByType[type]}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-zinc-950 dark:text-zinc-50 text-sm leading-relaxed">
            {description}
          </p>
          {action && (
            <button
              onClick={action.onClick}
              className="mt-2 text-xs font-medium text-accent-indigo hover:text-accent-indigo-hover underline underline-offset-2 transition-colors"
            >
              {action.label}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function toast(description: string) {
  return sonnerToast.custom((id) =>
    renderToast(id, 'info', description),
  );
}

toast.success = (description: string, options?: { duration?: number }) => {
  return sonnerToast.custom(
    (id) => renderToast(id, 'success', description),
    { duration: options?.duration ?? 4000 },
  );
};

toast.error = (error: unknown, options?: { duration?: number; action?: { label: string; onClick: () => void } }) => {
  const message = getHumanReadableError(error);
  const errorAction = options?.action ?? (getErrorAction(error)
    ? { label: getErrorAction(error)!, onClick: () => {} }
    : undefined);

  return sonnerToast.custom(
    (id) => renderToast(id, 'error', message, errorAction),
    { duration: options?.duration ?? 6000 },
  );
};

toast.info = (description: string, options?: { duration?: number }) => {
  return sonnerToast.custom(
    (id) => renderToast(id, 'info', description),
    { duration: options?.duration ?? 4000 },
  );
};

toast.loading = (description: string, options?: LoadingToastOptions) => {
  const toastId = options?.id ?? description;
  return sonnerToast.custom(
    (id) => renderToast(id, 'loading', description),
    { id: toastId, duration: Infinity },
  );
};

toast.dismiss = (id?: string | number) => {
  sonnerToast.dismiss(id);
};

toast.update = (id: string | number, description: string, type?: ToastType) => {
  sonnerToast.custom(
    () => renderToast(id, type ?? 'info', description),
    { id },
  );
};

toast.promise = <T,>(
  promise: Promise<T>,
  messages: {
    loading: string;
    success: string | ((data: T) => string);
    error: string | ((error: unknown) => string);
  },
) => {
  const id = toast.loading(messages.loading);
  promise.then(
    (data) => {
      const msg = typeof messages.success === 'function' ? messages.success(data) : messages.success;
      sonnerToast.custom(() => renderToast(id, 'success', msg), { id, duration: 4000 });
    },
    (err) => {
      const msg = typeof messages.error === 'function' ? messages.error(err) : messages.error;
      sonnerToast.custom(() => renderToast(id, 'error', msg), { id, duration: 6000 });
    },
  );
  return promise;
};
