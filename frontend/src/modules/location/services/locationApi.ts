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

interface LocationHandlerDTO {
  locationId: string;
  campaignId: string;
}

interface LocationUpdateDTO extends LocationHandlerDTO {
  data: Partial<Location>;
}

interface LocationMapUploadDTO extends LocationHandlerDTO {
  data: FormData;
}

interface LocationMapUploadResponse {
  url?: string;
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
    getLocation: builder.query<Location, LocationHandlerDTO>({
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
    deleteLocation: builder.mutation<void, LocationHandlerDTO>({
      query: ({ campaignId, locationId }) => ({
        url: `/api/v1/location/${campaignId}/${locationId}`,
        method: 'DELETE',
      }),
    }),
    uploadImage: builder.mutation<LocationMapUploadResponse, LocationMapUploadDTO>({
      query: ({ campaignId, locationId, data }) => ({
        url: `/api/v1/image/map/${campaignId}/${locationId}`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateLocationMutation,
  useGetLocationQuery,
  useUpdateLocationMutation,
  useDeleteLocationMutation,
  useUploadImageMutation,
} = locationsApi;
