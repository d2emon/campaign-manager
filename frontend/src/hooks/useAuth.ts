import { useState } from 'react';
import { login, logout } from '../services/auth';

const useAuth = () => {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [authError, setAuthError] = useState('');

  const handleLogin = async (username: string, password: string) => {
    try {
      const { accessToken } = await login(username, password);
      localStorage.setItem('accessToken', accessToken);
      setUser({ username });
      return true;
    } catch (error) {
      setAuthError(`${error}`);
      return false;
    }
  };

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  return {
    authError,
    handleLogin,
    handleLogout,
    user,
  };
};

export default useAuth;
