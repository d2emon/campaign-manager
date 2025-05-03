import { useState } from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/modules/Auth/RegisterForm';
import { useAuth } from '../contexts/AuthContext';

const RegisterPage = () => {
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: { email: string, username: string, password: string }) => {
    setIsLoading(true);

    try {
      await register({
        email: data.email,
        password: data.password,
        role: 'gm',
        username: data.username,        
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Создание аккаунта
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Или
            {' '}
            <Link to="/login" className="font-medium text-primary hover:text-blue-500">
              войдите в существующий аккаунт
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <RegisterForm
              isLoading={isLoading}
              onSubmit={onSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
