import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Character } from 'types/character';
import { API_URL } from './api';

interface NPCCreateDTO {
  name?: string;
  race?: string;
  role?: string;
}

interface NPCUpdateDTO {
  id: string;
  campaignId: string;
  data: Partial<NPCCreateDTO>;
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

export const mapNPC = (npc: any): Character => ({
  id: npc?.id,
  name: npc?.name,
  playerName: npc?.playerName,
  race: npc?.race,
  role: npc?.role,
  characterClass: npc?.characterClass,
  level: npc?.level,
  description: npc?.description,
  stats: npc?.stats,
  campaign: npc?.campaign,
  isPublic: npc?.isPublic,
  createdAt: npc?.createdAt,
  updatedAt: npc?.updatedAt,
});
  
export const npcApi = createApi({
  reducerPath: 'npcApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/api/v1/npc` }),
  endpoints: (builder) => ({
    createNPC: builder.mutation<Character, { campaignId: string, data: NPCCreateDTO }>({
      query: ({ campaignId, data }) => injectToken({
        url: `/${campaignId}`,
        method: 'POST',
        body: data,
      }),
    }),
    getNPC: builder.query<Character | null, { campaignId: string, id: string }>({
      query: ({ campaignId, id }) => injectToken({
        url: `/${campaignId}/${id}`,
      }),
      transformResponse: (response: any) => response ? mapNPC(response) : null,
    }),
    updateNPC: builder.mutation<Character, NPCUpdateDTO>({
      query: ({ campaignId, id, data }) => injectToken({
        url: `/${campaignId}/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteNPC: builder.mutation<void, { campaignId: string, id: string }>({
      query: ({ campaignId, id }) => injectToken({
        url: `/${campaignId}/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreateNPCMutation,
  useGetNPCQuery,
  useUpdateNPCMutation,
  useDeleteNPCMutation,
} = npcApi;
