import { Character } from 'modules/character/types/character';
import { Location } from 'modules/location/types/location';
import { Quest } from 'modules/quest/types/quest';

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
  locations?: Location[];
  quests?: Quest[];
  notes?: any[];
  createdAt?: string;
  updatedAt?: string;
}
  