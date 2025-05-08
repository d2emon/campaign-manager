import api from './api';
import { Character } from 'types/character';

export type CreateCharacterDTO = {
  name: string;
  playerName: string;
  race: string;
  class: string;
  level: number;
  description?: string;
  campaignId: string;
};

export const getCharacters = async (campaignId: string) => {
  const response = await api.get<Character[]>(`/api/v1/campaigns/${campaignId}/characters`);
  return response.data;
};

export const getCharacter = async (id: string) => {
  const response = await api.get<Character>(`/api/v1/characters/${id}`);
  return response.data;
};

export const createCharacter = async (data: CreateCharacterDTO) => {
  const response = await api.post<Character>('/api/v1/characters', data);
  return response.data;
};

export const updateCharacter = async (id: string, data: Partial<CreateCharacterDTO>) => {
  const response = await api.put<Character>(`/api/v1/characters/${id}`, data);
  return response.data;
};

export const deleteCharacter = async (id: string) => {
  await api.delete(`/api/v1/characters/${id}`);
}; 