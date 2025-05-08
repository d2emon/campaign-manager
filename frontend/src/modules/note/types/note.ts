export interface Note {
  id: string;
  title: string;
  content: string;
  category?: string;
  campaign: string;
  tags?: string[];
  isPrivate?: boolean;
  createdAt: string;
  updatedAt: string;
}
