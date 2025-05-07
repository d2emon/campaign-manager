import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'store';
import { removeCredentials, setCredentials } from 'store/auth';
import { API_URL } from './api';
import { refreshToken } from './auth';

interface RefreshResultData {
  accessToken: string;
  refreshToken: string;
};

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && (result.error.status === 401 || result.error.status === 403)) {
    const refreshTokenValue = (api.getState() as RootState).auth.refreshToken;
    
    if (refreshTokenValue) {
      try {
        const refreshResult = await refreshToken(refreshTokenValue);
        if (refreshResult) {
          const { accessToken, refreshToken } = refreshResult as RefreshResultData;
          api.dispatch(setCredentials({ accessToken, refreshToken }));

          // Retry the initial query
          result = await baseQuery(args, api, extraOptions);
        }
      } catch (error) {
        api.dispatch(removeCredentials());
      }
    }
  }

  return result;
};
