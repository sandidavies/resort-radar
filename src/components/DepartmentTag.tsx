import { Department, departmentLabels } from '@/types/trend';
import { cn } from '@/lib/utils';

interface DepartmentTagProps {
  department: Department;
  className?: string;
}

export function DepartmentTag({ department, className }: DepartmentTagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-secondary text-secondary-foreground',
        className
      )}
    >
      {departmentLabels[department]}
    </span>
  );
}
