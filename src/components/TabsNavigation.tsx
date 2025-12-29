import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export type TabValue = 'all' | 'saved' | 'top-performing';

interface TabsNavigationProps {
  activeTab: TabValue;
  onTabChange: (tab: TabValue) => void;
  counts: {
    all: number;
    saved: number;
    topPerforming: number;
  };
}

const tabs: { value: TabValue; label: string; countKey: keyof TabsNavigationProps['counts'] }[] = [
  { value: 'all', label: 'All Trends', countKey: 'all' },
  { value: 'saved', label: 'Saved for Later', countKey: 'saved' },
  { value: 'top-performing', label: 'Top Performing', countKey: 'topPerforming' },
];

export function TabsNavigation({ activeTab, onTabChange, counts }: TabsNavigationProps) {
  return (
    <div className="flex gap-1 p-1 bg-secondary/50 rounded-lg w-fit mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onTabChange(tab.value)}
          className={cn(
            'relative px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200',
            activeTab === tab.value
              ? 'text-foreground'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {activeTab === tab.value && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-card shadow-sm rounded-md"
              transition={{ type: 'spring', duration: 0.4 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-2">
            {tab.label}
            <span className="text-xs bg-secondary px-1.5 py-0.5 rounded">
              {counts[tab.countKey]}
            </span>
          </span>
        </button>
      ))}
    </div>
  );
}
