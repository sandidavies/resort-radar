import { useState, useEffect } from 'react';
import { Trend, Platform, ContentType, TrendType, Status, Department, platformLabels, contentTypeLabels, trendTypeLabels, statusLabels, departmentLabels } from '@/types/trend';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface TrendFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trend?: Trend | null;
  onSave: (trend: Omit<Trend, 'id' | 'createdAt'> & { id?: string }) => void;
}

const defaultFormData = {
  name: '',
  platform: 'instagram' as Platform,
  contentType: 'reel' as ContentType,
  trendType: 'format' as TrendType,
  description: '',
  hospitalityAdaptation: '',
  hookExample: '',
  status: 'not-used' as Status,
  departments: [] as Department[],
  link: '',
  isSavedForLater: false,
  isTrendingThisWeek: false,
};

export function TrendFormDialog({ open, onOpenChange, trend, onSave }: TrendFormDialogProps) {
  const [formData, setFormData] = useState(defaultFormData);

  useEffect(() => {
    if (trend) {
      setFormData({
        name: trend.name,
        platform: trend.platform,
        contentType: trend.contentType,
        trendType: trend.trendType,
        description: trend.description,
        hospitalityAdaptation: trend.hospitalityAdaptation,
        hookExample: trend.hookExample,
        status: trend.status,
        departments: trend.departments,
        link: trend.link || '',
        isSavedForLater: trend.isSavedForLater || false,
        isTrendingThisWeek: trend.isTrendingThisWeek || false,
      });
    } else {
      setFormData(defaultFormData);
    }
  }, [trend, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: trend?.id,
    });
    onOpenChange(false);
  };

  const toggleDepartment = (dept: Department) => {
    setFormData((prev) => ({
      ...prev,
      departments: prev.departments.includes(dept)
        ? prev.departments.filter((d) => d !== dept)
        : [...prev.departments, dept],
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">
            {trend ? 'Edit Trend' : 'Add New Trend'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Trend Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., POV Morning Routine"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Platform</Label>
              <Select
                value={formData.platform}
                onValueChange={(value: Platform) => setFormData({ ...formData, platform: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(platformLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Content Type</Label>
              <Select
                value={formData.contentType}
                onValueChange={(value: ContentType) => setFormData({ ...formData, contentType: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(contentTypeLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Trend Type</Label>
              <Select
                value={formData.trendType}
                onValueChange={(value: TrendType) => setFormData({ ...formData, trendType: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(trendTypeLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: Status) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(statusLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of the trend..."
              rows={2}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="adaptation">Hospitality Adaptation</Label>
            <Textarea
              id="adaptation"
              value={formData.hospitalityAdaptation}
              onChange={(e) => setFormData({ ...formData, hospitalityAdaptation: e.target.value })}
              placeholder="How can this trend be adapted for hotels & resorts..."
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hook">Hook Example</Label>
            <Input
              id="hook"
              value={formData.hookExample}
              onChange={(e) => setFormData({ ...formData, hookExample: e.target.value })}
              placeholder="First 3 seconds caption or text overlay..."
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Departments</Label>
            <div className="flex flex-wrap gap-3">
              {(Object.keys(departmentLabels) as Department[]).map((dept) => (
                <label
                  key={dept}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Checkbox
                    checked={formData.departments.includes(dept)}
                    onCheckedChange={() => toggleDepartment(dept)}
                  />
                  <span className="text-sm">{departmentLabels[dept]}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="link">Reference Link (optional)</Label>
            <Input
              id="link"
              type="url"
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              placeholder="https://..."
            />
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={formData.isTrendingThisWeek}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isTrendingThisWeek: checked as boolean })
                }
              />
              <span className="text-sm">Trending This Week</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={formData.isSavedForLater}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isSavedForLater: checked as boolean })
                }
              />
              <span className="text-sm">Save for Later</span>
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {trend ? 'Save Changes' : 'Add Trend'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
