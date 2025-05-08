import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from 'components/ui/Button';
import Field from 'components/ui/Field';
import Paper from 'components/ui/Paper';
import { Quest } from '../types/quest';

interface QuestFormProps {
  initialData?: Partial<Quest> | null;
  isEditing?: boolean;
  isLoading?: boolean;
  onSubmit: (data: Partial<Quest>) => Promise<void>;
  onCancel?: () => void;
}

const schema = yup.object({
  title: yup
    .string()
    .required('Название квеста обязательно')
    .min(2, 'Минимум 2 символа'),
  description: yup
    .string()
    .required('Описание квеста обязательно')
    .min(10, 'Минимум 10 символов'),
  reward: yup
    .string()
    .optional()
    .default(''),
  status: yup
    .string()
    .required('Статус обязателен')
    .oneOf(['active', 'completed', 'failed'] as const, 'Некорректный статус'),
});

type QuestFormData = {
  title: string;
  description: string;
  reward: string;
  status: 'active' | 'completed' | 'failed';
};

const QuestForm = ({
  initialData,
  isEditing = false,
  isLoading = false,
  onSubmit,
  onCancel,
}: QuestFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuestFormData>({
    resolver: yupResolver(schema),
    defaultValues: initialData || undefined,
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  return (
    <Paper>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Field
          id="title"
          error={errors.title}
          inputProps={register('title')}
          label="Название квеста"
        />

        <Field
          id="description"
          error={errors.description}
          inputProps={register('description')}
          label="Описание"
          type="textarea"
          rows={4}
        />

        <Field
          id="reward"
          error={errors.reward}
          inputProps={register('reward')}
          label="Награда"
        />

        <Field
          id="status"
          error={errors.status}
          inputProps={register('status')}
          label="Статус"
          placeholder="Выберите статус"
          type="select"
          options={[
            { value: 'active', label: 'Активен' },
            { value: 'completed', label: 'Завершен' },
            { value: 'failed', label: 'Провален' },
          ]}
        />

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            onClick={onCancel}
            variant="secondary"
          >
            Отмена
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            variant="primary"
          >
            {isLoading ? 'Сохранение...' : isEditing ? 'Сохранить' : 'Создать'}
          </Button>
        </div>
      </form>
    </Paper>
  );
};

export default QuestForm;
