import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from './api';
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

const mapCampaign = (campaign: any) => ({
  id: campaign?.id,
  title: campaign?.title,
  description: campaign?.description,
  gameSystem: campaign?.gameSystem || 'Без системы',
  maxPlayers: campaign?.maxPlayers || 0,
  characters: campaign?.characters || [],
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
      transformResponse: (response: any) => response ? response.map(mapCampaign) : [],
      query: () => injectToken({
        url: '',
      }),
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
