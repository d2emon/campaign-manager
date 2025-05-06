import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from 'components/ui/Button';
import { useAuth } from 'contexts/AuthContext';
import { selectUser } from 'store/auth';

export const Header = ({ dark = false }: { dark?: boolean }) => {
  const { logout } = useAuth();
  const user = useSelector(selectUser);

  return (
    <header className={`${dark ? 'bg-dark text-white' : 'bg-white text-gray-900'} p-4 shadow-lg mb-6`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold">RPG Campaign Manager</h1>
          </div>
          <nav className="flex items-center space-x-4">
            { user ? (
              <>
                <Link to="/dashboard">
                  <span className="text-gray-700">{user.username}</span>
                </Link>
                <Button variant="secondary">
                  Кампании
                </Button>
                <Button
                  ghost
                  variant="danger"
                  onClick={logout}
                >
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  Войти
                </Link>
                <Link to="/register">
                  Зарегистрироваться
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

/*
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">

            <div className="flex items-center space-x-4">
              <button
                onClick={logout}
                className="px-4 py-2 text-sm text-red-600 hover:text-red-800"
              >
                Выйти
              </button>
            </div>
          </div>
        </div>
      </nav>

*/