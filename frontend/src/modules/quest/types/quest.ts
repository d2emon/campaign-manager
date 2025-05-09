export interface Quest {
  slug: string;
  campaign: string;
  title: string;
  description?: string;
  status?: 'active' | 'completed' | 'failed';
  rewards?: {
    name: string;
    quantity: number;
  }[];
  steps?: {
    description: string;
    isCompleted: boolean;
  }[];
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}
