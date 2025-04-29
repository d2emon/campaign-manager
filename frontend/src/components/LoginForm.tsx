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
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        placeholder="Имя пользователя"
        {...register('username')}
      />
      {errors.username && <p>{errors.username.message}</p>}

      <input
        type="password"
        placeholder="Пароль"
        {...register('password')}
      />
      {errors.password && <p>{errors.password.message}</p>}

      {authError && <p style={{ color: '#ff0000' }}>{authError}</p>}
      <button type="submit">Войти</button>
    </form>
  );
};

export default LoginForm;
