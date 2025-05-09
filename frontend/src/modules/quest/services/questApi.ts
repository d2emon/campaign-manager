import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from 'modules/auth/services/baseQueryWithReauth';
import { Quest } from '../types/quest';

interface QuestCreateDTO {
  campaignId: string;
  data: Partial<Quest>;
}

interface QuestUpdateDTO {
  questId: string;
  campaignId: string;
  data: Partial<Quest>;
}

const mapQuest = (quest: any): Quest => ({
  slug: quest?.slug,
  campaign: quest?.campaign,
  title: quest?.title,
  description: quest?.description,
  status: quest?.status,
  rewards: quest?.rewards,
  steps: quest?.steps,
  createdAt: quest?.createdAt,
  updatedAt: quest?.updatedAt,
});

export const questsApi = createApi({
  reducerPath: 'questsApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    createQuest: builder.mutation<Quest, QuestCreateDTO>({
      query: ({ campaignId, data }) => ({
        url: `/api/v1/quest/${campaignId}`,
        method: 'POST',
        body: data,
      }),
      transformResponse: (response: any) => mapQuest(response),
    }),
    getQuest: builder.query<Quest, { campaignId: string; questId: string }>({
      query: ({ campaignId, questId }) => ({
        url: `/api/v1/quest/${campaignId}/${questId}`,
      }),
      transformResponse: (response: any) => mapQuest(response),
    }),
    updateQuest: builder.mutation<Quest, QuestUpdateDTO>({
      query: ({ questId, campaignId, data }) => ({
        url: `/api/v1/quest/${campaignId}/${questId}`,
        method: 'PUT',
        body: data,
      }),
      transformResponse: (response: any) => mapQuest(response),
    }),
    deleteQuest: builder.mutation<void, { campaignId: string; questId: string }>({
      query: ({ campaignId, questId }) => ({
        url: `/api/v1/quest/${campaignId}/${questId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreateQuestMutation,
  useGetQuestQuery,
  useUpdateQuestMutation,
  useDeleteQuestMutation,
} = questsApi;
