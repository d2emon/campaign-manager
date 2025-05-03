import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../../../contexts/AuthContext';
import Field from '../../ui/Field';
import PasswordField from '../../ui/PasswordField';
import PasswordStrength from '../../ui/PasswordStrength';
import { Button } from '../../ui/Button';

interface RegisterFormProps {
  isLoading: boolean;
  onSubmit: (data: { email: string, username: string, password: string }) => Promise<void>;
}

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

const RegisterForm = ({ isLoading, onSubmit }: RegisterFormProps) => {
  const {
    errorMessage,
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

  return (
    <form
      className="space-y-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      {errorMessage && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="text-sm text-red-700">{errorMessage}</div>
        </div>
      )}

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

      <Button
        type="submit"
        disabled={isLoading}
        full
      >
        { isLoading ? 'Загрузка...' : 'Зарегистрироваться' }        
      </Button>
    </form>
  );
};

export default RegisterForm;
