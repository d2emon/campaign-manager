import api from 'services/api';

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
}

export type RegisterDTO = {
  email: string,
  password: string,
  role?: string,
  username: string,
};

export const login = async (username: string, password: string): Promise<LoginResponse> => {
  const response = await api.post('/auth/login', { username, password });
  return response.data;
};

export const logout = async (refreshToken: string) => {
  const response = await api.post('/auth/logout', { refreshToken });
  return response.data;
};

export const register = async (user: RegisterDTO): Promise<LoginResponse> => {
  const response = await api.post('/auth/register', user);
  return response.data;
};

export const refreshToken = async (refreshToken: string) => {
  const response = await api.post('/auth/refresh-token', { refreshToken });
  return response.data;
};
