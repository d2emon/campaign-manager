import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from 'modules/auth/services/baseQueryWithReauth';
import { Character } from 'types/character';

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
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    createNPC: builder.mutation<Character, { campaignId: string, data: NPCCreateDTO }>({
      query: ({ campaignId, data }) => ({
        url: `/api/v1/npc/${campaignId}`,
        method: 'POST',
        body: data,
      }),
    }),
    getNPC: builder.query<Character | null, { campaignId: string, characterId: string }>({
      query: ({ campaignId, characterId }) => ({
        url: `/api/v1/npc/${campaignId}/${characterId}`,
      }),
      transformResponse: (response: any) => response ? mapNPC(response) : null,
    }),
    updateNPC: builder.mutation<Character, NPCUpdateDTO>({
      query: ({ campaignId, id, data }) => ({
        url: `/api/v1/npc/${campaignId}/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteNPC: builder.mutation<void, { campaignId: string, characterId: string }>({
      query: ({ campaignId, characterId }) => ({
        url: `/api/v1/npc/${campaignId}/${characterId}`,
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
