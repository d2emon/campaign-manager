import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { login, logout, register } from '../services/auth';
import { RegisterDTO } from '../types/register.dto';

const useAuth = () => {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const navigate = useNavigate();

  const checkAccessToken = () => {
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
  };

  const handleLogin = async (username: string, password: string) => {
    try {
      const { accessToken } = await login(username, password);
      const userData = { username };
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      setAuthError(null);
      return true;
    } catch (error) {
      setAuthError(`${error}`);
      return false;
    }
  };

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const handleRegister = async (user: RegisterDTO) => {
    try {
      const { accessToken } = await register(user);
      const userData = { username: user.username };
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      setAuthError(null);
      return true;
    } catch (error) {
      setAuthError(`${error}`);
      return false;
    }
  };

  useEffect(() => {
    const hasToken = checkAccessToken();
    if (hasToken) {
      const userData = JSON.parse(localStorage.getItem('user') || 'null');
      setUser(userData);
      setIsAuthenticated(!!userData);
    } else {
      setIsAuthenticated(false);
    }
    setIsInitialized(true);
  }, []);

  return {
    authError,
    checkAccessToken, // : () => !!localStorage.getItem('accessToken'),
    isAuthenticated,
    isInitialized,
    handleLogin,
    handleLogout,
    handleRegister,
    user,
  };
};

export default useAuth;
