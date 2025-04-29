import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useAuth from '../hooks/useAuth';

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
    const success = await handleLogin(data.username, data.password);
    if (success) {
      window.location.href = '/dashboard';
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

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Имя пользователя
          </label>
          <input
            className="w-full p-2 border rounded focus:ring-2 focus:ring-primary"
            placeholder="Имя пользователя"
            {...register('username')}
          />
          {errors.username && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
              {errors.username.message}
            </div>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">
            Пароль
          </label>
          <input
            className="w-full p-2 border rounded focus:ring-2 focus:ring-primary"
            type="password"
            placeholder="Пароль"
            {...register('password')}
          />
          {errors.password && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
              {errors.password.message}
            </div>
          )}
        </div>

        {authError && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {authError}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Войти
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
