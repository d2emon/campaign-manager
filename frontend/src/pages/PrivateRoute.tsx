import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';

const PrivateRoute = () => {
  const { user, isInitialized } = useAuth();

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/login" />
};

export default PrivateRoute;
