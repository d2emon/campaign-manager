import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from 'modules/auth/services/baseQueryWithReauth';
import { Location } from '../types/location';

export interface LocationErrorResponse {
  data?: { error?: string };
};

interface LocationCreateDTO {
  campaignId: string;
  data: Partial<Location>;
}

interface LocationUpdateDTO {
  locationId: string;
  campaignId: string;
  data: Partial<Location>;
}

const mapLocation = (location: any): Location => ({
  slug: location?.slug,
  name: location?.name,
  type: location?.type,
  mapImage: location?.mapImage,
  markers: location?.markers,
  campaign: location?.campaign,
  tags: location?.tags,
  isPublic: location?.isPublic,
  createdAt: location?.createdAt,
  updatedAt: location?.updatedAt,
});

export const locationsApi = createApi({
  reducerPath: 'locationsApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    createLocation: builder.mutation<Location, LocationCreateDTO>({
      query: ({ campaignId, data }) => ({
        url: `/api/v1/location/${campaignId}`,
        method: 'POST',
        body: data,
      }),
      transformResponse: (response: any) => mapLocation(response),
    }),
    getLocation: builder.query<Location, { campaignId: string; locationId: string }>({
      query: ({ campaignId, locationId }) => ({
        url: `/api/v1/location/${campaignId}/${locationId}`,
      }),
      transformResponse: (response: any) => mapLocation(response),
    }),
    updateLocation: builder.mutation<Location, LocationUpdateDTO>({
      query: ({ locationId, campaignId, data }) => ({
        url: `/api/v1/location/${campaignId}/${locationId}`,
        method: 'PUT',
        body: data,
      }),
      transformResponse: (response: any) => mapLocation(response),
    }),
    deleteLocation: builder.mutation<void, { campaignId: string; locationId: string }>({
      query: ({ campaignId, locationId }) => ({
        url: `/api/v1/location/${campaignId}/${locationId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreateLocationMutation,
  useGetLocationQuery,
  useUpdateLocationMutation,
  useDeleteLocationMutation,
} = locationsApi;
