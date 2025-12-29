export type Platform = 'instagram' | 'tiktok';
export type ContentType = 'reel' | 'story' | 'carousel';
export type TrendType = 'audio' | 'hook' | 'format' | 'visual-style';
export type Status = 'not-used' | 'in-production' | 'posted' | 'performed-well';
export type Department = 'rooms' | 'f&b' | 'spa' | 'experiences';

export interface Trend {
  id: string;
  name: string;
  platform: Platform;
  contentType: ContentType;
  trendType: TrendType;
  description: string;
  hospitalityAdaptation: string;
  hookExample: string;
  status: Status;
  departments: Department[];
  link?: string;
  createdAt: Date;
  isSavedForLater?: boolean;
  isTrendingThisWeek?: boolean;
}

export const platformLabels: Record<Platform, string> = {
  instagram: 'Instagram',
  tiktok: 'TikTok',
};

export const contentTypeLabels: Record<ContentType, string> = {
  reel: 'Reel',
  story: 'Story',
  carousel: 'Carousel',
};

export const trendTypeLabels: Record<TrendType, string> = {
  audio: 'Audio',
  hook: 'Hook',
  format: 'Format',
  'visual-style': 'Visual Style',
};

export const statusLabels: Record<Status, string> = {
  'not-used': 'Not Used',
  'in-production': 'In Production',
  'posted': 'Posted',
  'performed-well': 'Performed Well',
};

export const departmentLabels: Record<Department, string> = {
  rooms: 'Rooms',
  'f&b': 'F&B',
  spa: 'Spa',
  experiences: 'Experiences',
};
