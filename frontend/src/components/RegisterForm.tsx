import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useAuth from '../hooks/useAuth';
import Field from './Field';
import PasswordField from './PasswordField';
import PasswordStrength from './PasswordStrength';

const schema = yup.object({
  username: yup
    .string()
    .required('Обязательное поле'),
  password: yup
    .string()
    .min(6, 'Минимум 6 символов')
    .required('Обязательное поле'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Пароли не совпадают')
    .required('Подтвердите пароль'),
  email: yup
    .string()
    .email('Некорректный email')
    .required('Обязательное поле'),
})

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    authError,
    handleRegister,
  } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const passwordValue = watch('password');
  const confirmPasswordValue = watch('confirmPassword');

  const onSubmit = async (data: { email: string, username: string, password: string }) => {
    setIsLoading(true);
    try {
      const success = await handleRegister({
        email: data.email,
        password: data.password,
        role: 'gm',
        username: data.username,
      });
      if (success) {
        window.location.href = '/dashboard';
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-primary">
          Регистрация
        </h1>

        <Field
          id="email"
          error={errors.email}
          inputProps={register('email')}
          label="Email"
          type="email"
        />
        <Field
          id="username"
          error={errors.username}
          inputProps={register('username')}
          label="Имя пользователя"
        />
        <PasswordField
          id="password"
          error={errors.password}
          inputProps={register('password')}
          label="Пароль"
        />
        <div className="mb-4 py-2">
          <PasswordStrength password={passwordValue} />
        </div>
        <PasswordField
          id="confirmPassword"
          error={errors.confirmPassword}
          inputProps={register('confirmPassword')}
          label="Подтвердите пароль"
        />

        {passwordValue && confirmPasswordValue && passwordValue !== confirmPasswordValue && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            Пароли не совпадают
          </div>
        )}

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
          { isLoading ? 'Загрузка...' : 'Зарегистрироваться' }
        </button>

        <p className="mt-4 text-center text-gray-600">
          Уже есть аккаунт?
          {' '}
          <Link
            className="text-blue-600 hover:underline"
            to="/login"
          >
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
