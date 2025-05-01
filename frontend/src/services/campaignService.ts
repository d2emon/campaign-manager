import api from './api';

export type Campaign = {
  id: string;
  title: string;
  description: string;
  gameSystem: string;
  maxPlayers: number;
  gmId: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateCampaignDTO = {
  title: string;
  description: string;
  gameSystem: string;
  maxPlayers: number;
  gmId: string;
};

export const getCampaigns = async () => {
  const response = await api.get<Campaign[]>('/api/v1/campaigns');
  return response.data;
};

export const getCampaign = async (id: string) => {
  const response = await api.get<Campaign>(`/api/v1/campaigns/${id}`);
  return response.data;
};

export const createCampaign = async (data: CreateCampaignDTO) => {
  const response = await api.post<Campaign>('/api/v1/campaigns', data);
  return response.data;
};

export const updateCampaign = async (id: string, data: Partial<CreateCampaignDTO>) => {
  const response = await api.patch<Campaign>(`/api/v1/campaigns/${id}`, data);
  return response.data;
};

export const deleteCampaign = async (id: string) => {
  await api.delete(`/api/v1/campaigns/${id}`);
}; 