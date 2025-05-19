export interface Marker {
  x: number;
  y: number;
  label: string;
  isSecret: boolean;
}

export interface Location {
  id: string;
  name: string;
  type: 'city' | 'dungeon' | 'forest' | 'tavern';
  mapImage?: string;
  markers?: Marker[];
  campaign: string;
  tags?: string[];
  isPublic?: boolean;
  createdAt: string;
  updatedAt: string;
}
  