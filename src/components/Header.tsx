import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface HeaderProps {
  onAddNew: () => void;
}

export function Header({ onAddNew }: HeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-10"
    >
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            Hospitality Trend Tracker
          </h1>
          <p className="mt-2 text-muted-foreground text-lg">
            Real-time social trends, adapted for hotels & resorts
          </p>
        </div>
        <Button onClick={onAddNew} className="sm:flex-shrink-0">
          <Plus className="w-4 h-4 mr-2" />
          Add Trend
        </Button>
      </div>
    </motion.header>
  );
}
