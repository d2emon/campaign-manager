import { Character } from "./character";

export interface Campaign {
  id: string;
  title: string;
  coverImage?: string;
  description: string;
  gameMaster?: string;
  gameSystem?: string;
  genre?: string;
  inviteCode?: string;
  isPublic?: boolean;
  lastActive?: string;
  maxPlayers: number;
  npcs?: Character[];
  players?: any[];
  locations?: any[];
  quests?: any[];
  notes?: any[];
  createdAt?: string;
  updatedAt?: string;
}
  