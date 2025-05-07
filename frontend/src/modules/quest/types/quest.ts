export interface Quest {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'completed' | 'failed';
  rewards: {
    name: string;
    quantity: number;
  }[];
  steps: {
    description: string;
    isCompleted: boolean;
  }[];
  campaign: string;
  createdAt: string;
  updatedAt: string;
}
