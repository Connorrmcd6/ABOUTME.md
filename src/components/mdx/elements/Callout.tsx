'use client';

import { AlertCircle, Info, CheckCircle, AlertTriangle } from 'lucide-react';

interface CalloutProps {
  type?: 'info' | 'warning' | 'error' | 'success';
  children: React.ReactNode;
}

const iconMap = {
  info: Info,
  warning: AlertTriangle,
  error: AlertCircle,
  success: CheckCircle,
};

const colorMap = {
  info: 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800',
  warning: 'bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800',
  error: 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800',
  success: 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800',
};

export function Callout({ type = 'info', children }: CalloutProps) {
  const Icon = iconMap[type];
  const colorClass = colorMap[type];

  return (
    <div className={`flex gap-3 p-4 my-6 rounded-lg border-2 ${colorClass}`}>
      <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
      <div className="flex-1">{children}</div>
    </div>
  );
}
