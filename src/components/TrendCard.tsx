import { Trend, contentTypeLabels, trendTypeLabels } from '@/types/trend';
import { StatusBadge } from './StatusBadge';
import { DepartmentTag } from './DepartmentTag';
import { PlatformIcon } from './PlatformIcon';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Edit2, Bookmark, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TrendCardProps {
  trend: Trend;
  onEdit: (trend: Trend) => void;
  onToggleSave: (id: string) => void;
  index?: number;
}

export function TrendCard({ trend, onEdit, onToggleSave, index = 0 }: TrendCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Card className="group h-full bg-card hover:shadow-lg transition-all duration-300 border-border/50">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <PlatformIcon platform={trend.platform} className="text-muted-foreground" />
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {contentTypeLabels[trend.contentType]} • {trendTypeLabels[trend.trendType]}
                </span>
              </div>
              <h3 className="font-serif text-lg font-semibold text-foreground leading-tight">
                {trend.name}
              </h3>
            </div>
            <StatusBadge status={trend.status} />
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {trend.description}
          </p>

          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-primary">
              Hospitality Adaptation
            </h4>
            <p className="text-sm text-foreground/90 leading-relaxed">
              {trend.hospitalityAdaptation}
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-primary">
              Hook Example
            </h4>
            <p className="text-sm italic text-muted-foreground bg-secondary/50 px-3 py-2 rounded-md">
              {trend.hookExample}
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {trend.departments.map((dept) => (
              <DepartmentTag key={dept} department={dept} />
            ))}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onToggleSave(trend.id)}
                className={cn(
                  'h-8 px-2 text-muted-foreground hover:text-primary',
                  trend.isSavedForLater && 'text-primary'
                )}
              >
                <Bookmark className={cn('w-4 h-4', trend.isSavedForLater && 'fill-current')} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(trend)}
                className="h-8 px-2 text-muted-foreground hover:text-primary"
              >
                <Edit2 className="w-4 h-4" />
              </Button>
              {trend.link && (
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="h-8 px-2 text-muted-foreground hover:text-primary"
                >
                  <a href={trend.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              )}
            </div>
            {trend.isTrendingThisWeek && (
              <div className="flex items-center gap-1 text-xs text-primary">
                <TrendingUp className="w-3.5 h-3.5" />
                <span className="font-medium">Trending</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
