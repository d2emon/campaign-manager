export interface Marker {
  x: number;
  y: number;
  label: string;
  isSecret: boolean;
}

export interface Location {
  id: string;
  name: string;
  slug?: string;
  type: string;
  mapImage?: string;
  markers?: Marker[];
  campaign: string;
  tags?: string[];
  isPublic?: boolean;
  createdAt: string;
  updatedAt: string;
}
  