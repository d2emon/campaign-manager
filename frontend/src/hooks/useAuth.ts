import { useState } from 'react';
import { login, logout, register } from '../services/auth';
import { RegisterDTO } from '../services/register.dto';

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

  const handleRegister = async (user: RegisterDTO) => {
    try {
      const { accessToken } = await register(user);
      localStorage.setItem('accessToken', accessToken);
      setUser({ username: user.username });
      return true;
    } catch (error) {
      setAuthError(`${error}`);
      return false;
    }
  };

  return {
    authError,
    handleLogin,
    handleLogout,
    handleRegister,
    user,
  };
};

export default useAuth;
