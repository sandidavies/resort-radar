import { Trend } from '@/types/trend';
import { PlatformIcon } from './PlatformIcon';
import { TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface TrendingHighlightProps {
  trends: Trend[];
  onSelect: (trend: Trend) => void;
}

export function TrendingHighlight({ trends, onSelect }: TrendingHighlightProps) {
  if (trends.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-10"
    >
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-primary" />
        <h2 className="font-serif text-xl font-semibold text-foreground">
          Trending This Week
        </h2>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {trends.map((trend, index) => (
          <motion.button
            key={trend.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onClick={() => onSelect(trend)}
            className="flex-shrink-0 flex items-center gap-3 px-4 py-3 bg-card border border-border/50 rounded-lg hover:border-primary/30 hover:shadow-md transition-all duration-200 group"
          >
            <PlatformIcon platform={trend.platform} className="text-muted-foreground group-hover:text-primary transition-colors" />
            <span className="font-medium text-foreground whitespace-nowrap">
              {trend.name}
            </span>
          </motion.button>
        ))}
      </div>
    </motion.section>
  );
}
