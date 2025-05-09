import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from 'modules/auth/services/baseQueryWithReauth';
import { Note } from '../types/note';

export interface NoteErrorResponse {
  data?: { error?: string };
};

interface NoteCreateDTO {
  campaignId: string;
  data: Partial<Note>;
}

interface NoteUpdateDTO {
  noteId: string;
  campaignId: string;
  data: Partial<Note>;
}

const mapNote = (note: any): Note => ({
  slug: note?.slug,
  title: note?.title,
  content: note?.content,
  category: note?.category,
  campaign: note?.campaign,
  tags: note?.tags,
  isPublic: note?.isPublic,
  createdAt: note?.createdAt,
  updatedAt: note?.updatedAt,
});

export const notesApi = createApi({
  reducerPath: 'notesApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    createNote: builder.mutation<Note, NoteCreateDTO>({
      query: ({ campaignId, data }) => ({
        url: `/api/v1/note/${campaignId}`,
        method: 'POST',
        body: data,
      }),
      transformResponse: (response: any) => mapNote(response),
    }),
    getNote: builder.query<Note, { campaignId: string; noteId: string }>({
      query: ({ campaignId, noteId }) => ({
        url: `/api/v1/note/${campaignId}/${noteId}`,
      }),
      transformResponse: (response: any) => mapNote(response),
    }),
    updateNote: builder.mutation<Note, NoteUpdateDTO>({
      query: ({ noteId, campaignId, data }) => ({
        url: `/api/v1/note/${campaignId}/${noteId}`,
        method: 'PUT',
        body: data,
      }),
      transformResponse: (response: any) => mapNote(response),
    }),
    deleteNote: builder.mutation<void, { campaignId: string; noteId: string }>({
      query: ({ campaignId, noteId }) => ({
        url: `/api/v1/note/${campaignId}/${noteId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreateNoteMutation,
  useGetNoteQuery,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = notesApi;
