import {
  createContext,
  useContext,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeCredentials,
  selectHasAccessToken,
  selectIsLoadingAuth,
  selectRefreshToken,
  setAuthError,
  setCredentials,
  setIsLoadingAuth,
} from 'store/auth';
import {
  login as loginApi,
  logout as logoutApi,
  refreshToken as refreshTokenApi,
  register as registerApi,
  RegisterDTO,
} from '../services/auth';

interface AuthContextType {
  login: (username: string, password: string) => Promise<boolean>;
  register: (user: RegisterDTO) => Promise<boolean>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const dispatch = useDispatch();
  const hasAccessToken = useSelector(selectHasAccessToken);
  const isLoadingAuth = useSelector(selectIsLoadingAuth);
  const refreshToken = useSelector(selectRefreshToken);
  const navigate = useNavigate();

  const handleTokenRefresh = useCallback(async () => {
    if (!hasAccessToken) {
      return;
    }
 
    try {
      dispatch(setIsLoadingAuth(true));
      dispatch(setAuthError(null));
      if (!refreshToken) {
        throw new Error('No refresh token');
      }

      const response = await refreshTokenApi(refreshToken);
      dispatch(setCredentials({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
      }));
    } catch (error) {
      console.error('Token refresh failed:', error);
      dispatch(setAuthError(`${error}`));
      dispatch(removeCredentials());
    } finally {
      dispatch(setIsLoadingAuth(false));
    }
  }, [dispatch, hasAccessToken, refreshToken]);

  useEffect(() => {
    // Устанавливаем интервал для проверки токена каждые 5 минут
    const interval = setInterval(handleTokenRefresh, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [dispatch, handleTokenRefresh, isLoadingAuth]);

  const login = async (username: string, password: string) => {
    try {
      dispatch(setIsLoadingAuth(true));
      dispatch(setAuthError(null));
      const response = await loginApi(username, password);
      dispatch(setCredentials({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        user: {
          username: username,
          email: '',
          role: 'player',
        },
      }));
      dispatch(setIsLoadingAuth(false));
      navigate('/dashboard');
      return true;
    } catch (error) {
      dispatch(setAuthError(`${error}`));
      dispatch(setIsLoadingAuth(false));
      return false;
    }
  };

  const logout = async () => {
    try {
      const refreshTokenValue = localStorage.getItem('refreshToken');
      dispatch(setIsLoadingAuth(true));
      dispatch(setAuthError(null));
      if (refreshTokenValue) {
        await logoutApi(refreshTokenValue);
      }
    } catch (error) {
      console.error('Logout error:', error);
      dispatch(setAuthError(`${error}`));
    } finally {
      dispatch(removeCredentials());
      dispatch(setIsLoadingAuth(false));
      navigate('/login');
    }
  };

  const register = async (user: RegisterDTO) => {
    try {
      dispatch(setIsLoadingAuth(true));
      dispatch(setAuthError(null));
      const response = await registerApi(user);
      dispatch(setCredentials({
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        user: {
          username: user.username,
          email: user.email,
          role: user.role || 'player',
        },
      }));
      dispatch(setIsLoadingAuth(false));
      return true;
    } catch (error) {
      dispatch(setAuthError(`${error}`));
      dispatch(setIsLoadingAuth(false));
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
