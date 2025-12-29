import { Platform, ContentType, TrendType, Status, platformLabels, contentTypeLabels, trendTypeLabels, statusLabels } from '@/types/trend';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface Filters {
  platform: Platform | 'all';
  contentType: ContentType | 'all';
  trendType: TrendType | 'all';
  status: Status | 'all';
}

interface FilterBarProps {
  filters: Filters;
  onFilterChange: (key: keyof Filters, value: string) => void;
  onClearFilters: () => void;
}

export function FilterBar({ filters, onFilterChange, onClearFilters }: FilterBarProps) {
  const hasActiveFilters = Object.values(filters).some((v) => v !== 'all');

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Select
        value={filters.platform}
        onValueChange={(value) => onFilterChange('platform', value)}
      >
        <SelectTrigger className="w-[140px] bg-card border-border/50">
          <SelectValue placeholder="Platform" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Platforms</SelectItem>
          {Object.entries(platformLabels).map(([value, label]) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.contentType}
        onValueChange={(value) => onFilterChange('contentType', value)}
      >
        <SelectTrigger className="w-[140px] bg-card border-border/50">
          <SelectValue placeholder="Content Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          {Object.entries(contentTypeLabels).map(([value, label]) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.trendType}
        onValueChange={(value) => onFilterChange('trendType', value)}
      >
        <SelectTrigger className="w-[140px] bg-card border-border/50">
          <SelectValue placeholder="Trend Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Trends</SelectItem>
          {Object.entries(trendTypeLabels).map(([value, label]) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.status}
        onValueChange={(value) => onFilterChange('status', value)}
      >
        <SelectTrigger className="w-[150px] bg-card border-border/50">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          {Object.entries(statusLabels).map(([value, label]) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          className="text-muted-foreground hover:text-foreground"
        >
          <X className="w-4 h-4 mr-1" />
          Clear
        </Button>
      )}
    </div>
  );
}
