import useAuth from '../hooks/useAuth';

const DashboardPage = () => {
  const { user, handleLogout } = useAuth();
  return (
    <div className="dashboard-page">
      <h1>Добро пожаловать, {user?.username}</h1>
      <button onClick={handleLogout}>Выйти</button>
    </div>
  );
};

export default DashboardPage;
