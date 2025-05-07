import { createApi } from '@reduxjs/toolkit/query/react';
import { Campaign } from 'types/campaign';
import { baseQueryWithReauth } from './BaseQueryWithReauth';
import { mapNPC } from './npcApi';

export type CampaignCreateDTO = Omit<Campaign, 'id' | 'createdAt' | 'updatedAt'>;

export interface CampaignUpdateDTO {
  campaignId: string;
  data: Partial<Campaign>;
}

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
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    createCampaign: builder.mutation<Campaign, CampaignCreateDTO>({
      query: (data) => ({
        url: '/api/v1/campaigns',
        method: 'POST',
        body: data,
      }),
    }),
    getCampaigns: builder.query<Campaign[], void>({
      query: () => ({
        url: '/api/v1/campaigns',
      }),
      transformResponse: (response: any) => response ? response.map(mapCampaign) : [],
    }),
    getCampaign: builder.query<Campaign | null, string>({
      query: (id) => ({
        url: `/api/v1/campaigns/${id}`,
      }),
      transformResponse: (response: any) => response ? mapCampaign(response) : null,
    }),
    updateCampaign: builder.mutation<Campaign, CampaignUpdateDTO>({
      query: ({ campaignId, data }) => ({
        url: `/api/v1/campaigns/${campaignId}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteCampaign: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/v1/campaigns/${id}`,
        method: 'DELETE',
      }),
    }),
    generateNPC: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/v1/campaigns/${id}/npc/generate`,
        method: 'POST',
      }),
    }),
    joinCampaign: builder.mutation<void, { id: string, inviteCode: string }>({
      query: ({ id, inviteCode }) => ({
        url: `/api/v1/campaigns/${id}/join?inviteCode=${inviteCode}`,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useGetCampaignQuery,
  useGetCampaignsQuery,
  useCreateCampaignMutation,
  useDeleteCampaignMutation,
  useGenerateNPCMutation,
  useJoinCampaignMutation,
  useUpdateCampaignMutation,
} = campaignsApi;
