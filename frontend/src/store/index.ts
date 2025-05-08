import { configureStore } from '@reduxjs/toolkit';
import { campaignsApi } from 'services/campaignApi';
import { npcApi } from 'services/npcApi';
import authReducer from './auth';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [campaignsApi.reducerPath]: campaignsApi.reducer,
    [npcApi.reducerPath]: npcApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(campaignsApi.middleware, npcApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
