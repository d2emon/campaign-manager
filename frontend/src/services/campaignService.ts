import api from './api';
import { Character } from 'types/character';

export interface Campaign {
  id: string;
  title: string;
  description: string;
  gameSystem: string;
  maxPlayers: number;
  characters?: Character[];
  createdAt?: string;
  updatedAt?: string;
}

export type CreateCampaignDTO = {
  title: string;
  description: string;
  gameSystem: string;
  maxPlayers: number;
};

export const getCampaigns = async () => {
  const response = await api.get<Campaign[]>('/api/v1/campaigns');
  const campaigns: Campaign[] = response.data.map((campaign) => ({
    id: campaign.id,
    title: campaign.title,
    description: campaign.description,
    gameSystem: campaign.gameSystem || 'Без системы',
    maxPlayers: campaign.maxPlayers || 0,
  }));
  return campaigns;
};

export const getCampaign = async (id: string) => {
  const response = await api.get<Campaign>(`/api/v1/campaigns/${id}`);
  const campaign: Campaign = {
    id: response.data.id,
    title: response.data.title,
    description: response.data.description,
    gameSystem: response.data.gameSystem || 'Без системы',
    maxPlayers: response.data.maxPlayers || 0,
    characters: response.data.characters || [],
    createdAt: response.data.createdAt,
    updatedAt: response.data.updatedAt,
  };
  return campaign;
};

export const createCampaign = async (data: CreateCampaignDTO) => {
  const response = await api.post<Campaign>('/api/v1/campaigns', data);
  return response.data;
};

export const updateCampaign = async (id: string, data: Partial<CreateCampaignDTO>) => {
  const response = await api.put<Campaign>(`/api/v1/campaigns/${id}`, data);
  return response.data;
};

export const deleteCampaign = async (id: string) => {
  await api.delete(`/api/v1/campaigns/${id}`);
};

export const getCampaignCharacters = async (campaignId: string) => {
  const response = await api.get<Character[]>(`/api/v1/campaigns/${campaignId}/characters`);
  return response.data;
};

export const addCharacterToCampaign = async (campaignId: string, characterId: string) => {
  const response = await api.post<Character>(`/api/v1/campaigns/${campaignId}/characters/${characterId}`);
  return response.data;
};

export const removeCharacterFromCampaign = async (campaignId: string, characterId: string) => {
  await api.delete(`/api/v1/campaigns/${campaignId}/characters/${characterId}`);
}; 