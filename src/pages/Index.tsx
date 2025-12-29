import { useState, useMemo } from 'react';
import { Trend, Platform, ContentType, TrendType, Status } from '@/types/trend';
import { sampleTrends } from '@/data/sampleTrends';
import { Header } from '@/components/Header';
import { FilterBar } from '@/components/FilterBar';
import { TrendCard } from '@/components/TrendCard';
import { TrendFormDialog } from '@/components/TrendFormDialog';
import { TrendingHighlight } from '@/components/TrendingHighlight';
import { TabsNavigation, TabValue } from '@/components/TabsNavigation';
import { Footer } from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';

interface Filters {
  platform: Platform | 'all';
  contentType: ContentType | 'all';
  trendType: TrendType | 'all';
  status: Status | 'all';
}

const Index = () => {
  const [trends, setTrends] = useState<Trend[]>(sampleTrends);
  const [filters, setFilters] = useState<Filters>({
    platform: 'all',
    contentType: 'all',
    trendType: 'all',
    status: 'all',
  });
  const [activeTab, setActiveTab] = useState<TabValue>('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTrend, setEditingTrend] = useState<Trend | null>(null);

  const handleFilterChange = (key: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      platform: 'all',
      contentType: 'all',
      trendType: 'all',
      status: 'all',
    });
  };

  const trendingTrends = useMemo(
    () => trends.filter((t) => t.isTrendingThisWeek),
    [trends]
  );

  const savedTrends = useMemo(
    () => trends.filter((t) => t.isSavedForLater),
    [trends]
  );

  const topPerformingTrends = useMemo(
    () => trends.filter((t) => t.status === 'performed-well'),
    [trends]
  );

  const filteredTrends = useMemo(() => {
    let result = trends;

    // Apply tab filter first
    if (activeTab === 'saved') {
      result = savedTrends;
    } else if (activeTab === 'top-performing') {
      result = topPerformingTrends;
    }

    // Then apply dropdown filters
    return result.filter((trend) => {
      if (filters.platform !== 'all' && trend.platform !== filters.platform) return false;
      if (filters.contentType !== 'all' && trend.contentType !== filters.contentType) return false;
      if (filters.trendType !== 'all' && trend.trendType !== filters.trendType) return false;
      if (filters.status !== 'all' && trend.status !== filters.status) return false;
      return true;
    });
  }, [trends, filters, activeTab, savedTrends, topPerformingTrends]);

  const handleAddNew = () => {
    setEditingTrend(null);
    setDialogOpen(true);
  };

  const handleEdit = (trend: Trend) => {
    setEditingTrend(trend);
    setDialogOpen(true);
  };

  const handleSave = (data: Omit<Trend, 'id' | 'createdAt'> & { id?: string }) => {
    if (data.id) {
      // Edit existing
      setTrends((prev) =>
        prev.map((t) =>
          t.id === data.id
            ? { ...t, ...data }
            : t
        )
      );
    } else {
      // Add new
      const newTrend: Trend = {
        ...data,
        id: Date.now().toString(),
        createdAt: new Date(),
      };
      setTrends((prev) => [newTrend, ...prev]);
    }
  };

  const handleToggleSave = (id: string) => {
    setTrends((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, isSavedForLater: !t.isSavedForLater } : t
      )
    );
  };

  const handleSelectTrending = (trend: Trend) => {
    handleEdit(trend);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Header onAddNew={handleAddNew} />

        <TrendingHighlight trends={trendingTrends} onSelect={handleSelectTrending} />

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <TabsNavigation
            activeTab={activeTab}
            onTabChange={setActiveTab}
            counts={{
              all: trends.length,
              saved: savedTrends.length,
              topPerforming: topPerformingTrends.length,
            }}
          />

          <div className="mb-8">
            <FilterBar
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={clearFilters}
            />
          </div>

          <AnimatePresence mode="wait">
            {filteredTrends.length > 0 ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredTrends.map((trend, index) => (
                  <TrendCard
                    key={trend.id}
                    trend={trend}
                    onEdit={handleEdit}
                    onToggleSave={handleToggleSave}
                    index={index}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center py-16"
              >
                <p className="text-muted-foreground text-lg">
                  No trends found matching your filters.
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-4 text-primary hover:underline font-medium"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

        <Footer />

        <TrendFormDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          trend={editingTrend}
          onSave={handleSave}
        />
      </div>
    </div>
  );
};

export default Index;
