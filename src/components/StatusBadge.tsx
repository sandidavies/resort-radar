import { Status, statusLabels } from '@/types/trend';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

const statusStyles: Record<Status, string> = {
  'not-used': 'bg-status-not-used text-status-not-used-text',
  'in-production': 'bg-status-in-production text-status-in-production-text',
  'posted': 'bg-status-posted text-status-posted-text',
  'performed-well': 'bg-status-performed text-status-performed-text',
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium tracking-wide',
        statusStyles[status],
        className
      )}
    >
      {statusLabels[status]}
    </span>
  );
}
