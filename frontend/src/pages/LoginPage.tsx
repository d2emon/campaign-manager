import { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from 'modules/auth/pages/LoginForm';
import Paper from 'components/ui/Paper';
import { useAuth } from 'contexts/AuthContext';

const LoginPage = () => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: { username: string, password: string }) => {
    setIsLoading(true);

    try {
      await login(data.username, data.password);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Вход в аккаунт
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Или
            {' '}
            <Link to="/register" className="font-medium text-primary hover:text-blue-500">
              создайте новый аккаунт
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <Paper>
            <LoginForm
              isLoading={isLoading}
              onSubmit={onSubmit}
            />
          </Paper>
        </div>

      </div>
    </div>
  );
};

/*
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-700">{error}</div>
              </div>
            )}

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Имя пользователя
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
              </div>
            </div>

            <PasswordField
              label="Пароль"
              name="password"
              required
            />

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
              >
                {isLoading ? 'Вход...' : 'Войти'}
              </button>
            </div>
          </form>
*/

export default LoginPage;
