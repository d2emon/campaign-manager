import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Campaign } from 'types/campaign';
import { API_URL } from './api';
import { mapNPC } from './npcApi';

export type CampaignCreateDTO = Omit<Campaign, 'id' | 'createdAt' | 'updatedAt'>;

export interface CampaignUpdateDTO {
  id: string;
  data: Partial<Campaign>;
}

const injectToken = (args: any) => {
  const accessToken = localStorage.getItem('accessToken');
  return {
    ...args,
    headers: {
      ...args.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  };
};

const mapCampaign = (campaign: any): Campaign => ({
  id: campaign?.id,
  title: campaign?.title,
  coverImage: campaign?.coverImage,
  description: campaign?.description,
  gameMaster: campaign?.gameMaster,
  gameSystem: campaign?.gameSystem || 'Без системы',
  genre: campaign?.genre,
  inviteCode: campaign?.inviteCode,
  isPublic: campaign?.isPublic,
  lastActive: campaign?.lastActive,
  maxPlayers: campaign?.maxPlayers || 0,
  npcs: campaign?.npcs ? campaign?.npcs.map(mapNPC) : [],
  players: campaign?.players || [],
  locations: campaign?.locations || [],
  quests: campaign?.quests || [],
  notes: campaign?.notes || [],
  createdAt: campaign?.createdAt,
  updatedAt: campaign?.updatedAt,
});

export const campaignsApi = createApi({
  reducerPath: 'campaignsApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/api/v1/campaigns` }),
  endpoints: (builder) => ({
    createCampaign: builder.mutation<Campaign, CampaignCreateDTO>({
      query: (data) => injectToken({
        url: '',
        method: 'POST',
        body: data,
      }),
    }),
    getCampaigns: builder.query<Campaign[], void>({
      query: () => injectToken({
        url: '',
      }),
      transformResponse: (response: any) => response ? response.map(mapCampaign) : [],
    }),
    getCampaign: builder.query<Campaign | null, string>({
      query: (id) => injectToken({
        url: `/${id}`,
      }),
      transformResponse: (response: any) => response ? mapCampaign(response) : null,
    }),
    updateCampaign: builder.mutation<Campaign, CampaignUpdateDTO>({
      query: (data) => injectToken({
        url: `/${data.id}`,
        method: 'PUT',
        body: data.data,
      }),
    }),
    deleteCampaign: builder.mutation<void, string>({
      query: (id) => injectToken({
        url: `/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreateCampaignMutation,
  useDeleteCampaignMutation,
  useGetCampaignQuery,
  useGetCampaignsQuery,
  useUpdateCampaignMutation,
} = campaignsApi;
