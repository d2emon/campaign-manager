export interface Character {
  id: string;
  name: string;
  playerName: string;
  race: string;
  profession?: string;
  alignment?: string;
  trait?: string;
  role?: string;
  characterClass?: string;
  level?: number;
  description?: string;
  stats?: {
    strength: number;
    charisma: number;
  };
  campaign: string;
  isPublic?: boolean;
  createdAt: string;
  updatedAt: string;
} 