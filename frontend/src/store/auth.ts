import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import { RootState } from 'store';
import { User } from 'types/user';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoadingAuth: boolean;
  authError: string | null;
}   

interface SetCredentialsPayload {
  accessToken: string;
  refreshToken: string;
  user?: User;
}

const initialState: AuthState = {
  accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  isAuthenticated: false,
  isLoadingAuth: false,
  authError: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthError: (state, action: PayloadAction<string | null>) => {
      state.authError = action.payload;
    },
    setCredentials: (state, action: PayloadAction<SetCredentialsPayload>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
      if (action.payload.user) {
        state.user = action.payload.user;
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      }
    },
    setIsLoadingAuth: (state, action: PayloadAction<boolean>) => {
      state.isLoadingAuth = action.payload;
    },
    removeCredentials: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    },
  },
});

export const {
  removeCredentials,
  setAuthError,
  setCredentials,
  setIsLoadingAuth,
} = authSlice.actions;

export const selectAuthError = (state: RootState) => state.auth.authError;
export const selectHasAccessToken = (state: RootState) => {
  const accessToken = state.auth.accessToken;
  if (!accessToken) {
    return false;
  }
  const decoded = jwtDecode(accessToken);
  return !(decoded?.exp && decoded.exp * 1000 < Date.now());
};
export const selectIsLoadingAuth = (state: RootState) => state.auth.isLoadingAuth;
export const selectRefreshToken = (state: RootState) => state.auth.refreshToken;
export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
