import { configureStore } from '@reduxjs/toolkit';
import { campaignsApi } from 'services/campaignApi';
import authReducer from './auth';
export const store = configureStore({
  reducer: {
    [campaignsApi.reducerPath]: campaignsApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(campaignsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
