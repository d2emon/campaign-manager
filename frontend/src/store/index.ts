import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'modules/auth/store/auth';
import { campaignsApi } from 'modules/campaign/services/campaignApi';
import { npcApi } from 'modules/character/services/npcApi';
import { locationsApi } from 'modules/location/services/locationApi';
import { questsApi } from 'modules/quest/services/questApi';
import { notesApi } from 'modules/note/services/noteApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [campaignsApi.reducerPath]: campaignsApi.reducer,
    [locationsApi.reducerPath]: locationsApi.reducer,
    [npcApi.reducerPath]: npcApi.reducer,
    [notesApi.reducerPath]: notesApi.reducer,
    [questsApi.reducerPath]: questsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    campaignsApi.middleware,
    npcApi.middleware,
    locationsApi.middleware,
    questsApi.middleware,
  ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
