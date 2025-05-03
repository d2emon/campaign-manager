import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import {
  login as loginApi,
  logout as logoutApi,
  refreshToken as refreshTokenApi,
  register as registerApi,
  RegisterDTO,
} from 'services/auth';

interface User {
  username: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  errorMessage: string | null;
  isInitialized: boolean;
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
  const [user, setUser] = useState<User | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const navigate = useNavigate();

  const checkAccessToken = useCallback(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem('accessToken');
        return false;
      }
      return true;
    }
    return false;
  }, []);

  const handleTokenRefresh = useCallback(async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        throw new Error('No refresh token');
      }

      const response = await refreshTokenApi(refreshToken);
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);

      return true;
    } catch (error) {
      console.error('Token refresh failed:', error);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      return false;
    }
  }, []);

  const checkAndRefreshToken = useCallback(async () => {
    const hasToken = checkAccessToken();
    if (!hasToken) {
      const refreshSuccess = await handleTokenRefresh();
      if (!refreshSuccess) {
        setUser(null);
        return false;
      }
    }

    return true;
  }, [checkAccessToken, handleTokenRefresh]);
  
  useEffect(() => {
    const initializeAuth = async () => {
      const tokenValid = await checkAndRefreshToken();
      if (tokenValid) {
        const userData = JSON.parse(localStorage.getItem('user') || 'null');
        setUser(userData);
      }
      setIsInitialized(true);
    };

    initializeAuth();

    // Устанавливаем интервал для проверки токена каждые 5 минут
    const interval = setInterval(async () => {
      await checkAndRefreshToken();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [checkAndRefreshToken]);

  const login = async (username: string, password: string) => {
    try {
      const { accessToken, refreshToken } = await loginApi(username, password);
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      const userData: User = {
        username: username,
        email: '',
        role: '',
      };
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      setErrorMessage(null);
      navigate('/dashboard');
      return true;
    } catch (error) {
      setErrorMessage(`${error}`);
      return false;
    }
  };

  const logout = async () => {
    try {
      const refreshTokenValue = localStorage.getItem('refreshToken');
      if (refreshTokenValue) {
        await logoutApi(refreshTokenValue);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      setUser(null);
      navigate('/login');
    }
  };

  const register = async (user: RegisterDTO) => {
    try {
      const { accessToken, refreshToken } = await registerApi(user);
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      const userData: User = {
        username: user.username,
        email: user.email,
        role: user.role || 'player',
      };
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      setErrorMessage(null);
      return true;
    } catch (error) {
      setErrorMessage(`${error}`);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        errorMessage,
        isInitialized,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
