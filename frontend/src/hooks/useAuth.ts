import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { login, logout, register, refreshToken, RegisterDTO } from '../services/auth';
import { User } from '../types/user';

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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
      const refreshTokenValue = localStorage.getItem('refreshToken');
      if (!refreshTokenValue) {
        throw new Error('No refresh token');
      }

      const response = await refreshToken(refreshTokenValue);
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

  const checkAndRefreshToken =  useCallback(async () => {
    const hasValidToken = checkAccessToken();
    if (!hasValidToken) {
      const refreshSuccess = await handleTokenRefresh();
      if (!refreshSuccess) {
        setIsAuthenticated(false);
        setUser(null);
        return false;
      }
    }
    return true;
  }, [checkAccessToken, handleTokenRefresh]);

  const handleLogin = async (username: string, password: string) => {
    try {
      const { accessToken, refreshToken } = await login(username, password);
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      const userData = {
        username,
        email: '',
        role: '',
      };
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      setIsAuthenticated(true);
      setAuthError(null);
      return true;
    } catch (error) {
      setAuthError(`${error}`);
      return false;
    }
  };

  const handleLogout = async () => {
    try {
      const refreshTokenValue = localStorage.getItem('refreshToken');
      if (refreshTokenValue) {
        await logout(refreshTokenValue);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      setUser(null);
      setIsAuthenticated(false);
      navigate('/login');
    }
  };

  const handleRegister = async (user: RegisterDTO) => {
    try {
      const { accessToken, refreshToken } = await register(user);
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      const userData: User = {
        username: user.username,
        email: user.email,
        role: user.role || 'player',
      };
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      setIsAuthenticated(true);
      setAuthError(null);
      return true;
    } catch (error) {
      setAuthError(`${error}`);
      return false;
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const tokenValid = await checkAndRefreshToken();
      if (tokenValid) {
        const userData = JSON.parse(localStorage.getItem('user') || 'null');
        setUser(userData);
        setIsAuthenticated(!!userData);
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

  return {
    authError,
    checkAccessToken,
    isAuthenticated,
    isInitialized,
    handleLogin,
    handleLogout,
    handleRegister,
    user,
  };
};

export default useAuth;
