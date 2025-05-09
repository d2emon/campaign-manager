export interface Note {
  slug: string;
  title: string;
  content?: string;
  category?: string;
  campaign: string;
  tags?: string[];
  isPublic?: boolean;
  createdAt: string;
  updatedAt: string;
}
