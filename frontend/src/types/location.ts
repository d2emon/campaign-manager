export interface Location {
  id: string;
  name: string;
  type: 'city' | 'dungeon' | 'forest' | 'tavern';
  mapImage?: string;
  markers: Array<{
    x: number;
    y: number;
    label: string;
    isSecret: boolean;
  }>;
  campaign: string;
  createdAt: string;
  updatedAt: string;
}
  