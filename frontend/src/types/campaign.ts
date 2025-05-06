import { Character } from "./character";

export interface Campaign {
  id: string;
  title: string;
  description: string;
  gameSystem?: string;
  genre?: string;
  maxPlayers: number;
  npcs?: Character[];
  createdAt?: string;
  updatedAt?: string;
}
  