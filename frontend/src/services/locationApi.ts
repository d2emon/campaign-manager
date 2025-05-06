import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Location } from 'types/location';

interface LocationCreateDTO {
  name: string;
  type: 'city' | 'dungeon' | 'forest' | 'tavern';
  campaignId: string;
}

interface LocationUpdateDTO {
  id: string;
  data: Partial<LocationCreateDTO>;
}

const mapLocation = (location: any): Location => ({
  id: location?.id,
  name: location?.name,
  type: location?.type,
  mapImage: location?.mapImage,
  markers: location?.markers,
  campaign: location?.campaign,
  createdAt: location?.createdAt,
  updatedAt: location?.updatedAt,
});

export const locationsApi = createApi({
  reducerPath: 'locationsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    createLocation: builder.mutation<Location, LocationCreateDTO>({
      query: (data) => ({
        url: `/api/v1/location/${data.campaignId}`,
        method: 'POST',
        body: data,
      }),
      transformResponse: (response: any) => mapLocation(response),
    }),
    getLocation: builder.query<Location, { campaignId: string; id: string }>({
      query: ({ campaignId, id }) => ({
        url: `/api/v1/location/${campaignId}/${id}`,
      }),
      transformResponse: (response: any) => mapLocation(response),
    }),
    updateLocation: builder.mutation<Location, LocationUpdateDTO>({
      query: ({ id, data }) => ({
        url: `/api/v1/location/${data.campaignId}/${id}`,
        method: 'PUT',
        body: data,
      }),
      transformResponse: (response: any) => mapLocation(response),
    }),
    deleteLocation: builder.mutation<void, { campaignId: string; id: string }>({
      query: ({ campaignId, id }) => ({
        url: `/api/v1/location/${campaignId}/${id}`,
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
