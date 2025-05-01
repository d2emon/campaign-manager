import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useAuth from '../hooks/useAuth';
import Field from './Field';
import PasswordField from './PasswordField';
import { useNavigate } from 'react-router-dom';

const schema = yup.object({
  username: yup
    .string()
    .required('Обязательное поле'),
  password: yup
    .string()
    .min(6, 'Минимум 6 символов')
    .required('Обязательное поле'),
})

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    authError,
    handleLogin,
  } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: { username: string, password: string }) => {
    setIsLoading(true);
    try {
      const success = await handleLogin(data.username, data.password);
      if (success) {
        navigate('/dashboard');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-primary">
          Вход в RPG Campaign Manager
        </h1>

        <Field
          id="username"
          label="Имя пользователя"
          inputProps={register('username')}
          error={errors.username}
        />

        <PasswordField
          id="password"
          label="Пароль"
          inputProps={register('password')}
          error={errors.password}
        />

        {authError && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {authError}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          disabled={isLoading}
        >
          { isLoading ? 'Загрузка...' : 'Войти' }
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
