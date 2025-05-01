import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PrivateRoute = () => {
  const { checkAccessToken } = useAuth();
  const isAuthenticated = checkAccessToken();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
};

export default PrivateRoute;
