import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useAuth from '../hooks/useAuth';
import Field from './Field';
import PasswordField from './PasswordField';

interface LoginFormProps {
  isLoading: boolean;
  onSubmit: (data: { username: string, password: string }) => Promise<void>;
}

const schema = yup.object({
  username: yup
    .string()
    .required('Обязательное поле'),
  password: yup
    .string()
    .min(6, 'Минимум 6 символов')
    .required('Обязательное поле'),
})

const LoginForm = ({ isLoading, onSubmit }: LoginFormProps) => {
  const {
    authError,
  } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  return (
    <form
      className="space-y-6"
      onSubmit={handleSubmit(onSubmit)}
    >
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
  );
};

export default LoginForm;
