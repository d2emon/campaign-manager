import { configureStore } from '@reduxjs/toolkit';
import { campaignsApi } from 'modules/campaign/services/campaignApi';
import { npcApi } from 'modules/character/services/npcApi';
import { locationsApi } from 'services/locationApi';
import authReducer from './auth';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [campaignsApi.reducerPath]: campaignsApi.reducer,
    [locationsApi.reducerPath]: locationsApi.reducer,
    [npcApi.reducerPath]: npcApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    campaignsApi.middleware,
    npcApi.middleware,
    locationsApi.middleware,
  ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
