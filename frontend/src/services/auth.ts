import api from './api';
import { RegisterDTO } from '../types/register.dto';

export const login = async (username: string, password: string) => {
  const response = await api.post('/auth/login', { username, password });
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('accessToken');
};

export const register = async (user: RegisterDTO) => {
  const response = await api.post('/auth/register', user);
  return response.data;
};

